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
// Some authoritative sources (notably nysenate.gov) reject custom-named bots
// with 403. We send a recent-Chrome UA — still publicly identifying the bot
// purpose via Accept-Language and an X-Bot-Source header so well-behaved
// hosts can recognize and rate-limit us if they want to.
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
const BOT_HEADERS = {
  'X-Bot-Source': 'HelpFinder-source-drift/1.0 (+https://helpfinder.help)',
  'X-Bot-Contact': 'adimarzo222@gmail.com',
  'X-Bot-Purpose': 'detect-statute-text-changes-for-legal-aid-content',
};
const FETCH_TIMEOUT_MS = 15000;
const TODAY = new Date().toISOString().slice(0, 10);
const BOT_BLOCKED_LIST = path.join(__dirname, 'data', 'bot-blocked-sources.json');

// ─── arg parsing ───────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const writeMode = args.includes('--write');
const idIdx = args.indexOf('--id');
const scopedId = idIdx >= 0 ? args[idIdx + 1] : null;

// `--from-text <anchor-id> <text-file>` — ingest phone-captured statute text.
// Computes the SHA-256 of the file contents (after the same whitespace
// normalization the live extractor uses) and writes it to the anchor as if
// the bot fetch had succeeded. This is how bot-blocked sources get their
// hash populated — Anthony captures the page text on his phone (browser →
// share → save / paste / ADB), saves to a .txt file, and runs:
//   node scripts/check-source-drift.cjs --from-text tenant-habitability-ny path/to/text.txt --write
const fromTextIdx = args.indexOf('--from-text');
const fromTextAnchor = fromTextIdx >= 0 ? args[fromTextIdx + 1] : null;
const fromTextFile = fromTextIdx >= 0 ? args[fromTextIdx + 2] : null;

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
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        ...BOT_HEADERS,
      },
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

// ─── bot-blocked source tracker ─────────────────────────────────────────────
// Persisted across runs. When a fetch returns 403/429/etc we add the URL
// (and the anchor it serves) to a list. After the run, the list is printed
// and saved so phone-mediated capture can clear them in batch.

function loadBotBlockedList() {
  if (!fs.existsSync(BOT_BLOCKED_LIST)) return { entries: [] };
  try { return JSON.parse(fs.readFileSync(BOT_BLOCKED_LIST, 'utf8')); }
  catch (e) { return { entries: [] }; }
}

function saveBotBlockedList(data) {
  fs.mkdirSync(path.dirname(BOT_BLOCKED_LIST), { recursive: true });
  fs.writeFileSync(BOT_BLOCKED_LIST, JSON.stringify(data, null, 2));
}

function recordBlocked(list, anchorId, url, status, statusText) {
  // Keep one entry per (anchorId, url). Most-recent timestamp wins.
  list.entries = list.entries.filter(e => !(e.anchorId === anchorId && e.url === url));
  list.entries.push({
    anchorId,
    url,
    domain: new URL(url).hostname,
    status,
    statusText,
    blockedAt: TODAY,
  });
}

function clearBlocked(list, anchorId) {
  list.entries = list.entries.filter(e => e.anchorId !== anchorId);
}

// ─── --from-text mode (phone-captured ingestion) ────────────────────────────
function runFromText(anchorId, textPath) {
  if (!fs.existsSync(textPath)) {
    console.error('FATAL: text file not found: ' + textPath);
    process.exit(1);
  }
  const files = listEntryFiles();
  let anchor = null;
  for (const f of files) {
    const a = parseAnchorFields(f);
    if (a && a.id === anchorId) { anchor = a; break; }
  }
  if (!anchor) {
    console.error('FATAL: no anchor entry with id ' + anchorId);
    process.exit(1);
  }
  const raw = fs.readFileSync(textPath, 'utf8');
  // Phone-captured text doesn't have HTML; just normalize whitespace the same
  // way the live extractor does, so hashes from both paths are comparable.
  const text = raw.replace(/\s+/g, ' ').trim();
  const newHash = sha256Hex(text);

  console.log('');
  console.log('Anchor:       ' + anchor.id);
  console.log('Source URL:   ' + anchor.url);
  console.log('Text file:    ' + textPath + '  (' + text.length + ' chars)');
  console.log('Stored hash:  ' + (anchor.hash || '(none)'));
  console.log('New hash:     ' + newHash);

  if (!writeMode) {
    console.log('');
    console.log('Re-run with --write to persist this hash to the anchor entry.');
    return;
  }
  const hashChanged = !!anchor.hash && anchor.hash !== newHash;
  applyWrite(anchor, newHash, hashChanged);
  // Phone-captured = bot block resolved for this anchor; clear it from the list.
  const list = loadBotBlockedList();
  clearBlocked(list, anchorId);
  saveBotBlockedList(list);
  console.log('');
  console.log(hashChanged ? '✓ DRIFTED (hash changed) — sourceChangedSince stamped to ' + TODAY
                          : '✓ ' + (anchor.hash ? 'UNCHANGED' : 'INITIAL') + ' — hash + lastFetched written');
  console.log('  Cleared ' + anchorId + ' from bot-blocked list.');
}

// ─── main ──────────────────────────────────────────────────────────────────
(async () => {
  if (fromTextAnchor) { runFromText(fromTextAnchor, fromTextFile); return; }

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

  const blockedList = loadBotBlockedList();
  let initialized = 0, unchanged = 0, drifted = 0, errored = 0, blocked = 0;

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
      // Treat HTTP 403/429 (and Cloudflare-style blocks) as bot-blocked,
      // not as generic errors. Log to the persistent list so phone capture
      // can clear them in batch.
      if (fetched.status === 403 || fetched.status === 429 || /forbidden|blocked|cloudflare/i.test(why)) {
        console.log('BOT-BLOCKED — ' + why);
        if (writeMode) recordBlocked(blockedList, a.id, a.url, fetched.status || 0, fetched.statusText || why);
        blocked++;
      } else {
        console.log('FETCH-FAILED — ' + why);
        errored++;
      }
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

  if (writeMode) saveBotBlockedList(blockedList);

  console.log('');
  console.log('───────────────────────────────────────────────────────────────');
  console.log('Summary:');
  console.log('  Initialized (first hash): ' + initialized);
  console.log('  Unchanged:                ' + unchanged);
  console.log('  Drifted (need re-review): ' + drifted);
  console.log('  Bot-blocked (need phone): ' + blocked);
  console.log('  Errored / unreachable:    ' + errored);
  console.log('');

  // Bot-blocked report — surface the list so Anthony knows which URLs need
  // phone capture. Group by domain since likely the whole list is one or two
  // sites (nysenate.gov, justia, etc.).
  if (blockedList.entries.length > 0) {
    console.log('Bot-blocked sources awaiting phone capture (' + blockedList.entries.length + '):');
    const byDomain = {};
    for (const e of blockedList.entries) {
      if (!byDomain[e.domain]) byDomain[e.domain] = [];
      byDomain[e.domain].push(e);
    }
    for (const [domain, items] of Object.entries(byDomain)) {
      console.log('');
      console.log('  ' + domain + '  (' + items.length + ')');
      for (const it of items) {
        console.log('    • ' + it.anchorId);
        console.log('      ' + it.url);
        console.log('      blocked ' + it.blockedAt + ' (HTTP ' + it.status + ' ' + it.statusText + ')');
      }
    }
    console.log('');
    console.log('To clear after phone capture:');
    console.log('  1. Open the URL on the phone (or via ADB).');
    console.log('  2. Save the readable statute text to a .txt file (browser → share → notes, or copy/paste).');
    console.log('  3. Run: node scripts/check-source-drift.cjs --from-text <anchor-id> path/to/text.txt --write');
    console.log('  4. The hash gets written to the anchor and the bot-blocked entry is cleared.');
    console.log('');
    console.log('List persisted at: ' + path.relative(process.cwd(), BOT_BLOCKED_LIST));
    console.log('');
  }

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
