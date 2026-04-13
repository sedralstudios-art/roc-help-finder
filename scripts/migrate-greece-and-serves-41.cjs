#!/usr/bin/env node
/**
 * migrate-greece-and-serves-41.cjs
 * =================================
 * 1. Remove town:"rochester" from 15 county-wide programs so all towns see them
 * 2. Add Greece-specific program entries
 * 3. Fix sitemap: add trades category, remove /help
 *
 * Sitemap fixes are done in generate-sitemap.cjs (already edited inline).
 * This script handles HelpFinder.jsx changes.
 *
 * Greece data sources (verified 2026-04-12):
 *   - greeceny.gov/departments/ (Town Hall, Assessor, Animal Services, Court, Tax)
 *   - greecepubliclibrary.org (Library)
 *   - greeceny.gov/departments/animal-services/
 *   - greeceny.gov/departments/town-court/
 *   - greeceny.gov/departments/assessor/
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HF = path.join(ROOT, 'src/components/HelpFinder.jsx');
let hf = fs.readFileSync(HF, 'utf8');
let failures = 0;
let successes = 0;

function hfReplace(oldStr, newStr, label) {
  if (!hf.includes(oldStr)) {
    console.error("ABORT: " + label);
    console.error("  Expected: " + JSON.stringify(oldStr).slice(0, 140));
    failures++;
    return;
  }
  const count = hf.split(oldStr).length - 1;
  hf = hf.split(oldStr).join(newStr);
  console.log("OK: " + label + " (" + count + "x)");
  successes++;
}

// ═══════════════════════════════════════════════
// PART 1: Remove town:"rochester" from county-wide programs
// These serve all of Monroe County, not just Rochester.
// ═══════════════════════════════════════════════

const countyWideIds = [
  'bbbs', 'biv', 'mcc', 'rawny', 'mcstd', 'mcvital',
  'rawnyid', 'crisisnursery', 'mcburial', 'familycourt',
  'daunit', 'supervvisit', 'mclerk', 'mclegislature', 'rawnyrecord'
];

countyWideIds.forEach(id => {
  // Match the specific pattern: id:"xxx", ... town:"rochester", ...
  // We need to remove town:"rochester", from each line
  const idPattern = 'id:"' + id + '"';
  const lines = hf.split('\n');
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(idPattern) && lines[i].includes('town:"rochester"')) {
      // Remove town:"rochester", (with trailing comma and space)
      lines[i] = lines[i].replace(/, town:"rochester"/, '').replace(/town:"rochester", /, '');
      found = true;
      break;
    }
  }
  if (found) {
    hf = lines.join('\n');
    console.log("OK: remove town:rochester from " + id);
    successes++;
  } else {
    console.error("SKIP: " + id + " — not found or no town:rochester");
  }
});

// ═══════════════════════════════════════════════
// PART 2: Add Greece-specific program entries
// Inserted before the COMMUNITY GROUPS section.
// ═══════════════════════════════════════════════

const greeceEntries = `
  // ── GREECE-SPECIFIC PROGRAMS (added 2026-04-12, source: greeceny.gov + greecepubliclibrary.org) ──
  { id:"greecehall", n:"Town of Greece Town Hall", c:"legal", d:"General town services, information, and referrals. Starting point for any town government question.", ph:"585-225-2000", ad:"1 Vince Tofany Blvd, Greece NY 14612", url:"https://greeceny.gov", hr:"M-F 9am-5pm", doc:"None", tg:["any"], town:"greece", zip:"14612", lat:43.2518, lng:-77.7036, reach:"local" },
  { id:"greecelib", n:"Greece Public Library", c:"education", d:"Free computers, WiFi, printing, tech help, kids programs, teen programs, museum passes. Library card is free.", ph:"585-225-8951", ad:"2 Vince Tofany Blvd, Greece NY 14612", url:"https://www.greecepubliclibrary.org", hr:"M-Th 9am-9pm, F-Sat 9am-5pm, Sun 12-4pm (Oct-Apr)", doc:"Proof of address for card", tg:["any"], town:"greece", zip:"14612", lat:43.2518, lng:-77.7036, reach:"local" },
  { id:"greececourt", n:"Greece Town Court", c:"legal", d:"Handles traffic tickets, small claims (up to $3,000), misdemeanors, violations, and parking ordinance cases.", ph:"585-227-3110", ad:"1 Vince Tofany Blvd, Greece NY 14612", url:"https://greeceny.gov/departments/town-court/", hr:"M-F 9am-5pm, payment window closes Wed 12-5pm", doc:"Court papers or ticket", tg:["any"], town:"greece", zip:"14612", lat:43.2518, lng:-77.7036, reach:"local" },
  { id:"greeceassessor", n:"Greece Assessor (Property Tax Exemptions)", c:"seniorSvc", d:"Handles STAR, senior, veterans, and disability property tax exemptions. Also assessment grievances and property reviews.", ph:"585-723-2308", ad:"1 Vince Tofany Blvd, Greece NY 14612", url:"https://greeceny.gov/departments/assessor/", hr:"M-F 9am-5pm", doc:"Varies by exemption type", tg:["sen","vet","dis","any"], town:"greece", zip:"14612", lat:43.2518, lng:-77.7036, reach:"local" },
  { id:"greeceanimal", n:"Greece Animal Services", c:"pets", d:"Dog licensing, lost and found pets, pet adoption, free rabies clinics, animal control. Call 911 for animal emergencies.", ph:"585-581-4025", ad:"500 Maiden Lane, Rochester NY 14616", url:"https://greeceny.gov/departments/animal-services/", hr:"M 9am-5pm, Tu-F 9am-9pm, Sat 9am-5pm", doc:"Rabies certificate for dog license", tg:["any"], town:"greece", zip:"14616", lat:43.2352, lng:-77.6618, reach:"local" },
  { id:"greecerec", n:"Greece Parks and Recreation", c:"youth", d:"Year-round programs: fitness classes, youth camps, senior trips, day trips, crafts, cards. Seasonal guides published online.", ph:"585-225-2000", ad:"1 Vince Tofany Blvd, Greece NY 14612", url:"https://greeceny.gov/departments/recreation/", hr:"M-F 9am-5pm", doc:"None", tg:["kids","sen","any"], town:"greece", zip:"14612", lat:43.2518, lng:-77.7036, reach:"local" },
  { id:"greecetax", n:"Greece Tax Collection", c:"legal", d:"Pay town property taxes in person, by mail, or online. 24-hour drop box at Town Hall. No phone payments.", ph:"585-225-2000", ad:"1 Vince Tofany Blvd, Greece NY 14612", url:"https://greeceny.gov/departments/tax-collection/", hr:"M-F 9am-5pm", doc:"Tax bill", tg:["any"], town:"greece", zip:"14612", lat:43.2518, lng:-77.7036, reach:"local" },
`;

// Insert before COMMUNITY GROUPS
hfReplace(
  '// COMMUNITY GROUPS',
  greeceEntries + '// COMMUNITY GROUPS',
  'Add Greece program entries'
);

// Write
fs.writeFileSync(HF, hf, 'utf8');

console.log("\n" + successes + " changes, " + failures + " failures.");
if (failures > 0) process.exit(1);
