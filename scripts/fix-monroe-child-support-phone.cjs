// scripts/fix-monroe-child-support-phone.cjs
//
// One-shot: Monroe County Child Support Enforcement Unit miscited as
// (585) 753-6988, (585) 753-6071, (585) 753-6048, (585) 753-6690, or
// (585) 753-6200. Correct is **(585) 753-1441** with statewide helpline
// **(888) 208-4485**. Verified across multiple agent fact-check passes
// and again 2026-04-29.
//
// Context-aware: only replaces when "Child Support" or "support enforcement"
// appears within ~120 chars of the phone, to avoid breaking unrelated uses.
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

const RIGHT = '(585) 753-1441';
const WRONGS = ['(585) 753-6988', '(585) 753-6071', '(585) 753-6048', '(585) 753-6690', '(585) 753-6200'];

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
        if (/Child Support|support enforcement|SCU\b/i.test(match)) {
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
