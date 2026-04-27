// scripts/fix-empire-justice-phone.cjs
//
// One-shot: Empire Justice Center Rochester is consistently miscited as
// (585) 295-5800, (585) 295-5702, or (585) 295-5775 across 78 entries.
// Correct main Rochester line is (585) 454-4060, confirmed across multiple
// fact-check passes against https://empirejustice.org and recurring
// confirmations from agents B2-B6, C1-C6, D1-D6 (2026-04-26/27).
//
// Idempotent — re-running is a no-op.

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');
const BANKRUPTCY_FILES = new Set([
  'bankruptcy-automatic-stay-ny.js',
  'bankruptcy-chapter13-ny.js',
  'bankruptcy-chapter7-ny.js',
  'bankruptcy-discharge-ny.js',
  'bankruptcy-exemptions-ny.js',
  'bankruptcy-means-test-ny.js',
  'bankruptcy-reaffirmation-ny.js',
]);

const WRONG_PHONES = ['(585) 295-5800', '(585) 295-5702', '(585) 295-5775'];
const RIGHT_PHONE = '(585) 454-4060';

function main() {
  const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith('.js'));
  let touched = 0;
  for (const f of files) {
    if (BANKRUPTCY_FILES.has(f)) continue;
    const filePath = path.join(ENTRIES_DIR, f);
    let src = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const wrong of WRONG_PHONES) {
      if (src.includes(wrong)) {
        src = src.split(wrong).join(RIGHT_PHONE);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(filePath, src);
      console.log('Fixed: ' + f);
      touched++;
    }
  }
  console.log(`\n${touched} files updated.`);
}

main();
