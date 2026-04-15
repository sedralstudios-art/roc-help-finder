#!/usr/bin/env node
/**
 * migrate-crawl-coverage-53.cjs
 * ==============================
 * Two crawl-coverage fixes driven by Googlebot indexing concerns:
 *
 * 1. vercel.json — replaces the blanket /(.*) → /index.html catch-all rewrite
 *    with explicit rewrites only for /help (the HelpFinder app, which is the
 *    one SPA-only route not prerendered to dist/). Every other legitimate
 *    URL already has a prerendered file in dist/. Unknown paths now fall
 *    through to Vercel's default 404 handling, which serves dist/404.html
 *    (Vite copies public/404.html there) with an HTTP 404 status code.
 *
 *    Before: every garbage URL returned HTTP 200 with the SPA shell. That
 *    looked like infinite duplicate content to Google and hurt crawl budget.
 *
 * 2. scripts/generate-sitemap.cjs — adds a new sitemap-glossary.xml
 *    sub-sitemap listing the glossary index + category pages + per-term
 *    pages. Previously glossary URLs were missing from sitemap.xml entirely.
 *
 * 3. public/404.html — adds a Legal Glossary link to the "jump straight to"
 *    list so users who land on a stale URL can discover the new product.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const VERCEL = path.join(ROOT, 'vercel.json');
const SITEMAP = path.join(ROOT, 'scripts/generate-sitemap.cjs');
const FOUR04 = path.join(ROOT, 'public/404.html');

let vercel = fs.readFileSync(VERCEL, 'utf8');
let sitemap = fs.readFileSync(SITEMAP, 'utf8');
let four04 = fs.readFileSync(FOUR04, 'utf8');
let failures = 0;
let successes = 0;

function makeReplacer(label, getter, setter) {
  return (oldStr, newStr, sub) => {
    const current = getter();
    if (!current.includes(oldStr)) {
      console.error('ABORT ' + label + ': ' + sub);
      console.error('  Expected: ' + JSON.stringify(oldStr).slice(0, 180));
      failures++;
      return;
    }
    setter(current.replace(oldStr, newStr));
    console.log('OK ' + label + ': ' + sub);
    successes++;
  };
}

const doReplaceVercel = makeReplacer('VERCEL', () => vercel, (v) => { vercel = v; });
const doReplaceSitemap = makeReplacer('SITEMAP', () => sitemap, (v) => { sitemap = v; });
const doReplace404 = makeReplacer('404', () => four04, (v) => { four04 = v; });

// ═══════════════════════════════════════════════
// 1. vercel.json — explicit /help rewrites, no catch-all
// ═══════════════════════════════════════════════
doReplaceVercel(
  '{\n' +
  '  "rewrites": [\n' +
  '    { "source": "/(.*)", "destination": "/index.html" }\n' +
  '  ]\n' +
  '}\n',
  '{\n' +
  '  "rewrites": [\n' +
  '    { "source": "/help", "destination": "/index.html" },\n' +
  '    { "source": "/help/:path*", "destination": "/index.html" }\n' +
  '  ]\n' +
  '}\n',
  'Replace catch-all with explicit /help rewrites'
);

// ═══════════════════════════════════════════════
// 2. generate-sitemap.cjs — add glossary sub-sitemap before the index section
// ═══════════════════════════════════════════════
doReplaceSitemap(
  '  // 4. sitemap.xml — the INDEX pointing to all sub-sitemaps\n',
  '  // 3b. sitemap-glossary.xml — glossary index + categories + per-term (English only v1)\n' +
  '  const glossaryDir = path.join(ROOT, \'src\', \'data\', \'legal\', \'glossary\');\n' +
  '  const glossaryTerms = [];\n' +
  '  if (fs.existsSync(glossaryDir)) {\n' +
  '    const gFiles = fs.readdirSync(glossaryDir).filter((f) => f.endsWith(\'.js\'));\n' +
  '    for (const f of gFiles) {\n' +
  '      const abs = path.join(glossaryDir, f);\n' +
  '      const mod = await import(pathToFileURL(abs).href);\n' +
  '      const val = Object.values(mod)[0];\n' +
  '      if (val && val.id) glossaryTerms.push(val);\n' +
  '    }\n' +
  '  }\n' +
  '  if (glossaryTerms.length > 0) {\n' +
  '    let glossaryXml = \'\';\n' +
  '    glossaryXml += buildUrlBlock(SITE_URL + \'/glossary\', today, \'weekly\', \'0.85\', null);\n' +
  '    totalUrls++;\n' +
  '    const gCats = [...new Set(glossaryTerms.map((t) => t.category || \'general\'))].sort();\n' +
  '    for (const cat of gCats) {\n' +
  '      glossaryXml += buildUrlBlock(SITE_URL + \'/glossary/category/\' + cat, today, \'weekly\', \'0.8\', null);\n' +
  '      totalUrls++;\n' +
  '    }\n' +
  '    for (const t of glossaryTerms) {\n' +
  '      const lastmod = t.lastVerified || today;\n' +
  '      glossaryXml += buildUrlBlock(SITE_URL + \'/glossary/\' + t.id, lastmod, \'monthly\', \'0.75\', null);\n' +
  '      totalUrls++;\n' +
  '    }\n' +
  '    writeSubsitemap(\'sitemap-glossary.xml\', glossaryXml);\n' +
  '    writtenFiles.push(\'sitemap-glossary.xml\');\n' +
  '    console.log(\'\\u2713 Wrote sitemap-glossary.xml (\' + (1 + gCats.length + glossaryTerms.length) + \' URLs)\');\n' +
  '  }\n\n' +
  '  // 4. sitemap.xml — the INDEX pointing to all sub-sitemaps\n',
  'Insert glossary sub-sitemap block before index'
);

// ═══════════════════════════════════════════════
// 3. public/404.html — add Legal Glossary link to jump-list
// ═══════════════════════════════════════════════
doReplace404(
  '      <li><a href="/know-your-rights"><span class="icon">\u2696\ufe0f</span><span class="label">Know Your Rights \u2014 free legal guides</span><span class="arrow">\u2192</span></a></li>\n',
  '      <li><a href="/know-your-rights"><span class="icon">\u2696\ufe0f</span><span class="label">Know Your Rights \u2014 free legal guides</span><span class="arrow">\u2192</span></a></li>\n' +
  '      <li><a href="/glossary"><span class="icon">\ud83d\udcd6</span><span class="label">Legal Glossary \u2014 plain-English court words</span><span class="arrow">\u2192</span></a></li>\n',
  'Add Legal Glossary entry to jump-straight-to list'
);

// ═══════════════════════════════════════════════
// WRITE
// ═══════════════════════════════════════════════
if (failures === 0) {
  fs.writeFileSync(VERCEL, vercel, 'utf8');
  fs.writeFileSync(SITEMAP, sitemap, 'utf8');
  fs.writeFileSync(FOUR04, four04, 'utf8');
}
console.log('\n' + successes + ' changes, ' + failures + ' failures.');
if (failures > 0) {
  console.error('\nABORT: source files NOT written.');
  process.exit(1);
}
console.log('\nWrote: ' + path.relative(ROOT, VERCEL));
console.log('Wrote: ' + path.relative(ROOT, SITEMAP));
console.log('Wrote: ' + path.relative(ROOT, FOUR04));
