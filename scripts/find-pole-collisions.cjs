// Find places in programs.js where a hardcoded value matches a canonical
// pole. Each match is a candidate to be replaced with a reference like
// `MC.dhs.main.value` instead of the literal string.
//
// Run: node scripts/find-pole-collisions.cjs
//
// Output: per pole, which program ids have the literal value. The redo
// workflow uses this to know which entries to convert.

const fs = require('fs');
const path = require('path');

// Inline mirror of canonical/phones.js because Node CJS can't directly
// `require` the ESM canonical file. When the canonical set grows, it's
// worth porting the gate to ESM or having a generated CJS shadow.
const CANONICAL_PHONES = {
  'MC.dhs.main':                        '585-753-6998',
  'MC.dhs.snapAppointmentLine':         '585-753-6960',
  'MC.dhs.heapDirect':                  '585-753-6477',
  'MC.dhs.childCare':                   '585-753-6316',
  'MC.dhs.fosterCareIntake':            '585-753-5765',
  'MC.dhs.seniorHEAPViaLifespan':       '585-244-8400',
  'MC.health.wic':                      '585-753-4942',
  'MC.ofa.main':                        '585-753-6280',
  'HOTLINES.call211':                   '211',
  'HOTLINES.call988':                   '988',
  'HOTLINES.nyStateOfHealth':           '855-355-5777',
  'HOTLINES.childHealthPlus':           '800-698-4543',
  'HOTLINES.epic':                      '800-332-3742',
  'HOSPITALS.strong.main':              '585-275-3535',
  'HOSPITALS.strong.psychEmergency':    '585-275-4501',
  'HOSPITALS.strong.psychCrisisLine':   '585-275-8686',
  'HOSPITALS.strong.behavioralHealthClinic': '585-275-3161',
  'LEGAL_AID.legalAidRoc':              '585-232-4090',
  'LEGAL_AID.empireJustice':            '585-454-4060',
  'LEGAL_AID.justCause':                '585-232-3051',
  'LEGAL_AID.lawNY':                    '585-325-2520',
  'LEGAL_AID.cashRoc':                  '585-900-1004',
  'UTILITIES.rgeMain':                  '1-800-743-1701',
  'UTILITIES.rgeBillHelp':              '877-266-3492',
  'UTILITIES.empowerPlus':              '866-697-3732',
};

const SRC = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'programs.js'), 'utf8');

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
  let openBrace = -1;
  for (let j = m.index; j >= 0; j--) {
    if (SRC[j] === '{') { openBrace = j; break; }
  }
  if (openBrace === -1) continue;
  const closeBrace = findMatchingBrace(SRC, openBrace);
  if (closeBrace === -1) continue;
  const body = SRC.slice(openBrace, closeBrace + 1);
  const id = m[1];
  if (programs.find(p => p.id === id)) continue;
  programs.push({ id, body });
  idRe.lastIndex = closeBrace + 1;
}

const collisions = {};
for (const [ref, value] of Object.entries(CANONICAL_PHONES)) {
  collisions[ref] = [];
  for (const p of programs) {
    if (p.body.includes(value)) {
      collisions[ref].push(p.id);
    }
  }
}

console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('  Pole-collision report: hardcoded values matching canonical');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

let totalCollisions = 0;
for (const [ref, value] of Object.entries(CANONICAL_PHONES)) {
  const ids = collisions[ref];
  if (ids.length === 0) continue;
  totalCollisions += ids.length;
  console.log(ref + '  →  ' + value);
  console.log('  ' + ids.length + ' entr' + (ids.length === 1 ? 'y' : 'ies') + ': ' + ids.join(', '));
  console.log('');
}

console.log('───────────────────────────────────────────────────────────────');
console.log('Total hardcoded references that could become poles: ' + totalCollisions);
console.log('Total entries scanned: ' + programs.length);
console.log('');
