// Adversarial test framework for the program gate.
//
// Goal: measure how many classes of "wrong info" the gate catches on its own,
// without external truth signal (web search, human verification, etc.). The
// gates can only catch patterns + structure they've been taught — they CANNOT
// catch arbitrary wrong content. This test makes that gap visible.
//
// Each fixture is a fake program with intentional errors. We declare what
// SHOULD trigger a gate FAIL. Then we run the gate against the fixture and
// compare. Result: catch rate + the specific error classes we're missing.
//
// Run: node scripts/test-gate-coverage.cjs
//
// What "PASS" means:
//   - The gate's actual FAILs match the fixture's expectedFails (or both empty).
// What "MISS" means:
//   - The fixture has expectedFails the gate didn't surface.
//   - This is the signal: we don't yet have a gate rule for this error class.

const fs = require('fs');
const path = require('path');
const {
  SWEPT_WRONG_PHONES,
  findPhoneMatches,
} = require('../scripts/lib/swept-phones.cjs');

// ─── Fixtures ─────────────────────────────────────────────────────────────
// Each fixture is a single-line program object as it would appear in
// programs.js, plus a short description and expected gate behavior.

const FIXTURES = [
  // ───────────── Things gates SHOULD catch ─────────────
  {
    name: 'wrong-phone-on-swept-list',
    description: 'Recovery Houses of Rochester wrong phone (already in swept-phones lib)',
    line: '{ id:"fake-1", n:"Recovery Houses of Rochester", c:"addiction", d:"Test.", ph:"585-568-8726", url:"https://example.org", hr:"M-F", doc:"None", tg:["any"], reach:"local" }',
    expectedToCatch: true,
    expectedRule: 'SWEPT_PHONE',
  },
  {
    name: 'wrong-DSS-phone-with-cooccur',
    description: 'Wrong Monroe DSS phone 753-6960 paired with DHS context (cooccur match)',
    line: '{ id:"fake-2", n:"Monroe County DHS — Application", c:"benefits", d:"Apply for SNAP through DHS Human Services.", ph:"585-753-6960", url:"https://example.org", hr:"M-F", doc:"None", tg:["any"], reach:"local" }',
    expectedToCatch: true,
    expectedRule: 'SWEPT_PHONE',
  },
  {
    name: 'sensitive-program-not-hidden',
    description: 'A new domesticSvc program added without hidden:true',
    line: '{ id:"fake-3", n:"New DV Hotline Test", c:"domesticSvc", d:"Test.", ph:"585-555-0000", url:"https://example.org", hr:"24/7", doc:"None", tg:["any"], reach:"local" }',
    expectedToCatch: true,
    expectedRule: 'SENSITIVE_PROGRAM_NOT_HIDDEN',
  },
  {
    name: 'sensitive-immigration-by-topic-not-hidden',
    description: 'Generic-category program tagged sensitiveTopic:immigration without hidden:true',
    line: '{ id:"fake-4", n:"Test Immigration Help", c:"documents", sensitiveTopic:"immigration", d:"Test.", ph:"585-555-0001", url:"https://example.org", hr:"M-F", doc:"None", tg:["any"], reach:"local" }',
    expectedToCatch: true,
    expectedRule: 'SENSITIVE_PROGRAM_NOT_HIDDEN',
  },

  // ───────────── Things gates CANNOT currently catch (the gap) ─────────────
  {
    name: 'wrong-phone-not-on-swept-list',
    description: 'A wrong phone we have never seen before (no swept-phones match possible)',
    line: '{ id:"fake-5", n:"Some Local Pantry", c:"food", d:"Emergency food.", ph:"585-444-0000", url:"https://example.org", hr:"M 10am-12pm", doc:"None", tg:["any"], reach:"local" }',
    expectedToCatch: false, // gates can't see this without external truth
    expectedRule: null,
  },
  {
    name: 'stale-hours',
    description: 'Hours from 2019 that are now wrong (looks structurally fine)',
    line: '{ id:"fake-6", n:"Greece Library", c:"education", d:"Library.", ph:"585-225-8951", ad:"2 Vince Tofany Blvd, Greece NY 14612", url:"https://example.org", hr:"M-F 8am-10pm, Sat 9am-6pm, Sun 1pm-5pm (2019)", doc:"None", tg:["any"], reach:"local" }',
    expectedToCatch: false,
    expectedRule: null,
  },
  {
    name: 'outdated-eligibility',
    description: 'Lollypop SNIP $40k income cap that was removed Jan 2026',
    line: '{ id:"fake-7", n:"Spay Neuter Help", c:"pets", d:"Low-cost surgery for households under $40,000 income.", ph:"585-223-1330", url:"https://example.org", hr:"By appointment", doc:"Tax form", tg:["hh"], inc:200, reach:"local" }',
    expectedToCatch: false,
    expectedRule: null,
  },
  {
    name: 'wrong-day-of-week',
    description: 'Lunch is Mon-Fri but entry says Tu-F (consequential — Mon meal missed)',
    line: '{ id:"fake-8", n:"Senior Lunch", c:"seniorSvc", d:"Lunch Tu-F at noon for seniors 60+.", ph:"585-637-8161", ad:"133 State St, Brockport NY 14420", url:"https://example.org", hr:"M-F 9am-5pm", doc:"None", tg:["sen"], reach:"local" }',
    expectedToCatch: false,
    expectedRule: null,
  },
  {
    name: 'misleading-auto-claim',
    description: 'Cleanslate "happens automatically" but actual implementation runs through 2027',
    line: '{ id:"fake-9", n:"Record Sealing", c:"legalCrimRecord", d:"Records are automatically sealed — you do not need to apply. Already happened for eligible people.", url:"https://example.org", hr:"24/7 online", doc:"None", tg:["any"], reach:"statewide" }',
    expectedToCatch: false,
    expectedRule: null,
  },
  {
    name: 'defunct-org',
    description: 'Org that closed in 2022 but entry still lists it (Urban Pathways HelpFinder NYC pattern)',
    line: '{ id:"fake-10", n:"Some Defunct Mutual Aid 2018", c:"food", d:"Free food and supplies.", ph:"585-555-9999", url:"https://example-defunct.org", hr:"M-F 9am-5pm", doc:"None", tg:["any"], reach:"local" }',
    expectedToCatch: false,
    expectedRule: null,
  },
];

// ─── Run each fixture against the gate's checks ──────────────────────────
//
// We can't easily call the gate's gateProgram() function because it works on
// program objects parsed from disk + a grandfather list. Instead, we re-implement
// the same checks here against the fixture line.

function gateChecksFor(line) {
  const failures = [];

  // Rule 1: SWEPT_PHONES
  for (const rule of SWEPT_WRONG_PHONES) {
    const hits = findPhoneMatches(line, rule.num, rule.cooccur);
    if (hits.length > 0) {
      failures.push({ kind: 'SWEPT_PHONE', label: rule.label });
    }
  }

  // Rule 4: SENSITIVE_PROGRAM_NOT_HIDDEN
  const HIDE_GATED_CATEGORIES = new Set(['domesticSvc', 'parentalProtection', 'legalImmigration']);
  const HIDE_GATED_TOPICS = new Set(['immigration', 'dv']);
  const cat = (line.match(/\bc\s*:\s*"([^"]+)"/) || [])[1];
  const sensitiveTopic = (line.match(/\bsensitiveTopic\s*:\s*"([^"]+)"/) || [])[1];
  const isHidden = /\bhidden\s*:\s*true\b/.test(line);
  const inSensitiveCategory = cat && HIDE_GATED_CATEGORIES.has(cat);
  const inSensitiveTopic = sensitiveTopic && HIDE_GATED_TOPICS.has(sensitiveTopic);
  if ((inSensitiveCategory || inSensitiveTopic) && !isHidden) {
    failures.push({ kind: 'SENSITIVE_PROGRAM_NOT_HIDDEN', label: 'sensitive program must have hidden:true' });
  }

  return failures;
}

// ─── Score and report ────────────────────────────────────────────────────

let pass = 0;
let miss = 0;
let falsePositive = 0;
let confirmedGap = 0;

const results = [];

for (const f of FIXTURES) {
  const fails = gateChecksFor(f.line);
  const caught = fails.length > 0;
  const matchedRule = caught && f.expectedRule && fails.some(x => x.kind === f.expectedRule);

  let status, note;
  if (f.expectedToCatch && matchedRule) {
    status = 'PASS';
    note = 'gate caught it (rule: ' + f.expectedRule + ')';
    pass++;
  } else if (f.expectedToCatch && caught && !matchedRule) {
    status = 'PARTIAL';
    note = 'gate caught it but with wrong rule (got ' + fails.map(x => x.kind).join(',') + ')';
    pass++;
  } else if (f.expectedToCatch && !caught) {
    status = 'MISS';
    note = 'gate did NOT catch it — gap (no rule for: ' + f.name + ')';
    miss++;
  } else if (!f.expectedToCatch && !caught) {
    status = 'CONFIRMED-GAP';
    note = 'gate cannot catch this without external truth (expected gap)';
    confirmedGap++;
  } else if (!f.expectedToCatch && caught) {
    status = 'FALSE-POSITIVE';
    note = 'gate caught it incorrectly (got ' + fails.map(x => x.kind).join(',') + ')';
    falsePositive++;
  }
  results.push({ status, name: f.name, description: f.description, note });
}

console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('  Adversarial Test: Gate Coverage Against Known-Wrong Fixtures');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');
const expected = FIXTURES.filter(f => f.expectedToCatch).length;
const gaps = FIXTURES.filter(f => !f.expectedToCatch).length;
console.log('Fixtures total:                ' + FIXTURES.length);
console.log('  Expected to be caught:       ' + expected);
console.log('  Known unfixable by gate:     ' + gaps);
console.log('');
console.log('Results:');
console.log('  PASS (caught as expected):   ' + pass);
console.log('  MISS (gap to fix):           ' + miss);
console.log('  FALSE-POSITIVE:              ' + falsePositive);
console.log('  CONFIRMED-GAP (known):       ' + confirmedGap);
console.log('');
console.log('Coverage of catchable errors:  ' + (expected ? Math.round((pass / expected) * 100) : 0) + '%');
console.log('');
console.log('Per-fixture detail:');
for (const r of results) {
  console.log('  [' + r.status.padEnd(15) + '] ' + r.name);
  console.log('                    ' + r.description);
  console.log('                    → ' + r.note);
}
console.log('');
console.log('Interpretation:');
console.log('  PASS = gate working as designed');
console.log('  MISS = a CATCHABLE error class our gate misses (gap to close — add rule)');
console.log('  CONFIRMED-GAP = error class no gate can catch without external truth');
console.log('                  (these need web verification / human review / call)');
console.log('  FALSE-POSITIVE = gate triggered when it should not have (false alarm — narrow rule)');
console.log('');
