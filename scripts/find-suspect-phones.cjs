// scripts/find-suspect-phones.cjs
// Search programs.js + legal entries for any usage of the suspect phone
// numbers caught by the Apr 17 transcript audit. Reports id, current name,
// hidden flag, and where the number appears.

const fs = require('fs');
const path = require('path');

const SUSPECTS = [
  // wrong-number drift (Apr 17 audit)
  { label: 'Dimitri House',                  digits: '5853251796' },
  { label: 'VOA Residential Reentry',        digits: '5856471150' },
  { label: 'RAWNY',                          digits: '5858518886' },
  { label: 'Goodwill Career Help',           digits: '5859221250' },
  { label: 'Passport Office (City Hall)',    digits: '5854286617' },
  { label: 'Rochester City Council',         digits: '5854287538' },
  { label: 'Center for Independent Living',  digits: '5854426470' },
  { label: 'Clarkson Justice Court',         digits: '5856371134' },
  { label: 'Irondequoit Building Dept',      digits: '5853366020' },
  { label: 'Penfield Recreation',            digits: '5853408655' },
  // dead numbers
  { label: 'NA Rochester',                   digits: '5853250186' },
  { label: 'CDPAP',                          digits: '5853251880' },
  { label: 'abandoned-house-next-door-ny callout', digits: '5857232396' },
  { label: 'grand-jury-process-ny callout',  digits: '5854285425' },
  { label: 'moving-truck-street-permit-ny callout', digits: '5853366075' },
  { label: 'charitable-solicitation-registration-ny callout', digits: '5854345577' },
  { label: 'kindergarten-enrollment-age-ny callout', digits: '5852425080' },
  { label: 'military-divorce-benefits-ny callout', digits: '8003597758' },
  { label: 'moped-limited-use-motorcycle-ny callout', digits: '5184742121' },
  // host-org cases
  { label: 'Venture Compassionate (Calvary)',  digits: '5853348130' },
  { label: 'Gathering Table (Brockport FB)',   digits: '5856379770' },
  { label: 'Chili Food Cupboard (Pres)',       digits: '5858899896' },
  { label: 'Graces Table (Episcopal)',         digits: '5858892028' },
];

const PROGRAMS_FILE = path.join(__dirname, '..', 'src', 'data', 'programs.js');
const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

function digitsAround(text, idx, n) {
  return text.substring(Math.max(0, idx - n), Math.min(text.length, idx + n));
}

// Match digits with any non-digit separators between groups
function buildRegex(d) {
  const sep = '[\\s.\\-()]*';
  return new RegExp(
    `(?<![0-9])${d.slice(0,3)}${sep}${d.slice(3,6)}${sep}${d.slice(6,10)}(?![0-9])`,
    'g'
  );
}

function searchProgramsJs(digits) {
  const src = fs.readFileSync(PROGRAMS_FILE, 'utf8');
  const re = buildRegex(digits);
  const hits = [];
  for (const m of src.matchAll(re)) {
    const idx = m.index;
    const ctx = digitsAround(src, idx, 200);
    const idMatch = ctx.match(/id:"([^"]+)"/g) || [];
    const lastId = idMatch.length ? idMatch[idMatch.length - 1].slice(4, -1) : null;
    const nMatch = ctx.match(/n:"([^"]+)"/);
    const isHidden = /\bhidden:\s*true\b/.test(ctx);
    hits.push({ source: 'programs.js', id: lastId, name: nMatch ? nMatch[1] : null, hidden: isHidden });
  }
  return hits;
}

function searchEntries(digits) {
  const re = buildRegex(digits);
  const hits = [];
  for (const f of fs.readdirSync(ENTRIES_DIR)) {
    if (!f.endsWith('.js')) continue;
    const fp = path.join(ENTRIES_DIR, f);
    const src = fs.readFileSync(fp, 'utf8');
    if (!re.test(src)) continue;
    re.lastIndex = 0;
    hits.push({ source: 'entry', file: f, id: f.replace(/\.js$/, '') });
  }
  return hits;
}

function main() {
  console.log('Searching programs.js + ' + fs.readdirSync(ENTRIES_DIR).filter(f=>f.endsWith('.js')).length + ' legal entry files');
  console.log('');
  for (const s of SUSPECTS) {
    const pHits = searchProgramsJs(s.digits);
    const eHits = searchEntries(s.digits);
    const total = pHits.length + eHits.length;
    if (!total) {
      console.log('  ' + s.label.padEnd(50) + ' not in any source file');
      continue;
    }
    console.log('  ' + s.label.padEnd(50) + ' ' + s.digits + ' — found in ' + total + ' place(s):');
    for (const h of pHits) {
      console.log('     programs.js → id="' + h.id + '" name="' + h.name + '" hidden=' + h.hidden);
    }
    for (const h of eHits) {
      console.log('     entry: ' + h.file);
    }
  }
}
main();
