#!/usr/bin/env node
/**
 * migrate-common-phrases-links-56.cjs
 * ====================================
 * Phase 3a of the legal-glossary integration: wires a "Common phrases in
 * [category]" link at the bottom of HelpFinder results pages and Legal
 * Library entry pages, so the 35 glossary terms surface at the moments
 * users are actually reading about a situation — not only when searched
 * directly from /glossary.
 *
 * Three edits (dual-render trap per CLAUDE.md — client + server both
 * need to render the link so crawlers see it):
 *
 *   1. src/components/LegalLibrary.jsx — adds the link to LegalLibraryEntry
 *      (client render). Legal entries already carry the glossary taxonomy
 *      in `entry.category` so no HF-to-glossary mapping needed here.
 *
 *   2. src/components/HelpFinder.jsx — adds the link at the bottom of the
 *      RESULTS view, using helpFinderToGlossaryCategory() to translate HF
 *      category slugs (food, legal, legalEviction, etc.) to glossary
 *      category slugs (criminal, housing, family, etc.).
 *
 *   3. scripts/prerender-legal.cjs — adds the same link inside
 *      generateEntryHTML so the prerendered static HTML includes it for
 *      Googlebot and users loading the page without JS.
 *
 * In both components, the link renders only when the target glossary
 * category has at least one term, so we don't ship empty-state links.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LL = path.join(ROOT, 'src/components/LegalLibrary.jsx');
const HF = path.join(ROOT, 'src/components/HelpFinder.jsx');
const PL = path.join(ROOT, 'scripts/prerender-legal.cjs');

let ll = fs.readFileSync(LL, 'utf8');
let hf = fs.readFileSync(HF, 'utf8');
let pl = fs.readFileSync(PL, 'utf8');

let failures = 0;
let successes = 0;

function makeReplacer(label, getter, setter) {
  return (oldStr, newStr, sub) => {
    const current = getter();
    if (!current.includes(oldStr)) {
      console.error('ABORT ' + label + ': ' + sub);
      console.error('  Expected: ' + JSON.stringify(oldStr).slice(0, 200));
      failures++;
      return;
    }
    setter(current.replace(oldStr, newStr));
    console.log('OK ' + label + ': ' + sub);
    successes++;
  };
}

const doReplaceLL = makeReplacer('LL', () => ll, (v) => { ll = v; });
const doReplaceHF = makeReplacer('HF', () => hf, (v) => { hf = v; });
const doReplacePL = makeReplacer('PL', () => pl, (v) => { pl = v; });

// ═══════════════════════════════════════════════
// 1. LegalLibrary.jsx — import + link insertion in LegalLibraryEntry
// ═══════════════════════════════════════════════

doReplaceLL(
  'import { LEGAL_ENTRIES, LEGAL_ENTRIES_BY_ID, LEGAL_ENTRIES_BY_CATEGORY, LEGAL_CATEGORIES } from "../data/legal";\n',
  'import { LEGAL_ENTRIES, LEGAL_ENTRIES_BY_ID, LEGAL_ENTRIES_BY_CATEGORY, LEGAL_CATEGORIES } from "../data/legal";\n' +
  'import { GLOSSARY_TERMS_BY_CATEGORY } from "../data/legal/glossary-index";\n',
  'Import GLOSSARY_TERMS_BY_CATEGORY'
);

doReplaceLL(
  '      <div style={{ fontSize: 11, color: C.dust, marginTop: 14, paddingTop: 12, borderTop: "1px solid " + C.border }}>\n' +
  '        Last audited: {entry.lastAudited || "unknown"} · Entry ID: {entry.id}\n' +
  '      </div>\n',
  '      {GLOSSARY_TERMS_BY_CATEGORY[entry.category] && GLOSSARY_TERMS_BY_CATEGORY[entry.category].length > 0 && (\n' +
  '        <a\n' +
  '          href={"/glossary/category/" + entry.category}\n' +
  '          style={{\n' +
  '            display: "flex", alignItems: "center", gap: 10,\n' +
  '            marginTop: 20, padding: "12px 16px",\n' +
  '            background: "#ede7f6", border: "1px solid #5e35b1",\n' +
  '            borderRadius: 10, color: "#4527a0",\n' +
  '            fontSize: 14, fontWeight: 600, textDecoration: "none",\n' +
  '          }}\n' +
  '        >\n' +
  '          <span style={{ fontSize: 20 }}>📖</span>\n' +
  '          <span style={{ flex: 1 }}>Common phrases in this topic — {GLOSSARY_TERMS_BY_CATEGORY[entry.category].length} words explained</span>\n' +
  '          <span>→</span>\n' +
  '        </a>\n' +
  '      )}\n' +
  '      <div style={{ fontSize: 11, color: C.dust, marginTop: 14, paddingTop: 12, borderTop: "1px solid " + C.border }}>\n' +
  '        Last audited: {entry.lastAudited || "unknown"} · Entry ID: {entry.id}\n' +
  '      </div>\n',
  'Insert Common Phrases link above Last-audited footer'
);

// ═══════════════════════════════════════════════
// 2. HelpFinder.jsx — imports + link insertion after CommunitySection
// ═══════════════════════════════════════════════

doReplaceHF(
  'import { QUESTIONS, getFirstQuestion, isDirectToResults, isHiddenCategory, getInitialPrograms, applyAnswerFilters, applyTownFilter, getUrgencyLevel } from "./HelpFinderQuestions";\nimport ShareButton from "./ShareButton";\n',
  'import { QUESTIONS, getFirstQuestion, isDirectToResults, isHiddenCategory, getInitialPrograms, applyAnswerFilters, applyTownFilter, getUrgencyLevel } from "./HelpFinderQuestions";\nimport ShareButton from "./ShareButton";\nimport { helpFinderToGlossaryCategory, glossaryCategoryLabel } from "../data/legal/glossary-tag-map";\nimport { GLOSSARY_TERMS_BY_CATEGORY } from "../data/legal/glossary-index";\n',
  'Import glossary mapping helpers and terms'
);

doReplaceHF(
  '            {/* Community groups */}\n' +
  '            <CommunitySection lang={lang} category={category} />\n' +
  '          </div>\n' +
  '        )}\n',
  '            {/* Community groups */}\n' +
  '            <CommunitySection lang={lang} category={category} />\n' +
  '\n' +
  '            {/* Common phrases in [topic] — glossary cross-link */}\n' +
  '            {(() => {\n' +
  '              const gCat = helpFinderToGlossaryCategory(category);\n' +
  '              const gTerms = gCat ? GLOSSARY_TERMS_BY_CATEGORY[gCat] : null;\n' +
  '              if (!gTerms || gTerms.length === 0) return null;\n' +
  '              return (\n' +
  '                <a\n' +
  '                  href={"/glossary/category/" + gCat}\n' +
  '                  style={{\n' +
  '                    display: "flex", alignItems: "center", gap: 10,\n' +
  '                    marginTop: 16, padding: "12px 16px",\n' +
  '                    background: "#ede7f6", border: "1px solid #5e35b1",\n' +
  '                    borderRadius: 12, color: "#4527a0",\n' +
  '                    fontSize: 14, fontWeight: 600, textDecoration: "none",\n' +
  '                  }}\n' +
  '                >\n' +
  '                  <span style={{ fontSize: 20 }}>📖</span>\n' +
  '                  <span style={{ flex: 1 }}>Common phrases in {glossaryCategoryLabel(gCat)} — {gTerms.length} words explained</span>\n' +
  '                  <span>→</span>\n' +
  '                </a>\n' +
  '              );\n' +
  '            })()}\n' +
  '          </div>\n' +
  '        )}\n',
  'Insert Common Phrases link after CommunitySection in RESULTS'
);

// ═══════════════════════════════════════════════
// 3. prerender-legal.cjs — load glossary terms + inject HTML in entry template
// ═══════════════════════════════════════════════

doReplacePL(
  'async function loadEntries() {\n',
  'async function loadGlossaryTerms() {\n' +
  '  const dir = path.join(ROOT, \'src\', \'data\', \'legal\', \'glossary\');\n' +
  '  if (!fs.existsSync(dir)) return [];\n' +
  '  const files = fs.readdirSync(dir).filter((f) => f.endsWith(\'.js\'));\n' +
  '  const terms = [];\n' +
  '  for (const f of files) {\n' +
  '    const abs = path.join(dir, f);\n' +
  '    const mod = await import(pathToFileURL(abs).href);\n' +
  '    const val = Object.values(mod)[0];\n' +
  '    if (val && val.id) terms.push(val);\n' +
  '  }\n' +
  '  return terms;\n' +
  '}\n' +
  '\n' +
  'const GLOSSARY_LABELS = {\n' +
  '  criminal: \'Court & Arrests\',\n' +
  '  housing: \'Housing & Rent\',\n' +
  '  family: \'Family Court\',\n' +
  '  benefits: \'Benefits & Hearings\',\n' +
  '  consumer: \'Debt & Collections\',\n' +
  '  employment: \'Work & Pay\',\n' +
  '  vehicle: \'Driving & Tickets\',\n' +
  '  immigration: \'Immigration\',\n' +
  '  general: \'General Court Words\',\n' +
  '};\n' +
  '\n' +
  'async function loadEntries() {\n',
  'Add loadGlossaryTerms() and GLOSSARY_LABELS'
);

doReplacePL(
  '  const sourcesHTML = sources.length\n' +
  '    ? \'<h2>Sources</h2><ul class="sources">\' +\n' +
  '      sources.map((s) => \'<li><a href="\' + esc(s) + \'" rel="noopener">\' + esc(s) + \'</a></li>\').join(\'\') +\n' +
  '      \'</ul>\'\n' +
  '    : \'\';\n',
  '  const sourcesHTML = sources.length\n' +
  '    ? \'<h2>Sources</h2><ul class="sources">\' +\n' +
  '      sources.map((s) => \'<li><a href="\' + esc(s) + \'" rel="noopener">\' + esc(s) + \'</a></li>\').join(\'\') +\n' +
  '      \'</ul>\'\n' +
  '    : \'\';\n' +
  '  const gTerms = (GLOSSARY_BY_CAT[entry.category] || []);\n' +
  '  const commonPhrasesHTML = gTerms.length > 0\n' +
  '    ? \'<a class="common-phrases" href="/glossary/category/\' + esc(entry.category) + \'" style="display:flex;align-items:center;gap:10px;margin-top:20px;padding:12px 16px;background:#ede7f6;border:1px solid #5e35b1;border-radius:10px;color:#4527a0;font-size:14px;font-weight:600;text-decoration:none;">\' +\n' +
  '      \'<span style="font-size:20px;">📖</span>\' +\n' +
  '      \'<span style="flex:1;">Common phrases in \' + esc(GLOSSARY_LABELS[entry.category] || entry.category) + \' — \' + gTerms.length + \' words explained</span>\' +\n' +
  '      \'<span>→</span>\' +\n' +
  '      \'</a>\'\n' +
  '    : \'\';\n',
  'Add commonPhrasesHTML build in generateEntryHTML'
);

doReplacePL(
  '        ${sourcesHTML}\n' +
  '        <div class="disclaimer">',
  '        ${sourcesHTML}\n' +
  '        ${commonPhrasesHTML}\n' +
  '        <div class="disclaimer">',
  'Inject commonPhrasesHTML into entry template before disclaimer'
);

doReplacePL(
  '  const entries = await loadEntries();\n' +
  '  console.log(\'✓ Loaded \' + entries.length + \' entries\');\n',
  '  const entries = await loadEntries();\n' +
  '  console.log(\'✓ Loaded \' + entries.length + \' entries\');\n' +
  '\n' +
  '  const glossaryTerms = await loadGlossaryTerms();\n' +
  '  globalThis.GLOSSARY_BY_CAT = {};\n' +
  '  for (const t of glossaryTerms) {\n' +
  '    const c = t.category || \'general\';\n' +
  '    (globalThis.GLOSSARY_BY_CAT[c] = globalThis.GLOSSARY_BY_CAT[c] || []).push(t);\n' +
  '  }\n' +
  '  console.log(\'✓ Loaded \' + glossaryTerms.length + \' glossary terms for cross-linking\');\n',
  'Load glossary terms into globalThis.GLOSSARY_BY_CAT in main'
);

// generateEntryHTML references GLOSSARY_BY_CAT without import (Node-global).
// Add a module-level const alias so generateEntryHTML references work.
doReplacePL(
  'function generateEntryHTML(entry, langMeta, bundleTags) {\n',
  'const GLOSSARY_BY_CAT = globalThis.GLOSSARY_BY_CAT = globalThis.GLOSSARY_BY_CAT || {};\n' +
  '\n' +
  'function generateEntryHTML(entry, langMeta, bundleTags) {\n',
  'Alias globalThis.GLOSSARY_BY_CAT at module scope for generateEntryHTML'
);

// ═══════════════════════════════════════════════
// WRITE
// ═══════════════════════════════════════════════
if (failures === 0) {
  fs.writeFileSync(LL, ll, 'utf8');
  fs.writeFileSync(HF, hf, 'utf8');
  fs.writeFileSync(PL, pl, 'utf8');
}
console.log('\n' + successes + ' changes, ' + failures + ' failures.');
if (failures > 0) {
  console.error('\nABORT: no files written.');
  process.exit(1);
}
console.log('\nWrote: ' + path.relative(ROOT, LL));
console.log('Wrote: ' + path.relative(ROOT, HF));
console.log('Wrote: ' + path.relative(ROOT, PL));
