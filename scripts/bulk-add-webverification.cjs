// One-shot bulk webVerification appender. Reads a JSON config from stdin or argv.
// Usage: node scripts/bulk-add-webverification.cjs <config.json>
// Config shape: [ { digits, sourceUrl, sourceLabel, notes }, ... ]

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const cfgPath = process.argv[2];
if (!cfgPath) {
  console.error('Usage: node scripts/bulk-add-webverification.cjs <config.json>');
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const stamp = new Date().toISOString();

let updated = 0;
let skipped = 0;
for (const entry of config) {
  const metaPath = path.join(ROOT, 'data', 'phones', entry.digits, 'meta.json');
  if (!fs.existsSync(metaPath)) {
    console.warn(`MISSING ${entry.digits}: ${metaPath}`);
    skipped++;
    continue;
  }
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  if (!Array.isArray(meta.webVerification)) meta.webVerification = [];
  meta.webVerification.push({
    verifiedAt: stamp,
    sourceUrl: entry.sourceUrl,
    sourceLabel: entry.sourceLabel,
    notes: entry.notes,
  });
  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');
  console.log(`Updated ${entry.digits}: +1 webVerification`);
  updated++;
}
console.log(`\nTotal: ${updated} updated, ${skipped} skipped`);
