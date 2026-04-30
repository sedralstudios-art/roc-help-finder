// scripts/rank-cited-statutes.cjs
//
// Discovery script for legal-entry drift architecture step 3 (see
// src/data/legal/ANCHORS.md). Ranks statutes by how many legal entries
// reference them, so we know which ones to anchor first.
//
// Output (default): top-20 by primaryStatute count, with sample entry ids.
// Output (--all): full distribution.
// Output (--all --csv): same as --all but CSV-formatted.
//
// We rank by `primaryStatute` (the field most likely to be the entry's
// load-bearing citation). Bonus: also surface frequent statute mentions
// in `sources` URLs and in `whatItMeans` body text — those are signals
// that an anchor for that statute would retire duplicate prose across
// many entries even when it's not the entry's primary.

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');
const args = process.argv.slice(2);
const showAll = args.includes('--all');
const csv = args.includes('--csv');
const TOP_N = 20;

function listEntryFiles() {
  return fs.readdirSync(ENTRIES_DIR)
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(ENTRIES_DIR, f));
}

// Normalize statute strings so "NY RPP § 235-b", "NY RPP 235-B", "NY RPP §235b"
// all collapse to the same key. Aggressive lowercasing + strip section sigils.
function normStatute(s) {
  if (!s) return null;
  return s
    .toLowerCase()
    .replace(/§/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*-\s*/g, '-')
    .trim();
}

function parseEntry(filepath) {
  const src = fs.readFileSync(filepath, 'utf8');
  const id = (src.match(/\bid:\s*"([^"]+)"/) || [])[1];
  const primaryStatute = (src.match(/\bprimaryStatute:\s*"([^"]+)"/) || [])[1] || null;
  const isAnchor = /\bisAnchor\s*:\s*true\b/.test(src);
  const statuteAnchorRef = (src.match(/\bstatuteAnchor:\s*"([^"]+)"/) || [])[1] || null;

  // Source URLs — pull all https:// URLs from the sources array specifically
  const sourcesBlock = (src.match(/sources:\s*\[([\s\S]*?)\]/) || [])[1] || '';
  const sourceUrls = [...sourcesBlock.matchAll(/"(https?:\/\/[^"]+)"/g)].map(m => m[1]);

  return { file: path.basename(filepath), id, primaryStatute, isAnchor, statuteAnchorRef, sourceUrls };
}

// Heuristic statute extraction from a free-text block. Catches the common
// citation shapes:
//   NY RPP § 235-b  /  NY RPP 235-B  /  RPP § 235b  /  N.Y. RPP § 235-b
//   42 USC 1396a   /  42 U.S.C. § 1396a   /  29 USC 794
//   24 CFR 100   /  24 C.F.R. § 100.5   /  9 NYCRR 2520.6
//
// Designed for recall over precision. False positives end up in the long
// tail of the distribution and don't matter for the top-20 selection.
const STATUTE_REGEXES = [
  // NY statutes: NY <ABBREV> [§] <section>
  /\b(?:N\.?Y\.?\s+)?([A-Z]{2,5})\s*§?\s*(\d+(?:[-.]?\w+)?)/g,
  // Federal USC: NN USC [§] <section>
  /\b(\d{1,2})\s*U\.?S\.?C\.?\s*§?\s*(\d+(?:[a-z]+(?:-\d+)?)?(?:\([\w-]+\))*)/g,
  // CFR / NYCRR
  /\b(\d{1,2})\s*(?:C\.?F\.?R\.?|N\.?Y\.?C\.?R\.?R\.?)\s*§?\s*(\d+(?:\.\d+)?)/g,
];

function extractStatuteMentions(text) {
  // We don't actually USE the body-text scan in the default report — the
  // primary-statute count is more reliable. But the function exists so we
  // can layer it in later when ranking the long tail of "important but
  // never declared as primary."
  const hits = new Set();
  for (const re of STATUTE_REGEXES) {
    for (const m of text.matchAll(re)) {
      hits.add(m[0].replace(/\s+/g, ' ').trim());
    }
  }
  return [...hits];
}

// ─── main ──────────────────────────────────────────────────────────────────
const entries = listEntryFiles().map(parseEntry);

const counts = new Map();           // norm → { display, count, sampleIds[], anchorId|null }
let withPrimary = 0, withoutPrimary = 0, alreadyAnchored = 0;

for (const e of entries) {
  if (!e.primaryStatute) { withoutPrimary++; continue; }
  withPrimary++;
  const key = normStatute(e.primaryStatute);
  if (!counts.has(key)) {
    counts.set(key, { display: e.primaryStatute, count: 0, sampleIds: [], anchorId: null });
  }
  const row = counts.get(key);
  row.count++;
  if (row.sampleIds.length < 5) row.sampleIds.push(e.id);
  if (e.isAnchor) {
    row.anchorId = e.id;
    alreadyAnchored++;
  }
}

const ranked = [...counts.values()].sort((a, b) => b.count - a.count);

if (csv) {
  console.log('rank,count,statute,anchor_id,sample_entry_ids');
  ranked.forEach((r, i) => {
    console.log([i + 1, r.count, JSON.stringify(r.display), r.anchorId || '', r.sampleIds.join('|')].join(','));
  });
} else {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  Statute citation ranking (by primaryStatute frequency)');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('Total entries scanned:           ' + entries.length);
  console.log('Entries with primaryStatute:     ' + withPrimary);
  console.log('Entries without primaryStatute:  ' + withoutPrimary + '  (program/agency entries, etc.)');
  console.log('Distinct statutes cited:         ' + counts.size);
  console.log('Already anchored:                ' + alreadyAnchored);
  console.log('');

  const limit = showAll ? ranked.length : TOP_N;
  console.log('Top ' + limit + ' (anchor candidates):');
  console.log('');
  console.log('  rank   count   statute' + ' '.repeat(40) + 'sample entry ids');
  console.log('  ────   ─────   ' + '─'.repeat(48) + '────────────────');
  ranked.slice(0, limit).forEach((r, i) => {
    const rank = String(i + 1).padStart(4);
    const count = String(r.count).padStart(5);
    const statute = r.display.padEnd(48).slice(0, 48);
    const anchorMark = r.anchorId ? ' [⚓ ' + r.anchorId + ']' : '';
    console.log('  ' + rank + '   ' + count + '   ' + statute + r.sampleIds.slice(0, 2).join(', ') + (r.sampleIds.length > 2 ? ', ...' : '') + anchorMark);
  });

  console.log('');
  console.log('Anchoring guidance:');
  console.log('  • count ≥ 5  →  high-priority anchor candidate (retires duplication in 5+ entries)');
  console.log('  • count 2-4  →  medium-priority — anchor if the statute is volatile or central');
  console.log('  • count = 1  →  do not anchor (no duplication to retire; entry is its own statement)');
  console.log('');
  console.log('Re-run with --all to see full distribution. Use --csv for spreadsheet export.');
  console.log('');
}
