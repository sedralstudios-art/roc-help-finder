# Engagement-tree review priority queue

Generated 2026-05-02.  Source: engagement-tree-draft-v1.json.

Score = (tier-gap weight) + (leafCount × 10).  Higher score = push toward attorney tier sooner — these items appear in more leaves and/or are further from the ship threshold.

Top 25 of 52 non-attorney-tier items in the tree:

| # | item | type | leaves | status | score | path to ship-threshold |
|---|---|---|---|---|---|---|
| 1 | `ta` | program | 5 | stamped-only | 130 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 2 | `lawny` | program | 5 | stamped-only | 130 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 3 | `211` | program | 3 | stamped-only | 110 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 4 | `snap` | program | 3 | stamped-only | 110 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 5 | `mow` | program | 3 | stamped-only | 110 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 6 | `myb` | program | 3 | stamped-only | 110 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 7 | `benefits-verification-letter-ny-program` | entry | 1 | unverified | 110 | Run factCheckedBy via WebSearch first; then assess as anchor candidate. |
| 8 | `medicaid` | program | 3 | stamped-only | 110 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 9 | `trill` | program | 3 | stamped-only | 110 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 10 | `wjcny` | program | 3 | stamped-only | 110 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 11 | `vlsp` | program | 3 | stamped-only | 110 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 12 | `communityplace` | program | 2 | stamped-only | 100 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 13 | `wic` | program | 2 | stamped-only | 100 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 14 | `fec` | program | 2 | stamped-only | 100 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 15 | `chip` | program | 2 | stamped-only | 100 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 16 | `epic` | program | 2 | stamped-only | 100 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 17 | `ofa` | program | 2 | stamped-only | 100 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 18 | `foodlink` | program | 1 | stamped-only | 90 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 19 | `meals` | program | 1 | stamped-only | 90 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 20 | `market` | program | 1 | stamped-only | 90 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 21 | `heap` | program | 1 | stamped-only | 90 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 22 | `herr` | program | 1 | stamped-only | 90 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 23 | `rge` | program | 1 | stamped-only | 90 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 24 | `empower` | program | 1 | stamped-only | 90 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |
| 25 | `bankruptcyhelp` | program | 1 | stamped-only | 90 | Add verified:true + lastVerified + bump fc to current after manual fact-check. |

## Stats

- Items needing review: **52**
  - unverified: 1
  - stamped-only: 42
  - websearch-verified: 5
  - anchor: 4

## Strategic note on programs vs entries

**Entries** have a clear path to attorney tier: promotion to `isAnchor:true` triggers source-drift hashing and the anchor-*-relay audit cycle (currently 5–6 rounds per anchor). 6 anchors live as of 2026-05-02. Memory: `project_anchor_review_difficulty_pattern_2026_05_01.md`.

**Programs** do not currently have an attorney-tier path. Programs carry `verified:true + lastVerified` (manual + dialer-confirmed) but no attorney sign-off. To reach ship threshold for programs, decide:
- Option 1: introduce `programReviewedBy: { name, date, scope }` schema field, populate as attorneys review subsets.
- Option 2: don't require attorney review on programs — only require it on legal entries. Programs are directory listings (phone, hours, address) which are factual not legal-interpretive; web-search verification + dialer + lastVerified is arguably sufficient.

Option 2 is simpler and probably correct: programs surface phone/hours/address which are factual; legal entries surface rights/procedures which need attorney accuracy. If we adopt Option 2, the ship threshold for programs drops to `websearch-verified`, and the ship-readiness audit becomes much more attainable.
