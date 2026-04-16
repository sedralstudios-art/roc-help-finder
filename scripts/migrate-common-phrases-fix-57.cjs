#!/usr/bin/env node
/**
 * migrate-common-phrases-fix-57.cjs
 * ==================================
 * Fixes a reference-timing bug in migration 56.
 *
 * Migration 56 aliased `const GLOSSARY_BY_CAT = globalThis.GLOSSARY_BY_CAT ...`
 * at module-load time, BEFORE main() ever ran. main() later reassigned
 * globalThis.GLOSSARY_BY_CAT to a new populated object, but the module-scope
 * const still held the original empty reference. generateEntryHTML looked
 * up terms in the stale empty object, so the "Common phrases" link never
 * rendered in the prerendered HTML.
 *
 * Fix: reference globalThis.GLOSSARY_BY_CAT directly inside generateEntryHTML
 * and drop the module-scope alias. Small, focused surgery.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PL = path.join(ROOT, 'scripts/prerender-legal.cjs');
let pl = fs.readFileSync(PL, 'utf8');
let failures = 0;
let successes = 0;

function doReplace(oldStr, newStr, label) {
  if (!pl.includes(oldStr)) {
    console.error('ABORT: ' + label);
    console.error('  Expected: ' + JSON.stringify(oldStr).slice(0, 180));
    failures++;
    return;
  }
  pl = pl.replace(oldStr, newStr);
  console.log('OK: ' + label);
  successes++;
}

// Drop the module-scope alias entirely.
doReplace(
  'const GLOSSARY_BY_CAT = globalThis.GLOSSARY_BY_CAT = globalThis.GLOSSARY_BY_CAT || {};\n' +
  '\n' +
  'function generateEntryHTML(entry, langMeta, bundleTags) {\n',
  'function generateEntryHTML(entry, langMeta, bundleTags) {\n',
  'Remove module-scope GLOSSARY_BY_CAT alias'
);

// Reference globalThis directly inside generateEntryHTML.
doReplace(
  '  const gTerms = (GLOSSARY_BY_CAT[entry.category] || []);\n',
  '  const gTerms = ((globalThis.GLOSSARY_BY_CAT || {})[entry.category] || []);\n',
  'Use globalThis.GLOSSARY_BY_CAT directly in generateEntryHTML'
);

if (failures === 0) {
  fs.writeFileSync(PL, pl, 'utf8');
}
console.log('\n' + successes + ' changes, ' + failures + ' failures.');
if (failures > 0) {
  console.error('\nABORT: file NOT written.');
  process.exit(1);
}
console.log('\nWrote: ' + path.relative(ROOT, PL));
