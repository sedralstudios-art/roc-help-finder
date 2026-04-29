// scripts/fix-lifespan-eldersource-phone.cjs
//
// One-shot: Lifespan/Eldersource Rochester phone miscited as (585) 325-2800
// in 9 entries. Correct is (585) 244-8400 verified against lifespan-roch.org
// (2026-04-28). Context-aware: only replaces when "Eldersource" or "Lifespan"
// is within 80 chars of the phone, to avoid false positives.
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

const WRONG = '(585) 325-2800';
const RIGHT = '(585) 244-8400';
const CONTEXT_RE = /(.{0,80}\(585\) 325-2800.{0,80})/g;

function main() {
  const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith('.js'));
  let touched = 0;
  for (const f of files) {
    if (BANKRUPTCY_FILES.has(f)) continue;
    const filePath = path.join(ENTRIES_DIR, f);
    let src = fs.readFileSync(filePath, 'utf8');
    if (!src.includes(WRONG)) continue;
    const next = src.replace(CONTEXT_RE, (match) => {
      if (/Eldersource|Lifespan/i.test(match)) {
        return match.split(WRONG).join(RIGHT);
      }
      return match;
    });
    if (next !== src) {
      fs.writeFileSync(filePath, next);
      console.log('Fixed: ' + f);
      touched++;
    }
  }
  console.log(`\n${touched} files updated.`);
}

main();
