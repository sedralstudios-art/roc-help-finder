#!/usr/bin/env node
/**
 * scripts/migrate-helpfinder-pets-fix-09.cjs
 *
 * Fix: migrate-07 patch 4 inserted the pets block with a leading comma,
 * but the existing PROGRAMS array's last entry (legalaidrecord) already
 * had a trailing comma. Result: `},,` — a sparse undefined element that
 * silently crashes any .filter() or .map() iterating PROGRAMS.
 *
 * Symptom: pets tile renders correctly on the homepage but the results
 * screen is empty because filteredPrograms throws on undefined.c.
 *
 * Fix: replace the unique `},,` anchor with `},` so the array has one
 * comma, not two, between legalaidrecord and the pets block.
 *
 * Also: surfaces all c:"pets" line numbers so we can investigate why the
 * count was 14 instead of the expected 9.
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'components', 'HelpFinder.jsx');

let src = fs.readFileSync(FILE, 'utf8');
const orig = src;
const hadCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

// Surface where c:"pets" actually appears in the file
console.log('━━ All c:"pets" line numbers (investigating count discrepancy) ━━');
const lines = src.split('\n');
const petLines = [];
lines.forEach((line, idx) => {
  if (line.includes('c:"pets"')) {
    petLines.push({ line: idx + 1, snippet: line.trim().slice(0, 80) });
  }
});
petLines.forEach(p => console.log(`  line ${p.line}: ${p.snippet}`));
console.log(`  total: ${petLines.length}`);
console.log('');

// The fix
if (!src.includes('reach:"remote" },,')) {
  console.log('Double-comma fix: anchor not found — may already be applied');
  const idx = src.indexOf('// PETS — added April 9, 2026');
  if (idx > 0) {
    const before = src.slice(Math.max(0, idx - 200), idx);
    if (before.includes(',,')) {
      console.error('FATAL: still have a double-comma somewhere near pets block');
      console.error('Context: ' + before.slice(-200));
      process.exit(1);
    }
  }
  console.log('  No double-comma found near pets — fix may already be applied');
  process.exit(0);
}

const oldStr = 'reach:"remote" },,';
const newStr = 'reach:"remote" },';

src = src.replace(oldStr, newStr);
console.log('Double-comma fix: applied');

if (hadCRLF) src = src.replace(/\n/g, '\r\n');
fs.writeFileSync(FILE, src);

console.log(`HelpFinder.jsx: ${orig.length} → ${src.length} bytes`);
