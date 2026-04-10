#!/usr/bin/env node
/**
 * scripts/migrate-helpfinder-back-nav-18.cjs
 *
 * Phase 0, part 3. Back-button refactor + latent bug fixes.
 *
 * Problems:
 *   A. WHAT_TAB (step 1) is reachable only via backward navigation. It
 *      shows a stripped-down version of the tabs that already exist on
 *      HOME (step 0). Users hit it and think HelpFinder is broken.
 *   B. HOME (step 0) has the Back button hidden, so users at the top
 *      of the HelpFinder stack have no visible way to return to the
 *      landing page (the HelpFinder logo click works but isn't discoverable).
 *   C. A useEffect writes `window.location.hash = "c=X&l=Y"` whenever
 *      any category reaches RESULTS, even on normal (non-deep-link)
 *      flows. This pollutes the URL and turns any remount into a fake
 *      deep-link session.
 *   D. The reset() function ("Start Over") does not clear
 *      enteredViaDeepLink, so the flag persists across sessions started
 *      via Start Over.
 *
 * Fix (four patches):
 *   1. Back button render condition: `step > STEPS.HOME` → `step >= STEPS.HOME`
 *      so the Back button is visible on HOME too.
 *   2. Back button onClick:
 *        - if enteredViaDeepLink OR step === HOME → onExit()
 *        - if step === WHAT_CAT → goTo(STEPS.HOME) (skip dead WHAT_TAB)
 *        - else → goTo(step - 1)
 *   3. Remove the hash-write branch from the results useEffect. Keep
 *      the HOME-clear branch.
 *   4. Add setEnteredViaDeepLink(false) to reset().
 *
 * Idempotent — aborts cleanly if any anchor not found.
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'components', 'HelpFinder.jsx');

let src = fs.readFileSync(FILE, 'utf8');
const orig = src;
const hadCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

let applied = 0;
let skipped = 0;

function patch(name, alreadyAppliedCheck, oldStr, newStr) {
  if (alreadyAppliedCheck(src)) {
    console.log(`  ${name}: already applied, skipping`);
    skipped++;
    return;
  }
  if (!src.includes(oldStr)) {
    console.error(`FATAL: ${name} — anchor not found`);
    console.error('No changes written.');
    process.exit(1);
  }
  src = src.replace(oldStr, newStr);
  console.log(`  ${name}: applied`);
  applied++;
}

console.log('');

// ─────────────────────────────────────────────
// PATCH 1: Back button render condition
// ─────────────────────────────────────────────
console.log('━━ 1. Back button visibility (show on HOME too) ━━');
patch(
  'back button render condition',
  (s) => s.includes('{step >= STEPS.HOME && (') && !s.includes('{step > STEPS.HOME && ('),
  '{step > STEPS.HOME && (',
  '{step >= STEPS.HOME && ('
);

// ─────────────────────────────────────────────
// PATCH 2: Back button onClick
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 2. Back button onClick (HOME→exit, WHAT_CAT→skip WHAT_TAB) ━━');
{
  const oldStr = 'onClick={() => { if (enteredViaDeepLink) { if (onExit) onExit(); } else { goTo(Math.max(0, step - 1)); } }} aria-label={t(lang, "back")}';
  const newStr = 'onClick={() => { if (enteredViaDeepLink || step === STEPS.HOME) { if (onExit) onExit(); } else if (step === STEPS.WHAT_CAT) { goTo(STEPS.HOME); } else { goTo(Math.max(0, step - 1)); } }} aria-label={t(lang, "back")}';
  patch(
    'back button onClick',
    (s) => s.includes('step === STEPS.WHAT_CAT) { goTo(STEPS.HOME)'),
    oldStr,
    newStr
  );
}

// ─────────────────────────────────────────────
// PATCH 3: Remove hash-write from results useEffect
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 3. Remove stale hash-write on RESULTS ━━');
{
  const oldStr = '    if (step === STEPS.RESULTS && category) {\n      try { window.location.hash = `c=${category}&l=${lang}`; } catch (e) {}\n    } else if (step === STEPS.HOME) {';
  const newStr = '    // Hash-write on RESULTS removed in migration 18 — it was polluting\n    // the URL on normal-flow navigation and causing remounts to appear\n    // as deep-link sessions. Deep-links still work via FIX 14 useEffect.\n    if (step === STEPS.HOME) {';
  patch(
    'remove hash-write',
    (s) => s.includes('Hash-write on RESULTS removed in migration 18'),
    oldStr,
    newStr
  );
}

// ─────────────────────────────────────────────
// PATCH 4: Start Over resets enteredViaDeepLink
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 4. Start Over resets enteredViaDeepLink ━━');
{
  const oldStr = '  const reset = () => {\n    setStep(STEPS.HOME); setTab(null); setCategory(null);';
  const newStr = '  const reset = () => {\n    setStep(STEPS.HOME); setTab(null); setCategory(null);\n    setEnteredViaDeepLink(false);';
  patch(
    'reset clears deep-link flag',
    (s) => s.includes('setEnteredViaDeepLink(false);\n    setNearMe(false)'),
    oldStr,
    newStr
  );
}

// Write file
if (hadCRLF) src = src.replace(/\n/g, '\r\n');

if (src !== orig) {
  fs.writeFileSync(FILE, src);
  console.log('');
  console.log(`HelpFinder.jsx: ${orig.length} → ${src.length} bytes`);
}

if (src === orig) {
  console.log('');
  console.log('No changes (all patches already applied).');
}

console.log('');
console.log(`Patches applied: ${applied}, skipped: ${skipped}`);
