#!/usr/bin/env node
/**
 * scripts/migrate-helpfinder-pets-merge-10.cjs
 *
 * Resolves the 14-vs-9 ghost pets entry mystery surfaced by migrate-09.
 *
 * Five "ghost" pet entries existed at lines 1020-1024 from a prior session
 * that added a small // PETS section. After investigation:
 *
 *   1. rochpets   — duplicates new hopeforpets (with stale phone). DELETE.
 *   2. all4pets   — UNIQUE. Web-verified live April 9, 2026. KEEP in place.
 *   3. lollypop   — duplicates new lollypop AND is an ID collision. DELETE.
 *   4. raspetfood — duplicates new vsasfood. DELETE.
 *   5. rcac       — UNIQUE. Web-verified live April 9, 2026. KEEP in place.
 *
 * Also: the new vsasfood entry has the wrong phone for the food pantry
 * specifically. The City of Rochester's own community pet food pantry
 * page documents 585-428-7008 as the contact for that program. The
 * 585-428-7274 number is the general shelter line. Updating vsasfood
 * to use the more specific number.
 *
 * Four patches. Atomic. Idempotent.
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

console.log('━━ Pets cleanup migration ━━');
console.log('');

// ─────────────────────────────────────────────
// PATCH 1: Delete rochpets (duplicates hopeforpets)
// ─────────────────────────────────────────────
console.log('━━ 1. Delete rochpets (duplicates hopeforpets) ━━');
patch(
  'delete rochpets',
  (s) => !s.includes('id:"rochpets"'),
  '  { id:"rochpets", n:"Rochester Hope For Pets", c:"pets", d:"Grants toward emergency vet care for pet owners who can\'t afford it.", ph:"585-532-7406", url:"https://www.rochesterhopeforpets.org", hr:"M-F 9am-3pm", doc:"Vet estimate required", tg:["any"], reach:"remote" },\n',
  ''
);

// ─────────────────────────────────────────────
// PATCH 2: Delete old lollypop entry (duplicates new lollypop, ID collision)
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 2. Delete old lollypop entry (resolves ID collision) ━━');
patch(
  'delete old lollypop',
  // Check for the OLD entry's specific text ("Pet Food & Spay/Neuter") vs the new entry ("Humane Society")
  (s) => !s.includes('id:"lollypop", n:"Lollypop Farm (Pet Food & Spay/Neuter)"'),
  '  { id:"lollypop", n:"Lollypop Farm (Pet Food & Spay/Neuter)", c:"pets", d:"Pet food pantry, low-cost spay/neuter, behavior helpline.", ph:"585-223-1330", url:"https://www.lollypop.org", hr:"See website", doc:"Proof of income for SNIP program", tg:["any"], reach:"remote" },\n',
  ''
);

// ─────────────────────────────────────────────
// PATCH 3: Delete raspetfood (duplicates vsasfood)
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 3. Delete raspetfood (duplicates vsasfood) ━━');
patch(
  'delete raspetfood',
  (s) => !s.includes('id:"raspetfood"'),
  '  { id:"raspetfood", n:"Rochester Animal Services Pet Food Pantry", c:"pets", d:"Free pet food for City of Rochester residents. 2nd and 4th Friday of each month.", ph:"585-428-7008", url:"https://www.cityofrochester.gov/departments/department-recreation-and-human-services-drhs/rochester-animal-services-community-pet", hr:"2nd & 4th Fridays", doc:"Proof of Rochester residency", tg:["any"], reach:"remote" },\n',
  ''
);

// ─────────────────────────────────────────────
// PATCH 4: Update vsasfood phone from main shelter line to food pantry specific line
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 4. Update vsasfood phone to food-pantry-specific number ━━');
patch(
  'vsasfood phone update',
  // Idempotency: check if the new phone is already on the vsasfood line
  (s) => {
    const idx = s.indexOf('id:"vsasfood"');
    if (idx === -1) return false;
    const window = s.slice(idx, idx + 600);
    return window.includes('ph:"585-428-7008"');
  },
  '  { id:"vsasfood", n:"Verona Street Pet Food Pantry", c:"pets",\n    d:"Free pet food and supplies for City of Rochester residents. Held the 2nd and 4th Friday of every month. Limited to once per month per household.",\n    ph:"585-428-7274"',
  '  { id:"vsasfood", n:"Verona Street Pet Food Pantry", c:"pets",\n    d:"Free pet food and supplies for City of Rochester residents. Held the 2nd and 4th Friday of every month. Limited to once per month per household.",\n    ph:"585-428-7008"'
);

// ─────────────────────────────────────────────
// Write file
// ─────────────────────────────────────────────
if (hadCRLF) src = src.replace(/\n/g, '\r\n');

if (src !== orig) {
  fs.writeFileSync(FILE, src);
  console.log('');
  console.log(`HelpFinder.jsx: ${orig.length} → ${src.length} bytes`);
} else {
  console.log('');
  console.log('No changes (all patches already applied).');
}

console.log('');
console.log(`Patches applied: ${patchesApplied}, skipped: ${patchesSkipped}`);
