#!/usr/bin/env node
/**
 * migrate-unified-search-65.cjs
 * ==============================
 * Adds the unified search page (/search) to LandingPage.jsx:
 *   1. Import Search component
 *   2. Add PAGES.SEARCH
 *   3. Add /search to PAGE_PATHS and PATH_TO_PAGE
 *   4. Add parsePath match for /search
 *   5. Add render block
 *   6. Add search bar on home page (above the "Find help now" button)
 *
 * The Search component receives programs as a prop from LandingPage
 * (which doesn't have them directly). To avoid importing the heavy
 * PROGRAMS array into LandingPage, we pass an empty array and let
 * Search import from legal/glossary stores directly. Programs search
 * will be wired separately when PROGRAMS are extracted to a shared module.
 *
 * UPDATE: Actually, programs live inside HelpFinder.jsx which is a
 * sibling. For v1 search, we cover legal entries + glossary (which are
 * imported in Search.jsx). Program search requires either extracting
 * PROGRAMS or accepting that v1 search covers 2 of 3 products.
 * Ship v1 now; program search in v2.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LP = path.join(ROOT, 'src/components/LandingPage.jsx');
let lp = fs.readFileSync(LP, 'utf8');
let failures = 0;
let successes = 0;

function doReplace(oldStr, newStr, label) {
  if (!lp.includes(oldStr)) {
    console.error('ABORT: ' + label);
    console.error('  Expected: ' + JSON.stringify(oldStr).slice(0, 200));
    failures++;
    return;
  }
  lp = lp.replace(oldStr, newStr);
  console.log('OK: ' + label);
  successes++;
}

// 1. Import
doReplace(
  'import { GlossaryCategories, GlossaryBrowse, GlossaryTerm } from "./Glossary";\n',
  'import { GlossaryCategories, GlossaryBrowse, GlossaryTerm } from "./Glossary";\nimport UnifiedSearch from "./Search";\n',
  'Import UnifiedSearch'
);

// 2. PAGES
doReplace(
  'GLOSSARY: 8, GLOSSARY_TERM: 9, GLOSSARY_CATEGORY: 10 };\n',
  'GLOSSARY: 8, GLOSSARY_TERM: 9, GLOSSARY_CATEGORY: 10, SEARCH: 11 };\n',
  'PAGES: add SEARCH'
);

// 3. PAGE_PATHS
doReplace(
  '  [PAGES.GLOSSARY]: "/glossary",\n};\n',
  '  [PAGES.GLOSSARY]: "/glossary",\n  [PAGES.SEARCH]: "/search",\n};\n',
  'PAGE_PATHS: add /search'
);

// 4. PATH_TO_PAGE
doReplace(
  '  "/glossary": PAGES.GLOSSARY,\n};\n',
  '  "/glossary": PAGES.GLOSSARY,\n  "/search": PAGES.SEARCH,\n};\n',
  'PATH_TO_PAGE: add /search'
);

// 5. Render block — after glossary term block, before footer
doReplace(
  '      {/* ═══════════════════ LEGAL GLOSSARY (term detail) ═══════════════════ */}\n',
  '      {/* ═══════════════════ UNIFIED SEARCH ═══════════════════ */}\n' +
  '      {page === PAGES.SEARCH && (\n' +
  '        <UnifiedSearch\n' +
  '          programs={[]}\n' +
  '          onOpenEntry={openEntry}\n' +
  '          onOpenGlossaryTerm={openGlossaryTerm}\n' +
  '          onBack={() => nav(PAGES.HOME)}\n' +
  '        />\n' +
  '      )}\n\n' +
  '      {/* ═══════════════════ LEGAL GLOSSARY (term detail) ═══════════════════ */}\n',
  'Render: add Search page block'
);

// 6. Footer link
doReplace(
  '<button className="hf-nav-link" onClick={() => nav(PAGES.GLOSSARY)} style={{ fontSize: 12 }}>Legal Glossary</button>\n',
  '<button className="hf-nav-link" onClick={() => nav(PAGES.GLOSSARY)} style={{ fontSize: 12 }}>Legal Glossary</button>\n' +
  '            <button className="hf-nav-link" onClick={() => nav(PAGES.SEARCH)} style={{ fontSize: 12 }}>Search</button>\n',
  'Footer: add Search link'
);

if (failures === 0) {
  fs.writeFileSync(LP, lp, 'utf8');
}
console.log('\n' + successes + ' changes, ' + failures + ' failures.');
if (failures > 0) {
  console.error('\nABORT: file NOT written.');
  process.exit(1);
}
console.log('\nWrote: ' + path.relative(ROOT, LP));
