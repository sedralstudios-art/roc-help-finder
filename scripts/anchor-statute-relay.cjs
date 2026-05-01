// scripts/anchor-statute-relay.cjs
//
// Fresh-check statute audit for an anchor entry. Every round runs this
// exact prompt — NO references to prior rounds, NO statute tree given to
// the reviewer, NO "specific questions to answer." The reviewer receives:
//   1. What the entry is (audience, purpose)
//   2. The UPL/voice constraints on what fixes can suggest
//   3. The report format
//   4. The entry verbatim
//   5. "audit it. check everything."
//
// Why fresh-check: directive prompts anchor the reviewer to the prompt
// author's mental model, which is exactly the set of things least likely
// to be wrong (the prompt author has already thought about them). Blind-
// spot catches require the reviewer to investigate independently. See
// project_anchor_review_difficulty_pattern_2026_05_01.md correction.
//
// Usage:
//   node scripts/anchor-statute-relay.cjs <entry-id>
//
// Output:
//   /c/Users/adima/<entry-id>-statute-response-<HHMMSS>.txt
//
// Pre-req: scripts/relay-chrome-launch.cjs is running and you're logged
// into claude.ai in that Chrome instance.

const fs = require('fs');
const path = require('path');
const { relay } = require('./lib/relay.cjs');
const { OUTPUT_DISCIPLINE } = require('./lib/audit-discipline.cjs');

const id = process.argv[2];
if (!id) {
  console.error('Usage: node scripts/anchor-statute-relay.cjs <entry-id>');
  process.exit(1);
}

const entryPath = path.join('src', 'data', 'legal', 'entries', id + '.js');
if (!fs.existsSync(entryPath)) {
  console.error('Entry not found: ' + entryPath);
  process.exit(1);
}
const entryText = fs.readFileSync(entryPath, 'utf8');

const prompt =
'You are auditing a NY legal entry from helpfinder.help — a free, plain-\n' +
'English legal-rights site for non-lawyer readers in New York (focus area:\n' +
'Rochester / Monroe County, but the entry covers state law).\n' +
'\n' +
'CONSTRAINTS on suggested fixes:\n' +
'- Voice: third-person, no second-person you/your, no directive imperatives.\n' +
'  This is an explainer, not advice. Suggested fixes that violate these\n' +
'  rules will be rejected.\n' +
'- Plain English at roughly a 6th-grade reading level.\n' +
'- Statute citations should be tail-tagged (RPAPL § 753(1)) not\n' +
'  sentence-fronted ("Under Real Property Actions and Proceedings Law\n' +
'  § 753(1) a tenant has the right to ...").\n' +
'- The site has a separate Legal Glossary; defined terms (security deposit,\n' +
'  punitive damages, wear and tear, small claims, etc.) should NOT be\n' +
'  redefined inline in the entry.\n' +
'\n' +
'Audit the entry against primary statutory sources (FindLaw, Justia, NY\n' +
'Senate, NY courts official sites, NY AG publications). Check everything.\n' +
'Do not treat anything as already verified. Verify every:\n' +
'- statute citation against the actual statute text\n' +
'- subdivision reference against the actual subdivision\n' +
'- dollar amount, deadline, percentage\n' +
'- case citation\n' +
'- contact info (phone, URL, court name) at a high level\n' +
'- recent statutory change (any amendment in the last ~3 years)\n' +
'\n' +
'Surface anything wrong. Surface anything missing that a tenant /\n' +
'consumer / homeowner / etc. would actually need to know. Surface\n' +
'anything that could mislead a real reader. Do NOT defer to the entry\'s\n' +
'framing — if a section is incomplete, say so. If a referenced statute\n' +
'has been amended, flag the amendment.\n' +
'\n' +
'REPORT FORMAT:\n' +
'1. SUBSTANTIVE ISSUES (would mislead a reader) — numbered, with statutory\n' +
'   citation and the exact statutory text where relevant.\n' +
'2. PRECISION / WORDING ISSUES — numbered.\n' +
'3. VERIFIED CLAIMS — one line per cleared claim.\n' +
'4. SHIP VERDICT — one line: (a) clean enough to ship, (b) needs fixes\n' +
'   before shipping, or (c) needs significant rewrite.\n' +
'\n' +
'Do NOT rewrite the entry. Just identify what needs fixing.\n' +
OUTPUT_DISCIPLINE +
'\n---ENTRY START---\n' +
entryText +
'\n---ENTRY END---\n';

// Time-stamp the output so multiple rounds in one day don't overwrite each
// other.
const stamp = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
const outFile = 'C:/Users/adima/' + id + '-statute-response-' + stamp + '.txt';

console.error('• Sending statute-audit prompt (' + prompt.length + ' chars) for ' + id);
(async () => {
  let response;
  try {
    response = await relay(prompt, { timeoutMs: 600000, debug: true });
  } catch (e) {
    console.error('Relay error: ' + e.message);
    process.exit(2);
  }
  if (!response || response.trim().length === 0) {
    console.error('Relay returned empty response.');
    process.exit(3);
  }
  fs.writeFileSync(outFile, response);
  console.error('• Saved statute audit to ' + outFile + ' (' + response.length + ' chars)');
})();
