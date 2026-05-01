// scripts/relay-chrome-launch.cjs
//
// Launch Chrome with --remote-debugging-port=9222 + dedicated profile for
// automation. After running, the user logs into claude.ai once in that
// window; the cookies persist in the profile dir so future launches start
// logged in.
//
// Coexists with the user's normal Chrome (different profile = different
// instance). Closing this Chrome window does not affect normal browsing.
//
// Usage:
//   node scripts/relay-chrome-launch.cjs
//
// Then keep the window open while running scripts/relay-to-claude-ai.cjs.

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PROFILE = path.join(os.homedir(), '.chrome-relay-profile');
const PORT = 9222;
const START_URL = 'https://claude.ai/new';

if (!fs.existsSync(CHROME)) {
  console.error('Chrome not found at: ' + CHROME);
  process.exit(1);
}

fs.mkdirSync(PROFILE, { recursive: true });

const args = [
  '--remote-debugging-port=' + PORT,
  '--user-data-dir=' + PROFILE,
  '--no-first-run',
  '--no-default-browser-check',
  START_URL,
];

console.log('• Launching Chrome with debug port ' + PORT);
console.log('  Profile: ' + PROFILE);
console.log('  Start URL: ' + START_URL);
console.log('');
console.log('First run: log into claude.ai in the window that opens.');
console.log('Future runs: should start logged in.');
console.log('');
console.log('Keep this Chrome window open while running the relay script.');
console.log('CDP endpoint: http://localhost:' + PORT);

const child = spawn(CHROME, args, { detached: true, stdio: 'ignore' });
child.unref();
