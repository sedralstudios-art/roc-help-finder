# eviction-process-ny — anchor review log

Anchor for **NY RPAPL § 753** (one-year hardship stay + 30-day lease-breach cure) and the surrounding Article 7 procedural chain.

Source: https://www.nysenate.gov/legislation/laws/RPA/753

First anchor produced via the relay-driven workflow (`scripts/relay.cjs` → claude.ai over CDP).

---

## R1 — 2026-05-01 (relay-driven, 11 issues)

**Substantive (would mislead a tenant):**

1. **Title error.** My initial title "14-Day Cure Right (RPAPL 753)" conflated two unrelated provisions. RPAPL § 753 contains no 14-day cure right. The 14-day periods in NY eviction live in § 711(2) (pre-filing rent demand) and § 749(2)(a) (sheriff's notice). The actual post-judgment cure in § 753 is **30 days** under § 753(4), and applies only to lease-breach holdovers — not nonpayment. Title rewritten to "NY Eviction Process — Notice, Hearing, Warrant, Cures, and the One-Year Hardship Stay."

2. **§ 753(4) post-judgment 30-day cure stay omitted entirely.** Statute: "If the proceeding is based upon a claim that the tenant or lessee has breached a provision of the lease, the court shall grant a thirty day stay of issuance of the warrant, during which time the respondent may correct such breach." HSTPA 2019 expanded this from 10 to 30 days. Added to whatItMeans (subdivision-tagged as § 753(4)) and as a new yourRights item.

3. **§ 753(3) "objectionable occupant" carve-out omitted.** One-year stay unavailable when landlord proves the tenant is an objectionable occupant. Added to the § 753(1) stay paragraph in whatItMeans and to the § 753(1) yourRights item.

4. **§ 853 attorney-fees claim is wrong.** Statute provides treble damages only — no attorney-fee provision. Removed "plus attorney fees" from both whatItMeans and yourRights. Replaced with: fees may be available under RPL § 234 if the lease has a one-way fee clause (§ 234 reciprocates).

5. **§ 853 "up to triple damages" imprecise.** Statute provides treble (3×) damages — multiplier is fixed at 3×, not "up to" 3×. The award itself is discretionary (Lyke v. Anderson, Mannion v. Bayfield Dev. Co.). Rewrote both occurrences to "treble (3×) damages — the multiplier is fixed at three times actual damages when the court awards damages, and the award itself is at the court's discretion."

**Precision / wording:**

6. **§ 226-c tier boundary ambiguity at 1 year and 2 years.** Statute trigger uses "less than" and "at least," not "one to two years." Rewrote yourRights item to "30 days if … less than one year (or has a lease shorter than one year), 60 days if the occupancy or lease is at least one year but less than two, and 90 days if the occupancy or lease is at least two years."

7. **§ 226-c lease-length alternative trigger omitted.** Tier turns on occupancy length OR lease term, whichever applies. A tenant on Day 1 of a 2-year lease gets 90 days, not 30. Added to whoQualifies item.

8. **HSTPA 2019 amendments to § 753(1) not flagged.** Pre-HSTPA: NYC-only, 6-month max, holdover-only. Post-HSTPA: statewide, 1-year max, also nonpayment. Added a leading sentence to the § 753 paragraph: "The 2019 Housing Stability and Tenant Protection Act (HSTPA) reshaped § 753 — what used to be a NYC-only, six-month maximum, holdover-only stay is now statewide, up to one year, and available in nonpayment cases too."

9. **§ 753 references subdivision-blind throughout.** Tagged § 753(1) hardship stay, § 753(2) deposit, § 753(3) objectionable-occupant carve-out, § 753(4) lease-breach cure throughout whatItMeans and yourRights.

10. **§ 751 not mentioned.** § 751 is a separate stay path that lives outside NYC — directly relevant for Rochester. Added as its own yourRights item and to the § 753 paragraph in whatItMeans.

11. **`primaryStatute: "NY RPA 753"` non-standard short form.** Codebase convention from `scripts/lib/parse-statute.cjs` is `NY {DEPT} {SECTION}` form (e.g., NY GOB 7-108, NY RPP 235-B). Auditor's flag is moot — leaving as-is.

**LASROC bilingual fix applied preemptively** (same correction made on security-deposit-ny anchor): bilingual changed from `true / ['es']` to `false / []`, with "Spanish and ASL interpreters available on request" added to access.

---

## Workflow note

R1 was produced via `node scripts/relay.cjs --file eviction-r1-prompt.txt --out eviction-r1-response.txt --debug --timeout 600`. End-to-end relay through claude.ai took ~3 minutes for a 9,742-char audit response. No copy-paste required between local Claude Code and browser-side Claude. This is the first anchor where the audit relay was automated.

The R1 prompt included an explicit statute tree (RPAPL 711 / 731 / 733 / 735 / 743 / 744 / 745 / 747 / 749 / 753 / 755 / 853 + RPL 226-c + Good Cause) per the [anchor review difficulty pattern](../../../../.claude/projects/C--Users-adima/memory/projects/project_anchor_review_difficulty_pattern_2026_05_01.md) lesson — give the auditor the map upfront so it doesn't surface "you missed §X" issues that aren't actually missed. The lesson worked: R1 surfaced § 751 (which I had missed) and § 753(4) (which I had missed) but didn't flag any "missed §X" that I had actually included.

---

## Voice pass — 2026-05-01 (relay-driven)

The voice-relay caught 7 issues I'd reintroduced when applying R1 statute fixes:
- Citation parade in yourRights — items 2, 5, 6, 7, 8, 9, 10 all prefixed "under Real Property Actions and Proceedings Law § …" (the exact pattern I had flattened in security-deposit-ny). Rewrote with shorthand (RPAPL) on second mention; cites moved to tail tags.
- "Stage two — special proceeding filed in local court" → "Stage two — the case is filed in local court."
- "Stays under § 753" header → "Asking the court for more time after judgment."
- Inline redefinition of habitability and retaliation (both in glossary). Dropped parentheticals.
- "Posting an undertaking" → "putting up money as security" (undertaking is jargon, not in glossary).
- "Post-judgment cure stay" → "30-day pause after judgment."
- whatItMeans was one ~700-word paragraph. Added paragraph breaks at each Stage transition + Self-help / Asking-for-time sections.

Also made a discovery worth saving as a memory: the voice-relay caught patterns I'd just reintroduced — meaning the voice-relay step is a real second-look guard against drift between rounds, not just a styling pass.

---

## R2 — 2026-05-01 (relay-driven, 8 substantive + 8 precision)

**Substantive (would mislead a tenant):**

1. § 753(1) hardship list incomplete + misquoted. Statute: "serious ill health, significant exacerbation of an ongoing condition, a child's enrollment in a local school, and any other extenuating life circumstances." Entry was missing the chronic-condition prong, said "illness" not "ill health," dropped "local" from school. Rewrote.

2. § 753(1) substantial-hardship-to-LANDLORD clause missing. Court must balance landlord hardship in deciding stay (Chestnut House LLC v. Dolson 2023). Added: "The court also weighs any substantial hardship the stay would impose on the landlord — § 753(1) is not a one-sided tenant lever; the court balances both sides."

3. § 753(3) scope mis-stated. Statute says "shall not apply" — the entire § 753 (including § 753(4) cure) drops away in objectionable-occupant cases. Rewrote: "takes the entire § 753 off the table … no one-year stay AND no 30-day cure stay."

4. RPAPL § 768 (criminal unlawful eviction) missing entirely. Class A misdemeanor + $1,000-$10,000 per violation + up to $100/day for failure to restore. NY AG guidance directs local police/DA enforcement. Added to whatItMeans + new yourRights item.

5. RPAPL § 713(10) restoration remedy missing. Faster than § 853 damages action. For a tenant on the street, restoration is often more important. Added to whatItMeans + new yourRights item.

6. RPL § 235-e reminder-notice affirmative defense missing. HSTPA-added. Landlord must send certified-mail reminder when rent unpaid 5 days; failure is an affirmative defense. Added to defenses list + new entry in whatItMeans Stage one.

7. RPL § 231-c Good Cause notice requirement missing (effective Aug 18, 2024). Predicate notices (incl. 14-day rent demand) must append/contain the § 231-c notice — even in non-opt-in localities (with checkbox). Active basis for dismissal. Added to Stage one + defenses list.

8. James example overstated Good Cause coverage. Rewrote example to specify a 12-unit building (above the small-landlord 1-unit and owner-occupied ≤10-unit exemptions) and confirm Good Cause coverage explicitly.

**Precision:**

11. § 751 framing conflated subdivisions. Split § 751(1) (statewide redemption — deposit rent + interest + costs OR post bond) from § 751(4)(a) (outside-NYC discretionary stay capped at four months, largely subsumed by § 753(1) post-HSTPA).

12. § 753(1) "neighborhood" definition added (outside NYC: same town/village/city OR school district where children attend/eligible).

13. § 745 description fleshed out — added the post-HSTPA rent-deposit rule (can't be required until tenant's second adjournment OR 60 days on calendar; first adjournment by unrepresented tenant doesn't count).

14. § 753(2) installment-payment option added (HSTPA expansion).

15. § 753(4) "30-day pause after judgment" → "30-day stay of issuance of the warrant" (precision).

**Validator catch:** introduced 4 unescaped double quotes in whatItMeans ("append or contain" the § 231-c notice; defines "neighborhood" as ...). Validator FAILed correctly. Removed the embedded quotes.

**Sources expanded** to include direct nysenate.gov links for §§ 711, 713, 749, 751, 768, 853 + RPL § 235-e and § 231-c.

**Issues left for R3:** §853 discretionary-vs-mandatory framing (Issue 9) — entry hedges appropriately as written; § 234 reciprocity for § 853 actions (Issue 10) — entry hedges appropriately. Rochester Good Cause Council vote Dec 17 2024 / Mayor Evans signed Jan 10 2025 (Issue 16) — date precision worth adding if R3 surfaces it again.

---

**Status:** R3 pending. Provisional, pending attorney sign-off.
