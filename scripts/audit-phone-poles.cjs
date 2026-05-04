// scripts/audit-phone-poles.cjs
//
// Read-only. Inventories every phone-number reference in src/data/. Groups by
// normalized digit string. Cross-references existing canonical poles in
// src/data/canonical/phones.js.
//
// Usage:
//   node scripts/audit-phone-poles.cjs
//
// Output:
//   phone-pole-audit-2026-05-02.md   — human-readable report
//   phone-pole-audit-2026-05-02.json — full structured data for downstream use
//
// Excludes: short codes (988/211/311/etc) get a separate section so they don't
// drown the main report. False-positive guard: skip area codes starting with 0/1
// (not valid NANP).

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const CANONICAL_PHONES = path.join(DATA_DIR, 'canonical', 'phones.js');
const TODAY = new Date().toISOString().slice(0, 10);
const REPORT_MD = path.join(__dirname, '..', `phone-pole-audit-${TODAY}.md`);
const REPORT_JSON = path.join(__dirname, '..', `phone-pole-audit-${TODAY}.json`);

// Use explicit lookbehind/lookahead anchors instead of \b so optional opening
// paren `(` is captured into rawMatch. \b doesn't treat `(` as a word
// boundary, which previously caused `(585) 232-4090` to capture as
// `585) 232-4090` and overstate spelling-variant drift.
const PHONE_RE = /(?<![\d.])((?:1[-.\s]?)?\(?([2-9]\d{2})\)?[-.\s]*(\d{3})[-.\s]*(\d{4}))(?!\d)/g;
const SHORT_CODE_LITERALS = ['988', '211', '311', '511', '911', '741741'];

function walkJs(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      out.push(...walkJs(full));
    } else if (name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

function extractPhones(filepath) {
  const src = fs.readFileSync(filepath, 'utf8');
  const lines = src.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, idx) => {
    // Standard 10/11-digit numbers
    const matches = [...line.matchAll(PHONE_RE)];
    for (const m of matches) {
      // m[1] is the full phone match (incl. optional leading `1` and parens);
      // m[0] is identical because the outer group spans the whole pattern.
      const raw = m[1] || m[0];
      const digits = raw.replace(/\D/g, '');
      const normalized =
        digits.length === 11 && digits.startsWith('1') ? digits.substring(1) : digits;
      if (normalized.length !== 10) continue;
      if (normalized[0] === '0' || normalized[0] === '1') continue;
      hits.push({
        file: filepath,
        line: idx + 1,
        rawMatch: raw.trim(),
        digits: normalized,
      });
    }

    // Short codes — only count when they appear as a clearly-isolated token
    // (preceded/followed by quote, space, comma, semicolon, end-of-string).
    // Avoids matching "988" inside a longer phone number.
    for (const code of SHORT_CODE_LITERALS) {
      const codeRe = new RegExp(`(?:^|[\\s'"\`,;])${code}(?:[\\s'"\`,;.]|$)`, 'g');
      let m;
      while ((m = codeRe.exec(line)) !== null) {
        hits.push({
          file: filepath,
          line: idx + 1,
          rawMatch: code,
          digits: code,
          isShortCode: true,
        });
      }
    }
  });

  return hits;
}

function parseCanonical() {
  if (!fs.existsSync(CANONICAL_PHONES)) return new Map();
  const src = fs.readFileSync(CANONICAL_PHONES, 'utf8');
  const lines = src.split(/\r?\n/);
  const poles = new Map();
  let currentSlug = null;
  for (const line of lines) {
    const slugMatch = line.match(/^\s*([a-zA-Z][a-zA-Z0-9_]*)\s*:\s*\{/);
    if (slugMatch) currentSlug = slugMatch[1];
    const valueMatch = line.match(/value\s*:\s*['"]([^'"]+)['"]/);
    if (valueMatch && currentSlug) {
      const digits = valueMatch[1].replace(/\D/g, '');
      const normalized =
        digits.length === 11 && digits.startsWith('1') ? digits.substring(1) : digits;
      poles.set(normalized, { slug: currentSlug, raw: valueMatch[1] });
    }
  }
  return poles;
}

const KNOWN_CRISIS_DIGITS = new Set([
  '988', '211', '311', '8002738255', '8007997233', '8004224453',
  '8664887386', '8006564673', '8009855990', '8775658860', '8778467369',
  '8888439461',
]);

function main() {
  const files = walkJs(DATA_DIR);
  const allHits = [];
  for (const f of files) {
    allHits.push(...extractPhones(f));
  }
  const poles = parseCanonical();

  const byDigits = new Map();
  for (const hit of allHits) {
    if (!byDigits.has(hit.digits)) byDigits.set(hit.digits, []);
    byDigits.get(hit.digits).push(hit);
  }

  const totalRefs = allHits.length;
  const uniqueDigits = byDigits.size;
  const inCanonicalDigits = [...byDigits.keys()].filter(d => poles.has(d));
  const orphanDigits = [...byDigits.keys()].filter(d => !poles.has(d));
  const crisisDigits = [...byDigits.keys()].filter(d => KNOWN_CRISIS_DIGITS.has(d));

  const rel = (f) => path.relative(path.join(__dirname, '..'), f).replace(/\\/g, '/');

  // --- JSON output (full data) ---
  const jsonOut = {
    generatedAt: new Date().toISOString(),
    stats: {
      filesScanned: files.length,
      totalRefs,
      uniqueNumbers: uniqueDigits,
      inCanonical: inCanonicalDigits.length,
      orphans: orphanDigits.length,
      crisisNumbers: crisisDigits.length,
    },
    poles: Object.fromEntries([...poles.entries()].map(([d, p]) => [d, p])),
    numbers: Object.fromEntries(
      [...byDigits.entries()].map(([d, refs]) => [
        d,
        {
          digits: d,
          refCount: refs.length,
          inCanonical: poles.has(d),
          poleSlug: poles.get(d) ? poles.get(d).slug : null,
          isCrisis: KNOWN_CRISIS_DIGITS.has(d),
          isShortCode: refs.some(r => r.isShortCode),
          references: refs.map(r => ({
            file: rel(r.file),
            line: r.line,
            rawMatch: r.rawMatch,
          })),
        },
      ])
    ),
  };
  fs.writeFileSync(REPORT_JSON, JSON.stringify(jsonOut, null, 2));

  // --- Markdown report ---
  const md = [];
  md.push(`# Phone Pole Audit ${TODAY}`);
  md.push('');
  md.push('Read-only inventory of every phone reference in `src/data/`. Groups by normalized digit string (leading `1` stripped). Cross-references existing canonical poles in `src/data/canonical/phones.js`.');
  md.push('');
  md.push('## Stats');
  md.push('');
  md.push(`- Files scanned: **${files.length}**`);
  md.push(`- Total phone references: **${totalRefs}**`);
  md.push(`- Unique numbers: **${uniqueDigits}**`);
  md.push(`- Already in canonical poles: **${inCanonicalDigits.length}**`);
  md.push(`- **Orphans (need a pole):** **${orphanDigits.length}**`);
  md.push(`- Crisis-line numbers found anywhere: **${crisisDigits.length}**`);
  md.push('');

  // Crisis section first — most consequential
  md.push('## Crisis-line numbers');
  md.push('');
  md.push('These should all carry `blockDial: true` in the unified pole registry. Currently the dialer-helper.ps1 hardcodes the list; the goal is to derive it from this metadata.');
  md.push('');
  if (crisisDigits.length === 0) {
    md.push('_None found in src/data/._');
  } else {
    for (const d of crisisDigits.sort()) {
      const refs = byDigits.get(d);
      const inPole = poles.has(d);
      md.push(`### ${d} ${inPole ? `(in canonical: \`${poles.get(d).slug}\`)` : '**(NOT in canonical)**'} — ${refs.length} ref(s)`);
      md.push('');
      for (const r of refs.slice(0, 8)) {
        md.push(`- \`${rel(r.file)}:${r.line}\` — \`${r.rawMatch}\``);
      }
      if (refs.length > 8) md.push(`- _... and ${refs.length - 8} more refs_`);
      md.push('');
    }
  }

  // Orphans, sorted by ref count desc
  md.push('## Orphans (not in canonical) — sorted by reference count');
  md.push('');
  md.push('Each of these needs either (a) a new pole entry in `canonical/phones.js`, or (b) a decision that it\'s a one-off legal-entry-local number that doesn\'t need a global pole. Highest-reference-count numbers are the most consequential — drift on them propagates widest.');
  md.push('');
  const orphanList = orphanDigits
    .map(d => [d, byDigits.get(d)])
    .filter(([d, _]) => !KNOWN_CRISIS_DIGITS.has(d))
    .sort((a, b) => b[1].length - a[1].length);

  const TOP_ORPHAN_DETAIL = 75;
  for (let i = 0; i < orphanList.length; i++) {
    const [d, refs] = orphanList[i];
    if (i < TOP_ORPHAN_DETAIL) {
      md.push(`### ${d} — ${refs.length} ref(s)`);
      for (const r of refs.slice(0, 5)) {
        md.push(`- \`${rel(r.file)}:${r.line}\` — \`${r.rawMatch}\``);
      }
      if (refs.length > 5) md.push(`- _... and ${refs.length - 5} more refs_`);
      md.push('');
    }
  }
  if (orphanList.length > TOP_ORPHAN_DETAIL) {
    md.push(`_Truncated. ${orphanList.length - TOP_ORPHAN_DETAIL} additional orphan numbers in the JSON report._`);
    md.push('');
  }

  // In-canonical numbers — short summary
  md.push('## Numbers already in canonical poles');
  md.push('');
  const canonList = inCanonicalDigits
    .map(d => [d, byDigits.get(d), poles.get(d)])
    .sort((a, b) => b[1].length - a[1].length);
  md.push('| Digits | Pole slug | Refs |');
  md.push('|---|---|---|');
  for (const [d, refs, pole] of canonList) {
    md.push(`| ${d} | \`${pole.slug}\` | ${refs.length} |`);
  }
  md.push('');

  fs.writeFileSync(REPORT_MD, md.join('\n') + '\n');

  // --- Console summary ---
  console.log(`Report: ${REPORT_MD}`);
  console.log(`JSON:   ${REPORT_JSON}`);
  console.log('');
  console.log(`Files scanned:        ${files.length}`);
  console.log(`Phone references:     ${totalRefs}`);
  console.log(`Unique numbers:       ${uniqueDigits}`);
  console.log(`In canonical:         ${inCanonicalDigits.length}`);
  console.log(`Orphans:              ${orphanDigits.length}`);
  console.log(`Crisis numbers:       ${crisisDigits.length}`);
}

main();
