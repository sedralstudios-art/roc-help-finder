// scripts/fix-rochester-city-court-phone.cjs
//
// One-shot: Rochester City Court miscited as (585) 428-6990, 428-6650,
// 428-5990, 428-6552 in multiple entries. Correct numbers:
//   - Civil Division: (585) 371-3412
//   - Criminal Division: (585) 371-3413
// Verified across multiple agent fact-check passes 2026-04-27/28/29.
//
// Context-aware: chooses Criminal vs Civil based on nearby context.
// "arrest", "criminal", "arraign", "DWI", "misdemeanor", "felony" -> Criminal
// Everything else -> Civil
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

const CIVIL = '(585) 371-3412';
const CRIMINAL = '(585) 371-3413';
const WRONGS = ['(585) 428-6990', '(585) 428-6650', '(585) 428-5990', '(585) 428-6552'];

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
      const re = new RegExp('(.{0,150}' + escapeRegex(wrong) + '.{0,150})', 'g');
      src = src.replace(re, (match) => {
        if (!/Rochester City Court|Rochester (Criminal|Civil)/i.test(match)) return match;
        const isCriminal = /\barraign|criminal|arrest|misdemeanor|felony|DWI|defendant\b/i.test(match);
        const right = isCriminal ? CRIMINAL : CIVIL;
        return match.split(wrong).join(right);
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
