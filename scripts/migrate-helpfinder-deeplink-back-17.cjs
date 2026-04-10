#!/usr/bin/env node
/**
 * scripts/migrate-helpfinder-deeplink-back-17.cjs
 *
 * Follow-up to migration 16. The previous fix gated the onExit behavior
 * on `step === STEPS.RESULTS`, which only catches the case where the
 * user deep-links DIRECTLY to results. For categories that route through
 * QUESTION / WHO / HOW first (like pets), the user reaches RESULTS by
 * answering, clicks Back once (condition fires, exits — correct), BUT
 * if they were on any intermediate step and clicked Back, the condition
 * didn't fire and they walked backward into the phantom state machine.
 *
 * Correct behavior: if enteredViaDeepLink is true, ANY Back click exits
 * to the homepage, because every step behind the user is phantom —
 * they never visited HOME / WHAT_TAB / WHAT_CAT.
 *
 * Single patch. Drops the step check.
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'components', 'HelpFinder.jsx');

let src = fs.readFileSync(FILE, 'utf8');
const orig = src;
const hadCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

const oldStr = 'onClick={() => { if (enteredViaDeepLink && step === STEPS.RESULTS) { if (onExit) onExit(); } else { goTo(Math.max(0, step - 1)); } }} aria-label={t(lang, "back")}';
const newStr = 'onClick={() => { if (enteredViaDeepLink) { if (onExit) onExit(); } else { goTo(Math.max(0, step - 1)); } }} aria-label={t(lang, "back")}';

if (src.includes(newStr) && !src.includes(oldStr)) {
  console.log('Already applied, skipping.');
  process.exit(0);
}

if (!src.includes(oldStr)) {
  console.error('FATAL: anchor not found. Migration 16 must run first.');
  process.exit(1);
}

src = src.replace(oldStr, newStr);

if (hadCRLF) src = src.replace(/\n/g, '\r\n');
fs.writeFileSync(FILE, src);

console.log(`HelpFinder.jsx: ${orig.length} → ${src.length} bytes`);
console.log('Patch applied: Back button now exits on any step when enteredViaDeepLink is true.');
