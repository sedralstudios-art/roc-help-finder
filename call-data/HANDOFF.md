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
7. Search alternate names (e.g. "Brighton-Henrietta")
8. Search each food category DEEP — multiple queries, churches, schools
9. For every financial program found, consider xref tags
10. Only use publicly available info

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
