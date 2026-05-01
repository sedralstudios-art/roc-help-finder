// scripts/anchor-cross-relay.cjs
//
// Fresh-check CROSS-ANCHOR consistency audit. Reviewer reads two or more
// anchors together and looks for places where they contradict each other
// on shared legal points or shared organizational facts.
//
// What it catches: anchor A says §X means one thing, anchor B says §X
// means another. Anchor A lists LASROC bilingual:true, anchor B lists
// bilingual:false. Anchor A's example assumes a rule anchor B's body
// contradicts. Cross-anchor drift that no single-anchor audit can catch.
//
// Usage:
//   node scripts/anchor-cross-relay.cjs <id1> <id2> [<id3>] [...]
//
// Recommend pairing related anchors (housing cluster: security-deposit-ny
// + tenant-habitability-ny + eviction-process-ny). Cross-anchor across
// unrelated areas (HVAC + bankruptcy) produces noise.

const fs = require('fs');
const path = require('path');
const { relay } = require('./lib/relay.cjs');

const ids = process.argv.slice(2);
if (ids.length < 2) {
  console.error('Usage: node scripts/anchor-cross-relay.cjs <id1> <id2> [<id3>] [...]');
  console.error('Need at least 2 anchor ids.');
  process.exit(1);
}

const entries = [];
for (const id of ids) {
  const p = path.join('src', 'data', 'legal', 'entries', id + '.js');
  if (!fs.existsSync(p)) { console.error('Entry not found: ' + p); process.exit(1); }
  entries.push({ id, text: fs.readFileSync(p, 'utf8') });
}

const intro =
'You are auditing the CROSS-ANCHOR CONSISTENCY of ' + entries.length +
' related anchor entries from helpfinder.help. Each entry is a separate\n' +
'NY legal explainer. They share legal context (overlapping statutes,\n' +
'shared organizations, shared procedural concepts) and should not\n' +
'contradict each other.\n' +
'\n' +
'Do NOT verify any single claim against external sources — that is\n' +
'handled by per-entry statute audits. Do NOT check voice or operational\n' +
'data within a single entry — those are also separate audits.\n' +
'\n' +
'Read all ' + entries.length + ' entries together and find places where\n' +
'they conflict with each other or fail to align. Specifically check:\n' +
'\n' +
'1. SHARED STATUTES — when two entries cite the same statute (e.g.,\n' +
'   RPL § 226-c, RPAPL § 753, GOB § 7-108), do they describe the same\n' +
'   rule? Do their subdivision references match? Do their cited\n' +
'   amendments match?\n' +
'2. SHARED ORGANIZATIONS — when two entries reference the same\n' +
'   organization (LASROC, LawNY, JustCause, NY AG), do the phone\n' +
'   numbers match? Does the bilingual / languages field match? Does\n' +
'   the focus described match? If one entry says LASROC offers\n' +
'   in-house Spanish intake and another says interpreters on request,\n' +
'   that is a contradiction.\n' +
'3. SHARED PROCEDURAL CONCEPTS — when two entries describe the same\n' +
'   procedure (e.g., small claims court process, AG complaint intake,\n' +
'   warrant of eviction), do they describe it the same way? Do timelines\n' +
'   match? Do dollar limits match?\n' +
'4. SHARED EXAMPLES / FACT PATTERNS — if two entries use similar fact\n' +
'   patterns (e.g., a Brighton tenant; a Rochester landlord), do they\n' +
'   reach consistent legal conclusions?\n' +
'5. RECIPROCAL relatedIds — if entry A lists entry B in relatedIds, does\n' +
'   entry B list entry A? Reciprocity is not required by the schema but\n' +
'   asymmetric references often indicate one side is stale.\n' +
'6. AMENDMENT FLAGS — if one entry mentions a recent amendment (HSTPA,\n' +
'   S952B, etc.) that affects another entry\'s topic, does the other\n' +
'   entry reflect it?\n' +
'\n' +
'For each contradiction, quote the conflicting passages from each entry\n' +
'and identify which appears correct (or note that you cannot tell\n' +
'without external verification).\n' +
'\n' +
'REPORT FORMAT:\n' +
'1. STATUTE-LEVEL CONTRADICTIONS — numbered, with exact quoted passages\n' +
'   from each conflicting entry.\n' +
'2. ORGANIZATION / OPERATIONAL CONTRADICTIONS — numbered.\n' +
'3. PROCEDURAL DESCRIPTION CONTRADICTIONS — numbered.\n' +
'4. RELATED-IDS / CROSS-REFERENCE GAPS — list any asymmetric references.\n' +
'5. AMENDMENT-DRIFT FLAGS — places where one entry knows about a recent\n' +
'   change another entry has not absorbed yet.\n' +
'6. CROSS-ANCHOR VERDICT — one line: (a) entries are mutually consistent,\n' +
'   (b) minor cross-references need fixing, or (c) significant\n' +
'   contradictions require resolution before any of the entries ship.\n' +
'\n';

let body = '';
entries.forEach((e, i) => {
  body += '\n---ENTRY ' + (i + 1) + ' (id: ' + e.id + ') START---\n' +
    e.text +
    '\n---ENTRY ' + (i + 1) + ' END---\n';
});

const prompt = intro + body;

const stamp = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
const outFile = 'C:/Users/adima/cross-' + ids.join('+') + '-' + stamp + '.txt';

console.error('• Sending cross-anchor audit prompt (' + prompt.length + ' chars) for: ' + ids.join(', '));
(async () => {
  let response;
  try { response = await relay(prompt, { timeoutMs: 900000, debug: true }); }
  catch (e) { console.error('Relay error: ' + e.message); process.exit(2); }
  if (!response || response.trim().length === 0) { console.error('Empty response.'); process.exit(3); }
  fs.writeFileSync(outFile, response);
  console.error('• Saved cross-anchor audit to ' + outFile + ' (' + response.length + ' chars)');
})();
