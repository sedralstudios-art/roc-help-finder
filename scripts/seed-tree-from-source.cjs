// scripts/seed-tree-from-source.cjs
//
// Bootstraps the phone-keyed data tree at data/phones/<digits>/ from source
// files. For every digit-string referenced in programs.js, canonical/phones.js,
// or any legal entry's text, creates a folder (if missing) and writes/updates
// meta.json with tags + sourceOwners + status.
//
// Idempotent: existing folders' meta.json is updated with current source
// references but their runs/ + audit-log + history are left alone.
//
// Run after any source-file change that adds or removes a phone reference.
//
// Usage:
//   node scripts/seed-tree-from-source.cjs
//   node scripts/seed-tree-from-source.cjs --dry-run   (prints what would change)

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TREE_ROOT = path.join(ROOT, 'data', 'phones');
const TAGGED_PHONES = path.join(ROOT, 'scripts', 'data', 'tagged-phones.json');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');

function loadTagged() {
  if (!fs.existsSync(TAGGED_PHONES)) {
    console.error('tagged-phones.json not found. Run `node scripts/build-tagged-phones.cjs` first.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(TAGGED_PHONES, 'utf8'));
}

// Map a tagged-phone record into the tree's meta.json shape.
function shapeMeta(rec, existing) {
  const owners = rec.owners || [];
  const programOwners = owners.filter(o => o.type === 'program');
  const poleOwners = owners.filter(o => o.type === 'pole');
  const entryOwners = owners.filter(o => o.type === 'entry');

  // Tags derived from owner types + categories + crisis flag
  const tags = new Set();
  if (programOwners.length) tags.add('program');
  if (poleOwners.length) tags.add('pole');
  if (entryOwners.length) tags.add('entry-callout');
  if (rec.blockDial) tags.add('crisis-line');
  if (rec.blockDial) tags.add('blockDial');
  // Categories from any owner
  for (const o of owners) {
    if (o.category) tags.add('cat:' + o.category);
  }

  // Best-guess primary name
  let primaryName = null;
  if (programOwners.length) primaryName = programOwners[0].name || ('program:' + programOwners[0].id);
  else if (poleOwners.length) primaryName = poleOwners[0].group + '.' + poleOwners[0].slug;
  else if (entryOwners.length) primaryName = 'entry-callout:' + entryOwners[0].id;
  else if (rec.name) primaryName = rec.name;

  // sourceOwners: canonical references back to source files
  const sourceOwners = owners.map(o => {
    if (o.type === 'program') return { type: 'program', id: o.id, name: o.name, category: o.category, hidden: o.hidden };
    if (o.type === 'pole') return { type: 'pole', group: o.group, slug: o.slug, value: o.value, blockDial: !!rec.blockDial, category: o.category, notes: o.notes };
    if (o.type === 'entry') return { type: 'entry', id: o.id, line: o.line };
    return o;
  });

  return {
    digits: rec.digits,
    kind: rec.digits.length === 10 ? 'phone' : 'shortcode',
    primaryName,
    rawValue: rec.value,
    blockDial: !!rec.blockDial,
    tags: [...tags].sort(),
    sourceOwners,
    callsRecorded: existing && existing.callsRecorded ? existing.callsRecorded : 0,
    mostRecent: existing && existing.mostRecent ? existing.mostRecent : null,
    status: existing && existing.status ? existing.status : (rec.blockDial ? 'do-not-dial' : 'awaiting-first-dial'),
    needsRedial: existing && existing.needsRedial != null ? existing.needsRedial : false,
    replacedBy: existing && existing.replacedBy ? existing.replacedBy : null,
    replaces: existing && existing.replaces ? existing.replaces : null,
    seededAt: existing && existing.seededAt ? existing.seededAt : new Date().toISOString(),
    lastSeededAt: new Date().toISOString(),
  };
}

function main() {
  const tagged = loadTagged();
  const records = tagged.records || [];
  console.log(`Loaded ${records.length} unique phone records from tagged-phones.json`);

  let created = 0, updated = 0, unchanged = 0;
  for (const rec of records) {
    if (!rec.digits) continue;
    const digitDir = path.join(TREE_ROOT, rec.digits);
    const metaPath = path.join(digitDir, 'meta.json');

    let existing = null;
    if (fs.existsSync(metaPath)) {
      try { existing = JSON.parse(fs.readFileSync(metaPath, 'utf8')); } catch (e) { existing = null; }
    }

    const newMeta = shapeMeta(rec, existing);
    const newMetaJson = JSON.stringify(newMeta, null, 2);

    if (!existing) {
      if (!DRY_RUN) {
        fs.mkdirSync(digitDir, { recursive: true });
        fs.writeFileSync(metaPath, newMetaJson);
      }
      created++;
    } else {
      const oldJson = JSON.stringify(existing, null, 2);
      if (oldJson === newMetaJson) {
        unchanged++;
      } else {
        if (!DRY_RUN) fs.writeFileSync(metaPath, newMetaJson);
        updated++;
      }
    }
  }

  console.log('');
  console.log('Seed summary' + (DRY_RUN ? ' (DRY RUN — no writes)' : '') + ':');
  console.log('  Created (new folder + meta.json):     ' + created);
  console.log('  Updated (existing meta.json refreshed): ' + updated);
  console.log('  Unchanged:                              ' + unchanged);
  console.log('  Tree root:                              ' + TREE_ROOT);
}

main();
