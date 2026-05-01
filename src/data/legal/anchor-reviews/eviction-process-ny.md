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

**Status:** R2/R3 pending. Provisional, pending attorney sign-off.
