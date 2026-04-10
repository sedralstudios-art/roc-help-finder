#!/usr/bin/env node
/**
 * scripts/migrate-fix-canandaigua-town-19.cjs
 *
 * Data fix. The VA Healthcare (Veterans) program (id "va") has
 * town:"canandaigua" but Canandaigua is in Ontario County, not Monroe.
 * The program itself is reach:"national" and physically located at the
 * Canandaigua VA Medical Center, which is the correct address. Keep the
 * address, zip, and coordinates (all accurate). Remove only the `town`
 * field so it stops polluting Monroe town filters.
 *
 * Single patch. Idempotent.
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'src', 'components', 'HelpFinder.jsx');
let src = fs.readFileSync(FILE, 'utf8');
const orig = src;
const hadCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

const oldStr = 'tg:["vet"], town:"canandaigua", zip:"14424"';
const newStr = 'tg:["vet"], zip:"14424"';

if (src.includes(newStr) && !src.includes(oldStr)) {
  console.log('Already applied.');
  process.exit(0);
}
if (!src.includes(oldStr)) {
  console.error('FATAL: anchor not found');
  process.exit(1);
}
src = src.replace(oldStr, newStr);
if (hadCRLF) src = src.replace(/\n/g, '\r\n');
fs.writeFileSync(FILE, src);
console.log(`HelpFinder.jsx: ${orig.length} → ${src.length} bytes`);
console.log('Removed town:"canandaigua" from VA Healthcare entry.');
