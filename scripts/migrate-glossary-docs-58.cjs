#!/usr/bin/env node
/**
 * migrate-glossary-docs-58.cjs
 * =============================
 * Documentation catch-up for the legal glossary work shipped 2026-04-15.
 *
 *   1. CLAUDE.md — teach the next instance about the glossary as a third
 *      user-facing product, its auto-import + prerender pattern, and the
 *      stricter content-voice rules (6th grade, explainer not advice,
 *      whatToAsk pure questions). Expand the dual-rendering trap to cover
 *      glossary pages. Replace the stale "curl SPA false positive" rule
 *      with the current routing state (vercel.json no longer catch-alls
 *      after migration 53).
 *
 *   2. call-data/HANDOFF.md — one pointer line at the top. Detailed
 *      glossary handoff lives in the private memory folder, not in the
 *      repo. Existing town-research content is preserved unchanged.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CLAUDE = path.join(ROOT, 'CLAUDE.md');
const HANDOFF = path.join(ROOT, 'call-data/HANDOFF.md');

let claude = fs.readFileSync(CLAUDE, 'utf8');
let handoff = fs.readFileSync(HANDOFF, 'utf8');
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

const doReplaceClaude = makeReplacer('CLAUDE', () => claude, (v) => { claude = v; });
const doReplaceHandoff = makeReplacer('HANDOFF', () => handoff, (v) => { handoff = v; });

// ═══════════════════════════════════════════════
// CLAUDE.md updates
// ═══════════════════════════════════════════════

// 1. Two user-facing products → Three
doReplaceClaude(
  'Two user-facing products:\n' +
  '- **HelpFinder** — guided questionnaire that filters programs by situation.\n' +
  '- **Legal Library** ("Know Your Rights") — browsable plain-language legal explainers.\n',
  'Three user-facing products:\n' +
  '- **HelpFinder** — guided questionnaire that filters programs by situation.\n' +
  '- **Legal Library** ("Know Your Rights") — browsable plain-language legal explainers.\n' +
  '- **Legal Glossary** — plain-English definitions of legal and court terms, cross-linked from HelpFinder results and Legal Library entries.\n',
  'Products: two -> three (add Legal Glossary)'
);

// 2. Architecture: add glossary bullets after Legal entries bullet
doReplaceClaude(
  '- **Legal entries** are individual JS files in src/data/legal/entries/, auto-imported\n' +
  '  via import.meta.glob in src/data/legal/index.js.\n',
  '- **Legal entries** are individual JS files in src/data/legal/entries/, auto-imported\n' +
  '  via import.meta.glob in src/data/legal/index.js.\n' +
  '- **Legal Glossary terms** are individual JS files in src/data/legal/glossary/,\n' +
  '  auto-imported via import.meta.glob in src/data/legal/glossary-index.js. Routed\n' +
  '  at /glossary, /glossary/<slug>, /glossary/category/<cat>. Prerendered by\n' +
  '  scripts/prerender-glossary.cjs into dist/glossary/*. HelpFinder category\n' +
  '  to glossary category mapping lives in src/data/legal/glossary-tag-map.js.\n',
  'Architecture: add glossary bullet'
);

// 3. Dual rendering trap: expand to cover glossary
doReplaceClaude(
  '### Dual rendering trap\n' +
  'Any field rendered on a legal entry page must be updated in BOTH:\n' +
  '1. src/components/LegalLibrary.jsx (client render)\n' +
  '2. scripts/prerender-legal.cjs (static prerender for crawlers)\n' +
  '\n' +
  'Both changes go in the same commit. Otherwise the site looks correct in browsers\n' +
  'but is invisible to search engines.\n',
  '### Dual rendering trap\n' +
  'Any field rendered on a legal entry page must be updated in BOTH:\n' +
  '1. src/components/LegalLibrary.jsx (client render)\n' +
  '2. scripts/prerender-legal.cjs (static prerender for crawlers)\n' +
  '\n' +
  'Same rule for glossary pages:\n' +
  '1. src/components/Glossary.jsx (client render)\n' +
  '2. scripts/prerender-glossary.cjs (static prerender for crawlers)\n' +
  '\n' +
  'Both changes go in the same commit. Otherwise the site looks correct in browsers\n' +
  'but is invisible to search engines.\n',
  'Dual rendering trap: add glossary pair'
);

// 4. Replace the stale "curl SPA false positive" block with a current routing note
doReplaceClaude(
  '### curl SPA false positive\n' +
  'Vercel\'s catch-all rewrite returns HTTP 200 for every path, including garbage URLs.\n' +
  'curl status codes prove nothing. Always grep the response body for expected content\n' +
  'when verifying a deployed page.\n',
  '### Routing and crawl coverage\n' +
  'As of April 2026 (migration 53), vercel.json has explicit rewrites only for /help\n' +
  'and /help/:path* — the blanket catch-all has been removed. Unknown paths now\n' +
  'return 404 via public/404.html. Prerendered paths return 200 with real content.\n' +
  'Before reintroducing any catch-all rewrite, consult the user — the removal was\n' +
  'an intentional crawl-coverage fix so Googlebot stops seeing infinite-duplicate\n' +
  'content. When verifying a deployed page, still grep the response body — the SPA\n' +
  'can serve a shell without hydrating the right content.\n',
  'Replace stale curl-false-positive rule with current routing note'
);

// 5. Add a new "Legal Glossary content voice" section after the non-negotiable translation rule
doReplaceClaude(
  'NE, SW, MY, and SO translations are gated on native-speaker review.\n' +
  'Never fill them in or update them from machine translation.\n' +
  'See src/data/legal/translations/README.md.\n' +
  '\n' +
  '## Hard rules\n',
  'NE, SW, MY, and SO translations are gated on native-speaker review.\n' +
  'Never fill them in or update them from machine translation.\n' +
  'See src/data/legal/translations/README.md.\n' +
  '\n' +
  '### Legal Glossary content voice (stricter than legal library)\n' +
  '- 6th grade reading level. Short sentences, common words.\n' +
  '- Every term must include a statute citation, a sourceUrl, and a lastVerified date.\n' +
  '- whatToAsk items are pure questions directed at a lawyer, judge, or clerk.\n' +
  '  No parenthetical advice ("(Say yes...)", "(Always say...)"). No trailing\n' +
  '  imperatives ("Write it down.", "Get a copy."). If an item has a period followed\n' +
  '  by more text, rewrite it.\n' +
  '- plainEnglish describes how the law works. Never direct the reader. Avoid\n' +
  '  "you should", "you must" (unless quoting a legal requirement), "make sure",\n' +
  '  "always", "never."\n' +
  '- English only. NE/SW/MY/SO require native-speaker review per the rule above.\n' +
  '- HelpFinder is maintained by non-attorneys. Directive voice creates unauthorized\n' +
  '  practice of law risk and undermines the explainer-not-advice framing.\n' +
  '\n' +
  '## Hard rules\n',
  'Add Legal Glossary content voice section'
);

// ═══════════════════════════════════════════════
// HANDOFF.md: one pointer line at the top
// ═══════════════════════════════════════════════

doReplaceHandoff(
  '# Town Research Handoff\n',
  '> **Legal Glossary** — shipped 2026-04-15. 75 verified NY terms across every legal-library category. Full handoff in private memory (not in the repo).\n' +
  '\n' +
  '# Town Research Handoff\n',
  'HANDOFF: one pointer line above existing town-research handoff'
);

// ═══════════════════════════════════════════════
// WRITE
// ═══════════════════════════════════════════════
if (failures === 0) {
  fs.writeFileSync(CLAUDE, claude, 'utf8');
  fs.writeFileSync(HANDOFF, handoff, 'utf8');
}
console.log('\n' + successes + ' changes, ' + failures + ' failures.');
if (failures > 0) {
  console.error('\nABORT: no files written.');
  process.exit(1);
}
console.log('\nWrote: ' + path.relative(ROOT, CLAUDE));
console.log('Wrote: ' + path.relative(ROOT, HANDOFF));
