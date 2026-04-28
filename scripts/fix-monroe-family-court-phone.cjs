// scripts/fix-monroe-family-court-phone.cjs
//
// One-shot: Monroe County Family Court main line miscited as
// (585) 371-3553, (585) 428-2480, (585) 428-5429 in 5 entries.
// Correct is (585) 371-3544 verified across multiple agent fact-check
// passes against nycourts.gov 7th JD (2026-04-28).
//
// Context-aware: only replaces when "Family Court" appears within 120
// chars of the phone, to avoid breaking legitimate uses elsewhere.
// Idempotent.

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

const RIGHT = '(585) 371-3544';
const WRONGS = ['(585) 371-3553', '(585) 428-2480', '(585) 428-5429'];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function main() {
  const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith('.js'));
  let touched = 0;
  for (const f of files) {
    if (BANKRUPTCY_FILES.has(f)) continue;
    const filePath = path.join(ENTRIES_DIR, f);
    let src = fs.readFileSync(filePath, 'utf8');
    const original = src;
    for (const wrong of WRONGS) {
      const re = new RegExp('(.{0,120}' + escapeRegex(wrong) + '.{0,120})', 'g');
      src = src.replace(re, (match) => {
        if (/Family Court/i.test(match)) {
          return match.split(wrong).join(RIGHT);
        }
        return match;
      });
    }
    if (src !== original) {
      fs.writeFileSync(filePath, src);
      console.log('Fixed: ' + f);
      touched++;
    }
  }
  console.log(`\n${touched} files updated.`);
}

main();
