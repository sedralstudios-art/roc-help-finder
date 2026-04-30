// scripts/check-source-drift.cjs
//
// Source-hash drift detector for anchor entries (legal-entry drift architecture
// step 2; see src/data/legal/ANCHORS.md for spec).
//
// For every legal entry with `isAnchor: true`, fetch the anchorSource.url,
// extract the readable text, SHA-256 hash it, and compare to the stored
// anchorSource.hash. Diff → the source page changed since last review →
// flag the anchor (and every entry that references it) for re-review.
//
// Modes:
//   node scripts/check-source-drift.cjs                  # report only — no writes
//   node scripts/check-source-drift.cjs --write          # write hash updates;
//                                                          for diffs, also set
//                                                          sourceChangedSince to today
//   node scripts/check-source-drift.cjs --id <entry-id>  # scope to one anchor
//   node scripts/check-source-drift.cjs --id X --write   # write for that one
//
// What "writes" do:
//   • If anchor has empty hash → fetch, write the initial hash + lastFetched.
//     (sourceChangedSince stays null — first fetch, nothing to compare to.)
//   • If anchor's stored hash matches current fetch → just update lastFetched.
//   • If hashes differ → write new hash, update lastFetched, set
//     sourceChangedSince to today's date. The anchor (and every entry that
//     references it via statuteAnchor) now flags for human re-review.
//
// What this script does NOT do:
//   • Decide whether the change is substantive (just detects ANY readable-text
//     change). False positives from site nav refreshes are visible in the
//     report and resolvable in batch.
//   • Bill tracking (that's step 5).
//   • Fetch case-law sources (no caseAnchor support yet — separate shape).
//   • Reviewer attribution (lastFormallyReviewed is set by humans, not this
//     script).

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');
const USER_AGENT = 'HelpFinder-source-drift/1.0 (+https://helpfinder.help; contact: adimarzo222@gmail.com)';
const FETCH_TIMEOUT_MS = 15000;
const TODAY = new Date().toISOString().slice(0, 10);

// ─── arg parsing ───────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const writeMode = args.includes('--write');
const idIdx = args.indexOf('--id');
const scopedId = idIdx >= 0 ? args[idIdx + 1] : null;

// ─── readable-text extraction ──────────────────────────────────────────────
// Per ANCHORS.md: hash over the readable content, not full HTML. A site nav
// refresh shouldn't trigger a false positive; a statute-text edit should.
function extractReadableText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<aside[\s\S]*?<\/aside>/gi, ' ')
    .replace(/<form[\s\S]*?<\/form>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#?\w+;/g, ' ')        // strip any remaining numeric/named entities
    .replace(/\s+/g, ' ')
    .trim();
}

function sha256Hex(s) {
  return crypto.createHash('sha256').update(s, 'utf8').digest('hex');
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, 'Accept': 'text/html,application/xhtml+xml' },
      signal: controller.signal,
      redirect: 'follow',
    });
    if (!res.ok) {
      return { ok: false, status: res.status, statusText: res.statusText };
    }
    const text = await res.text();
    return { ok: true, text };
  } catch (e) {
    return { ok: false, error: String(e) };
  } finally {
    clearTimeout(t);
  }
}

// ─── anchor extraction from JS source files ────────────────────────────────
// We treat each entry file as text and regex-extract the fields we need.
// Avoids dynamic require()ing every entry, and is robust to the schema's
// JS-object literals.

function listEntryFiles() {
  return fs.readdirSync(ENTRIES_DIR)
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(ENTRIES_DIR, f));
}

function parseAnchorFields(filepath) {
  const src = fs.readFileSync(filepath, 'utf8');
  if (!/\bisAnchor\s*:\s*true\b/.test(src)) return null;

  const id = (src.match(/\bid:\s*"([^"]+)"/) || [])[1];
  const url = (src.match(/anchorSource:\s*\{[\s\S]*?\burl:\s*"([^"]+)"/) || [])[1];
  const hash = (src.match(/anchorSource:\s*\{[\s\S]*?\bhash:\s*"([^"]*)"/) || [])[1];
  const lastFetched = (src.match(/anchorSource:\s*\{[\s\S]*?\blastFetched:\s*"([^"]*)"/) || [])[1];
  const lastFormallyReviewed = (src.match(/\blastFormallyReviewed:\s*"([^"]*)"/) || [])[1];
  const sourceChangedSince = (src.match(/\bsourceChangedSince:\s*"?([^,"\n}]*)"?/) || [])[1];

  return {
    file: filepath,
    src,
    id,
    url,
    hash: hash || null,
    lastFetched: lastFetched || null,
    lastFormallyReviewed: lastFormallyReviewed || null,
    sourceChangedSince: (sourceChangedSince && sourceChangedSince !== 'null') ? sourceChangedSince : null,
  };
}

// ─── write-back into entry file (when --write) ─────────────────────────────
// Uses string replacement scoped to the anchorSource block so we don't
// disturb other parts of the file. Each anchor field is rewritten by
// targeting its key + current value pattern.

function rewriteAnchorSourceField(src, key, newValue) {
  // Match `<key>: "old-value"` inside the anchorSource block. We rely on the
  // anchorSource block being a simple object literal with double-quoted strings.
  const re = new RegExp(
    '(anchorSource:\\s*\\{[\\s\\S]*?\\b' + key + ':\\s*)"[^"]*"',
    'm',
  );
  return src.replace(re, `$1"${newValue}"`);
}

function rewriteTopLevelField(src, key, newValueLiteral) {
  // newValueLiteral is the literal JS to substitute (e.g. '"2026-04-30"' or 'null').
  // Match `<key>: <something up to comma or newline>` at top level.
  const re = new RegExp('(\\b' + key + ':\\s*)(?:"[^"]*"|null)', 'm');
  if (!re.test(src)) {
    // Field not present — append it before the closing `};`. Conservative:
    // only do this if we're writing a real value.
    if (newValueLiteral === 'null') return src;
    return src.replace(/(\n};\s*)$/, `,\n  ${key}: ${newValueLiteral}$1`);
  }
  return src.replace(re, `$1${newValueLiteral}`);
}

function applyWrite(anchor, newHash, hashChanged) {
  let src = anchor.src;
  src = rewriteAnchorSourceField(src, 'hash', newHash);
  src = rewriteAnchorSourceField(src, 'lastFetched', TODAY);
  if (hashChanged) {
    src = rewriteTopLevelField(src, 'sourceChangedSince', `"${TODAY}"`);
  }
  fs.writeFileSync(anchor.file, src);
}

// ─── main ──────────────────────────────────────────────────────────────────
(async () => {
  const files = listEntryFiles();
  const anchors = [];
  for (const f of files) {
    const a = parseAnchorFields(f);
    if (a && (!scopedId || a.id === scopedId)) anchors.push(a);
  }

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  Source-drift check for anchor entries');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('Mode:                 ' + (writeMode ? 'WRITE (will modify entry files)' : 'report-only'));
  if (scopedId) console.log('Scoped to id:         ' + scopedId);
  console.log('Anchors found:        ' + anchors.length);
  console.log('Today:                ' + TODAY);
  console.log('');

  if (anchors.length === 0) {
    console.log('No anchor entries found yet. Add `isAnchor: true` and an `anchorSource` block');
    console.log('to a legal entry per src/data/legal/ANCHORS.md, then re-run.');
    console.log('');
    return;
  }

  let initialized = 0, unchanged = 0, drifted = 0, errored = 0;

  for (const a of anchors) {
    process.stdout.write('• ' + a.id.padEnd(40) + ' ');
    if (!a.url) {
      console.log('SKIP — no anchorSource.url');
      errored++;
      continue;
    }

    const fetched = await fetchWithTimeout(a.url);
    if (!fetched.ok) {
      const why = fetched.error || (fetched.status + ' ' + fetched.statusText);
      console.log('FETCH-FAILED — ' + why);
      errored++;
      continue;
    }

    const text = extractReadableText(fetched.text);
    const newHash = sha256Hex(text);

    if (!a.hash) {
      console.log('INITIAL  hash=' + newHash.slice(0, 16) + '… len=' + text.length);
      if (writeMode) applyWrite(a, newHash, /* hashChanged */ false);
      initialized++;
    } else if (a.hash === newHash) {
      console.log('UNCHANGED');
      if (writeMode) applyWrite(a, newHash, false); // refresh lastFetched
      unchanged++;
    } else {
      console.log('DRIFTED  was=' + a.hash.slice(0, 12) + '… now=' + newHash.slice(0, 12) + '…');
      console.log('         lastFormallyReviewed: ' + (a.lastFormallyReviewed || '(none)'));
      console.log('         url: ' + a.url);
      if (writeMode) applyWrite(a, newHash, /* hashChanged */ true);
      drifted++;
    }
  }

  console.log('');
  console.log('───────────────────────────────────────────────────────────────');
  console.log('Summary:');
  console.log('  Initialized (first hash): ' + initialized);
  console.log('  Unchanged:                ' + unchanged);
  console.log('  Drifted (need re-review): ' + drifted);
  console.log('  Errored / unreachable:    ' + errored);
  console.log('');
  if (!writeMode && (initialized || drifted)) {
    console.log('Re-run with --write to persist hash updates and sourceChangedSince stamps.');
    console.log('');
  }
  if (drifted > 0) {
    console.log('Drifted anchors need re-review by an attorney (or attorney-equivalent reader).');
    console.log('After re-reading the source and confirming the entry is still accurate,');
    console.log('update lastFormallyReviewed to today and clear sourceChangedSince to null.');
    console.log('');
  }
  process.exit(errored > 0 ? 2 : 0);
})();
