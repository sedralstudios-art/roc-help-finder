// scripts/render-engagement-tree.cjs
//
// Reads engagement-tree-draft-v1.json (or whatever --in <file> points at)
// and writes a markdown walkthrough showing every question, every option,
// and every leaf with its suggestions. Easier to read than the raw JSON
// when reviewing tree design.
//
// Usage:
//   node scripts/render-engagement-tree.cjs                       # stdout
//   node scripts/render-engagement-tree.cjs --in tree.json --out tree.md

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const inIdx = args.indexOf('--in');
const outIdx = args.indexOf('--out');
const IN = inIdx >= 0 ? args[inIdx + 1] : 'engagement-tree-draft-v1.json';
const OUT = outIdx >= 0 ? args[outIdx + 1] : null;

const tree = JSON.parse(fs.readFileSync(IN, 'utf8'));
const nodes = tree.nodes;

const out = [];
out.push('# ' + IN);
out.push('');
if (tree._meta) {
  out.push('> ' + (tree._meta.purpose || ''));
  out.push('');
  out.push('Status: **' + (tree._meta.status || '?') + '**.  Version: ' + (tree._meta.version || '?') + '.  Created: ' + (tree._meta.created || '?') + '.');
  out.push('');
}
const leaves = Object.keys(nodes).filter(k => nodes[k].type === 'leaf');
const questions = Object.keys(nodes).filter(k => nodes[k].type === 'question');
const totalSlots = leaves.reduce((s, l) => s + (nodes[l].items?.length || 0), 0);
out.push('**' + Object.keys(nodes).length + ' nodes** (' + questions.length + ' questions, ' + leaves.length + ' leaves) · **' + totalSlots + ' suggestion slots** · avg ' + (totalSlots / leaves.length).toFixed(1) + ' per leaf.');
out.push('');
out.push('---');
out.push('');

function renderNode(id, depth) {
  const n = nodes[id];
  if (!n) { out.push(' '.repeat(depth * 2) + '⚠ unknown node: ' + id); return; }
  const indent = '  '.repeat(depth);
  if (n.type === 'question') {
    out.push(indent + '## ' + (depth === 0 ? '🏁 ' : '❓ ') + n.text + '  `[' + id + ']`');
    if (n.subtext) out.push(indent + '_' + n.subtext + '_');
    out.push('');
    for (const opt of n.options || []) {
      out.push(indent + '- ▸ **' + opt.label + '** → `' + opt.next + '`');
    }
    out.push('');
  } else if (n.type === 'leaf') {
    out.push(indent + '### 🍀 leaf  `[' + id + ']`');
    if (n.warning) out.push(indent + '> ⚠ **' + n.warning + '**');
    out.push(indent + '_' + (n.summary || '') + '_');
    out.push('');
    for (const item of n.items || []) {
      const tag = item.type === 'entry' ? 'entry' : 'program';
      out.push(indent + '- `' + item.id + '` (' + tag + ') — ' + (item.why || ''));
    }
    if (n.targetQueries && n.targetQueries.length) {
      out.push('');
      out.push(indent + '🎯 SEO target queries: ' + n.targetQueries.map(q => '`' + q + '`').join(', '));
    }
    out.push('');
  }
}

const visited = new Set();
function walk(id, depth) {
  if (visited.has(id)) return;
  visited.add(id);
  renderNode(id, depth);
  const n = nodes[id];
  if (n?.type === 'question') {
    for (const opt of n.options || []) {
      walk(opt.next, depth + 1);
    }
  }
}

walk(tree.rootId, 0);

// Surface unreachable nodes (sanity check)
const unreachable = Object.keys(nodes).filter(k => !visited.has(k));
if (unreachable.length > 0) {
  out.push('---');
  out.push('## ⚠ Unreachable nodes');
  out.push('');
  for (const id of unreachable) {
    out.push('- `' + id + '`');
  }
}

const text = out.join('\n') + '\n';
if (OUT) {
  fs.writeFileSync(OUT, text);
  console.error('Wrote ' + text.length + ' chars to ' + OUT);
} else {
  process.stdout.write(text);
}
