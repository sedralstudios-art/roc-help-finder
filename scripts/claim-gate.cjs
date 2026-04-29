// scripts/claim-gate.cjs
//
// Content gate for legal entry fact-check workflow. Extends the structural
// validator (verify-entry-uniqueness.cjs) with a content scan that catches
// the recurring hallucinations and stale figures documented in the auto-memory
// note `feedback_recurring_factcheck_patterns.md`.
//
// The gate's job is to prevent the same hallucinations from being reintroduced
// — every fabricated citation here was caught at least once during the
// 2026-04-27 fact-check sweep, so a future Claude instance writing a new entry
// must not be allowed to ship one of these unverified.
//
// Usage:
//   node scripts/claim-gate.cjs <entry-id>           # print manifest
//   node scripts/claim-gate.cjs <entry-id> --write   # if no FAILs, write
//                                                    # factCheckedBy field
//   node scripts/claim-gate.cjs --all                # scan every non-bankruptcy
//                                                    # entry, exit 1 on any FAIL
//
// Tiers:
//   FAIL  - known-fabricated citation OR already-swept wrong phone number.
//           These should never appear after their initial correction. Block.
//   WARN  - outdated dollar amount paired with topic, or statute citation in
//           body without a matching source URL. Author judgment required.
//   PASS  - claim was checked and looks consistent.
//
// The gate is intentionally narrow — it only flags patterns the corpus has
// already proven wrong. It does NOT attempt open-ended fact-checking; that's
// what `scripts/fact-check-prompt.cjs` and the WebSearch loop are for.

const fs = require('fs');
const path = require('path');
const { parseStatuteURL } = require('./lib/parse-statute.cjs');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

const BANKRUPTCY_FILES = new Set([
  'bankruptcy-chapter-7-individuals-ny.js',
  'bankruptcy-chapter-13-wage-earner-ny.js',
  'bankruptcy-automatic-stay-ny.js',
  'bankruptcy-discharge-ny.js',
  'bankruptcy-means-test-ny.js',
  'bankruptcy-exemptions-ny.js',
  'bankruptcy-creditor-meeting-341-ny.js',
]);

// ─────────── Fabricated / misframed citations (FAIL) ───────────
// Each rule:
//   pat       — must match somewhere in scanned text
//   cooccur   — optional; if present, must ALSO match within a 200-char
//               window of pat for the rule to fire (lets us distinguish
//               "GOL 11-106" used correctly from "GOL 11-106 + Good
//               Samaritan" misframing)
//   label     — short human description for the manifest
//   fix       — what the correct citation/framing is

const FABRICATIONS = [
  { pat: /\bNY\s+GBS\s+396-?H\b/i,
    label: 'NY GBS 396-H (auto lease)',
    fix: 'use NY PEP §§ 331-345' },

  { pat: /\bCPLR\s+5222\s*\(\s*i\s*\)/i,
    label: 'CPLR 5222(i)',
    fix: 'use CPLR 5222(h)' },

  { pat: /\bGOL\s+11-106\b/i,
    cooccur: /good\s+samaritan|child\s+rescue|car\s+window|break.{0,15}window/i,
    label: 'GOL 11-106 misframed as Good Samaritan / child-rescue immunity',
    fix: 'GOL 11-106 is police/firefighter compensation; NY has no statute immunizing breaking a car window to rescue a child' },

  { pat: /\bRPL\s+345\b/i,
    cooccur: /boundary|property\s+line/i,
    label: 'RPL 345 misframed as boundary law',
    fix: 'RPL 345 is land-use restrictions; boundary-line agreements are common-law in NY' },

  { pat: /\bNY\s+NFC\s+78-?A\b/i,
    label: 'NY NFC 78-A (boat operator)',
    fix: 'NFC is not a real NY code; use NY NAV 78' },

  { pat: /\bNY\s+PEN\s+165\.54\b/i,
    cooccur: /catalytic/i,
    label: 'PEN 165.54 misframed as catalytic converter law',
    fix: 'PEN 165.54 is criminal possession of stolen property over $1M; catalytic converter law is VTL 415-a and GBL Article 6-C' },

  { pat: /\bNY\s+LAB\s+201-?h\b/i,
    cooccur: /bereavement/i,
    label: 'LAB 201-h misframed as bereavement leave',
    fix: 'LAB 201-h is employer access to personal social media; NY has no statutory mandatory bereavement leave for private employers (A3529/S3944 are unenacted)' },

  { pat: /\bVTL\s+1146\b/i,
    cooccur: /3[\s-]?foot|three[\s-]?foot/i,
    label: 'VTL 1146 misframed with 3-foot bicycle rule',
    fix: 'VTL 1146 imposes due care; NY has no codified 3-foot rule. VTL 1122-a requires "safe distance"' },

  { pat: /\bClass\s+3\s+e[\s-]?bike/i,
    cooccur: /\bRochester\b|Monroe\s+County/i,
    label: 'Class 3 e-bike legality in Rochester',
    fix: 'Class 3 e-bikes are legal only in NYC (cities of 1M+); Rochester allows Class 1 and 2 only' },

  { pat: /\bGBL\s+§?\s*771\b/i,
    cooccur: /1\/3|one[\s-]?third/i,
    label: 'GBL 771 1/3 deposit cap',
    fix: 'industry custom, not statutory; actual rule is Lien Law § 71-A escrow/bond' },

  { pat: /\bGBL\s+§?\s*456\b/i,
    cooccur: /debt\s+settlement/i,
    label: 'GBL 456 debt-settlement licensure',
    fix: 'NY has no debt-settlement-specific licensing or fee cap; only nonprofits doing budget planning need a license' },

  { pat: /\bdebt\s+collector/i,
    cooccur: /(NY|New\s+York)\s+state.{0,60}licens/i,
    label: 'NY state debt-collector licensing',
    fix: 'NY has no state-level debt-collector licensing; only NYC and Buffalo have local licensing' },

  { pat: /\bGBL\s+§?\s*771\b/i,
    cooccur: /\$\s*250\b/i,
    label: 'GBL 771 with $250 home-improvement-fraud threshold',
    fix: 'fabricated threshold; grand larceny 4th degree is "exceeds $1,000"' },

  { pat: /\bCPLR\s+1311\s*\(\s*4\s*\)/i,
    label: 'CPLR 1311(4) "90-day to file complaint"',
    fix: 'fabricated subsection' },

  { pat: /\bCPLR\s+6313\b/i,
    cooccur: /20[\s-]?day|twenty[\s-]?day/i,
    label: 'CPLR 6313 20-day TRO automatic expiration',
    fix: 'fabricated; NY CPLR 6313 has no fixed cap (federal Rule 65 has 14 days)' },

  { pat: /\bTax\s+Law\s+1101\b/i,
    cooccur: /age\s+2|under\s+(2|two)\b/i,
    label: 'Tax Law 1101 age-2 clothing exemption',
    fix: 'fabricated age cutoff; the $110 per-item rule applies to all ages' },

  { pat: /\bNY\s+LAB\s+159-?b\b/i,
    cooccur: /cancer\s+screening/i,
    label: 'LAB 159-b miscited as cancer-screening leave',
    fix: 'cancer-screening leave is NY Civil Service Law 159-b, public-sector only — no private-sector equivalent' },

  { pat: /\bNY\s+SOS\s+111-?h\b/i,
    cooccur: /new[\s-]?hire/i,
    label: 'SOS 111-h miscited as new-hire reporting',
    fix: 'new-hire reporting is NY Tax Law 171-h; SOS 111-h is the Support Collection Unit statute' },

  { pat: /\bNY\s+PL\s+240\.65\b/i,
    cooccur: /reckless\s+endangerment/i,
    label: 'PL 240.65 misframed as reckless endangerment',
    fix: 'PL 240.65 is unlawful prevention of public access to records; reckless endangerment is in PL Article 120' },

  { pat: /\b(?:RPP|RPL)\s+235-?bb\b/i,
    cooccur: /bed[\s-]?bug/i,
    label: '235-bb misframed as bed-bug disclosure',
    fix: 'bed-bug disclosure is RPL 235-j; 235-bb is certificates of occupancy' },

  { pat: /\bRPL\s+227-?c\b/i,
    cooccur: /lock\s+change|change.{0,10}lock/i,
    label: 'RPL 227-c misframed as DV lock-change duty',
    fix: 'RPL 227-c is lease termination only; lock-change duty (proposed RPL 238-b) is unenacted' },

  { pat: /\b15\s+USC\s+1666f\b/i,
    cooccur: /minimum\s+(purchase|charge|amount)|10\s+dollar|\$\s*10\s+minimum/i,
    label: '15 USC 1666f miscited as $10 minimum-purchase cap',
    fix: 'use 15 USC 1693o-2 (Durbin/Dodd-Frank, 2010); 1666f is cash discounts' },

  { pat: /\$\s*8\b/,
    cooccur: /credit\s+card\s+late\s+fee/i,
    label: '$8 credit card late fee cap',
    fix: 'CFPB rule was VACATED April 15, 2025 (N.D. Tex.); pre-rule safe harbors (~$30/$41) are back in effect' },

  { pat: /\bAGM\s+110-?a\b/i,
    label: 'AGM 110-a (statewide pooper-scooper)',
    fix: 'fabricated; PHL § 1310 only applies to cities of 400k+; Rochester (~210k) is not covered. Pooper-scooper duty in Monroe County is local-ordinance only' },

  { pat: /\bAGM\s+122\b/i,
    cooccur: /leash/i,
    label: 'AGM 122 misframed as statewide leash law',
    fix: 'AGM 122 is local-option enabling; NY has no statewide leash law' },

  { pat: /\bECL\s+11-1901\b/i,
    label: 'ECL 11-1901 (deer salvage permit)',
    fix: 'use ECL 11-0915 (Disposal of Deer, Moose and Bear Killed Unintentionally by Collision)' },

  { pat: /\bDOM\s+170\s*\(\s*6\s*\)/i,
    cooccur: /6\s+months|six\s+months/i,
    label: 'DOM 170(6) with 6-month period',
    fix: 'DOM 170(6) separation-agreement ground is one year; the 6-month figure is from DOM 170(5) decree-of-separation ground' },

  { pat: /\$\s*65\b/,
    cooccur: /RAP\s+sheet|criminal\s+history.{0,40}fee|DCJS.{0,40}fee/i,
    label: '$65 RAP sheet fee',
    fix: '$17.50 (NY-only) or $47.50 (NY+FBI); DCJS Record Review Unit (518) 457-9847' },

  { pat: /150\s*%\s*FPL/i,
    cooccur: /HEAP/i,
    label: '150% FPL HEAP eligibility',
    fix: 'HEAP uses 60% State Median Income (~$6,680/month family of 4) ≈ 250% FPL' },

  { pat: /\bPHL\s+§?\s*1310\b/i,
    cooccur: /Rochester|Monroe\s+County/i,
    label: 'PHL 1310 applied to Rochester/Monroe',
    fix: 'PHL 1310 only applies to cities of 400k+ plus Yonkers and Albany; Rochester (~210k) is not covered' },

  { pat: /\bGBS\s+§?\s*396-?s\b/i,
    cooccur: /service\s+contract|extended\s+warranty/i,
    label: 'GBS 396-s applied to service contracts / extended warranties',
    fix: 'GBS 396-s does not regulate service contracts; the actual statute is NY Insurance Law Article 79 (sections 7901-7912) and DFS Regulation 155 (11 NYCRR Part 390)' },

  { pat: /\b(?:four|4)\s+(?:or\s+more\s+)?employees\b/i,
    cooccur: /(?:Fair\s+Chance\s+Act|NYS\s*HRL|NY\s+State\s+Human\s+Rights\s+Law|NYSHRL)/i,
    label: 'Four-employee NY State HRL / Fair Chance employer threshold',
    fix: 'NY HRL state-level employer threshold was removed effective Feb 8, 2020; applies to all employers regardless of size. (NYC HRL still has its own threshold — make sure the entry distinguishes state from city.)' },
];

// Special case: GBL 352-eeee MUST be qualified as NYC-only.
// If it appears without an NYC-scope qualifier nearby, that's a FAIL.
function checkGbl352eeee(text) {
  const m = /\bGBL\s+352-?eeee\b/i.exec(text);
  if (!m) return null;
  const window = text.slice(Math.max(0, m.index - 200), m.index + 300);
  if (/NYC|New\s+York\s+City|five\s+borough|cities\s+of\s+1\s*million|Article\s+23-A.{0,40}NYC/i.test(window)) return null;
  return {
    label: 'GBL 352-eeee (condo conversion) without NYC scope qualifier',
    fix: 'GBL 352-eeee is NYC-only; 352-eee covers opted-in Nassau/Westchester/Rockland; Monroe County is not covered. Must explicitly qualify scope.',
  };
}

// ─────────── Already-swept wrong phone numbers (FAIL) ───────────
// These have global one-shot sweep scripts that have already been run.
// Reappearance means a new entry reintroduced a known-wrong number.

const SWEPT_WRONG_PHONES = [
  { num: '585-295-5727', label: 'Legal Aid Society of Rochester (old number)', fix: 'use (585) 232-4090' },
  { num: '585-295-5800', label: 'Empire Justice Center (old number)',          fix: 'use (585) 454-4060' },
  { num: '585-295-5702', label: 'Empire Justice Center (old number)',          fix: 'use (585) 454-4060' },
  { num: '585-295-5775', label: 'Empire Justice Center (old number)',          fix: 'use (585) 454-4060' },
  { num: '585-295-3100', label: 'JustCause (old VLSP number)',                 fix: 'use (585) 232-3051' },
  { num: '585-325-2800', label: 'Lifespan / Eldersource (old number)',         fix: 'use (585) 244-8400' },
  { num: '585-226-5380', label: 'DEC Region 8 Avon (old number)',              fix: 'use (585) 226-5400 or (585) 226-2466 by context' },
  // Surrogate's Court — only flag when paired with "Surrogate" since 753-1600 is correct for the Clerk's office
  { num: '585-753-5363', label: 'Monroe County Surrogate Court (old number)',  fix: 'use (585) 371-3310', cooccur: /Surrogate/i },
  // Family Court swept numbers
  { num: '585-371-3553', label: 'Monroe County Family Court (old number)',     fix: 'use (585) 371-3544' },
  { num: '585-428-2480', label: 'Monroe County Family Court (old number)',     fix: 'use (585) 371-3544' },
  { num: '585-428-5429', label: 'Monroe County Family Court (old number)',     fix: 'use (585) 371-3544' },
  // Monroe DHS old main line — context-aware so the program-specific lines aren't false-positives
  { num: '585-753-6960', label: 'Monroe County DHS / DSS (old main number)',   fix: 'use (585) 753-6998 for DHS general, (585) 753-6316 for Child Care', cooccur: /(?:DHS|DSS|Human\s+Services|Social\s+Services|Department\s+of)/i },
  // LawNY Rochester — the 295-5700 number was incorrect; correct is 325-2520
  { num: '585-295-5700', label: 'LawNY / Legal Assistance of Western NY (old/wrong number)', fix: 'use (585) 325-2520 (verified at lawny.org/Contact)' },
];

function normalizePhone(s) {
  return s.replace(/[^\d]/g, '');
}

function findPhoneMatches(text, raw, cooccur) {
  const target = normalizePhone(raw);
  if (target.length !== 10) return [];
  const re = /\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}/g;
  const hits = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    if (normalizePhone(m[0]) === target) {
      if (cooccur) {
        const window = text.slice(Math.max(0, m.index - 200), m.index + 200);
        if (!cooccur.test(window)) continue;
      }
      hits.push({ at: m.index, raw: m[0] });
    }
  }
  return hits;
}

// ─────────── Outdated figures (WARN) ───────────
// Each figure was the right answer in a prior year and is still likely sitting
// in older entries. Not necessarily wrong (some authors quote a historical
// year intentionally) so this is WARN, not FAIL.

const STALE_FIGURES = [
  { pat: /\$\s*18,?000\b/,            cooccur: /ABLE/i,                   label: 'ABLE annual contribution $18,000',     fix: '$20,000 in 2026' },
  { pat: /\$\s*13[\.,]?61\s*M/i,      cooccur: /federal.{0,30}estate/i,    label: 'Federal estate exemption $13.61M',     fix: '$15M under OBBBA, 2026' },
  { pat: /\$\s*6[\.,]?94\s*M/i,       cooccur: /(NY|New\s+York).{0,30}estate/i, label: 'NY estate exemption $6.94M',      fix: '$7.35M, 2026' },
  { pat: /\$\s*17,?280\b/,            cooccur: /adoption/i,                label: 'Adoption tax credit $17,280',           fix: '$17,670, 2026 (up to $5,120 refundable)' },
  { pat: /\$\s*200,?000\b/,           cooccur: /maintenance|alimony/i,     label: 'Temporary maintenance income cap $200,000', fix: '$241,000, eff. March 1, 2026' },
  { pat: /\$\s*107,?300\b/,           cooccur: /Enhanced\s+STAR|STAR/i,    label: 'Enhanced STAR income limit $107,300',   fix: '$110,750, 2026' },
  { pat: /\$\s*1,?000\b/,             cooccur: /child\s+labor.{0,40}(violation|fine|cap)/i, label: 'Child labor first-violation $1,000', fix: '$10,000, eff. May 9, 2025' },
  { pat: /\b10\s*%/,                  cooccur: /CCDF.{0,40}copay|copay.{0,40}CCDF/i, label: 'CCDF copay max 10%',          fix: '7%, 2024 CCDF Final Rule' },
  { pat: /\b6\s*(?:year|yr)/i,        cooccur: /consumer\s+credit.{0,60}(SOL|statute\s+of\s+limit)/i, label: 'Consumer-credit SOL 6 years', fix: '3 years, eff. April 7, 2022 (CPLR 214-i)' },
  { pat: /\$\s*250,?000\b/,           cooccur: /HRL.{0,40}willful|willful.{0,40}HRL/i, label: 'NY HRL willful penalty $250,000', fix: '$100,000' },
];

// ─────────── Field extraction ───────────

function readField(src, field) {
  // Matches `field: { en: "..." }` with escaped quotes
  const re = new RegExp(`${field}\\s*:\\s*\\{\\s*\\n?\\s*en\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's');
  const m = src.match(re);
  return m ? m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"') : '';
}

function readArrayField(src, field) {
  // Matches `field: { en: [ "...", "...", ... ] }`
  const re = new RegExp(`${field}\\s*:\\s*\\{\\s*\\n?\\s*en\\s*:\\s*\\[([\\s\\S]*?)\\]`, 's');
  const m = src.match(re);
  if (!m) return '';
  return [...m[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(x => x[1]).join('\n');
}

function readSources(src) {
  const m = src.match(/sources\s*:\s*\[([^\]]+)\]/s);
  if (!m) return [];
  return [...m[1].matchAll(/"([^"]+)"/g)].map(x => x[1]);
}

function readCounselPhones(src) {
  // counsel: [ { ... phone: "..." ... }, ... ]
  return [...src.matchAll(/phone\s*:\s*"([^"]+)"/g)].map(x => x[1]);
}

function readFactCheckedBy(src) {
  const m = src.match(/factCheckedBy\s*:\s*\{[^}]*date\s*:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

// ─────────── Statute citation extraction ───────────

const STATUTE_RE = /\b(?:NY\s+[A-Z]{2,5}|\d{1,3}\s+U\.?S\.?C\.?|\d{1,3}\s+CFR|\d{1,3}\s+NYCRR|RPAPL|CPLR|GBL|GOL|VTL|PEN|LAB|RPL|PHL|DOM|EPTL|EDN|ECL|AGM)\s*§?\s*[A-Za-z0-9.\-]+(?:\s*\([a-z0-9]+\))?/g;

function extractStatuteCitations(text) {
  const found = new Set();
  let m;
  while ((m = STATUTE_RE.exec(text)) !== null) {
    found.add(m[0].trim().replace(/\s+/g, ' '));
  }
  return [...found];
}

// ─────────── The gate ───────────

function gateEntry(filename) {
  const filepath = path.join(ENTRIES_DIR, filename);
  const src = fs.readFileSync(filepath, 'utf8');

  const summary = readField(src, 'summary');
  const whatItMeans = readField(src, 'whatItMeans');
  const example = readField(src, 'example');
  const yourRights = readArrayField(src, 'yourRights');
  const legalOptions = readArrayField(src, 'legalOptions');
  const sources = readSources(src);
  const counselPhones = readCounselPhones(src);
  const factCheckedDate = readFactCheckedBy(src);

  const body = [summary, whatItMeans, example, yourRights, legalOptions].join('\n\n');

  const fails = [];
  const warns = [];
  const passes = [];

  // 1. Fabrication scan
  // Skip when the local window contains negation/correction language — the
  // author is explicitly debunking the wrong claim, not asserting it. Without
  // this, the gate fires on entries whose whole point is to explain that the
  // fabricated citation is wrong.
  const NEGATION_RE = /\b(?:not\s+covered|is\s+not|does\s+not|do\s+not|doesn'?t|don'?t|no\s+codified|no\s+statutory|no\s+such|fabricated|wrong(?:ly)?\s+cited|miscited|misframed|incorrect|unenacted|never\s+enacted|outdated|out\s+of\s+date|debunked|myth)\b/i;

  for (const rule of FABRICATIONS) {
    let m = rule.pat.exec(body);
    rule.pat.lastIndex = 0;
    if (!m) continue;
    const window = body.slice(Math.max(0, m.index - 200), m.index + 300);
    if (rule.cooccur && !rule.cooccur.test(window)) continue;
    if (NEGATION_RE.test(window)) continue;
    fails.push({
      kind: 'FABRICATION',
      label: rule.label,
      fix: rule.fix,
      excerpt: body.slice(Math.max(0, m.index - 40), m.index + 120).replace(/\s+/g, ' ').trim(),
    });
  }

  const gbl352 = checkGbl352eeee(body);
  if (gbl352) fails.push({ kind: 'FABRICATION', label: gbl352.label, fix: gbl352.fix, excerpt: '' });

  // 2. Already-swept wrong phones
  for (const rule of SWEPT_WRONG_PHONES) {
    const hits = findPhoneMatches(body, rule.num, rule.cooccur)
      .concat(findPhoneMatches(counselPhones.join('\n'), rule.num, rule.cooccur));
    if (hits.length > 0) {
      fails.push({
        kind: 'SWEPT_PHONE',
        label: rule.label + ' — ' + rule.num,
        fix: rule.fix,
        excerpt: hits[0].raw,
      });
    }
  }

  // 3. Stale figures (WARN)
  for (const rule of STALE_FIGURES) {
    let m = rule.pat.exec(body);
    rule.pat.lastIndex = 0;
    if (!m) continue;
    if (rule.cooccur) {
      const window = body.slice(Math.max(0, m.index - 200), m.index + 300);
      if (!rule.cooccur.test(window)) continue;
    }
    warns.push({
      kind: 'STALE_FIGURE',
      label: rule.label,
      fix: rule.fix,
      excerpt: body.slice(Math.max(0, m.index - 40), m.index + 80).replace(/\s+/g, ' ').trim(),
    });
  }

  // 4. Statute citation in body without matching source URL
  const cited = extractStatuteCitations(body);
  const sourceStatutes = new Set(
    sources.map(parseStatuteURL).filter(Boolean).map(s => s.toUpperCase().replace(/\s+/g, ''))
  );
  for (const cite of cited) {
    const norm = cite.toUpperCase().replace(/[\s§()]/g, '').replace(/[A-Z]{2,5}\d/, m => m.slice(0, -1) + ' ' + m.slice(-1)).replace(/\s+/g, '');
    // Loose match: any source-statute string that contains the citation's
    // section number is a hit. Tightening this further would require the
    // citation parser to handle freeform body text, which it doesn't.
    const sectionM = cite.match(/\d[\w.\-]*$/);
    if (!sectionM) continue;
    const section = sectionM[0].toUpperCase();
    let matched = false;
    for (const s of sourceStatutes) {
      if (s.endsWith(section)) { matched = true; break; }
    }
    if (matched) passes.push({ kind: 'STATUTE_SOURCED', label: cite });
    else warns.push({ kind: 'STATUTE_UNSOURCED', label: cite, fix: 'add a source URL for this citation, or remove the citation if not load-bearing' });
  }

  // 5. Counsel phone format
  for (const p of counselPhones) {
    if (!/\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}/.test(p)) {
      warns.push({ kind: 'BAD_PHONE_FORMAT', label: p, fix: 'normalize to (XXX) XXX-XXXX' });
    }
  }

  return { filename, fails, warns, passes, factCheckedDate };
}

// ─────────── Output ───────────

function printManifest(report) {
  const { filename, fails, warns, passes, factCheckedDate } = report;
  console.log('\n=== ' + filename + ' ===');
  if (factCheckedDate) console.log('  factCheckedBy: ' + factCheckedDate);

  if (fails.length === 0 && warns.length === 0 && passes.length === 0) {
    console.log('  (no claims extracted)');
    return;
  }

  if (fails.length > 0) {
    console.log('\n  FAIL (' + fails.length + '):');
    for (const f of fails) {
      console.log('    [' + f.kind + '] ' + f.label);
      if (f.excerpt) console.log('      excerpt: "' + f.excerpt + '"');
      console.log('      fix:     ' + f.fix);
    }
  }

  if (warns.length > 0) {
    console.log('\n  WARN (' + warns.length + '):');
    for (const w of warns) {
      console.log('    [' + w.kind + '] ' + w.label);
      if (w.excerpt) console.log('      excerpt: "' + w.excerpt + '"');
      if (w.fix) console.log('      hint:    ' + w.fix);
    }
  }

  if (passes.length > 0) {
    console.log('\n  PASS (' + passes.length + '):  ' + passes.map(p => p.label).join(', '));
  }
}

function writeFactCheckedBy(filename, tool) {
  const filepath = path.join(ENTRIES_DIR, filename);
  let src = fs.readFileSync(filepath, 'utf8');
  const today = new Date().toISOString().slice(0, 10);
  const newField = 'factCheckedBy: { tool: "' + (tool || 'websearch') + '", date: "' + today + '" }';

  if (/factCheckedBy\s*:/.test(src)) {
    src = src.replace(/factCheckedBy\s*:\s*\{[^}]*\}/, newField);
  } else if (/lastVerified\s*:\s*"[^"]+",?/.test(src)) {
    src = src.replace(/(lastVerified\s*:\s*"[^"]+",?)/, '$1\n  ' + newField + ',');
  } else {
    console.error('  ! could not write: no lastVerified anchor found');
    return false;
  }

  fs.writeFileSync(filepath, src);
  console.log('  ✓ wrote ' + newField);
  return true;
}

function main() {
  const args = process.argv.slice(2);
  const writeMode = args.includes('--write');
  const allMode = args.includes('--all');
  const toolArgIdx = args.findIndex(a => a.startsWith('--tool='));
  const tool = toolArgIdx >= 0 ? args[toolArgIdx].slice(7) : 'websearch';

  if (allMode) {
    const files = fs.readdirSync(ENTRIES_DIR)
      .filter(f => f.endsWith('.js') && !BANKRUPTCY_FILES.has(f));
    let totalFails = 0;
    const failingFiles = [];
    for (const f of files) {
      const r = gateEntry(f);
      if (r.fails.length > 0) {
        printManifest(r);
        totalFails += r.fails.length;
        failingFiles.push(f);
      }
    }
    console.log('\n────────────────────────────────────────');
    console.log('Scanned ' + files.length + ' entries; ' + failingFiles.length + ' have FAILs (' + totalFails + ' total).');
    process.exit(failingFiles.length > 0 ? 1 : 0);
  }

  const id = args.find(a => !a.startsWith('--'));
  if (!id) {
    console.error('Usage: node scripts/claim-gate.cjs <entry-id> [--write]');
    console.error('       node scripts/claim-gate.cjs --all');
    process.exit(1);
  }
  const filename = id.endsWith('.js') ? id : id + '.js';
  if (!fs.existsSync(path.join(ENTRIES_DIR, filename))) {
    console.error('Entry not found: ' + filename);
    process.exit(1);
  }

  const report = gateEntry(filename);
  printManifest(report);

  if (writeMode) {
    if (report.fails.length > 0) {
      console.log('\n  ✗ refusing to write factCheckedBy: ' + report.fails.length + ' FAIL(s) must be fixed first');
      process.exit(1);
    }
    console.log('');
    writeFactCheckedBy(filename, tool);
  }

  process.exit(report.fails.length > 0 ? 1 : 0);
}

main();
