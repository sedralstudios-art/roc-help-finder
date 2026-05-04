// scripts/engagement-review-priority.cjs
//
// Prioritizes which non-attorney-tier items in the engagement tree to push
// toward higher review next. Score combines:
//   • Tree usage  — how many leaves reference this item (weighted)
//   • Reachability — how many root-paths can reach a leaf containing this
//   • Current tier — gap to attorney is the work needed
//   • Type — entries can become anchors (clear path); programs need
//     attorney review by another mechanism (e.g., professor verification
//     of program metadata)
//
// Output: priority-ranked markdown table — top of list is "review this next
// to maximize ship-ready leaves."
//
// Usage:
//   node scripts/engagement-review-priority.cjs
//   node scripts/engagement-review-priority.cjs --top 30 --out priority.md

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const inIdx = args.indexOf('--in');
const outIdx = args.indexOf('--out');
const topIdx = args.indexOf('--top');
const IN = inIdx >= 0 ? args[inIdx + 1] : 'engagement-tree-draft-v1.json';
const OUT = outIdx >= 0 ? args[outIdx + 1] : null;
const TOP = topIdx >= 0 ? parseInt(args[topIdx + 1], 10) : 30;

const tree = JSON.parse(fs.readFileSync(IN, 'utf8'));
const nodes = tree.nodes;

// Walk every path from root, count leaf reachability (one path per leaf in DAG)
const leafPaths = {};
function walk(id, depth) {
  const n = nodes[id];
  if (!n) return;
  if (n.type === 'leaf') {
    leafPaths[id] = (leafPaths[id] || 0) + 1;
    return;
  }
  if (n.type === 'question') {
    for (const opt of (n.options || [])) walk(opt.next, depth + 1);
  }
}
walk(tree.rootId, 0);

// Build per-item map
const itemMap = {}; // key: type+id → { id, type, leaves[], lowestStatus, ... }
for (const [leafId, n] of Object.entries(nodes)) {
  if (n.type !== 'leaf') continue;
  for (const item of (n.items || [])) {
    const key = item.type + ':' + item.id;
    if (!itemMap[key]) {
      itemMap[key] = {
        id: item.id, type: item.type, status: item.reviewStatus || 'unknown',
        leaves: [], leafCount: 0, why: item.why || null,
      };
    }
    itemMap[key].leaves.push(leafId);
    itemMap[key].leafCount++;
  }
}

// Score
const tierWeight = {
  'unverified': 100,
  'missing': 100,
  'stamped-only': 80,
  'websearch-verified': 40,
  'attorney-reviewed': 0,
  'anchor': 0,
};

const scored = Object.values(itemMap).map(it => {
  const tierScore = tierWeight[it.status] ?? 0;
  // Linear in leafCount; sqrt would dampen but linear shows real priority
  const score = tierScore + (it.leafCount * 10);
  return { ...it, score };
}).filter(it => it.score > 0)
  .sort((a, b) => b.score - a.score);

// Path-to-attorney suggestion per item
function pathSuggestion(item) {
  if (item.type === 'entry') {
    if (item.status === 'unverified') return 'Run factCheckedBy via WebSearch first; then assess as anchor candidate.';
    if (item.status === 'stamped-only') return 'Check factCheckedBy stamp. If unrecognized tool, may already be at attorney-reviewed tier — update audit-script ATTORNEY_TOOLS set if so.';
    if (item.status === 'websearch-verified') return 'Promote to anchor: add isAnchor:true + anchorSource block; run scripts/relay-fetch-anchor-text.cjs to populate hash; run anchor-statute-relay.cjs for R1 audit.';
  }
  if (item.type === 'program') {
    if (item.status === 'stamped-only') return 'Add verified:true + lastVerified + bump fc to current after manual fact-check.';
    if (item.status === 'unverified') return 'Add fc stamp via WebSearch verification.';
    if (item.status === 'websearch-verified') return 'Programs do not currently have an attorney-tier path. To reach ship threshold, either: a) require an attorney to review the program metadata + add factCheckedBy{tool:"germain",date}, or b) introduce a new program-attorney-review schema field. Currently no programs are at attorney tier.';
  }
  return '(unrecognized item type/status combo)';
}

// Build report
const md = [];
md.push('# Engagement-tree review priority queue');
md.push('');
md.push('Generated ' + new Date().toISOString().slice(0, 10) + '.  Source: ' + IN + '.');
md.push('');
md.push('Score = (tier-gap weight) + (leafCount × 10).  Higher score = push toward attorney tier sooner — these items appear in more leaves and/or are further from the ship threshold.');
md.push('');
md.push(`Top ${Math.min(TOP, scored.length)} of ${scored.length} non-attorney-tier items in the tree:`);
md.push('');
md.push('| # | item | type | leaves | status | score | path to ship-threshold |');
md.push('|---|---|---|---|---|---|---|');
scored.slice(0, TOP).forEach((it, i) => {
  md.push(`| ${i + 1} | \`${it.id}\` | ${it.type} | ${it.leafCount} | ${it.status} | ${it.score} | ${pathSuggestion(it)} |`);
});
md.push('');

// Stats
const byTier = {};
for (const s of scored) byTier[s.status] = (byTier[s.status] || 0) + 1;
md.push('## Stats');
md.push('');
md.push(`- Items needing review: **${scored.length}**`);
for (const [tier, count] of Object.entries(byTier).sort((a, b) => tierWeight[b[0]] - tierWeight[a[0]])) {
  md.push(`  - ${tier}: ${count}`);
}
md.push('');
md.push('## Strategic note on programs vs entries');
md.push('');
md.push('**Entries** have a clear path to attorney tier: promotion to `isAnchor:true` triggers source-drift hashing and the anchor-*-relay audit cycle (currently 5–6 rounds per anchor). 6 anchors live as of 2026-05-02. Memory: `project_anchor_review_difficulty_pattern_2026_05_01.md`.');
md.push('');
md.push('**Programs** do not currently have an attorney-tier path. Programs carry `verified:true + lastVerified` (manual + dialer-confirmed) but no attorney sign-off. To reach ship threshold for programs, decide:');
md.push('- Option 1: introduce `programReviewedBy: { name, date, scope }` schema field, populate as attorneys review subsets.');
md.push('- Option 2: don\'t require attorney review on programs — only require it on legal entries. Programs are directory listings (phone, hours, address) which are factual not legal-interpretive; web-search verification + dialer + lastVerified is arguably sufficient.');
md.push('');
md.push('Option 2 is simpler and probably correct: programs surface phone/hours/address which are factual; legal entries surface rights/procedures which need attorney accuracy. If we adopt Option 2, the ship threshold for programs drops to `websearch-verified`, and the ship-readiness audit becomes much more attainable.');

const text = md.join('\n') + '\n';
if (OUT) {
  fs.writeFileSync(OUT, text);
  console.error('Wrote ' + text.length + ' chars to ' + OUT);
} else {
  process.stdout.write(text);
}

// Console summary
console.error('');
console.error('Priority queue summary:');
console.error('  Items needing review: ' + scored.length);
console.error('  Top item: ' + scored[0]?.id + ' (' + scored[0]?.type + ', appears in ' + scored[0]?.leafCount + ' leaves, score ' + scored[0]?.score + ')');
console.error('');
console.error('Run: node scripts/engagement-review-priority.cjs --top 50 --out priority-queue.md');
