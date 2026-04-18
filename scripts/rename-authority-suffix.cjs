// scripts/rename-authority-suffix.cjs
// Renames common-law entries to "{topic}-ny-cl" and agency-program entries
// to "{topic}-ny-program". Updates id field, filename, and every relatedIds
// reference in the codebase so cross-links stay intact.

const path = require('path');
const fs = require('fs');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');
const GLOSSARY_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'glossary');

const RENAMES = {
  // common-law
  "emotional-distress-claims-ny": "emotional-distress-claims-ny-cl",
  "tree-damage-neighbor-liability-ny": "tree-damage-neighbor-liability-ny-cl",
  "neighbors-security-light-ny": "neighbors-security-light-ny-cl",
  "neighbor-disputes-ny": "neighbor-disputes-ny-cl",
  "trampoline-liability-ny": "trampoline-liability-ny-cl",
  "ice-dam-roof-damage-ny": "ice-dam-roof-damage-ny-cl",
  "non-compete-agreements-ny": "non-compete-agreements-ny-cl",
  "landlord-showing-apartment-notice-ny": "landlord-showing-apartment-notice-ny-cl",
  "landlord-enter-emergency-ny": "landlord-enter-emergency-ny-cl",
  "social-media-evidence-ny": "social-media-evidence-ny-cl",
  // agency-program
  "apply-for-benefits-online-ny": "apply-for-benefits-online-ny-program",
  "benefits-verification-letter-ny": "benefits-verification-letter-ny-program",
  "free-internet-computer-access-ny": "free-internet-computer-access-ny-program",
  "free-legal-help-monroe-ny": "free-legal-help-monroe-ny-program",
  "getting-id-documents-ny": "getting-id-documents-ny-program",
  "court-system-explained-ny": "court-system-explained-ny-program",
  "lost-stolen-wallet-what-to-do-ny": "lost-stolen-wallet-what-to-do-ny-program",
  "traffic-court-what-to-expect-ny": "traffic-court-what-to-expect-ny-program",
  "problem-solving-courts-ny": "problem-solving-courts-ny-program",
  "hearing-aid-help-ny": "hearing-aid-help-ny-program",
  "dental-care-low-income-ny": "dental-care-low-income-ny-program",
  "free-eyeglasses-vision-ny": "free-eyeglasses-vision-ny-program",
  "right-to-counsel-eviction-ny": "right-to-counsel-eviction-ny-program",
  "monroe-county-dss-overview-ny-mon": "monroe-county-dss-overview-ny-mon-program",
};

function rewriteFileContent(filepath) {
  let src = fs.readFileSync(filepath, 'utf8');
  let changed = false;
  for (const [oldId, newId] of Object.entries(RENAMES)) {
    // Replace any exact-string "oldId" occurrences. Quotes ensure we only hit
    // id-valued occurrences (in id: "..." and relatedIds: [...]) and never
    // partial matches inside words.
    const re = new RegExp('"' + oldId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"', 'g');
    const after = src.replace(re, '"' + newId + '"');
    if (after !== src) {
      src = after;
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(filepath, src);
  return changed;
}

function main() {
  // Step 1: update content in every entry file and every glossary file
  let contentChanges = 0;
  for (const dir of [ENTRIES_DIR, GLOSSARY_DIR]) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.js')) continue;
      if (rewriteFileContent(path.join(dir, f))) contentChanges++;
    }
  }
  console.log(`content-updated files: ${contentChanges}`);

  // Step 2: rename the entry files themselves
  let renamed = 0;
  for (const [oldId, newId] of Object.entries(RENAMES)) {
    const oldPath = path.join(ENTRIES_DIR, oldId + '.js');
    const newPath = path.join(ENTRIES_DIR, newId + '.js');
    if (!fs.existsSync(oldPath)) {
      console.error(`MISSING: ${oldPath}`);
      continue;
    }
    if (fs.existsSync(newPath)) {
      console.error(`CONFLICT: ${newPath} already exists`);
      process.exit(1);
    }
    fs.renameSync(oldPath, newPath);
    renamed++;
  }
  console.log(`renamed files: ${renamed} of ${Object.keys(RENAMES).length}`);
}

main();
