# Engagement-tree verification audit

Generated 2026-05-02. Tree: engagement-tree-draft-v1.json.

Per Anthony 2026-05-02 product-bar: every linked entry/program must reach **attorney-reviewed or anchor** tier before the questionnaire ships. This audit shows where each currently sits.

## Tier counts

| Tier | Count | Meaning |
|---|---|---|
| anchor | 7 | isAnchor:true + lastFormallyReviewed (even so, "provisional pending attorney sign-off") |
| attorney-reviewed | 0 | factCheckedBy names an attorney (Germain, etc.) |
| **— SHIP THRESHOLD —** | 7 | Items at or above this tier are ready to ship |
| websearch-verified | 6 | factCheckedBy tool=websearch (or program verified:true) — needs upgrade |
| stamped-only | 2 | Has fc stamp but no recognized tier — needs review |
| unverified | 1 | No stamps at all — needs review |
| missing | 0 | Item id doesn't resolve — fix required |

**Ship-ready items: 7 / 86 (8.1%)**

**Ship-ready leaves: 16 / 25** (a leaf is ship-ready only if every item in it is at attorney-reviewed or anchor tier)

---

## Items by tier

### anchor (7)

- `clean-slate-ny` (entry) — lastFormallyReviewed 2026-05-01 — appears in 2 leaf(es)
- `eviction-process-ny` (entry) — lastFormallyReviewed 2026-05-01 — appears in 2 leaf(es)
- `security-deposit-ny` (entry) — lastFormallyReviewed 2026-05-01 — appears in 1 leaf(es)
- `tenant-habitability-ny` (entry) — lastFormallyReviewed 2026-05-01 — appears in 2 leaf(es)

### websearch-verified (6)

- `snap-rights-ny` (entry) — factCheckedBy websearch 2026-04-30 — appears in 2 leaf(es)
- `tenant-paint-lead-safe-ny` (entry) — factCheckedBy websearch 2026-04-30 — appears in 1 leaf(es)
- `wage-theft-ny` (entry) — factCheckedBy websearch 2026-04-30 — appears in 1 leaf(es)
- `workers-compensation-ny` (entry) — factCheckedBy websearch 2026-04-30 — appears in 1 leaf(es)
- `wrongful-termination-ny` (entry) — factCheckedBy anchor-statute-relay-r1 2026-05-02 — appears in 1 leaf(es)

### stamped-only (2)

- `able-account-disability-savings-ny` (entry) — factCheckedBy websearch+webfetch 2026-04-26 — appears in 1 leaf(es)
- `child-support-ny` (entry) — factCheckedBy websearch+webfetch 2026-04-27 — appears in 1 leaf(es)

### unverified (1)

- `benefits-verification-letter-ny-program` (entry) — no factCheckedBy stamp — appears in 1 leaf(es)

## Per-leaf shippability

| Leaf | Ship-ready? | Lowest item tier | Items |
|---|---|---|---|
| `leaf-money-rent` | ✓ | verified-program | 5 |
| `leaf-money-food` | ✗ | websearch-verified | 7 |
| `leaf-money-utilities` | ✓ | verified-program | 4 |
| `leaf-money-debt` | ✓ | verified-program | 3 |
| `leaf-money-cash` | ✗ | unverified | 5 |
| `leaf-health-insurance` | ✓ | verified-program | 3 |
| `leaf-health-rx` | ✓ | verified-program | 3 |
| `leaf-health-crisis` | ✓ | verified-program | 4 |
| `leaf-health-clinic` | ✓ | verified-program | 4 |
| `leaf-work-fired` | ✗ | websearch-verified | 4 |
| `leaf-work-injury` | ✗ | websearch-verified | 3 |
| `leaf-work-wages` | ✗ | websearch-verified | 3 |
| `leaf-work-training` | ✓ | verified-program | 2 |
| `leaf-housing-eviction` | ✓ | verified-program | 4 |
| `leaf-housing-homeless` | ✓ | verified-program | 3 |
| `leaf-housing-unsafe` | ✗ | websearch-verified | 4 |
| `leaf-housing-deposit` | ✓ | verified-program | 3 |
| `leaf-family-baby` | ✓ | verified-program | 3 |
| `leaf-family-split` | ✗ | stamped-only | 2 |
| `leaf-family-caregiving` | ✓ | verified-program | 3 |
| `leaf-status-record` | ✗ | websearch-verified | 4 |
| `leaf-status-senior` | ✓ | verified-program | 4 |
| `leaf-status-disability` | ✗ | stamped-only | 2 |
| `leaf-status-reentry` | ✓ | verified-program | 2 |
| `leaf-not-sure` | ✓ | verified-program | 2 |

