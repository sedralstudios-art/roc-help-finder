// Vite's import.meta.glob auto-imports every file in ./glossary/ at build time.
// New glossary term = new file in src/data/legal/glossary/. No manual registration.
// Mirrors the pattern used by src/data/legal/index.js for legal entries.

const termModules = import.meta.glob('./glossary/*.js', { eager: true });

const rawTerms = Object.values(termModules)
  .map((mod) => Object.values(mod)[0])
  .filter(Boolean);

// Sort by category, then alphabetical by English term name.
export const GLOSSARY_TERMS = rawTerms.sort((a, b) => {
  const catCmp = (a.category || '').localeCompare(b.category || '');
  if (catCmp !== 0) return catCmp;
  return ((a.term && a.term.en) || '').localeCompare((b.term && b.term.en) || '');
});

export const GLOSSARY_TERMS_BY_ID = Object.fromEntries(
  GLOSSARY_TERMS.map((t) => [t.id, t])
);

export const GLOSSARY_TERMS_BY_CATEGORY = GLOSSARY_TERMS.reduce((acc, t) => {
  const cat = t.category || 'other';
  (acc[cat] = acc[cat] || []).push(t);
  return acc;
}, {});

export const GLOSSARY_CATEGORIES = Object.keys(GLOSSARY_TERMS_BY_CATEGORY).sort();

// Build a lookup that maps every alias (e.g. "ACD") back to its term id.
// Used for fuzzy search and, later, inline tooltip detection in legal entries.
export const GLOSSARY_ALIAS_MAP = (() => {
  const map = {};
  for (const t of GLOSSARY_TERMS) {
    const full = (t.term && t.term.en) || '';
    if (full) map[full.toLowerCase()] = t.id;
    for (const a of (t.aka || [])) {
      if (a) map[String(a).toLowerCase()] = t.id;
    }
  }
  return map;
})();
