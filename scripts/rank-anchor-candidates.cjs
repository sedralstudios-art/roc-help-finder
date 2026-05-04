// scripts/rank-anchor-candidates.cjs
//
// Identifies the top N most-cited NY statutes across legal entries, ranks
// them by reference count, and surfaces the strongest anchor candidate
// per statute (the existing entry whose primaryStatute matches and which
// has the most-developed plain-English summary).
//
// Step 3 of the legal-entry drift architecture: pick which statutes get
// the next round of anchors. Entries already flagged isAnchor:true are
// excluded from "candidates" — those statutes already have an anchor.
//
// Usage:
//   node scripts/rank-anchor-candidates.cjs                 # top 20
//   node scripts/rank-anchor-candidates.cjs --top 40         # top 40
//   node scripts/rank-anchor-candidates.cjs --out anchor-candidates.md
//
// Output: markdown report; defaults to stdout. With --out, writes to file.

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

const args = process.argv.slice(2);
const topIdx = args.indexOf('--top');
const TOP_N = topIdx >= 0 ? parseInt(args[topIdx + 1], 10) : 20;
const outIdx = args.indexOf('--out');
const OUT = outIdx >= 0 ? args[outIdx + 1] : null;

function listEntryFiles() {
  return fs.readdirSync(ENTRIES_DIR)
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(ENTRIES_DIR, f));
}

function parseEntryFields(filepath) {
  const src = fs.readFileSync(filepath, 'utf8');
  const id = (src.match(/\bid:\s*"([^"]+)"/) || [])[1];
  const primaryStatute = (src.match(/\bprimaryStatute:\s*"([^"]+)"/) || [])[1] || null;
  const isAnchor = /\bisAnchor\s*:\s*true\b/.test(src);
  const status = (src.match(/\bstatus:\s*"([^"]+)"/) || [])[1] || 'active';
  const isDraft = /\bdraft\s*:\s*true\b/.test(src);

  // whatItMeans length is a rough proxy for "developed summary"
  const wimMatch = src.match(/whatItMeans:\s*\{\s*\n?\s*en:\s*"((?:[^"\\]|\\.)*)"/s);
  const wimLen = wimMatch ? wimMatch[1].length : 0;

  // Count sources to gauge depth
  const sourcesMatch = src.match(/sources:\s*\[([\s\S]*?)\]/);
  const sourcesCount = sourcesMatch ? (sourcesMatch[1].match(/"https?:[^"]+"/g) || []).length : 0;

  // Title
  const title = (src.match(/title:\s*\{\s*en:\s*"([^"]+)"/) || [])[1] || id;

  // Has factCheckedBy stamp?
  const factChecked = /\bfactCheckedBy:\s*\{/.test(src);

  return {
    id, primaryStatute, isAnchor, status, isDraft, wimLen, sourcesCount, title, factChecked, file: filepath,
  };
}

function normalizeStatute(s) {
  // "NY RPP 235-B" → "NY RPP 235-B" (basic whitespace normalization)
  // "NY GBS § 349" → "NY GBS 349"
  // "RPL 235-b" → "RPL 235-B" (uppercase the suffix)
  return s.replace(/§\s*/g, '').replace(/\s+/g, ' ').trim().toUpperCase();
}

function main() {
  const files = listEntryFiles();
  const entries = files.map(parseEntryFields).filter(e => e.id && e.status === 'active' && !e.isDraft);

  // Group by normalized primaryStatute
  const byStatute = new Map();
  for (const e of entries) {
    if (!e.primaryStatute) continue;
    const key = normalizeStatute(e.primaryStatute);
    if (!byStatute.has(key)) byStatute.set(key, []);
    byStatute.get(key).push(e);
  }

  // Build ranking: skip statutes that already have an anchor
  const ranked = [];
  for (const [statute, group] of byStatute.entries()) {
    const hasAnchor = group.some(e => e.isAnchor);
    if (hasAnchor) continue;
    if (group.length < 1) continue;

    // Score each candidate entry by depth (whatItMeans length + sources count + factChecked bonus)
    const candidates = group.map(e => ({
      ...e,
      score: e.wimLen + e.sourcesCount * 200 + (e.factChecked ? 500 : 0),
    })).sort((a, b) => b.score - a.score);

    ranked.push({
      statute,
      entryCount: group.length,
      bestCandidate: candidates[0],
      otherEntries: candidates.slice(1).map(c => c.id),
    });
  }

  // Already-anchored statutes for context
  const alreadyAnchored = [];
  for (const [statute, group] of byStatute.entries()) {
    if (!group.some(e => e.isAnchor)) continue;
    const anchor = group.find(e => e.isAnchor);
    alreadyAnchored.push({
      statute,
      anchorId: anchor.id,
      otherEntryCount: group.length - 1,
    });
  }

  ranked.sort((a, b) => b.entryCount - a.entryCount);

  const top = ranked.slice(0, TOP_N);

  // Build report
  const md = [];
  md.push(`# Anchor candidate ranking — top ${TOP_N} unanchored statutes`);
  md.push('');
  md.push(`Generated ${new Date().toISOString().slice(0, 10)} by \`scripts/rank-anchor-candidates.cjs\`.`);
  md.push('');
  md.push(`Considered ${entries.length} active non-draft legal entries. ${byStatute.size} unique statutes referenced via \`primaryStatute\`. ${alreadyAnchored.length} statutes already have an anchor (excluded from this list). ${ranked.length} statutes are unanchored with at least one entry; top ${top.length} shown below by count.`);
  md.push('');
  md.push('## Already-anchored statutes (context)');
  md.push('');
  if (alreadyAnchored.length === 0) {
    md.push('_None._');
  } else {
    md.push('| Statute | Anchor entry | Other entries citing same statute |');
    md.push('|---|---|---|');
    for (const a of alreadyAnchored) {
      md.push(`| \`${a.statute}\` | \`${a.anchorId}\` | ${a.otherEntryCount} |`);
    }
  }
  md.push('');
  md.push(`## Top ${TOP_N} unanchored statute candidates`);
  md.push('');
  md.push("Ranked by `entries citing it`. Each row's \"best candidate entry\" is the existing entry with the deepest `whatItMeans` + most sources + factCheckedBy bonus — the natural starting point for promotion to an anchor.");
  md.push('');
  md.push('| # | Statute | Entries citing | Best candidate entry | wim chars | sources | factChecked |');
  md.push('|---|---|---|---|---|---|---|');
  top.forEach((r, i) => {
    const c = r.bestCandidate;
    md.push(`| ${i + 1} | \`${r.statute}\` | ${r.entryCount} | \`${c.id}\` | ${c.wimLen} | ${c.sourcesCount} | ${c.factChecked ? '✓' : ''} |`);
  });
  md.push('');
  md.push('## Detail per candidate');
  md.push('');
  top.forEach((r, i) => {
    const c = r.bestCandidate;
    md.push(`### ${i + 1}. \`${r.statute}\` — ${r.entryCount} entries`);
    md.push('');
    md.push(`**Best anchor candidate:** \`${c.id}\``);
    md.push(`- Title: ${c.title}`);
    md.push(`- whatItMeans length: ${c.wimLen} chars`);
    md.push(`- Sources: ${c.sourcesCount}`);
    md.push(`- factCheckedBy stamp: ${c.factChecked ? 'present' : '(none)'}`);
    if (r.otherEntries.length > 0) {
      md.push('');
      md.push('Other entries citing the same statute (would reference the anchor via `statuteAnchor` after promotion):');
      for (const oid of r.otherEntries.slice(0, 10)) {
        md.push(`- \`${oid}\``);
      }
      if (r.otherEntries.length > 10) md.push(`- _... and ${r.otherEntries.length - 10} more_`);
    }
    md.push('');
  });

  const out = md.join('\n') + '\n';
  if (OUT) {
    fs.writeFileSync(OUT, out);
    console.error(`Wrote ${out.length} chars to ${OUT}`);
  } else {
    process.stdout.write(out);
  }
}

main();
