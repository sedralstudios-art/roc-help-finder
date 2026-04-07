#!/usr/bin/env node
/*
 * scripts/generate-sitemap.cjs
 * ============================
 * Writes dist/sitemap.xml with all 945 URLs:
 *   - 5 static pages (/, /about, /support, /privacy, /terms)
 *   - 20 library index pages (1 per language)
 *   - 920 entry pages (46 × 20 languages)
 *
 * Each URL includes xhtml:link hreflang alternates for all 20 language
 * versions — Google's recommended multilingual sitemap format for sites
 * with the same content available in multiple languages.
 *
 * Runs automatically after prerender-legal.cjs via package.json build.
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const SITE_URL = 'https://helpfinder.help';
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const ENTRIES_DIR = path.join(ROOT, 'src', 'data', 'legal', 'entries');

const LEGAL_LANGS = [
  { code: 'en', htmlLang: 'en' },
  { code: 'es', htmlLang: 'es' },
  { code: 'zh', htmlLang: 'zh-Hans' },
  { code: 'vi', htmlLang: 'vi' },
  { code: 'ko', htmlLang: 'ko' },
  { code: 'tl', htmlLang: 'tl' },
  { code: 'ar', htmlLang: 'ar' },
  { code: 'ru', htmlLang: 'ru' },
  { code: 'ht', htmlLang: 'ht' },
  { code: 'pt', htmlLang: 'pt-BR' },
  { code: 'fr', htmlLang: 'fr' },
  { code: 'hi', htmlLang: 'hi' },
  { code: 'ur', htmlLang: 'ur' },
  { code: 'fa', htmlLang: 'fa' },
  { code: 'ps', htmlLang: 'ps' },
  { code: 'uk', htmlLang: 'uk' },
  { code: 'ne', htmlLang: 'ne' },
  { code: 'my', htmlLang: 'my' },
  { code: 'so', htmlLang: 'so' },
  { code: 'sw', htmlLang: 'sw' },
];

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/support', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

function xmlEsc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlPathForEntry(lang, id) {
  if (lang === 'en') return '/know-your-rights/' + id;
  return '/' + lang + '/know-your-rights/' + id;
}

function urlPathForLibrary(lang) {
  if (lang === 'en') return '/know-your-rights';
  return '/' + lang + '/know-your-rights';
}

async function loadEntries() {
  const files = fs.readdirSync(ENTRIES_DIR).filter((f) => f.endsWith('.js'));
  const entries = [];
  for (const f of files) {
    const abs = path.join(ENTRIES_DIR, f);
    const mod = await import(pathToFileURL(abs).href);
    const val = Object.values(mod)[0];
    if (val && val.id) entries.push(val);
  }
  return entries;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function buildUrlBlock(loc, lastmod, changefreq, priority, alternates) {
  let xml = '  <url>\n';
  xml += '    <loc>' + xmlEsc(loc) + '</loc>\n';
  if (lastmod) xml += '    <lastmod>' + xmlEsc(lastmod) + '</lastmod>\n';
  if (changefreq) xml += '    <changefreq>' + changefreq + '</changefreq>\n';
  if (priority) xml += '    <priority>' + priority + '</priority>\n';
  if (alternates && alternates.length) {
    for (const alt of alternates) {
      xml += '    <xhtml:link rel="alternate" hreflang="' + xmlEsc(alt.hreflang) + '" href="' + xmlEsc(alt.href) + '" />\n';
    }
  }
  xml += '  </url>\n';
  return xml;
}

async function main() {
  console.log('Generate sitemap.xml...');

  if (!fs.existsSync(DIST)) {
    console.error('ERROR: dist/ not found. Run "vite build" first.');
    process.exit(1);
  }

  const entries = await loadEntries();
  console.log('✓ Loaded ' + entries.length + ' entries');

  const today = todayISO();
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  let urlCount = 0;

  // Static pages
  for (const p of STATIC_PAGES) {
    xml += buildUrlBlock(SITE_URL + p.path, today, p.changefreq, p.priority, null);
    urlCount++;
  }

  // Library index pages — all 20 languages
  for (const lang of LEGAL_LANGS) {
    const loc = SITE_URL + urlPathForLibrary(lang.code);
    const alternates = LEGAL_LANGS.map((l) => ({
      hreflang: l.htmlLang,
      href: SITE_URL + urlPathForLibrary(l.code),
    }));
    alternates.push({ hreflang: 'x-default', href: SITE_URL + urlPathForLibrary('en') });
    xml += buildUrlBlock(loc, today, 'weekly', '0.9', alternates);
    urlCount++;
  }

  // Entry pages — 46 × 20
  for (const lang of LEGAL_LANGS) {
    for (const entry of entries) {
      const loc = SITE_URL + urlPathForEntry(lang.code, entry.id);
      const lastmod = entry.lastAudited || today;
      const alternates = LEGAL_LANGS.map((l) => ({
        hreflang: l.htmlLang,
        href: SITE_URL + urlPathForEntry(l.code, entry.id),
      }));
      alternates.push({ hreflang: 'x-default', href: SITE_URL + urlPathForEntry('en', entry.id) });
      xml += buildUrlBlock(loc, lastmod, 'monthly', '0.8', alternates);
      urlCount++;
    }
  }

  xml += '</urlset>\n';

  const sitemapPath = path.join(DIST, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log('✓ Wrote ' + sitemapPath);
  console.log('  = ' + urlCount + ' URLs (' + STATIC_PAGES.length + ' static + ' + LEGAL_LANGS.length + ' library + ' + (LEGAL_LANGS.length * entries.length) + ' entries)');
  console.log('Done.');
}

main().catch((e) => {
  console.error('ERROR:', e);
  process.exit(1);
});
