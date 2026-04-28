// scripts/fix-monroe-surrogate-court-phone.cjs
//
// One-shot: Monroe County Surrogate's Court main line is consistently
// miscited as (585) 753-1600 (Monroe County Clerk's office, valid for
// other purposes) and (585) 753-5363 (which doesn't match any verified
// listing). Correct is (585) 371-3310 — verified against nycourts.gov
// 7th Judicial District (2026-04-28).
//
// CONTEXT-AWARE for 753-1600 (don't blanket-replace; that's also the
// valid County Clerk line for non-Surrogate purposes). Only replaces
// when the phone is within ~80 chars of "Surrogate". Blanket-replaces
// 753-5363 since that variant is uniquely a Surrogate misattribution.
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

const RIGHT = '(585) 371-3310';
// Match `(585) 753-1600` with up to 80 chars of "Surrogate" context on either side.
const CONTEXT_RE = /(.{0,80}\(585\) 753-1600.{0,80})/g;

function main() {
  const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith('.js'));
  let touched = 0;
  for (const f of files) {
    if (BANKRUPTCY_FILES.has(f)) continue;
    const filePath = path.join(ENTRIES_DIR, f);
    let src = fs.readFileSync(filePath, 'utf8');
    const original = src;

    // Blanket replace 753-5363 (Surrogate-misattribution-only).
    src = src.split('(585) 753-5363').join(RIGHT);

    // Context-aware replace for 753-1600.
    src = src.replace(CONTEXT_RE, (match) => {
      if (/Surrogate/i.test(match)) {
        return match.split('(585) 753-1600').join(RIGHT);
      }
      return match;
    });

    if (src !== original) {
      fs.writeFileSync(filePath, src);
      console.log('Fixed: ' + f);
      touched++;
    }
  }
  console.log(`\n${touched} files updated.`);
}

main();
