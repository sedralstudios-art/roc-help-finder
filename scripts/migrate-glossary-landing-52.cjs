#!/usr/bin/env node
/**
 * migrate-glossary-landing-52.cjs
 * ================================
 * Wires the new Legal Glossary into LandingPage.jsx and package.json:
 *   1. Imports Glossary components
 *   2. Adds PAGES.GLOSSARY / GLOSSARY_TERM / GLOSSARY_CATEGORY
 *   3. Adds URL <-> page mappings for /glossary, /glossary/<id>, /glossary/category/<cat>
 *   4. Extends parsePath() to recognize glossary URLs
 *   5. Adds state (selectedGlossaryTermId, selectedGlossaryCategory)
 *   6. Hydrates those state fields on mount + popstate
 *   7. Adds openGlossaryTerm() and openGlossaryCategory() navigation helpers
 *   8. Adds the violet Glossary tile on the home page (after Know Your Rights)
 *   9. Adds the three render blocks for the new pages
 *  10. Adds a "Legal Glossary" footer link
 *  11. Adds prerender-glossary.cjs to the npm build pipeline
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LP = path.join(ROOT, 'src/components/LandingPage.jsx');
const PKG = path.join(ROOT, 'package.json');

let lp = fs.readFileSync(LP, 'utf8');
let pkg = fs.readFileSync(PKG, 'utf8');
let failures = 0;
let successes = 0;

function doReplaceLP(oldStr, newStr, label) {
  if (!lp.includes(oldStr)) {
    console.error('ABORT LP: ' + label);
    console.error('  Expected: ' + JSON.stringify(oldStr).slice(0, 180));
    failures++;
    return;
  }
  lp = lp.replace(oldStr, newStr);
  console.log('OK LP: ' + label);
  successes++;
}

function doReplacePKG(oldStr, newStr, label) {
  if (!pkg.includes(oldStr)) {
    console.error('ABORT PKG: ' + label);
    console.error('  Expected: ' + JSON.stringify(oldStr).slice(0, 180));
    failures++;
    return;
  }
  pkg = pkg.replace(oldStr, newStr);
  console.log('OK PKG: ' + label);
  successes++;
}

// ═══════════════════════════════════════════════
// 1. IMPORT
// ═══════════════════════════════════════════════
doReplaceLP(
  'import { LegalLibraryCategories, LegalLibraryBrowse, LegalLibraryEntry } from "./LegalLibrary";\n',
  'import { LegalLibraryCategories, LegalLibraryBrowse, LegalLibraryEntry } from "./LegalLibrary";\n' +
  'import { GlossaryCategories, GlossaryBrowse, GlossaryTerm } from "./Glossary";\n',
  'Import Glossary components'
);

// ═══════════════════════════════════════════════
// 2. PAGES const
// ═══════════════════════════════════════════════
doReplaceLP(
  'const PAGES = { HOME: 0, ABOUT: 1, PRIVACY: 2, TERMS: 3, SUPPORT: 4, LEGAL_LIBRARY: 5, LEGAL_ENTRY: 6, LEGAL_CATEGORY: 7 };\n',
  'const PAGES = { HOME: 0, ABOUT: 1, PRIVACY: 2, TERMS: 3, SUPPORT: 4, LEGAL_LIBRARY: 5, LEGAL_ENTRY: 6, LEGAL_CATEGORY: 7, GLOSSARY: 8, GLOSSARY_TERM: 9, GLOSSARY_CATEGORY: 10 };\n',
  'PAGES: add GLOSSARY + GLOSSARY_TERM + GLOSSARY_CATEGORY'
);

// ═══════════════════════════════════════════════
// 3. PAGE_PATHS
// ═══════════════════════════════════════════════
doReplaceLP(
  '  [PAGES.LEGAL_LIBRARY]: "/know-your-rights",\n};\n',
  '  [PAGES.LEGAL_LIBRARY]: "/know-your-rights",\n  [PAGES.GLOSSARY]: "/glossary",\n};\n',
  'PAGE_PATHS: add /glossary'
);

// ═══════════════════════════════════════════════
// 4. PATH_TO_PAGE
// ═══════════════════════════════════════════════
doReplaceLP(
  '  "/know-your-rights": PAGES.LEGAL_LIBRARY,\n};\n',
  '  "/know-your-rights": PAGES.LEGAL_LIBRARY,\n  "/glossary": PAGES.GLOSSARY,\n};\n',
  'PATH_TO_PAGE: add /glossary'
);

// ═══════════════════════════════════════════════
// 5. parsePath: add glossary URL patterns
// ═══════════════════════════════════════════════
doReplaceLP(
  '  const entryMatch = clean.match(/^\\/know-your-rights\\/([a-z0-9-]+)$/i);\n' +
  '  if (entryMatch) return { page: PAGES.LEGAL_ENTRY, entryId: entryMatch[1], categoryId: null };\n' +
  '  if (PATH_TO_PAGE[clean] !== undefined) return { page: PATH_TO_PAGE[clean], entryId: null, categoryId: null };\n',
  '  const entryMatch = clean.match(/^\\/know-your-rights\\/([a-z0-9-]+)$/i);\n' +
  '  if (entryMatch) return { page: PAGES.LEGAL_ENTRY, entryId: entryMatch[1], categoryId: null };\n' +
  '  // Glossary category: /glossary/category/[cat]\n' +
  '  const glossaryCatMatch = clean.match(/^\\/glossary\\/category\\/([a-z0-9-]+)$/i);\n' +
  '  if (glossaryCatMatch) return { page: PAGES.GLOSSARY_CATEGORY, entryId: null, categoryId: null, termId: null, glossaryCat: glossaryCatMatch[1] };\n' +
  '  // Glossary term: /glossary/[id]\n' +
  '  const glossaryTermMatch = clean.match(/^\\/glossary\\/([a-z0-9-]+)$/i);\n' +
  '  if (glossaryTermMatch) return { page: PAGES.GLOSSARY_TERM, entryId: null, categoryId: null, termId: glossaryTermMatch[1], glossaryCat: null };\n' +
  '  if (PATH_TO_PAGE[clean] !== undefined) return { page: PATH_TO_PAGE[clean], entryId: null, categoryId: null };\n',
  'parsePath: add glossary URL patterns'
);

// ═══════════════════════════════════════════════
// 6. State initialization
// ═══════════════════════════════════════════════
doReplaceLP(
  '  const [selectedEntryId, setSelectedEntryId] = useState(null);\n' +
  '  const [selectedCategory, setSelectedCategory] = useState(null);\n',
  '  const [selectedEntryId, setSelectedEntryId] = useState(null);\n' +
  '  const [selectedCategory, setSelectedCategory] = useState(null);\n' +
  '  const [selectedGlossaryTermId, setSelectedGlossaryTermId] = useState(null);\n' +
  '  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState(null);\n',
  'State: add glossary selection state'
);

// ═══════════════════════════════════════════════
// 7. Hydrate glossary state in mount + popstate effects
// ═══════════════════════════════════════════════
doReplaceLP(
  '    const parsed = parsePath(window.location.pathname);\n' +
  '    if (parsed.entryId) setSelectedEntryId(parsed.entryId);\n' +
  '    if (parsed.categoryId) setSelectedCategory(parsed.categoryId);\n' +
  '    setPage(parsed.page);\n' +
  '  }, []);\n\n' +
  '  // Handle browser back/forward navigation\n' +
  '  useEffect(() => {\n' +
  '    const onPop = () => {\n' +
  '      const parsed = parsePath(window.location.pathname);\n' +
  '      if (parsed.entryId) setSelectedEntryId(parsed.entryId);\n' +
  '      if (parsed.categoryId) setSelectedCategory(parsed.categoryId);\n' +
  '      setPage(parsed.page);\n' +
  '      window.scrollTo(0, 0);\n' +
  '    };\n',
  '    const parsed = parsePath(window.location.pathname);\n' +
  '    if (parsed.entryId) setSelectedEntryId(parsed.entryId);\n' +
  '    if (parsed.categoryId) setSelectedCategory(parsed.categoryId);\n' +
  '    if (parsed.termId) setSelectedGlossaryTermId(parsed.termId);\n' +
  '    if (parsed.glossaryCat) setSelectedGlossaryCategory(parsed.glossaryCat);\n' +
  '    setPage(parsed.page);\n' +
  '  }, []);\n\n' +
  '  // Handle browser back/forward navigation\n' +
  '  useEffect(() => {\n' +
  '    const onPop = () => {\n' +
  '      const parsed = parsePath(window.location.pathname);\n' +
  '      if (parsed.entryId) setSelectedEntryId(parsed.entryId);\n' +
  '      if (parsed.categoryId) setSelectedCategory(parsed.categoryId);\n' +
  '      if (parsed.termId) setSelectedGlossaryTermId(parsed.termId);\n' +
  '      if (parsed.glossaryCat) setSelectedGlossaryCategory(parsed.glossaryCat);\n' +
  '      setPage(parsed.page);\n' +
  '      window.scrollTo(0, 0);\n' +
  '    };\n',
  'Effects: hydrate glossary state on mount + popstate'
);

// ═══════════════════════════════════════════════
// 8. Add openGlossaryTerm + openGlossaryCategory
// ═══════════════════════════════════════════════
doReplaceLP(
  '  const openCategory = (cat) => {\n' +
  '    setSelectedCategory(cat);\n' +
  '    setPage(PAGES.LEGAL_CATEGORY);\n' +
  '    setMenuOpen(false);\n' +
  '    const newPath = "/know-your-rights/topic/" + cat;\n' +
  '    if (window.location.pathname !== newPath) {\n' +
  '      try { window.history.pushState({}, "", newPath); } catch (e) {}\n' +
  '    }\n' +
  '    window.scrollTo(0, 0);\n' +
  '  };\n',
  '  const openCategory = (cat) => {\n' +
  '    setSelectedCategory(cat);\n' +
  '    setPage(PAGES.LEGAL_CATEGORY);\n' +
  '    setMenuOpen(false);\n' +
  '    const newPath = "/know-your-rights/topic/" + cat;\n' +
  '    if (window.location.pathname !== newPath) {\n' +
  '      try { window.history.pushState({}, "", newPath); } catch (e) {}\n' +
  '    }\n' +
  '    window.scrollTo(0, 0);\n' +
  '  };\n\n' +
  '  const openGlossaryTerm = (id) => {\n' +
  '    setSelectedGlossaryTermId(id);\n' +
  '    setPage(PAGES.GLOSSARY_TERM);\n' +
  '    setMenuOpen(false);\n' +
  '    const newPath = "/glossary/" + id;\n' +
  '    if (window.location.pathname !== newPath) {\n' +
  '      try { window.history.pushState({}, "", newPath); } catch (e) {}\n' +
  '    }\n' +
  '    window.scrollTo(0, 0);\n' +
  '  };\n\n' +
  '  const openGlossaryCategory = (cat) => {\n' +
  '    setSelectedGlossaryCategory(cat);\n' +
  '    setPage(PAGES.GLOSSARY_CATEGORY);\n' +
  '    setMenuOpen(false);\n' +
  '    const newPath = "/glossary/category/" + cat;\n' +
  '    if (window.location.pathname !== newPath) {\n' +
  '      try { window.history.pushState({}, "", newPath); } catch (e) {}\n' +
  '    }\n' +
  '    window.scrollTo(0, 0);\n' +
  '  };\n',
  'Nav helpers: openGlossaryTerm + openGlossaryCategory'
);

// ═══════════════════════════════════════════════
// 9. Home tile (violet, after Know Your Rights tile)
// ═══════════════════════════════════════════════
doReplaceLP(
  '              <div style={{ fontSize: 16, fontWeight: 700, color: C.bark, marginBottom: 3 }}>Know Your Rights</div>\n' +
  '              <div style={{ fontSize: 13, color: C.stone, lineHeight: 1.45 }}>Free legal guides. Benefits, housing, employment, immigration.</div>\n' +
  '            </div>\n' +
  '            <div style={{ fontSize: 22, color: C.amber, flexShrink: 0, fontWeight: 700 }}>→</div>\n' +
  '          </button>\n\n' +
  '          {/* ── TRADES TILE ── permit rules for contractors and homeowners */}\n',
  '              <div style={{ fontSize: 16, fontWeight: 700, color: C.bark, marginBottom: 3 }}>Know Your Rights</div>\n' +
  '              <div style={{ fontSize: 13, color: C.stone, lineHeight: 1.45 }}>Free legal guides. Benefits, housing, employment, immigration.</div>\n' +
  '            </div>\n' +
  '            <div style={{ fontSize: 22, color: C.amber, flexShrink: 0, fontWeight: 700 }}>→</div>\n' +
  '          </button>\n\n' +
  '          {/* ── LEGAL GLOSSARY TILE ── plain-English court words */}\n' +
  '          <button\n' +
  '            onClick={() => nav(PAGES.GLOSSARY)}\n' +
  '            className="hf-fade-in hf-d5"\n' +
  '            style={{\n' +
  '              width: "100%", textAlign: isRTL ? "right" : "left",\n' +
  '              background: "#ede7f6", border: "1px solid #5e35b1",\n' +
  '              borderRadius: 24, padding: "18px 22px", cursor: "pointer",\n' +
  '              marginTop: 12, fontFamily: "inherit",\n' +
  '              display: "flex", alignItems: "center", gap: 16,\n' +
  '            }}\n' +
  '          >\n' +
  '            <div style={{ fontSize: 34, flexShrink: 0, lineHeight: 1 }}>📖</div>\n' +
  '            <div style={{ flex: 1, minWidth: 0 }}>\n' +
  '              <div style={{ fontSize: 16, fontWeight: 700, color: C.bark, marginBottom: 3 }}>Legal Glossary</div>\n' +
  '              <div style={{ fontSize: 13, color: C.stone, lineHeight: 1.45 }}>Plain-English words for what you hear in court and on notices.</div>\n' +
  '            </div>\n' +
  '            <div style={{ fontSize: 22, color: "#5e35b1", flexShrink: 0, fontWeight: 700 }}>→</div>\n' +
  '          </button>\n\n' +
  '          {/* ── TRADES TILE ── permit rules for contractors and homeowners */}\n',
  'Home: insert violet Glossary tile after Know Your Rights'
);

// ═══════════════════════════════════════════════
// 10. Render blocks for the three glossary pages
// ═══════════════════════════════════════════════
doReplaceLP(
  '      {page === PAGES.LEGAL_ENTRY && (\n' +
  '        <LegalLibraryEntry\n' +
  '          entryId={selectedEntryId}\n' +
  '          legalLang={legalLang}\n' +
  '          setLegalLang={setLegalLang}\n' +
  '          onBack={() => {\n' +
  '            // Back to the category list if we have one, else to library root\n' +
  '            const cat = selectedCategory || (selectedEntryId && (require("./LegalLibrary").LegalLibraryBrowse ? null : null));\n' +
  '            if (selectedCategory) { nav(PAGES.LEGAL_CATEGORY); openCategory(selectedCategory); }\n' +
  '            else { nav(PAGES.LEGAL_LIBRARY); }\n' +
  '          }}\n' +
  '          onOpenEntry={openEntry}\n' +
  '        />\n' +
  '      )}\n',
  '      {page === PAGES.LEGAL_ENTRY && (\n' +
  '        <LegalLibraryEntry\n' +
  '          entryId={selectedEntryId}\n' +
  '          legalLang={legalLang}\n' +
  '          setLegalLang={setLegalLang}\n' +
  '          onBack={() => {\n' +
  '            // Back to the category list if we have one, else to library root\n' +
  '            const cat = selectedCategory || (selectedEntryId && (require("./LegalLibrary").LegalLibraryBrowse ? null : null));\n' +
  '            if (selectedCategory) { nav(PAGES.LEGAL_CATEGORY); openCategory(selectedCategory); }\n' +
  '            else { nav(PAGES.LEGAL_LIBRARY); }\n' +
  '          }}\n' +
  '          onOpenEntry={openEntry}\n' +
  '        />\n' +
  '      )}\n\n' +
  '      {/* ═══════════════════ LEGAL GLOSSARY (landing) ═══════════════════ */}\n' +
  '      {page === PAGES.GLOSSARY && (\n' +
  '        <GlossaryCategories\n' +
  '          legalLang={legalLang}\n' +
  '          setLegalLang={setLegalLang}\n' +
  '          onOpenCategory={openGlossaryCategory}\n' +
  '          onOpenTerm={openGlossaryTerm}\n' +
  '          onBack={() => nav(PAGES.HOME)}\n' +
  '        />\n' +
  '      )}\n\n' +
  '      {/* ═══════════════════ LEGAL GLOSSARY (category list) ═══════════════════ */}\n' +
  '      {page === PAGES.GLOSSARY_CATEGORY && (\n' +
  '        <GlossaryBrowse\n' +
  '          legalLang={legalLang}\n' +
  '          setLegalLang={setLegalLang}\n' +
  '          categoryFilter={selectedGlossaryCategory}\n' +
  '          onOpenTerm={openGlossaryTerm}\n' +
  '          onBack={() => nav(PAGES.GLOSSARY)}\n' +
  '        />\n' +
  '      )}\n\n' +
  '      {/* ═══════════════════ LEGAL GLOSSARY (term detail) ═══════════════════ */}\n' +
  '      {page === PAGES.GLOSSARY_TERM && (\n' +
  '        <GlossaryTerm\n' +
  '          termId={selectedGlossaryTermId}\n' +
  '          legalLang={legalLang}\n' +
  '          setLegalLang={setLegalLang}\n' +
  '          onOpenTerm={openGlossaryTerm}\n' +
  '          onOpenLegalEntry={openEntry}\n' +
  '          onBack={() => {\n' +
  '            if (selectedGlossaryCategory) { nav(PAGES.GLOSSARY_CATEGORY); }\n' +
  '            else { nav(PAGES.GLOSSARY); }\n' +
  '          }}\n' +
  '        />\n' +
  '      )}\n',
  'Render: add three glossary page blocks'
);

// ═══════════════════════════════════════════════
// 11. Footer link
// ═══════════════════════════════════════════════
doReplaceLP(
  '<button className="hf-nav-link" onClick={() => nav(PAGES.LEGAL_LIBRARY)} style={{ fontSize: 12 }}>Know Your Rights</button>\n',
  '<button className="hf-nav-link" onClick={() => nav(PAGES.LEGAL_LIBRARY)} style={{ fontSize: 12 }}>Know Your Rights</button>\n' +
  '            <button className="hf-nav-link" onClick={() => nav(PAGES.GLOSSARY)} style={{ fontSize: 12 }}>Legal Glossary</button>\n',
  'Footer: add Legal Glossary link'
);

// ═══════════════════════════════════════════════
// 12. package.json: add prerender-glossary to build
// ═══════════════════════════════════════════════
doReplacePKG(
  '"build": "vite build && node scripts/prerender-legal.cjs && node scripts/prerender-landing.cjs && node scripts/generate-sitemap.cjs",',
  '"build": "vite build && node scripts/prerender-legal.cjs && node scripts/prerender-glossary.cjs && node scripts/prerender-landing.cjs && node scripts/generate-sitemap.cjs",',
  'package.json: add prerender-glossary to build'
);

// ═══════════════════════════════════════════════
// WRITE
// ═══════════════════════════════════════════════
if (failures === 0) {
  fs.writeFileSync(LP, lp, 'utf8');
  fs.writeFileSync(PKG, pkg, 'utf8');
}
console.log('\n' + successes + ' changes, ' + failures + ' failures.');
if (failures > 0) {
  console.error('\nABORT: source files NOT written. Fix mismatches and retry.');
  process.exit(1);
}
console.log('\nWrote: ' + path.relative(ROOT, LP));
console.log('Wrote: ' + path.relative(ROOT, PKG));
