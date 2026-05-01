// scripts/anchor-voice-relay.cjs
//
// Voice-pass relay for an anchor entry. Builds a voice-audit prompt
// (3rd-person, no advice, 6th-grade plain English, no inline-redefining of
// glossary terms, no citation parade), sends it to claude.ai through the
// CDP relay, and saves the response to a file.
//
// Usage:
//   node scripts/anchor-voice-relay.cjs <entry-id>
//   e.g. node scripts/anchor-voice-relay.cjs eviction-process-ny
//
// Output:
//   /c/Users/adima/<entry-id>-voice-response.txt
//
// Pre-req: scripts/relay-chrome-launch.cjs is running and you're logged
// into claude.ai in that Chrome instance.

const fs = require('fs');
const path = require('path');
const { relay } = require('./lib/relay.cjs');
const { OUTPUT_DISCIPLINE } = require('./lib/audit-discipline.cjs');

const id = process.argv[2];
if (!id) {
  console.error('Usage: node scripts/anchor-voice-relay.cjs <entry-id>');
  process.exit(1);
}

const entryPath = path.join('src', 'data', 'legal', 'entries', id + '.js');
if (!fs.existsSync(entryPath)) {
  console.error('Entry not found: ' + entryPath);
  process.exit(1);
}
const entryText = fs.readFileSync(entryPath, 'utf8');

// Read glossary term names so the auditor knows what's already defined
// elsewhere and shouldn't be redefined inline.
const glossaryDir = path.join('src', 'data', 'legal', 'glossary');
let glossaryTerms = [];
try {
  glossaryTerms = fs.readdirSync(glossaryDir)
    .filter((f) => f.endsWith('.js'))
    .map((f) => f.replace(/\.js$/, ''))
    .sort();
} catch (e) {
  console.error('Could not read glossary dir: ' + e.message);
}

const prompt =
'You are auditing the VOICE of a NY legal entry from helpfinder.help.\n' +
'\n' +
'HelpFinder is run by a non-attorney. Entries must read as plain-English\n' +
'EXPLAINERS, never as attorney advice. Directive language is unauthorized\n' +
'practice of law risk.\n' +
'\n' +
'VOICE RULES (non-negotiable):\n' +
'1. Third-person throughout. "A NY tenant has the right to..." NOT "You\n' +
'   have the right to...". The validator already blocks second-person in\n' +
'   title and first sentence of summary; flag any second-person voice\n' +
'   that survives in body fields (whatItMeans, yourRights, legalOptions,\n' +
'   example).\n' +
'2. No directive imperatives. "Save the contract" / "Take photos" / "Get a\n' +
'   lawyer" — all unacceptable. Restate as third-person observations: "A\n' +
'   copy of the contract supports the case." "Photos help document the\n' +
'   case." "Free legal help is available through Legal Aid Society of\n' +
'   Rochester for those who qualify by income."\n' +
'3. ~6th-grade reading level. Short sentences. Common words. Avoid\n' +
'   bureaucratic substitutes ("Recipient" / "Beneficiary" / "Subject" in\n' +
'   place of the natural plain noun). Avoid "Available Remedies" /\n' +
'   "Permitted Areas" / "Disclose" when "What to do" / "Where to ride" /\n' +
'   "Tell" would land naturally.\n' +
'4. No statute citation parade. yourRights items should NOT be a list of\n' +
'   "A NY tenant has the right under General Obligations Law § 7-108(1-a)(X)\n' +
'   to ..." If a rights statement needs a citation, prefer one citation per\n' +
'   item, not the subdivision tag in every item.\n' +
'5. Glossary handles defined terms. The site has a separate Legal Glossary\n' +
'   with plain-English definitions. Do NOT inline-redefine terms that are\n' +
'   already in the glossary. List of glossary terms appended below.\n' +
'6. No "Strategic considerations" / "Bottom line" / "Best practice" /\n' +
'   "Engage [type] counsel" patterns — these read as attorney advice and\n' +
'   the validator FAILs the build on them.\n' +
'7. Section headers in long whatItMeans should be plain ("The walk-through\n' +
'   before move-in") not jargon ("Pre-occupancy inspection").\n' +
'\n' +
'WHAT TO PRODUCE:\n' +
'A list of issues, each with: field name + line/snippet + why it breaks\n' +
'voice + suggested fix. Categorize as:\n' +
'  - SECOND-PERSON DRIFT (you/your/yours surviving in body)\n' +
'  - DIRECTIVE / ADVICE TONE (imperatives, "should", "must" outside quoted\n' +
'    legal requirements)\n' +
'  - BUREAUCRATIC / LAWYER REGISTER (words that ding the 6th-grade rule)\n' +
'  - CITATION PARADE (statute-tag-in-every-item pattern)\n' +
'  - INLINE REDEFINITION OF GLOSSARY TERMS (point to the glossary slug)\n' +
'  - JARGON SECTION HEADERS (in whatItMeans)\n' +
'  - OTHER (briefly named)\n' +
'\n' +
'Also, at the end, give a one-line "ship verdict": (a) clean enough to\n' +
'ship, (b) needs fixes before shipping, or (c) needs significant rewrite.\n' +
'\n' +
'GLOSSARY TERMS (do NOT inline-redefine these in the entry; the site\n' +
'links them via /glossary):\n' +
glossaryTerms.map((t) => '  ' + t).join('\n') + '\n' +
OUTPUT_DISCIPLINE +
'\n---ENTRY START---\n' +
entryText +
'\n---ENTRY END---\n';

const outFile = 'C:/Users/adima/' + id + '-voice-response.txt';

console.error('• Sending voice-audit prompt (' + prompt.length + ' chars) for ' + id);
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
  console.error('• Saved voice audit to ' + outFile + ' (' + response.length + ' chars)');
})();
