// scripts/log-phone-verify.cjs
//
// Append items to scripts/data/phone-verification-queue.md — the running
// list of things Claude (or Anthony) wants a human + phone to verify.
//
// Two item types:
//   topic      → a fact / claim Claude wrote into an entry, derived from
//                WebSearch. Anthony re-runs the search on his phone (no bot
//                blocks, real session) to confirm the conclusion still holds.
//   bot-blocked → a URL that returned 403/429 to scripts/check-source-drift.cjs.
//                Anthony opens it on his phone, captures the readable text,
//                feeds it to --from-text mode.
//
// Bot-blocked items are also auto-recorded by check-source-drift.cjs into
// scripts/data/bot-blocked-sources.json (machine-readable). This script is
// the human-readable companion — same items + topic items + Claude's
// conclusion notes, formatted as a markdown checklist.
//
// Usage:
//   node scripts/log-phone-verify.cjs --target tenant-habitability-ny \
//     --type topic \
//     --query "NY RPP 235-b current statute text 2026" \
//     --conclusion "Last amended Sep 2014; S5956-2025 pending punitive damages bill"
//
//   node scripts/log-phone-verify.cjs --target tenant-habitability-ny \
//     --type bot-blocked \
//     --url "https://www.nysenate.gov/legislation/laws/RPP/235-B"

const fs = require('fs');
const path = require('path');

const QUEUE_FILE = path.join(__dirname, 'data', 'phone-verification-queue.md');
const TODAY = new Date().toISOString().slice(0, 10);

function arg(name) {
  const i = process.argv.indexOf('--' + name);
  return i >= 0 ? process.argv[i + 1] : null;
}

const target = arg('target');
const type = arg('type');
const query = arg('query');
const url = arg('url');
const conclusion = arg('conclusion');
const note = arg('note');

if (!target || !type) {
  console.error('Usage: node scripts/log-phone-verify.cjs --target <id> --type <topic|bot-blocked|claim> [--query ... --url ... --conclusion ... --note ...]');
  process.exit(1);
}

fs.mkdirSync(path.dirname(QUEUE_FILE), { recursive: true });

let body = fs.existsSync(QUEUE_FILE) ? fs.readFileSync(QUEUE_FILE, 'utf8') : '';
if (!body) {
  body = '# Phone Verification Queue\n\n' +
         'Items Claude or another tool wants a human + phone to verify. Tick the checkbox when done; ' +
         'add a brief outcome line below the item if the verification corrected something.\n\n' +
         'Bot-blocked items are also tracked machine-readable in `bot-blocked-sources.json` — clearing ' +
         'them via `check-source-drift.cjs --from-text ... --write` removes the JSON entry but does NOT ' +
         'remove this markdown line. Tick it manually when done.\n\n';
}

const headerToday = '## ' + TODAY;
if (!body.includes(headerToday)) {
  body += headerToday + '\n\n';
}

let line;
if (type === 'topic') {
  line = `- [ ] **${target}** (topic) — Searched: ${query || '(no query given)'}`;
  if (conclusion) line += `\n      _Claude's conclusion:_ ${conclusion}`;
  if (note) line += `\n      _Note:_ ${note}`;
} else if (type === 'bot-blocked') {
  line = `- [ ] **${target}** (bot-blocked) — ${url || '(no url given)'}`;
  line += `\n      _To clear:_ open the URL on phone, save readable text to file, run:`;
  line += `\n      \`node scripts/check-source-drift.cjs --from-text ${target} <textfile> --write\``;
  if (note) line += `\n      _Note:_ ${note}`;
} else if (type === 'claim') {
  line = `- [ ] **${target}** (claim) — ${note || '(no claim text)'}`;
  if (url) line += `\n      _Source:_ ${url}`;
} else {
  console.error('Unknown --type: ' + type + ' (expected topic | bot-blocked | claim)');
  process.exit(1);
}

// Append the item under today's header. If today's header is followed by
// other content, find the next ## header and insert before it.
const headerIdx = body.lastIndexOf(headerToday);
const afterHeader = headerIdx + headerToday.length;
const restAfterHeader = body.slice(afterHeader);
const nextHeaderIdx = restAfterHeader.search(/\n## /);
const insertAt = nextHeaderIdx >= 0 ? afterHeader + nextHeaderIdx : body.length;

body = body.slice(0, insertAt) + (insertAt === body.length ? '' : '') + '\n' + line + '\n' + body.slice(insertAt);

// Trim accidental triple newlines.
body = body.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(QUEUE_FILE, body);

console.log('✓ logged to ' + path.relative(process.cwd(), QUEUE_FILE));
console.log('  ' + line.split('\n')[0]);
