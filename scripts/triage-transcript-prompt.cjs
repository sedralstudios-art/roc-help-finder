// scripts/triage-transcript-prompt.cjs
//
// Emits a ready-to-upload markdown file containing dialer transcripts paired
// with their matching programs.js entries. Designed to be uploaded to a fresh
// Claude conversation (browser, web app) so a clean-context reviewer can
// triage transcript→entry discrepancies without inheriting any priors from
// a working session.
//
// Usage:
//   node scripts/triage-transcript-prompt.cjs                        # default: batch of 25 starting at first un-triaged
//   node scripts/triage-transcript-prompt.cjs --start 0 --count 25
//   node scripts/triage-transcript-prompt.cjs --since 2026-05-02     # only results from this date forward
//   node scripts/triage-transcript-prompt.cjs --out triage-batch1.md
//
// The reviewer applies the discipline rules in feedback_transcript_triage_discipline.md:
// quote-and-act, no-change-default, Whisper-skepticism, per-entry processing.
//
// The output is intentionally shaped for one upload → one batch of triage
// proposals. Don't ask the reviewer to "read all 321 transcripts at once" —
// fresh-context fact-checking degrades fast under volume.

const fs = require('fs');
const path = require('path');

const RESULTS_FILE = path.join(__dirname, '..', 'call-data', 'results.json');
const PROGRAMS_FILE = path.join(__dirname, '..', 'src', 'data', 'programs.js');

// Whisper hallucination patterns — known training-data echoes that appear on
// near-silent / low-content audio. Match conservatively; full transcript only.
const WHISPER_HALLUCINATION_PATTERNS = [
  /^Thank you for watching\.?\s*$/i,
  /^Thank you\.?\s*$/i,
  /^Thank you very much\.?\s*$/i,
  /^Subtitles by .{0,80}$/i,
  /^Bye\.?\s*$/i,
  /^\.\s*$/,
  /^MUSIC\s*$/i,
];

function isHallucination(transcript) {
  if (!transcript) return true;
  const trimmed = transcript.trim();
  if (trimmed.length < 50) return true;
  for (const pat of WHISPER_HALLUCINATION_PATTERNS) {
    if (pat.test(trimmed)) return true;
  }
  return false;
}

function digitsOnly(s) {
  return String(s || '').replace(/\D/g, '');
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { start: 0, count: 25, since: null, out: null };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--start') opts.start = parseInt(args[++i], 10);
    else if (a === '--count') opts.count = parseInt(args[++i], 10);
    else if (a === '--since') opts.since = args[++i];
    else if (a === '--out') opts.out = args[++i];
  }
  return opts;
}

function loadProgramsByPhone() {
  const src = fs.readFileSync(PROGRAMS_FILE, 'utf8');
  const lines = src.split(/\r?\n/);
  const byPhone = new Map();
  for (const line of lines) {
    const phMatch = line.match(/\bph:"([^"]+)"/);
    if (!phMatch) continue;
    const digits = digitsOnly(phMatch[1]);
    if (!digits) continue;
    if (!byPhone.has(digits)) byPhone.set(digits, []);
    byPhone.get(digits).push(line.trim());
  }
  return byPhone;
}

function summarizeProgramLine(line) {
  const fields = ['id', 'n', 'c', 'ph', 'ad', 'hr', 'doc', 'url', 'aurl', 'nt'];
  const out = {};
  for (const f of fields) {
    const m = line.match(new RegExp('\\b' + f + ':"((?:[^"\\\\]|\\\\.)*)"'));
    if (m) out[f] = m[1].replace(/\\"/g, '"');
  }
  const incM = line.match(/\binc:(\d+)/);
  if (incM) out.inc = incM[1] + '% FPL';
  return out;
}

function formatProgramSummary(p) {
  const order = [
    ['id', 'id'],
    ['n', 'name'],
    ['c', 'category'],
    ['ph', 'phone'],
    ['ad', 'address'],
    ['hr', 'hours'],
    ['doc', 'docs needed'],
    ['url', 'url'],
    ['aurl', 'apply url'],
    ['inc', 'income limit'],
    ['nt', 'note'],
  ];
  const lines = [];
  for (const [k, label] of order) {
    if (p[k]) lines.push(`    - ${label}: ${p[k]}`);
  }
  return lines.join('\n');
}

function main() {
  const opts = parseArgs();

  if (!fs.existsSync(RESULTS_FILE)) {
    console.error('results.json not found at', RESULTS_FILE);
    process.exit(1);
  }
  const results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));

  const filtered = results.filter(r => {
    if (r.status !== 'success') return false;
    if (opts.since && (!r.timestamp || r.timestamp < opts.since)) return false;
    if (isHallucination(r.transcript)) return false;
    return true;
  });

  const slice = filtered.slice(opts.start, opts.start + opts.count);
  if (!slice.length) {
    console.error(`No entries to triage. filtered=${filtered.length}, start=${opts.start}, count=${opts.count}`);
    process.exit(1);
  }

  const programsByPhone = loadProgramsByPhone();

  const sections = [];
  sections.push('# Transcript Triage');
  sections.push('');
  sections.push(`Batch: entries ${opts.start + 1} – ${opts.start + slice.length} of ${filtered.length} eligible (success + ≥50 chars + non-hallucination).`);
  sections.push(`Source: ${path.basename(RESULTS_FILE)}.`);
  sections.push('');
  sections.push('---');
  sections.push('');
  sections.push('## Execution directive');
  sections.push('');
  sections.push('**Do not ask clarifying questions. Do not propose to do a sample first. Do not narrate your approach. Output the per-entry triage block for EVERY entry in this batch in order, then stop.**');
  sections.push('');
  sections.push('Pre-resolved questions (apply the answer, do not ask):');
  sections.push('- "Should I do all of them?" → **yes**, always all of them in this batch.');
  sections.push('- "How should I handle Whisper proper-noun mangles?" → apply rule 4 below; transcript is the suspect, not the database.');
  sections.push('- "How should I handle hallucinations like \'Subtitles by\' or \'Thanks for watching\'?" → flag the entry as `no-content` in NOTES, proposals all `no-action`, move on.');
  sections.push('- "How should I handle no-match entries (no programs.js phone match)?" → output `ENTRY: no-match` and `NOTES: legal-entry-followup` with no PROPOSALS block. Move on.');
  sections.push('- "How should I handle disconnected/wrong-number signals?" → note in NOTES, all proposals `no-action`, do not invent a replacement number.');
  sections.push('- "How should I handle ambiguous hours?" → `confidence: needs-human-listen`, evidence quote is what the transcript actually said. Don\'t skip; flag.');
  sections.push('');
  sections.push('The maintainer reads the triage blocks AS the deliverable. Planning summaries delay the deliverable without improving it. Skip directly to Entry 1.');
  sections.push('');
  sections.push('---');
  sections.push('');
  sections.push('## Instructions for the reviewer');
  sections.push('');
  sections.push('You are triaging dialer transcripts against current HelpFinder program data. The recordings are ~25s captures of voicemail / IVR greetings on the listed phone numbers. Your job is to identify what each transcript **confirms, contradicts, or adds** vs. the current `programs.js` entry.');
  sections.push('');
  sections.push('### Non-negotiable discipline rules');
  sections.push('');
  sections.push('1. **Quote-and-act.** Every proposed change must include a *verbatim* transcript quote that supports it. No quote → no change. Don\'t paraphrase.');
  sections.push('2. **No-change default.** Fields the transcript doesn\'t address stay as-is. Output `no-action` rather than guessing. "Most offices are 9-5" is not evidence.');
  sections.push('3. **Whisper-skepticism.** Whisper produces hallucinations on low-content audio ("Thank you for watching", repeating "Thank you very much"). Some have been pre-filtered, but if you see one in this batch, flag `no-content`.');
  sections.push('4. **Whisper-mangle awareness.** Proper nouns are Whisper\'s worst category. "Gates-Chile" instead of "Gates Chili", "Parentson" instead of "Perinton". If transcript and database disagree on an org/town name, the transcript is the suspect.');
  sections.push('5. **Per-entry processing.** Some phone numbers map to multiple programs. Evaluate each separately. Don\'t conflate.');
  sections.push('6. **Hours nuance.** A school district\'s main-line auto-attendant hours are NOT the food pantry\'s distribution hours. Check whether the transcript is describing the SAME thing as the entry\'s `hr` field before proposing a change.');
  sections.push('');
  sections.push('### Output format (per entry)');
  sections.push('');
  sections.push('```');
  sections.push('ENTRY: <programs.js id, or "no-match" if phone not in programs.js>');
  sections.push('PROPOSALS:');
  sections.push('  - field: <name | hours | address | url | etc.>');
  sections.push('    current: "<exact current value>"');
  sections.push('    proposed: "<exact proposed value>"');
  sections.push('    evidence: "<verbatim transcript quote>"');
  sections.push('    confidence: <transcript-evidence | needs-human-listen | no-action>');
  sections.push('NOTES: <observations the maintainer wouldn\'t otherwise see — Whisper mangles, possible different program at same number, dead-line signals, multilingual confirmation, etc.>');
  sections.push('```');
  sections.push('');
  sections.push('Confidence tiers:');
  sections.push('- `transcript-evidence`: verbatim quote unambiguously supports the change. Safe to apply after spot-check audit.');
  sections.push('- `needs-human-listen`: transcript ambiguous; maintainer should listen to the recording before applying.');
  sections.push('- `no-action`: no change supported by transcript.');
  sections.push('');
  sections.push('---');
  sections.push('');

  for (let i = 0; i < slice.length; i++) {
    const r = slice[i];
    const numberDigits = digitsOnly(r.number);
    const matchedLines = programsByPhone.get(numberDigits) || [];
    const matched = matchedLines.map(summarizeProgramLine);

    sections.push(`## Entry ${opts.start + i + 1}`);
    sections.push('');
    sections.push(`**Phone called:** ${r.number} (digits: ${numberDigits})`);
    sections.push(`**Dialer-result status:** ${r.status}${r.duration ? ` · duration ${r.duration}s` : ''}`);
    sections.push('');
    sections.push('**Transcript:**');
    sections.push('');
    sections.push('> ' + (r.transcript || '').replace(/\n/g, '\n> '));
    sections.push('');
    if (matched.length === 0) {
      sections.push('**Current programs.js entries with this phone: NONE.**');
      sections.push('');
      sections.push('This number does not appear in `src/data/programs.js`. It may be a number listed in a `src/data/legal/entries/*.js` file (legal entry program callout) or a canonical phone pole. Note that fact and skip the per-entry triage; flag for `legal-entry-followup`.');
    } else {
      sections.push(`**Current programs.js entries with this phone (${matched.length}):**`);
      sections.push('');
      matched.forEach((p, idx) => {
        sections.push(`- Entry ${idx + 1}:`);
        sections.push(formatProgramSummary(p));
      });
    }
    sections.push('');
    sections.push('---');
    sections.push('');
  }

  sections.push('## End of batch');
  sections.push('');
  sections.push(`Total entries in this batch: **${slice.length}**`);
  sections.push(`Range covered: filtered indices ${opts.start} – ${opts.start + slice.length - 1} (of ${filtered.length} eligible).`);
  sections.push(`Next batch starts at: \`--start ${opts.start + slice.length}\``);

  const output = sections.join('\n') + '\n';
  if (opts.out) {
    fs.writeFileSync(opts.out, output);
    console.error(`Wrote ${output.length} chars to ${opts.out}`);
  } else {
    process.stdout.write(output);
  }
}

main();
