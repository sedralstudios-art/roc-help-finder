#!/usr/bin/env node
/*
 * step8b_install.cjs
 * ==================
 * Backs up and replaces scripts/prerender-legal.cjs and
 * scripts/generate-sitemap.cjs with v2 versions that include the new
 * /know-your-rights/topic/[cat] category URL tier.
 *
 * After this runs, "npm run build" produces:
 *   - 920 entry pages
 *   - 140 category list pages  (NEW)
 *   - 20 library index pages (category overview, now 7 tiles)
 *   - sitemap.xml with 1,085 URLs
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const HOME = os.homedir();
const ROOT = path.join(HOME, 'roc-help-finder');
const SCRIPTS_DIR = path.join(ROOT, 'scripts');

const files = [
  {
    src: path.join(ROOT, 'prerender-legal-v2.cjs'),
    dest: path.join(SCRIPTS_DIR, 'prerender-legal.cjs'),
    backup: path.join(SCRIPTS_DIR, 'prerender-legal.cjs.bak8b'),
    name: 'prerender-legal.cjs',
  },
  {
    src: path.join(ROOT, 'generate-sitemap-v2.cjs'),
    dest: path.join(SCRIPTS_DIR, 'generate-sitemap.cjs'),
    backup: path.join(SCRIPTS_DIR, 'generate-sitemap.cjs.bak8b'),
    name: 'generate-sitemap.cjs',
  },
];

for (const f of files) {
  if (!fs.existsSync(f.src)) {
    console.error(`ERROR: ${f.src} not found. Did you move it into ~/roc-help-finder/?`);
    process.exit(1);
  }
  if (fs.existsSync(f.dest)) {
    fs.writeFileSync(f.backup, fs.readFileSync(f.dest, 'utf8'), 'utf8');
    console.log(`✓ Backup: ${f.backup}`);
  }
  fs.copyFileSync(f.src, f.dest);
  fs.unlinkSync(f.src);
  console.log(`✓ Replaced: ${f.dest}`);
}

console.log();
console.log('Step 8b install complete. Run "npm run build" to regenerate with categories.');
