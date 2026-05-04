// scripts/build-tagged-phones.cjs
//
// Source-of-truth tagger for every phone number in the HelpFinder data layer.
// Walks programs.js, src/data/legal/entries/*.js, and canonical/phones.js;
// for each phone number (digits-normalized), emits a record listing every
// owner (program / legal entry / canonical pole) plus blockDial status.
//
// Output: scripts/data/tagged-phones.json — array of records like:
//   {
//     digits: "5852324090",
//     value: "585-232-4090",
//     blockDial: false,
//     owners: [
//       {type: "pole", group: "LEGAL_AID", slug: "legalAidRoc"},
//       {type: "program", id: "lawny"},
//       {type: "entry", id: "wrongful-termination-ny"},
//       ...
//     ],
//     name: "Legal Aid Society of Rochester" (best-guess label from the highest-priority owner)
//   }
//
// Used by:
//   • dialer input generation (build-dialer-input.cjs) — knows what every
//     number IS so the dialer's transcripts can be attributed at capture time
//   • blocklist generation (every blockDial:true number is excluded)
//   • triage workflow — every transcript can name its owner without lookup
//
// Usage:
//   node scripts/build-tagged-phones.cjs
//   node scripts/build-tagged-phones.cjs --out path/to/output.json

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const OUT = outIdx >= 0 ? args[outIdx + 1] : path.join(__dirname, 'data', 'tagged-phones.json');

const PROGRAMS_FILE = path.join(__dirname, '..', 'src', 'data', 'programs.js');
const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');
const CANONICAL_PHONES = path.join(__dirname, '..', 'src', 'data', 'canonical', 'phones.js');

// Phone-pattern regex (same as audit-phone-poles.cjs after the fix)
const PHONE_RE = /(?<![\d.])((?:1[-.\s]?)?\(?([2-9]\d{2})\)?[-.\s]*(\d{3})[-.\s]*(\d{4}))(?!\d)/g;
const SHORT_CODE_LITERALS = ['988', '211', '311', '511', '911', '741741'];

function digitsOnly(s) {
  return String(s || '').replace(/\D/g, '');
}
function normalizeDigits(d) {
  return d.length === 11 && d.startsWith('1') ? d.substring(1) : d;
}

// ─── canonical poles ───
function loadCanonical() {
  const src = fs.readFileSync(CANONICAL_PHONES, 'utf8');
  const lines = src.split(/\r?\n/);
  const poles = new Map(); // digits → {group, slug, value, blockDial, category, notes}
  let currentGroup = null;
  let currentSlug = null;
  let currentValue = null;
  let currentBlockDial = false;
  let currentCategory = null;
  let currentNotes = null;
  let depth = 0;

  for (const line of lines) {
    // Top-level group: `export const MC = {`
    const groupMatch = line.match(/^export const ([A-Z_]+)\s*=\s*\{/);
    if (groupMatch) {
      currentGroup = groupMatch[1];
      continue;
    }
    // Slug: any identifier-key opening brace (some are nested)
    const slugMatch = line.match(/^\s*([a-zA-Z][a-zA-Z0-9_]*)\s*:\s*\{/);
    if (slugMatch && currentGroup) {
      currentSlug = slugMatch[1];
      // reset per-pole accumulators
      currentValue = null;
      currentBlockDial = false;
      currentCategory = null;
      currentNotes = null;
    }
    const valueMatch = line.match(/value\s*:\s*['"]([^'"]+)['"]/);
    if (valueMatch) currentValue = valueMatch[1];
    if (/blockDial\s*:\s*true/.test(line)) currentBlockDial = true;
    const catMatch = line.match(/category\s*:\s*['"]([^'"]+)['"]/);
    if (catMatch) currentCategory = catMatch[1];
    const notesMatch = line.match(/notes\s*:\s*['"]([^'"]+)['"]/);
    if (notesMatch) currentNotes = notesMatch[1];

    // Close brace at slug level emits the pole if value is set
    if (/^\s*\},\s*$/.test(line) && currentSlug && currentValue) {
      const digits = normalizeDigits(digitsOnly(currentValue));
      if (digits.length >= 3) {
        poles.set(currentGroup + '.' + currentSlug, {
          group: currentGroup,
          slug: currentSlug,
          value: currentValue,
          digits,
          blockDial: currentBlockDial,
          category: currentCategory,
          notes: currentNotes,
        });
      }
      currentSlug = null;
      currentValue = null;
      currentBlockDial = false;
      currentCategory = null;
      currentNotes = null;
    }
  }
  return poles;
}

// ─── programs.js ───
function loadPrograms() {
  const src = fs.readFileSync(PROGRAMS_FILE, 'utf8');
  const lines = src.split(/\r?\n/);
  const programs = []; // {id, name, phone, digits, hidden, sensitiveTopic, category}
  for (const line of lines) {
    const idMatch = line.match(/\bid:"([^"]+)"/);
    if (!idMatch) continue;
    const id = idMatch[1];
    const nameMatch = line.match(/\bn:"([^"]+)"/);
    const phMatch = line.match(/\bph:"([^"]+)"/);
    const cMatch = line.match(/\bc:"([^"]+)"/);
    const hidden = /\bhidden:\s*true\b/.test(line);
    const sensitiveTopic = (line.match(/\bsensitiveTopic:\s*"([^"]+)"/) || [])[1] || null;
    if (!phMatch) continue;
    const digits = normalizeDigits(digitsOnly(phMatch[1]));
    if (digits.length < 3) continue;
    programs.push({
      id,
      name: nameMatch ? nameMatch[1] : null,
      phone: phMatch[1],
      digits,
      hidden,
      sensitiveTopic,
      category: cMatch ? cMatch[1] : null,
    });
  }
  return programs;
}

// ─── legal entries ───
function loadLegalEntries() {
  const out = []; // {entryId, digits, raw, lineNumber}
  for (const f of fs.readdirSync(ENTRIES_DIR)) {
    if (!f.endsWith('.js')) continue;
    const entryId = f.replace(/\.js$/, '');
    const filepath = path.join(ENTRIES_DIR, f);
    const lines = fs.readFileSync(filepath, 'utf8').split(/\r?\n/);
    const seenInThisFile = new Set();
    lines.forEach((line, idx) => {
      // Standard 10/11-digit numbers
      const matches = [...line.matchAll(PHONE_RE)];
      for (const m of matches) {
        const raw = (m[1] || m[0]).trim();
        const digits = digitsOnly(raw);
        const normalized = normalizeDigits(digits);
        if (normalized.length !== 10) continue;
        if (normalized[0] === '0' || normalized[0] === '1') continue;
        if (seenInThisFile.has(normalized)) continue; // de-dup per file
        seenInThisFile.add(normalized);
        out.push({ entryId, digits: normalized, raw, lineNumber: idx + 1 });
      }
      // Short codes
      for (const code of SHORT_CODE_LITERALS) {
        const codeRe = new RegExp("(?:^|[\\s'\"`,;])" + code + "(?:[\\s'\"`,;.]|$)", 'g');
        if (codeRe.test(line)) {
          if (seenInThisFile.has(code)) continue;
          seenInThisFile.add(code);
          out.push({ entryId, digits: code, raw: code, lineNumber: idx + 1 });
        }
      }
    });
  }
  return out;
}

function main() {
  console.log('Loading canonical poles...');
  const poles = loadCanonical();
  console.log('  Poles:', poles.size);

  console.log('Loading programs.js...');
  const programs = loadPrograms();
  console.log('  Programs with phones:', programs.length);

  console.log('Walking legal entries for phone references...');
  const entryPhones = loadLegalEntries();
  console.log('  Unique (entryId, digits) pairs:', entryPhones.length);

  // Build digits → record
  const byDigits = new Map();

  function ensure(digits) {
    if (!byDigits.has(digits)) {
      byDigits.set(digits, {
        digits,
        value: null,
        blockDial: false,
        category: null,
        notes: null,
        owners: [],
        name: null,
      });
    }
    return byDigits.get(digits);
  }

  for (const [_, p] of poles) {
    const r = ensure(p.digits);
    r.value = p.value;
    if (p.blockDial) r.blockDial = true;
    if (p.category && !r.category) r.category = p.category;
    if (p.notes && !r.notes) r.notes = p.notes;
    r.owners.push({ type: 'pole', group: p.group, slug: p.slug, value: p.value });
    if (!r.name) r.name = p.group + '.' + p.slug;
  }

  for (const p of programs) {
    const r = ensure(p.digits);
    if (!r.value) r.value = p.phone;
    r.owners.push({ type: 'program', id: p.id, name: p.name, hidden: p.hidden, sensitiveTopic: p.sensitiveTopic, category: p.category });
    if (!r.name && p.name) r.name = p.name;
  }

  for (const e of entryPhones) {
    const r = ensure(e.digits);
    if (!r.value) r.value = e.raw;
    r.owners.push({ type: 'entry', id: e.entryId, line: e.lineNumber, raw: e.raw });
  }

  // Sort
  const records = [...byDigits.values()].sort((a, b) => b.owners.length - a.owners.length);

  // Stats
  const stats = {
    generatedAt: new Date().toISOString(),
    uniqueNumbers: records.length,
    blockDial: records.filter(r => r.blockDial).length,
    polesOnly: records.filter(r => r.owners.every(o => o.type === 'pole')).length,
    programsOnly: records.filter(r => r.owners.every(o => o.type === 'program')).length,
    entriesOnly: records.filter(r => r.owners.every(o => o.type === 'entry')).length,
    multiSourced: records.filter(r => new Set(r.owners.map(o => o.type)).size > 1).length,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ stats, records }, null, 2));
  console.log('');
  console.log('Wrote', records.length, 'tagged phone records to', OUT);
  console.log('Stats:', stats);
}

main();
