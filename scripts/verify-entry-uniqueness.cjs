// scripts/verify-entry-uniqueness.cjs
// Fails the build if two legal entries cover the same (topic, authorityType, jurisdictionScope).
// Composite key is the systematic uniqueness guarantee: two entries on the same topic in the
// same authority scope cannot coexist because the build won't compile.
//
// Phase 2 (current, since 2026-04-18): every entry must have authorityType.
// An unlabeled entry fails the build.

const path = require('path');
const fs = require('fs');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

const VALID_AUTHORITY_TYPES = new Set([
  'state-statute',
  'federal-statute',
  'state-regulation',
  'federal-regulation',
  'local-ordinance',
  'common-law',
  'agency-program',
]);

function parseEntry(filename) {
  const src = fs.readFileSync(path.join(ENTRIES_DIR, filename), 'utf8');
  const id = (src.match(/id:\s*"([^"]+)"/) || [])[1];
  const authorityType = (src.match(/authorityType:\s*"([^"]+)"/) || [])[1] || null;
  return { filename, id, authorityType };
}

// Scope is derived from authorityType, not the id suffix. This is the durable
// uniqueness guarantee: two entries with the same normalized topic and the
// same authorityType collide regardless of filename cosmetics. If someone
// later writes "foo-ny" with authorityType:"common-law", it will collide with
// the existing "foo-ny-cl" even though their filenames look different.
const SCOPE_BY_AUTHORITY = {
  'state-statute': 'ny',
  'federal-statute': 'us',
  'state-regulation': 'ny-reg',
  'federal-regulation': 'us-reg',
  'common-law': 'case-law',
  'agency-program': 'program',
};

function normalizeTopic(id) {
  return id
    .replace(/-ny-mon-.*$/, '')
    .replace(/-ny-cl$/, '')
    .replace(/-ny-program$/, '')
    .replace(/-us-reg-ny$/, '')
    .replace(/-us-ny$/, '')
    .replace(/-ny-reg$/, '')
    .replace(/-ny$/, '');
}

function deriveKey(entry) {
  const { id, authorityType } = entry;
  if (!id) return null;

  // local-ordinance: municipality is part of the scope so different towns stay distinct
  if (authorityType === 'local-ordinance') {
    const m = id.match(/-ny-mon-(.+?)(?:-(?:town|village|city))?$/);
    const municipality = m ? m[1] : 'ny-unscoped';
    const topic = normalizeTopic(id);
    return `${topic}::local-ordinance::${municipality}`;
  }

  const topic = normalizeTopic(id);
  const scope = SCOPE_BY_AUTHORITY[authorityType] || 'unknown';
  return `${topic}::${authorityType || 'unlabeled'}::${scope}`;
}

function main() {
  const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith('.js'));
  const entries = files.map(parseEntry);

  const errors = [];
  const byKey = new Map();

  for (const entry of entries) {
    if (!entry.id) {
      errors.push(`${entry.filename}: missing id field`);
      continue;
    }

    if (!entry.authorityType) {
      errors.push(`${entry.filename}: missing required authorityType field`);
      continue;
    }

    if (!VALID_AUTHORITY_TYPES.has(entry.authorityType)) {
      errors.push(`${entry.filename}: invalid authorityType "${entry.authorityType}"`);
      continue;
    }

    const key = deriveKey(entry);
    if (byKey.has(key)) {
      errors.push(`DUPLICATE KEY "${key}":\n    - ${byKey.get(key)}\n    - ${entry.filename}`);
    } else {
      byKey.set(key, entry.filename);
    }
  }

  const total = entries.length;

  console.log(`verify-entry-uniqueness: ${total} entries scanned, ${byKey.size} unique composite keys`);

  if (errors.length) {
    console.error('');
    console.error('FAIL:');
    for (const e of errors) console.error('  ' + e);
    process.exit(1);
  }

  console.log('OK');
}

main();
