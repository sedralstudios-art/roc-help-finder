# security-deposit-ny — anchor review log

Anchor for **NY GOB § 7-108** (security deposit cap, 14-day return, forfeiture, punitive damages).
Source: https://www.nysenate.gov/legislation/laws/GOB/7-108

---

## R1 — 2026-05-01 (initial expert review, 5 issues)

**Highest-priority error: exemption scope conflation.** Entry was conflating two
different scopes. Continuing-care retirement, assisted-living, adult-care,
senior residential (with AG offering plan), and not-for-profit independent
retirement (with personal emergency response, housekeeping, transportation,
meals) are FULLY exempt from § 7-108 (no cap, no 14-day rule, no forfeiture,
no punitive). Seasonal-use and owner-occupied co-op are exempt ONLY from the
one-month cap (14-day rule still applies). Restructured.

R1 added the missing 6th category (not-for-profit independent retirement).

**Other:**
- Empire Justice Center REMOVED from counsel — they do impact litigation, not
  individual security-deposit cases (their site explicitly redirects tenants
  to Tenant Defense Project / income-eligible orgs).
- LawNY Geneva office (315-781-1465) added — serves Livingston / Ontario /
  Seneca / Wayne / Yates. Example county changed from Livingston to
  Brighton/Monroe to match listed Rochester office.
- JustCause access corrected from MCBA referral to direct phone/online intake.
- Building-sale rule cited to § 7-105 (separate from § 7-108) and "certified
  mail" corrected to "registered or certified mail."

---

## Voice check — 2026-05-01

- Summary plainified ("limits" over "caps," "loses" over "forfeits," "kept on
  purpose, knowing the rule" over "willful violations," "extra penalty" over
  "punitive damages").
- yourRights and legalOptions stripped of the § 7-108(1-a)(X) citation parade
  — plain rights statements.
- Statute terms (punitive damages, wear and tear, security deposit, small
  claims) left intact since the glossary defines them.

---

## R2 — 2026-05-01 (FindLaw / Justia / NY AG / NYS OCA primary-source verification, 6 issues)

1. **Forfeiture rule:** added Unit 509 LLC v. Toporek, 203 A.D.3d 17 (2022)
   narrowing — forfeiture attaches to failure-to-itemize when landlord retains,
   not other procedural failures.
2. **Pre-move-out walk-through:** added "provided the renter gave at least two
   weeks' notice" qualifier per § 7-108(1-a)(d). (Later corrected in R3.)
3. **Exemption list:** added NYC rent-controlled bucket (governed by § 7-107)
   — was off-by-one, statute lists 6 buckets. (Later corrected in R3 and R4 —
   R2 had the rent-controlled / rent-stabilized treatment wrong.)
4. **Interest rule:** added voluntary-account corollary (small-building
   landlord who voluntarily uses interest-bearing account still owes interest
   less 1% fee) per NY AG guide.
5. **Example venue:** moved Aaliyah from Brighton to City of Rochester to
   make Rochester City Court venue clean (pure-Brighton landlord with no
   Rochester nexus would belong in Brighton Town Court).
6. **LASROC:** bilingual changed from `true / ['es']` to `false / []` — LASROC
   offers ASL+Spanish interpreters on request per their contact page, not
   Spanish-bilingual staff.

---

## R3 — 2026-05-01 (statutory-law re-verification, 5 issues)

**CRITICAL CORRECTION to R2:** § 7-107 covers RENT-STABILIZED, not
rent-controlled — R2 had this backwards. Rent-stabilized is governed by
§ 7-107; rent-controlled is governed by city rent and rehabilitation law /
emergency housing rent control law (DHCR-administered), not § 7-107.
whoQualifies and whatItMeans rewritten to separate the two regimes.

**SIGNIFICANT (not pending — already enacted):** § 7-107 was amended by S952B
effective 2025-11-15 to mirror § 7-108(1-a) protections (one-month cap,
14-day return, walk-throughs, forfeiture, punitive damages now apply to
rent-stabilized tenants too). Added to whatItMeans as the most material NY
security-deposit change since HSTPA 2019.

**PRECISION:** "fully exempt from § 7-108" tightened to "fully exempt from
§ 7-108(1-a)" (subdivisions 2–6 still apply technically; tenant-practical
impact is small).

**PRECISION:** pre-move-out walk-through qualifier rewritten — statute
requires offer "after either party's intention to terminate," carve-out is
ONLY when tenant terminates with <2 weeks' notice. Old framing wrongly
suggested any tenant whose lease ran to its scheduled end had to give 2
weeks' notice to be entitled to the walk-through.

**CITATION:** case caption corrected from "Unit 509 LLC v. Toporek" to
"14 E. 4th St. Unit 509 LLC v. Toporek, 203 A.D.3d 17 (1st Dep't 2022)."

---

## R4 — 2026-05-01 (statutory-law re-verification, 1 substantive correction)

**Statute-text reading:** § 7-108(1) applies to ALL dwelling units "unless
such dwelling unit is specifically referred to in section 7-107" — and
§ 7-107 covers rent-stabilized only. The § 7-108(1-a) carve-out list contains
five facility types (continuing-care, assisted-living, adult-care,
senior-residential-with-AG-plan, NFP-retirement); rent-controlled is NOT in
that list. So rent-controlled units are facially covered by § 7-108, with
the DHCR-administered Emergency Housing Rent Control Law / NYC Rent and
Rehabilitation Law adding protections ON TOP of § 7-108, not replacing it.

Both R2 (placed rent-controlled under § 7-107) and R3 (treated rent-controlled
as exempt from § 7-108) had this wrong. R4 corrected.

**OPEN QUESTION pending attorney confirmation:** whether there is a
doctrine / preemption argument that treats rent-controlled as exempt from
§ 7-108 in practice (some secondary sources read it that way), or whether
the statute-text reading governs. Until an attorney confirms, the entry
frames § 7-108 as applying to rent-controlled units with DHCR as an
additional layer.

**Verified end-to-end:**
- S952B amendment claim (signed by Hochul 2025-10-16, effective 2025-11-15,
  DHCR Fact Sheet #9 reissued FS-09 11/2025).
- Toporek citation (203 A.D.3d 17, 159 N.Y.S.3d 419 (1st Dep't 2022),
  followed in Karole and Pickens).
- All other § 7-103 / § 7-105 / § 7-108 / § 7-109 claims verified against
  statute text.

---

## Cleanup — 2026-05-01

Removed the "(Note for NYC rent-controlled tenants: ... pending attorney
confirmation.)" parenthetical from `whatItMeans` — process-state belongs
in this log, not in user-facing copy.

---

## R5 — 2026-05-01 (4 fixes — closes the rent-controlled question)

**Issue #1 — RESOLVES the open question from R4.** § 7-108(1-a) opens with:
"Except in dwelling units subject to the city rent and rehabilitation law or
the emergency housing rent control law, [CCRCs, assisted-living, adult-care,
senior-residential-with-AG-plan, NFP-retirement]..." NYC rent-controlled
units (city rent and rehabilitation law) AND non-NYC rent-controlled units
(emergency housing rent control law) are listed in the SAME exclusion
clause as the facility categories. R3 was right that they're exempt from
the substantive 1-a package; R4 was wrong to treat them as covered with
DHCR as an additional layer. The precision both R3 and R4 missed: rent-
controlled is still covered by § 7-108 at the umbrella level (subdivision
1, and successor-liability subdivisions 2–3), and by §§ 7-103 (interest)
and 7-105 (transfer on sale) — just NOT by 1-a's substantive package.
Rewrote `whoQualifies` ("NOT this entry") and `whatItMeans` (rent-
controlled moved into the exempt-from-1-a list).

**Issue #2 — walk-through wording precision.** The statutory carve-out for
<2-week tenant notice exempts the LANDLORD'S DUTY TO SEND WRITTEN NOTICE of
the right to request the inspection — not the inspection itself. Functional
outcome usually the same (no notice → no request → no walk-through), but
tightened to match statute text.

**Issue #3 — populated `pendingLegislation`.** Added A8078 (would extend
the 14-day deadline to 21 days and add treble damages + attorneys' fees
for willful retention; introduced 2025-2026 session, not yet passed as of
Nov 2025). S6397 / A6423 (security-deposit-alternatives bill) noted by
R5 but not added — A6423 has a name-collision concern with the S952B/A6423
pair that became the § 7-107 amendment now in effect; will verify
independently before adding.

**Issue #4 — jurisdiction scope mismatch.** Entry is `jurisdiction: "us-ny"`
but counsel + courts were Rochester / LawNY-service-area only. Added
LawHelpNY (statewide referral) + Housing Court Answers + Legal Aid NYC to
`legalOptions` so non-Rochester NY users land on something useful. The
Rochester counsel array is still primary because that's the maintainer's
ground-truth verification scope; statewide coverage is now at least one
hop away in the entry rather than absent.

**Issue #5 — `categoryDisclaimer: null`.** Verified — this is a legacy
optional schema field; the active disclaimer is `disclaimer: true` (set).
No action.

**Verified clean by R5:** § 7-108 substantive package, exempt facility
categories (all four characteristics for NFP independent retirement),
seasonal-use + owner-occupied co-op cap-only carve-outs, § 7-103 (6+
threshold + 1% admin fee), § 7-105 (5-day transfer + registered/certified
mail), § 7-109 (AG enforcement), Nov 15 2025 § 7-107 amendment (S952B),
Toporek (203 A.D.3d 17, 159 N.Y.S.3d 419 (1st Dep't 2022)), all phone
numbers, Rochester City Court $5k / town-village $3k limits, example math.
