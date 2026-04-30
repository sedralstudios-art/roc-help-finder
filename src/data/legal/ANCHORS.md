# Anchor Entry Architecture

**Status:** Schema spec, step 1 of legal-entry drift architecture (proposed 2026-04-30, see Claude memory `project_legal_entry_drift_architecture_2026_04_30.md`).

**Purpose:** Detect when a NY statute referenced by HelpFinder content has actually changed (the source page text drifted, or a bill is moving through the legislature), and surface the affected entries for re-review. Replaces the current `factCheckedBy: { tool, date }` stamp's "this looked right at this date" guarantee with operational source-monitoring.

## Concept

An **anchor entry** is the canonical attorney-verified explanation of one statute. Other entries that touch the same statute reference the anchor instead of restating it. When the source URL changes (hash diff) or a bill mentions the statute (NYS bill tracker), every entry that references the anchor inherits a `sourceChangedSince` warning.

## Schema additions

### Anchor entries (entries that ARE anchors)

A regular legal entry becomes an anchor by setting `isAnchor: true` and providing four new fields. Everything else (id, primaryStatute, summary, whatItMeans, etc.) follows the existing schema.

```js
export const NY_RPP_235B_ANCHOR = {
  id: "ny-rpp-235b-anchor",
  category: "housing",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY RPP 235-B",
  status: "active",

  // ─── Anchor fields ───
  isAnchor: true,
  anchorSource: {
    url: "https://www.nysenate.gov/legislation/laws/RPP/235-B",
    hash: "a3f5e7b9c2d1...64hex",      // SHA-256 of the readable text content
    lastFetched: "2026-04-30",          // when scripts/check-source-drift.cjs last ran
  },
  lastFormallyReviewed: "2026-04-30",   // attorney sign-off date (NOT the looser lastVerified)
  formallyReviewedBy: "Anthony DiMarzo + WebSearch corroboration", // who signed
  pendingLegislation: null,             // ["A1234", "S5678"] when bill tracker flags affecting bills
  sourceChangedSince: null,             // "YYYY-MM-DD" when hash diff detected, null until re-reviewed

  // ─── Standard entry fields (anchor's plain summary lives here) ───
  title: { en: "NY RPP § 235-b — Implied Warranty of Habitability" },
  summary: { en: "..." },
  whatItMeans: { en: "..." },           // The canonical plain-English explanation. Other entries pull from this.
  // ... whoQualifies, yourRights, legalOptions, example, counsel, sources, etc.
};
```

### Non-anchor entries (entries that REFERENCE an anchor)

A regular entry can reference an anchor for its statute summary by adding `statuteAnchor`:

```js
export const HABITABILITY_HEAT_OUTAGE_NY = {
  id: "habitability-heat-outage-ny",
  primaryStatute: "NY RPP 235-B",       // Same statute as anchor
  statuteAnchor: "ny-rpp-235b-anchor",  // Points to the anchor's id

  // This entry focuses on the heat-outage situation specifically.
  // The renderer pulls anchor's whatItMeans for the statute background,
  // and this entry's whatItMeans focuses only on the heat-outage subset.
  whatItMeans: {
    en: "When heat fails between October 1 and May 31, NYC and most NY tenants have specific recourse under § 235-b's implied warranty. (See anchor for the full statute.) Specifically: ..."
  },
  // ... rest of entry
};
```

The renderer interpolates the anchor's content; the entry only contains situation-specific narrative.

## New field reference

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `isAnchor` | boolean | optional, default false | Marks this entry as the canonical anchor for `primaryStatute`. Only one anchor per statute. |
| `anchorSource.url` | string | required if `isAnchor` | Authoritative source URL (statute text on nysenate.gov, ecfr.gov, etc.). |
| `anchorSource.hash` | string | required if `isAnchor` | SHA-256 hex of the readable text content from `url` at `lastFetched` time. |
| `anchorSource.lastFetched` | YYYY-MM-DD | required if `isAnchor` | Date `scripts/check-source-drift.cjs` last hashed the URL. |
| `lastFormallyReviewed` | YYYY-MM-DD | required if `isAnchor` | Attorney sign-off date. Stricter than `lastVerified`. |
| `formallyReviewedBy` | string | required if `isAnchor` | Reviewer identity. "Prof. Gregory Germain" / "Anthony DiMarzo + Empire Justice corroboration" / etc. |
| `pendingLegislation` | string[] \| null | optional | Bill numbers from NYS bill tracker that affect this anchor. `null` when no pending bills. |
| `sourceChangedSince` | YYYY-MM-DD \| null | optional | Date hash-diff detected source change. `null` until a subsequent `lastFormallyReviewed` clears it. |
| `statuteAnchor` | string \| null | optional, on non-anchor entries | Id of an anchor entry. Renderer pulls anchor's plain summary. |

## Why a separate `lastFormallyReviewed` instead of reusing `lastVerified`?

`lastVerified` and `factCheckedBy` were introduced for the bulk fact-check drain — they certify "we re-read this with WebSearch." That's a lower bar than attorney review.

`lastFormallyReviewed` carries higher weight: an attorney (or attorney-equivalent careful reader) signed off on the anchor's plain-English summary as legally accurate. Anchors get reviewed less often than entries get fact-checked, but the review is more authoritative.

A non-anchor entry that references an anchor inherits the anchor's `lastFormallyReviewed`. The entry's own `lastVerified` covers the situation-specific narrative.

## What an anchor source URL should be

In priority order:

1. **Cornell Law School Legal Information Institute** (`law.cornell.edu`) — stable, simple HTML, easy to hash. First choice for federal statutes (USC, CFR).
2. **NYS Senate official statute page** (`nysenate.gov/legislation/laws/...`) — authoritative for NY statutes. Hash-stable for short sections.
3. **NYCRR via Cornell mirror** (`govt.westlaw.com/nycrr` is dynamic — avoid; use Cornell's static mirror when available).
4. **Court self-help page** (`nycourts.gov/courthelp/...`) — for procedural rules where the rule itself is on the court's site.
5. **Federal regulator publication** (CMS, HUD, OSHA, EEOC) — for federal-regulation entries.

What to AVOID as anchor sources:
- News articles (drift constantly)
- Law firm summaries (advocacy not authority)
- Wikipedia (no source guarantee)
- PDF documents (hard to hash readable content stably)
- JavaScript-rendered pages (different per fetch)

## Source-hash methodology

`scripts/check-source-drift.cjs` (step 2) will:

1. Fetch the `anchorSource.url` with a stable User-Agent.
2. Strip script, style, header, footer, navigation tags.
3. Extract readable text (the actual statute / rule body).
4. Normalize whitespace.
5. SHA-256 the resulting string.
6. Compare to stored `anchorSource.hash`.
7. If diff: set `sourceChangedSince` to today and emit a report.

This means the hash is over the *readable content*, not the full HTML. A site nav refresh doesn't trigger a false positive. A statute-text edit does.

## Validator additions (planned, not yet built)

Future `verify-entry-uniqueness.cjs` rules:

- **ANCHOR_REQUIRED_FIELDS**: if `isAnchor: true`, require `anchorSource.url`, `anchorSource.hash`, `anchorSource.lastFetched`, `lastFormallyReviewed`, `formallyReviewedBy`. FAIL.
- **ANCHOR_UNIQUENESS_PER_STATUTE**: only one anchor per `primaryStatute`. FAIL on collision.
- **ANCHOR_REFERENCE_VALID**: `statuteAnchor` must point to an existing entry id with `isAnchor: true`. FAIL if dangling.
- **ANCHOR_HASH_FORMAT**: `anchorSource.hash` must be 64 lowercase hex chars (SHA-256). FAIL on malformed.
- **ANCHOR_STALE_REVIEW_WARN**: `lastFormallyReviewed` >12 months old → WARN. UI banner.
- **ANCHOR_SOURCE_CHANGED_WARN**: `sourceChangedSince` set → WARN. UI banner.

## Renderer additions (planned, not yet built)

`scripts/prerender-legal.cjs` and `LegalLibrary.jsx` will:

- For entries with `statuteAnchor`: load the anchor entry and render anchor's `whatItMeans.en` as a "What the law says" section above the entry's situation-specific content.
- For entries (anchor or not) where the anchor has `sourceChangedSince` or `pendingLegislation`: render a yellow banner: "The source text for this statute has changed since the last attorney review. Verify with the current statute before relying on this entry."
- For entries (anchor or not) where the anchor's `lastFormallyReviewed` is >12 months old: render a milder banner: "Last attorney review of the underlying statute was X months ago. Consider re-checking before action."

## Migration approach

**Not a big-bang migration.** The redo workflow is the migration vector.

1. Identify the top 20 most-cited statutes across all `primaryStatute` fields.
2. For each, pick the existing entry with the cleanest plain-English summary as the anchor candidate.
3. Add `isAnchor: true` and the new fields to that entry.
4. Run `scripts/check-source-drift.cjs` to populate the initial hash.
5. Attorney-review the anchor's `whatItMeans` and set `lastFormallyReviewed` + `formallyReviewedBy`.
6. As OTHER entries are touched (existing redo workflow), if their `primaryStatute` matches an anchor, add `statuteAnchor: "<anchor-id>"` and trim duplicate statute restatement from their `whatItMeans` (anchor-pull will fill that role at render time).

Net effect: anchors retire duplication where it lives, one cited statute at a time.

## What this DOES NOT solve

(See Claude memory `project_legal_entry_drift_architecture_2026_04_30.md` for full list.)

- Case-law drift (judicial reinterpretation without statute change). Needs separate `caseAnchor` shape later.
- Un-cited statute changes (a related statute affects the entry but isn't directly referenced).
- Agency-program changes without statute change (HEAP rules updated by OTDA). Programs need their own drift mechanism.
- Wrong anchors. The architecture concentrates risk; mitigation is upfront formal review + hash-detection of upstream change.

## Step-1 deliverable (this file)

This document IS step 1. Schema is specified; example shape is shown; validator/renderer additions are listed for future steps. No entries, validators, or renderers have been modified yet.

**Step 2** (next): scaffold `scripts/check-source-drift.cjs`.

**Step 3**: identify top-20 most-cited statutes for first anchors.

**Step 4** (incremental): write the first 1-3 anchors and let the redo workflow flow through them.
