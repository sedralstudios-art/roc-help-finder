# CLAUDE.md — HelpFinder

## Project

HelpFinder (helpfinder.help) is a free, multilingual community resource directory
for Rochester, NY and Monroe County. Built by Sedral Studios. React 18 + Vite 5,
deployed on Vercel as an SPA.

Three user-facing products:
- **HelpFinder** — guided questionnaire that filters programs by situation.
- **Legal Library** ("Know Your Rights") — browsable plain-language legal explainers.
- **Legal Glossary** — plain-English definitions of legal and court terms, cross-linked from HelpFinder results and Legal Library entries.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — verify entry uniqueness + Vite build + prerender legal/glossary/help/landing pages + generate sitemap. Fails fast if any entry is missing `authorityType` or collides on composite key.
- `npm run verify` — run the entry-uniqueness validator standalone (no build).
- `npm run preview` — serve production build locally

No test suite, linter, or formatter configured.

## Architecture

- **No React Router.** Routing is hand-rolled via useState + pushState/popState
  in LandingPage.jsx. Do not introduce React Router without discussion.
- **Inline styles only.** No CSS files. Follow existing pattern.
- **Legal entries** are individual JS files in src/data/legal/entries/, auto-imported
  via import.meta.glob in src/data/legal/index.js.
- **Legal Glossary terms** are individual JS files in src/data/legal/glossary/,
  auto-imported via import.meta.glob in src/data/legal/glossary-index.js. Routed
  at /glossary, /glossary/<slug>, /glossary/category/<cat>. Prerendered by
  scripts/prerender-glossary.cjs into dist/glossary/*. HelpFinder category
  to glossary category mapping lives in src/data/legal/glossary-tag-map.js.
- **HelpFinderQuestions.js** is the single source of truth for questionnaire
  categories, programs, and filtering logic.
- **Geo detection** — src/data/geo/monroe-jurisdictions.json + src/utils/resolveJurisdiction.js
  auto-detect the user's municipality for jurisdiction-aware filtering.
- **Stripe** is wired to the support/donation page. Do not touch payment code without asking.

## Languages

The in-app UI supports 8 languages: en, es, ne, ar, sw, my, so, zh.
The prerender/SEO layer (scripts/prerender-legal.cjs) supports 20 languages.

### Translation rule (non-negotiable)

NE, SW, MY, and SO translations are gated on native-speaker review.
Never fill them in or update them from machine translation.
See src/data/legal/translations/README.md.

### Legal Glossary content voice (stricter than legal library)
- 6th grade reading level. Short sentences, common words.
- Every term must include a statute citation, a sourceUrl, and a lastVerified date.
- whatToAsk items are pure questions directed at a lawyer, judge, or clerk.
  No parenthetical advice ("(Say yes...)", "(Always say...)"). No trailing
  imperatives ("Write it down.", "Get a copy."). If an item has a period followed
  by more text, rewrite it.
- plainEnglish describes how the law works. Never direct the reader. Avoid
  "you should", "you must" (unless quoting a legal requirement), "make sure",
  "always", "never."
- English only. NE/SW/MY/SO require native-speaker review per the rule above.
- HelpFinder is maintained by non-attorneys. Directive voice creates unauthorized
  practice of law risk and undermines the explainer-not-advice framing.

## Hard rules

### Entry authorityType (required field, build-gated)
Every legal entry must declare an `authorityType` right after `jurisdiction`.
The validator (`scripts/verify-entry-uniqueness.cjs`) runs first in `npm run
build` and fails the build if any entry is missing it, uses an invalid value,
or collides with another entry on the composite key
`(normalizedTopic, authorityType, jurisdictionScope)`.

Valid values and id conventions:
- `state-statute`       — NY statute. Id pattern: `{topic}-ny`
- `federal-statute`     — U.S. code. Id pattern: `{topic}-ny` (audience is NY)
- `state-regulation`    — NYCRR. Id pattern: `{topic}-ny`
- `federal-regulation`  — CFR. Id pattern: `{topic}-ny`
- `local-ordinance`     — town/village/city code. Id pattern: `{topic}-ny-mon-{municipality}-{town|village|city}`
- `common-law`          — case law, judge-made. Id pattern: `{topic}-ny-cl`
- `agency-program`      — program or process with no single governing statute. Id pattern: `{topic}-ny-program`

Filename matches id + `.js`. No version suffixes (`_01`, `_05`, etc. — stripped
site-wide on 2026-04-18).

Entry pages render a colored authority badge under the summary explaining where
the rule comes from (NY State Statute, Local Ordinance, Court-Made Law, etc.).
Badge markup lives in both `src/components/LegalLibrary.jsx` (`AuthorityBadge`)
and `scripts/prerender-legal.cjs` (`AUTHORITY_META_SSR`). Dual-rendering rule
applies.

### Source URL citation parsing
Sources should point to specific statute URLs, not agency landing pages. The
citation parser in `src/components/LegalLibrary.jsx` (`parseSource`) and
`scripts/prerender-legal.cjs` (`parseSourceSSR`) converts
`nysenate.gov/legislation/laws/RPP/235-B` into the readable "NY Real Property
Law § 235-b". 47 NY code prefixes mapped; also handles U.S. Code, CFR, NYCRR
(Cornell mirror), UCC, Constitution. Use these URL shapes whenever possible.

### One-shot rename scripts
`scripts/label-authority-types.cjs`, `scripts/rename-strip-nn.cjs`, and
`scripts/rename-authority-suffix.cjs` are one-shot scripts used during the
2026-04-18 rollout. They are idempotent — safe to re-run. Pattern to follow
for future one-shot rollouts: put them in `scripts/`, name them by intent,
include a brief header comment explaining the scope.

### No hardcoded counts
Never put a hardcoded count of legal entries, programs, or categories in any
user-facing string. The site grows daily. Use dynamic .length instead.

### Dual rendering trap
Any field rendered on a legal entry page must be updated in BOTH:
1. src/components/LegalLibrary.jsx (client render)
2. scripts/prerender-legal.cjs (static prerender for crawlers)

Same rule for glossary pages:
1. src/components/Glossary.jsx (client render)
2. scripts/prerender-glossary.cjs (static prerender for crawlers)

Both changes go in the same commit. Otherwise the site looks correct in browsers
but is invisible to search engines.

### Sensitive content gating
There is a SENSITIVE set in HelpFinder.jsx (~line 1299) that gates DV,
immigration, and other high-risk categories with a privacy notice and Quick Exit.
Do not audit, modify, or "improve" this set without explicit approval.

### Routing and crawl coverage
As of April 2026 (migration 53), vercel.json has explicit rewrites only for /help
and /help/:path* — the blanket catch-all has been removed. Unknown paths now
return 404 via public/404.html. Prerendered paths return 200 with real content.
Before reintroducing any catch-all rewrite, consult the user — the removal was
an intentional crawl-coverage fix so Googlebot stops seeing infinite-duplicate
content. When verifying a deployed page, still grep the response body — the SPA
can serve a shell without hydrating the right content.

### Source file edit pattern
Edits to source files go through numbered CJS migration scripts
(scripts/migrate-*-NN.cjs) that make exact string replacements, verify each
replacement succeeded, and abort on mismatch. Never paste-edit files containing
AR or ZH characters — character corruption is silent and undetectable until production.

### Quarantined folder
~/helpfinder-archive-DO-NOT-READ is off-limits. Never read from it. If you need
project history, ask the maintainer directly.

### Prior instance output
Multiple prior Claude instances worked on this project and degraded over time.
Do not trust comments, commit messages, or migration script descriptions as
ground truth. Verify claims against the actual code before acting on them.

## Working style

- Explain before acting, clarify before assuming. The maintainer is new to Claude
  Code and new to this kind of coding.
- Recommend, don't menu — give your best answer, not five options.
- Terse when shipping, longer when processing.
- Own mistakes in one line.
- Never describe the user's internal state as fact. Do not comment on their body,
  schedule, energy, or capacity.
- Every shipped change includes verification steps: the grep, the curl with body
  check, the file to inspect.

## Git

- Single branch: main
- Remote: https://github.com/sedralstudios-art/roc-help-finder.git
- One-line double-quoted commit messages. No ! characters (Git Bash on Windows breaks).
- Never git push without explicit greenlight from the user.
