// scripts/anchor-seo-relay.cjs
//
// Fresh-check SEO audit. Reviewer reads the entry as a search-strategy
// auditor. Focus on the judgment-heavy SEO items that an LLM can
// genuinely add value on (vocabulary naturalness, featured-snippet
// eligibility, search-intent fit, question-format H2 opportunities,
// semantic completeness, internal-link density). Mechanical SEO checks
// (title length, schema markup) belong in the build-time validator, not
// in this LLM review.
//
// Hard subordination: voice/UPL rules always win. If an SEO recommendation
// would require second-person voice, directive language, or "you should"
// framing, the reviewer must reject the SEO suggestion in favor of voice.
//
// Usage:
//   node scripts/anchor-seo-relay.cjs <entry-id>

const fs = require('fs');
const path = require('path');
const { relay } = require('./lib/relay.cjs');

const id = process.argv[2];
if (!id) { console.error('Usage: node scripts/anchor-seo-relay.cjs <entry-id>'); process.exit(1); }
const entryPath = path.join('src', 'data', 'legal', 'entries', id + '.js');
if (!fs.existsSync(entryPath)) { console.error('Entry not found: ' + entryPath); process.exit(1); }
const entryText = fs.readFileSync(entryPath, 'utf8');

const prompt =
'You are auditing the SEARCH-DISCOVERABILITY of a NY legal entry from\n' +
'helpfinder.help — a free, plain-English legal-rights site for non-\n' +
'lawyer New Yorkers. The site is new and unranked. Goal is not to game\n' +
'rankings; goal is to make sure that when someone searches for the\n' +
'situation this entry covers, the entry is matchable, citable, and the\n' +
'best version of the answer Google\'s Helpful Content / E-E-A-T system\n' +
'would credit.\n' +
'\n' +
'HARD CONSTRAINT: voice/UPL rules always win.\n' +
'  - Third person, no second-person you/your.\n' +
'  - No directive imperatives ("save the contract", "get a lawyer").\n' +
'  - Plain English at ~6th-grade level.\n' +
'  - This is an explainer, never advice.\n' +
'If an SEO recommendation would require violating any of these, drop\n' +
'the recommendation. Voice wins. SEO is optimization within voice rules.\n' +
'\n' +
'Do NOT check mechanical SEO items that belong in a build-time validator:\n' +
'  - Title character length (deterministic — handled by validator)\n' +
'  - Meta description length (deterministic)\n' +
'  - Schema markup presence (deterministic)\n' +
'  - Sitemap inclusion / canonical / HTTPS (deterministic)\n' +
'\n' +
'Focus on the JUDGMENT-HEAVY items where an LLM reviewer adds signal:\n' +
'\n' +
'1. TITLE VOCABULARY VS NATURAL-SEARCH VOCABULARY. Read the title. Would\n' +
'   a New Yorker in the situation actually type these words into Google?\n' +
'   We had a real case (snap-rights-ny) where "Recipient Rights" replaced\n' +
'   "Your Rights" in a voice-rewrite pass and impressions dropped 84%\n' +
'   because nobody searches "recipient rights." Flag any bureaucratic\n' +
'   substitute, technical term, or legalese that diverges from natural\n' +
'   search vocabulary. Suggest alternatives that stay third-person AND\n' +
'   match how real people search.\n' +
'\n' +
'2. FEATURED-SNIPPET ELIGIBILITY. Google answer boxes pull from pages\n' +
'   that answer the obvious query in roughly 40-60 words early on the\n' +
'   page. Read the summary and the first paragraph of whatItMeans. Do\n' +
'   they answer the query someone typing the title would have, in a\n' +
'   citable form? Or is the answer buried later? If buried, suggest\n' +
'   what should move up. (Note: do not suggest restructuring that\n' +
'   would make the entry less useful for full-page readers — featured\n' +
'   snippet should be a side effect of clear early framing, not a\n' +
'   restructure away from the readers.)\n' +
'\n' +
'3. SEARCH-INTENT MATCH. Is the entry pitched at informational intent\n' +
'   ("how does NY security deposit law work") or accidentally\n' +
'   transactional/navigational? An entry pitched to the wrong intent\n' +
'   does not rank for what it serves. Flag if the pitch drifts.\n' +
'\n' +
'4. QUESTION-FORMAT H2 OPPORTUNITIES. Natural-language and voice\n' +
'   searches increasingly match question-format headers. Look at the\n' +
'   structure of whatItMeans (which uses statement-form section labels\n' +
'   like "Stage one — written notice"). For an entry whose readers\n' +
'   often ask "how long does X take" / "what happens if Y" / "do I have\n' +
'   to Z", flag where a question-format header would catch a search\n' +
'   without harming readability.\n' +
'\n' +
'5. SEMANTIC COMPLETENESS. Does the entry cover the full keyword\n' +
'   cluster Google associates with the topic, or just one slice?\n' +
'   List the synonym terms / related concepts a real searcher would\n' +
'   reach for (e.g., for security deposit: "deposit refund," "deposit\n' +
'   not returned," "landlord keeping deposit," "wear and tear,"\n' +
'   "itemized statement," "14 day rule"). Are they present in the\n' +
'   entry text? Missing terms = entry competes weakly for the cluster.\n' +
'\n' +
'6. INTERNAL-LINK DENSITY AND TARGET CHOICE. relatedIds is the\n' +
'   internal-link mechanism. Are the listed related entries the right\n' +
'   ones for the cluster? Are obvious cross-anchor partners missing?\n' +
'   Are any irrelevant relatedIds dragging on topical authority?\n' +
'\n' +
'7. THE GOOGLE HELPFUL-CONTENT / E-E-A-T LENS. Would Google\'s\n' +
'   Helpful-Content system credit this entry as written by someone with\n' +
'   real Experience, Expertise, Authoritativeness, and Trust on the\n' +
'   topic? What single signal would most strengthen the credit (a\n' +
'   reviewedBy attribution, a date-stamped lastVerified, a primary\n' +
'   source URL above secondary commentary, etc.)?\n' +
'\n' +
'TREAT ALL FINDINGS AS OPTIONAL RECOMMENDATIONS. SEO is a moving\n' +
'target. The site is new and unranked. None of these are required\n' +
'fixes — they are choices the maintainer can take or leave.\n' +
'\n' +
'REPORT FORMAT:\n' +
'1. TITLE VOCABULARY — current vs natural-search alternatives. Be\n' +
'   specific about which words are bureaucratic and what to replace them\n' +
'   with (within voice constraints).\n' +
'2. FEATURED-SNIPPET ANALYSIS — what query would the entry win, and\n' +
'   what changes would help.\n' +
'3. SEARCH-INTENT FIT — informational, transactional, or drift.\n' +
'4. QUESTION-FORMAT H2 SUGGESTIONS — current section labels vs\n' +
'   suggested question alternatives.\n' +
'5. SEMANTIC COMPLETENESS — list of synonym terms / related concepts\n' +
'   covered vs missing.\n' +
'6. INTERNAL-LINK RECOMMENDATIONS — relatedIds adjustments.\n' +
'7. E-E-A-T STRENGTHENING — single highest-impact change.\n' +
'8. SEO VERDICT — one line: (a) entry is well-positioned for search,\n' +
'   (b) entry has fixable SEO gaps, or (c) entry is invisible / wrong-\n' +
'   pitched and needs significant search-fit work.\n' +
'\n' +
'---ENTRY START---\n' +
entryText +
'\n---ENTRY END---\n';

const stamp = new Date().toTimeString().slice(0, 8).replace(/:/g, '');
const outFile = 'C:/Users/adima/' + id + '-seo-response-' + stamp + '.txt';

console.error('• Sending SEO-audit prompt (' + prompt.length + ' chars) for ' + id);
(async () => {
  let response;
  try { response = await relay(prompt, { timeoutMs: 600000, debug: true }); }
  catch (e) { console.error('Relay error: ' + e.message); process.exit(2); }
  if (!response || response.trim().length === 0) { console.error('Empty response.'); process.exit(3); }
  fs.writeFileSync(outFile, response);
  console.error('• Saved SEO audit to ' + outFile + ' (' + response.length + ' chars)');
})();
