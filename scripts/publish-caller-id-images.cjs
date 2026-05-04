// scripts/publish-caller-id-images.cjs
//
// Consumes call-data/caller-id-approved.json (exported from the review HTML)
// and:
//   1. Copies each approved cropped JPEG to public/caller-id/<digits>.jpg
//   2. Generates src/data/caller-id-manifest.json mapping digits → metadata
//
// The manifest is the join key for rendering: programs.js / legal entries
// look up their phone digits in the manifest at build time and render the
// thumbnail when matched.

const fs = require('fs');
const path = require('path');

const APPROVED_JSON = path.join(__dirname, '..', 'call-data', 'caller-id-approved.json');
const CROPPED_DIR  = path.join(__dirname, '..', 'call-data', 'caller-id-cropped');
const RESULTS      = path.join(__dirname, '..', 'call-data', 'results.json');
const PUBLIC_DIR   = path.join(__dirname, '..', 'public', 'caller-id');
const MANIFEST_OUT = path.join(__dirname, '..', 'src', 'data', 'caller-id-manifest.json');

function dnorm(s) {
  const d = String(s || '').replace(/\D/g, '');
  return d.length === 11 && d.startsWith('1') ? d.substring(1) : d;
}

function main() {
  if (!fs.existsSync(APPROVED_JSON)) {
    console.error(`Approval file not found: ${APPROVED_JSON}`);
    console.error(`Open call-data/caller-id-review.html in a browser, approve images, click "Download approved.json", and place the file at the path above.`);
    process.exit(1);
  }
  const approved = JSON.parse(fs.readFileSync(APPROVED_JSON, 'utf8'));
  const approvedDigits = Object.keys(approved);
  console.log(`Approved digits: ${approvedDigits.length}`);

  const results = JSON.parse(fs.readFileSync(RESULTS, 'utf8'));
  const byDigits = new Map();
  for (const r of results) {
    if (!r.recording) continue;
    if (!String(r.recording).toLowerCase().endsWith('.wav')) continue;
    const d = dnorm(r.number);
    if (d.length !== 10) continue;
    if (!byDigits.has(d)) byDigits.set(d, []);
    byDigits.get(d).push(r);
  }

  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const manifest = {};
  let copied = 0, missing = 0;

  for (const digits of approvedDigits) {
    const meta = approved[digits];
    const baseName = meta.base || `_${digits}`;
    const srcPath = path.join(CROPPED_DIR, baseName + '.jpg');
    const dstPath = path.join(PUBLIC_DIR, `${digits}.jpg`);
    if (!fs.existsSync(srcPath)) {
      console.error(`  MISSING: ${srcPath}`);
      missing++;
      continue;
    }
    fs.copyFileSync(srcPath, dstPath);
    copied++;

    const rows = byDigits.get(digits) || [];
    rows.sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)));
    const r = rows.find(x => x.status === 'success') || rows[0];

    manifest[digits] = {
      digits,
      file: `caller-id/${digits}.jpg`,
      capturedAt: r ? r.timestamp : null,
      sourceCallId: r ? r.id : null,
      catalogedName: r ? r.name : null,
      number: r ? r.number : null,
    };
  }

  fs.writeFileSync(MANIFEST_OUT, JSON.stringify(manifest, null, 2));
  console.log(`Copied ${copied} images to ${PUBLIC_DIR}`);
  console.log(`Manifest: ${MANIFEST_OUT} (${Object.keys(manifest).length} entries)`);
  if (missing > 0) console.log(`Missing source files: ${missing}`);
}

main();
