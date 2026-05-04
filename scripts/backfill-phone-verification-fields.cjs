// scripts/backfill-phone-verification-fields.cjs
//
// Splits phone-verification metadata from body-verification metadata across
// programs.js. Reads HEAD (pre-strip) for original lastVerified/fc per
// program; for any program where I overwrote those with 2026-05-04 during
// the manual phone re-verification stretch, restores the original body
// dates and adds phLastVerified/phSource fields specific to phone work.
//
// Idempotent: skips programs whose lastVerified is not 2026-05-04 (already
// correct) or whose ph is empty (nothing was re-added for them).

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PROGRAMS = path.join(ROOT, 'src', 'data', 'programs.js');

function parseRows(src) {
  const rows = [];
  const re = /\{\s*id:"([^"]*)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const startIdx = m.index;
    let depth = 0, i = startIdx;
    for (; i < src.length; i++) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') { depth--; if (depth === 0) { i++; break; } }
    }
    rows.push({ id: m[1], blob: src.substring(startIdx, i), startIdx, endIdx: i });
  }
  return rows;
}

function getField(blob, key) {
  const m = blob.match(new RegExp('\\b' + key + ':\\s*"([^"]*)"'));
  return m ? m[1] : null;
}

const preStrip = execSync('git show HEAD:src/data/programs.js', { cwd: ROOT, encoding: 'utf8' });
const preStripRows = parseRows(preStrip);
const preStripById = new Map(preStripRows.map(r => [r.id, r]));

let src = fs.readFileSync(PROGRAMS, 'utf8');
const currentRows = parseRows(src);

// Walk current rows in REVERSE so byte indices stay valid as we edit
let backfilled = 0;
for (let i = currentRows.length - 1; i >= 0; i--) {
  const r = currentRows[i];
  const ph = getField(r.blob, 'ph');
  const lv = getField(r.blob, 'lastVerified');
  const fc = getField(r.blob, 'fc');
  if (!ph) continue; // empty ph — wasn't manually re-added in this stretch
  if (lv !== '2026-05-04') continue; // not one of mine OR already split
  if (r.blob.includes('phLastVerified')) continue; // already backfilled

  // Find original lastVerified/fc from HEAD
  const pre = preStripById.get(r.id);
  const preLv = pre ? getField(pre.blob, 'lastVerified') : null;
  const preFc = pre ? getField(pre.blob, 'fc') : null;

  // Build replacement: restore original lastVerified/fc, add phLastVerified/phSource
  let newBlob = r.blob;

  // Replace lastVerified value
  if (preLv) {
    newBlob = newBlob.replace(/\blastVerified:"2026-05-04"/, `lastVerified:"${preLv}"`);
  } else {
    // Original had no lastVerified — drop the field
    newBlob = newBlob.replace(/,\s*lastVerified:"2026-05-04"/, '');
  }

  // Replace fc value
  if (preFc) {
    // fc:"2026-05-04" → original
    newBlob = newBlob.replace(/\bfc:"2026-05-04"/, `fc:"${preFc}"`);
  }

  // Add phLastVerified just before fc (or at end if no fc)
  if (newBlob.includes('phLastVerified')) {
    // already added — skip
  } else {
    if (newBlob.match(/\bfc:"/)) {
      newBlob = newBlob.replace(/(,\s*)(fc:"[^"]*")/, `$1phLastVerified:"2026-05-04", $2`);
    } else {
      // Insert before closing brace
      newBlob = newBlob.replace(/\s*\}\s*$/, `, phLastVerified:"2026-05-04" }`);
    }
  }

  if (newBlob !== r.blob) {
    src = src.substring(0, r.startIdx) + newBlob + src.substring(r.endIdx);
    backfilled++;
  }
}

fs.writeFileSync(PROGRAMS, src);
console.log('Backfilled ' + backfilled + ' programs (split phone verification from body verification)');
