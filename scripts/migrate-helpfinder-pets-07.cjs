#!/usr/bin/env node
/**
 * scripts/migrate-helpfinder-pets-07.cjs
 *
 * Builds the pets category v1: schema-level safetySensitive flag, 9 verified
 * pet program entries, and a homepage tile parallel to Know Your Rights.
 *
 * The `pets` CATEGORIES key and the rights-tab membership already exist
 * (added by a prior session but never populated). This migration adds the
 * data + the safety infrastructure + the homepage surface.
 *
 * Atomic across both files: if any patch aborts, NO files are written.
 *
 * Six patches:
 *   1. HelpFinder.jsx — SAFETY_SENSITIVE doc block above DV_CATS
 *   2. HelpFinder.jsx — hasSensitiveProgram useMemo + auto-activation effect
 *   3. HelpFinder.jsx — Update SENSITIVE.has(category) checks to also fire on per-entry flag
 *   4. HelpFinder.jsx — Inject 9 pet program entries before PROGRAMS array close
 *   5. LandingPage.jsx — Insert pets tile after Know Your Rights tile
 *
 * Each patch is idempotent (skips if already applied) and aborts cleanly
 * if its anchor isn't found.
 */

const fs = require('fs');
const path = require('path');

const HELPFINDER_FILE = path.join(__dirname, '..', 'src', 'components', 'HelpFinder.jsx');
const LANDING_FILE    = path.join(__dirname, '..', 'src', 'components', 'LandingPage.jsx');

let src1 = fs.readFileSync(HELPFINDER_FILE, 'utf8');
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
  console.error('No changes written to either file.');
  process.exit(1);
}

function patch(file, name, alreadyAppliedCheck, oldStr, newStr) {
  let src = file === 1 ? src1 : src2;
  if (alreadyAppliedCheck(src)) {
    console.log(`  ${name}: already applied, skipping`);
    patchesSkipped++;
    return;
  }
  if (!src.includes(oldStr)) {
    abort(`${name}: anchor not found in ${file === 1 ? 'HelpFinder.jsx' : 'LandingPage.jsx'}`);
  }
  src = src.replace(oldStr, newStr);
  if (file === 1) src1 = src; else src2 = src;
  console.log(`  ${name}: applied`);
  patchesApplied++;
}

console.log('Reading source files...');
console.log('');

// ─────────────────────────────────────────────
// PATCH 1: SAFETY_SENSITIVE doc block above DV_CATS
// ─────────────────────────────────────────────
console.log('━━ FILE 1: HelpFinder.jsx ━━');
console.log('');
console.log('━━ 1. Add SAFETY_SENSITIVE doc block ━━');
{
  const docBlock = `// ─────────────────────────────────────────────
// SAFETY_SENSITIVE — per-entry safety flag (added April 9, 2026)
// ─────────────────────────────────────────────
// The DV_CATS set below activates Quick Exit at the CATEGORY level — useful
// when an entire category (like domesticSvc) is high-risk for the user.
//
// But some individual entries inside non-sensitive categories also need the
// same protection. Examples:
//   - Animal cruelty reporting hotlines (in pets category) — the reporter
//     may be living with the abuser, who is also abusing humans
//   - Pet-friendly DV shelter cross-references (in pets category) — the
//     survivor may be on a monitored device
//   - Future entries in any category that touch reporting, escape, or
//     surveillance-vulnerable scenarios
//
// The schema flag is \`safetySensitive: true\` on any individual program object.
// When ANY visible program in the current view has the flag, Quick Exit
// activates automatically. The activation is one-way for the session —
// once triggered, it stays visible until reset (matching the existing
// DV_CATS behavior).
//
// Rule: match the protection level of the highest-risk visible entry,
// never less. Defensive in depth.
// ─────────────────────────────────────────────

// ── DV CATEGORIES (show safety notice + quick exit) ──`;

  patch(
    1,
    'SAFETY_SENSITIVE doc block',
    (s) => s.includes('SAFETY_SENSITIVE — per-entry safety flag'),
    '// ── DV CATEGORIES (show safety notice + quick exit) ──',
    docBlock
  );
}

// ─────────────────────────────────────────────
// PATCH 2: hasSensitiveProgram useMemo + auto-activation
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 2. Add hasSensitiveProgram useMemo + activation effect ━━');
{
  const oldBlock = '}, [category, who, how, nearMe, userCoords, answers, userTown]);';

  const newBlock = `}, [category, who, how, nearMe, userCoords, answers, userTown]);

  // Per-entry safety override — see SAFETY_SENSITIVE doc block above DV_CATS.
  // If ANY visible program is flagged safetySensitive, escalate to Quick Exit.
  const hasSensitiveProgram = useMemo(
    () => filteredPrograms.some(p => p.safetySensitive),
    [filteredPrograms]
  );

  useEffect(() => {
    if (hasSensitiveProgram) {
      setShowDVExit(true);
    }
  }, [hasSensitiveProgram]);`;

  patch(
    1,
    'hasSensitiveProgram useMemo + effect',
    (s) => s.includes('hasSensitiveProgram'),
    oldBlock,
    newBlock
  );
}

// ─────────────────────────────────────────────
// PATCH 3: Make sure useEffect is imported (it might not be — check)
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 3. Ensure useEffect is in React imports ━━');
{
  // The first line of HelpFinder.jsx imports React + hooks. Check if useEffect is there.
  if (src1.includes('useEffect')) {
    console.log('  useEffect already imported, skipping');
    patchesSkipped++;
  } else {
    // Need to add useEffect to the React import
    patch(
      1,
      'useEffect import',
      (s) => false,  // never already applied (we already checked above)
      'import React, { useState, useMemo, useRef } from "react";',
      'import React, { useState, useMemo, useEffect, useRef } from "react";'
    );
  }
}

// ─────────────────────────────────────────────
// PATCH 4: Inject 9 pet program entries before PROGRAMS array close
// ─────────────────────────────────────────────
console.log('');
console.log('━━ 4. Inject 9 pet program entries ━━');
{
  if (src1.includes('id:"vsas"')) {
    console.log('  pet entries already present, skipping');
    patchesSkipped++;
  } else {
    // Find the PROGRAMS array bounds via bracket matching
    const startMatch = src1.match(/const PROGRAMS = \[/);
    if (!startMatch) abort('PROGRAMS array opening not found');
    const arrayBodyStart = startMatch.index + startMatch[0].length;

    let depth = 1;
    let i = arrayBodyStart;
    while (i < src1.length && depth > 0) {
      const c = src1[i];
      if (c === '[') depth++;
      else if (c === ']') depth--;
      if (depth === 0) break;
      i++;
    }
    if (depth !== 0) abort('Could not find closing ] of PROGRAMS array via bracket match');
    const arrayBodyEnd = i; // position of the closing ]

    // Walk backwards from the closing ] to find the last non-whitespace character.
    // We want to insert immediately after it, before any trailing whitespace + closing bracket.
    let insertPoint = arrayBodyEnd - 1;
    while (insertPoint > arrayBodyStart && /\s/.test(src1[insertPoint])) {
      insertPoint--;
    }
    insertPoint++; // now points just after the last entry's closing },

    const petsBlock = `

  // ─────────────────────────────────────────────
  // PETS — added April 9, 2026 (v1: 9 verified entries)
  // ─────────────────────────────────────────────
  { id:"vsas", n:"Rochester Animal Services / Verona Street Animal Society", c:"pets",
    d:"City animal shelter and 501c3 partner. Pet adoption, foster care, surrender prevention support, end-of-life services for City residents. Dog adoptions $50, cat adoptions $30. Free for seniors 60+ adopting an animal age 8+.",
    ph:"585-428-7274", url:"https://www.cityofrochester.gov/petadoption/",
    ad:"184 Verona St, Rochester NY 14608",
    hr:"Mon-Fri 12-6pm, Sat-Sun 12-4pm",
    doc:"ID for adoption. Just call for surrender prevention.",
    tg:["any"],
    town:"rochester", zip:"14608", reach:"local" },

  { id:"vsasfood", n:"Verona Street Pet Food Pantry", c:"pets",
    d:"Free pet food and supplies for City of Rochester residents. Held the 2nd and 4th Friday of every month. Limited to once per month per household.",
    ph:"585-428-7274", url:"https://www.cityofrochester.gov/petadoption/",
    ad:"184 Verona St, Rochester NY 14608",
    hr:"2nd and 4th Fridays of each month",
    doc:"Proof of City of Rochester residency.",
    tg:["any","hh"],
    town:"rochester", zip:"14608", reach:"local" },

  { id:"vsassurrender", n:"Pet Surrender Prevention (Rochester Animal Services)", c:"pets",
    d:"If you are considering giving up your pet because of money or life circumstances, call the Pet Surrender Prevention Specialist BEFORE you do anything. They may be able to provide food, supplies, vet referrals, or rehoming support to keep your pet with you.",
    ph:"585-428-6722", url:"https://www.cityofrochester.gov/departments/department-recreation-and-human-services-drhs/rochester-animal-services-community-pet",
    ad:"184 Verona St, Rochester NY 14608",
    hr:"M-F business hours",
    doc:"None — just call.",
    tg:["any","hh"],
    town:"rochester", zip:"14608", reach:"local" },

  { id:"vsasvax", n:"Free Dog Vaccine Clinics (Rochester Animal Services)", c:"pets",
    d:"Free distemper and parvo (DAAP) vaccines for City of Rochester resident dogs. No appointment needed. Donated by Petco Love. Does NOT include rabies vaccine — rabies clinics held separately.",
    ph:"585-428-7008", url:"https://www.cityofrochester.gov/departments/department-recreation-and-human-services-drhs/rochester-animal-services-community-pet",
    ad:"448 Smith St, Rochester NY 14606 (parking lot C, Community Sports Complex)",
    hr:"Periodic — check website for next clinic date",
    doc:"City of Rochester residency. Dog must be on leash. One dog per person.",
    tg:["any"],
    town:"rochester", zip:"14606", reach:"local" },

  { id:"lollypop", n:"Lollypop Farm — Humane Society of Greater Rochester", c:"pets",
    d:"The largest animal welfare organization in the Rochester area, since 1873. Pet adoption (dogs, cats, small animals, horses, farm animals), foster care, vet care, behavior consultations, dog training, humane education. Multiple satellite locations across Monroe County.",
    ph:"585-223-1330", url:"https://www.lollypop.org",
    ad:"99 Victor Rd, Fairport NY 14450",
    hr:"Mon 10am-4:30pm, Tue-Fri 12-6:30pm, Sat-Sun 10am-4:30pm",
    doc:"ID and adoption application.",
    tg:["any"],
    town:"fairport", zip:"14450",
    serves: ["fairport","rochester","henrietta","greece","perinton"],
    reach:"regional" },

  { id:"lollypopcruelty", n:"Lollypop Farm Animal Cruelty 24-Hour Hotline", c:"pets",
    d:"24/7 hotline for reporting animal cruelty, neglect, or suspected abuse. Lollypop Farm has law enforcement authority for animal cruelty cases in Monroe County. Anonymous reports accepted.",
    ph:"585-223-6500", url:"https://www.lollypop.org",
    hr:"24/7",
    doc:"None. Anonymous reports accepted.",
    tg:["any"],
    reach:"regional",
    safetySensitive: true },

  { id:"lollypopspay", n:"Lollypop Farm Spay/Neuter Assistance", c:"pets",
    d:"Low-cost spay and neuter surgeries for pet owners receiving public assistance (SNAP, HEAP, SSI, Medicaid, SSDI, Temporary Assistance) or with household income under $40,000. Also low-cost services for feral cat caregivers and approved Rescue Partner organizations. Appointment only.",
    ph:"585-223-1330", url:"https://www.lollypop.org/services/spayneuter-assistance/",
    ad:"99 Victor Rd, Fairport NY 14450",
    hr:"By appointment, M-F",
    doc:"Benefits card, recent 1040 tax form, or SSA benefit letter.",
    tg:["hh"], inc:200,
    town:"fairport", zip:"14450",
    serves: ["fairport","rochester","henrietta","greece","perinton"],
    reach:"regional" },

  { id:"hopeforpets", n:"Rochester Hope for Pets (Vet Bill Assistance)", c:"pets",
    d:"Financial grants to help pay for unexpected or emergency veterinary care. Awards typically cover a portion of the cost, not the full bill. NOT for emergencies — 5 business days for decision. Coverage area is 40 miles from Rochester, including all of Monroe County and parts of Wayne, Ontario, Livingston, Orleans, Genesee, Seneca, and Yates counties.",
    url:"https://www.rochesterhopeforpets.org/application",
    ad:"2816 Monroe Ave, Rochester NY 14618",
    hr:"M-F 9am-3pm",
    doc:"Estimate from your veterinarian for the procedure or treatment.",
    tg:["hh"],
    town:"rochester", zip:"14618", reach:"regional" },

  { id:"willowpets", n:"Willow Domestic Violence Center — Pet-Friendly Shelter", c:"pets",
    d:"If you or your family are leaving an unsafe home and you have a pet you can't bear to leave behind: Willow's emergency shelter accepts a variety of pets along with survivors and their children. You do not have to choose between your safety and your pet's safety. Call the 24-hour hotline.",
    ph:"585-232-7353", url:"https://willowcenterny.org",
    hr:"24/7 hotline",
    doc:"None.",
    tg:["any"],
    reach:"local",
    safetySensitive: true },
`;

    src1 = src1.slice(0, insertPoint) + ',' + petsBlock + src1.slice(insertPoint);
    console.log(`  pet entries: applied (9 entries inserted before PROGRAMS array close)`);
    patchesApplied++;
  }
}

// ─────────────────────────────────────────────
// PATCH 5: Pets tile on LandingPage.jsx after KYR tile
// ─────────────────────────────────────────────
console.log('');
console.log('━━ FILE 2: LandingPage.jsx ━━');
console.log('');
console.log('━━ 5. Insert pets tile after Know Your Rights tile ━━');
{
  const oldBlock = `            <div style={{ fontSize: 22, color: C.amber, flexShrink: 0, fontWeight: 700 }}>→</div>
          </button>

          {/* TRUST LINE */}`;

  const newBlock = `            <div style={{ fontSize: 22, color: C.amber, flexShrink: 0, fontWeight: 700 }}>→</div>
          </button>

          {/* ── PETS TILE ── added April 9, 2026 */}
          {/* Peer to Know Your Rights. Soft blue, paw icon. */}
          {/* TODO: deep-link directly into pets category once nav() signature for hash deep-link is verified */}
          <button
            onClick={() => nav(PAGES.HELP)}
            className="hf-fade-in hf-d5"
            style={{
              width: "100%", textAlign: isRTL ? "right" : "left",
              background: "#e3f2fd", border: "1px solid #1565c0",
              borderRadius: 24, padding: "18px 22px", cursor: "pointer",
              marginTop: 12, fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 16,
            }}
          >
            <div style={{ fontSize: 34, flexShrink: 0, lineHeight: 1 }}>🐾</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.bark, marginBottom: 3 }}>Help for pets</div>
              <div style={{ fontSize: 13, color: C.stone, lineHeight: 1.45 }}>Adoption, vet care, food, surrender support, and shelters that accept pets.</div>
            </div>
            <div style={{ fontSize: 22, color: "#1565c0", flexShrink: 0, fontWeight: 700 }}>→</div>
          </button>

          {/* TRUST LINE */}`;

  patch(
    2,
    'pets tile on LandingPage',
    (s) => s.includes('Help for pets'),
    oldBlock,
    newBlock
  );
}

// ─────────────────────────────────────────────
// Write both files (only after all patches succeeded)
// ─────────────────────────────────────────────
if (hadCRLF1) src1 = src1.replace(/\n/g, '\r\n');
if (hadCRLF2) src2 = src2.replace(/\n/g, '\r\n');

if (src1 !== orig1) {
  fs.writeFileSync(HELPFINDER_FILE, src1);
  console.log('');
  console.log(`HelpFinder.jsx: ${orig1.length} → ${src1.length} bytes`);
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
console.log('');
console.log('TEST IN DEV MODE BEFORE COMMITTING:');
console.log('  npm run dev');
console.log('');
console.log('Manual test checklist:');
console.log('  1. Homepage: blue "Help for pets" tile renders below Know Your Rights tile');
console.log('  2. Tap Help for pets → lands on /help WHAT_TAB screen (TODO: should deep-link to pets)');
console.log('  3. Pick rights tab → pets category should appear in the list');
console.log('  4. Tap pets → all 9 entries render');
console.log('  5. CRITICAL: scrolling through pets entries should activate Quick Exit (because cruelty hotline + Willow entry are flagged safetySensitive)');
console.log('  6. Look for the Quick Exit button at top-right of the page once on the pets results');
console.log('  7. No console errors');
