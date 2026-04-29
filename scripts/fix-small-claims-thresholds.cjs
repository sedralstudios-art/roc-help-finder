// scripts/fix-small-claims-thresholds.cjs
//
// One-shot: NY small claims thresholds widely miscited as
// "$5,000 in town or village court and up to $10,000 in city court"
// (or similar variants) in 10+ entries. Actual NY thresholds:
//   - Rochester City Court (and other city courts): up to $5,000
//   - Town or village courts: up to $3,000
//   - NYC Civil Court only: up to $10,000
// Verified across multiple agent fact-check passes.
//
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

// Common phrasings of the wrong threshold and their corrections.
const REPLACEMENTS = [
  // "$5,000 in town or village court and up to $10,000 in city court" -> swap
  {
    from: '$5,000 in town or village court and up to $10,000 in city court',
    to: '$5,000 in Rochester City Court and up to $3,000 in town or village court (NYC only is $10,000)',
  },
  {
    from: 'up to $5,000 in town or village court and $10,000 in city court',
    to: 'up to $5,000 in Rochester City Court and $3,000 in town or village court (NYC only is $10,000)',
  },
  {
    from: 'under $5,000 in town or village court and $10,000 in city court',
    to: 'under $5,000 in Rochester City Court and $3,000 in town or village court (NYC only is $10,000)',
  },
];

function main() {
  const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith('.js'));
  let touched = 0;
  for (const f of files) {
    if (BANKRUPTCY_FILES.has(f)) continue;
    const filePath = path.join(ENTRIES_DIR, f);
    let src = fs.readFileSync(filePath, 'utf8');
    const original = src;
    for (const r of REPLACEMENTS) {
      src = src.split(r.from).join(r.to);
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
