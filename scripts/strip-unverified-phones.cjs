// scripts/strip-unverified-phones.cjs
//
// One-shot reset 2026-05-03. Wipes every phone number from the website-facing
// data layer EXCEPT crisis lines (canonical poles with blockDial:true). Each
// of those crisis numbers serves a user-in-crisis call and is sourced from
// federal/national hotlines whose numbers are stable and publicly published.
// Everything else is treated as untrusted by default and earns its way back
// onto the site through manual verification, one number at a time.
//
// Operations:
//   1. programs.js: ph:"..." → ph:""
//   2. legal entry counsel[]: phone:"..." → phone:""
//   3. canonical/phones.js: value:"..." cleared on non-blockDial poles
//   4. legal entry prose (yourRights, legalOptions, whatItMeans, etc.):
//      replace 10-digit phone numbers with "[number being verified]" except
//      for digits in the preserved-crisis set.
//
// Idempotent: re-runs are safe (already-empty fields stay empty).

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PROGRAMS = path.join(ROOT, 'src', 'data', 'programs.js');
const ENTRIES_DIR = path.join(ROOT, 'src', 'data', 'legal', 'entries');
const CANONICAL = path.join(ROOT, 'src', 'data', 'canonical', 'phones.js');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');

// Build the preserved-digits set from canonical/phones.js blockDial:true poles.
// These are the ONLY numbers we leave intact across the strip — crisis lines.
function loadPreservedDigits() {
  const src = fs.readFileSync(CANONICAL, 'utf8');
  const preserved = new Set();
  const lines = src.split(/\r?\n/);
  // Walk in blocks of pole entries. A pole opens with `slug: { ... }`. Inside,
  // value:'X' and blockDial:true might appear. When the pole closes (matching
  // brace at depth), we've seen everything for that pole.
  let inPole = false;
  let depth = 0;
  let currentValue = null;
  let currentBlockDial = false;
  for (const line of lines) {
    const slugOpen = line.match(/^\s*[a-zA-Z][a-zA-Z0-9_]*\s*:\s*\{/);
    if (slugOpen && !inPole) {
      inPole = true;
      depth = 1;
      currentValue = null;
      currentBlockDial = false;
      continue;
    }
    if (inPole) {
      const opens = (line.match(/\{/g) || []).length;
      const closes = (line.match(/\}/g) || []).length;
      depth += opens - closes;
      const valueMatch = line.match(/value\s*:\s*['"]([^'"]+)['"]/);
      if (valueMatch) currentValue = valueMatch[1];
      if (/blockDial\s*:\s*true/.test(line)) currentBlockDial = true;
      if (depth === 0) {
        if (currentBlockDial && currentValue) {
          // Normalize: keep both display form and digits-only
          preserved.add(currentValue);
          const digits = currentValue.replace(/\D/g, '');
          if (digits.length >= 3) preserved.add(digits);
          // For 11-digit normalize to 10
          if (digits.length === 11 && digits.startsWith('1')) {
            preserved.add(digits.substring(1));
          }
          // Add normalized 10-digit if input had separators
          if (digits.length === 10) preserved.add(digits);
        }
        inPole = false;
        depth = 0;
      }
    }
  }
  return preserved;
}

function digitsOf(s) {
  const d = String(s || '').replace(/\D/g, '');
  return d.length === 11 && d.startsWith('1') ? d.substring(1) : d;
}

// Phone regex catches 10-digit US numbers in any common format.
// Excludes 3-digit short codes (988, 211, 311, 911) and 6-digit text codes (741741)
// because those are <10 digits and won't match this pattern anyway.
const PHONE_RE = /(?<![\d\.])((?:1[-.\s]?)?\(?([2-9]\d{2})\)?[-.\s]*(\d{3})[-.\s]*(\d{4}))(?!\d)/g;

// In strings, replace non-preserved phone matches with placeholder.
// Preserved (crisis) numbers stay intact.
function stripPhonesInText(text, preserved) {
  return text.replace(PHONE_RE, (match) => {
    const d = digitsOf(match);
    if (preserved.has(d) || preserved.has(match)) return match;
    return '[number being verified]';
  });
}

function stripPrograms(preserved) {
  let src = fs.readFileSync(PROGRAMS, 'utf8');
  let phReplacements = 0;
  // ph:"..." → ph:""  (exact field replace; doesn't touch ph fields whose
  // value is in the preserved set — though programs.js shouldn't carry
  // crisis-short-codes as program phones, this is defensive)
  src = src.replace(/\bph:"([^"]+)"/g, (match, val) => {
    const d = digitsOf(val);
    if (preserved.has(d) || preserved.has(val)) return match; // unlikely but safe
    phReplacements++;
    return 'ph:""';
  });
  if (!DRY_RUN) fs.writeFileSync(PROGRAMS, src);
  return { phReplacements };
}

function stripCanonical() {
  // Clear value:'X' on poles where blockDial is NOT true.
  // Walk same as loadPreservedDigits but rewrite values for non-preserved poles.
  let src = fs.readFileSync(CANONICAL, 'utf8');
  const lines = src.split(/\r?\n/);
  let cleared = 0;
  let inPole = false;
  let depth = 0;
  let poleStartLine = -1;
  let valueLineIdx = -1;
  let currentBlockDial = false;
  const blockEnds = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const slugOpen = line.match(/^\s*[a-zA-Z][a-zA-Z0-9_]*\s*:\s*\{/);
    if (slugOpen && !inPole) {
      inPole = true;
      depth = 1;
      poleStartLine = i;
      valueLineIdx = -1;
      currentBlockDial = false;
      continue;
    }
    if (inPole) {
      const opens = (line.match(/\{/g) || []).length;
      const closes = (line.match(/\}/g) || []).length;
      depth += opens - closes;
      if (/value\s*:\s*['"][^'"]+['"]/.test(line)) valueLineIdx = i;
      if (/blockDial\s*:\s*true/.test(line)) currentBlockDial = true;
      if (depth === 0) {
        if (!currentBlockDial && valueLineIdx >= 0) {
          // Clear the value
          const oldLine = lines[valueLineIdx];
          const newLine = oldLine.replace(/value\s*:\s*['"][^'"]+['"]/, "value: ''");
          if (oldLine !== newLine) {
            lines[valueLineIdx] = newLine;
            cleared++;
          }
        }
        inPole = false;
        depth = 0;
      }
    }
  }
  const out = lines.join('\n');
  if (!DRY_RUN) fs.writeFileSync(CANONICAL, out);
  return { cleared };
}

function stripEntries(preserved) {
  let counselPhonesCleared = 0;
  let inlineProseStripped = 0;
  let filesEdited = 0;
  const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith('.js'));
  for (const f of files) {
    const fp = path.join(ENTRIES_DIR, f);
    let src = fs.readFileSync(fp, 'utf8');
    let edited = false;

    // counsel[] phone fields
    const newSrc1 = src.replace(/\bphone:\s*"([^"]+)"/g, (match, val) => {
      const d = digitsOf(val);
      if (preserved.has(d) || preserved.has(val)) return match;
      counselPhonesCleared++;
      edited = true;
      return 'phone: ""';
    });
    src = newSrc1;

    // Inline prose strings: en:"..." in any block. Strip phone digits in text.
    // Use a simple en:"..." match — the prose strings live there. Use string
    // walk to find each en:"..." and rewrite content.
    src = src.replace(/(\ben:\s*")((?:[^"\\]|\\.)*)(")/g, (match, pre, body, post) => {
      // Quick early-out: no digits, no work
      if (!/\d/.test(body)) return match;
      const newBody = stripPhonesInText(body, preserved);
      if (newBody !== body) {
        // Count inline strips by counting the placeholder occurrences
        const adds = (newBody.match(/\[number being verified\]/g) || []).length;
        const had = (body.match(/\[number being verified\]/g) || []).length;
        inlineProseStripped += (adds - had);
        edited = true;
      }
      return pre + newBody + post;
    });

    if (edited) {
      if (!DRY_RUN) fs.writeFileSync(fp, src);
      filesEdited++;
    }
  }
  return { counselPhonesCleared, inlineProseStripped, filesEdited };
}

function main() {
  const preserved = loadPreservedDigits();
  console.log('Preserved (crisis) digits/values:', [...preserved].length);
  console.log('Sample:', [...preserved].slice(0, 8).join(', '));
  console.log('');

  const progRes = stripPrograms(preserved);
  console.log('programs.js: cleared', progRes.phReplacements, 'ph: fields');

  const canonRes = stripCanonical();
  console.log('canonical/phones.js: cleared', canonRes.cleared, 'value: fields on non-crisis poles');

  const entRes = stripEntries(preserved);
  console.log('legal entries: cleared', entRes.counselPhonesCleared, 'counsel[] phone fields');
  console.log('legal entries: replaced', entRes.inlineProseStripped, 'inline prose phone numbers with [number being verified]');
  console.log('legal entries: edited', entRes.filesEdited, 'files');
  console.log('');
  console.log(DRY_RUN ? '(DRY RUN — no writes)' : 'Strip complete.');
}

main();
