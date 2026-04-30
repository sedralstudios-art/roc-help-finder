// List programs already stamped with fc:"2026-04-30" so we can re-verify them
// (the eyeballed pre-grounding-rule stamps need a true web-verified pass).
//
// Mirrors list-unstamped-programs.cjs but inverts the fc filter. Excludes the
// hidden / safetySensitive set the same way so we don't pull DV/immigration
// surfaces by accident.
const fs = require('fs');
const path = require('path');

const SRC = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'programs.js'), 'utf8');
const SENSITIVE = new Set(['domesticSvc', 'parentalProtection', 'legalImmigration']);

function findMatchingBrace(text, openIdx) {
  let depth = 0, inStr = false, sc = null, esc = false;
  for (let j = openIdx; j < text.length; j++) {
    const c = text[j];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === sc) { inStr = false; sc = null; }
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; sc = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return j; }
  }
  return -1;
}

const programs = [];
const idRe = /\bid\s*:\s*"([^"]+)"/g;
let m;
while ((m = idRe.exec(SRC)) !== null) {
  const idStart = m.index;
  let openBrace = -1;
  for (let j = idStart; j >= 0; j--) {
    if (SRC[j] === '{') { openBrace = j; break; }
  }
  if (openBrace === -1) continue;
  const closeBrace = findMatchingBrace(SRC, openBrace);
  if (closeBrace === -1) continue;
  const body = SRC.slice(openBrace, closeBrace + 1);
  const id = m[1];
  if (programs.find(p => p.id === id)) continue;
  const fc = /\bfc\s*:\s*"\d{4}-\d{2}-\d{2}"/.test(body);
  const cat = (body.match(/\bc\s*:\s*"([^"]+)"/) || [])[1] || '?';
  const hidden = /\bhidden\s*:\s*true/.test(body);
  const safety = /\bsafetySensitive\s*:\s*true/.test(body);
  // Track redo-stamps we've already burned through this pass.
  const redoneToday = /\bredo\s*:\s*"2026-04-30"/.test(body);
  programs.push({ id, cat, fc, hidden, safety, redoneToday });
  idRe.lastIndex = closeBrace + 1;
}

const stamped = programs.filter(p => p.fc);
const eligible = stamped.filter(p => !SENSITIVE.has(p.cat) && !p.hidden && !p.safety);
const todo = eligible.filter(p => !p.redoneToday);

console.log('Total programs:    ' + programs.length);
console.log('Stamped (fc):      ' + stamped.length);
console.log('  Eligible to redo: ' + eligible.length);
console.log('  Already redone:   ' + (eligible.length - todo.length));
console.log('  Remaining redo:   ' + todo.length);
console.log('');
console.log('Next 8 to redo:');
todo.slice(0, 8).forEach(p => {
  console.log('  ' + p.cat.padEnd(15) + '  ' + p.id);
});
