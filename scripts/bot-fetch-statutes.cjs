#!/usr/bin/env node
/*
 * scripts/bot-fetch-statutes.cjs
 * ============================================================================
 * One-time pre-fetcher that downloads every primary statute URL for the
 * entries in the retrofit queue, extracts the rendered statute text plus key
 * factual signals (section numbers, dollar amounts, dates, last-revision
 * date), and caches everything to dist/statute-cache.json.
 *
 * Separately fetches a secondary source URL per entry when available (the
 * second nysenate.gov URL, or the first non-nysenate source), so retrofit
 * has both primary statute text and enforcement/guide context pre-loaded.
 *
 * The point: eliminate per-entry HTTP round trips and manual parsing during
 * retrofit. A rewrite reads facts from the cache instead of my memory.
 *
 * Usage:
 *   node scripts/bot-fetch-statutes.cjs                    # full queue
 *   node scripts/bot-fetch-statutes.cjs --limit=10         # partial
 *   node scripts/bot-fetch-statutes.cjs --throttle=800     # ms between reqs
 *   node scripts/bot-fetch-statutes.cjs --queue=path       # alt queue file
 *
 * Reads:  dist/retrofit-queue.json (created by bot-preflight-scan + helper)
 * Writes: dist/statute-cache.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const ENTRIES_DIR = path.join(ROOT, 'src', 'data', 'legal', 'entries');
const DIST = path.join(ROOT, 'dist');
const QUEUE = path.join(DIST, 'retrofit-queue.json');
const CACHE = path.join(DIST, 'statute-cache.json');

const args = process.argv.slice(2).reduce((a, x) => {
  const m = x.match(/^--([^=]+)(?:=(.*))?$/);
  if (m) a[m[1]] = m[2] === undefined ? true : m[2];
  return a;
}, {});
const LIMIT = parseInt(args.limit, 10) || 0;
const THROTTLE_MS = parseInt(args.throttle, 10) || 800;
const TIMEOUT_MS = 15000;
const QUEUE_FILE = args.queue || QUEUE;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchHtml(url) {
  return new Promise((resolve) => {
    let finished = false;
    const done = (res) => {
      if (finished) return;
      finished = true;
      resolve(res);
    };
    try {
      const u = new URL(url);
      const lib = u.protocol === 'https:' ? https : http;
      const req = lib.request(
        {
          method: 'GET',
          hostname: u.hostname,
          port: u.port || (u.protocol === 'https:' ? 443 : 80),
          path: u.pathname + u.search,
          headers: {
            'User-Agent': 'HelpFinderStatuteFetch/1.0 (+https://helpfinder.help)',
            Accept: 'text/html',
          },
          timeout: TIMEOUT_MS,
        },
        (res) => {
          let body = '';
          res.setEncoding('utf8');
          res.on('data', (c) => {
            body += c;
            if (body.length > 3_000_000) {
              req.destroy();
              done({ status: res.statusCode, body: body.slice(0, 3_000_000) });
            }
          });
          res.on('end', () => done({ status: res.statusCode, body }));
        },
      );
      req.on('error', (e) => done({ status: 0, error: e.code || e.message }));
      req.on('timeout', () => {
        req.destroy();
        done({ status: 0, error: 'TIMEOUT' });
      });
      req.end();
    } catch (e) {
      done({ status: 0, error: e.message });
    }
  });
}

function extractStatuteBody(html) {
  if (!html) return '';
  // nysenate.gov renders statute body inside <div class="nys-openleg-result-text">
  // or <div class="panel-body">. Strip everything else.
  let body = html;
  // Pull the main panel if present
  const m = body.match(/<div class="panel panel-default"[\s\S]{0,20}<div class="panel-body"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
  if (m) body = m[1];
  // Strip script + style + header nav + footer
  body = body.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  body = body.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  body = body.replace(/<nav[\s\S]*?<\/nav>/gi, ' ');
  body = body.replace(/<footer[\s\S]*?<\/footer>/gi, ' ');
  // Remove all tags
  body = body.replace(/<[^>]+>/g, ' ');
  // Decode common entities
  body = body
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&sect;/g, '§');
  // Collapse whitespace
  body = body.replace(/\s+/g, ' ').trim();
  return body;
}

function extractLastRevision(html) {
  if (!html) return null;
  const m = html.match(/nys-openleg-history-published[^>]*>[^<]*?from\s+(\d{4}-\d{2}-\d{2})/i);
  return m ? m[1] : null;
}

function extractSectionNumbers(text) {
  if (!text) return [];
  const out = new Set();
  const re = /§\s*(\d+(?:[\-.]\w+)*)/g;
  let m;
  while ((m = re.exec(text)) !== null) out.add(m[1]);
  return [...out].slice(0, 40);
}

function extractDollarAmounts(text) {
  if (!text) return [];
  const out = new Set();
  const re = /\$[\d,]+(?:\.\d+)?|\b\d{1,3}(?:,\d{3})*\s+dollars?\b/g;
  let m;
  while ((m = re.exec(text)) !== null) out.add(m[0]);
  return [...out].slice(0, 50);
}

function extractDates(text) {
  if (!text) return [];
  const out = new Set();
  const iso = /\b(19|20)\d{2}-\d{2}-\d{2}\b/g;
  let m;
  while ((m = iso.exec(text)) !== null) out.add(m[0]);
  const monthly = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+(19|20)\d{2}\b/g;
  while ((m = monthly.exec(text)) !== null) out.add(m[0]);
  const year = /\b(effective|enacted|amended|added|repealed)[^\n]{0,30}(19|20)\d{2}\b/gi;
  while ((m = year.exec(text)) !== null) out.add(m[0]);
  return [...out].slice(0, 30);
}

function pickPrimaryUrl(entry) {
  if (!Array.isArray(entry.sources)) return null;
  for (const u of entry.sources) {
    if (typeof u === 'string' && /nysenate\.gov\/legislation\/laws/i.test(u)) return u;
  }
  return entry.sources[0] || null;
}

function pickSecondaryUrl(entry, primary) {
  if (!Array.isArray(entry.sources)) return null;
  for (const u of entry.sources) {
    if (typeof u === 'string' && u !== primary) return u;
  }
  return null;
}

async function main() {
  if (!fs.existsSync(QUEUE_FILE)) {
    console.error('Queue not found at', QUEUE_FILE, '— run bot-preflight-scan first.');
    process.exit(1);
  }
  const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
  // Load entry objects for each queue item to get sources.
  const { pathToFileURL } = require('url');
  const queueWithSources = [];
  for (const q of queue) {
    const abs = path.join(ENTRIES_DIR, q.file);
    if (!fs.existsSync(abs)) continue;
    const mod = await import(pathToFileURL(abs).href);
    const e = Object.values(mod)[0];
    if (!e) continue;
    const primary = pickPrimaryUrl(e);
    const secondary = pickSecondaryUrl(e, primary);
    queueWithSources.push({ ...q, primaryUrl: primary, secondaryUrl: secondary });
  }
  const N = LIMIT > 0 ? Math.min(LIMIT, queueWithSources.length) : queueWithSources.length;

  console.log('HelpFinder statute pre-fetcher');
  console.log('===============================');
  console.log('Queue entries     :', queueWithSources.length);
  console.log('Fetching          :', N);
  console.log('Throttle          :', THROTTLE_MS, 'ms');
  console.log('Output            :', CACHE);

  // Load existing cache for resume support
  let cache = { version: 1, fetchedAt: null, entries: {} };
  if (fs.existsSync(CACHE)) {
    try {
      cache = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
    } catch (e) {
      console.log('Existing cache unreadable, starting fresh.');
    }
  }

  let done = 0;
  for (let i = 0; i < N; i++) {
    const q = queueWithSources[i];
    process.stdout.write(`\r[${i + 1}/${N}] ${q.file}`.padEnd(90));

    const cached = cache.entries[q.file];
    if (cached && cached.primaryFetchStatus === 200 && !args.force) {
      done++;
      continue;
    }

    const entry = { file: q.file, id: q.id, primaryUrl: q.primaryUrl, secondaryUrl: q.secondaryUrl };

    if (q.primaryUrl) {
      const r = await fetchHtml(q.primaryUrl);
      entry.primaryFetchStatus = r.status;
      entry.primaryError = r.error || null;
      if (r.status === 200) {
        const text = extractStatuteBody(r.body);
        entry.primaryText = text;
        entry.primaryTextLength = text.length;
        entry.primaryLastRevision = extractLastRevision(r.body);
        entry.primarySectionNumbers = extractSectionNumbers(text);
        entry.primaryDollarAmounts = extractDollarAmounts(text);
        entry.primaryDates = extractDates(text);
      }
      await sleep(THROTTLE_MS);
    }

    if (q.secondaryUrl) {
      const r = await fetchHtml(q.secondaryUrl);
      entry.secondaryFetchStatus = r.status;
      entry.secondaryError = r.error || null;
      if (r.status === 200) {
        const text = extractStatuteBody(r.body);
        entry.secondaryText = text.slice(0, 30_000);
        entry.secondaryTextLength = text.length;
      }
      await sleep(THROTTLE_MS);
    }

    cache.entries[q.file] = entry;
    cache.fetchedAt = new Date().toISOString();
    if ((i + 1) % 10 === 0 || i + 1 === N) {
      fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
    }
    done++;
  }
  process.stdout.write('\n');

  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));

  const all = Object.values(cache.entries);
  const primaryOk = all.filter((e) => e.primaryFetchStatus === 200).length;
  const secondaryOk = all.filter((e) => e.secondaryFetchStatus === 200).length;
  console.log('Cache summary:');
  console.log('  Entries in cache  :', all.length);
  console.log('  Primary OK fetches:', primaryOk);
  console.log('  Secondary OK      :', secondaryOk);
}

main().catch((e) => {
  console.error('ERROR:', e);
  process.exit(1);
});
