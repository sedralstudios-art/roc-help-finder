// scripts/render-engagement-leaves.cjs
//
// Reads engagement-tree-draft-v1.json and emits ONE markdown file per leaf
// — these are the result pages users see at the end of each questionnaire
// path. Together they're the SEO-surface corpus: each one is an indexable
// page targeting its leaf's targetQueries[].
//
// Output directory has one file per leaf id, e.g.:
//   engagement-leaves-v1/leaf-money-rent.md
//   engagement-leaves-v1/leaf-housing-eviction.md
//
// Each leaf page carries:
//   • A path trail showing how the user got here (which questions + answers)
//   • The leaf's summary
//   • Each suggestion with its rationale
//   • A "more help" footer pointing to the existing HelpFinder questionnaire
//   • SEO target queries as a meta line for review
//
// Usage:
//   node scripts/render-engagement-leaves.cjs
//   node scripts/render-engagement-leaves.cjs --in tree.json --out-dir leaves/

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const inIdx = args.indexOf('--in');
const outDirIdx = args.indexOf('--out-dir');
const IN = inIdx >= 0 ? args[inIdx + 1] : 'engagement-tree-draft-v1.json';
const OUT_DIR = outDirIdx >= 0 ? args[outDirIdx + 1] : 'engagement-leaves-v1';

const tree = JSON.parse(fs.readFileSync(IN, 'utf8'));
const nodes = tree.nodes;

// Walk tree from rootId, collect every path that ends at a leaf.
// A "path" is the sequence of (questionNodeId, optionLabel) pairs leading to the leaf.
function findPathsToLeaves() {
  const paths = {}; // leafId → [{questionId, questionText, optionLabel}]
  function walk(currentId, trail) {
    const n = nodes[currentId];
    if (!n) return;
    if (n.type === 'leaf') {
      // Capture the first path that reaches each leaf (tree is currently a DAG; each leaf has one path).
      if (!paths[currentId]) paths[currentId] = trail.slice();
      return;
    }
    if (n.type === 'question') {
      for (const opt of (n.options || [])) {
        walk(opt.next, trail.concat([{ qid: currentId, qtext: n.text, label: opt.label }]));
      }
    }
  }
  walk(tree.rootId, []);
  return paths;
}

const paths = findPathsToLeaves();

fs.mkdirSync(OUT_DIR, { recursive: true });

// Emit per-leaf markdown
let written = 0;
for (const [leafId, trail] of Object.entries(paths)) {
  const leaf = nodes[leafId];
  if (!leaf) continue;

  const out = [];

  // Title — derive from the user's last answer (the leaf's reason for being)
  const lastAnswer = trail.length > 0 ? trail[trail.length - 1].label : 'Help options';
  out.push('# ' + lastAnswer);
  out.push('');

  // Trail: "You're here because you said: ..."
  if (trail.length > 0) {
    out.push('**Path through the questionnaire:**');
    out.push('');
    trail.forEach((step, i) => {
      out.push((i + 1) + '. _' + step.qtext + '_ → **' + step.label + '**');
    });
    out.push('');
  }

  // Warning if sensitive (e.g., suicide leaf)
  if (leaf.warning) {
    out.push('> ⚠ **' + leaf.warning + '**');
    out.push('');
  }

  // Summary
  if (leaf.summary) {
    out.push(leaf.summary);
    out.push('');
  }

  // Suggestions
  out.push('## What to look at');
  out.push('');
  for (const item of (leaf.items || [])) {
    const tag = item.type === 'entry' ? 'know-your-rights' : 'help/c';
    out.push('### ' + item.id);
    out.push('');
    out.push((item.why || '_(no rationale provided)_'));
    out.push('');
    out.push('_Type: ' + item.type + '_');
    out.push('');
  }

  // Footer
  out.push('---');
  out.push('');
  out.push("Didn't see what you need? Try the [main HelpFinder questionnaire](/help) for more specific situations, or call **211** for staffed routing.");
  out.push('');

  // SEO meta block (for review only — would become <meta> tags in real prerender)
  if (leaf.targetQueries && leaf.targetQueries.length) {
    out.push('---');
    out.push('');
    out.push('<!-- SEO target queries (for review only):');
    leaf.targetQueries.forEach(q => out.push('  - ' + q));
    out.push('-->');
  }

  const filepath = path.join(OUT_DIR, leafId + '.md');
  fs.writeFileSync(filepath, out.join('\n') + '\n');
  written++;
}

console.log('Wrote ' + written + ' leaf pages to ' + OUT_DIR + '/');
console.log('');
console.log('Each leaf page is a standalone SEO target — one prerendered HTML per leaf in production.');
console.log('Total target query coverage: ' + Object.values(nodes)
  .filter(n => n.type === 'leaf' && Array.isArray(n.targetQueries))
  .reduce((s, n) => s + n.targetQueries.length, 0) + ' queries across ' + written + ' pages.');
