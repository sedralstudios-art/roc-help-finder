// scripts/relay-fetch-anchor-text.cjs
//
// Drives the relay-Chrome (CDP at localhost:9222) to fetch every isAnchor:true
// entry's source URL, extract rendered page text, and feed it to
// check-source-drift.cjs --from-text --write for hash population.
//
// Solves the nysenate.gov 403 bot-block without needing Anthony to manually
// copy text on his phone for each anchor.
//
// Pre-req:
//   1. scripts/relay-chrome-launch.cjs is running (Chrome on debug port 9222).
//   2. The anchor URL is reachable from a real browser (nysenate.gov is fine
//      from the relay-Chrome since it presents as a normal logged-in user).
//
// Usage:
//   node scripts/relay-fetch-anchor-text.cjs                    # all anchors
//   node scripts/relay-fetch-anchor-text.cjs --id security-deposit-ny
//
// Output:
//   - Writes the fetched text to a tmp file per anchor under
//     %TEMP%/helpfinder-anchor-text/<anchor-id>.txt (kept for inspection).
//   - Invokes check-source-drift.cjs --from-text <id> <tmpfile> --write
//     which writes anchorSource.hash + lastFetched into the entry .js file
//     (and sourceChangedSince if hash changed).
//   - Prints a summary: initialized / drifted / errored counts.
//
// Hash compatibility note:
//   Once an anchor's hash is populated via this relay path, FUTURE drift
//   checks for that anchor must also use this path — the rendered innerText
//   from a real browser is NOT the same string as direct-HTTP HTML put
//   through check-source-drift's extractReadableText. Mixing the two paths
//   produces false-positive drift. Re-run THIS script for ongoing checks
//   on the bot-blocked set; use check-source-drift directly only for
//   non-blocked sources.

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');
const { chromium } = require('playwright');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');
const CDP_URL = 'http://localhost:9222';
const TMP_DIR = path.join(os.tmpdir(), 'helpfinder-anchor-text');
const NAVIGATION_TIMEOUT_MS = 30000;
const POST_LOAD_WAIT_MS = 1500;

function listAnchors() {
  const out = [];
  for (const f of fs.readdirSync(ENTRIES_DIR)) {
    if (!f.endsWith('.js')) continue;
    const src = fs.readFileSync(path.join(ENTRIES_DIR, f), 'utf8');
    if (!/\bisAnchor\s*:\s*true\b/.test(src)) continue;
    const id = (src.match(/\bid:\s*"([^"]+)"/) || [])[1];
    const url = (src.match(/anchorSource:\s*\{[\s\S]*?\burl:\s*"([^"]+)"/) || [])[1];
    if (id && url) out.push({ id, url, file: f });
  }
  return out;
}

async function fetchPageText(browser, url) {
  // Use the existing CDP-attached context (logged-in real Chrome). Creating
  // a fresh context via newContext() isn't supported on connectOverCDP-attached
  // browsers in all Playwright versions, and isn't necessary here.
  const context = browser.contexts()[0];
  if (!context) throw new Error('No browser context available on the CDP target');
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: NAVIGATION_TIMEOUT_MS });
    // Brief wait for client-side rendering (nysenate.gov hydrates JS).
    await page.waitForTimeout(POST_LOAD_WAIT_MS);
    // Prefer the main landmark; fall back to article, then body.
    const text = await page.evaluate(() => {
      const root = document.querySelector('main') || document.querySelector('article') || document.body;
      return root ? root.innerText : '';
    });
    return text || '';
  } finally {
    try { await page.close(); } catch (_) {}
  }
}

(async () => {
  const args = process.argv.slice(2);
  const idIdx = args.indexOf('--id');
  const scopedId = idIdx >= 0 ? args[idIdx + 1] : null;

  fs.mkdirSync(TMP_DIR, { recursive: true });

  const allAnchors = listAnchors();
  const anchors = allAnchors.filter(a => !scopedId || a.id === scopedId);
  if (!anchors.length) {
    console.error('No anchors found' + (scopedId ? ' matching --id ' + scopedId : '.'));
    process.exit(1);
  }

  console.log('Connecting to relay-Chrome at ' + CDP_URL);
  let browser;
  try {
    browser = await chromium.connectOverCDP(CDP_URL);
  } catch (e) {
    console.error('FATAL: cannot connect to relay-Chrome on ' + CDP_URL);
    console.error('Run: node scripts/relay-chrome-launch.cjs (in a separate terminal)');
    console.error('Underlying error: ' + e.message);
    process.exit(2);
  }
  console.log('Connected. Fetching ' + anchors.length + ' anchor URL(s)…\n');

  const DRIFT_SCRIPT = path.join(__dirname, 'check-source-drift.cjs');

  let initialized = 0, drifted = 0, unchanged = 0, errored = 0;

  for (const a of anchors) {
    process.stdout.write('• ' + a.id.padEnd(40) + ' ');
    let text;
    try {
      text = await fetchPageText(browser, a.url);
    } catch (e) {
      console.log('FETCH-FAILED — ' + String(e.message || e).substring(0, 100));
      errored++;
      continue;
    }
    if (!text || text.length < 200) {
      console.log('TOO-SHORT — ' + (text ? text.length : 0) + ' chars (page may not have rendered)');
      errored++;
      continue;
    }

    const tmpFile = path.join(TMP_DIR, a.id + '.txt');
    fs.writeFileSync(tmpFile, text);

    const result = spawnSync('node', [DRIFT_SCRIPT, '--from-text', a.id, tmpFile, '--write'], {
      encoding: 'utf8',
    });
    const out = (result.stdout || '') + (result.stderr || '');
    if (result.status !== 0) {
      console.log('DRIFT-SCRIPT-FAILED (exit ' + result.status + ')');
      console.log('   ' + out.split(/\r?\n/).filter(Boolean).slice(-3).join(' | '));
      errored++;
      continue;
    }
    if (/DRIFTED/.test(out))      { drifted++;     console.log('DRIFTED  (text len ' + text.length + ')'); }
    else if (/INITIAL/.test(out)) { initialized++; console.log('INITIAL  (text len ' + text.length + ')'); }
    else if (/UNCHANGED/.test(out)) { unchanged++; console.log('UNCHANGED'); }
    else                          { console.log('OK       (text len ' + text.length + ')'); }
  }

  // Don't browser.close() — that would close the user's Chrome window.
  // Just disconnect from CDP.
  try { await browser.close(); } catch (_) {}

  console.log('');
  console.log('───────────────────────────────────────');
  console.log('Initialized: ' + initialized);
  console.log('Drifted:     ' + drifted);
  console.log('Unchanged:   ' + unchanged);
  console.log('Errored:     ' + errored);
  console.log('');
  console.log('Captured text retained at: ' + TMP_DIR);
  process.exit(errored > 0 ? 2 : 0);
})();
