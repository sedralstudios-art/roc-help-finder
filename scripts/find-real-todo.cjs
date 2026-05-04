const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PROGRAMS = path.join(ROOT, 'src', 'data', 'programs.js');

function parseProgramsSource(src) {
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
    const blob = src.substring(startIdx, i);
    const get = (k) => {
      const re2 = new RegExp('\\b' + k + ':"((?:[^"\\\\]|\\\\.)*)"');
      const mm = blob.match(re2);
      return mm ? mm[1] : null;
    };
    const has = (k) => new RegExp('\\b' + k + ':').test(blob);
    const phRaw = blob.match(/\bph:[^,}]+/);
    const hasPhVerify =
      has('phLastVerified') ||
      /\blastVerified:"2026-05-0[34]"/.test(blob);
    rows.push({
      id: m[1],
      n: get('n'),
      ph: get('ph'),
      phRefHotlines: !!(phRaw && phRaw[0].includes('HOTLINES.')),
      hasPhLastVerified: hasPhVerify,
      url: get('url'),
    });
  }
  return rows;
}

const preStrip = execSync('git show HEAD:src/data/programs.js', { cwd: ROOT, encoding: 'utf8' });
const preStripRows = parseProgramsSource(preStrip);
const preStripByid = new Map(preStripRows.map(r => [r.id, r]));

const currentSrc = fs.readFileSync(PROGRAMS, 'utf8');
const currentRows = parseProgramsSource(currentSrc);

const todo = [];
const noPhoneSkipped = [];
const verified = [];
for (const r of currentRows) {
  const pre = preStripByid.get(r.id);
  const hadPhone = pre && pre.ph && pre.ph.trim() !== '';
  if (!hadPhone && !r.phRefHotlines) {
    noPhoneSkipped.push(r.id);
    continue;
  }
  if (r.hasPhLastVerified) verified.push(r.id);
  else todo.push(r.id);
}
console.log('verified:', verified.length);
console.log('todo:', todo.length);
console.log('skipped (no pre-strip phone):', noPhoneSkipped.length);
console.log('---TODO LIST---');
console.log(todo.join('\n'));
