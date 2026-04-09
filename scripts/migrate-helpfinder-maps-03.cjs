#!/usr/bin/env node
/**
 * scripts/migrate-helpfinder-maps-03.cjs
 *
 * Upgrades the program-card address link from the legacy Google Maps `?q=`
 * pin pattern to a universal native-handoff: directions-mode URL by default
 * (works on Android + desktop), with iOS detection that routes to Apple Maps
 * via deep-link so iPhone users land in Apple Maps with directions ready.
 *
 * Two patches:
 *   1. Add mapsHandoff helper function at module scope (after imports)
 *   2. Upgrade the existing maps <a> link to use the new pattern
 *
 * After this ships, tapping a program's address on any device opens that
 * device's native maps app with directions ready to start. No embedded map.
 * No website lock-in. The website hands off to the user's existing tools.
 *
 * Each patch is idempotent (skips if already applied) and aborts cleanly
 * if its anchor isn't found.
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
    abort(`${name}: anchor not found in HelpFinder.jsx`);
  }
  src = src.replace(oldStr, newStr);
  console.log(`  ${name}: applied`);
  patchesApplied++;
}

console.log('Reading HelpFinder.jsx...');
console.log('');

// ─────────────────────────────────────────────
// PATCH 1: Add mapsHandoff helper at module scope
// ─────────────────────────────────────────────
console.log('━━ 1. Add mapsHandoff helper after imports ━━');
{
  const helperBlock = `
// ─────────────────────────────────────────────
// mapsHandoff — universal tap-to-navigate (added April 9, 2026)
// ─────────────────────────────────────────────
// Tapping a program's address should open the user's native maps app with
// directions ready to start, NEVER trap them in an embedded website map.
// The website is a launchpad to the resource, not the resource itself.
//
// Behavior:
//   - iOS:     opens Apple Maps app via https://maps.apple.com/?daddr=...
//   - Android: opens Google Maps app via the directions deep link in href
//   - Desktop: opens Google Maps in a new tab via the href fallback
//
// The href stays as a Google Maps directions URL so right-click → copy
// link works, screen readers work, and any non-iOS user gets the right
// destination if onClick fails for any reason. Defensive in depth.
function mapsHandoff(e, address) {
  if (!address) return;
  const isIOS = typeof navigator !== "undefined"
    && /iPad|iPhone|iPod/.test(navigator.userAgent)
    && !window.MSStream;
  if (isIOS) {
    e.preventDefault();
    window.location.href = "https://maps.apple.com/?daddr=" + encodeURIComponent(address);
  }
  // Non-iOS: do nothing, let the <a href> open Google Maps directions in new tab
}

`;

  patch(
    'mapsHandoff helper',
    (s) => s.includes('function mapsHandoff'),
    'import { QUESTIONS, getFirstQuestion, isDirectToResults, isHiddenCategory, getInitialPrograms, applyAnswerFilters, applyTownFilter, getUrgencyLevel } from "./HelpFinderQuestions";',
    'import { QUESTIONS, getFirstQuestion, isDirectToResults, isHiddenCategory, getInitialPrograms, applyAnswerFilters, applyTownFilter, getUrgencyLevel } from "./HelpFinderQuestions";\n' + helperBlock
  );
}

// ─────────────────────────────────────────────
// PATCH 2: Upgrade the maps <a> link to use mapsHandoff
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 2. Upgrade maps link to native handoff ━━');
{
  const oldLink = '<a href={`https://maps.google.com/?q=${encodeURIComponent(p.ad)}`}\n                 target="_blank" rel="noopener noreferrer"\n                 style={{ color: "#1565c0", fontSize: 13, textDecoration: "none" }}>';

  const newLink = '<a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(p.ad)}`}\n                 onClick={(e) => mapsHandoff(e, p.ad)}\n                 target="_blank" rel="noopener noreferrer"\n                 data-umami-event={`click-directions-${p.id}`}\n                 style={{ color: "#1565c0", fontSize: 13, textDecoration: "none" }}>';

  patch(
    'maps link upgrade',
    (s) => s.includes('mapsHandoff(e, p.ad)'),
    oldLink,
    newLink
  );
}

// ─────────────────────────────────────────────
// Write file
// ─────────────────────────────────────────────
if (hadCRLF) src = src.replace(/\n/g, '\r\n');

if (src === orig) {
  console.log('');
  console.log('No changes (all patches already applied).');
} else {
  fs.writeFileSync(FILE, src);
  console.log('');
  console.log(`Done. ${orig.length} → ${src.length} bytes`);
  console.log(`Patches applied: ${patchesApplied}, skipped: ${patchesSkipped}`);
}

console.log('');
console.log('TEST IN DEV MODE BEFORE COMMITTING:');
console.log('  npm run dev');
console.log('');
console.log('Manual test checklist:');
console.log('  1. Pick any non-crisis category → expand a program card with an address');
console.log('  2. Address should still display normally (with the 📍 emoji prefix)');
console.log('  3. Click the address → on desktop, opens Google Maps DIRECTIONS in new tab (not just a pin)');
console.log('  4. URL in the new tab should be google.com/maps/dir/?api=1&destination=...');
console.log('  5. (If you have an iPhone available) tap the address on iPhone Safari → should open Apple Maps app');
console.log('  6. No console errors');
