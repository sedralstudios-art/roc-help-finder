#!/usr/bin/env node
/*
 * scripts/migrate-seo-overrides-72.cjs
 * ====================================
 * Layer 2 of the CTR rewrite pass: hand-written seo.title + seo.description
 * overrides for the 12 entries with the highest 3-month GSC impressions.
 *
 * Layer 1 (algorithmic prerender template) was committed in 027cea32 + 475d3e27
 * and applies to all 1,131 published entries. Layer 2 adds per-entry overrides
 * for entries where the algorithmic template is good but a hand-written SERP
 * snippet earns measurably more clicks.
 *
 * Pattern: insert a seo: { title: { en }, description: { en } } block right
 * after the entry's summary block and before whoQualifies. Idempotent —
 * re-running on an already-migrated file is a no-op.
 *
 * Source data: GSC Performance export 2026-05-03 (last 3 months).
 * Target list selection: top 10 by impressions + 2 high-position smalls.
 */

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.resolve(__dirname, '..', 'src', 'data', 'legal', 'entries');

// Each entry: filename, title (≤65 chars to clear SERP truncation),
// description (≤160 chars including trust closer). Third-person, plain English,
// includes NY, ends with "Free legal help. Verified May 2026."
const OVERRIDES = [
  {
    file: 'security-deposit-ny.js',
    title: 'NY Security Deposit Law: 1-Month Cap, 14-Day Return, Forfeiture',
    description: "NY GOL §7-108: deposit capped at one month's rent, return within 14 days with itemized list, full forfeiture if late. Free legal help. Verified May 2026.",
  },
  {
    file: 'tenant-paint-lead-safe-ny.js',
    title: 'Lead Paint Renovation Rules in NY: What Landlords Must Do',
    description: 'Federal RRP Rule requires EPA-certified contractors and dust containment for any work disturbing pre-1978 paint. Free legal help. Verified May 2026.',
  },
  {
    file: 'snap-rights-ny.js',
    title: 'NY Food Stamps (SNAP): Eligibility, Income Limits, How to Apply',
    description: 'NY SNAP eligibility starts at 130–200% of the federal poverty level depending on household. Apply at mybenefits.ny.gov. Free legal help. Verified May 2026.',
  },
  {
    file: 'vehicle-registration-inspection-ny.js',
    title: 'NY Vehicle Registration, Inspection & Insurance Rules (2026)',
    description: 'VTL §401 (registration), §301 (annual inspection), and Insurance Law §5101 (continuous coverage). Penalties + suspension. Free legal help. Verified May 2026.',
  },
  {
    file: 'eviction-process-ny.js',
    title: 'NY Eviction Process: RPAPL Notice, Court, Warrant, Hardship Stay',
    description: "RPAPL Article 7: written notice, court hearing, judgment, sheriff's warrant. One-year hardship stay under §753. Free legal help. Verified May 2026.",
  },
  {
    file: 'plumbing-residential-ny-mon-rochester-city.js',
    title: 'Rochester NY Plumbing Permits: License, CIVICS Portal, DIY Rules',
    description: 'City of Rochester requires a Rochester plumber license and a CIVICS portal permit. Homeowners can pull their own. Free legal help. Verified May 2026.',
  },
  {
    file: 'unpaid-final-paycheck-ny.js',
    title: "NY Final Paycheck Law: When It's Due, How to Recover Wages",
    description: 'Labor Law §191: final wages due by next regular payday. Wage theft = unpaid amount + liquidated damages + fees. Free legal help. Verified May 2026.',
  },
  {
    file: 'benefits-verification-letter-ny-program.js',
    title: 'NY Benefits Verification Letter: SNAP, Medicaid, SSI, SSDI',
    description: 'Get proof of NY benefits at mybenefits.ny.gov (SNAP, Medicaid, TA) or my Social Security (SSI, SSDI). Free legal help. Verified May 2026.',
  },
  {
    file: 'clean-slate-ny.js',
    title: 'NY Clean Slate Act: Automatic Record Sealing (3-Year & 8-Year)',
    description: 'CPL §160.57 automatically seals NY misdemeanors after 3 years and felonies after 8. No filing required. Free legal help. Verified May 2026.',
  },
  {
    file: 'student-loan-options-ny.js',
    title: 'NY Student Loan Forgiveness & Repayment: SAVE, PSLF, IDR, Default',
    description: 'NY guide to income-driven repayment (SAVE, PAYE, IBR), Public Service Loan Forgiveness, and exit from default. Free legal help. Verified May 2026.',
  },
  {
    file: 'hvac-residential-ny-mon-gates-town.js',
    title: 'HVAC Permits in Gates NY: Town Rules, Inspections, Gas Line',
    description: 'Town of Gates does not license HVAC contractors. Gas line work needs a licensed plumber. Town inspectors. Free legal help. Verified May 2026.',
  },
  {
    file: 'roofing-residential-ny-mon-penfield-town.js',
    title: 'Penfield NY Roofing Permits: Even Repairs Need One',
    description: "Town of Penfield's permit language is the broadest in Monroe — even ordinary roof repair requires a building permit. Free legal help. Verified May 2026.",
  },
];

function escapeForDoubleQuote(s) {
  // The entry files use double-quoted strings. Escape any embedded double
  // quotes and backslashes. The source strings above are clean, so this is
  // a defensive pass — any future edit that embeds a quote will still emit
  // a valid JS string.
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function buildSeoBlock(o) {
  return (
    '\n  seo: {\n' +
    '    title: { en: "' + escapeForDoubleQuote(o.title) + '" },\n' +
    '    description: { en: "' + escapeForDoubleQuote(o.description) + '" }\n' +
    '  },\n'
  );
}

let updated = 0;
let skipped = 0;
let missing = 0;

for (const o of OVERRIDES) {
  const abs = path.join(ENTRIES_DIR, o.file);
  if (!fs.existsSync(abs)) {
    console.error('MISSING: ' + o.file);
    missing++;
    continue;
  }
  let src = fs.readFileSync(abs, 'utf8');

  // Idempotency: skip if the entry already declares an seo block.
  if (/^\s*seo:\s*\{/m.test(src)) {
    console.log('SKIP (already has seo block): ' + o.file);
    skipped++;
    continue;
  }

  // Insert right after the summary closing `},` and the blank line that
  // follows. Match the pattern:
  //   summary: {
  //     en: "..."
  //   },
  //
  // Use a multi-line regex anchored on `summary:` followed by the closing `},`.
  const summaryEndRe = /(\n\s*summary:\s*\{[\s\S]*?\n\s*\},\n)/;
  const m = src.match(summaryEndRe);
  if (!m) {
    console.error('NO summary BLOCK FOUND: ' + o.file);
    missing++;
    continue;
  }
  const insertion = buildSeoBlock(o);
  const updated_src = src.slice(0, m.index + m[0].length) + insertion + src.slice(m.index + m[0].length);

  // Sanity: the new file should be longer than the original by exactly the
  // insertion length. If not, abort.
  if (updated_src.length - src.length !== insertion.length) {
    console.error('LENGTH MISMATCH on ' + o.file + ' — aborting this file');
    missing++;
    continue;
  }

  fs.writeFileSync(abs, updated_src, 'utf8');
  console.log('OK: ' + o.file);
  updated++;
}

console.log('');
console.log('Updated: ' + updated);
console.log('Skipped: ' + skipped);
console.log('Missing: ' + missing);
process.exit(missing > 0 ? 1 : 0);
