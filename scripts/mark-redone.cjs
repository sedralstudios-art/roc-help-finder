// Mark a list of program IDs as redo-verified ("redo:YYYY-MM-DD") so
// list-stamped-programs.cjs can skip them in future redo batches.
//
// Usage: node scripts/mark-redone.cjs id1 id2 id3 ...
const fs = require('fs');
const path = require('path');

const REDO_DATE = '2026-04-30';
const FILE = path.join(__dirname, '..', 'src', 'data', 'programs.js');

const ids = process.argv.slice(2);
if (ids.length === 0) {
  console.error('Usage: node scripts/mark-redone.cjs id1 id2 ...');
  process.exit(1);
}

let src = fs.readFileSync(FILE, 'utf8');
let modified = 0;
let skipped = 0;

for (const id of ids) {
  const idTagRe = new RegExp('(\\bid\\s*:\\s*"' + id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '")', 'g');
  const m = idTagRe.exec(src);
  if (!m) { console.error('  ✗ not found: ' + id); continue; }
  const idEnd = m.index + m[0].length;

  // Find the closing brace by counting braces from the opening one before id
  let openIdx = -1;
  for (let j = m.index; j >= 0; j--) {
    if (src[j] === '{') { openIdx = j; break; }
  }
  if (openIdx === -1) { console.error('  ✗ no open brace: ' + id); continue; }

  let depth = 0, inStr = false, sc = null, esc = false, closeIdx = -1;
  for (let j = openIdx; j < src.length; j++) {
    const c = src[j];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === sc) { inStr = false; sc = null; }
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; sc = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { closeIdx = j; break; } }
  }
  if (closeIdx === -1) { console.error('  ✗ no close brace: ' + id); continue; }

  const body = src.slice(openIdx, closeIdx + 1);
  if (body.includes('redo:"' + REDO_DATE + '"')) {
    console.log('  – already redone: ' + id);
    skipped++;
    continue;
  }

  // Insert `redo:"YYYY-MM-DD"` just before the closing `}`. We assume the
  // line ends with ` }` and append before that.
  const insertion = ', redo:"' + REDO_DATE + '"';
  const newBody = body.slice(0, body.length - 1).replace(/\s*$/, '') + insertion + ' }';
  src = src.slice(0, openIdx) + newBody + src.slice(closeIdx + 1);
  console.log('  ✓ marked redone: ' + id);
  modified++;
}

fs.writeFileSync(FILE, src);
console.log('\nUpdated ' + modified + ' / ' + ids.length + ' (' + skipped + ' already marked)');
