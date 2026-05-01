// scripts/anchor-audit-all-parallel.cjs
//
// Concurrency-capped audit pipeline. Empirical: claude.ai rejects
// concurrent requests when too many start within a short window
// (parallel-of-6 first run produced 3 OK + 3 "empty response" failures).
// Default concurrency = 2 keeps within the limit while still
// parallelizing what claude.ai allows.
//
// Skip-existing: if a recent matching response file already exists
// (default: within last 120 minutes), the check is skipped. Lets you
// resume a partial run without redoing what already succeeded.
//
// Each child sets RELAY_CLIPBOARD_MUTEX=1 so the file-based clipboard
// lock in lib/relay.cjs serializes the ~500ms write+paste critical
// section.
//
// Usage:
//   node scripts/anchor-audit-all-parallel.cjs <entry-id> [--concurrency N] [--skip-within MINUTES] [--no-skip]
//
// Defaults: --concurrency 2 --skip-within 120

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : fallback;
}
function flag(name) {
  return process.argv.includes(name);
}

const id = process.argv[2];
if (!id || id.startsWith('--')) {
  console.error('Usage: node scripts/anchor-audit-all-parallel.cjs <entry-id> [--concurrency N] [--skip-within MINUTES] [--no-skip]');
  process.exit(1);
}

const CONCURRENCY = parseInt(arg('--concurrency', '2'), 10);
const SKIP_WITHIN_MIN = flag('--no-skip') ? 0 : parseInt(arg('--skip-within', '120'), 10);
const RESPONSE_DIR = 'C:/Users/adima';

const checks = [
  { name: 'statute',     script: 'scripts/anchor-statute-relay.cjs',     responsePrefix: id + '-statute-response-' },
  { name: 'voice',       script: 'scripts/anchor-voice-relay.cjs',       responsePrefix: id + '-voice-response' },
  { name: 'consistency', script: 'scripts/anchor-consistency-relay.cjs', responsePrefix: id + '-consistency-response-' },
  { name: 'journey',     script: 'scripts/anchor-journey-relay.cjs',     responsePrefix: id + '-journey-response-' },
  { name: 'connection',  script: 'scripts/anchor-connection-relay.cjs',  responsePrefix: id + '-connection-response-' },
  { name: 'seo',         script: 'scripts/anchor-seo-relay.cjs',         responsePrefix: id + '-seo-response-' },
];

function recentExistingResponse(prefix) {
  if (SKIP_WITHIN_MIN === 0) return null;
  try {
    const files = fs.readdirSync(RESPONSE_DIR)
      .filter((f) => f.startsWith(prefix) && f.endsWith('.txt'))
      .map((f) => {
        const full = path.join(RESPONSE_DIR, f);
        return { full, mtime: fs.statSync(full).mtimeMs };
      })
      .sort((a, b) => b.mtime - a.mtime);
    if (files.length === 0) return null;
    const ageMin = (Date.now() - files[0].mtime) / 60000;
    if (ageMin < SKIP_WITHIN_MIN) return { path: files[0].full, ageMin: Math.round(ageMin) };
    return null;
  } catch (e) {
    return null;
  }
}

const start = Date.now();
const results = [];

function runCheck(c) {
  return new Promise((resolve) => {
    const t0 = Date.now();
    console.error('[+' + Math.round((Date.now() - start) / 1000) + 's] starting ' + c.name);

    const env = Object.assign({}, process.env, { RELAY_CLIPBOARD_MUTEX: '1' });
    const child = spawn('node', [c.script, id], { env, stdio: 'pipe' });
    let stderrBuf = '';
    child.stderr.on('data', (chunk) => { stderrBuf += chunk.toString(); });
    child.on('close', (code) => {
      const elapsed = Math.round((Date.now() - t0) / 1000);
      const status = code === 0 ? 'OK' : 'FAILED(exit=' + code + ')';
      results.push({ name: c.name, status, elapsedSec: elapsed });
      console.error('[+' + Math.round((Date.now() - start) / 1000) + 's] ' + c.name + ' done: ' + status + ' (' + elapsed + 's)');
      if (code !== 0) {
        console.error('--- stderr from ' + c.name + ' ---');
        console.error(stderrBuf.slice(-1000));
        console.error('--- end stderr ---');
      }
      resolve();
    });
  });
}

(async () => {
  // Filter out checks whose recent response already exists.
  const queue = [];
  for (const c of checks) {
    const existing = recentExistingResponse(c.responsePrefix);
    if (existing) {
      console.error('[skip] ' + c.name + ' — recent response from ' + existing.ageMin + ' min ago: ' + existing.path);
      results.push({ name: c.name, status: 'SKIPPED', elapsedSec: 0 });
    } else {
      queue.push(c);
    }
  }

  if (queue.length === 0) {
    console.error('All checks have recent responses. Use --no-skip to force re-run.');
  } else {
    console.error('Running ' + queue.length + ' checks at concurrency=' + CONCURRENCY);
  }

  // Concurrency-capped queue. Promise.all of N workers, each pulling from
  // a shared queue.
  const workers = [];
  for (let w = 0; w < CONCURRENCY; w++) {
    workers.push((async () => {
      while (queue.length > 0) {
        const c = queue.shift();
        if (!c) break;
        await runCheck(c);
      }
    })());
  }
  await Promise.all(workers);

  const totalSec = Math.round((Date.now() - start) / 1000);
  console.error('');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('Audit summary for ' + id + ' (total ' + totalSec + 's, concurrency=' + CONCURRENCY + '):');
  results.sort((a, b) => a.elapsedSec - b.elapsedSec);
  results.forEach((r) => {
    const mark = r.status === 'OK' ? '✓' : r.status === 'SKIPPED' ? '·' : '✗';
    console.error('  ' + mark + ' ' + r.name.padEnd(12) + ' ' + r.status + ' (' + r.elapsedSec + 's)');
  });
  console.error('Output files at ' + RESPONSE_DIR + '/' + id + '-{statute,voice,consistency,journey,connection,seo}-response-*.txt');
})();
