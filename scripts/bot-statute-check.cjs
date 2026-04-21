#!/usr/bin/env node
/*
 * scripts/bot-statute-check.cjs
 * ============================================================================
 * Statute amendment checker. For every entry with a nysenate.gov source URL,
 * fetches the statute page and extracts the section's last-amended or
 * last-updated date. Compares that date to the entry's lastVerified. If the
 * statute was amended AFTER the entry was last verified, flags the entry for
 * human review.
 *
 * Usage:
 *   node scripts/bot-statute-check.cjs              # full scan
 *   node scripts/bot-statute-check.cjs --limit=50   # stop after N entries
 *   node scripts/bot-statute-check.cjs --throttle=800  # ms between requests
 *
 * Output:
 *   dist/verification-report-statutes.json — machine-readable
 *   Console table of entries where statute amendment > entry lastVerified
 *
 * Only nysenate.gov URLs are parsed. federal law (cornell, irs.gov, law.gov)
 * and regulation (nycrr) parsing can be added later as separate resolvers.
 *
 * Rate limiting: default 800ms delay between requests to be a good citizen.
 * Serial requests (no concurrency) since this hits a single host. User-Agent
 * identifies the bot.
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const ENTRIES_DIR = path.join(ROOT, 'src', 'data', 'legal', 'entries');
const DIST = path.join(ROOT, 'dist');
const REPORT = path.join(DIST, 'verification-report-statutes.json');

const args = process.argv.slice(2).reduce((acc, a) => {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/);
  if (m) acc[m[1]] = m[2] === undefined ? true : m[2];
  return acc;
}, {});
const LIMIT = parseInt(args.limit, 10) || 0;
const THROTTLE_MS = parseInt(args.throttle, 10) || 800;
const TIMEOUT_MS = 15000;

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
      const req = https.request(
        {
          method: 'GET',
          hostname: u.hostname,
          port: 443,
          path: u.pathname + u.search,
          headers: {
            'User-Agent': 'HelpFinderStatuteCheck/1.0 (+https://helpfinder.help)',
            Accept: 'text/html',
          },
          timeout: TIMEOUT_MS,
        },
        (res) => {
          let body = '';
          res.setEncoding('utf8');
          res.on('data', (c) => {
            body += c;
            if (body.length > 2_000_000) {
              req.destroy();
              done({ status: res.statusCode, body: body.slice(0, 2_000_000) });
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

// NY Senate statute pages show the last-revision date inside a div:
//   <div class="nys-openleg-history-published">
//     Viewing most recent revision (from 2014-09-22)
//   </div>
// That date is when the statute section text was last updated in the Senate's
// OpenLeg system. If the entry's lastVerified is earlier than this date, the
// entry may be based on outdated statute text and warrants human review.
function extractNYSenateAmendDate(html) {
  if (!html) return null;
  const m = html.match(/nys-openleg-history-published[^>]*>[^<]*?from\s+(\d{4}-\d{2}-\d{2})/i);
  if (m) return m[1];
  // Fallback: any explicit "Last amended YYYY-MM-DD"
  const m2 = html.match(/last amended[^<]*?(\d{4}-\d{2}-\d{2})/i);
  if (m2) return m2[1];
  return null;
}

function entryStatuteUrl(entry) {
  if (!Array.isArray(entry.sources)) return null;
  for (const u of entry.sources) {
    if (typeof u === 'string' && /nysenate\.gov\/legislation\/laws/i.test(u)) return u;
  }
  return null;
}

async function main() {
  const files = fs.readdirSync(ENTRIES_DIR).filter((f) => f.endsWith('.js'));
  const entries = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(path.join(ENTRIES_DIR, f)).href);
    const e = Object.values(mod)[0];
    if (!e || !e.id || e.draft || e.status !== 'active') continue;
    const url = entryStatuteUrl(e);
    if (!url) continue;
    entries.push({ file: f, entry: e, url });
  }
  const N = LIMIT > 0 ? Math.min(LIMIT, entries.length) : entries.length;
  console.log('HelpFinder statute amendment checker');
  console.log('=====================================');
  console.log('Entries with nysenate.gov source:', entries.length);
  console.log('Scanning:', N);
  console.log('Throttle:', THROTTLE_MS, 'ms between requests');

  const results = [];
  for (let i = 0; i < N; i++) {
    const { file, entry, url } = entries[i];
    process.stdout.write(`\r[${i + 1}/${N}] ${file}`.padEnd(80));
    const r = await fetchHtml(url);
    const amendedDate = r.status === 200 ? extractNYSenateAmendDate(r.body) : null;
    results.push({
      file,
      id: entry.id,
      url,
      httpStatus: r.status,
      fetchError: r.error || null,
      statuteAmendedDate: amendedDate,
      entryLastVerified: entry.lastVerified || entry.lastAudited || null,
      flagged: amendedDate && entry.lastVerified && amendedDate > entry.lastVerified,
    });
    if (i + 1 < N) await sleep(THROTTLE_MS);
  }
  process.stdout.write('\n');

  const flagged = results.filter((r) => r.flagged);
  const unparseable = results.filter((r) => r.httpStatus === 200 && !r.statuteAmendedDate);
  const failed = results.filter((r) => r.httpStatus !== 200);
  const ok = results.filter((r) => r.httpStatus === 200 && r.statuteAmendedDate && !r.flagged);

  const report = {
    runAt: new Date().toISOString(),
    scanned: N,
    totals: {
      flagged_needs_review: flagged.length,
      ok_entry_newer_than_statute: ok.length,
      unparseable_no_amend_date: unparseable.length,
      fetch_failed: failed.length,
    },
    flagged,
    unparseable: unparseable.map((r) => ({ file: r.file, url: r.url })),
    failed: failed.map((r) => ({ file: r.file, url: r.url, status: r.httpStatus, error: r.fetchError })),
  };
  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(REPORT, JSON.stringify(report, null, 2));

  console.log('Report:', REPORT);
  console.log('  Flagged for review   :', flagged.length);
  console.log('  OK (entry newer)     :', ok.length);
  console.log('  No amend date parsed :', unparseable.length);
  console.log('  Fetch failed         :', failed.length);
  if (flagged.length > 0) {
    console.log('');
    console.log('Flagged entries (statute amended after last verify):');
    for (const r of flagged.slice(0, 25)) {
      console.log('  ', r.file, '| statute:', r.statuteAmendedDate, '| entry:', r.entryLastVerified);
    }
  }
}

main().catch((e) => {
  console.error('ERROR:', e);
  process.exit(1);
});
