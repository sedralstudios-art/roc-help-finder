> **Legal Glossary** — shipped 2026-04-15. 75 verified NY terms across every legal-library category. Full handoff in private memory (not in the repo).

# Town Research Handoff

## What's Done
- ALL 28 Monroe County municipalities researched and in code (477 total programs)
- xref cross-reference system implemented (48 programs tagged)
- Click counter built (api/click.js + Vercel Blob)
- Auto-dialer built (call-data/dialer.cjs) — needs evening testing
- Category tabs reorganized for better discoverability
- Privacy audit completed — site is clean
- 62 verification calls pending (call-data/verification-calls.json)
- 5 community groups added (Facebook/mutual aid)
- East Rochester town slug bug fixed (space to hyphen)
- Brockport entries updated with serves:["sweden"] for cross-town coverage

## What's Next
- Rochester re-verification pass (existing entries from untrusted instance)
- Run pending verification calls (62 total)
- Consider adding community Facebook groups as COMMUNITY entries

Rochester needs a re-verification pass (existing entries from untrusted instance).

## Research Pattern Per Town
1. Search: "[Town] NY town hall clerk court assessor phone address hours"
2. Search: "[Town] NY food pantry free food community meals church [zip]"
3. Search: "[Town] NY library senior center recreation programs phone"
4. Search: "[Town] NY health clinic nonprofit community organizations"
5. Search: "[Town] NY animal control building department phone"
6. Search: "[Town] NY Facebook community group support"
7. Search: "[Town/County] NY harm reduction services"
8. Search: "[Town/County] NY naloxone narcan distribution"
9. Search: "[Town/County] NY syringe services program"
10. Search: "[Town/County] NY peer recovery outreach"
11. Search alternate names (e.g. "Brighton-Henrietta")
12. Search each food category DEEP — multiple queries, churches, schools
13. For every financial program found, consider xref tags
14. Only use publicly available info

Note (2026-04-14): queries 7–10 were added after discovering the original pattern systematically missed harm-reduction / peer-outreach / overdose-prevention orgs (Hope Dealers BTC, Trillium SSP, MCDOH Narcan program). Fixed-institution queries don't surface mobile outreach.

## Rules
- 3 independent public sources = verified
- Never dial 24/7 hotlines or protective org numbers
- Only use info organizations make public
- Evening calls only for auto-dialer
- Commit in batches of 4 towns max
- Every entry needs xref consideration

## Entry Format
```js
{ id:"townclerk", n:"Town Clerk", c:"documents", d:"Description.", ph:"585-XXX-XXXX", ad:"Address", url:"https://...", hr:"M-F 9am-5pm", doc:"Varies", tg:["any"], town:"townname", zip:"XXXXX", reach:"local" },
```

## Files
- call-data/dialer.cjs — auto-dialer script
- call-data/phones.json — numbers to dial (build per batch)
- call-data/verification-calls.json — pending verification calls
- call-data/progress.json — dialer progress tracking
- call-data/results.json — transcription results
