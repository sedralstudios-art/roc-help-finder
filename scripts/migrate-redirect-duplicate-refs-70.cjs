#!/usr/bin/env node
/*
 * scripts/migrate-redirect-duplicate-refs-70.cjs
 * ----------------------------------------------
 * Rewrites relatedIds pointing to duplicate entries being deleted.
 *   foil-ny                           -> public-records-request-ny
 *   apartment-smell-smoke-neighbor-ny -> neighbor-smoking-secondhand-apartment-ny
 *
 * If the target already appears in relatedIds, the duplicate redirect is
 * removed rather than creating a double entry. Idempotent.
 */

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

const REDIRECTS = [
  { from: 'foil-ny', to: 'public-records-request-ny' },
  { from: 'apartment-smell-smoke-neighbor-ny', to: 'neighbor-smoking-secondhand-apartment-ny' },
];

let edits = 0;

for (const f of fs.readdirSync(ENTRIES_DIR).filter((f) => f.endsWith('.js'))) {
  const abs = path.join(ENTRIES_DIR, f);
  let src = fs.readFileSync(abs, 'utf8');
  const original = src;
  for (const r of REDIRECTS) {
    const fromQuoted = `"${r.from}"`;
    const toQuoted = `"${r.to}"`;
    if (!src.includes(fromQuoted)) continue;
    if (src.includes(toQuoted)) {
      // Both already present; drop the obsolete one (handle common list patterns).
      src = src.replace(new RegExp(`\\s*${fromQuoted},\\r?\\n?`, 'g'), '\n');
      src = src.replace(new RegExp(`,?\\s*${fromQuoted}`, 'g'), '');
    } else {
      src = src.replace(new RegExp(fromQuoted, 'g'), toQuoted);
    }
  }
  if (src !== original) {
    fs.writeFileSync(abs, src, 'utf8');
    console.log('redirected refs in: ' + f);
    edits++;
  }
}

console.log('---');
console.log('files edited: ' + edits);
