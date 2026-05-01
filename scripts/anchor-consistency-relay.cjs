// scripts/anchor-consistency-relay.cjs
//
// Fresh-check INTERNAL CONSISTENCY audit. Reviewer reads the entry as a
// whole and looks for self-contradictions or misalignment between fields.
// Does NOT verify against external sources — that is the statute relay's
// job. Does NOT check voice — that is the voice relay's job.
//
// What it catches: example contradicts the body, summary contradicts
// what's expanded in whatItMeans, yourRights items conflict with
// legalOptions paths, whoQualifies entries that don't appear in the body
// rules, body rules that don't appear in whoQualifies, paragraph drift
// between rounds.
//
// Usage:
//   node scripts/anchor-consistency-relay.cjs <entry-id>

const fs = require('fs');
const path = require('path');
const { relay } = require('./lib/relay.cjs');

const id = process.argv[2];
if (!id) { console.error('Usage: node scripts/anchor-consistency-relay.cjs <entry-id>'); process.exit(1); }
const entryPath = path.join('src', 'data', 'legal', 'entries', id + '.js');
if (!fs.existsSync(entryPath)) { console.error('Entry not found: ' + entryPath); process.exit(1); }
const entryText = fs.readFileSync(entryPath, 'utf8');

const prompt =
'You are auditing the INTERNAL CONSISTENCY of a NY legal entry from\n' +
'helpfinder.help — a free, plain-English legal-rights site for non-lawyer\n' +
'readers in New York.\n' +
'\n' +
'Do NOT verify any claim against external sources. Do NOT check voice or\n' +
'reading level. Those are handled by separate audits.\n' +
'\n' +
'Read the entry as a whole and find places where the entry contradicts\n' +
'itself or fails to align across fields. Specifically check:\n' +
'\n' +
'1. EXAMPLE vs BODY — does the example follow the rules described in\n' +
'   whatItMeans? If the body says "the landlord must serve a 14-day\n' +
'   notice" and the example skips that step, that is a contradiction.\n' +
'2. SUMMARY vs whatItMeans — does the summary fairly preview what is\n' +
'   expanded later? Does the summary mention rules that disappear from\n' +
'   the body? Does the body include rules the summary contradicts?\n' +
'3. whoQualifies vs whatItMeans — every category in whoQualifies should\n' +
'   appear somewhere in the body rules. Every body rule that turns on\n' +
'   tenant/consumer status should be reflected in whoQualifies.\n' +
'4. yourRights vs legalOptions — do the listed rights have at least one\n' +
'   action path in legalOptions? If yourRights says the tenant can sue\n' +
'   in small claims court, legalOptions should mention small claims.\n' +
'5. yourRights vs whatItMeans — every right listed should be supported\n' +
'   by the rules described in the body. A right with no body support is\n' +
'   suspect.\n' +
'6. Internal contradictions WITHIN whatItMeans — does paragraph 5 say\n' +
'   something paragraph 2 contradicts? When the entry was edited across\n' +
'   rounds, did one paragraph get updated while another didn\'t?\n' +
'7. Statute citation consistency — when the entry references the same\n' +
'   statute multiple times, are the subdivisions consistent? Is the same\n' +
'   rule attributed to the same section every time?\n' +
'8. Numerical consistency — every number, dollar amount, deadline,\n' +
'   percentage that appears more than once — does it match across\n' +
'   appearances?\n' +
'9. Date / time consistency — every date and timeframe — does it\n' +
'   reconcile? Are timelines coherent (e.g., 14 days for X, then 30\n' +
'   days for Y, with Y starting after X — does the math work out)?\n' +
'10. Counsel array vs legalOptions prose — every org named in the\n' +
'    counsel structured array should also appear in legalOptions prose,\n' +
'    and vice versa. Phone / URL / focus should match between the two.\n' +
'\n' +
'REPORT FORMAT:\n' +
'1. CONTRADICTIONS — numbered, with the two conflicting passages quoted\n' +
'   and which one appears correct (or note that you cannot tell from\n' +
'   the entry alone).\n' +
'2. ALIGNMENT GAPS — numbered, with the field pairs that don\'t mesh.\n' +
'3. NUMERICAL / DATE INCONSISTENCIES — numbered.\n' +
'4. CONSISTENCY VERDICT — one line: (a) entry is internally consistent,\n' +
'   (b) minor alignment fixes needed, or (c) significant rewrite needed.\n' +
'\n' +
'---ENTRY START---\n' +
entryText +
'\n---ENTRY END---\n';

const stamp = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
const outFile = 'C:/Users/adima/' + id + '-consistency-response-' + stamp + '.txt';

console.error('• Sending consistency-audit prompt (' + prompt.length + ' chars) for ' + id);
(async () => {
  let response;
  try { response = await relay(prompt, { timeoutMs: 600000, debug: true }); }
  catch (e) { console.error('Relay error: ' + e.message); process.exit(2); }
  if (!response || response.trim().length === 0) { console.error('Empty response.'); process.exit(3); }
  fs.writeFileSync(outFile, response);
  console.error('• Saved consistency audit to ' + outFile + ' (' + response.length + ' chars)');
})();
