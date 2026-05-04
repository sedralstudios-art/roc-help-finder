// scripts/extract-voice-rewrite-titles.cjs
//
// Extracts every (file, old title, new title, URL) tuple from the 2026-04-19
// voice-drift commit (f02e0d7 — "Voice drift pass 1: convert 147 entry titles
// from second-person to third-person"). Output is the full punch list for the
// SEO regression analysis: GSC impressions/clicks for each URL, comparing
// pre-2026-04-19 baseline vs post.
//
// Usage:
//   node scripts/extract-voice-rewrite-titles.cjs > voice-rewrite-titles.md
//
// Output is markdown — paste-ready table for review or for GSC cross-referencing.

const { execSync } = require('child_process');
const path = require('path');

const COMMIT = 'f02e0d7';
const SITE = 'https://helpfinder.help';

const diff = execSync(`git show ${COMMIT} --no-color --unified=0`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });

const lines = diff.split(/\r?\n/);

const entries = [];
let currentFile = null;
let pendingOld = null;

for (const line of lines) {
  // File header
  const fileMatch = line.match(/^diff --git a\/(.+?) b\/(.+)$/);
  if (fileMatch) {
    currentFile = fileMatch[2];
    pendingOld = null;
    continue;
  }
  if (!currentFile) continue;
  if (!currentFile.startsWith('src/data/legal/entries/')) continue;

  const removeMatch = line.match(/^-\s*title:\s*\{\s*en:\s*"((?:[^"\\]|\\.)*)"/);
  if (removeMatch) {
    pendingOld = removeMatch[1];
    continue;
  }
  const addMatch = line.match(/^\+\s*title:\s*\{\s*en:\s*"((?:[^"\\]|\\.)*)"/);
  if (addMatch && pendingOld) {
    const entryId = path.basename(currentFile, '.js');
    entries.push({
      file: currentFile,
      entryId,
      oldTitle: pendingOld,
      newTitle: addMatch[1],
      url: `${SITE}/know-your-rights/${entryId}`,
    });
    pendingOld = null;
  }
}

// Markdown output
console.log('# Voice rewrite — title regression punch list (2026-04-19, commit ' + COMMIT + ')');
console.log('');
console.log(`**${entries.length} entries** had their titles rewritten in the 2026-04-19 voice-drift pass. The known regression: snap-rights-ny lost 84% of impressions. Each row below is a candidate for GSC pre/post comparison.`);
console.log('');
console.log('## Pull from GSC (Performance → Search results)');
console.log('');
console.log('1. Set date range to **Compare** mode: 2026-03-19 → 2026-04-18 vs 2026-04-20 → today.');
console.log('2. Click the **PAGES** tab.');
console.log('3. Export the table as CSV (or screenshot/copy if export is unavailable).');
console.log('4. Paste back here — I\'ll join it with this list and rank by regression severity.');
console.log('');
console.log('Optional follow-up for the worst losers: GSC Performance → click the page URL → QUERIES tab → screenshot the top 10. Tells us which search terms the *old* title was winning that the *new* title is missing.');
console.log('');
console.log('## All 147 retitled entries');
console.log('');
console.log('| # | URL | Old title | New title |');
console.log('|---|---|---|---|');
entries.forEach((e, i) => {
  const oldT = e.oldTitle.replace(/\|/g, '\\|');
  const newT = e.newTitle.replace(/\|/g, '\\|');
  const urlPath = `/know-your-rights/${e.entryId}`;
  console.log(`| ${i + 1} | \`${urlPath}\` | ${oldT} | ${newT} |`);
});

console.log('');
console.log('---');
console.log('');
console.log('Generated from `git show ' + COMMIT + '` on ' + new Date().toISOString().slice(0, 10) + '.');
