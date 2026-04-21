#!/usr/bin/env node
/*
 * scripts/retrofit-brief.cjs
 * ============================================================================
 * Retrofit briefing generator. Given a filename from the retrofit queue,
 * prints (to stdout) the complete context needed to rewrite the entry with
 * source-backed accuracy: preserved metadata, existing source URLs, preflight
 * issue list, cached primary statute text + extracted facts, cached
 * secondary source text. No HTTP calls — reads from the local statute cache
 * populated by bot-fetch-statutes.cjs.
 *
 * Usage:
 *   node scripts/retrofit-brief.cjs tenant-rights-repairs-ny.js
 *   node scripts/retrofit-brief.cjs --next   # next unretrofitted queue entry
 *   node scripts/retrofit-brief.cjs --full-text   # include full statute text
 *
 * The output is designed to be read top-to-bottom while rewriting. Every
 * fact that belongs in the new entry body should trace to the cache section
 * of this brief — section numbers, dollar amounts, dates, effective clauses.
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const ENTRIES_DIR = path.join(ROOT, 'src', 'data', 'legal', 'entries');
const DIST = path.join(ROOT, 'dist');
const QUEUE = path.join(DIST, 'retrofit-queue.json');
const CACHE = path.join(DIST, 'statute-cache.json');
const REPORT = path.join(DIST, 'verification-report-preflight.json');

const args = process.argv.slice(2);
const flags = {};
const positional = [];
for (const a of args) {
  if (a.startsWith('--')) {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    if (m) flags[m[1]] = m[2] === undefined ? true : m[2];
  } else {
    positional.push(a);
  }
}
const targetFile = positional[0] || null;
const FULL_TEXT = flags['full-text'];
const PREVIEW_CHARS = FULL_TEXT ? 100_000 : 2500;

function rule(char = '─', len = 78) {
  return char.repeat(len);
}

async function main() {
  if (!fs.existsSync(QUEUE)) {
    console.error('Queue not found at', QUEUE);
    process.exit(1);
  }
  if (!fs.existsSync(CACHE)) {
    console.error('Cache not found at', CACHE, '— run bot-fetch-statutes.cjs first.');
    process.exit(1);
  }
  const queue = JSON.parse(fs.readFileSync(QUEUE, 'utf8'));
  const cache = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
  const preflight = fs.existsSync(REPORT) ? JSON.parse(fs.readFileSync(REPORT, 'utf8')) : null;

  let filename = targetFile;
  if (flags.next) {
    filename = queue[0] && queue[0].file;
  }
  if (!filename) {
    console.error('Usage: node scripts/retrofit-brief.cjs <filename>  OR  --next');
    process.exit(1);
  }

  const qEntry = queue.find((q) => q.file === filename);
  if (!qEntry) {
    console.error('Not in retrofit queue:', filename);
    process.exit(1);
  }
  const cacheEntry = cache.entries[filename] || null;

  const abs = path.join(ENTRIES_DIR, filename);
  if (!fs.existsSync(abs)) {
    console.error('Entry file not found:', abs);
    process.exit(1);
  }
  const mod = await import(pathToFileURL(abs).href);
  const e = Object.values(mod)[0];

  console.log(rule('═'));
  console.log('  RETROFIT BRIEF —', filename);
  console.log(rule('═'));
  console.log('');
  console.log('Score:', qEntry.score, '  Category:', qEntry.category, '  AuthorityType:', qEntry.authorityType);
  console.log('');
  console.log('-- CURRENT ISSUES (why this entry is in the queue) --');
  for (const issue of qEntry.issues) console.log('  •', issue);
  console.log('');
  console.log('-- METADATA (preserve during retrofit) --');
  console.log('  id              :', e.id);
  console.log('  category        :', e.category);
  console.log('  tier            :', e.tier);
  console.log('  jurisdiction    :', e.jurisdiction);
  console.log('  authorityType   :', e.authorityType);
  console.log('  primaryStatute  :', e.primaryStatute || '(none)');
  console.log('  status          :', e.status);
  console.log('');
  console.log('-- TITLE --');
  console.log(' ', (e.title && e.title.en) || '(none)');
  console.log('');
  console.log('-- CURRENT SOURCES --');
  (e.sources || []).forEach((s, i) => console.log('  ' + (i + 1) + '.', s));
  console.log('');
  console.log('-- CURRENT TAGS --');
  console.log(' ', (e.tags || []).join(', ') || '(none)');
  console.log('');
  console.log('-- CURRENT RELATED IDS --');
  (e.relatedIds || []).forEach((r) => console.log('  →', r));
  console.log('');
  console.log('-- OLD WHATITMEANS (what to rewrite) --');
  console.log(' ', (e.whatItMeans && e.whatItMeans.en) ? (e.whatItMeans.en.slice(0, 800) + (e.whatItMeans.en.length > 800 ? '…' : '')) : '(none)');
  console.log('');

  if (cacheEntry) {
    console.log(rule('═'));
    console.log('  CACHED SOURCE MATERIAL (cite from here, not memory)');
    console.log(rule('═'));
    console.log('');
    console.log('-- PRIMARY --');
    console.log('  URL            :', cacheEntry.primaryUrl || '(none)');
    console.log('  Fetch status   :', cacheEntry.primaryFetchStatus || '-');
    if (cacheEntry.primaryError) console.log('  Fetch error    :', cacheEntry.primaryError);
    if (cacheEntry.primaryText) {
      console.log('  Text length    :', cacheEntry.primaryTextLength);
      console.log('  Last revision  :', cacheEntry.primaryLastRevision || '(unknown)');
      console.log('  Section nums   :', (cacheEntry.primarySectionNumbers || []).slice(0, 20).join(', ') || '(none)');
      console.log('  Dollar amounts :', (cacheEntry.primaryDollarAmounts || []).slice(0, 15).join(', ') || '(none)');
      console.log('  Dates          :', (cacheEntry.primaryDates || []).slice(0, 10).join(', ') || '(none)');
      console.log('');
      console.log('-- PRIMARY STATUTE TEXT (' + (FULL_TEXT ? 'full' : 'first ' + PREVIEW_CHARS + ' chars') + ') --');
      console.log(cacheEntry.primaryText.slice(0, PREVIEW_CHARS));
      if (cacheEntry.primaryTextLength > PREVIEW_CHARS && !FULL_TEXT) {
        console.log('…');
        console.log('[' + (cacheEntry.primaryTextLength - PREVIEW_CHARS) + ' more chars — rerun with --full-text to see all]');
      }
      console.log('');
    }
    console.log('-- SECONDARY --');
    console.log('  URL            :', cacheEntry.secondaryUrl || '(none)');
    console.log('  Fetch status   :', cacheEntry.secondaryFetchStatus || '-');
    if (cacheEntry.secondaryText) {
      console.log('  Text length    :', cacheEntry.secondaryTextLength);
      console.log('');
      console.log('-- SECONDARY TEXT (' + (FULL_TEXT ? 'full' : 'first ' + Math.min(PREVIEW_CHARS, 1500) + ' chars') + ') --');
      console.log(cacheEntry.secondaryText.slice(0, FULL_TEXT ? 30_000 : 1500));
      if (cacheEntry.secondaryTextLength > 1500 && !FULL_TEXT) console.log('…');
    }
    console.log('');
  } else {
    console.log('-- NO CACHE ENTRY for', filename, '— run bot-fetch-statutes.cjs');
  }

  console.log(rule('═'));
  console.log('  RETROFIT CHECKLIST');
  console.log(rule('═'));
  console.log('  [ ] Preserve id, category, tier, jurisdiction, authorityType, primaryStatute');
  console.log('  [ ] Title reads like a plain-English headline (update if legal-jargon-heavy)');
  console.log('  [ ] Third-person throughout — no "you/your/yours"');
  console.log('  [ ] Non-directive — no "Save/Get/Document/Always/Never/Make sure"');
  console.log('  [ ] whatItMeans in 500-700 words (not thin, not over 1800)');
  console.log('  [ ] Every statute section number, dollar amount, or date present in cache');
  console.log('  [ ] 2+ sources (primary + one enforcement/guide — no grandfather on retrofit)');
  console.log('  [ ] whoQualifies ≥ 4, yourRights ≥ 4, legalOptions ≥ 4');
  console.log('  [ ] lastVerified set to today');
  console.log('  [ ] npm run verify passes');
  console.log('  [ ] Re-scan this single file: score ≤ 1');
}

main().catch((e) => {
  console.error('ERROR:', e);
  process.exit(1);
});
