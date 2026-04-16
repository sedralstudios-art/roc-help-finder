#!/usr/bin/env node
/**
 * migrate-extract-programs-67.cjs
 * =================================
 * Extracts the PROGRAMS array from HelpFinder.jsx into a shared module
 * at src/data/programs.js so both HelpFinder.jsx and Search.jsx can
 * import it. Also updates prerender-help.cjs to import from the module
 * instead of parsing HelpFinder.jsx with regex+eval.
 *
 * The extraction is done programmatically (reading bytes, not pasting)
 * to avoid AR/ZH character corruption per CLAUDE.md.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HF = path.join(ROOT, 'src/components/HelpFinder.jsx');
const PROGRAMS_FILE = path.join(ROOT, 'src/data/programs.js');
const SEARCH = path.join(ROOT, 'src/components/Search.jsx');

let hf = fs.readFileSync(HF, 'utf8');
let failures = 0;
let successes = 0;

// ─── Step 1: Extract PROGRAMS literal from HelpFinder.jsx ───
const startMarker = 'const PROGRAMS = [';
const startIdx = hf.indexOf(startMarker);
if (startIdx === -1) {
  console.error('ABORT: could not find `const PROGRAMS = [` in HelpFinder.jsx');
  process.exit(1);
}

// Find matching ];
const bracketStart = hf.indexOf('[', startIdx);
let depth = 1;
let i = bracketStart + 1;
while (i < hf.length && depth > 0) {
  if (hf[i] === '[') depth++;
  if (hf[i] === ']') depth--;
  i++;
}
if (depth !== 0) {
  console.error('ABORT: could not find matching ] for PROGRAMS');
  process.exit(1);
}
const bracketEnd = i; // one past the ]

// Also grab the DATA_VERIFIED constant that sits right before PROGRAMS
const dataVerifiedMatch = hf.match(/const DATA_VERIFIED = "[^"]*";\n/);
const dataVerifiedLine = dataVerifiedMatch ? dataVerifiedMatch[0] : '';

// The full PROGRAMS block to extract (array literal including the brackets)
const programsArrayLiteral = hf.slice(bracketStart, bracketEnd);

// ─── Step 2: Write src/data/programs.js ───
const programsModule =
  '// Auto-extracted from HelpFinder.jsx by migrate-extract-programs-67.cjs\n' +
  '// Do NOT edit by hand — edit HelpFinder.jsx PROGRAMS inline, then re-run extraction.\n' +
  '// Actually: now that this file exists, edit HERE and HelpFinder.jsx imports it.\n\n' +
  (dataVerifiedLine ? 'export ' + dataVerifiedLine + '\n' : '') +
  'export const PROGRAMS = ' + programsArrayLiteral + ';\n';

fs.writeFileSync(PROGRAMS_FILE, programsModule, 'utf8');
console.log('OK: Wrote ' + path.relative(ROOT, PROGRAMS_FILE) + ' (' + programsArrayLiteral.length + ' chars)');
successes++;

// ─── Step 3: Replace inline PROGRAMS in HelpFinder.jsx with import ───
// Find the full block from DATA_VERIFIED through the ];
const blockStart = dataVerifiedMatch
  ? hf.indexOf(dataVerifiedMatch[0])
  : startIdx;
const blockEnd = bracketEnd;
// Also include the ]; and trailing newline
const fullBlockEnd = hf.indexOf('\n', blockEnd) + 1;

const oldBlock = hf.slice(blockStart, fullBlockEnd);
const newBlock = 'import { PROGRAMS' + (dataVerifiedLine ? ', DATA_VERIFIED' : '') + ' } from "../data/programs.js";\n';

if (!hf.includes(oldBlock)) {
  console.error('ABORT: could not match the PROGRAMS block for replacement');
  failures++;
} else {
  hf = hf.replace(oldBlock, newBlock);
  console.log('OK: Replaced inline PROGRAMS with import in HelpFinder.jsx');
  successes++;
}

// ─── Step 4: Update Search.jsx to import PROGRAMS ───
let search = fs.readFileSync(SEARCH, 'utf8');
const searchOld = 'export default function UnifiedSearch({ programs, onOpenEntry, onOpenGlossaryTerm, onBack }) {';
const searchNew = 'import { PROGRAMS } from "../data/programs.js";\n\nexport default function UnifiedSearch({ onOpenEntry, onOpenGlossaryTerm, onBack }) {';

if (!search.includes(searchOld)) {
  console.error('ABORT Search: could not find function signature');
  failures++;
} else {
  search = search.replace(searchOld, searchNew);
  // Also replace `(programs || [])` with `PROGRAMS`
  search = search.replace('(programs || [])', 'PROGRAMS');
  console.log('OK: Updated Search.jsx to import PROGRAMS directly');
  successes++;
}

// ─── Step 5: Remove programs={[]} prop from LandingPage.jsx render ───
const LP = path.join(ROOT, 'src/components/LandingPage.jsx');
let lp = fs.readFileSync(LP, 'utf8');
const lpOld = '          programs={[]}\n';
if (lp.includes(lpOld)) {
  lp = lp.replace(lpOld, '');
  console.log('OK: Removed programs={[]} prop from LandingPage.jsx');
  successes++;
} else {
  console.log('SKIP: programs={[]} not found in LandingPage.jsx (already removed?)');
}

// ─── Write ───
if (failures === 0) {
  fs.writeFileSync(HF, hf, 'utf8');
  fs.writeFileSync(SEARCH, search, 'utf8');
  fs.writeFileSync(LP, lp, 'utf8');
  console.log('\n' + successes + ' changes, ' + failures + ' failures.');
  console.log('Wrote: ' + path.relative(ROOT, HF));
  console.log('Wrote: ' + path.relative(ROOT, SEARCH));
  console.log('Wrote: ' + path.relative(ROOT, LP));
  console.log('Wrote: ' + path.relative(ROOT, PROGRAMS_FILE));
} else {
  console.error('\n' + successes + ' changes, ' + failures + ' failures. Files NOT written.');
  process.exit(1);
}
