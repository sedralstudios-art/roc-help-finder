#!/usr/bin/env node
/**
 * scripts/migrate-helpfinder-deeplink-back-16.cjs
 *
 * Phase 0 of SEO arc — pre-SEO cleanup.
 *
 * Bug: when a user enters HelpFinder via a deep-link (e.g. tapping the
 * pets tile → /help#c=pets), they land directly on STEPS.RESULTS (step 5).
 * The Back button at line 2021 calls goTo(Math.max(0, step - 1)) which
 * decrements the step number. From RESULTS that walks them backward
 * through HOW (4) → WHO (3) → WHAT_CAT (2) → WHAT_TAB (1) → HOME (0) —
 * every step they never visited. This creates an unintended back-door
 * into the full HelpFinder experience for users who came in via the
 * pets tile.
 *
 * Fix: track whether the current session entered via a deep-link. If
 * true AND the user is on RESULTS, the Back button calls onExit() to
 * return to the homepage instead of walking the state machine backward.
 *
 * Three patches, atomic:
 *   1. Add enteredViaDeepLink useState (defaults false)
 *   2. Set the flag inside the FIX 14 deep-link useEffect when a valid
 *      hash category is detected
 *   3. Update the Back button onClick to check the flag and call
 *      onExit() if true && on RESULTS
 *
 * Idempotent. Aborts cleanly if any anchor not found.
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'components', 'HelpFinder.jsx');

let src = fs.readFileSync(FILE, 'utf8');
const orig = src;
const hadCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

let patchesApplied = 0;
let patchesSkipped = 0;

function abort(msg) {
  console.error('FATAL:', msg);
  console.error('No changes written.');
  process.exit(1);
}

function patch(name, alreadyAppliedCheck, oldStr, newStr) {
  if (alreadyAppliedCheck(src)) {
    console.log(`  ${name}: already applied, skipping`);
    patchesSkipped++;
    return;
  }
  if (!src.includes(oldStr)) {
    abort(`${name}: anchor not found`);
  }
  src = src.replace(oldStr, newStr);
  console.log(`  ${name}: applied`);
  patchesApplied++;
}

console.log('');

// ─────────────────────────────────────────────
// PATCH 1: Add enteredViaDeepLink useState after userTown
// ─────────────────────────────────────────────
console.log('━━ 1. Add enteredViaDeepLink state ━━');
{
  const oldStr = '  const [userTown, setUserTown] = useState(null);  // null = no town filter; set by future town picker / zip lookup / URL param';
  const newStr = `  const [userTown, setUserTown] = useState(null);  // null = no town filter; set by future town picker / zip lookup / URL param
  const [enteredViaDeepLink, setEnteredViaDeepLink] = useState(false);  // true when the session was entered via a hash deep-link (e.g. /help#c=pets) — Back button uses this to call onExit() from RESULTS instead of walking the state machine backward`;

  patch(
    'enteredViaDeepLink useState',
    (s) => s.includes('enteredViaDeepLink, setEnteredViaDeepLink'),
    oldStr,
    newStr
  );
}

// ─────────────────────────────────────────────
// PATCH 2: Set the flag inside the FIX 14 useEffect
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 2. Set enteredViaDeepLink flag in FIX 14 useEffect ━━');
{
  // Anchor on the unique 2-line sequence inside the deep-link useEffect.
  // setCategory(c) followed by the DV check is unique to FIX 14.
  const oldStr = '      if (c && CATEGORIES[c]) {\n        setCategory(c);\n        if (DV_CATS.has(c)) setShowDVExit(true);';
  const newStr = '      if (c && CATEGORIES[c]) {\n        setCategory(c);\n        setEnteredViaDeepLink(true);\n        if (DV_CATS.has(c)) setShowDVExit(true);';

  patch(
    'set deep-link flag',
    (s) => s.includes('setEnteredViaDeepLink(true);\n        if (DV_CATS.has(c))'),
    oldStr,
    newStr
  );
}

// ─────────────────────────────────────────────
// PATCH 3: Update Back button onClick
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 3. Update Back button onClick to honor deep-link flag ━━');
{
  // The Back button onClick is unique — only line in the file with this exact pattern
  const oldStr = 'onClick={() => goTo(Math.max(0, step - 1))} aria-label={t(lang, "back")}';
  const newStr = 'onClick={() => { if (enteredViaDeepLink && step === STEPS.RESULTS) { if (onExit) onExit(); } else { goTo(Math.max(0, step - 1)); } }} aria-label={t(lang, "back")}';

  patch(
    'Back button onClick',
    (s) => s.includes('if (enteredViaDeepLink && step === STEPS.RESULTS)'),
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
console.log(`Patches applied: ${patchesApplied}, skipped: ${patchesSkipped}`);
