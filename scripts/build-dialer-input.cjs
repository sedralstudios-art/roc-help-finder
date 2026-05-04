// scripts/build-dialer-input.cjs
//
// Builds the dialer's phones-*.json input file from the tagged-phones.json
// source-of-truth. Excludes:
//   • blockDial: true (crisis lines + 911 + 311 + etc.)
//   • numbers dialed within --since-hours of now (default 24)
//   • numbers without a recognizable 10-digit format
//
// Each output row carries owner metadata so the dialer's results.json can be
// attributed at capture time (no more "id: undefined" issue).
//
// Usage:
//   node scripts/build-dialer-input.cjs --out call-data/phones-7hr.json
//   node scripts/build-dialer-input.cjs --since-hours 24 --out ...
//   node scripts/build-dialer-input.cjs --max 700 --out ...

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
}

const TAGGED = path.join(__dirname, 'data', 'tagged-phones.json');
const RESULTS = path.join(__dirname, '..', 'call-data', 'results.json');
const OUT = arg('--out', null);
const SINCE_HOURS = parseInt(arg('--since-hours', '24'), 10);
const MAX = parseInt(arg('--max', '0'), 10);

if (!OUT) {
  console.error('Usage: node scripts/build-dialer-input.cjs --out <path> [--since-hours 24] [--max N]');
  process.exit(1);
}

const tagged = JSON.parse(fs.readFileSync(TAGGED, 'utf8'));
const results = fs.existsSync(RESULTS) ? JSON.parse(fs.readFileSync(RESULTS, 'utf8')) : [];

// Build set of digits dialed within the window
const cutoffMs = Date.now() - SINCE_HOURS * 3600 * 1000;
const recentlyDialed = new Set();
for (const r of results) {
  if (!r.timestamp) continue;
  const ts = Date.parse(r.timestamp);
  if (isNaN(ts) || ts < cutoffMs) continue;
  const d = String(r.number || '').replace(/\D/g, '');
  const norm = d.length === 11 && d.startsWith('1') ? d.substring(1) : d;
  if (norm.length === 10) recentlyDialed.add(norm);
}

console.error(`Excluding ${recentlyDialed.size} numbers dialed in the last ${SINCE_HOURS} hours.`);

const phones = [];
let dropped = { blockDial: 0, recent: 0, badDigits: 0 };

for (const rec of tagged.records) {
  if (rec.blockDial) { dropped.blockDial++; continue; }
  if (rec.digits.length !== 10) { dropped.badDigits++; continue; }
  if (recentlyDialed.has(rec.digits)) { dropped.recent++; continue; }

  // Pick best owner label
  const programOwner = rec.owners.find(o => o.type === 'program');
  const entryOwner = rec.owners.find(o => o.type === 'entry');
  const poleOwner = rec.owners.find(o => o.type === 'pole');

  const name = programOwner?.name || (poleOwner ? `${poleOwner.group}.${poleOwner.slug}` : entryOwner?.id) || rec.value;
  const id = programOwner?.id || (poleOwner ? `pole:${poleOwner.group}.${poleOwner.slug}` : (entryOwner ? `legal-entry:${entryOwner.id}` : `phone:${rec.digits}`));

  phones.push({
    id,
    name,
    number: rec.value || rec.digits,
    digits: rec.digits,
    category: programOwner?.category || (poleOwner?.category) || 'legal-entry-callout',
    owners: rec.owners.map(o => {
      if (o.type === 'program') return { type: 'program', id: o.id };
      if (o.type === 'pole') return { type: 'pole', ref: o.group + '.' + o.slug };
      if (o.type === 'entry') return { type: 'entry', id: o.id };
      return o;
    }),
  });
}

// Optional cap
const finalList = MAX > 0 ? phones.slice(0, MAX) : phones;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(finalList, null, 2));

console.error('');
console.error('Built', finalList.length, 'phone entries → ' + OUT);
console.error('Dropped:', dropped);
console.error('Estimated runtime at 36s/call:', (finalList.length * 36 / 60).toFixed(0), 'minutes (' + (finalList.length * 36 / 3600).toFixed(1) + ' hours)');
