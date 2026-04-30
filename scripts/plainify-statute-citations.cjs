// One-shot: expand NY code abbreviations in legal entry body text to their
// full readable names. The citation parser already does this for sources/URLs
// (parseSource in LegalLibrary.jsx, parseSourceSSR in prerender-legal.cjs);
// this script does the equivalent transformation in body fields.
//
// Examples of transformations:
//   "NY GOL § 5-1801"       → "NY General Obligations Law § 5-1801"
//   "GOL § 5-1801"          → "General Obligations Law § 5-1801"
//   "NY GOL 5-1801"         → "NY General Obligations Law § 5-1801"  (also adds §)
//   "NY GOL Section 5-1801" → "NY General Obligations Law § 5-1801"
//
// SAFETY:
//   - Skips the 7 Germain-approved bankruptcy files (DO NOT MODIFY rule)
//   - Dry-run mode by default; pass --write to apply
//   - Reports per-file change counts and a sample of transformations
//   - Only matches abbreviations explicitly in NY_CODE_NAMES (no false-positive
//     expansion of non-code two-letter words)
//   - Preserves text that's already plain ("NY General Obligations Law § 5-1801"
//     stays unchanged because the regex requires the abbreviation form)

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ENTRIES_DIR = path.join(ROOT, 'src', 'data', 'legal', 'entries');

// Authoritative NY code map — copied from prerender-legal.cjs NY_CODE_NAMES.
// Keep in sync with that file. (Source of truth: nysenate.gov code prefixes.)
const NY_CODE_NAMES = {
  RPP: "Real Property Law", RPA: "Real Property Actions and Proceedings Law",
  RPT: "Real Property Tax Law", GBS: "General Business Law",
  GOB: "General Obligations Law", PBH: "Public Health Law",
  PBS: "Public Service Law", LAB: "Labor Law", PEN: "Penal Law",
  VAT: "Vehicle and Traffic Law", TAX: "Tax Law", ELD: "Elder Law",
  EDN: "Education Law", EXC: "Executive Law", DOM: "Domestic Relations Law",
  DRL: "Domestic Relations Law", CVP: "Civil Practice Law and Rules",
  CPL: "Criminal Procedure Law", EPT: "Estates, Powers and Trusts Law",
  SOS: "Social Services Law", ISC: "Insurance Law", MHY: "Mental Hygiene Law",
  GMU: "General Municipal Law", TWN: "Town Law", VIL: "Village Law",
  GCT: "General City Law", ELN: "Election Law", LIE: "Lien Law",
  AGM: "Agriculture and Markets Law", PPL: "Personal Property Law",
  SCP: "Surrogate's Court Procedure Act", NAV: "Navigation Law",
  ENV: "Environmental Conservation Law", BNK: "Banking Law",
  CAN: "Cannabis Law", CNB: "Cannabis Law", ABP: "Abandoned Property Law",
  FCT: "Family Court Act", JUD: "Judiciary Law", COR: "Correction Law",
  CVR: "Civil Rights Law", CVS: "Civil Service Law",
  UCC: "Uniform Commercial Code", WKC: "Workers' Compensation Law",
  MDW: "Multiple Dwelling Law", MIL: "Military Law",
  NPC: "Not-for-Profit Corporation Law", PBO: "Public Officers Law",
};

// People sometimes write "GOL" instead of "GOB" — both refer to General
// Obligations Law. Add common informal variants here so they expand correctly.
const INFORMAL_ALIASES = {
  GOL: "General Obligations Law",  // GOL is the common short form even though USPTO/Senate use GOB
};
Object.assign(NY_CODE_NAMES, INFORMAL_ALIASES);

// The 7 Germain-approved bankruptcy entries — do not modify under any circumstance.
// Verified 2026-04-30 by ls + grep "Reviewed by Prof. Germain" on each file.
const BANKRUPTCY_SKIP = new Set([
  'bankruptcy-automatic-stay-ny.js',
  'bankruptcy-chapter13-ny.js',
  'bankruptcy-chapter7-ny.js',
  'bankruptcy-discharge-ny.js',
  'bankruptcy-exemptions-ny.js',
  'bankruptcy-means-test-ny.js',
  'bankruptcy-reaffirmation-ny.js',
]);

// Build a regex that matches any of the abbreviations in NY_CODE_NAMES.
// We require word boundaries on both sides + a section number after.
const ABBR_GROUP = Object.keys(NY_CODE_NAMES).join('|');

// Match patterns like:
//   "NY GOL § 5-1801"
//   "NY GOL 5-1801"
//   "NY GOL Section 5-1801"
//   "GOL § 5-1801"
// Capture: (1) optional "NY " prefix (2) abbreviation (3) section identifier
// Section identifier allows: digits, letters (suffix), hyphens, dots, parens with subsections
const CITATION_RE = new RegExp(
  '\\b(NY\\s+)?(' + ABBR_GROUP + ')\\s+(?:§\\s*|Section\\s+)?' +
  '(\\d+(?:[-.][\\w-]+)?(?:\\([a-z0-9]+\\))?)' +
  '(?!\\w)', // not followed by a word char (avoid eating into longer matches)
  'g'
);

const args = process.argv.slice(2);
const writeMode = args.includes('--write');
const verbose = args.includes('--verbose');

function expandCitation(match, nyPrefix, abbr, section) {
  const name = NY_CODE_NAMES[abbr];
  if (!name) return match; // unknown abbreviation, leave alone
  // Compose the readable form
  const ny = nyPrefix ? nyPrefix : '';
  return ny + name + ' § ' + section;
}

const files = fs.readdirSync(ENTRIES_DIR).filter((f) => f.endsWith('.js'));
let totalFiles = 0;
let totalChanges = 0;
let filesChanged = 0;
const sampleTransformations = [];

// Identify whether a quoted string is "prose" (body text — modify) or
// "metadata" (a bare citation in primaryStatute, a tag, etc. — skip).
//
// Heuristic: a metadata string consists entirely of citations + simple
// separators (commas, spaces, periods, parens, "and"). A prose string
// contains real sentence content beyond the citation.
//
// Implementation: strip all citation-shaped substrings from the string;
// if what remains is only whitespace/punctuation/short connector words,
// treat as metadata. Otherwise prose.
function isProseString(str, citations) {
  let stripped = str;
  for (const c of citations) {
    stripped = stripped.replace(c, '');
  }
  // What remains: should have substantial real content for prose
  const cleaned = stripped.replace(/[\s,.;:()\[\]"'/-]+/g, ' ').trim();
  // Filter out tiny connector words that don't indicate prose
  const tokens = cleaned.split(/\s+/).filter((t) => t.length > 2 && !/^(and|or|the|under)$/i.test(t));
  return tokens.length >= 3; // at least 3 substantive words = prose
}

// Find all quoted "..." strings in the file content and process each one.
// Inside metadata strings (primaryStatute, tags, etc.) we leave citations alone.
const STRING_RE = /"((?:[^"\\]|\\.)*)"/g;

for (const file of files) {
  if (BANKRUPTCY_SKIP.has(file)) {
    if (verbose) console.log('SKIP (bankruptcy): ' + file);
    continue;
  }
  totalFiles++;
  const filePath = path.join(ENTRIES_DIR, file);
  const original = fs.readFileSync(filePath, 'utf8');

  let changesInFile = 0;
  const fileTransformations = [];

  const updated = original.replace(STRING_RE, (fullMatch, inner) => {
    // Find all citations in this string
    const citations = [];
    let cm;
    const localRe = new RegExp(CITATION_RE.source, 'g');
    while ((cm = localRe.exec(inner)) !== null) {
      citations.push(cm[0]);
    }
    if (citations.length === 0) return fullMatch;

    // Skip metadata strings (bare citations, no surrounding prose)
    if (!isProseString(inner, citations)) return fullMatch;

    // Apply expansion within this prose string only
    const expanded = inner.replace(CITATION_RE, (m, nyPrefix, abbr, section) => {
      const replacement = expandCitation(m, nyPrefix, abbr, section);
      if (replacement === m) return m;
      changesInFile++;
      if (fileTransformations.length < 3) {
        fileTransformations.push(m + ' → ' + replacement);
      }
      return replacement;
    });
    return '"' + expanded + '"';
  });

  if (changesInFile === 0) continue;
  filesChanged++;
  totalChanges += changesInFile;

  if (sampleTransformations.length < 15) {
    sampleTransformations.push({ file, transformations: fileTransformations, count: changesInFile });
  }

  if (writeMode) {
    fs.writeFileSync(filePath, updated);
  }
}

console.log('');
console.log('Scanned ' + totalFiles + ' entries (skipped ' + BANKRUPTCY_SKIP.size + ' Germain bankruptcy)');
console.log('Files with changes:    ' + filesChanged);
console.log('Total citations expanded: ' + totalChanges);
console.log('');
console.log('Sample transformations (up to 15 files):');
for (const s of sampleTransformations) {
  console.log('  ' + s.file + ' (' + s.count + ' total)');
  for (const t of s.transformations) {
    console.log('    ' + t);
  }
}
console.log('');
if (writeMode) {
  console.log('✓ Wrote ' + filesChanged + ' files');
} else {
  console.log('Dry-run complete. Pass --write to apply.');
}
