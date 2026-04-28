// scripts/fact-check-program-prompt.cjs
//
// Emits a ready-to-paste fact-check prompt for one program in
// src/data/programs.js. Usage:
//
//   node scripts/fact-check-program-prompt.cjs snap
//
// The output is a markdown prompt designed to be pasted into Claude,
// Perplexity, or any LLM with web search. The prompt focuses on the
// things that drift wrong on directory entries: phone numbers, URLs,
// hours, eligibility income, application URLs, and whether the program
// still exists.
//
// After running the fact-check, the author updates the program's line
// to fix any errors and adds a fact-check marker:
//
//   fc:"2026-04-28"
//
// Place it at the end of the program object, before the closing brace.

const fs = require('fs');
const path = require('path');

const PROGRAMS_FILE = path.join(__dirname, '..', 'src', 'data', 'programs.js');

function main() {
  const id = process.argv[2];
  if (!id) {
    console.error('Usage: node scripts/fact-check-program-prompt.cjs <program-id>');
    process.exit(1);
  }
  const src = fs.readFileSync(PROGRAMS_FILE, 'utf8');
  const lines = src.split(/\r?\n/);
  const line = lines.find(l => new RegExp('\\bid:"' + id + '"').test(l));
  if (!line) {
    console.error('Program not found: ' + id);
    process.exit(1);
  }

  const f = (key) => {
    const m = line.match(new RegExp('\\b' + key + ':"((?:[^"\\\\]|\\\\.)*)"'));
    return m ? m[1].replace(/\\"/g, '"') : null;
  };
  const name = f('n') || '(unknown)';
  const desc = f('d') || '';
  const phone = f('ph') || null;
  const addr = f('ad') || null;
  const url = f('url') || null;
  const aurl = f('aurl') || null;
  const hr = f('hr') || null;
  const inc = (line.match(/\binc:(\d+)/) || [])[1];
  const doc = f('doc') || null;
  const note = f('nt') || null;

  const out = [
    '# HelpFinder Program Fact-Check',
    '',
    'Please fact-check this Rochester, NY help-finder directory entry against current sources. The directory is read by people in crisis looking for accurate program information — wrong phones, dead URLs, and outdated eligibility numbers cause real harm.',
    '',
    `**Program ID:** ${id}`,
    `**Name:** ${name}`,
    `**Description:** ${desc}`,
    '',
    '## Specific fields to verify',
    '',
    phone ? `- **Phone:** \`${phone}\` — verify this is the current main intake or program line.` : '- No phone listed; check whether this program now has a phone.',
    url ? `- **URL:** ${url} — verify the page loads and is the program's current page (not a 404 or redirect to a deprecated section).` : '',
    aurl ? `- **Application URL:** ${aurl} — verify it leads to a working application.` : '',
    addr ? `- **Address:** ${addr} — verify the program still operates at this location.` : '',
    hr ? `- **Hours:** ${hr} — verify current hours.` : '',
    inc ? `- **Income eligibility:** ${inc}% of FPL — verify this matches the current program rule.` : '',
    doc && doc !== 'None' ? `- **Documents required:** ${doc} — verify this list is current.` : '',
    note ? `- **Note:** ${note} — verify this is still accurate.` : '',
    '',
    '## Please report:',
    '',
    '1. **Wrong phone numbers** — quote the wrong number, give the correct one with a source URL.',
    '2. **Dead URLs** — confirm whether the URL still loads to the right content.',
    '3. **Outdated eligibility** — federal/state limits that have changed.',
    '4. **Discontinued programs** — programs that no longer exist or have been replaced.',
    '5. **Wrong hours or address** — outdated operational info.',
    '',
    'Be specific. Include source URLs (the program page, agency directory, or other authoritative listing) for any correction.',
  ].filter(Boolean).join('\n');

  process.stdout.write(out + '\n');
}

main();
