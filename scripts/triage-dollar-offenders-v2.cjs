#!/usr/bin/env node
/*
 * scripts/triage-dollar-offenders-v2.cjs
 *
 * Tighter classifier. First pass over-counted statutory-fixed amounts (e.g.,
 * VTL minimum insurance coverage, RPL 238-a late fee cap, VTL 1174 school-bus
 * fines) as "fee-schedule" because the surrounding words "fine"/"cap" matched.
 *
 * v2 promotes amounts to "statutory-fixed" when ANY of these signals appear
 * within ~12 words of the match:
 *   - Inline statute citation: "VTL 1174", "RPL 238-a", "Tax Law 253",
 *     "SCPA 2307", "SSL 209", "GBL 349", USC, CFR, NYCRR, "Section X",
 *     "§ X", or NY code abbreviation + number
 *   - Statutory-rate phrasing: "for each $X", "per $Y of", "at the rate of
 *     X percent", "X% of $Y" with statute nearby
 *   - "minimum coverage" / "required minimum" (NY VTL liability minimums)
 *
 * Drain target ("decaying-figure"): amounts adjacent to terms suggesting
 * inflation/COLA/annual update — federal SSI/SSP, federal poverty level,
 * homestead exemption, bankruptcy exemption, estate tax threshold, DMV
 * reinstatement fees, court filing fees — without an inline statute pin.
 *
 * Output: dist/dollar-amount-triage-v2.json
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const ENTRIES_DIR = path.join(ROOT, 'src', 'data', 'legal', 'entries');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(DIST, 'dollar-amount-triage-v2.json');

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

// Inline statute markers — broad. Includes NY code abbreviations, USC, CFR,
// NYCRR, "Section X", "§ X", "Tax Law", "Civil Practice Law", "Real Property
// Law", etc.
const STATUTE_MARKER_RE = new RegExp([
  '\\b(?:CPL|CPLR|DOM|FCT|VAT|VTL|GBS|GBL|GOB|CVP|SOS|SSL|PBH|RPP|RPL|LAB|SCPA|EPTL|EXC|INS|JUD|TAX|PEN|EDN|MHY|VIL|TWN|HHA|UCC|LLC|BCL|NPC|ABC|ACA|ART|SCP|RPA|RPT|EPT|OFP|DCD|CRC|PML|MTV|MIL|NAV|PAR|PSL|PBO|PBA|PPH|WKC|CRS|BSC|CVR)\\s*§?\\s*\\d',
  '§\\s*\\d',
  '\\bSection\\s+\\d',
  '\\bTax Law\\b',
  '\\bCivil Practice Law\\b',
  '\\bReal Property Law\\b',
  '\\bSocial Services Law\\b',
  '\\bPublic Health Law\\b',
  '\\bGeneral Business Law\\b',
  '\\bGeneral Obligations Law\\b',
  '\\bEducation Law\\b',
  '\\bSurrogate'+"'"+'s Court Procedure Act\\b',
  '\\bEstates, Powers, and Trusts Law\\b',
  '\\bExecutive Law\\b',
  '\\bInsurance Law\\b',
  '\\bLabor Law\\b',
  '\\bPenal Law\\b',
  '\\bVehicle and Traffic Law\\b',
  '\\b\\d+\\s+(?:USC|CFR|NYCRR)\\b',
  '\\bRPL\\s+\\d',
  '\\bVTL\\s+\\d',
  '\\bSSL\\s+\\d',
  '\\bGBL\\s+\\d',
  '\\bSCPA\\s+\\d',
  '\\bEPTL\\s+\\d',
].join('|'), 'i');

// Statutory-rate phrasing
const STATUTORY_RATE_RE = /\b(?:for each|per)\s+\$\d|\bat the rate of\s+\d+(?:\.\d+)?\s*(?:%|percent)|\bX% of \$|\bminimum (?:coverage|liability|insurance)\b|\brequired minimum\b/i;

// Decaying-figure signals
const DECAY_TERMS_RE = /\b(?:adjusted for inflation|cost of living|cola|annually|each year|recalculated|federal poverty|federal SSI|SSP|TANF|Section 8|FMR|fair market rent|reinstatement fee|filing fee|surcharge|exemption (?:amount|tier|cap)|threshold|cap|maximum (?:amount|allowable))\b/i;

// Worked-example signals
const EXAMPLE_TERMS_RE = /\b(?:for example|hypothetical|suppose|imagine|say a|say the|worth|valued at|sells for|sold for|priced at|earning|earns?|income of|salary of|owes?|borrowed|balance of)\b/i;

function getContext(text, idx, len, words = 12) {
  const before = text.slice(0, idx).trim().split(/\s+/).slice(-words).join(' ');
  const after = text.slice(idx + len).trim().split(/\s+/).slice(0, words).join(' ');
  return (before + ' ' + text.slice(idx, idx + len) + ' ' + after).trim();
}

function classifyMatch(ctx) {
  if (STATUTE_MARKER_RE.test(ctx) || STATUTORY_RATE_RE.test(ctx)) return 'statutory-fixed';
  if (DECAY_TERMS_RE.test(ctx)) return 'decaying-figure';
  if (EXAMPLE_TERMS_RE.test(ctx)) return 'worked-example';
  return 'ambiguous';
}

function classifyEntry(matches, primaryStatute) {
  // If majority of matches are statutory-fixed, the whole entry is statutory.
  // Otherwise pick the dominant non-statutory bucket.
  const counts = matches.reduce((acc, m) => { acc[m.bucket] = (acc[m.bucket] || 0) + 1; return acc; }, {});
  const total = matches.length;
  if ((counts['statutory-fixed'] || 0) / total >= 0.6) return { bucket: 'statutory-fixed', counts };
  if ((counts['decaying-figure'] || 0) >= 1) return { bucket: 'decaying-figure', counts };
  if ((counts['worked-example'] || 0) > (counts['ambiguous'] || 0)) return { bucket: 'worked-example', counts };
  return { bucket: 'ambiguous', counts };
}

async function main() {
  const files = fs.readdirSync(ENTRIES_DIR).filter((f) => f.endsWith('.js'));
  const out = { 'decaying-figure': [], 'statutory-fixed': [], 'worked-example': [], 'ambiguous': [] };

  for (const f of files) {
    if (BANKRUPTCY_FILES.has(f)) continue;
    const abs = path.join(ENTRIES_DIR, f);
    const mod = await import(pathToFileURL(abs).href);
    const e = Object.values(mod)[0];
    if (!e || !e.id) continue;
    if (e.draft || e.status !== 'active') continue;
    const wim = (e.whatItMeans && e.whatItMeans.en) || '';
    if (!DOLLAR_RE.test(wim)) continue;
    DOLLAR_RE.lastIndex = 0;

    const matches = [];
    let m;
    while ((m = DOLLAR_RE.exec(wim)) !== null) {
      const ctx = getContext(wim, m.index, m[0].length, 12);
      matches.push({ amount: m[0], context: ctx, bucket: classifyMatch(ctx) });
    }
    DOLLAR_RE.lastIndex = 0;

    const cls = classifyEntry(matches, e.primaryStatute);
    out[cls.bucket].push({
      file: f,
      id: e.id,
      category: e.category,
      authorityType: e.authorityType,
      primaryStatute: e.primaryStatute,
      count: matches.length,
      breakdown: cls.counts,
      decayingMatches: matches.filter((x) => x.bucket === 'decaying-figure').slice(0, 4),
    });
  }

  for (const b of Object.keys(out)) out[b].sort((a, b2) => b2.count - a.count);

  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({
    generatedAt: new Date().toISOString(),
    bucketCounts: Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length])),
    totalEntries: Object.values(out).reduce((s, v) => s + v.length, 0),
    buckets: out,
  }, null, 2));

  console.log('Dollar-amount triage v2 (tighter classifier)');
  console.log('============================================');
  for (const [k, v] of Object.entries(out)) {
    console.log(k.padEnd(18), ':', v.length, 'entries');
  }
  console.log('');
  console.log('Output:', OUT);
  console.log('');
  console.log('--- decaying-figure (true drain target) ---');
  console.log('count  category    file                                                  decaying matches');
  for (const r of out['decaying-figure']) {
    const samples = (r.decayingMatches || []).map((x) => x.amount).join(', ');
    console.log(String(r.count).padStart(5) + '  ' + String(r.category || '-').padEnd(10) + '  ' + r.file.padEnd(54) + '  ' + samples);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
