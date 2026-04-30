// List unstamped programs with category breakdown.
// Uses brace-counting so it correctly handles multi-line program objects.
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
  programs.push({ id, cat, fc, hidden, safety, openBrace });
  idRe.lastIndex = closeBrace + 1;
}

const unstamped = programs.filter(p => !p.fc);
console.log('Total programs: ' + programs.length);
console.log('Stamped:        ' + programs.filter(p => p.fc).length);
console.log('Unstamped:      ' + unstamped.length);
console.log('Hidden:         ' + programs.filter(p => p.hidden).length);
console.log('');
console.log('Unstamped by category:');
const byCat = {};
unstamped.forEach(p => byCat[p.cat] = (byCat[p.cat] || 0) + 1);
Object.entries(byCat).sort((a, b) => b[1] - a[1]).forEach(([c, n]) => console.log('  ' + n + '  ' + c));
console.log('');
console.log('Next 8 unstamped (excl sensitive cats, hidden, and safetySensitive):');
unstamped.filter(p => !SENSITIVE.has(p.cat) && !p.hidden && !p.safety).slice(0, 8).forEach(p => {
  console.log('  ' + p.cat.padEnd(15) + '  ' + p.id);
});
