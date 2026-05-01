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
