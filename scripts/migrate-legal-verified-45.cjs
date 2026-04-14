// migrate-legal-verified-45.cjs
// Replaces `lastAudited: "DATE"` + `lastVerifiedBy: "Claude + Tony"` pair
// with a single `lastVerified: "DATE"` field in legal entry files.
//
// Skips any file whose lastVerifiedBy mentions "Germain" — those were
// reviewed by Prof. Gregory Germain (Syracuse Law) and he requested his
// own attribution format.
//
// Verifies each replacement succeeded and aborts on mismatch per
// CLAUDE.md's "source file edit pattern" rule.

const fs = require("fs");
const path = require("path");

const ENTRIES_DIR = path.join(__dirname, "..", "src", "data", "legal", "entries");

const files = fs
  .readdirSync(ENTRIES_DIR)
  .filter((f) => f.endsWith(".js"))
  .map((f) => path.join(ENTRIES_DIR, f));

let changed = 0;
let skippedGermain = 0;
let skippedNoMatch = 0;
const mismatches = [];

for (const file of files) {
  const before = fs.readFileSync(file, "utf8");

  // Skip Germain-reviewed entries — his format stays as-is
  if (before.includes("Germain")) {
    skippedGermain++;
    continue;
  }

  // Match lastAudited + lastVerifiedBy pair (with optional whitespace variations)
  // The common pattern:
  //   lastAudited: "2026-04-04",
  //   lastVerifiedBy: "Claude + Tony",
  const pairRe = /  lastAudited: "(\d{4}-\d{2}-\d{2})",\n  lastVerifiedBy: "Claude \+ Tony",\n/;
  const match = before.match(pairRe);

  if (!match) {
    skippedNoMatch++;
    continue;
  }

  const date = match[1];
  const replacement = `  lastVerified: "${date}",\n`;
  const after = before.replace(pairRe, replacement);

  if (after === before) {
    mismatches.push(`${path.basename(file)}: replace produced no change`);
    continue;
  }

  // Verify the new field exists exactly once
  const newFieldCount = (after.match(/lastVerified: "/g) || []).length;
  if (newFieldCount !== 1) {
    mismatches.push(`${path.basename(file)}: expected 1 lastVerified, found ${newFieldCount}`);
    continue;
  }

  // Verify old fields are gone
  if (after.includes("lastAudited:") || after.includes("lastVerifiedBy:")) {
    mismatches.push(`${path.basename(file)}: old fields still present after edit`);
    continue;
  }

  fs.writeFileSync(file, after, "utf8");
  changed++;
}

console.log(`\nLegal entry verified-field migration:`);
console.log(`  Files changed:       ${changed}`);
console.log(`  Skipped (Germain):   ${skippedGermain}`);
console.log(`  Skipped (no match):  ${skippedNoMatch}`);
console.log(`  Mismatches:          ${mismatches.length}`);

if (mismatches.length > 0) {
  console.error("\nMISMATCHES — aborting:");
  for (const m of mismatches) console.error(`  ${m}`);
  process.exit(1);
}
