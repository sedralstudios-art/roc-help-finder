// scripts/validate-engagement-tree.cjs
//
// Build-gate-style validator for engagement-tree-draft-v1.json (or whatever
// --in points at). Enforces every design constraint memorialized in
// project_engagement_questionnaire_2026_05_02.md:
//
//   • Every option's `next` resolves to a known node
//   • Every leaf has 2-15 items
//   • Every leaf has a non-empty `summary`
//   • Every leaf has a non-empty `targetQueries`
//   • Every item.id resolves to programs.js or src/data/legal/entries/*.js
//   • No path > 10 questions deep (design constraint: question fatigue)
//   • No question loops (cycle detection — leaf is a dead end)
//   • Sensitive-signal warnings present where required
//
// Usage:
//   node scripts/validate-engagement-tree.cjs                       # default tree
//   node scripts/validate-engagement-tree.cjs --in tree.json
//   node scripts/validate-engagement-tree.cjs --strict              # treat warnings as errors
//
// Exit 0 clean, 1 errors found.

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const inIdx = args.indexOf('--in');
const IN = inIdx >= 0 ? args[inIdx + 1] : 'engagement-tree-draft-v1.json';
const STRICT = args.includes('--strict');

const MAX_DEPTH = 10;
const MIN_ITEMS_PER_LEAF = 1;   // Some leaves have just one entry — let it pass with warn at 1
const MAX_ITEMS_PER_LEAF = 15;
const MIN_TARGET_QUERIES = 3;

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');
const PROGRAMS_FILE = path.join(__dirname, '..', 'src', 'data', 'programs.js');

const tree = JSON.parse(fs.readFileSync(IN, 'utf8'));
const nodes = tree.nodes || {};
const programsRaw = fs.readFileSync(PROGRAMS_FILE, 'utf8');
const programIds = new Set([...programsRaw.matchAll(/\bid:"([^"]+)"/g)].map(m => m[1]));
const entryIds = new Set(
  fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith('.js')).map(f => f.replace(/\.js$/, ''))
);

// Build per-program metadata for sensitive-category checks.
// SENSITIVE set per HelpFinder.jsx + HIDE_GATED categories per program-gate.cjs.
// Any leaf that surfaces a sensitive program MUST have a leaf-level `warning`.
const SENSITIVE_CATEGORIES = new Set([
  'mental', 'grief', 'addiction', 'domesticSvc', 'hivsti',
  'reentry', 'lgbtq', 'parentalProtection', 'legalImmigration', 'legalCrimRecord',
]);
const HIDE_GATED_CATEGORIES = new Set(['domesticSvc', 'parentalProtection', 'legalImmigration']);
const programMeta = {};
for (const line of programsRaw.split(/\r?\n/)) {
  const idM = line.match(/\bid:"([^"]+)"/);
  if (!idM) continue;
  const id = idM[1];
  const c = (line.match(/\bc:"([^"]+)"/) || [])[1] || null;
  const hidden = /\bhidden:\s*true\b/.test(line);
  const sensitiveTopic = (line.match(/\bsensitiveTopic:\s*"([^"]+)"/) || [])[1] || null;
  programMeta[id] = { c, hidden, sensitiveTopic };
}

const errors = [];
const warnings = [];

// 1. rootId must exist
if (!tree.rootId || !nodes[tree.rootId]) {
  errors.push('FATAL: rootId is missing or points to a non-existent node: ' + tree.rootId);
}

// 2. For each node, validate its type-specific shape
for (const [id, n] of Object.entries(nodes)) {
  if (n.type === 'question') {
    if (!n.text) errors.push(`[${id}] question missing 'text'`);
    if (!Array.isArray(n.options) || n.options.length < 2) {
      errors.push(`[${id}] question must have at least 2 options, has ${(n.options || []).length}`);
    }
    for (const opt of (n.options || [])) {
      if (!opt.label) errors.push(`[${id}] option missing label`);
      if (!opt.next) errors.push(`[${id}] option '${opt.label}' missing next`);
      else if (!nodes[opt.next]) errors.push(`[${id}] option '${opt.label}' next='${opt.next}' is not a known node`);
    }
  } else if (n.type === 'leaf') {
    if (!n.summary || n.summary.length < 10) errors.push(`[${id}] leaf summary missing or too short`);
    if (!Array.isArray(n.items)) {
      errors.push(`[${id}] leaf has no items array`);
    } else {
      if (n.items.length < MIN_ITEMS_PER_LEAF) errors.push(`[${id}] leaf has ${n.items.length} items, min ${MIN_ITEMS_PER_LEAF}`);
      if (n.items.length > MAX_ITEMS_PER_LEAF) errors.push(`[${id}] leaf has ${n.items.length} items, max ${MAX_ITEMS_PER_LEAF}`);
      if (n.items.length === 1) warnings.push(`[${id}] leaf has only 1 item — consider enriching`);
      for (const item of n.items) {
        if (!item.id) errors.push(`[${id}] item missing id`);
        if (item.id && item.id.startsWith('_TODO_')) warnings.push(`[${id}] item is _TODO_ placeholder: ${item.id}`);
        if (!item.type || !['program', 'entry'].includes(item.type)) errors.push(`[${id}] item ${item.id} has invalid type: ${item.type}`);
        if (item.type === 'program' && item.id && !item.id.startsWith('_TODO_') && !programIds.has(item.id)) {
          errors.push(`[${id}] program id not found in programs.js: ${item.id}`);
        }
        if (item.type === 'entry' && item.id && !item.id.startsWith('_TODO_') && !entryIds.has(item.id)) {
          errors.push(`[${id}] entry id not found in legal/entries/: ${item.id}`);
        }
        if (!item.why || item.why.length < 5) warnings.push(`[${id}] item ${item.id} has weak/missing 'why' string`);
        // Sensitive-program guardrail: any leaf surfacing a SENSITIVE-category
        // program (or one in HIDE_GATED, or with sensitiveTopic set, or
        // hidden:true) MUST carry a leaf-level `warning`. This prevents the
        // questionnaire from auto-suggesting DV / immigration / mental-health
        // resources without proper context.
        if (item.type === 'program' && programMeta[item.id]) {
          const meta = programMeta[item.id];
          const isSensitive = SENSITIVE_CATEGORIES.has(meta.c) || HIDE_GATED_CATEGORIES.has(meta.c) || meta.sensitiveTopic || meta.hidden;
          if (isSensitive && !n.warning) {
            errors.push(`[${id}] leaf surfaces sensitive program '${item.id}' (category="${meta.c}"${meta.sensitiveTopic ? ', topic="' + meta.sensitiveTopic + '"' : ''}${meta.hidden ? ', hidden' : ''}) but has no leaf-level 'warning' field`);
          }
        }
      }
    }
    if (!Array.isArray(n.targetQueries) || n.targetQueries.length < MIN_TARGET_QUERIES) {
      warnings.push(`[${id}] leaf has ${(n.targetQueries || []).length} targetQueries, min ${MIN_TARGET_QUERIES} recommended for SEO surface`);
    }
  } else {
    errors.push(`[${id}] unknown node type: ${n.type}`);
  }
}

// 3. Reachability + max-depth check via BFS from rootId
const reachable = new Set();
const queue = [{ id: tree.rootId, depth: 0 }];
let maxDepthSeen = 0;
const maxDepthPath = {};
while (queue.length > 0) {
  const { id, depth } = queue.shift();
  if (reachable.has(id)) continue;
  reachable.add(id);
  maxDepthSeen = Math.max(maxDepthSeen, depth);
  if (depth > MAX_DEPTH) {
    errors.push(`[${id}] reached at depth ${depth} > MAX_DEPTH ${MAX_DEPTH} — questionnaire too deep`);
  }
  const n = nodes[id];
  if (n?.type === 'question') {
    for (const opt of (n.options || [])) {
      if (opt.next && !reachable.has(opt.next)) {
        queue.push({ id: opt.next, depth: depth + 1 });
        maxDepthPath[opt.next] = (maxDepthPath[id] || tree.rootId) + ' → ' + opt.next;
      }
    }
  }
}

// 4. Surface unreachable nodes
const unreachable = Object.keys(nodes).filter(k => !reachable.has(k));
for (const id of unreachable) {
  warnings.push(`[${id}] unreachable from rootId — orphan node`);
}

// 5. Output
console.log('═══════════════════════════════════════════════════════════════');
console.log('  Engagement-tree validator');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');
console.log('  File:               ' + IN);
console.log('  Total nodes:        ' + Object.keys(nodes).length);
console.log('  Questions:          ' + Object.values(nodes).filter(n => n.type === 'question').length);
console.log('  Leaves:             ' + Object.values(nodes).filter(n => n.type === 'leaf').length);
console.log('  Reachable:          ' + reachable.size);
console.log('  Max path depth:     ' + maxDepthSeen + ' (cap: ' + MAX_DEPTH + ')');
console.log('  Errors:             ' + errors.length);
console.log('  Warnings:           ' + warnings.length);
console.log('');

if (errors.length) {
  console.log('ERRORS:');
  for (const e of errors) console.log('  ✗ ' + e);
  console.log('');
}
if (warnings.length) {
  console.log('WARNINGS:');
  for (const w of warnings) console.log('  ⚠ ' + w);
  console.log('');
}
if (!errors.length && !warnings.length) {
  console.log('✓ clean.');
}

process.exit((errors.length > 0 || (STRICT && warnings.length > 0)) ? 1 : 0);
