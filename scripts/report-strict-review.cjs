// scripts/report-strict-review.cjs
//
// What-if reporter for the STRICT_REVIEW_FILTER flag in src/data/legal/index.js
// and scripts/prerender-legal.cjs. Prints how many entries would publish vs
// hide if the strict filter were turned on. Use this to size the SEO/UX cost
// before flipping the global switch.
//
// Reads each entry's reviewTier field directly from the file source (no
// dynamic require) so it doesn't depend on Vite or build state.

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');
const PUBLISHABLE_TIERS = new Set(['anchor-reviewed', 'anchor-reference']);

function getField(src, name) {
  const re = new RegExp('\\b' + name + ':\\s*"([^"]+)"');
  const m = src.match(re);
  return m ? m[1] : null;
}
function isDraft(src) {
  return /\bdraft\s*:\s*true\b/.test(src);
}
function isAnchor(src) {
  return /\bisAnchor\s*:\s*true\b/.test(src);
}

const files = fs.readdirSync(ENTRIES_DIR).filter((f) => f.endsWith('.js'));
let total = 0, draft = 0, currentlyPublic = 0,
    wouldPublish = 0, wouldHide = 0;
const byTier = {};
const wouldHideByCategory = {};

for (const f of files) {
  total++;
  const src = fs.readFileSync(path.join(ENTRIES_DIR, f), 'utf8');
  if (isDraft(src)) { draft++; continue; }
  currentlyPublic++;

  const tier = getField(src, 'reviewTier') || '(unset)';
  byTier[tier] = (byTier[tier] || 0) + 1;
  const cat = getField(src, 'category') || '(unset)';

  if (PUBLISHABLE_TIERS.has(tier)) {
    wouldPublish++;
  } else {
    wouldHide++;
    wouldHideByCategory[cat] = (wouldHideByCategory[cat] || 0) + 1;
  }
}

console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('  STRICT_REVIEW_FILTER what-if report');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');
console.log('Total entry files:           ' + total);
console.log('Already draft (always hidden):' + draft);
console.log('Currently public (today):    ' + currentlyPublic);
console.log('');
console.log('If STRICT_REVIEW_FILTER flipped to ON:');
console.log('  Would still publish:       ' + wouldPublish + '  (anchor-reviewed + anchor-reference)');
console.log('  Would be HIDDEN:           ' + wouldHide);
console.log('');
console.log('Distribution by reviewTier (of currently public):');
const sorted = Object.entries(byTier).sort((a, b) => b[1] - a[1]);
for (const [tier, n] of sorted) {
  const flag = PUBLISHABLE_TIERS.has(tier) ? ' ✓ publishes' : '';
  console.log('  ' + String(n).padStart(5) + '  ' + tier + flag);
}

if (wouldHide > 0) {
  console.log('');
  console.log('Of entries that would be hidden, by category:');
  const cats = Object.entries(wouldHideByCategory).sort((a, b) => b[1] - a[1]);
  for (const [cat, n] of cats.slice(0, 15)) {
    console.log('  ' + String(n).padStart(5) + '  ' + cat);
  }
  if (cats.length > 15) console.log('  ... ' + (cats.length - 15) + ' more categories');
}

console.log('');
console.log('To flip the filter on:');
console.log('  STRICT_REVIEW_FILTER=1 npm run build');
console.log('  Or set the const STRICT_REVIEW_FILTER = true in src/data/legal/index.js');
console.log('  AND scripts/prerender-legal.cjs (must mirror — Dual Rendering Trap).');
console.log('');
