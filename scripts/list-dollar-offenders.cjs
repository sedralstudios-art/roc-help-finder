#!/usr/bin/env node
/*
 * scripts/list-dollar-offenders.cjs
 * One-shot enumerator: every non-bankruptcy entry with a $X amount in
 * whatItMeans.en. Writes dist/dollar-amount-queue.json with file, id,
 * count, and the actual matches so a human can categorize them before
 * mass-rewriting.
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const ENTRIES_DIR = path.join(ROOT, 'src', 'data', 'legal', 'entries');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(DIST, 'dollar-amount-queue.json');

const BANKRUPTCY_FILES = new Set([
  'bankruptcy-automatic-stay-ny.js',
  'bankruptcy-chapter13-ny.js',
  'bankruptcy-chapter7-ny.js',
  'bankruptcy-discharge-ny.js',
  'bankruptcy-exemptions-ny.js',
  'bankruptcy-means-test-ny.js',
  'bankruptcy-reaffirmation-ny.js',
]);

const RE = /\$\d[\d,]*(?:\.\d+)?/g;

async function main() {
  const files = fs.readdirSync(ENTRIES_DIR).filter((f) => f.endsWith('.js'));
  const queue = [];
  for (const f of files) {
    if (BANKRUPTCY_FILES.has(f)) continue;
    const abs = path.join(ENTRIES_DIR, f);
    const mod = await import(pathToFileURL(abs).href);
    const e = Object.values(mod)[0];
    if (!e || !e.id) continue;
    if (e.draft || e.status !== 'active') continue;
    const wim = (e.whatItMeans && e.whatItMeans.en) || '';
    const matches = wim.match(RE) || [];
    if (matches.length === 0) continue;
    queue.push({
      file: f,
      id: e.id,
      category: e.category,
      authorityType: e.authorityType,
      count: matches.length,
      matches,
    });
  }
  queue.sort((a, b) => b.count - a.count);
  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({
    generatedAt: new Date().toISOString(),
    total: queue.length,
    totalDollarMatches: queue.reduce((s, x) => s + x.count, 0),
    queue,
  }, null, 2));

  console.log('Dollar-amount queue');
  console.log('===================');
  console.log('Entries with $ in whatItMeans:', queue.length);
  console.log('Total $ matches              :', queue.reduce((s, x) => s + x.count, 0));
  console.log('Output                       :', OUT);
  console.log('');
  console.log('Top 30 by count:');
  console.log('count  category    file');
  console.log('-----  ---------   ----');
  for (const r of queue.slice(0, 30)) {
    console.log(String(r.count).padStart(5) + '  ' + String(r.category || '-').padEnd(10) + '  ' + r.file);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
