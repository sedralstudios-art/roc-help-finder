#!/usr/bin/env node
/**
 * migrate-legal-tooltips-64.cjs
 * ==============================
 * Wires inline GlossaryText tooltips into LegalLibrary entry pages.
 * Same component as HelpFinder program cards (GlossaryTooltip.jsx).
 * Applied to: whatItMeans, yourRights list items, legalOptions list items,
 * and example text. Max 3 highlights per text block for readability.
 *
 * Dual-render note: this is the CLIENT-side integration only. The
 * prerender (scripts/prerender-legal.cjs) uses plain HTML — auto-linking
 * glossary terms as <a> tags to /glossary/<id> pages is a separate step
 * that can follow in a future migration.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LL = path.join(ROOT, 'src/components/LegalLibrary.jsx');
let ll = fs.readFileSync(LL, 'utf8');
let failures = 0;
let successes = 0;

function doReplace(oldStr, newStr, label) {
  if (!ll.includes(oldStr)) {
    console.error('ABORT: ' + label);
    console.error('  Expected: ' + JSON.stringify(oldStr).slice(0, 200));
    failures++;
    return;
  }
  ll = ll.replace(oldStr, newStr);
  console.log('OK: ' + label);
  successes++;
}

// 1. Import GlossaryText
doReplace(
  'import { GLOSSARY_TERMS_BY_CATEGORY } from "../data/legal/glossary-index";\n',
  'import { GLOSSARY_TERMS_BY_CATEGORY } from "../data/legal/glossary-index";\nimport GlossaryText from "./GlossaryTooltip";\n',
  'Import GlossaryText'
);

// 2. whatItMeans — wrap the paragraph text
doReplace(
  '            {pickText(entry.whatItMeans, legalLang)}\n',
  '            <GlossaryText text={pickText(entry.whatItMeans, legalLang)} maxHighlights={3} />\n',
  'whatItMeans → GlossaryText'
);

// 3. yourRights list items
doReplace(
  '            {rightsArr.map((item, i) => <li key={i} style={{ marginBottom: 8 }}>{item}</li>)}\n',
  '            {rightsArr.map((item, i) => <li key={i} style={{ marginBottom: 8 }}><GlossaryText text={item} maxHighlights={2} /></li>)}\n',
  'yourRights items → GlossaryText'
);

// 4. legalOptions list items
doReplace(
  '            {optionsArr.map((item, i) => <li key={i} style={{ marginBottom: 10 }}>{item}</li>)}\n',
  '            {optionsArr.map((item, i) => <li key={i} style={{ marginBottom: 10 }}><GlossaryText text={item} maxHighlights={2} /></li>)}\n',
  'legalOptions items → GlossaryText'
);

// 5. example text
doReplace(
  '            {pickText(entry.example, legalLang)}\n',
  '            <GlossaryText text={pickText(entry.example, legalLang)} maxHighlights={2} />\n',
  'example → GlossaryText'
);

if (failures === 0) {
  fs.writeFileSync(LL, ll, 'utf8');
}
console.log('\n' + successes + ' changes, ' + failures + ' failures.');
if (failures > 0) {
  console.error('\nABORT: file NOT written.');
  process.exit(1);
}
console.log('\nWrote: ' + path.relative(ROOT, LL));
