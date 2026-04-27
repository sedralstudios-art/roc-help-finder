// scripts/fact-check-prompt.cjs
//
// Emits a ready-to-paste fact-check prompt for one legal entry. Usage:
//
//   node scripts/fact-check-prompt.cjs power-outage-rights-ny
//
// The output is a markdown prompt designed to be pasted into Claude,
// Perplexity, or any LLM with web search. The prompt asks the tool to:
//   - identify any factually wrong claims with corrections and source URLs
//   - flag outdated claims
//   - note rights or protections the entry omits
//
// The prompt auto-extracts every dollar amount, hour threshold, percentage,
// and statute citation in the body so the reviewer has a punch list of
// specific claims to verify, instead of having to re-read the entry to
// find them.
//
// After running the fact-check, the author updates the entry to fix any
// errors and adds a factCheckedBy field:
//
//   factCheckedBy: { tool: "claude-research", date: "2026-04-26" },
//
// The validator (verify-entry-uniqueness.cjs) emits a WARN nudge for any
// statute-heavy entry that lacks this field — see WARN_FACT_CHECK_AGE_MONTHS.

const path = require('path');
const fs = require('fs');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

function getEnFromField(src, field) {
  const re = new RegExp(`${field}:\\s*\\{\\s*\\n?\\s*en:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's');
  const m = src.match(re);
  return m ? m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"') : null;
}

function extractClaims(text) {
  if (!text) return [];
  const claims = new Set();
  const dollar = /\$\s?[\d,]+(?:\.\d+)?(?:\s?(?:million|billion|k|K|M|B))?/g;
  const hours = /\b\d{1,4}[-\s]?(?:consecutive\s+)?hours?\b/gi;
  const days = /\b\d{1,4}[-\s]?days?\b/gi;
  const percent = /\b\d{1,3}(?:\.\d+)?\s?%/g;
  const customers = /\b[\d,]{4,}\s+(?:customers|households|residents|people|workers|tenants|claimants|applicants)\b/gi;
  const statute = /\b(?:NY\s+[A-Z]{2,4}|\d{1,3}\s+U\.?S\.?C\.?|\d{1,3}\s+CFR|\d{1,3}\s+NYCRR)\s*§?\s*[A-Za-z0-9.-]+/g;
  const phone = /\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
  for (const re of [dollar, hours, days, percent, customers, statute, phone]) {
    let m;
    while ((m = re.exec(text)) !== null) claims.add(m[0].trim());
  }
  return [...claims];
}

function main() {
  const id = process.argv[2];
  if (!id) {
    console.error('Usage: node scripts/fact-check-prompt.cjs <entry-id>');
    process.exit(1);
  }
  const filename = id + '.js';
  const filepath = path.join(ENTRIES_DIR, filename);
  if (!fs.existsSync(filepath)) {
    console.error('Entry not found: ' + filepath);
    process.exit(1);
  }
  const src = fs.readFileSync(filepath, 'utf8');
  const title = getEnFromField(src, 'title') || '(no title)';
  const summary = getEnFromField(src, 'summary') || '';
  const whatItMeans = getEnFromField(src, 'whatItMeans') || '';
  const example = getEnFromField(src, 'example') || '';
  const authorityType = (src.match(/authorityType:\s*"([^"]+)"/) || [])[1] || 'unknown';
  const primaryStatute = (src.match(/primaryStatute:\s*"([^"]+)"/) || [])[1] || null;
  const jurisdiction = (src.match(/jurisdiction:\s*"([^"]+)"/) || [])[1] || 'us-ny';

  const sourcesMatch = src.match(/sources:\s*\[([^\]]+)\]/s);
  const sources = sourcesMatch
    ? [...sourcesMatch[1].matchAll(/"([^"]+)"/g)].map(m => m[1])
    : [];

  const claims = [
    ...extractClaims(summary),
    ...extractClaims(whatItMeans),
    ...extractClaims(example),
  ];
  const uniqueClaims = [...new Set(claims)];

  const out = [
    '# HelpFinder Fact-Check Request',
    '',
    'Please fact-check the following legal explainer entry against current sources. The entry is read by non-attorneys looking for accurate, plain-language information about their rights.',
    '',
    `**Entry ID:** ${id}`,
    `**Title:** ${title}`,
    `**Jurisdiction:** ${jurisdiction}`,
    `**Authority type:** ${authorityType}` + (primaryStatute ? `  \n**Primary statute:** ${primaryStatute}` : ''),
    '',
    '## Specific claims to verify',
    '',
    'These numbers, thresholds, statutes, and phone numbers were auto-extracted from the body. Please verify each one against current authoritative sources:',
    '',
    uniqueClaims.length
      ? uniqueClaims.map(c => `- \`${c}\``).join('\n')
      : '_(no specific numbers extracted; review body claims directly)_',
    '',
    '## Cited sources in the entry',
    '',
    sources.length ? sources.map(s => `- ${s}`).join('\n') : '_(none)_',
    '',
    '## Summary',
    '',
    summary || '_(empty)_',
    '',
    '## What it means (body)',
    '',
    whatItMeans || '_(empty)_',
    '',
    example ? '## Example\n\n' + example + '\n' : '',
    '## Please report:',
    '',
    '1. **Factually wrong claims** — quote the wrong claim, give the correct value, and link the authoritative source (statute, regulation, agency page).',
    '2. **Outdated claims** — claims that were once correct but have changed (rule revised, dollar amount adjusted, phone number changed, agency renamed).',
    '3. **Material omissions** — important rights, protections, deadlines, or escalation paths a non-attorney reading this would want to know.',
    '4. **Misleading framing** — claims that are technically true but read as overstated or understated relative to what the law actually does.',
    '',
    'Be specific. "The dollar amount in section X is wrong; the actual cap is $Y per Z citation" is more useful than "the dollar amounts seem off."',
  ].filter(Boolean).join('\n');

  process.stdout.write(out + '\n');
}

main();
