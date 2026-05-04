# Phone Drift Sweep 2026-05-02

Reads `phone-pole-audit-2026-05-02.json`. Reports canonical poles with spelling-variant drift in `src/data/`.

## Summary

- Canonical poles checked: **56**
- Poles with drift (multiple variants OR off-canonical formatting): **40**
- Poles clean (single variant matching canonical): **16**

## Drift detail

Each entry below is a canonical pole with multiple spelling variants OR a variant that doesn't match the canonical `value`. Sorted by reference count desc — highest-impact at top.

### legalAidRoc (5852324090) — 1184 ref(s)

Canonical `value`: `585-232-4090`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-232-4090` | 12 | ✓ | `src/data/canonical/phones.js:264` |
| `(585) 232-4090` | 1171 | ✗ | `src/data/legal/entries/504-plan-school-rights-ny.js:46` |
| `(585-232-4090` | 2 | ✗ | `src/data/legal/entries/security-deposit-ny.js:49` |

### monroeBarReferral (5855462130) — 511 ref(s)

Canonical `value`: `585-546-2130`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-546-2130` | 1 | ✓ | `src/data/canonical/phones.js:295` |
| `(585) 546-2130` | 511 | ✗ | `src/data/legal/entries/able-account-disability-savings-ny.js:48` |

### empireJustice (5854544060) — 404 ref(s)

Canonical `value`: `585-454-4060`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-454-4060` | 2 | ✓ | `src/data/canonical/phones.js:270` |
| `(585) 454-4060` | 403 | ✗ | `src/data/legal/entries/504-plan-school-rights-ny.js:47` |

### nysAGConsumer (8007717755) — 314 ref(s)

Canonical `value`: `800-771-7755`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `800-771-7755` | 2 | ✓ | `src/data/canonical/phones.js:168` |
| `(800) 771-7755` | 310 | ✗ | `src/data/legal/entries/adult-protective-services-ny.js:48` |
| `1-800-771-7755` | 3 | ✗ | `src/data/legal/entries/plumbing-residential-ny.js:29` |

### lawNY (5853252520) — 191 ref(s)

Canonical `value`: `585-325-2520`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-325-2520` | 7 | ✓ | `src/data/canonical/phones.js:282` |
| `(585) 325-2520` | 184 | ✗ | `src/data/legal/entries/alimony-modification-ny.js:44` |
| `(585-325-2520` | 1 | ✗ | `src/data/legal/entries/security-deposit-ny.js:49` |

### justCause (5852323051) — 150 ref(s)

Canonical `value`: `585-232-3051`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-232-3051` | 9 | ✓ | `src/data/canonical/phones.js:276` |
| `(585) 232-3051` | 141 | ✗ | `src/data/legal/entries/alimony-spousal-support-ny.js:46` |
| `(585-232-3051` | 1 | ✗ | `src/data/legal/entries/security-deposit-ny.js:49` |

### nysDFS (8003423736) — 135 ref(s)

Canonical `value`: `800-342-3736`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `800-342-3736` | 1 | ✓ | `src/data/canonical/phones.js:174` |
| `(800) 342-3736` | 135 | ✗ | `src/data/legal/entries/aca-preventive-care-ny.js:43` |

### nysDOLLaborStandards (8884697365) — 113 ref(s)

Canonical `value`: `888-469-7365`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `888-469-7365` | 2 | ✓ | `src/data/canonical/phones.js:180` |
| `(888) 469-7365` | 104 | ✗ | `src/data/legal/entries/bereavement-leave-ny.js:43` |
| `1-888-469-7365` | 8 | ✗ | `src/data/legal/entries/minimum-wage-ny.js:44` |

### publicDefender (5857534210) — 107 ref(s)

Canonical `value`: `585-753-4210`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-753-4210` | 1 | ✓ | `src/data/canonical/phones.js:94` |
| `(585) 753-4210` | 107 | ✗ | `src/data/legal/entries/access-to-courts-incarcerated-ny.js:42` |

### seniorHEAPViaLifespan (5852448400) — 105 ref(s)

Canonical `value`: `585-244-8400`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-244-8400` | 8 | ✓ | `src/data/canonical/phones.js:59` |
| `(585) 244-8400` | 98 | ✗ | `src/data/legal/entries/adult-home-resident-rights-ny.js:53` |

### nysDHR (8883923644) — 97 ref(s)

Canonical `value`: `888-392-3644`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `888-392-3644` | 4 | ✓ | `src/data/canonical/phones.js:186` |
| `(888) 392-3644` | 94 | ✗ | `src/data/legal/entries/ada-title-iii-public-accommodations-ny.js:44` |

### housingCouncil (5855463700) — 94 ref(s)

Canonical `value`: `585-546-3700`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-546-3700` | 4 | ✓ | `src/data/canonical/phones.js:317` |
| `(585) 546-3700` | 91 | ✗ | `src/data/legal/entries/abandoned-property-after-eviction-ny.js:46` |

### clerk (5857531600) — 80 ref(s)

Canonical `value`: `585-753-1600`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-753-1600` | 2 | ✓ | `src/data/canonical/phones.js:100` |
| `(585) 753-1600` | 79 | ✗ | `src/data/legal/entries/adult-cannabis-personal-use-ny.js:44` |

### bureauInspection (5854286520) — 80 ref(s)

Canonical `value`: `585-428-6520`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-428-6520` | 1 | ✓ | `src/data/canonical/phones.js:323` |
| `(585) 428-6520` | 80 | ✗ | `src/data/legal/entries/abandoned-house-next-door-ny.js:42` |

### main (5857536998) — 76 ref(s)

Canonical `value`: `585-753-6998`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-753-6998` | 9 | ✓ | `src/data/canonical/phones.js:29` |
| `(585) 753-6998` | 68 | ✗ | `src/data/legal/entries/apply-for-benefits-online-ny-program.js:42` |

### nysDMVAbandonedVehicle (5184869786) — 62 ref(s)

Canonical `value`: `518-486-9786`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `518-486-9786` | 2 | ✓ | `src/data/canonical/phones.js:192` |
| `(518) 486-9786` | 61 | ✗ | `src/data/legal/entries/abandoned-vehicle-ny.js:46` |

### main (5857535555) — 51 ref(s)

Canonical `value`: `585-753-5555`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-753-5555` | 1 | ✓ | `src/data/canonical/phones.js:69` |
| `(585) 753-5555` | 51 | ✗ | `src/data/legal/entries/aed-defibrillator-good-samaritan-ny.js:46` |

### ftcConsumer (8773824357) — 49 ref(s)

Canonical `value`: `877-382-4357`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `877-382-4357` | 2 | ✓ | `src/data/canonical/phones.js:210` |
| `(877) 382-4357` | 48 | ✗ | `src/data/legal/entries/bait-and-switch-advertising-ny.js:28` |

### main (5857536280) — 48 ref(s)

Canonical `value`: `585-753-6280`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-753-6280` | 8 | ✓ | `src/data/canonical/phones.js:85` |
| `(585) 753-6280` | 41 | ✗ | `src/data/legal/entries/aarp-tax-aide-ny.js:26` |

### cfpb (8554112372) — 47 ref(s)

Canonical `value`: `855-411-2372`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `855-411-2372` | 1 | ✓ | `src/data/canonical/phones.js:217` |
| `(855) 411-2372` | 47 | ✗ | `src/data/legal/entries/card-act-credit-card-fees-ny.js:27` |

### centerForDisabilityRights (5855467510) — 44 ref(s)

Canonical `value`: `585-546-7510`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-546-7510` | 1 | ✓ | `src/data/canonical/phones.js:301` |
| `(585) 546-7510` | 44 | ✗ | `src/data/legal/entries/able-account-disability-savings-ny.js:46` |

### nysDCP (8006971220) — 41 ref(s)

Canonical `value`: `800-697-1220`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `800-697-1220` | 1 | ✓ | `src/data/canonical/phones.js:198` |
| `(800) 697-1220` | 41 | ✗ | `src/data/legal/entries/auto-dealer-junk-fees-ny.js:44` |

### workerJusticeCenter (5853253050) — 41 ref(s)

Canonical `value`: `585-325-3050`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-325-3050` | 3 | ✓ | `src/data/canonical/phones.js:307` |
| `(585) 325-3050` | 39 | ✗ | `src/data/legal/entries/break-meal-period-work-ny.js:46` |

### cssnyHealth (8886145400) — 40 ref(s)

Canonical `value`: `888-614-5400`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `888-614-5400` | 2 | ✓ | `src/data/canonical/phones.js:224` |
| `1-888-614-5400` | 12 | ✗ | `src/data/legal/entries/aca-preventive-care-ny.js:45` |
| `(888) 614-5400` | 27 | ✗ | `src/data/legal/entries/cobra-health-insurance-ny.js:47` |

### sheriff (5857534178) — 39 ref(s)

Canonical `value`: `585-753-4178`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-753-4178` | 1 | ✓ | `src/data/canonical/phones.js:106` |
| `(585) 753-4178` | 39 | ✗ | `src/data/legal/entries/check-fraud-stolen-check-ny.js:42` |

### nyStateOfHealth (8553555777) — 37 ref(s)

Canonical `value`: `855-355-5777`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `855-355-5777` | 2 | ✓ | `src/data/canonical/phones.js:143` |
| `1-855-355-5777` | 21 | ✗ | `src/data/legal/entries/aca-preventive-care-ny.js:46` |
| `(855) 355-5777` | 14 | ✗ | `src/data/legal/entries/benefits-verification-letter-ny-program.js:26` |
| `(855-355-5777` | 1 | ✗ | `src/data/programs.js:47` |

### nysPSC (8003423377) — 37 ref(s)

Canonical `value`: `800-342-3377`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `800-342-3377` | 1 | ✓ | `src/data/canonical/phones.js:204` |
| `(800) 342-3377` | 37 | ✗ | `src/data/legal/entries/apartment-electric-submetering-ny.js:26` |

### empowerPlus (8666973732) — 19 ref(s)

Canonical `value`: `866-697-3732`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `866-697-3732` | 2 | ✓ | `src/data/canonical/phones.js:345` |
| `(866) 697-3732` | 18 | ✗ | `src/data/legal/entries/attic-insulation-rebate-ny.js:43` |

### oasasHopeline (8778467369) — 10 ref(s)

Canonical `value`: `877-846-7369`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `877-846-7369` | 2 | ✓ | `src/data/canonical/phones.js:427` |
| `(877) 846-7369` | 7 | ✗ | `src/data/legal/entries/drug-possession-basics-ny.js:51` |
| `1-877-846-7369` | 2 | ✗ | `src/data/legal/entries/narcan-access-ny.js:102` |

### childCare (5857536316) — 9 ref(s)

Canonical `value`: `585-753-6316`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-753-6316` | 2 | ✓ | `src/data/canonical/phones.js:47` |
| `(585) 753-6316` | 8 | ✗ | `src/data/legal/entries/child-care-licensing-ny.js:45` |

### epic (8003323742) — 8 ref(s)

Canonical `value`: `800-332-3742`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `800-332-3742` | 2 | ✓ | `src/data/canonical/phones.js:157` |
| `(800) 332-3742` | 7 | ✗ | `src/data/legal/entries/epic-prescription-seniors-ny.js:42` |

### wic (5857534942) — 7 ref(s)

Canonical `value`: `585-753-4942`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-753-4942` | 2 | ✓ | `src/data/canonical/phones.js:75` |
| `(585) 753-4942` | 6 | ✗ | `src/data/legal/entries/child-car-seat-booster-ny.js:42` |

### rgeMain (8007431701) — 6 ref(s)

Canonical `value`: `1-800-743-1701`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `1-800-743-1701` | 2 | ✓ | `src/data/canonical/phones.js:333` |
| `(800) 743-1701` | 5 | ✗ | `src/data/legal/entries/furnace-repair-scam-ny.js:46` |

### snapAppointmentLine (5857536960) — 4 ref(s)

Canonical `value`: `585-753-6960`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-753-6960` | 2 | ✓ | `src/data/canonical/phones.js:35` |
| `(585) 753-6960` | 4 | ✗ | `src/data/legal/entries/emergency-cash-assistance-ny.js:66` |

### dvHotline (8007997233) — 4 ref(s)

Canonical `value`: `800-799-7233`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `800-799-7233` | 2 | ✓ | `src/data/canonical/phones.js:379` |
| `1-800-799-7233` | 3 | ✗ | `src/data/legal/entries/domestic-violence-legal-options-ny.js:44` |

### crisisText (741741) — 3 ref(s)

Canonical `value`: `Text HOME to 741741`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `741741` | 4 | ✗ | `src/data/canonical/phones.js:137` |

### heapDirect (5857536477) — 3 ref(s)

Canonical `value`: `585-753-6477`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-753-6477` | 3 | ✓ | `src/data/canonical/phones.js:41` |
| `(585) 753-6477` | 1 | ✗ | `src/data/legal/entries/attic-insulation-rebate-ny.js:47` |

### rainn (8006564673) — 3 ref(s)

Canonical `value`: `800-656-4673`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `800-656-4673` | 2 | ✓ | `src/data/canonical/phones.js:403` |
| `(800) 656-4673` | 2 | ✗ | `src/data/legal/entries/child-victims-act-statute-of-limitations-ny.js:50` |

### fosterCareIntake (5857535765) — 2 ref(s)

Canonical `value`: `585-753-5765`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `585-753-5765` | 1 | ✓ | `src/data/canonical/phones.js:53` |
| `(585) 753-5765` | 2 | ✗ | `src/data/legal/entries/foster-care-bill-of-rights-ny.js:45` |

### rgeBillHelp (8772663492) — 2 ref(s)

Canonical `value`: `877-266-3492`

| Variant | Refs | Matches canonical? | Sample |
|---|---|---|---|
| `877-266-3492` | 2 | ✓ | `src/data/canonical/phones.js:339` |
| `1-877-266-3492` | 1 | ✗ | `src/data/programs.js:35` |

## Suggested response

Drift is **not** automatically wrong. The dialer doesn't care about formatting (it strips non-digits). Rendered output to readers also doesn't care. Drift matters when:

1. **Style consistency** is desired across user-facing entries (e.g., always `NNN-NNN-NNNN` per Rochester convention).
2. **Future migration** to canonical pole imports needs a single canonical spelling to replace.
3. **Search-and-replace edits** missed some variants when a number changed.

Each row above can be normalized in-place via a one-shot regex script if a maintainer decides the canonical formatting is the goal. Until then this report is informational.

## Clean poles (no drift)

| Slug | Canonical value | Refs |
|---|---|---|
| `municipal311` | `311` | 153 |
| `emergency911` | `911` | 98 |
| `call211` | `211` | 74 |
| `call988` | `988` | 19 |
| `psychCrisisLine` | `585-275-8686` | 3 |
| `cashRoc` | `585-900-1004` | 3 |
| `main` | `585-275-3535` | 2 |
| `psychEmergency` | `585-275-4501` | 2 |
| `childHealthPlus` | `800-698-4543` | 1 |
| `behavioralHealthClinic` | `585-275-3161` | 1 |
| `childhelp` | `800-422-4453` | 1 |
| `trevorProject` | `866-488-7386` | 1 |
| `transLifeline` | `877-565-8860` | 1 |
| `suicide988Legacy` | `800-273-8255` | 0 |
| `disasterDistress` | `800-985-5990` | 0 |
| `womensLawVAW` | `888-843-9461` | 0 |
