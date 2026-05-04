// scripts/phone-drift-sweep.cjs
//
// For every phone-number canonical pole, reports:
//   1. Spelling variants in src/data/ (e.g., "(585) 546-2130" vs "585-546-2130"
//      vs "585.546.2130") — same digits, different formatting.
//   2. Whether any of those variants differ from the pole's canonical `value`
//      string (style drift — not wrong, but inconsistent).
//   3. The reference count per variant + a sample file.
//
// Pre-req: run scripts/audit-phone-poles.cjs first to refresh the audit JSON.
// (This script reads that JSON; it doesn't re-walk src/data/.)
//
// Usage:
//   node scripts/audit-phone-poles.cjs && node scripts/phone-drift-sweep.cjs
//
// Output:
//   phone-drift-sweep-<DATE>.md   — human-readable report, top of repo
//   exit 0 if zero variants found, exit 1 if any drift exists (so it's CI-able)

const fs = require('fs');
const path = require('path');

const TODAY = new Date().toISOString().slice(0, 10);
const AUDIT_JSON = path.join(__dirname, '..', `phone-pole-audit-${TODAY}.json`);
const REPORT_MD = path.join(__dirname, '..', `phone-drift-sweep-${TODAY}.md`);

if (!fs.existsSync(AUDIT_JSON)) {
  console.error('Audit JSON not found: ' + AUDIT_JSON);
  console.error('Run: node scripts/audit-phone-poles.cjs');
  process.exit(2);
}

const audit = JSON.parse(fs.readFileSync(AUDIT_JSON, 'utf8'));
const poles = audit.poles || {};
const numbers = audit.numbers || {};

const driftEntries = [];
const cleanEntries = [];

for (const [digits, num] of Object.entries(numbers)) {
  if (!num.inCanonical) continue;
  const pole = poles[digits];
  if (!pole) continue;
  const canonicalValue = pole.raw;

  // Group references by exact raw-match string
  const byVariant = new Map();
  for (const ref of num.references) {
    const v = ref.rawMatch;
    if (!byVariant.has(v)) byVariant.set(v, []);
    byVariant.get(v).push(ref);
  }

  const variants = [...byVariant.keys()];
  const matchesCanonical = variants.filter(v => v === canonicalValue);
  const offCanonical = variants.filter(v => v !== canonicalValue);

  // Don't count the canonical-source-file itself (the pole's own value: '...' line)
  // appears in the references, but it's the source of truth, not drift.
  const realRefs = num.references.filter(r => !r.file.endsWith('canonical/phones.js'));
  const realRefCount = realRefs.length;

  if (variants.length > 1 || (offCanonical.length > 0 && realRefCount > 0)) {
    driftEntries.push({
      digits,
      slug: pole.slug,
      canonicalValue,
      variants,
      offCanonical,
      byVariant: [...byVariant.entries()].map(([variant, refs]) => ({
        variant,
        refCount: refs.length,
        sampleFile: refs[0].file,
        sampleLine: refs[0].line,
      })),
      realRefCount,
    });
  } else {
    cleanEntries.push({ digits, slug: pole.slug, canonicalValue, refCount: realRefCount });
  }
}

driftEntries.sort((a, b) => b.realRefCount - a.realRefCount);

// --- Markdown report ---
const md = [];
md.push(`# Phone Drift Sweep ${TODAY}`);
md.push('');
md.push(`Reads \`phone-pole-audit-${TODAY}.json\`. Reports canonical poles with spelling-variant drift in \`src/data/\`.`);
md.push('');
md.push('## Summary');
md.push('');
md.push(`- Canonical poles checked: **${driftEntries.length + cleanEntries.length}**`);
md.push(`- Poles with drift (multiple variants OR off-canonical formatting): **${driftEntries.length}**`);
md.push(`- Poles clean (single variant matching canonical): **${cleanEntries.length}**`);
md.push('');

if (driftEntries.length === 0) {
  md.push('## ✓ No drift');
  md.push('');
  md.push('Every poled number is referenced consistently and matches its canonical `value`. No action needed.');
} else {
  md.push('## Drift detail');
  md.push('');
  md.push('Each entry below is a canonical pole with multiple spelling variants OR a variant that doesn\'t match the canonical `value`. Sorted by reference count desc — highest-impact at top.');
  md.push('');

  for (const e of driftEntries) {
    md.push(`### ${e.slug} (${e.digits}) — ${e.realRefCount} ref(s)`);
    md.push('');
    md.push(`Canonical \`value\`: \`${e.canonicalValue}\``);
    md.push('');
    md.push('| Variant | Refs | Matches canonical? | Sample |');
    md.push('|---|---|---|---|');
    for (const v of e.byVariant) {
      const matches = v.variant === e.canonicalValue ? '✓' : '✗';
      const rel = path.relative(path.join(__dirname, '..'), v.sampleFile).replace(/\\/g, '/');
      md.push(`| \`${v.variant}\` | ${v.refCount} | ${matches} | \`${rel}:${v.sampleLine}\` |`);
    }
    md.push('');
  }

  md.push('## Suggested response');
  md.push('');
  md.push('Drift is **not** automatically wrong. The dialer doesn\'t care about formatting (it strips non-digits). Rendered output to readers also doesn\'t care. Drift matters when:');
  md.push('');
  md.push('1. **Style consistency** is desired across user-facing entries (e.g., always `NNN-NNN-NNNN` per Rochester convention).');
  md.push('2. **Future migration** to canonical pole imports needs a single canonical spelling to replace.');
  md.push('3. **Search-and-replace edits** missed some variants when a number changed.');
  md.push('');
  md.push('Each row above can be normalized in-place via a one-shot regex script if a maintainer decides the canonical formatting is the goal. Until then this report is informational.');
}

md.push('');
md.push('## Clean poles (no drift)');
md.push('');
md.push('| Slug | Canonical value | Refs |');
md.push('|---|---|---|');
for (const e of cleanEntries.sort((a, b) => b.refCount - a.refCount)) {
  md.push(`| \`${e.slug}\` | \`${e.canonicalValue}\` | ${e.refCount} |`);
}

fs.writeFileSync(REPORT_MD, md.join('\n') + '\n');

console.log(`Drift sweep complete:`);
console.log(`  Poles checked:         ${driftEntries.length + cleanEntries.length}`);
console.log(`  With drift:            ${driftEntries.length}`);
console.log(`  Clean:                 ${cleanEntries.length}`);
console.log(`  Report:                ${REPORT_MD}`);

process.exit(driftEntries.length > 0 ? 1 : 0);
