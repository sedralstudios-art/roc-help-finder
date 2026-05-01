// scripts/relay.cjs
//
// CLI front-end for scripts/lib/relay.cjs. Sends a prompt to claude.ai via
// the CDP-attached relay-Chrome and prints the response to stdout.
//
// Usage:
//   node scripts/relay.cjs --file path/to/prompt.txt
//   node scripts/relay.cjs --prompt "respond with PONG"
//   node scripts/relay.cjs --file prompt.txt --out response.txt
//   node scripts/relay.cjs --file prompt.txt --debug
//
// Exit codes:
//   0 — success
//   1 — usage error
//   2 — relay-Chrome not running / CDP unreachable
//   3 — relay produced empty response

const fs = require('fs');
const path = require('path');
const { relay } = require('./lib/relay.cjs');

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : null;
}
function flag(name) {
  return process.argv.includes(name);
}

const promptFile = arg('--file');
const promptInline = arg('--prompt');
const outFile = arg('--out');
const debug = flag('--debug');
const timeoutSec = parseInt(arg('--timeout') || '300', 10);

if (!promptFile && !promptInline) {
  console.error('Usage: node scripts/relay.cjs --file <prompt.txt> | --prompt "<text>" [--out <file>] [--debug] [--timeout <seconds>]');
  process.exit(1);
}

let promptText;
if (promptFile) {
  if (!fs.existsSync(promptFile)) {
    console.error('Prompt file not found: ' + promptFile);
    process.exit(1);
  }
  promptText = fs.readFileSync(promptFile, 'utf8');
} else {
  promptText = promptInline;
}

(async () => {
  let response;
  try {
    response = await relay(promptText, { timeoutMs: timeoutSec * 1000, debug });
  } catch (e) {
    console.error('Relay error: ' + e.message);
    process.exit(2);
  }

  if (!response || response.trim().length === 0) {
    console.error('Relay returned empty response. Selectors may need tuning. Try --debug.');
    process.exit(3);
  }

  if (outFile) {
    fs.writeFileSync(outFile, response);
    console.error('• Response saved to ' + outFile + ' (' + response.length + ' chars)');
  } else {
    process.stdout.write(response);
    if (!response.endsWith('\n')) process.stdout.write('\n');
  }
})();
