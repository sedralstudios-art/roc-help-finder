#!/usr/bin/env node
/*
 * scripts/prerender-legal.cjs
 * ===========================
 * Generates static HTML for every legal entry at every language:
 *   - 46 entries × 20 languages = 920 entry pages
 *   - 20 library index pages (one per language)
 *   = 940 files total
 *
 * Each HTML file contains:
 *   - Per-language <html lang> and dir (ltr/rtl)
 *   - Unique <title> and meta description
 *   - Canonical URL pointing to self
 *   - hreflang linking all 20 language versions of the same content
 *   - Open Graph + Twitter tags
 *   - JSON-LD structured data (Article or CollectionPage)
 *   - Real body content inside #root (Google crawls this directly)
 *   - React bundle tags (so user hydration works after crawler sees content)
 *
 * Runs automatically after `vite build` via package.json's build script.
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const SITE_URL = 'https://helpfinder.help';
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const ENTRIES_DIR = path.join(ROOT, 'src', 'data', 'legal', 'entries');

// ── Languages ──
const LEGAL_LANGS = [
  { code: 'en', label: 'English', dir: 'ltr', htmlLang: 'en' },
  { code: 'es', label: 'Español', dir: 'ltr', htmlLang: 'es' },
  { code: 'zh', label: '中文', dir: 'ltr', htmlLang: 'zh-Hans' },
  { code: 'vi', label: 'Tiếng Việt', dir: 'ltr', htmlLang: 'vi' },
  { code: 'ko', label: '한국어', dir: 'ltr', htmlLang: 'ko' },
  { code: 'tl', label: 'Tagalog', dir: 'ltr', htmlLang: 'tl' },
  { code: 'ar', label: 'العربية', dir: 'rtl', htmlLang: 'ar' },
  { code: 'ru', label: 'Русский', dir: 'ltr', htmlLang: 'ru' },
  { code: 'ht', label: 'Kreyòl Ayisyen', dir: 'ltr', htmlLang: 'ht' },
  { code: 'pt', label: 'Português', dir: 'ltr', htmlLang: 'pt-BR' },
  { code: 'fr', label: 'Français', dir: 'ltr', htmlLang: 'fr' },
  { code: 'hi', label: 'हिन्दी', dir: 'ltr', htmlLang: 'hi' },
  { code: 'ur', label: 'اردو', dir: 'rtl', htmlLang: 'ur' },
  { code: 'fa', label: 'فارسی', dir: 'rtl', htmlLang: 'fa' },
  { code: 'ps', label: 'پښتو', dir: 'rtl', htmlLang: 'ps' },
  { code: 'uk', label: 'Українська', dir: 'ltr', htmlLang: 'uk' },
  { code: 'ne', label: 'नेपाली', dir: 'ltr', htmlLang: 'ne' },
  { code: 'my', label: 'မြန်မာ', dir: 'ltr', htmlLang: 'my' },
  { code: 'so', label: 'Soomaali', dir: 'ltr', htmlLang: 'so' },
  { code: 'sw', label: 'Kiswahili', dir: 'ltr', htmlLang: 'sw' },
];

const CATEGORY_LABELS = {
  benefits: 'Public Benefits',
  consumer: 'Consumer Rights',
  housing: 'Housing & Eviction',
  family: 'Family & Child Care',
  employment: 'Employment & Wages',
  vehicle: 'Vehicle & Driver',
  criminal: 'Criminal Record',
};

// ── Helpers ──
function esc(s) {
  if (s === undefined || s === null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function pick(field, lang) {
  if (!field || typeof field !== 'object') return '';
  return field[lang] || field.en || '';
}

function pickArr(field, lang) {
  if (!field || typeof field !== 'object') return [];
  const v = field[lang] || field.en || [];
  return Array.isArray(v) ? v : [];
}

function urlPathForEntry(lang, entryId) {
  if (lang === 'en') return `/know-your-rights/${entryId}`;
  return `/${lang}/know-your-rights/${entryId}`;
}

function urlPathForLibrary(lang) {
  if (lang === 'en') return '/know-your-rights';
  return `/${lang}/know-your-rights`;
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
  entries.sort((a, b) => {
    const c = (a.category || '').localeCompare(b.category || '');
    if (c !== 0) return c;
    return (a.title?.en || '').localeCompare(b.title?.en || '');
  });
  return entries;
}

function extractBundleTags(indexHTML) {
  const scripts = (indexHTML.match(/<script\b[^>]*>\s*<\/script>|<script\b[^>]*\/>/g) || []).join('\n    ');
  const links = (indexHTML.match(/<link\b[^>]*(?:stylesheet|modulepreload|preload)[^>]*>/g) || []).join('\n    ');
  return { scripts, links };
}

function buildHreflangEntry(entryId) {
  const lines = LEGAL_LANGS.map((l) => {
    const href = SITE_URL + urlPathForEntry(l.code, entryId);
    return `    <link rel="alternate" hreflang="${l.htmlLang}" href="${esc(href)}" />`;
  });
  lines.push(`    <link rel="alternate" hreflang="x-default" href="${esc(SITE_URL + urlPathForEntry('en', entryId))}" />`);
  return lines.join('\n');
}

function buildHreflangLibrary() {
  const lines = LEGAL_LANGS.map((l) => {
    const href = SITE_URL + urlPathForLibrary(l.code);
    return `    <link rel="alternate" hreflang="${l.htmlLang}" href="${esc(href)}" />`;
  });
  lines.push(`    <link rel="alternate" hreflang="x-default" href="${esc(SITE_URL + urlPathForLibrary('en'))}" />`);
  return lines.join('\n');
}

function jsonLDSafe(obj) {
  return JSON.stringify(obj, null, 2).replace(/<\//g, '<\\/');
}

function buildJSONLDEntry(entry, langMeta) {
  const lang = langMeta.code;
  const canonical = SITE_URL + urlPathForEntry(lang, entry.id);
  const title = pick(entry.title, lang);
  const summary = pick(entry.summary, lang);
  return jsonLDSafe({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: summary,
    inLanguage: langMeta.htmlLang,
    datePublished: entry.lastAudited || '2026-04-04',
    dateModified: entry.lastAudited || '2026-04-04',
    author: { '@type': 'Organization', name: 'HelpFinder', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'HelpFinder',
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    keywords: (entry.tags || []).join(', '),
    about: { '@type': 'Thing', name: CATEGORY_LABELS[entry.category] || entry.category || 'Legal rights' },
  });
}

function translationBanner(lang) {
  if (lang === 'en') return '';
  return '<div class="translation-banner">📖 <strong>Full translation in progress.</strong> This guide is being translated. Contact the free legal aid organizations listed at the bottom — many speak your language.</div>';
}

// ── Entry HTML ──
function generateEntryHTML(entry, langMeta, bundleTags) {
  const lang = langMeta.code;
  const canonical = SITE_URL + urlPathForEntry(lang, entry.id);
  const title = pick(entry.title, lang);
  const summary = pick(entry.summary, lang);
  const whoQual = pickArr(entry.whoQualifies, lang);
  const whatItMeans = pick(entry.whatItMeans, lang);
  const rights = pickArr(entry.yourRights, lang);
  const options = pickArr(entry.legalOptions, lang);
  const example = pick(entry.example, lang);
  const counsel = Array.isArray(entry.counsel) ? entry.counsel : [];
  const sources = Array.isArray(entry.sources) ? entry.sources : [];
  const tags = Array.isArray(entry.tags) ? entry.tags : [];

  const pageTitle = title + ' | HelpFinder';
  const metaDesc = summary.length > 160 ? summary.slice(0, 157) + '...' : summary;

  const whoQualHTML = whoQual.length
    ? '<h2>Who qualifies</h2><ul>' + whoQual.map((i) => '<li>' + esc(i) + '</li>').join('') + '</ul>'
    : '';
  const whatItMeansHTML = whatItMeans ? '<h2>What it means</h2><p>' + esc(whatItMeans) + '</p>' : '';
  const rightsHTML = rights.length
    ? '<section class="rights-box"><h2>Your rights</h2><ul>' + rights.map((i) => '<li>' + esc(i) + '</li>').join('') + '</ul></section>'
    : '';
  const optionsHTML = options.length
    ? '<h2>Legal options</h2><ul>' + options.map((i) => '<li>' + esc(i) + '</li>').join('') + '</ul>'
    : '';
  const exampleHTML = example ? '<h2>Example</h2><p><em>' + esc(example) + '</em></p>' : '';

  const counselHTML = counsel.length
    ? '<h2>Get free legal help</h2><ul class="counsel">' +
      counsel
        .map((c) => {
          let html = '<li><strong>' + esc(c.name || '') + '</strong>';
          if (c.phone) {
            const cleanPhone = c.phone.replace(/[^0-9+]/g, '');
            html += ' — <a href="tel:' + esc(cleanPhone) + '">' + esc(c.phone) + '</a>';
          }
          if (c.url) {
            html += ' — <a href="' + esc(c.url) + '" rel="noopener">website</a>';
          }
          if (c.focus) {
            html += '<br><span class="focus">' + esc(c.focus) + '</span>';
          }
          html += '</li>';
          return html;
        })
        .join('') +
      '</ul>'
    : '';

  const sourcesHTML = sources.length
    ? '<h2>Sources</h2><ul class="sources">' +
      sources.map((s) => '<li><a href="' + esc(s) + '" rel="noopener">' + esc(s) + '</a></li>').join('') +
      '</ul>'
    : '';

  return `<!DOCTYPE html>
<html lang="${esc(langMeta.htmlLang)}" dir="${langMeta.dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(pageTitle)}</title>
    <meta name="description" content="${esc(metaDesc)}" />
    <meta name="keywords" content="${esc(tags.join(', '))}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${esc(canonical)}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(metaDesc)}" />
    <meta property="og:url" content="${esc(canonical)}" />
    <meta property="og:site_name" content="HelpFinder" />
    <meta property="og:locale" content="${esc(langMeta.htmlLang.replace('-', '_'))}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(metaDesc)}" />
${buildHreflangEntry(entry.id)}
    <script type="application/ld+json">
${buildJSONLDEntry(entry, langMeta)}
    </script>
    ${bundleTags.links}
    ${bundleTags.scripts}
    <style>
      body { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #1a1a1a; background: #fafaf7; }
      .ssr-content { max-width: 900px; margin: 0 auto; padding: 20px; line-height: 1.6; }
      .ssr-content h1 { font-size: 28px; font-weight: 400; margin: 14px 0 10px; color: #1a1a1a; line-height: 1.25; }
      .ssr-content h2 { font-size: 20px; font-weight: 400; margin: 24px 0 10px; color: #1a1a1a; }
      .ssr-content .lead { font-size: 16px; color: #555; margin-bottom: 20px; font-weight: 500; }
      .ssr-content ul { padding-inline-start: 22px; margin: 8px 0 16px; }
      .ssr-content li { margin-bottom: 8px; font-size: 14px; }
      .ssr-content .rights-box { background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 12px; padding: 16px 20px; margin: 20px 0; }
      .ssr-content .rights-box h2 { color: #2e7d32; margin-top: 0; }
      .ssr-content .tier-badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
      .ssr-content .disclaimer { background: #fdf6ec; border: 1px solid #f0dab0; border-radius: 10px; padding: 12px 16px; margin: 20px 0; font-size: 12px; color: #555; }
      .ssr-content .translation-banner { background: #fdf6ec; border: 1px solid #f0dab0; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; color: #555; }
      .ssr-content .counsel li { background: #fff; border: 1px solid #e8e4dc; border-radius: 10px; padding: 10px 14px; list-style: none; }
      .ssr-content .counsel { padding: 0; }
      .ssr-content .counsel .focus { font-size: 12px; color: #767676; }
      .ssr-content .sources li { font-size: 11px; color: #767676; }
      .ssr-content .sources a { color: #767676; word-break: break-all; }
    </style>
  </head>
  <body>
    <div id="root">
      <article class="ssr-content">
        ${translationBanner(lang)}
        <div>
          <span class="tier-badge">${esc(entry.tier || '')}</span>
          ${entry.jurisdiction ? '<span style="margin-left:8px;font-size:11px;color:#767676;text-transform:uppercase;">' + esc(entry.jurisdiction) + '</span>' : ''}
        </div>
        <h1>${esc(title)}</h1>
        <p class="lead">${esc(summary)}</p>
        ${whoQualHTML}
        ${whatItMeansHTML}
        ${rightsHTML}
        ${optionsHTML}
        ${exampleHTML}
        ${counselHTML}
        ${sourcesHTML}
        <div class="disclaimer">⚠️ <strong>Not legal advice.</strong> This guide explains your general rights under New York and federal law. Laws change. For your specific situation, contact one of the free legal aid organizations listed above.</div>
      </article>
    </div>
  </body>
</html>`;
}

// ── Library index HTML ──
function generateLibraryHTML(entries, langMeta, bundleTags) {
  const lang = langMeta.code;
  const canonical = SITE_URL + urlPathForLibrary(lang);
  const pageTitle = 'Know Your Rights — Free Legal Guides for New York | HelpFinder';
  const metaDesc = entries.length + ' free legal guides for New York covering benefits, housing, employment, consumer rights, family, and criminal record issues. Plain language, verified, with free legal aid phone numbers.';

  const byCategory = {};
  for (const e of entries) {
    const cat = e.category || 'other';
    (byCategory[cat] = byCategory[cat] || []).push(e);
  }
  const categories = Object.keys(byCategory).sort();

  const catHTML = categories
    .map((cat) => {
      const label = CATEGORY_LABELS[cat] || cat;
      const items = byCategory[cat]
        .map((e) => {
          const t = pick(e.title, lang);
          const s = pick(e.summary, lang);
          const href = urlPathForEntry(lang, e.id);
          return '<li><a href="' + esc(href) + '"><strong>' + esc(t) + '</strong><br><span>' + esc(s) + '</span></a></li>';
        })
        .join('');
      return '<section><h2>' + esc(label) + ' (' + byCategory[cat].length + ')</h2><ul class="entry-list">' + items + '</ul></section>';
    })
    .join('');

  const jsonLD = jsonLDSafe({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: metaDesc,
    inLanguage: langMeta.htmlLang,
    url: canonical,
    publisher: { '@type': 'Organization', name: 'HelpFinder', url: SITE_URL },
    hasPart: entries.map((e) => ({
      '@type': 'Article',
      headline: pick(e.title, lang),
      url: SITE_URL + urlPathForEntry(lang, e.id),
    })),
  });

  return `<!DOCTYPE html>
<html lang="${esc(langMeta.htmlLang)}" dir="${langMeta.dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(pageTitle)}</title>
    <meta name="description" content="${esc(metaDesc)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${esc(canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${esc(pageTitle)}" />
    <meta property="og:description" content="${esc(metaDesc)}" />
    <meta property="og:url" content="${esc(canonical)}" />
    <meta property="og:site_name" content="HelpFinder" />
    <meta property="og:locale" content="${esc(langMeta.htmlLang.replace('-', '_'))}" />
${buildHreflangLibrary()}
    <script type="application/ld+json">
${jsonLD}
    </script>
    ${bundleTags.links}
    ${bundleTags.scripts}
    <style>
      body { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #1a1a1a; background: #fafaf7; }
      .ssr-content { max-width: 900px; margin: 0 auto; padding: 20px; line-height: 1.6; }
      .ssr-content h1 { font-size: 32px; font-weight: 400; margin: 16px 0 6px; }
      .ssr-content h2 { font-size: 22px; font-weight: 400; margin: 28px 0 12px; border-bottom: 2px solid #e8f5e9; padding-bottom: 6px; }
      .ssr-content .lead { font-size: 16px; color: #555; margin-bottom: 20px; }
      .ssr-content .entry-list { list-style: none; padding: 0; display: grid; gap: 10px; margin: 0; }
      .ssr-content .entry-list li a { display: block; padding: 12px 16px; background: #fff; border: 1px solid #e8e4dc; border-radius: 10px; text-decoration: none; color: #1a1a1a; }
      .ssr-content .entry-list li a strong { font-size: 15px; font-weight: 600; display: block; margin-bottom: 4px; }
      .ssr-content .entry-list li a span { font-size: 13px; color: #555; }
      .ssr-content .translation-banner { background: #fdf6ec; border: 1px solid #f0dab0; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; font-size: 13px; color: #555; }
    </style>
  </head>
  <body>
    <div id="root">
      <article class="ssr-content">
        ${translationBanner(lang)}
        <h1>Know Your Rights</h1>
        <p class="lead">${esc(metaDesc)}</p>
        ${catHTML}
      </article>
    </div>
  </body>
</html>`;
}

// ── Main ──
async function main() {
  console.log('Prerender legal library...');

  const distIndexPath = path.join(DIST, 'index.html');
  if (!fs.existsSync(distIndexPath)) {
    console.error('ERROR: ' + distIndexPath + ' not found. Run "vite build" first.');
    process.exit(1);
  }
  const indexHTML = fs.readFileSync(distIndexPath, 'utf8');
  const bundleTags = extractBundleTags(indexHTML);
  if (!bundleTags.scripts) {
    console.error('ERROR: Could not extract bundle script tags from dist/index.html.');
    process.exit(1);
  }
  console.log('✓ Extracted bundle tags from dist/index.html');

  const entries = await loadEntries();
  console.log('✓ Loaded ' + entries.length + ' entries');

  let fileCount = 0;

  for (const langMeta of LEGAL_LANGS) {
    for (const entry of entries) {
      const html = generateEntryHTML(entry, langMeta, bundleTags);
      const urlPath = urlPathForEntry(langMeta.code, entry.id);
      const outDir = path.join(DIST, urlPath.replace(/^\//, ''));
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), html);
      fileCount++;
    }
  }

  for (const langMeta of LEGAL_LANGS) {
    const html = generateLibraryHTML(entries, langMeta, bundleTags);
    const urlPath = urlPathForLibrary(langMeta.code);
    const outDir = path.join(DIST, urlPath.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    fileCount++;
  }

  console.log('✓ Wrote ' + fileCount + ' pre-rendered HTML files');
  console.log('  = ' + entries.length + ' entries × ' + LEGAL_LANGS.length + ' languages + ' + LEGAL_LANGS.length + ' library index pages');
  console.log('Done.');
}

main().catch((e) => {
  console.error('ERROR:', e);
  process.exit(1);
});
