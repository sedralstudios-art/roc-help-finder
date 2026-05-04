// scripts/audit-engagement-tree-verification.cjs
//
// Classifies every item referenced from the engagement tree by its review
// tier. Per Anthony 2026-05-02: "this will end up being the true product.
// Everything it links to needs to be fully verified awaiting legal or
// professional review."
//
// Two-track classification (decided 2026-05-02 afternoon):
//   • Programs surface factual contact info (phone, hours, address) — they
//     ship at fc-stamped (web-search-verified) tier. The dialer architecture
//     handles real-world reverification.
//   • Legal entries surface rights and procedures — they ship at attorney
//     tier. UPL risk and legal-interpretation accuracy require it.
//
// Tiers (highest → lowest):
//
//   anchor              — entry has isAnchor:true + lastFormallyReviewed
//                         (still provisional pending attorney sign-off)
//   attorney-reviewed   — entry's factCheckedBy.tool names an attorney
//                         (currently only the 7 Germain bankruptcy entries)
//   verified-program    — program has fc stamp (the 496/510 stamped from
//                         the 2026-04-30 web-search drain). PROGRAMS-ONLY tier.
//                         Ship-ready for programs.
//   websearch-verified  — entry has factCheckedBy.tool=websearch. NOT ship-
//                         ready for entries (need attorney). Path to anchor.
//   stamped-only        — has stamp but tool not in any recognized set.
//   unverified          — no stamps.
//
// Ship threshold:
//   • Entries: anchor OR attorney-reviewed
//   • Programs: verified-program (or higher)
//
// Outputs a markdown report grouping the tree's items by tier, plus a
// per-leaf "shippability" rating (whether the leaf has ANY items below
// attorney-tier).
//
// Usage:
//   node scripts/audit-engagement-tree-verification.cjs                      # default tree
//   node scripts/audit-engagement-tree-verification.cjs --in tree.json --out audit.md

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const inIdx = args.indexOf('--in');
const outIdx = args.indexOf('--out');
const IN = inIdx >= 0 ? args[inIdx + 1] : 'engagement-tree-draft-v1.json';
const OUT = outIdx >= 0 ? args[outIdx + 1] : null;

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');
const PROGRAMS_FILE = path.join(__dirname, '..', 'src', 'data', 'programs.js');

const tree = JSON.parse(fs.readFileSync(IN, 'utf8'));
const programsRaw = fs.readFileSync(PROGRAMS_FILE, 'utf8');

// Build entry meta map
const entryMeta = {};
for (const f of fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith('.js'))) {
  const id = f.replace(/\.js$/, '');
  const src = fs.readFileSync(path.join(ENTRIES_DIR, f), 'utf8');
  const isAnchor = /\bisAnchor\s*:\s*true\b/.test(src);
  const lastFormallyReviewed = (src.match(/\blastFormallyReviewed:\s*"([^"]+)"/) || [])[1] || null;
  const formallyReviewedBy = (src.match(/\bformallyReviewedBy:\s*"([^"]+)"/) || [])[1] || null;
  const fcMatch = src.match(/factCheckedBy:\s*\{\s*tool:\s*"([^"]+)",\s*date:\s*"([^"]+)"/);
  const fcTool = fcMatch ? fcMatch[1] : null;
  const fcDate = fcMatch ? fcMatch[2] : null;
  entryMeta[id] = { isAnchor, lastFormallyReviewed, formallyReviewedBy, fcTool, fcDate };
}

// Build program meta map
const programMeta = {};
for (const line of programsRaw.split(/\r?\n/)) {
  const idM = line.match(/\bid:"([^"]+)"/);
  if (!idM) continue;
  const id = idM[1];
  const verified = /\bverified:\s*true\b/.test(line);
  const fc = (line.match(/\bfc:\s*"([^"]+)"/) || [])[1] || null;
  const lastVerified = (line.match(/\blastVerified:\s*"([^"]+)"/) || [])[1] || null;
  const hidden = /\bhidden:\s*true\b/.test(line);
  programMeta[id] = { verified, fc, lastVerified, hidden };
}

const ATTORNEY_TOOLS = new Set(['germain', 'attorney', 'professor-germain']);
const WEBSEARCH_TOOLS = new Set(['websearch', 'web-search', 'claude-research', 'anchor-statute-relay-r1', 'anchor-statute-relay-r2']);

function classifyEntry(id) {
  const m = entryMeta[id];
  if (!m) return { tier: 'missing', detail: 'entry id not found' };
  if (m.isAnchor && m.lastFormallyReviewed) {
    return { tier: 'anchor', detail: `lastFormallyReviewed ${m.lastFormallyReviewed}` };
  }
  if (m.fcTool && ATTORNEY_TOOLS.has(m.fcTool.toLowerCase())) {
    return { tier: 'attorney-reviewed', detail: `factCheckedBy ${m.fcTool} ${m.fcDate}` };
  }
  if (m.fcTool && WEBSEARCH_TOOLS.has(m.fcTool.toLowerCase())) {
    return { tier: 'websearch-verified', detail: `factCheckedBy ${m.fcTool} ${m.fcDate}` };
  }
  if (m.fcTool) {
    return { tier: 'stamped-only', detail: `factCheckedBy ${m.fcTool} ${m.fcDate}` };
  }
  return { tier: 'unverified', detail: 'no factCheckedBy stamp' };
}

function classifyProgram(id) {
  const m = programMeta[id];
  if (!m) return { tier: 'missing', detail: 'program id not found' };
  // Programs ship at verified-program tier (fc stamp = web-search verification
  // from the 2026-04-30 fact-check drain). The verified:true + lastVerified
  // pair is a stronger signal but fc alone is sufficient for ship.
  if (m.verified && m.lastVerified) {
    return { tier: 'verified-program', detail: `verified:true, lastVerified ${m.lastVerified}` };
  }
  if (m.fc) {
    return { tier: 'verified-program', detail: `fc ${m.fc} (web-search drain)` };
  }
  return { tier: 'unverified', detail: 'no fc / verified stamp' };
}

// Walk every leaf, classify items
const tierCounts = { anchor: 0, 'attorney-reviewed': 0, 'verified-program': 0, 'websearch-verified': 0, 'stamped-only': 0, unverified: 0, missing: 0 };
const leafReports = [];
const itemsByTier = { anchor: [], 'attorney-reviewed': [], 'verified-program': [], 'websearch-verified': [], 'stamped-only': [], unverified: [], missing: [] };

// Per-track ship-ready definitions:
//   entries: anchor OR attorney-reviewed
//   programs: verified-program (or higher)
function isItemShipReady(item) {
  if (item.type === 'entry') return ['anchor', 'attorney-reviewed'].includes(item.tier);
  if (item.type === 'program') return ['verified-program', 'anchor', 'attorney-reviewed'].includes(item.tier);
  return false;
}

for (const [leafId, n] of Object.entries(tree.nodes)) {
  if (n.type !== 'leaf') continue;
  const itemReports = [];
  for (const item of (n.items || [])) {
    const cls = item.type === 'entry' ? classifyEntry(item.id) : classifyProgram(item.id);
    itemReports.push({ ...item, ...cls });
    tierCounts[cls.tier] = (tierCounts[cls.tier] || 0) + 1;
    itemsByTier[cls.tier].push({ leafId, ...item, ...cls });
  }
  // A leaf is ship-ready only if every item is ship-ready by its track.
  const tierOrder = ['missing', 'unverified', 'stamped-only', 'websearch-verified', 'verified-program', 'attorney-reviewed', 'anchor'];
  const lowestTier = tierOrder.find(t => itemReports.some(r => r.tier === t)) || 'anchor';
  const shipReady = itemReports.every(isItemShipReady);
  leafReports.push({ leafId, items: itemReports, shipReady, lowestTier });
}

// Build report
const md = [];
md.push('# Engagement-tree verification audit');
md.push('');
md.push('Generated ' + new Date().toISOString().slice(0, 10) + '. Tree: ' + IN + '.');
md.push('');
md.push('Per Anthony 2026-05-02 product-bar: every linked entry/program must reach **attorney-reviewed or anchor** tier before the questionnaire ships. This audit shows where each currently sits.');
md.push('');
md.push('## Tier counts');
md.push('');
md.push('| Tier | Count | Meaning |');
md.push('|---|---|---|');
md.push(`| anchor | ${tierCounts.anchor} | isAnchor:true + lastFormallyReviewed (even so, "provisional pending attorney sign-off") |`);
md.push(`| attorney-reviewed | ${tierCounts['attorney-reviewed']} | factCheckedBy names an attorney (Germain, etc.) |`);
md.push(`| **— SHIP THRESHOLD —** | ${tierCounts.anchor + tierCounts['attorney-reviewed']} | Items at or above this tier are ready to ship |`);
md.push(`| websearch-verified | ${tierCounts['websearch-verified']} | factCheckedBy tool=websearch (or program verified:true) — needs upgrade |`);
md.push(`| stamped-only | ${tierCounts['stamped-only']} | Has fc stamp but no recognized tier — needs review |`);
md.push(`| unverified | ${tierCounts.unverified} | No stamps at all — needs review |`);
md.push(`| missing | ${tierCounts.missing} | Item id doesn't resolve — fix required |`);
md.push('');

const totalItems = Object.values(tierCounts).reduce((s, c) => s + c, 0);
const shipReadyItems = tierCounts.anchor + tierCounts['attorney-reviewed'];
md.push(`**Ship-ready items: ${shipReadyItems} / ${totalItems} (${(100 * shipReadyItems / totalItems).toFixed(1)}%)**`);
md.push('');

const shipReadyLeaves = leafReports.filter(l => l.shipReady).length;
md.push(`**Ship-ready leaves: ${shipReadyLeaves} / ${leafReports.length}** (a leaf is ship-ready only if every item in it is at attorney-reviewed or anchor tier)`);
md.push('');
md.push('---');
md.push('');

md.push('## Items by tier');
md.push('');
for (const tier of ['anchor', 'attorney-reviewed', 'websearch-verified', 'stamped-only', 'unverified', 'missing']) {
  if (itemsByTier[tier].length === 0) continue;
  md.push(`### ${tier} (${itemsByTier[tier].length})`);
  md.push('');
  // Group by item.id since one item can appear in multiple leaves
  const byId = {};
  for (const it of itemsByTier[tier]) {
    if (!byId[it.id]) byId[it.id] = { type: it.type, detail: it.detail, leaves: [] };
    byId[it.id].leaves.push(it.leafId);
  }
  for (const id of Object.keys(byId).sort()) {
    md.push(`- \`${id}\` (${byId[id].type}) — ${byId[id].detail} — appears in ${byId[id].leaves.length} leaf(es)`);
  }
  md.push('');
}

md.push('## Per-leaf shippability');
md.push('');
md.push('| Leaf | Ship-ready? | Lowest item tier | Items |');
md.push('|---|---|---|---|');
for (const lr of leafReports) {
  md.push(`| \`${lr.leafId}\` | ${lr.shipReady ? '✓' : '✗'} | ${lr.lowestTier} | ${lr.items.length} |`);
}
md.push('');

const text = md.join('\n') + '\n';
if (OUT) {
  fs.writeFileSync(OUT, text);
  console.error('Wrote ' + text.length + ' chars to ' + OUT);
} else {
  process.stdout.write(text);
}

// Console summary
console.error('');
console.error('Audit summary:');
console.error('  Total items: ' + totalItems);
console.error('  Ship-ready: ' + shipReadyItems + ' (' + (100 * shipReadyItems / totalItems).toFixed(1) + '%)');
console.error('  Ship-ready leaves: ' + shipReadyLeaves + ' / ' + leafReports.length);
console.error('  Tier counts:', tierCounts);
