// scripts/build-dialer-blocklist.cjs
//
// Reads canonical/phones.js, extracts every pole with `blockDial: true`, and
// writes the digit-only list to scripts/data/dialer-blocklist.json. The
// dialer-helper.ps1 reads that JSON at startup so the call-block list is
// data-driven from canonical metadata, not hardcoded in PowerShell.
//
// Run this any time canonical/phones.js changes. Could also be wired into a
// pre-flight in dialer.cjs (read JSON mtime vs phones.js mtime, regenerate
// if stale).
//
// Usage:
//   node scripts/build-dialer-blocklist.cjs
//
// Output:
//   scripts/data/dialer-blocklist.json

const fs = require('fs');
const path = require('path');

const PHONES_SRC = path.join(__dirname, '..', 'src', 'data', 'canonical', 'phones.js');
const OUT_DIR = path.join(__dirname, 'data');
const OUT_FILE = path.join(OUT_DIR, 'dialer-blocklist.json');

async function main() {
  // Node 22+ supports require() of ESM. Use dynamic import to be portable
  // across older Nodes too.
  const phonesUrl = 'file:///' + PHONES_SRC.replace(/\\/g, '/');
  let mod;
  try {
    mod = await import(phonesUrl);
  } catch (e) {
    console.error('Failed to import canonical/phones.js: ' + e.message);
    console.error('Make sure your Node version supports ESM imports (>=22).');
    process.exit(1);
  }

  if (typeof mod.buildDialBlocklist !== 'function') {
    console.error('canonical/phones.js does not export buildDialBlocklist().');
    process.exit(1);
  }

  const entries = mod.buildDialBlocklist();
  if (!Array.isArray(entries) || entries.length === 0) {
    console.error('buildDialBlocklist() returned no entries — that is suspicious. Did you forget blockDial:true on the new poles?');
    process.exit(1);
  }

  // De-duplicate by digits, preferring entries with notes/category.
  const byDigits = new Map();
  for (const e of entries) {
    const existing = byDigits.get(e.digits);
    if (!existing || (!existing.notes && e.notes)) {
      byDigits.set(e.digits, e);
    }
  }
  const deduped = [...byDigits.values()].sort((a, b) => a.digits.localeCompare(b.digits));

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = {
    generatedAt: new Date().toISOString(),
    source: 'src/data/canonical/phones.js (entries with blockDial: true)',
    count: deduped.length,
    digits: deduped.map(e => e.digits),
    detail: deduped,
  };
  fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2));

  console.log(`Wrote ${deduped.length} blocklist entries to ${OUT_FILE}`);
  for (const e of deduped) {
    console.log(`  ${e.digits.padEnd(11)}  ${e.ref.padEnd(28)}  ${(e.category || '').padEnd(16)}  ${(e.notes || '').substring(0, 60)}`);
  }
}

main().catch(err => {
  console.error('Fatal: ' + err.message);
  console.error(err.stack);
  process.exit(1);
});
