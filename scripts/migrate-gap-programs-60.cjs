#!/usr/bin/env node
/**
 * migrate-gap-programs-60.cjs
 * ============================
 * Closes Monroe County program gaps identified in the sitewide audit:
 *
 *   - Tax prep (CASH/VITA) — 2 programs
 *   - Furniture/household goods — 2 programs
 *   - Recovery housing — 4 programs
 *   - MAT clinics — 3 programs
 *   - Senior congregate meals — 1 program (umbrella)
 *   - Missing town: Mendon — 3 programs
 *   - Missing town: Perinton — 3 programs
 *   - Missing town: Parma — 3 programs
 *   - Missing town: Riga — 2 programs
 *
 * Total: 23 new programs appended to the PROGRAMS array in HelpFinder.jsx.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HF = path.join(ROOT, 'src/components/HelpFinder.jsx');
let hf = fs.readFileSync(HF, 'utf8');
let failures = 0;
let successes = 0;

function doReplace(oldStr, newStr, label) {
  if (!hf.includes(oldStr)) {
    console.error('ABORT: ' + label);
    console.error('  Expected: ' + JSON.stringify(oldStr).slice(0, 200));
    failures++;
    return;
  }
  hf = hf.replace(oldStr, newStr);
  console.log('OK: ' + label);
  successes++;
}

const NEW_PROGRAMS = `
  // ── TAX PREP (audit gap: 0 entries) ──
  { id:"cashvita", n:"CASH Free Tax Prep", c:"cash", xref:["employment"], d:"Free tax return preparation for low-income workers. Includes EITC and Child Tax Credit. By appointment only.", ph:"585-900-1004", ad:"115 South Ave, Rochester NY 14604", url:"https://roccitylibrary.org/spotlight/taxes/", hr:"Feb-Apr, by appointment", doc:"ID, SSN cards, all W-2s, prior year return if available", tg:["work","hh","any"], town:"rochester", zip:"14604", lat:43.1503, lng:-77.6123, reach:"local" },
  { id:"nystap", n:"NYS Tax Assistance Program (TAP)", c:"cash", xref:["employment"], d:"Free tax prep if you earned $89,000 or less. Walk-in at Rochester Central Library every Wednesday Feb through April.", ph:"585-428-8110", ad:"115 South Ave, Rochester NY 14604", url:"https://www.tax.ny.gov/pit/file/vita.htm", hr:"Wed 9:30am-5pm, Feb 4 - Apr 15", doc:"ID, SSN, all income documents", tg:["work","hh","any"], town:"rochester", zip:"14604", lat:43.1503, lng:-77.6123, reach:"local" },

  // ── FURNITURE / HOUSEHOLD GOODS (audit gap: 0 entries) ──
  { id:"safurniture", n:"Salvation Army Free Furniture Pickup", c:"clothing", d:"Free pickup of furniture and household items. Also operates a thrift store with low-cost items.", ph:"585-235-2769", ad:"70 Liberty Pole Way, Rochester NY 14604", url:"https://rochesterny.salvationarmy.org", hr:"Call for pickup appointment", doc:"None", tg:["any"], town:"rochester", zip:"14604", lat:43.1559, lng:-77.6044, reach:"regional" },
  { id:"habitatrestore", n:"Habitat for Humanity ReStore", c:"clothing", d:"Low-cost furniture, appliances, home goods. Also accepts donations. Proceeds fund Habitat homes.", ph:"585-546-1470", ad:"1199 E Main St, Rochester NY 14609", url:"https://www.rochesterhabitat.org", hr:"Tue-Sat 10am-5pm", doc:"None", tg:["any"], town:"rochester", zip:"14609", lat:43.1545, lng:-77.5793, reach:"regional" },

  // ── RECOVERY HOUSING (audit gap: 0 entries) ──
  { id:"recoveryhousesroc", n:"Recovery Houses of Rochester", c:"addiction", d:"Peer-based recovery housing on a continuum from single-room to apartments. Crisis stabilization, transitional, and permanent affordable options.", ph:"585-568-8726", url:"https://www.recoveryhousesofrochester.org", hr:"Call for intake", doc:"Call first", tg:["any"], reach:"remote" },
  { id:"libertyrec", n:"Liberty Resources Recovery Support Navigator", c:"addiction", d:"Peer support specialists meet you where you are. Help with treatment access, housing, benefits, and emotional support during recovery.", ph:"585-410-3370", ad:"175 Winton Rd N, Rochester NY 14610", url:"https://www.liberty-resources.org/rsn/", hr:"M-F", doc:"None", tg:["any"], town:"rochester", zip:"14610", reach:"local" },
  { id:"pathwayhouses", n:"Pathway Houses of Rochester", c:"addiction", d:"Group recovery housing in a safe, alcohol- and drug-free setting. Room and board included in fees. Peer support on site.", ph:"585-232-4674", url:"https://www.pathwayhousesofrochester.org", hr:"Call for intake", doc:"Call first", tg:["any"], reach:"remote" },
  { id:"easthousewarm", n:"East House Affinity Place Warm Line", c:"addiction", xref:["mental"], d:"24-hour phone line for recovery support. Not a crisis line — a place to talk to a peer who understands recovery.", ph:"585-563-7470", url:"https://www.easthouse.org", hr:"24/7", doc:"None", tg:["any"], reach:"remote" },

  // ── MAT CLINICS (audit gap: 0 entries) ──
  { id:"hutherdoyle", n:"Huther Doyle (Methadone + Suboxone)", c:"addiction", d:"Outpatient substance abuse treatment. Methadone dosing, Suboxone, counseling, and rehabilitation services.", ph:"585-325-5100", ad:"360 East Ave, Rochester NY 14604", url:"https://www.hutherdoyle.com", hr:"M-F", doc:"Call for intake requirements", tg:["any"], town:"rochester", zip:"14604", lat:43.1555, lng:-77.5946, reach:"local" },
  { id:"strongrecovery", n:"Strong Recovery Chemical Dependency", c:"addiction", d:"Outpatient chemical dependency treatment including medication-assisted treatment. Part of URMC.", ph:"585-275-3574", ad:"2613 W Henrietta Rd Suite C, Rochester NY 14623", url:"https://www.urmc.rochester.edu/mental-health-wellness/treatments-services/strong-recovery.aspx", hr:"M-F", doc:"Call for intake", tg:["any"], zip:"14623", reach:"local" },
  { id:"pathwaysmat", n:"Pathways Rochester (Catholic Health MAT)", c:"addiction", d:"Comprehensive outpatient program with medication-assisted treatment and counseling.", ad:"435 E Henrietta Rd, Rochester NY 14623", url:"https://www.chsbuffalo.org/locations/pathways-rochester/", hr:"M-F", doc:"Call for intake", tg:["any"], zip:"14623", reach:"local" },

  // ── SENIOR CONGREGATE MEALS (audit gap: only Meals on Wheels existed) ──
  { id:"lunchclub", n:"Monroe County Lunch Club (Senior Meals)", c:"seniorSvc", xref:["food"], d:"Free sit-down lunch at 20 senior centers across Monroe County. Age 60+, spouse of any age, or adult disabled child. Call for the site nearest you.", ph:"585-753-6280", url:"https://www.monroecounty.gov/aging-centers", hr:"M-F lunch hours vary by site", doc:"None", tg:["sen"], reach:"regional" },

  // ── MISSING TOWN: MENDON (audit gap: 0 programs) ──
  { id:"mendonhall", n:"Mendon Town Hall", c:"documents", d:"General town services, clerk, assessor, building/code enforcement, court. Starting point for any Mendon question.", ph:"585-624-6060", ad:"16 W Main St, Honeoye Falls NY 14472", url:"https://townofmendonny.gov", hr:"M-F 8:30am-4:30pm", doc:"Varies", tg:["any"], town:"mendon", zip:"14472", reach:"local" },
  { id:"mendonlib", n:"Mendon Public Library", c:"education", d:"Books, WiFi, programs for all ages. Part of the Monroe County Library System.", ph:"585-624-6067", ad:"16 W Main St, Honeoye Falls NY 14472", url:"https://townofmendonny.gov/locations/mendon-public-library/", hr:"See website", doc:"Proof of address for card", tg:["any"], town:"mendon", zip:"14472", reach:"local" },
  { id:"fishmendon", n:"FISH Food Cupboard (Mendon/HFL area)", c:"food", d:"Emergency food for Honeoye Falls, Lima, and Mendon area residents.", ph:"585-453-2370", hr:"Call for hours", doc:"None", tg:["any"], town:"mendon", zip:"14472", reach:"local" },

  // ── MISSING TOWN: PERINTON (audit gap: 0 programs) ──
  { id:"perintonhall", n:"Perinton Town Hall", c:"documents", d:"General town services, clerk, assessor, building department, parks. Village of Fairport included.", ph:"585-223-0770", ad:"1350 Turk Hill Rd, Fairport NY 14450", url:"https://perinton.org", hr:"M-F 8am-4:30pm", doc:"Varies", tg:["any"], town:"perinton", zip:"14450", reach:"local" },
  { id:"perintonfood", n:"Perinton Food Shelf", c:"food", d:"Emergency food for Fairport/Perinton (14450) residents. Call weekdays 9am-4pm.", ph:"585-425-7410", ad:"Fairport NY 14450", url:"https://perintonfoodshelf.org", hr:"M-Th 9am-4pm, F 9am-10:30am", doc:"None", tg:["any"], town:"perinton", zip:"14450", reach:"local" },
  { id:"fairportlib", n:"Fairport Public Library", c:"education", d:"Books, WiFi, programs, community meeting rooms. Part of the Monroe County Library System.", ph:"585-223-9091", ad:"1 Fairport Village Landing, Fairport NY 14450", url:"https://www.fairportlibrary.org", hr:"M-Th 10am-9pm, F 10am-6pm, Sat 10am-5pm, Sun 1-5pm", doc:"Proof of address for card", tg:["any"], town:"perinton", zip:"14450", reach:"local" },

  // ── MISSING TOWN: PARMA (audit gap: 0 programs) ──
  { id:"parmahall", n:"Parma Town Hall", c:"documents", d:"General town services, clerk, assessor, building department. Village of Hilton included.", ph:"585-392-9461", ad:"1300 Hilton Parma Corners Rd, Hilton NY 14468", url:"https://parmany.gov", hr:"M-F 9am-5pm", doc:"Varies", tg:["any"], town:"parma", zip:"14468", reach:"local" },
  { id:"hiltonparmafood", n:"Hilton Parma Emergency Food Shelf", c:"food", d:"Emergency food for Hilton and Parma area residents.", ad:"59 Henry St Rm 201, Hilton NY 14468", url:"https://www.communitywishbook.org/hilton-parma-emergency-food-shelf.html", hr:"Tu 8:30-11am & 1-3pm, Wed 10am-3pm, Th 10am-12pm & 4-6pm", doc:"None", tg:["any"], town:"parma", zip:"14468", reach:"local" },
  { id:"parmalib", n:"Parma Public Library", c:"education", d:"Books, WiFi, programs for all ages. Part of the Monroe County Library System.", ph:"585-392-8350", ad:"7 West Ave, Hilton NY 14468", url:"https://www.parmapubliclibrary.org", hr:"M-Th 10am-8pm, F 10am-6pm, Sat 10am-2pm", doc:"Proof of address for card", tg:["any"], town:"parma", zip:"14468", reach:"local" },

  // ── MISSING TOWN: RIGA (audit gap: 0 programs) ──
  { id:"rigahall", n:"Riga Town Hall", c:"documents", d:"General town services, clerk, assessor, building department, court. Village of Churchville included.", ph:"585-293-3880", ad:"6460 Buffalo Rd, Churchville NY 14428", url:"https://www.townofriga.com", hr:"M-F 9am-4pm", doc:"Varies", tg:["any"], town:"riga", zip:"14428", reach:"local" },
  { id:"newmanrigalib", n:"Newman Riga Library", c:"education", d:"Books, WiFi, programs. Part of the Monroe County Library System.", ph:"585-293-2009", ad:"1 South Main St, Churchville NY 14428", url:"https://newmanrigalibrary.org", hr:"M/W/F 11am-5pm, Tu/Th 11am-8pm, Sat 10am-2pm", doc:"Proof of address for card", tg:["any"], town:"riga", zip:"14428", reach:"local" },
`;

doReplace(
  '];\n\n// COMMUNITY GROUPS\nconst COMMUNITY = [',
  NEW_PROGRAMS + '];\n\n// COMMUNITY GROUPS\nconst COMMUNITY = [',
  'Append 23 new programs to PROGRAMS array'
);

if (failures === 0) {
  fs.writeFileSync(HF, hf, 'utf8');
}
console.log('\n' + successes + ' changes, ' + failures + ' failures.');
if (failures > 0) {
  console.error('\nABORT: file NOT written.');
  process.exit(1);
}
console.log('\nWrote: ' + path.relative(ROOT, HF));
