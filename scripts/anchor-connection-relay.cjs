// scripts/anchor-connection-relay.cjs
//
// Fresh-check CONNECTION audit. Reviewer focuses on the operational data
// that connects the user to a service: phone numbers, hours of operation,
// addresses, websites, intake processes, languages spoken, eligibility
// cutoffs, required documents, response times.
//
// What it catches: stale phone numbers, wrong hours, dead URLs, intake
// process described one way but the org actually does it another way,
// language claims that don't match what the org publishes. The "connect
// the user to the service" layer — if any of this is wrong, even a
// perfect statute explainer fails because the person can't actually
// reach help.
//
// Usage:
//   node scripts/anchor-connection-relay.cjs <entry-id>

const fs = require('fs');
const path = require('path');
const { relay } = require('./lib/relay.cjs');

const id = process.argv[2];
if (!id) { console.error('Usage: node scripts/anchor-connection-relay.cjs <entry-id>'); process.exit(1); }
const entryPath = path.join('src', 'data', 'legal', 'entries', id + '.js');
if (!fs.existsSync(entryPath)) { console.error('Entry not found: ' + entryPath); process.exit(1); }
const entryText = fs.readFileSync(entryPath, 'utf8');

const prompt =
'You are auditing the OPERATIONAL DATA that connects users to services\n' +
'in a NY legal entry from helpfinder.help. Do NOT verify statutes — that\n' +
'is a separate audit. Do NOT check voice — also separate.\n' +
'\n' +
'Your job is the data that determines whether a real person can actually\n' +
'reach the help the entry describes. If a phone number is stale, the\n' +
'entry fails its purpose even if the law it explains is perfect.\n' +
'\n' +
'Verify each of the following against the organization\'s own published\n' +
'information (their official website, their listing on lawhelpny.org,\n' +
'their NY State Office of Court Administration listing, their nycourts\n' +
'directory entry):\n' +
'\n' +
'1. PHONE NUMBERS — every phone number in the entry. Does the org\n' +
'   actually publish that number for this kind of inquiry? Is the area\n' +
'   code current? Does the number connect to the team described\n' +
'   (intake, housing, criminal, etc.) or to a different department?\n' +
'2. URLS — every URL in the entry. Is it live? Does it land on the page\n' +
'   the entry says it does? Are there now-canonical URLs the entry\n' +
'   should redirect to?\n' +
'3. ADDRESSES — every address. Does it match the org\'s currently\n' +
'   published location? Are there secondary office locations the entry\n' +
'   should mention for the entry\'s service area?\n' +
'4. HOURS OF OPERATION — does the entry mention hours? If yes, do they\n' +
'   match the org\'s published hours? If no, should hours be added\n' +
'   (e.g., a court walk-in path is useless without knowing when the\n' +
'   court is open)?\n' +
'5. INTAKE PROCESSES — entry says "phone intake," "walk-in," "online\n' +
'   form" — does the org actually intake that way? Is there a current\n' +
'   intake portal, application form URL, or required first-step the\n' +
'   entry should mention?\n' +
'6. LANGUAGES — every `bilingual` and `languages` claim in the counsel\n' +
'   array. Does the org publicly represent those languages on its\n' +
'   contact page? Or does the org only offer interpreters on request?\n' +
'   These are different and should be represented differently.\n' +
'7. ELIGIBILITY CUTOFFS — the entry describes who qualifies for help\n' +
'   (low-income, county-of-residence, etc.). Does the org currently\n' +
'   apply those cutoffs, or have they changed? (e.g., income thresholds\n' +
'   shift annually with federal poverty level updates.)\n' +
'8. REQUIRED DOCUMENTS / PREP — does the entry tell the reader what to\n' +
'   bring or have ready when they call / show up? Is that prep list\n' +
'   accurate and current?\n' +
'9. COURT JURISDICTIONAL LIMITS — claim limits in $5,000 / $3,000\n' +
'   small-claims courts, etc. Have these been amended recently? Are\n' +
'   they current as of 2025-2026?\n' +
'10. RESPONSE TIMES — entry mentions "fair-hearing within 90 days" or\n' +
'    similar deadlines. Are those still the operative numbers?\n' +
'\n' +
'For each issue you flag, name (a) the value the entry currently states,\n' +
'(b) the value the org\'s published source actually shows, and (c) the\n' +
'source URL or directory listing you used to verify.\n' +
'\n' +
'REPORT FORMAT:\n' +
'1. STALE / WRONG DATA — numbered, with current vs published values and\n' +
'   verification source.\n' +
'2. MISSING DATA THE READER NEEDS — numbered (e.g., hours not listed for\n' +
'   a walk-in intake).\n' +
'3. CLAIMS THAT MATCH (BUT WORTH NOTING) — short list of cleared items.\n' +
'4. CONNECTION VERDICT — one line: (a) data is current and complete,\n' +
'   (b) needs updates before shipping, or (c) major operational data\n' +
'   has drifted and requires verification.\n' +
'\n' +
'---ENTRY START---\n' +
entryText +
'\n---ENTRY END---\n';

const stamp = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
const outFile = 'C:/Users/adima/' + id + '-connection-response-' + stamp + '.txt';

console.error('• Sending connection-audit prompt (' + prompt.length + ' chars) for ' + id);
(async () => {
  let response;
  try { response = await relay(prompt, { timeoutMs: 600000, debug: true }); }
  catch (e) { console.error('Relay error: ' + e.message); process.exit(2); }
  if (!response || response.trim().length === 0) { console.error('Empty response.'); process.exit(3); }
  fs.writeFileSync(outFile, response);
  console.error('• Saved connection audit to ' + outFile + ' (' + response.length + ' chars)');
})();
