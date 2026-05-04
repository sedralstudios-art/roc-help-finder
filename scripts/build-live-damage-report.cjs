// scripts/build-live-damage-report.cjs
// Phase 0 of the data-tangle cleanup. Produces call-data/live-damage-report.md
// that lists every visible-on-site row that's broken, what the page shows,
// what the call actually rings, plus the verbatim transcript quote.
//
// No source-file edits. Read-only audit.

const fs = require('fs');
const path = require('path');

const PROGRAMS_FILE = path.join(__dirname, '..', 'src', 'data', 'programs.js');
const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');
const RESULTS_FILE = path.join(__dirname, '..', 'call-data', 'results.json');
const OUT_FILE = path.join(__dirname, '..', 'call-data', 'live-damage-report.md');

// Pulled from the refined transcript audit (data-tangle-review.md).
// Each carries the verbatim transcript-stated org so the source-quote travels
// with every finding.
const WRONG_NUMBERS = [
  { digits: '5853251796', catalogued: 'Dimitri House',                   answered: 'Penfield Recreation' },
  { digits: '5856471150', catalogued: 'VOA Residential Reentry',         answered: 'Town of Henrietta Building and Fire Prevention Department' },
  { digits: '5858518886', catalogued: 'Reentry Association of Western NY (RAWNY)', answered: 'Village Health Office' },
  { digits: '5859221250', catalogued: 'Goodwill (Career Help)',          answered: 'Parma Public Library' },
  { digits: '5854286617', catalogued: 'Passport Office (City Hall)',     answered: 'Town of Ogden Building Department' },
  { digits: '5854287538', catalogued: 'Rochester City Council (Constituent Help)', answered: 'Trillium Health' },
  { digits: '5854426470', catalogued: 'Center for Independent Living',   answered: 'County of Ogden Assessor’s Office' },
  { digits: '5856371134', catalogued: 'Clarkson Justice Court',          answered: 'Hamlin Public Library' },
  { digits: '5853366020', catalogued: 'Irondequoit Building Department', answered: 'criminal branch of Rochester City Court' },
  { digits: '5853408655', catalogued: 'Penfield Recreation and Parks',   answered: 'DePaul' },
];

const DEAD_NUMBERS = [
  { digits: '5853250186', catalogued: 'Narcotics Anonymous Rochester' },
  { digits: '5853251880', catalogued: 'CDPAP' },
  { digits: '5857232396', catalogued: 'abandoned-house-next-door-ny callout' },
  { digits: '5854285425', catalogued: 'grand-jury-process-ny callout' },
  { digits: '5853366075', catalogued: 'moving-truck-street-permit-ny callout' },
  { digits: '5854345577', catalogued: 'charitable-solicitation-registration-ny callout' },
  { digits: '5852425080', catalogued: 'kindergarten-enrollment-age-ny callout' },
  { digits: '8003597758', catalogued: 'military-divorce-benefits-ny callout' },
  { digits: '5184742121', catalogued: 'moped-limited-use-motorcycle-ny callout' },
];

const HOST_ORG_CASES = [
  { digits: '5853348130', catalogued: 'Venture Compassionate Ministries Food Pantry', host: 'Calvary Community Church of the Nazarene' },
  { digits: '5856379770', catalogued: 'The Gathering Table (Free Meal)',               host: 'Brockport First Baptist Church' },
  { digits: '5858899896', catalogued: 'Chili Presbyterian Food Cupboard',              host: 'First Presbyterian Church of Chili' },
  { digits: '5858892028', catalogued: 'Grace’s Table Food Cupboard',              host: 'Grace Episcopal Church in Scottsville' },
];

function buildPhoneRegex(d) {
  const sep = '[\\s.\\-()]*';
  return new RegExp(`(?<![0-9])${d.slice(0,3)}${sep}${d.slice(3,6)}${sep}${d.slice(6,10)}(?![0-9])`, 'g');
}

// Find each program row by locating `{id:"..."` openers and brace-walking
// until balanced. Programs.js rows can contain nested braces (e.g., serviceArea
// objects) so a flat regex misses them.
function loadPrograms() {
  const src = fs.readFileSync(PROGRAMS_FILE, 'utf8');
  const rows = [];
  const re = /\{\s*id:"([^"]*)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const startIdx = m.index;
    let depth = 0;
    let i = startIdx;
    for (; i < src.length; i++) {
      const ch = src[i];
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) { i++; break; }
      }
    }
    const blob = src.substring(startIdx, i);
    const get = (k) => (blob.match(new RegExp('\\b' + k + ':"((?:[^"\\\\]|\\\\.)*)"')) || [])[1] || null;
    const hidden = /\bhidden:\s*true\b/.test(blob);
    const draft = /\bstatus:"draft"/.test(blob);
    rows.push({
      raw: blob,
      id: m[1],
      n: get('n'),
      ph: get('ph'),
      c: get('c'),
      sensitiveTopic: get('sensitiveTopic'),
      hidden,
      draft,
    });
  }
  return rows;
}

function findEntryFilesContainingDigits(digits) {
  const re = buildPhoneRegex(digits);
  const hits = [];
  for (const f of fs.readdirSync(ENTRIES_DIR)) {
    if (!f.endsWith('.js')) continue;
    const fp = path.join(ENTRIES_DIR, f);
    const src = fs.readFileSync(fp, 'utf8');
    re.lastIndex = 0;
    if (re.test(src)) hits.push(f);
  }
  return hits;
}

// Match transcripts to a number by digits-only normalization
function loadVerbatimByDigits() {
  const r = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
  const m = new Map();
  for (const x of r) {
    if (x.status !== 'success' || !x.transcript) continue;
    const d = String(x.number || '').replace(/\D/g, '');
    const norm = d.length === 11 && d.startsWith('1') ? d.substring(1) : d;
    if (!m.has(norm)) m.set(norm, []);
    m.get(norm).push({
      transcript: x.transcript,
      timestamp: x.timestamp,
      recording: x.recording,
      source: String(x.recording || '').endsWith('.amr') ? 'apr17' : 'may',
    });
  }
  return m;
}

function main() {
  console.log('Building live-damage-report.md...');
  const programs = loadPrograms();
  const verbatim = loadVerbatimByDigits();

  // Index programs by ph digits
  const programsByDigits = new Map();
  for (const p of programs) {
    if (!p.ph) continue;
    const d = p.ph.replace(/\D/g, '');
    const norm = d.length === 11 && d.startsWith('1') ? d.substring(1) : d;
    if (!programsByDigits.has(norm)) programsByDigits.set(norm, []);
    programsByDigits.get(norm).push(p);
  }

  let md = `# HelpFinder Live Damage Report\n\nGenerated ${new Date().toISOString()}.\n\n`;
  md += `Phase 0 audit. Read-only — no source-file edits made.\n\n`;
  md += `Sources:\n- \`call-data/results.json\` (transcript audit)\n- \`src/data/programs.js\` (current live programs)\n- \`src/data/legal/entries/\` (legal-entry callouts)\n\n`;
  md += `---\n\n`;

  // SECTION 1 — Active programs with wrong-number drift
  md += `## 1. Active programs with wrong-number drift (live, visible to users)\n\n`;
  md += `Each row: programs.js currently displays the catalogued name and number, but the number actually rings to a different organization.\n\n`;
  let wrongLive = 0;
  for (const w of WRONG_NUMBERS) {
    const hits = programsByDigits.get(w.digits) || [];
    const callCtx = (verbatim.get(w.digits) || [])[0];
    md += `### \`${w.digits}\` — ${w.catalogued}\n`;
    if (hits.length === 0) {
      md += `- programs.js: not currently in source (may have been removed)\n`;
    } else {
      for (const h of hits) {
        const live = !h.hidden && !h.draft;
        if (live) wrongLive++;
        md += `- programs.js row: \`id="${h.id}"\` \`n="${h.n}"\` \`c="${h.c||''}"\` ${live ? '**LIVE**' : '(hidden/draft)'}\n`;
      }
    }
    md += `- Call confirmed: answered as **${w.answered}**\n`;
    if (callCtx) {
      md += `  - Verbatim transcript opening: \`${callCtx.transcript.slice(0, 200).replace(/[\r\n]+/g, ' ')}\`\n`;
      md += `  - Recording: \`${callCtx.recording}\`\n`;
      md += `  - Run: ${callCtx.timestamp} (${callCtx.source})\n`;
    }
    md += `\n`;
  }
  md += `**Live wrong-number programs visible right now: ${wrongLive}**\n\n`;
  md += `---\n\n`;

  // SECTION 2 — Disconnected numbers
  md += `## 2. Disconnected numbers\n\n`;
  md += `These rang to "this number is no longer in service" or equivalent.\n\n`;
  for (const d of DEAD_NUMBERS) {
    const hits = programsByDigits.get(d.digits) || [];
    const entryHits = findEntryFilesContainingDigits(d.digits);
    const callCtx = (verbatim.get(d.digits) || [])[0];
    md += `### \`${d.digits}\` — ${d.catalogued}\n`;
    if (hits.length) {
      for (const h of hits) {
        const live = !h.hidden && !h.draft;
        md += `- programs.js: \`id="${h.id}"\` \`n="${h.n}"\` ${live ? '**LIVE**' : '(hidden/draft)'}\n`;
      }
    }
    if (entryHits.length) {
      md += `- Referenced in **${entryHits.length}** legal entry file(s):\n`;
      for (const f of entryHits) md += `  - \`${f}\`\n`;
    }
    if (!hits.length && !entryHits.length) {
      md += `- not in any current source file\n`;
    }
    if (callCtx) {
      md += `- Verbatim: \`${callCtx.transcript.slice(0, 150).replace(/[\r\n]+/g, ' ')}\`\n`;
    }
    md += `\n`;
  }
  md += `---\n\n`;

  // SECTION 3 — id↔name mismatches in programs.js
  md += `## 3. id↔name mismatches in programs.js\n\n`;
  md += `Independent of phone drift. The \`id\` column suggests one organization but the \`n\` (display name) is a different one. Likely from an older bulk-import where ids got reused with new names.\n\n`;
  const SUSPECT_PAIRS = [
    { id: 'syep',       expectedFromId: 'Summer Youth Employment Program',     actualName: null },
    { id: 'mcleg',      expectedFromId: 'Monroe County Legislature',           actualName: null },
    { id: 'opwdd',      expectedFromId: 'Office for People With Developmental Disabilities (state)', actualName: null },
    { id: 'aa',         expectedFromId: 'Alcoholics Anonymous',                actualName: null },
    { id: 'oakorchard', expectedFromId: 'Oak Orchard Health',                  actualName: null },
    { id: 'rhaftfood',  expectedFromId: 'Rochester Help A Family Today (food)',actualName: null },
  ];
  for (const s of SUSPECT_PAIRS) {
    const row = programs.find(p => p.id === s.id);
    if (row) s.actualName = row.n;
  }
  md += `| programs.js id | Display name (n) | Likely intended (from id) | Match? |\n|---|---|---|---|\n`;
  for (const s of SUSPECT_PAIRS) {
    const ok = s.actualName && s.expectedFromId.toLowerCase().includes(String(s.actualName).toLowerCase().split(/[\s(]+/)[0]);
    md += `| \`${s.id}\` | ${s.actualName || '—'} | ${s.expectedFromId} | ${ok ? 'maybe' : '**no**'} |\n`;
  }
  md += `\n---\n\n`;

  // SECTION 4 — null/null rows
  md += `## 4. \`id="null"\` / \`name="null"\` corrupt rows\n\n`;
  const nullRows = programs.filter(p => p.id === 'null' || p.n === 'null' || p.id === null || p.n === null);
  md += `Found **${nullRows.length}** rows with literal \`"null"\` or missing values:\n\n`;
  for (const r of nullRows.slice(0, 30)) {
    md += `- \`id="${r.id}"\` \`n="${r.n}"\` \`ph="${r.ph || ''}"\` \`c="${r.c || ''}"\` ${r.hidden ? '(hidden)' : '**LIVE**'}\n`;
  }
  if (nullRows.length > 30) md += `\n_(${nullRows.length - 30} more not shown)_\n`;
  md += `\n---\n\n`;

  // SECTION 5 — Host-org cases
  md += `## 5. Host-org pattern (food pantries hosted at churches)\n\n`;
  md += `Not "broken" — the number works, it just rings to the host venue rather than the program. Pantries should display both names so users aren't confused when the church answers.\n\n`;
  for (const h of HOST_ORG_CASES) {
    const hits = programsByDigits.get(h.digits) || [];
    md += `- \`${h.digits}\` — ${h.catalogued} → rings to **${h.host}**\n`;
    for (const r of hits) {
      const live = !r.hidden && !r.draft;
      md += `  - programs.js: \`id="${r.id}"\` \`n="${r.n}"\` ${live ? '**LIVE**' : ''}\n`;
    }
  }
  md += `\n---\n\n`;

  // SECTION 6 — Summary
  md += `## 6. Summary\n\n`;
  md += `| Bucket | Count |\n|---|---|\n`;
  md += `| Wrong-number drift, LIVE programs | ${wrongLive} |\n`;
  md += `| Disconnected numbers in programs.js | ${DEAD_NUMBERS.filter(d => programsByDigits.has(d.digits)).length} |\n`;
  md += `| Disconnected numbers referenced in legal entries | ${DEAD_NUMBERS.reduce((a, d) => a + findEntryFilesContainingDigits(d.digits).length, 0)} |\n`;
  md += `| id↔name suspect rows | ${SUSPECT_PAIRS.filter(s => s.actualName).length} |\n`;
  md += `| \`id="null"\` / \`n="null"\` corrupt rows | ${nullRows.length} |\n`;
  md += `| Host-org pattern (label fixes) | ${HOST_ORG_CASES.length} |\n`;
  md += `\n`;

  fs.writeFileSync(OUT_FILE, md);
  console.log('Wrote ' + OUT_FILE);
}

main();
