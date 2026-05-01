# Phone Verification Queue

Items Claude or another tool wants a human + phone to verify. Tick the checkbox when done; add a brief outcome line below the item if the verification corrected something.

Bot-blocked items are also tracked machine-readable in `bot-blocked-sources.json` — clearing them via `check-source-drift.cjs --from-text ... --write` removes the JSON entry but does NOT remove this markdown line. Tick it manually when done.

## 2026-05-01

- [ ] **tenant-habitability-ny** (topic) — Searched: NY RPP 235-b warranty habitability current text 2026 amendments
      _Claude's conclusion:_ Last amended Sep 22 2014 (text stable). S5956 in 2025-26 session is PROPOSED — would add punitive damages for intentional/malicious breach. Three covenants: fit for human habitation; fit for intended uses; no conditions dangerous to life/health/safety. Non-waivable. Sources: nysenate.gov, justia 2025 NY Laws, propertyclub.nyc, St John's Law Review.

- [ ] **tenant-habitability-ny** (bot-blocked) — https://www.nysenate.gov/legislation/laws/RPP/235-B
      _To clear:_ open the URL on phone, save readable text to file, run:
      `node scripts/check-source-drift.cjs --from-text tenant-habitability-ny <textfile> --write`
      _Note:_ NYS Senate hard-blocks bots with 403 even with browser UA + transparent bot headers. Phone capture is the only path to populate the anchor's hash with the canonical source.

- [ ] **hvac-residential-ny** (bot-blocked) — https://www.nysenate.gov/legislation/laws/EXC/379
      _To clear:_ open the URL on phone, save readable text to file, run:
      `node scripts/check-source-drift.cjs --from-text hvac-residential-ny <textfile> --write`
      _Note:_ NYS Senate 403 — same block pattern as RPP 235-B. Phone capture needed for hash.

- [ ] **hvac-residential-ny** (bot-blocked) — https://www.nysenate.gov/legislation/laws/EXC/377
      _To clear:_ open the URL on phone, save readable text to file, run:
      `node scripts/check-source-drift.cjs --from-text hvac-residential-ny <textfile> --write`
      _Note:_ CORRECTED url — was /EXC/379 in earlier draft. Expert review caught misattribution: §377 is the actual Code creation; §379 is local-override authority. Re-fetch from the corrected canonical URL.

- [ ] **deceptive-business-practices-ny** (bot-blocked) — https://www.nysenate.gov/legislation/laws/GBS/349
      _To clear:_ open the URL on phone, save readable text to file, run:
      `node scripts/check-source-drift.cjs --from-text deceptive-business-practices-ny <textfile> --write`
      _Note:_ 3rd anchor candidate. NYS Senate 403 — same pattern. Phone capture needed for hash.

- [ ] **tenant-habitability-ny** (claim) — VERIFY: Rochester City Court housing part — entry cites Chapter 464 of Laws of 2021. R3 fact-check confirmed the part exists but did not independently verify chapter number. NY Senate session laws cross-check needed.

- [ ] **tenant-habitability-ny** (claim) — VERIFY: NYC bedbug history disclosure citation — entry says 'NYC Local Law 69 / NYC Admin Code §27-2018.1' in the formallyReviewedBy. Reviewer source found §27-2018 (different sub-section). Confirm whether .1 suffix is right.

- [ ] **deceptive-business-practices-ny** (claim) — VERIFY (HIGH PRIORITY): FAIR Act enacted text. Entry now removes the 5k/3x penalty claim per Covington & Burling Dec 23 2025 alert. Need attorney to read S8416 (Chapter 708 of 2025) directly to confirm: did the higher-penalty tier survive or not? If it did, restore the third bullet.

- [ ] **deceptive-business-practices-ny** (claim) — VERIFY phone numbers (low priority, dialer can do): MCDPS 585-753-3014; Rochester City Court Civil 585-371-3412; JustCause 585-232-3051; Empire Justice 585-454-4060; Tenant Defense Project 585-504-6195; Rochester 311 / 585-428-5990 / NBD general 585-428-6883; Worker Justice Center 585-325-3050; NY DOL wage-theft 888-469-7365; MCBA Lawyer Referral 585-546-2130; CFPB 855-411-2372; FTC 877-382-4357. Already verified: Legal Aid Roc 585-232-4090, LawNY 585-325-2520, NY AG 800-771-7755.
