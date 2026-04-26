#!/usr/bin/env node
/*
 * scripts/triage-dollar-offenders.cjs
 * Classifies every entry from list-dollar-offenders into buckets so we can
 * drain only the fix-worthy ones (decaying fee schedules, COLA-adjusted
 * exemptions, civil penalties) and skip statutory-fixed schedules and
 * pedagogical worked examples.
 *
 * Buckets (per entry, by majority of matches):
 *   - fee-schedule       — "$X per day/month/year", "civil penalty", "fee",
 *                          "fine", "cap", "limit", "exemption", "threshold"
 *                          → DRAIN TARGET (decaying figures, prone to drift)
 *   - worked-example     — "a home worth $X", "earning $X", "$X balance",
 *                          arithmetic chain ($X * Y = $Z) → rephrase to wordy
 *   - statutory-fixed    — primaryStatute appears in the same paragraph and
 *                          the $ is presented as a fixed statutory schedule
 *                          (often with %) → likely keep, lower priority
 *   - ambiguous          — none of the above signals strong → manual review
 *
 * Output: dist/dollar-amount-triage.json with per-entry classification
 *         and console summary by bucket.
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const ENTRIES_DIR = path.join(ROOT, 'src', 'data', 'legal', 'entries');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(DIST, 'dollar-amount-triage.json');

const BANKRUPTCY_FILES = new Set([
  'bankruptcy-automatic-stay-ny.js',
  'bankruptcy-chapter13-ny.js',
  'bankruptcy-chapter7-ny.js',
  'bankruptcy-discharge-ny.js',
  'bankruptcy-exemptions-ny.js',
  'bankruptcy-means-test-ny.js',
  'bankruptcy-reaffirmation-ny.js',
]);

const DOLLAR_RE = /\$\d[\d,]*(?:\.\d+)?/g;

const FEE_SCHEDULE_TERMS = [
  'per day', 'per month', 'per year', 'per hour', 'per week', 'per page', 'per filing',
  'civil penalty', 'civil penalties', 'penalty', 'fine', 'fines',
  'fee', 'fees', 'surcharge', 'reinstatement',
  'cap', 'caps', 'capped',
  'limit is', 'limit of', 'limited to',
  'exemption', 'threshold', 'maximum', 'minimum', 'maximum of',
  'increase to', 'adjusted', 'inflation', 'cost of living', 'cola',
];

const WORKED_EXAMPLE_TERMS = [
  'worth', 'valued at', 'value of', 'priced at',
  'for example', 'hypothetical', 'suppose', 'imagine', 'say a', 'say the',
  'earning', 'earns', 'income of', 'salary of', 'makes',
  'balance of', 'owed', 'owes', 'borrowed',
  'sale price', 'sells for', 'bought for', 'paid', 'pays',
];

const PERCENT_RE = /\d+(?:\.\d+)?\s*(?:%|percent)/i;

function getContextWindow(text, matchIdx, matchLen, words = 10) {
  // Grab ~words words on each side of the match
  const before = text.slice(0, matchIdx).trim().split(/\s+/).slice(-words).join(' ');
  const after = text.slice(matchIdx + matchLen).trim().split(/\s+/).slice(0, words).join(' ');
  return (before + ' ' + text.slice(matchIdx, matchIdx + matchLen) + ' ' + after).trim();
}

function classifyMatch(context, primaryStatute) {
  const lower = context.toLowerCase();
  const feeHits = FEE_SCHEDULE_TERMS.filter((t) => lower.includes(t));
  const exampleHits = WORKED_EXAMPLE_TERMS.filter((t) => lower.includes(t));
  const hasPercent = PERCENT_RE.test(context);
  const hasStatute = primaryStatute && lower.includes(primaryStatute.toLowerCase().split(/\s+/).pop().toLowerCase());

  if (feeHits.length > 0 && exampleHits.length === 0) return 'fee-schedule';
  if (exampleHits.length > 0 && feeHits.length === 0) return 'worked-example';
  if (hasPercent && hasStatute) return 'statutory-fixed';
  if (feeHits.length > exampleHits.length) return 'fee-schedule';
  if (exampleHits.length > feeHits.length) return 'worked-example';
  return 'ambiguous';
}

function classifyEntry(matches) {
  const counts = matches.reduce((acc, m) => { acc[m.bucket] = (acc[m.bucket] || 0) + 1; return acc; }, {});
  let best = 'ambiguous';
  let max = 0;
  for (const [k, v] of Object.entries(counts)) {
    if (v > max) { max = v; best = k; }
  }
  return { bucket: best, breakdown: counts };
}

async function main() {
  const files = fs.readdirSync(ENTRIES_DIR).filter((f) => f.endsWith('.js'));
  const out = { 'fee-schedule': [], 'worked-example': [], 'statutory-fixed': [], 'ambiguous': [] };

  for (const f of files) {
    if (BANKRUPTCY_FILES.has(f)) continue;
    const abs = path.join(ENTRIES_DIR, f);
    const mod = await import(pathToFileURL(abs).href);
    const e = Object.values(mod)[0];
    if (!e || !e.id) continue;
    if (e.draft || e.status !== 'active') continue;
    const wim = (e.whatItMeans && e.whatItMeans.en) || '';
    if (!DOLLAR_RE.test(wim)) continue;
    DOLLAR_RE.lastIndex = 0; // reset stateful regex

    const matches = [];
    let m;
    while ((m = DOLLAR_RE.exec(wim)) !== null) {
      const ctx = getContextWindow(wim, m.index, m[0].length, 8);
      matches.push({ amount: m[0], context: ctx, bucket: classifyMatch(ctx, e.primaryStatute) });
    }
    DOLLAR_RE.lastIndex = 0;

    const cls = classifyEntry(matches);
    out[cls.bucket].push({
      file: f,
      id: e.id,
      category: e.category,
      authorityType: e.authorityType,
      primaryStatute: e.primaryStatute,
      count: matches.length,
      breakdown: cls.breakdown,
      samples: matches.slice(0, 4),
    });
  }

  // Sort each bucket by count desc
  for (const b of Object.keys(out)) out[b].sort((a, b2) => b2.count - a.count);

  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({
    generatedAt: new Date().toISOString(),
    bucketCounts: Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length])),
    totalEntries: Object.values(out).reduce((s, v) => s + v.length, 0),
    buckets: out,
  }, null, 2));

  console.log('Dollar-amount triage');
  console.log('====================');
  for (const [k, v] of Object.entries(out)) {
    console.log(k.padEnd(18), ':', v.length, 'entries');
  }
  console.log('');
  console.log('Output:', OUT);
  console.log('');
  console.log('--- fee-schedule (drain target) — top 30 ---');
  for (const r of out['fee-schedule'].slice(0, 30)) {
    console.log(String(r.count).padStart(3) + '  ' + String(r.category || '-').padEnd(10) + '  ' + r.file);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
