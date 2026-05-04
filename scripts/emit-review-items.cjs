// Emits the 255 review items as a minimal JSON list so an external reviewer
// (Claude in this case) can iterate through them, read each cropped image,
// and write a per-item approve/skip decision back to caller-id-approved.json.
//
// Catalogued name resolution priority:
//   1. results.json `name` field (only set on later May runs)
//   2. tagged-phones.json owner labels (cross-references programs.js / canonical poles / entries)
//   3. results.json basename `id` parsed from filename
//   4. fallback: '(unknown)'

const fs = require('fs');
const path = require('path');

const CROPPED_DIR = path.join(__dirname, '..', 'call-data', 'caller-id-cropped');
const RESULTS = path.join(__dirname, '..', 'call-data', 'results.json');
const TAGGED  = path.join(__dirname, 'data', 'tagged-phones.json');
const OUT     = path.join(__dirname, '..', 'call-data', 'caller-id-review-items.json');

function dnorm(s) {
  const d = String(s || '').replace(/\D/g, '');
  return d.length === 11 && d.startsWith('1') ? d.substring(1) : d;
}

const results = JSON.parse(fs.readFileSync(RESULTS, 'utf8'));
const tagged  = JSON.parse(fs.readFileSync(TAGGED, 'utf8'));
const cropped = fs.readdirSync(CROPPED_DIR).filter(f => f.toLowerCase().endsWith('.jpg'));

const byDigits = new Map();
for (const r of results) {
  if (!r.recording) continue;
  if (!String(r.recording).toLowerCase().endsWith('.wav')) continue;
  const d = dnorm(r.number);
  if (d.length !== 10) continue;
  if (!byDigits.has(d)) byDigits.set(d, []);
  byDigits.get(d).push(r);
}

// Index tagged-phones for second-pass lookup
const taggedByDigits = new Map();
for (const rec of tagged.records || []) {
  if (rec.digits && rec.digits.length === 10) taggedByDigits.set(rec.digits, rec);
}

function resolveName(digits, resultRow, file) {
  if (resultRow && resultRow.name && resultRow.name !== 'undefined') return resultRow.name;
  const tag = taggedByDigits.get(digits);
  if (tag) {
    const programOwner = (tag.owners || []).find(o => o.type === 'program');
    if (programOwner) return programOwner.name || ('program:' + programOwner.id);
    const poleOwner = (tag.owners || []).find(o => o.type === 'pole');
    if (poleOwner) return poleOwner.group + '.' + poleOwner.slug;
    const entryOwner = (tag.owners || []).find(o => o.type === 'entry');
    if (entryOwner) return 'entry:' + entryOwner.id;
    if (tag.name) return tag.name;
  }
  // Fallback: parse <id> from filename
  const m = file.match(/^(?:call_)?(.+?)_\d{10}\.jpg$/i);
  if (m) return m[1];
  return '(unknown)';
}

function resolveType(digits, resultRow) {
  const tag = taggedByDigits.get(digits);
  if (!tag) return 'unknown';
  const types = new Set((tag.owners || []).map(o => o.type));
  if (types.has('program')) return 'program';
  if (types.has('pole')) return 'pole';
  if (types.has('entry')) return 'entry-callout';
  return 'unknown';
}

const items = [];
for (const f of cropped) {
  const m = f.match(/_(\d{10})\.jpg$/i);
  if (!m) continue;
  const digits = m[1];
  const rows = byDigits.get(digits) || [];
  if (rows.length === 0) continue;
  rows.sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)));
  const r = rows.find(x => x.status === 'success') || rows[0];
  if (r.status !== 'success') continue;
  items.push({
    file: f,
    base: f.replace(/\.jpg$/i, ''),
    digits,
    catalogued: resolveName(digits, r, f),
    type: resolveType(digits, r),
    transcript_open: (r.transcript || '').slice(0, 150).replace(/[\r\n]+/g, ' '),
  });
}

items.sort((a, b) => String(a.catalogued).localeCompare(String(b.catalogued)));
fs.writeFileSync(OUT, JSON.stringify(items, null, 2));
console.log(`Wrote ${items.length} items to ${OUT}`);
