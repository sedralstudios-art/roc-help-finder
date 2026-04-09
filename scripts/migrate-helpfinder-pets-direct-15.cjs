#!/usr/bin/env node
/**
 * scripts/migrate-helpfinder-pets-direct-15.cjs
 *
 * Retry of migrate-14 patch 2 with a shorter anchor that avoids the
 * invisible-character issue around the sed-inserted <a opener line.
 *
 * Patch 1 (HelpFinderQuestions.js) is the same as migrate-14 — it was
 * rolled back atomically when patch 2 failed.
 *
 * Patch 2 uses a 3-line anchor: href + onClick + className. These three
 * lines are unique to the pets tile because the working "Find help now"
 * link at line 709 has `<a href="/help"` on a single line with 14-space
 * indented onClick, while the pets tile has href on its own line at
 * 12-space indent.
 *
 * Also updates the onClick to set window.location.hash = "c=pets" before
 * calling onNavigateHelp(). This is required because onClick calls
 * e.preventDefault() to stop the browser navigation, which means the
 * URL bar never updates — so without manually setting the hash, the
 * FIX-14 useEffect in HelpFinder would read an empty hash and do
 * nothing.
 */

const fs = require('fs');
const path = require('path');

const QUESTIONS_FILE = path.join(__dirname, '..', 'src', 'components', 'HelpFinderQuestions.js');
const LANDING_FILE   = path.join(__dirname, '..', 'src', 'components', 'LandingPage.jsx');

let src1 = fs.readFileSync(QUESTIONS_FILE, 'utf8');
let src2 = fs.readFileSync(LANDING_FILE, 'utf8');
const orig1 = src1;
const orig2 = src2;
const hadCRLF1 = src1.includes('\r\n');
const hadCRLF2 = src2.includes('\r\n');
src1 = src1.replace(/\r\n/g, '\n');
src2 = src2.replace(/\r\n/g, '\n');

let patchesApplied = 0;
let patchesSkipped = 0;

function abort(msg) {
  console.error('FATAL:', msg);
  console.error('No changes written.');
  process.exit(1);
}

function patch(fileNum, name, alreadyAppliedCheck, oldStr, newStr) {
  let src = fileNum === 1 ? src1 : src2;
  if (alreadyAppliedCheck(src)) {
    console.log(`  ${name}: already applied, skipping`);
    patchesSkipped++;
    return;
  }
  if (!src.includes(oldStr)) {
    abort(`${name}: anchor not found`);
  }
  src = src.replace(oldStr, newStr);
  if (fileNum === 1) src1 = src; else src2 = src;
  console.log(`  ${name}: applied`);
  patchesApplied++;
}

console.log('');

// ─────────────────────────────────────────────
// PATCH 1: Add 'pets' to CATEGORY_DIRECT_TO_RESULTS
// ─────────────────────────────────────────────
console.log('━━ 1. Add pets to CATEGORY_DIRECT_TO_RESULTS ━━');
{
  const oldBlock = `export const CATEGORY_DIRECT_TO_RESULTS = new Set([
  'domesticSvc',
  'crisisChild',
]);`;

  const newBlock = `export const CATEGORY_DIRECT_TO_RESULTS = new Set([
  'domesticSvc',
  'crisisChild',
  'pets',
]);`;

  patch(
    1,
    'pets direct-to-results',
    (s) => s.includes("'pets',\n]);"),
    oldBlock,
    newBlock
  );
}

// ─────────────────────────────────────────────
// PATCH 2: Change pets tile href + onClick (3-line anchor, no <a line)
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 2. Update pets tile href and onClick for deep-link ━━');
{
  const oldBlock = '            href="/help"\n            onClick={(e) => { e.preventDefault(); if (onNavigateHelp) onNavigateHelp(); }}\n            className="hf-fade-in hf-d5"';

  const newBlock = '            href="/help#c=pets"\n            onClick={(e) => { e.preventDefault(); window.location.hash = "c=pets"; if (onNavigateHelp) onNavigateHelp(); }}\n            className="hf-fade-in hf-d5"';

  patch(
    2,
    'pets tile href + onClick deep-link',
    (s) => s.includes('href="/help#c=pets"'),
    oldBlock,
    newBlock
  );
}

// Write both files
if (hadCRLF1) src1 = src1.replace(/\n/g, '\r\n');
if (hadCRLF2) src2 = src2.replace(/\n/g, '\r\n');

if (src1 !== orig1) {
  fs.writeFileSync(QUESTIONS_FILE, src1);
  console.log('');
  console.log(`HelpFinderQuestions.js: ${orig1.length} → ${src1.length} bytes`);
}
if (src2 !== orig2) {
  fs.writeFileSync(LANDING_FILE, src2);
  console.log(`LandingPage.jsx: ${orig2.length} → ${src2.length} bytes`);
}

if (src1 === orig1 && src2 === orig2) {
  console.log('');
  console.log('No changes (all patches already applied).');
}

console.log('');
console.log(`Patches applied: ${patchesApplied}, skipped: ${patchesSkipped}`);
