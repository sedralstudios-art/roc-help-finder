// scripts/anchor-audit-all-parallel.cjs
//
// Parallel version of anchor-audit-all.cjs. Spawns all 6 single-anchor
// audit scripts as concurrent child processes with 1.5s stagger between
// launches. Each child sets RELAY_CLIPBOARD_MUTEX=1 so the file-based
// clipboard lock in lib/relay.cjs serializes the ~500ms write+paste
// critical section while everything else (navigation, streaming,
// extraction) runs in parallel.
//
// Expected speedup vs sequential: ~3-4x. Sequential ran 1470s on
// eviction-process-ny; parallel target is ~400-500s (limited by the
// slowest single audit, which is statute at ~500s).
//
// Usage:
//   node scripts/anchor-audit-all-parallel.cjs <entry-id>
//
// Pre-req: scripts/relay-chrome-launch.cjs is running. claude.ai logged in.

const { spawn } = require('child_process');

const id = process.argv[2];
if (!id) {
  console.error('Usage: node scripts/anchor-audit-all-parallel.cjs <entry-id>');
  process.exit(1);
}

const checks = [
  { name: 'statute',     script: 'scripts/anchor-statute-relay.cjs' },
  { name: 'voice',       script: 'scripts/anchor-voice-relay.cjs' },
  { name: 'consistency', script: 'scripts/anchor-consistency-relay.cjs' },
  { name: 'journey',     script: 'scripts/anchor-journey-relay.cjs' },
  { name: 'connection',  script: 'scripts/anchor-connection-relay.cjs' },
  { name: 'seo',         script: 'scripts/anchor-seo-relay.cjs' },
];

const STAGGER_MS = 1500;
const start = Date.now();
const results = [];
const promises = [];

(async () => {
  for (let i = 0; i < checks.length; i++) {
    const c = checks[i];
    const t0 = Date.now();

    if (i > 0) {
      await new Promise((r) => setTimeout(r, STAGGER_MS));
    }
    console.error('[+' + Math.round((Date.now() - start) / 1000) + 's] launching ' + c.name);

    const p = new Promise((resolve) => {
      const env = Object.assign({}, process.env, { RELAY_CLIPBOARD_MUTEX: '1' });
      const child = spawn('node', [c.script, id], { env, stdio: 'pipe' });
      let stderrBuf = '';
      child.stderr.on('data', (chunk) => {
        stderrBuf += chunk.toString();
      });
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
    promises.push(p);
  }

  await Promise.all(promises);

  const totalSec = Math.round((Date.now() - start) / 1000);
  console.error('');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('Parallel summary for ' + id + ' (total ' + totalSec + 's):');
  results.sort((a, b) => a.elapsedSec - b.elapsedSec);
  results.forEach((r) => {
    console.error('  ' + (r.status === 'OK' ? '✓' : '✗') + ' ' + r.name.padEnd(12) + ' ' + r.status + ' (' + r.elapsedSec + 's)');
  });
  console.error('Output files at C:/Users/adima/' + id + '-{statute,voice,consistency,journey,connection,seo}-response-*.txt');
})();
