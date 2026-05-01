// scripts/phone-gsc-capture.cjs
//
// One-command Google Search Console (or any URL) capture via ADB-tethered
// phone. Builds on the ADB Facebook automation pattern memory: launch URL
// in Chrome on phone → wait for load → screenshot directly to PC.
//
// Usage:
//   node scripts/phone-gsc-capture.cjs <slug> [<url>] [--wait <seconds>]
//
// Examples:
//   node scripts/phone-gsc-capture.cjs overview
//      → opens https://search.google.com/search-console (default URL),
//        waits 6s, saves screenshot as
//        ~/.claude/projects/C--Users-adima/memory/projects/gsc-screenshots-YYYY-MM-DD/<HHMM>-overview.png
//
//   node scripts/phone-gsc-capture.cjs performance "https://search.google.com/search-console/performance/search-analytics?resource_id=https://helpfinder.help/" --wait 8
//
//   node scripts/phone-gsc-capture.cjs scroll-down
//      → no URL, just screenshot the current state (after a manual swipe etc.)
//
// What it does NOT do:
//   - Authenticate. Phone Chrome must already be logged in to the right
//     Google account.
//   - Re-launch Chrome from cold start. If GSC is already loaded and you
//     just want a screenshot of current state, omit the URL argument.
//   - OCR. The PNG is for the assistant's multimodal Read tool to ingest.
//
// Per memory project_adb_facebook_automation_2026_04_30.md: use Windows
// absolute paths for screenshot output, NOT /sdcard/ → Git Bash mangling
// makes that fail.

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ADB = 'C:\\Users\\adima\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Google.PlatformTools_Microsoft.Winget.Source_8wekyb3d8bbwe\\platform-tools\\adb.exe';
const DEFAULT_URL = 'https://search.google.com/search-console';

const args = process.argv.slice(2);
const slug = args[0];
if (!slug || slug.startsWith('--')) {
  console.error('Usage: node scripts/phone-gsc-capture.cjs <slug> [<url>] [--wait N]');
  process.exit(1);
}

let url = args[1] && !args[1].startsWith('--') ? args[1] : null;
const waitIdx = args.indexOf('--wait');
const waitSec = waitIdx >= 0 ? parseInt(args[waitIdx + 1], 10) || 6 : 6;

// Output: ~/.claude/projects/C--Users-adima/memory/projects/gsc-screenshots-YYYY-MM-DD/HHMM-<slug>.png
const today = new Date().toISOString().slice(0, 10);
const hhmm = new Date().toTimeString().slice(0, 5).replace(':', '');
const outDir = path.join(
  os.homedir(),
  '.claude', 'projects', 'C--Users-adima', 'memory', 'projects',
  'gsc-screenshots-' + today
);
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, hhmm + '-' + slug + '.png');

function adb(cmd) {
  return execSync('"' + ADB + '" ' + cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

// Confirm phone connected
const devices = adb('devices').trim();
if (!/\bdevice\b/.test(devices.split('\n').slice(1).join('\n'))) {
  console.error('No device connected:\n' + devices);
  process.exit(2);
}

// Launch URL if provided
if (url) {
  console.log('• Launching: ' + url);
  // Single-quote the URL to be shell-safe and use 'start -a VIEW -d <url>'
  const escUrl = url.replace(/&/g, '\\&');
  try {
    adb('shell am start -a android.intent.action.VIEW -d "' + escUrl + '"');
  } catch (e) {
    console.error('Launch failed: ' + e.message);
    process.exit(3);
  }
  console.log('• Waiting ' + waitSec + 's for page load…');
  execSync('node -e "setTimeout(()=>{}, ' + (waitSec * 1000) + ')"');
}

// Screenshot direct to local file (Windows absolute path — Git Bash gotcha)
console.log('• Capturing screenshot → ' + outFile);
execSync('"' + ADB + '" exec-out screencap -p > "' + outFile + '"', {
  shell: 'cmd.exe',
});
const stat = fs.statSync(outFile);
console.log('  ✓ ' + Math.round(stat.size / 1024) + 'KB');
console.log('');
console.log('Read with: Read tool → ' + outFile);
