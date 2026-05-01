// scripts/anchor-audit-all.cjs
//
// Run all single-anchor audits sequentially for one entry. Sequential
// because the relay() function uses the system clipboard, which is a
// shared resource — parallel calls would clobber each other's pastes.
//
// What it runs (in order):
//   1. statute (anchor-statute-relay.cjs)
//   2. voice (anchor-voice-relay.cjs)
//   3. consistency (anchor-consistency-relay.cjs)
//   4. journey (anchor-journey-relay.cjs)
//   5. connection (anchor-connection-relay.cjs)
//
// Cross-anchor (anchor-cross-relay.cjs) is NOT included here — it takes
// multiple anchors and is run separately when curating a cluster.
//
// Usage:
//   node scripts/anchor-audit-all.cjs <entry-id>
//
// Each check writes its own time-stamped output file to C:/Users/adima/.
// Total runtime: ~6-10 minutes per anchor depending on response sizes.

const { execSync } = require('child_process');

const id = process.argv[2];
if (!id) {
  console.error('Usage: node scripts/anchor-audit-all.cjs <entry-id>');
  process.exit(1);
}

const checks = [
  { name: 'statute',     script: 'scripts/anchor-statute-relay.cjs' },
  { name: 'voice',       script: 'scripts/anchor-voice-relay.cjs' },
  { name: 'consistency', script: 'scripts/anchor-consistency-relay.cjs' },
  { name: 'journey',     script: 'scripts/anchor-journey-relay.cjs' },
  { name: 'connection',  script: 'scripts/anchor-connection-relay.cjs' },
];

const start = Date.now();
const results = [];

for (const c of checks) {
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('Running ' + c.name.toUpperCase() + ' check for ' + id);
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const t0 = Date.now();
  try {
    execSync('node ' + c.script + ' ' + id, { stdio: 'inherit' });
    const elapsed = Math.round((Date.now() - t0) / 1000);
    results.push({ name: c.name, status: 'OK', elapsedSec: elapsed });
    console.error('✓ ' + c.name + ' done (' + elapsed + 's)');
  } catch (e) {
    const elapsed = Math.round((Date.now() - t0) / 1000);
    results.push({ name: c.name, status: 'FAILED', elapsedSec: elapsed });
    console.error('✗ ' + c.name + ' failed (' + elapsed + 's): ' + e.message);
    // Continue with remaining checks even if one fails.
  }
}

const totalSec = Math.round((Date.now() - start) / 1000);
console.error('');
console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.error('Summary for ' + id + ' (total ' + totalSec + 's):');
results.forEach((r) => {
  console.error('  ' + (r.status === 'OK' ? '✓' : '✗') + ' ' + r.name.padEnd(12) + ' ' + r.status + ' (' + r.elapsedSec + 's)');
});
console.error('Output files at C:/Users/adima/' + id + '-{statute,voice,consistency,journey,connection}-response-*.txt');
