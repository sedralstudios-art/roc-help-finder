const fs = require('fs');
const path = require('path');

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
    rows.push({
      id: m[1],
      n: get('n'),
      ph: get('ph'),
      phRefHotlines: !!(phRaw && phRaw[0].includes('HOTLINES.')),
      hasPhLastVerified: has('phLastVerified'),
      url: get('url'),
      ad: get('ad'),
    });
  }
  return rows;
}

const currentSrc = fs.readFileSync(PROGRAMS, 'utf8');
const currentRows = parseProgramsSource(currentSrc);

const left = currentRows.filter(r => !r.ph && !r.phRefHotlines && !r.hasPhLastVerified && r.url);
console.log('url-only unverified:', left.length);
const start = parseInt(process.argv[2] || '0', 10);
const end = start + parseInt(process.argv[3] || '20', 10);
left.slice(start, end).forEach(r => {
  console.log(r.id + '  ::  ' + (r.url || ''));
});
