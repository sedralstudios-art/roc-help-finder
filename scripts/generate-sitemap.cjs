#!/usr/bin/env node
/*
 * scripts/generate-sitemap.cjs  (v3 — sitemap index + per-language sub-sitemaps)
 * ============================================================================
 * Writes a sitemap INDEX at dist/sitemap.xml that references:
 *   - dist/sitemap-static.xml (5 static pages, all languages)
 *   - dist/sitemap-library.xml (library index pages + category pages, all langs)
 *   - dist/sitemap-entries-[lang].xml (one file per language, entry pages)
 *
 * Splitting reduces each sub-sitemap to ~150-200 URLs and a few hundred KB.
 * Google processes small sitemaps faster and is less likely to flag them as
 * "Couldn't fetch" for size/processing reasons.
 *
 * hreflang alternates are still included on every URL so multi-language
 * signals stay intact.
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const SITE_URL = 'https://helpfinder.help';
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const ENTRIES_DIR = path.join(ROOT, 'src', 'data', 'legal', 'entries');

// English-only per maintainer policy (locked 2026-04-30). Sitemap drops all
// foreign-language URLs and hreflang alternates. Restoring requires explicit
// maintainer greenlight + native-speaker review per translations/README.md.
const LEGAL_LANGS = [
  { code: 'en', htmlLang: 'en' },
];

const CATEGORIES = ['benefits', 'consumer', 'housing', 'family', 'employment', 'vehicle', 'criminal', 'trades'];

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

function urlPathForCategory(lang, cat) {
  if (lang === 'en') return '/know-your-rights/topic/' + cat;
  return '/' + lang + '/know-your-rights/topic/' + cat;
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
    if (val && val.id && !val.draft) entries.push(val);
  }
  return entries;
}

// Load per-language translation maps so we only emit sitemap URLs and hreflang
// alternates for entries that actually have translated content in that language.
// Added 2026-04-20 after a month of ~20k URLs producing only 7 indexed pages —
// 18 of 20 prerendered languages were English bodies under locale paths, which
// Google was treating as duplicate content at scale.
async function loadTranslations() {
  // English-only per maintainer policy (locked 2026-04-30). Translation maps
  // remain on disk in src/data/legal/translations/ but are not read into the
  // sitemap. Restoring requires explicit maintainer greenlight.
  return {};
}

function langsForEntry(/* entry, translations */) {
  return ['en'];
}

function cleanupOrphanSubsitemaps() {
  // Remove any sitemap-entries-*.xml from a prior build so we don't leave
  // orphan files behind when a language no longer has translated entries.
  const existing = fs.readdirSync(DIST).filter((f) => /^sitemap-entries-[a-z]{2}\.xml$/.test(f));
  for (const f of existing) fs.unlinkSync(path.join(DIST, f));
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

function openUrlset() {
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
}

function closeUrlset() {
  return '</urlset>\n';
}

function writeSubsitemap(filename, xmlBody) {
  const full = openUrlset() + xmlBody + closeUrlset();
  fs.writeFileSync(path.join(DIST, filename), full, 'utf8');
}

async function main() {
  console.log('Generate sitemap index + sub-sitemaps (v3)...');

  if (!fs.existsSync(DIST)) {
    console.error('ERROR: dist/ not found. Run "vite build" first.');
    process.exit(1);
  }

  const entries = await loadEntries();
  console.log('✓ Loaded ' + entries.length + ' entries');

  const translations = await loadTranslations();
  const translatedLangCodes = Object.keys(translations);
  console.log('✓ Loaded translation maps for: ' + (translatedLangCodes.length ? translatedLangCodes.join(', ') : '(none)'));

  cleanupOrphanSubsitemaps();

  // Only include in library/category pages the languages that have at least
  // one translated entry; English is always emitted as the canonical.
  const SITEMAP_LANGS = LEGAL_LANGS.filter(
    (l) => l.code === 'en' || (translations[l.code] && Object.keys(translations[l.code]).length > 0),
  );

  const entriesByCat = {};
  for (const e of entries) {
    const cat = e.category || 'other';
    (entriesByCat[cat] = entriesByCat[cat] || []).push(e);
  }
  const activeCategories = CATEGORIES.filter((c) => (entriesByCat[c] || []).length > 0);

  const today = todayISO();
  let totalUrls = 0;
  const writtenFiles = [];

  // 1. sitemap-static.xml — 5 static pages
  let staticXml = '';
  for (const p of STATIC_PAGES) {
    staticXml += buildUrlBlock(SITE_URL + p.path, today, p.changefreq, p.priority, null);
    totalUrls++;
  }
  writeSubsitemap('sitemap-static.xml', staticXml);
  writtenFiles.push('sitemap-static.xml');

  // 2. sitemap-library.xml — library index pages + category pages, only for
  // languages with at least one translated entry (SITEMAP_LANGS).
  let libraryXml = '';
  for (const lang of SITEMAP_LANGS) {
    const loc = SITE_URL + urlPathForLibrary(lang.code);
    const alternates = SITEMAP_LANGS.map((l) => ({
      hreflang: l.htmlLang,
      href: SITE_URL + urlPathForLibrary(l.code),
    }));
    alternates.push({ hreflang: 'x-default', href: SITE_URL + urlPathForLibrary('en') });
    libraryXml += buildUrlBlock(loc, today, 'weekly', '0.9', alternates);
    totalUrls++;
  }
  for (const lang of SITEMAP_LANGS) {
    for (const cat of activeCategories) {
      const loc = SITE_URL + urlPathForCategory(lang.code, cat);
      const alternates = SITEMAP_LANGS.map((l) => ({
        hreflang: l.htmlLang,
        href: SITE_URL + urlPathForCategory(l.code, cat),
      }));
      alternates.push({ hreflang: 'x-default', href: SITE_URL + urlPathForCategory('en', cat) });
      libraryXml += buildUrlBlock(loc, today, 'weekly', '0.85', alternates);
      totalUrls++;
    }
  }
  writeSubsitemap('sitemap-library.xml', libraryXml);
  writtenFiles.push('sitemap-library.xml');

  // 3. sitemap-entries-[lang].xml — one file per language, but only the entries
  // that actually have a translation in that language. English always included
  // as the canonical source. Empty language sitemaps are skipped entirely.
  const perLangXml = {};
  for (const entry of entries) {
    const entryLangs = langsForEntry(entry, translations);
    const alternates = entryLangs
      .map((code) => LEGAL_LANGS.find((l) => l.code === code))
      .filter(Boolean)
      .map((l) => ({ hreflang: l.htmlLang, href: SITE_URL + urlPathForEntry(l.code, entry.id) }));
    alternates.push({ hreflang: 'x-default', href: SITE_URL + urlPathForEntry('en', entry.id) });
    const lastmod = entry.lastVerified || entry.lastAudited || today;
    for (const code of entryLangs) {
      const loc = SITE_URL + urlPathForEntry(code, entry.id);
      perLangXml[code] = (perLangXml[code] || '') + buildUrlBlock(loc, lastmod, 'monthly', '0.8', alternates);
      totalUrls++;
    }
  }
  for (const [code, xml] of Object.entries(perLangXml)) {
    if (!xml) continue;
    const filename = 'sitemap-entries-' + code + '.xml';
    writeSubsitemap(filename, xml);
    writtenFiles.push(filename);
  }

  // 3b. sitemap-glossary.xml — glossary index + categories + per-term (English only v1)
  const glossaryDir = path.join(ROOT, 'src', 'data', 'legal', 'glossary');
  const glossaryTerms = [];
  if (fs.existsSync(glossaryDir)) {
    const gFiles = fs.readdirSync(glossaryDir).filter((f) => f.endsWith('.js'));
    for (const f of gFiles) {
      const abs = path.join(glossaryDir, f);
      const mod = await import(pathToFileURL(abs).href);
      const val = Object.values(mod)[0];
      if (val && val.id) glossaryTerms.push(val);
    }
  }
  if (glossaryTerms.length > 0) {
    let glossaryXml = '';
    glossaryXml += buildUrlBlock(SITE_URL + '/glossary', today, 'weekly', '0.85', null);
    totalUrls++;
    const gCats = [...new Set(glossaryTerms.map((t) => t.category || 'general'))].sort();
    for (const cat of gCats) {
      glossaryXml += buildUrlBlock(SITE_URL + '/glossary/category/' + cat, today, 'weekly', '0.8', null);
      totalUrls++;
    }
    for (const t of glossaryTerms) {
      const lastmod = t.lastVerified || today;
      glossaryXml += buildUrlBlock(SITE_URL + '/glossary/' + t.id, lastmod, 'monthly', '0.75', null);
      totalUrls++;
    }
    writeSubsitemap('sitemap-glossary.xml', glossaryXml);
    writtenFiles.push('sitemap-glossary.xml');
    console.log('\u2713 Wrote sitemap-glossary.xml (' + (1 + gCats.length + glossaryTerms.length) + ' URLs)');
  }

  // 3c. sitemap-help.xml — /help index + per-category program pages
  const helpDir = path.join(ROOT, 'dist', 'help');
  if (fs.existsSync(helpDir)) {
    let helpXml = '';
    helpXml += buildUrlBlock(SITE_URL + '/help', today, 'weekly', '0.9', null);
    totalUrls++;
    const helpCatDir = path.join(helpDir, 'c');
    if (fs.existsSync(helpCatDir)) {
      const cats = fs.readdirSync(helpCatDir).filter((f) => fs.statSync(path.join(helpCatDir, f)).isDirectory());
      for (const cat of cats.sort()) {
        helpXml += buildUrlBlock(SITE_URL + '/help/c/' + cat, today, 'weekly', '0.85', null);
        totalUrls++;
      }
      console.log('\u2713 Wrote sitemap-help.xml (' + (1 + cats.length) + ' URLs)');
    }
    writeSubsitemap('sitemap-help.xml', helpXml);
    writtenFiles.push('sitemap-help.xml');
  }

  // 4. sitemap.xml — the INDEX pointing to all sub-sitemaps
  let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const f of writtenFiles) {
    indexXml += '  <sitemap>\n';
    indexXml += '    <loc>' + SITE_URL + '/' + f + '</loc>\n';
    indexXml += '    <lastmod>' + today + '</lastmod>\n';
    indexXml += '  </sitemap>\n';
  }
  indexXml += '</sitemapindex>\n';
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), indexXml, 'utf8');

  console.log('✓ Wrote sitemap.xml (index)');
  console.log('✓ Wrote ' + writtenFiles.length + ' sub-sitemaps');
  console.log('  Total URLs: ' + totalUrls);
  console.log('Done.');
}

main().catch((e) => {
  console.error('ERROR:', e);
  process.exit(1);
});
