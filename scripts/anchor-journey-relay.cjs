// scripts/anchor-journey-relay.cjs
//
// Fresh-check USER JOURNEY audit. Reviewer reads the entry as the actual
// person facing the situation — not as a writer, not as a lawyer.
//
// What it catches: gaps where a real person in the situation would still
// be confused after reading the entry. Action paths that aren't clear.
// Questions the entry doesn't answer that the person would obviously
// have. Legalese that survived the voice check because each sentence
// was correct but the cumulative reading experience is opaque.

const fs = require('fs');
const path = require('path');
const { relay } = require('./lib/relay.cjs');

const id = process.argv[2];
if (!id) { console.error('Usage: node scripts/anchor-journey-relay.cjs <entry-id>'); process.exit(1); }
const entryPath = path.join('src', 'data', 'legal', 'entries', id + '.js');
if (!fs.existsSync(entryPath)) { console.error('Entry not found: ' + entryPath); process.exit(1); }
const entryText = fs.readFileSync(entryPath, 'utf8');

const prompt =
'You are reading a legal explainer entry from helpfinder.help — a free,\n' +
'plain-English legal-rights site for non-lawyer New Yorkers. Read it as\n' +
'the actual person facing the situation the entry covers. Not as a\n' +
'writer judging craft. Not as a lawyer judging accuracy. As the person\n' +
'in the situation.\n' +
'\n' +
'You read this entry because something is happening to you and you\n' +
'need to know what it means and what to do.\n' +
'\n' +
'Find the things that would still leave you confused, stuck, or unable\n' +
'to act after reading. Specifically:\n' +
'\n' +
'1. WHAT-NOW GAPS — after reading the entry, do you know what your\n' +
'   actual next step is? Is the very first concrete action clear, or do\n' +
'   you have to figure out which of five paths to take?\n' +
'2. UNANSWERED QUESTIONS — every person facing this situation has a\n' +
'   short list of questions. List the obvious ones. Which does the entry\n' +
'   answer? Which does it leave hanging?\n' +
'3. JARGON THAT SLIPPED THROUGH — words that are technically defined\n' +
'   somewhere on the site but that you, the person in the situation,\n' +
'   would still trip over on first read. (Note: do not flag terms that\n' +
'   are linked or visibly explained in the entry — flag terms that the\n' +
'   reader would have to leave the page to understand.)\n' +
'4. ASSUMPTION GAPS — places where the entry assumes you already know\n' +
'   something a real person in this situation would not know. (e.g., it\n' +
'   says "in small claims court" but you have never been to a court and\n' +
'   do not know what that means concretely.)\n' +
'5. ACTION PATHS THAT FORK CONFUSINGLY — when the entry lists multiple\n' +
'   options (Legal Aid, LawNY, JustCause, AG complaint), is it clear\n' +
'   which to pick? Or is it five doors with no map of which to walk\n' +
'   through first?\n' +
'6. EMOTIONAL TONE — does the entry treat you like an adult in a\n' +
'   stressful situation, or does it read like a textbook? (This is not\n' +
'   the same as voice — voice is third-person + plain English. This is\n' +
'   about whether the entry SEES the person it is talking to.)\n' +
'7. THE FIRST 60 SECONDS — if you only read the title and summary and\n' +
'   nothing else, would you know whether this entry applies to your\n' +
'   situation? Many readers will stop there.\n' +
'8. CONTENT-PACKAGE OPPORTUNITIES — as the person in the situation,\n' +
'   what else do you need that this entry does not give you, that the\n' +
'   site could plausibly build? Examples:\n' +
'     - A separate entry on a related topic the reader will hit next\n' +
'       (e.g., after winning eviction defense, an entry on the eviction\n' +
'       record showing up on tenant screening reports).\n' +
'     - A missing entry the current entry references but does not link\n' +
'       (e.g., "see the warranty of habitability entry" but no link\n' +
'       given, or no entry exists).\n' +
'     - A glossary term the reader stumbled on that is not in the\n' +
'       glossary yet.\n' +
'     - A sample letter / template the reader needs to actually act\n' +
'       (e.g., a 14-day rent-demand response template; a small-claims\n' +
'       complaint template).\n' +
'     - A checklist the reader could use to prep for court / for a\n' +
'       phone call to legal aid / for a hearing.\n' +
'     - A QR-code crisis card or printable handout for situations where\n' +
'       the reader does not have time to read a long entry.\n' +
'     - A walkthrough or wizard for a multi-step process (e.g., filing\n' +
'       a small claims case step by step).\n' +
'     - A bundled set of related entries that should be cross-linked or\n' +
'       presented as a package for this situation.\n' +
'   You are uniquely positioned to see these because you are reading as\n' +
'   the person in the situation. The other audits (statute, voice,\n' +
'   consistency, connection) cannot see them — flag any opportunity you\n' +
'   notice.\n' +
'\n' +
'You are not auditing accuracy. You are not auditing voice. You are\n' +
'auditing whether a stressed person in this situation comes away from\n' +
'the entry knowing more, oriented, and able to do the next thing — AND\n' +
'flagging the adjacent content the site could build to serve them more\n' +
'completely.\n' +
'\n' +
'REPORT FORMAT:\n' +
'1. WHAT-NOW GAPS — numbered.\n' +
'2. UNANSWERED QUESTIONS — list the obvious questions a person in this\n' +
'   situation would have, with a check or X for each (does the entry\n' +
'   answer it).\n' +
'3. JARGON SURVIVING / ASSUMPTION GAPS — numbered.\n' +
'4. ACTION-PATH CLARITY — one paragraph.\n' +
'5. FIRST-60-SECONDS TEST — does the title + summary alone tell the\n' +
'   reader whether the entry applies to them?\n' +
'6. CONTENT-PACKAGE OPPORTUNITIES — numbered. For each, name the\n' +
'   opportunity, explain why a person in this situation needs it, and\n' +
'   suggest the form (separate entry / template / checklist / glossary\n' +
'   term / QR card / walkthrough / bundle).\n' +
'7. JOURNEY VERDICT — one line: (a) the entry serves the person well,\n' +
'   (b) the entry has fixable gaps, or (c) the entry needs significant\n' +
'   rework to actually help the reader act.\n' +
'\n' +
'---ENTRY START---\n' +
entryText +
'\n---ENTRY END---\n';

const stamp = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
const outFile = 'C:/Users/adima/' + id + '-journey-response-' + stamp + '.txt';

console.error('• Sending journey-audit prompt (' + prompt.length + ' chars) for ' + id);
(async () => {
  let response;
  try { response = await relay(prompt, { timeoutMs: 600000, debug: true }); }
  catch (e) { console.error('Relay error: ' + e.message); process.exit(2); }
  if (!response || response.trim().length === 0) { console.error('Empty response.'); process.exit(3); }
  fs.writeFileSync(outFile, response);
  console.error('• Saved journey audit to ' + outFile + ' (' + response.length + ' chars)');
})();
