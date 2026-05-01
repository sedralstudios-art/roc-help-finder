# clean-slate-ny — anchor review log

Anchor for **NY CPL § 160.57** (Clean Slate Act — automatic sealing of older
criminal convictions).
Source: https://www.nysenate.gov/legislation/laws/CPL/160.57

5th anchor candidate. Promoted to anchor 2026-05-01 by parallel session.
Audit relay rounds (R1+) pending — will run in coordinated turns once the
relay-Chrome / `scripts/anchor-statute-relay.cjs` is free of the
eviction-process-ny audit cycle.

---

## Statute tree — what CPL 160.57 interlocks with

The Clean Slate Act sits inside a larger NY record-sealing scheme. The
`project_anchor_review_difficulty_pattern_2026_05_01.md` memory predicts that
multi-statute anchors converge in 5–6 rounds, not 3. CPL 160.57 has at least
six interlocking statutes plus federal overlays, so plan accordingly.

**Direct CPL sealing pathways (NY criminal procedure):**
- **CPL § 160.50** — automatic sealing for cases that ended in the person's
  favor (dismissed, ACD'd, acquitted, DA declined). Different trigger
  (favorable disposition), different scope (arrest + court records sealed
  fully). Anchor entry: `dismissed-case-sealing-ny.js`.
- **CPL § 160.55** — automatic sealing for cases that ended as a violation
  or traffic infraction (not a misdemeanor or felony). Smaller seal — arrest
  record only; final court record stays public. Already cross-cited from
  `dismissed-case-sealing-ny.js`.
- **CPL § 160.57** — THIS ANCHOR. Automatic sealing of older convictions
  (3-year misdemeanor / 8-year felony waits). Effective 2024-11-16.
  Implementation deadline 2027-11-16.
- **CPL § 160.58** — older "drug treatment" sealing pathway (Article 216
  participants). Largely superseded by 160.57 for eligible Article 220
  felonies but still on the books for non-conviction drug-court completers.
- **CPL § 160.59** — petition-based sealing of up to two convictions (max
  one felony) after a 10-year wait. The fallback pathway when 160.57 doesn't
  reach a conviction. Existing entry: `seal-your-record-ny.js`.

**Eligibility carve-out statutes (cross-referenced from § 160.57):**
- **Penal Law Article 220** — controlled-substance offenses. § 160.57(1)(vi)
  carves Article 220 felonies (including Class A drug felonies) IN to Clean
  Slate eligibility, while excluding most other Class A felonies.
- **Penal Law Article 221** — marijuana offenses. Mostly handled by MRTA
  (2021) automatic expungement, separate from § 160.57.
- **Correction Law § 168-a** — sex offense / sexually violent offense
  definitions. § 160.57(1)(b) excludes anyone whose conviction falls into
  these definitions. Cross-references SORA registration.

**Marijuana-specific sealing (separate statute, separate scheme):**
- **Cannabis Law § 36** + **CPL § 160.50(5)** — MRTA automatic expungement
  for pre-2021 marijuana convictions. Different remedy (expungement, not
  sealing) and different scope (specific marijuana offenses only). Existing
  entry: `marijuana-sealing-ny.js`.

**Federal overlays that limit the practical effect of NY sealing:**
- **NICS** (federal gun-purchase background check, 18 USC § 922 +
  implementing regs at 28 CFR Part 25) — retains access to sealed records
  for firearm-eligibility purposes.
- **FBI / federal agency background checks** — federal employment, federal
  licensing, immigration. Federal law generally not preempted by NY sealing.
- **FCRA** (15 USC § 1681) — governs how private background-check companies
  handle sealed records. Cross-cited in `dismissed-case-sealing-ny.js`.
- **Immigration (INA)** — federal immigration consequences attach to the
  conviction independent of state sealing. Cross-cited in body.

**Employment / licensing / housing layers (downstream of sealing):**
- **NY Executive Law § 296(16)** — anti-discrimination for sealed records
  in employment / licensing. Already an entry-level callout for § 160.50;
  applies to § 160.57 sealings too.
- **NY Correction Law Article 23-A** — Fair Chance Act / collateral
  consequences. Cross-references in `fair-chance-act-ban-the-box-ny.js` and
  `certificate-relief-disabilities-ny.js`.

## Subdivision tree of CPL § 160.57 itself

For audit prep, the substantive package is in subdivision 1. Subdivisions
2–5 are mechanical (notice, exceptions, who can still see).

- **§ 160.57(1)** — eligibility criteria
  - (a) DWAI traffic-infraction (3 years from conviction)
  - (b)(i) misdemeanor (3 years from release / sentencing)
  - (b)(ii) felony (8 years from release / sentencing)
  - (vi) Article 220 carve-IN (drug felonies eligible, including Class A drug)
  - (vii)–(viii) ineligibility: pending out-of-state felony charge, corporate
    defendants
  - sex offense / Class A non-drug felony exclusions cross-reference Correction
    Law § 168-a
- **§ 160.57(2)** — process / mechanics of automatic sealing
- **§ 160.57(3)** — effects of sealing
  - (3)(d) — sealed conviction cannot be considered for employment /
    licensing / clearance, except where federal law requires otherwise
- **§ 160.57(4)** — exceptions / who retains access to sealed records
  - law enforcement (state, federal, interstate, international)
  - courts, prosecutors, defense (when person is later a witness or party)
  - firearm-licensing agencies + NICS
  - police / peace officer employer applications
  - SORA-compliance checks
- **§ 160.57(5)** — implementation (rolling 3-year ramp through 2027-11-16)

## Predicted hard areas for R1+ audit

Based on the security-deposit-ny pattern (R2/R3 wrong-twice on the
rent-controlled question before R5 broke through):

1. **Article 220 carve-IN scope.** The statute carves IN Article 220 drug
   felonies even when classified as Class A. Likely audit-vulnerable
   because secondary sources sometimes describe Clean Slate as "no Class A
   felonies eligible" without the drug-felony exception. Body currently
   cites § 160.57(1)(vi) explicitly — verify the subdivision letter.

2. **Subsequent-conviction restart rule.** Body currently says "the clock
   restarts on the earlier conviction at the new date." Statutory text uses
   "such person has not been convicted of any other offense" — needs
   verification whether new offense merely resets the wait or makes the
   earlier conviction permanently ineligible.

3. **Implementation timeline ambiguity.** "Rolling implementation through
   2027-11-16" vs. "effective 2024-11-16 with full automation by
   2027-11-16." Audit should confirm whether eligibility itself is rolling
   (some convictions seal earlier than others) or only the back-end
   automation is rolling (everyone eligible on day 1, courts catch up
   gradually).

4. **§ 160.59 vs. § 160.57 overlap.** Body says the two pathways "operate
   at the same time." Audit whether § 160.59 still has an independent
   purpose for someone who would also be eligible under § 160.57 (e.g.,
   speed — § 160.59 motion may finish before automation reaches them), or
   whether § 160.59 is now functionally a fallback only for the ineligible.

5. **Empire Justice Center in legalOptions.** Security-deposit-ny anchor R1
   removed Empire Justice from counsel because Empire Justice does impact
   litigation, not individual casework. Empire Justice was a Clean Slate
   coalition partner so the connection here is closer, but verify whether
   they accept individual record-sealing intakes or redirect to LawNY /
   Legal Aid / Legal Action Center.

6. **NICS framing.** Body explains NICS as "the National Instant Criminal
   Background Check System, used for gun-purchase background checks."
   Confirm § 160.57(4) (or the equivalent subdivision) names firearm-
   licensing agencies / NICS specifically, vs. that being a downstream
   federal-preemption consequence not in the NY statute itself.

7. **Immigration disclaimer scope.** Body says "federal immigration law may
   still require disclosure of a sealed conviction, and a sealed record does
   not make an offense disappear for immigration purposes." Audit whether
   this is too broad (some immigration relief paths recognize sealing) or
   appropriately conservative.

## R1 — pending

Awaiting relay-Chrome free turn. Per
`project_anchor_review_difficulty_pattern_2026_05_01.md`, run the
unprimed `scripts/anchor-statute-relay.cjs` audit prompt — no statute tree
in the prompt, no mention of these predicted hard areas, no carryover from
prior rounds. The reviewer's value is independent investigation; every
directive in the prompt narrows it.

---

## Voice check — 2026-05-01

- Title is search-natural ("Clean Slate Act," "Automatic Sealing") — passes
  the SEO test from `project_voice_rewrite_seo_tradeoff_2026_05_01.md`.
- Summary is third-person, plain English, ~6th grade. No "you/your/yours."
- Body is third-person throughout. "A person" / "the person" pattern
  consistent.
- No UPL FAIL patterns ("Strategic considerations," "Bottom line:," "Engage
  X counsel") detected.
- Preflight scanner score 0 / 0 issues (verified 2026-05-01 via
  `dist/verification-report-preflight.json`).
- Body word count 509 — well under the 1800-word cap.

---

## Pre-promotion fact-check stamp

Existing `factCheckedBy: { tool: "websearch+webfetch", date: "2026-04-27" }`
predates anchor promotion. Consistent with security-deposit-ny pattern where
`lastFormallyReviewed` (anchor-level) is stricter than `factCheckedBy`
(entry-level). The April fact-check covered the entry's claims at entry
quality; the anchor-level claims need R1+ relay audit before
`lastFormallyReviewed` clears as attorney-equivalent.

---

## R1 — 2026-05-01 (6-audit pipeline applied)

The 6-check audit pipeline ran on the freshly-promoted anchor and surfaced
substantial corrections across statute accuracy, voice, internal consistency,
operational connections, journey, and SEO. Tier-1 (statute + connection)
applied this round; voice applied at end; journey + SEO content-package
opportunities deferred per maintainer instruction.

### Statute fixes (12 of 12 in audit applied)

1. **Misattributed employment right.** § 160.57(3)(d) was being cited as the
   source of the right against employment / licensing / clearance use of a
   sealed record. (3)(d) is actually the **federal carve-out** from sealing
   access. The discrimination right is created by the **NY Human Rights Law
   amendment — Executive Law § 296(16)** — which Clean Slate amended in.
   Replaced the cite throughout `whatItMeans`, `yourRights` bullet 2, and
   `example`.
2. **Probation / parole / PRS supervision bar (§ 160.57(1)(b)(iv)).** The
   waiting-period clock does not start until supervision is fully done.
   Added to `whoQualifies` (items 1 + 2) and to the "How the waiting period
   works" paragraph in `whatItMeans`. The DeShawn `example` timeline
   re-anchored on this rule (clock began 2017, not 2016).
3. **In-state pending-charge bar (§ 160.57(1)(b)(iii)).** Any pending NY
   charge at any level — violation, misdemeanor, or felony — blocks
   sealing. Was missing entirely. Added to `whoQualifies` item 5 and to the
   exclusions paragraph in `whatItMeans`.
4. **Out-of-state-felony-in-past-eight-years bar (§ 160.57(1)(b)(ix)).**
   Added separately from the (b)(viii) pending-charge condition.
5. **Federal-cooperation caveat on (b)(viii) and (b)(ix).** Both apply only
   "if and when appropriate federal authorities grant access to records
   necessary to query to effectuate the purposes of this subparagraph in an
   automated manner." That federal data link is not yet in place, so the
   two out-of-state bars are not currently operative as a practical block.
   Added a dedicated "Federal-cooperation caveat" paragraph.
6. **Citation-depth fix.** Subparagraphs (vi), (vii), (viii), (ix) live
   inside paragraph (b) of subdivision 1, not directly under (1). Cites now
   render as § 160.57(1)(b)(vi), § 160.57(1)(b)(vii), etc.
7. **Article 220 carve-IN tightened.** § 160.57(1)(b)(vi) just removes
   Article 220 offenses from the Class A-felony exclusion. They still must
   clear every other (b) condition. Wording in `whoQualifies`,
   `whatItMeans`, and `yourRights` adjusted to "not blocked by the Class A
   felony exclusion" + "if every other condition is met."
8. **Plea-waiver bar (§ 160.57(4)).** A defendant cannot be required to
   waive Clean Slate eligibility as part of a plea, and any voluntary
   waiver is void. Added a dedicated "Plea waivers don't work" paragraph in
   `whatItMeans` and a new `yourRights` bullet.
9. **Private cause of action.** § 160.57 itself provides damages, including
   punitive damages, for violations of the sealing rules. Civil Rights Law
   § 50-g adds a parallel claim for unauthorized disclosure of a sealed
   record. Added to "If sealing was missed" paragraph in `whatItMeans` and
   as a new `yourRights` bullet. CVR § 50-g is also surfaced at the
   `tags` + `sources` levels.
10. **Clock-restart framing.** Old text: "the clock restarts on the
    earlier conviction at the new date." Fixed to: the prior conviction's
    clock starts over on the same date as the new conviction's clock — so
    a new conviction effectively resets both. Matches statute language.
11. **November 16, 2027 framing.** Old text framed it as the deadline by
    which the court system "finishes setting up the automatic process."
    That conflated two things. Tightened to: 2027 is OCA's back-log
    deadline for sealing pre-effective-date convictions; convictions
    entered after November 16, 2024 follow the running 3-year / 8-year
    schedules with no parallel 2027 deadline.
12. **Access-exception list expanded.** Added NY State Education Department
    (school employment / licensing), NY DMV (driving-related convictions),
    and transportation network companies (Uber / Lyft) under VTL § 1699 to
    the "Who can still see sealed records" paragraph in `whatItMeans`.

### Connection fixes (6 of 6 in audit applied)

1. **Monroe County PD URL fixed.** /publicdefender → /defender. The old URL
   was a 404.
2. **Legal Aid Society of Rochester removed entirely.** LASROC's published
   practice areas (AFC / education / family / housing & consumer /
   immigration) do not include criminal record sealing. Removed from
   `counsel`, `legalOptions`, and the closing referral line in
   `whatItMeans`. Replaced with LawNY's Reentry / Employment Rights project
   as the primary Monroe County referral.
3. **Empire Justice Center removed.** EJC's published service areas
   (civil rights, disability, foreclosure, health, LGBTQ, Social
   Security/SSI, crime victims, worker's rights, government benefits,
   immigration, DV, education) do not include criminal record sealing.
   Removed from `legalOptions`. Was never in `counsel`.
4. **Monroe County PD § 160.59 framing dropped.** PD's published mandate
   is active criminal-case representation under County Law Article 18-B —
   standalone post-conviction § 160.59 motions are not described as a
   service. PD `counsel.focus` now reads as active-case representation;
   `legalOptions` line hedges with "the intake line can confirm whether a
   specific case fits."
5. **Monroe County PD bilingual claim dropped.** PD page links a Language
   Access Plan (interpreter procedure), not bilingual staff. `bilingual`
   set to false; `languages` empty. `access` field notes the LAP.
6. **LawNY language fields adjusted.** LawNY publishes a Spanish "Artículos
   en Español" hub and a Spanish Rochester office brochure, but
   live-representation bilingual capability is not verified. Set
   `languages: ["es"]` (for written materials) with `bilingual: false`.
   Qualifier narrowed to "Low-income Monroe County resident" with a
   pointer to lawny.org/FindaLawyer for callers in LawNY's other 13
   counties.

### Consistency fixes (5 of 5 in audit applied)

- November 2027 framing now consistent across `summary`, `whatItMeans`,
  `yourRights`, `legalOptions`, and `example` — single back-log-deadline
  framing.
- Empire Justice Center / counsel-vs-legalOptions mismatch resolved by
  removing EJC entirely.
- LASROC focus mismatch resolved by removing LASROC entirely.
- LawNY counsel.focus and legalOptions both now mention § 160.59 motion
  preparation explicitly.
- DCJS now appears in `whatItMeans` (the "If sealing was missed" paragraph)
  as well as in `legalOptions` and `yourRights`.

### Voice fixes (all from voice audit applied)

- `whoQualifies` — subdivision tags stripped from all 5 items. Reads as
  plain qualifying conditions, with the parent statute pinned in `summary`
  and `whatItMeans`.
- `yourRights` — subdivision tags stripped. The two cross-statute cites
  retained (Executive Law § 296(16); Civil Rights Law § 50-g) because they
  are different parent statutes, not subdivision tags of § 160.57.
- "imposition of sentence" → "when the person was sentenced" /
  "sentencing" throughout.
- "indigent" → "low-income" throughout.
- "collateral consequences" → "how a record affects jobs, housing, and
  licensing" throughout.
- "the record still exists and is preserved; access is just restricted" →
  "the record still exists, but most people can't see it."
- "Sex-offender-registration compliance checks also retain access" →
  "Agencies that run sex-offender-registration checks also keep access."
- DWAI inline expansion kept in `whatItMeans` (preflight scanner requires
  the expansion somewhere) but stripped from `whoQualifies` per voice
  rule (dwi-dwai is a glossary slug).
- "post-release supervision" given a parenthetical gloss in `example` ("a
  parole-like check-in period").
- `whatItMeans` broken into 9 paragraphs at the natural pivots: framing,
  waiting-period mechanics, exclusions, federal-cooperation caveat,
  job/license/clearance protection, who-can-still-see, plea-waivers,
  missed-sealing-and-violations, parallel-pathway, what-Clean-Slate-doesn't
  -reach, Monroe-County-help.

### Source URL added

Added `nysenate.gov/legislation/laws/EXC/296` to `sources[]` since
Executive Law § 296(16) is now load-bearing for the employment-protection
right. Total `sources` now 4 (well clear of the trust-FAIL gate's ≥ 2
threshold for state-statute entries).

### Word count

`whatItMeans` grew from 509 to ~1052 words. Still well under the 1800-word
hard cap. Body density is the cost of fitting six new substantive items
(supervision bar, in-state pending-charge bar, OOS-felony bar, federal-
cooperation caveat, plea-waiver bar, private cause of action) into one
explainer.

### Validator state after R1

`npm run verify` clean: 0 FAILs, preflight scanner score 0 for
clean-slate-ny.js, anchor-required-fields gate passes, claim-gate stamp
refreshed to `factCheckedBy: { tool: "websearch+webfetch", date:
"2026-05-01" }`, `lastVerified: "2026-05-01"`.

### Deferred from R1 (per maintainer instruction)

These came up in the journey + SEO + connection audits but are out of
scope for R1. Surfacing here so a future round / agent picks them up:

**Journey content-package opportunities (build as separate entries):**
- "How to request your NY criminal-history record (DCJS)" walkthrough —
  IdentoGo + service codes (15464Z suppressed / 15465F unsuppressed) +
  fee + timing + what arrives in the mail.
- "What to say to an employer about a sealed conviction" script entry
  with sample answers, anchored on the § 296(16) right.
- CPL § 160.59 dedicated entry — currently buried inside this anchor.
  People who don't qualify under Clean Slate need a dedicated walkthrough
  with eligibility, where-to-file, DA-notice, timeline, and the prep
  checklist (Certificate of Disposition, notarized Notice of Motion +
  Affidavit in Support, service on every-county DA).
- "My record should be sealed but wasn't" walkthrough — the Nov 2027
  review request, sample cover letter, link to OCA form once it lands.
- "Sealed records and immigration" entry — for non-citizens this is the
  whole question; current entry waves at it.
- "Sealed records and guns / firearm licenses" entry — NICS retains
  access; readers planning a firearm purchase or permit application need
  this spelled out.
- Eligibility wizard (5 questions: type of conviction, year of release,
  any new convictions since, any pending charges, sex-offender
  registration → eligible / not eligible / call a lawyer).
- "Prepping a call to LawNY / LAC about Clean Slate" checklist (dates,
  documents, case numbers).
- Glossary additions: misdemeanor classes, felony classes, Article 220,
  post-release supervision, motion, petition, sentencing court.
- Bundle/package landing page: "I have a NY conviction and I want to move
  on" cross-linking Clean Slate, § 160.59, § 160.50, marijuana sealing,
  Fair Chance Act, the DCJS walkthrough, and the immigration / firearms
  companion entries.
- QR/printable card for reentry programs and parole offices.

**SEO improvements (defer to a later round):**
- Question-format subheaders inside `whatItMeans` ("How long does sealing
  take?" / "What convictions are not eligible?" / "Who can still see a
  sealed record?" / "Is sealing the same as expungement?" / "What if a
  record should have been sealed but was not?" / "How does CPL § 160.59
  differ from Clean Slate?").
- Cluster terms missing from body prose: "second chance" / "second chance
  law", verb-form "expunge" (entry has expungement only), "clear criminal
  record" / "clear my record", "removed from background check", "reentry"
  outside counsel descriptions, "non-violent felony" outside the example.
- Internal-link audit: the SEO audit flagged `rights-when-arrested-ny` as
  a weak cluster fit (pre-conviction vs post-conviction). When CPL
  § 160.50 and CPL § 160.55 dedicated entries exist, they should be
  closer relatedIds than rights-when-arrested-ny.

**Connection nice-to-haves (defer to schema-extension round):**
- Add `address` field to each `counsel` record — LawNY Rochester (One
  West Main Street, 4th Floor, Rochester NY 14614), LAC (NYC office),
  Monroe County PD (10 North Fitzhugh Street, 2nd Floor, Rochester NY
  14614).
- Add `hours` field — LawNY M–F 9am–5pm, PD M–F 9am–5pm, LAC hotline
  hours.
- Add online-intake URLs — LawNY
  (https://lawnyoi.legalserver.org/modules/matter/extern_intake.php?pid=131&h=6637a1).
- Pre-call prep block on DCJS (IdentoGo number 877-472-6915 + service
  codes + fee).
- § 160.59 motion-prep block listing the Certificate of Disposition + DA
  notice + Affidavit-in-Support requirements as a dedicated structured
  field.

**E-E-A-T (waiting on attorney sign-off):**
- The SEO audit flagged that `formallyReviewedBy: "Anthony DiMarzo +
  WebSearch"` is a fact-check workflow attribution, not a credentialed
  reviewer signal. For YMYL legal-rights content, surfacing an attorney
  reviewer with a published practitioner credential (e.g., a LawNY or
  LAC reentry attorney) is the highest-impact single change for
  Helpful-Content trust signals. Out of scope for R1; needed before
  `lastFormallyReviewed` is treated as fully cleared.

### Hard areas predicted in the statute-tree mapping — outcomes after R1

- **Article 220 carve-IN scope** — predicted hard. Audit confirmed the
  prediction (entry was overstating Article 220 as "always eligible").
  Wrong-once pattern, fixed in R1.
- **Subsequent-conviction restart rule** — predicted hard. Audit caught
  the "clock restarts at new date" framing; corrected to "starts over on
  the same date as the new conviction's clock." Wrong-once, fixed in R1.
- **Implementation timeline ambiguity** — predicted hard. Audit
  confirmed the conflation of "OCA's back-log deadline" with "every
  eligible record sealed by 2027." Wrong-once, fixed in R1.
- **§ 160.59 vs. § 160.57 overlap** — held up. Body now states the two
  pathways operate at the same time and explains when § 160.59 still
  matters even for a Clean Slate-eligible person.
- **Empire Justice Center in legalOptions** — confirmed wrong (per the
  security-deposit-ny pattern, EJC does not do individual record-sealing
  casework). Removed.
- **NICS framing** — held up. Statute lists firearm-licensing agencies in
  the access-exceptions; the federal NICS overlay is downstream.
- **Immigration disclaimer scope** — held up. Conservative phrasing
  retained pending attorney sign-off.

The wrong-twice pattern from `project_anchor_review_difficulty_pattern_2026_05_01.md`
did not materialize on R1 — Clean Slate's exemption structure (a single
list of (b)(i)–(ix) eligibility conditions, no nested "Except in" preamble
collapsing two scopes into one) was easier to hold than security-deposit
-ny's § 7-108(1) vs. § 7-108(1-a) two-tier structure. Cross-statute
distinct cites (§ 168-a, § 296(16), § 50-g, Article 220, § 1699) all
landed on first audit.

### Next round

R2 should run the unprimed `scripts/anchor-statute-relay.cjs` audit prompt
fresh (no statute tree, no mention of R1, no carry-over) per the discipline
in `project_anchor_review_difficulty_pattern_2026_05_01.md`. If R2 lands
zero substantive issues, the anchor approaches "rounds done" status,
pending attorney sign-off — which is the gate for `lastFormallyReviewed`
to clear as fully attorney-equivalent rather than "Anthony + WebSearch +
R1+ provisional."
