// scripts/audit-transcript-vs-catalog.cjs
//
// Cross-checks dialer transcripts against catalogued business names to find
// data tangles. For each successful call with a usable transcript:
//   • normalize both the catalogued name and the transcript opening
//   • compute token overlap
//   • bucket: match / mismatch / no-business-name-stated / hallucination
//
// Output:
//   • console summary
//   • call-data/data-tangle-review.md — mismatches sorted by confidence,
//     each row carries the verbatim transcript opening, the catalogued name,
//     the call ID, and the recording path so a human can verify in seconds.

const fs = require('fs');
const path = require('path');

const RESULTS = path.join(__dirname, '..', 'call-data', 'results.json');
const OUT_MD = path.join(__dirname, '..', 'call-data', 'data-tangle-review.md');

const HALLUCINATION_SIGNATURES = [
  /^thank you for watching\.?$/i,
  /^bye\.?$/i,
  /^thanks for watching\.?$/i,
  /^[a-z]{1,3}\.?$/i,
];

// Disconnected-line greetings — separate bucket; these are real findings.
const DISCONNECTED_PATTERNS = [
  /(?:number|call)\s+(?:that\s+)?(?:has\s+been\s+)?disconnected/i,
  /no longer in service/i,
  /not in service at this time/i,
  /not a working number/i,
  /unable to complete (?:your\s+)?call/i,
];

// Voicemail-of-named-person greetings — number is likely correct, just rang
// to a specific employee/extension. Separate bucket to avoid false-positive
// "tangles" against the org's main name.
const VOICEMAIL_OF_PERSON_PATTERNS = [
  /voicemail of\s+/i,
  /you've reached\s+(?:the\s+)?(?:voicemail|voice mail|office) of/i,
  /you have reached\s+(?:the\s+)?(?:voicemail|voice mail|office) of/i,
  /^(?:hi|hello)[,]?\s+(?:this is\s+)?[A-Z][a-z]+\s+[A-Z][a-z]+/,
  // bare-name openings: just a first+last name with no org context
  /^[A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+\.?$/,
];

// Catalog-name normalization quirks Whisper produces consistently
const WHISPER_NORMALIZATION = [
  [/pittsburgh/gi, 'pittsford'],
  [/pittsford/gi, 'pittsford'],
];

const STOPWORDS = new Set([
  'the','a','an','of','for','and','at','to','in','on','with','by',
  'inc','llc','llp','corp','corporation','company','co','ltd',
  'rochester','monroe','york','ny','nys','new',
  'office','services','service','center','department','dept','program','programs',
  'organization','agency','foundation','association','society','council','board',
  'thank','you','calling','called','please','hold','have','reached','this','our',
  'is','to','for','if','press','dial','number','one','two','three','four','five',
  'business','hours','open','closed','closed','main','line','representative',
  'directory','assistance','available','now','currently','currently'
]);

function normalize(s) {
  return String(s||'')
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(s) {
  return normalize(s)
    .split(/\s+/)
    .filter(t => t && !STOPWORDS.has(t) && t.length > 1);
}

// Pull a candidate business-name span from the transcript.
// Whisper IVR greetings nearly always start with one of these patterns.
const NAME_PATTERNS = [
  /thank you for calling[,]?\s+(?:the\s+)?([^.,;]+?)(?:[\.,;]|$|\s+if\s|\s+please\s|\s+our\s|\s+to\s)/i,
  /hello[,]?\s+you'?ve reached\s+(?:the\s+)?([^.,;]+?)(?:[\.,;]|$|\s+if\s|\s+please\s|\s+our\s)/i,
  /you have reached\s+(?:the\s+)?([^.,;]+?)(?:[\.,;]|$|\s+if\s|\s+please\s|\s+our\s)/i,
  /welcome to\s+(?:the\s+)?([^.,;]+?)(?:[\.,;]|$|\s+if\s|\s+please\s|\s+our\s)/i,
  /this is\s+(?:the\s+)?([^.,;]+?)(?:[\.,;]|$|\s+at\s|\s+if\s|\s+please\s)/i,
];

function extractCandidate(transcript) {
  if (!transcript) return { kind: 'empty' };
  const t = transcript.trim();
  for (const sig of HALLUCINATION_SIGNATURES) {
    if (sig.test(t)) return { kind: 'hallucination', text: t };
  }
  for (const sig of DISCONNECTED_PATTERNS) {
    if (sig.test(t)) return { kind: 'disconnected', text: t.slice(0, 200) };
  }
  for (const sig of VOICEMAIL_OF_PERSON_PATTERNS) {
    if (sig.test(t)) return { kind: 'voicemail-of-person', text: t.slice(0, 200) };
  }
  if (t.length < 20) return { kind: 'too-short', text: t };
  for (const pat of NAME_PATTERNS) {
    const m = t.match(pat);
    if (m && m[1]) {
      const cand = m[1].trim().slice(0, 120);
      if (cand.length > 2) return { kind: 'extracted', text: cand };
    }
  }
  return { kind: 'no-greeting-pattern', text: t.slice(0, 120) };
}

// Cross-reference IDs (legal-entry:* / pole:*) point at a different org than
// the slug. Skip the mismatch check on these — they're not name claims about
// themselves, they're recommendations to call OTHER orgs.
function isCrossReferenceId(id) {
  if (!id) return false;
  return id.startsWith('legal-entry:') || id.startsWith('pole:');
}

function jaccard(a, b) {
  const A = new Set(tokenize(a));
  const B = new Set(tokenize(b));
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
}

function main() {
  const results = JSON.parse(fs.readFileSync(RESULTS, 'utf8'));
  const successes = results.filter(r =>
    r.status === 'success' &&
    r.transcript &&
    !r.transcript.startsWith('[') &&
    r.name && r.name !== 'undefined'
  );

  const buckets = {
    match: [],
    mismatch: [],                       // REAL TANGLE: program/pole names, transcript names a different org
    'cross-ref-callout': [],            // legal-entry:* / pole:* — checked separately, not a tangle
    'voicemail-of-person': [],          // number probably correct, rang to an employee
    disconnected: [],                   // dead numbers
    'no-business-name-stated': [],      // IVR didn't open with "Thank you for calling X"
    hallucination: [],
    'too-short': [],
    empty: [],
  };

  for (const r of successes) {
    const cand = extractCandidate(r.transcript);
    if (cand.kind === 'hallucination') { buckets.hallucination.push({ r, cand }); continue; }
    if (cand.kind === 'too-short') { buckets['too-short'].push({ r, cand }); continue; }
    if (cand.kind === 'empty') { buckets.empty.push({ r, cand }); continue; }
    if (cand.kind === 'disconnected') { buckets.disconnected.push({ r, cand }); continue; }
    if (cand.kind === 'voicemail-of-person') { buckets['voicemail-of-person'].push({ r, cand }); continue; }
    if (cand.kind === 'no-greeting-pattern') {
      buckets['no-business-name-stated'].push({ r, cand });
      continue;
    }

    // Cross-reference callouts (legal-entry:* / pole:*) — bucket separately
    // since the slug is not the org name. Still useful to record: shows what
    // the recommended-other-org actually answers as.
    if (isCrossReferenceId(r.id)) {
      buckets['cross-ref-callout'].push({ r, cand });
      continue;
    }

    const score = jaccard(r.name, cand.text);
    const row = { r, cand, score };
    if (score >= 0.18) buckets.match.push(row);
    else buckets.mismatch.push(row);
  }

  console.log('=== Transcript vs Catalog Audit ===');
  console.log(`Total successful calls with transcripts: ${successes.length}`);
  console.log('');
  for (const k of Object.keys(buckets)) {
    console.log(`  ${k.padEnd(28)} ${buckets[k].length}`);
  }
  console.log('');

  // Sort mismatches by score (lowest = most divergent)
  buckets.mismatch.sort((a, b) => a.score - b.score);

  let md = `# Data Tangle Review\n\nGenerated ${new Date().toISOString()}.\n\n`;
  md += `Successful calls audited: ${successes.length}\n\n`;
  md += `| Bucket | Count | Meaning |\n|---|---|---|\n`;
  md += `| match | ${buckets.match.length} | Catalogued name & transcript name agree (≥0.18 Jaccard on non-stopword tokens) |\n`;
  md += `| **mismatch** | **${buckets.mismatch.length}** | **REAL TANGLES — program/pole's number now answers as a different org** |\n`;
  md += `| disconnected | ${buckets.disconnected.length} | Dead number — needs replacement or program retirement |\n`;
  md += `| voicemail-of-person | ${buckets['voicemail-of-person'].length} | Number probably right, rang to a specific employee — unconfirmable from transcript |\n`;
  md += `| cross-ref-callout | ${buckets['cross-ref-callout'].length} | Legal-entry/pole callouts — slug ≠ org name by design, separately reviewed |\n`;
  md += `| no-business-name-stated | ${buckets['no-business-name-stated'].length} | Transcript didn't open with a recognized greeting pattern |\n`;
  md += `| hallucination | ${buckets.hallucination.length} | Whisper hallucination signatures — discard |\n`;
  md += `| too-short | ${buckets['too-short'].length} | Transcript < 20 chars |\n`;

  // Sort buckets that need triage by score (most divergent first)
  buckets.mismatch.sort((a, b) => a.score - b.score);

  md += `\n---\n\n## Real tangles — programs whose number answers as a different org\n\n`;
  md += `Each row carries the verbatim opening so a human can verify in the recording without re-listening to the audio.\n\n`;

  for (const row of buckets.mismatch) {
    md += `### ${row.r.id}\n`;
    md += `- **Catalogued:** ${row.r.name}\n`;
    md += `- **Now answers as:** ${row.cand.text}\n`;
    md += `- **Number:** ${row.r.number}\n`;
    md += `- **Recording:** \`${row.r.recording || '—'}\`\n`;
    md += `- **Run:** ${row.r.timestamp}\n\n`;
  }

  md += `\n---\n\n## Disconnected numbers\n\n`;
  for (const row of buckets.disconnected) {
    md += `- **${row.r.name}** (${row.r.id}) — \`${row.r.number}\` — \`${row.cand.text.slice(0, 100)}\`\n`;
  }

  md += `\n---\n\n## Voicemail-of-named-person (number likely correct)\n\n`;
  md += `Each rang to a specific employee/extension. The number is probably right but the org name can't be confirmed from this transcript. Re-dial in business hours OR leave as-is.\n\n`;
  for (const row of buckets['voicemail-of-person'].slice(0, 50)) {
    md += `- **${row.r.name}** (${row.r.id}) — \`${row.r.number}\` — \`${row.cand.text.slice(0, 80)}...\`\n`;
  }
  if (buckets['voicemail-of-person'].length > 50) {
    md += `\n_(${buckets['voicemail-of-person'].length - 50} more not shown)_\n`;
  }

  md += `\n---\n\n## Cross-reference callouts (legal-entry / pole rows)\n\n`;
  md += `These are not tangles — the slug is the entry/pole, not the org being called. Useful info though: the number's actual current org. Spot-check that it still makes sense as a referral target.\n\n`;
  for (const row of buckets['cross-ref-callout'].slice(0, 50)) {
    md += `- **${row.r.id}** dialed \`${row.r.number}\` → answered as \`${row.cand.text.slice(0, 80)}\`\n`;
  }
  if (buckets['cross-ref-callout'].length > 50) {
    md += `\n_(${buckets['cross-ref-callout'].length - 50} more not shown)_\n`;
  }

  md += `\n---\n\n## "No business name stated" (IVR opens without naming itself)\n\n`;
  for (const row of buckets['no-business-name-stated'].slice(0, 30)) {
    md += `- **${row.r.name}** (${row.r.id}) — opening: \`${row.cand.text}\`\n`;
  }
  if (buckets['no-business-name-stated'].length > 30) {
    md += `\n_(${buckets['no-business-name-stated'].length - 30} more not shown)_\n`;
  }

  md += `\n---\n\n## Whisper hallucinations (auto-flagged, ignore)\n\n`;
  for (const row of buckets.hallucination.slice(0, 20)) {
    md += `- **${row.r.name}** — \`${row.cand.text}\`\n`;
  }

  fs.writeFileSync(OUT_MD, md);
  console.log(`Wrote ${OUT_MD}`);
}

main();
