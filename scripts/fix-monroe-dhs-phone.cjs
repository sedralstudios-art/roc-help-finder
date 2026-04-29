// scripts/fix-monroe-dhs-phone.cjs
//
// One-shot: Monroe County Department of Human Services (DHS / DSS) miscited as
// (585) 753-6960 in 42 entries. Correct main number is (585) 753-6998 per
// monroecounty.gov/hs (verified 2026-04-29). Child Care office is (585) 753-6316
// per memory note from prior fact-check sweep.
//
// Context-aware: when the surrounding text mentions "Child Care" or "Childcare"
// near the phone, replace with 753-6316. Otherwise (DHS / DSS / Department of
// Human Services / Department of Social Services context), replace with
// 753-6998. If neither context is present within 200 chars, leave alone — the
// number may be correct for a different program.
//
// Idempotent.

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');
const BANKRUPTCY_FILES = new Set([
  'bankruptcy-chapter-7-individuals-ny.js',
  'bankruptcy-chapter-13-wage-earner-ny.js',
  'bankruptcy-automatic-stay-ny.js',
  'bankruptcy-discharge-ny.js',
  'bankruptcy-means-test-ny.js',
  'bankruptcy-exemptions-ny.js',
  'bankruptcy-creditor-meeting-341-ny.js',
]);

const WRONG = '(585) 753-6960';
const RIGHT_DHS = '(585) 753-6998';
const RIGHT_CHILD_CARE = '(585) 753-6316';

const CONTEXT_RE = /([\s\S]{0,200}\(585\) 753-6960[\s\S]{0,200})/g;

function main() {
  const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith('.js'));
  let touched = 0;
  let dhsHits = 0;
  let ccHits = 0;
  let skipped = 0;
  for (const f of files) {
    if (BANKRUPTCY_FILES.has(f)) continue;
    const filePath = path.join(ENTRIES_DIR, f);
    let src = fs.readFileSync(filePath, 'utf8');
    if (!src.includes(WRONG)) continue;
    let changed = false;
    const next = src.replace(CONTEXT_RE, (match) => {
      const isChildCare = /Child[\s-]?[Cc]are/i.test(match);
      const isDhs = /\b(DHS|DSS|Human\s+Services|Social\s+Services|Department\s+of)\b/i.test(match);
      if (isChildCare) {
        ccHits++;
        changed = true;
        return match.split(WRONG).join(RIGHT_CHILD_CARE);
      }
      if (isDhs) {
        dhsHits++;
        changed = true;
        return match.split(WRONG).join(RIGHT_DHS);
      }
      skipped++;
      return match;
    });
    if (changed) {
      fs.writeFileSync(filePath, next);
      console.log('Fixed: ' + f);
      touched++;
    }
  }
  console.log(`\n${touched} files updated. DHS hits: ${dhsHits}. Child Care hits: ${ccHits}. Skipped (no context match): ${skipped}.`);
}

main();
