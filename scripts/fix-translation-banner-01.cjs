#!/usr/bin/env node
/**
 * scripts/fix-translation-banner-01.cjs
 *
 * Replaces the one-sentence translation-in-progress banner in
 * scripts/prerender-legal.cjs with a longer one that explains why
 * Google Translate isn't recommended for legal content.
 *
 * Why we recommend against MT for legal:
 * - Words like "may," "shall," "right," and "petition" have precise legal
 *   meanings that everyday translation tools miss
 * - A wrong word can change someone's rights
 * - MT is not certified for legal use by any U.S. court system
 *
 * The banner stays in English regardless of `lang` (matches existing
 * function signature). The 211 phone number works universally for
 * non-English speakers landing on the page.
 *
 * After running, rebuild prerendered HTML:
 *   npm run build
 *
 * Idempotent.
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'scripts', 'prerender-legal.cjs');

let src = fs.readFileSync(FILE, 'utf8');
const orig = src;

const hadCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

const oldBanner = `  return '<div class="translation-banner">📖 <strong>Full translation in progress.</strong> This guide is being translated. Contact the free legal aid organizations listed at the bottom — many speak your language.</div>';`;

const newBanner = `  return '<div class="translation-banner">' +
    '<div style="font-size:14px;font-weight:600;color:#5d4037;margin-bottom:6px;">📖 Full translation in progress.</div>' +
    '<div style="font-size:13px;color:#5d4037;line-height:1.5;margin-bottom:8px;">Legal words like <em>may</em>, <em>shall</em>, <em>right</em>, and <em>petition</em> have precise meanings that everyday translation tools (like Google Translate) often miss — and a wrong word can change your rights.</div>' +
    '<div style="font-size:13px;color:#5d4037;line-height:1.5;">If you need help right now in your language, call <strong>211</strong> (free, 24/7, 200+ languages) or <strong>LawNY at 585-295-5700</strong> (free legal aid, interpreters available). The free legal aid organizations listed at the bottom of this page also speak many languages directly.</div>' +
    '</div>';`;

if (src.includes('Legal words like') && src.includes('Google Translate')) {
  console.log('  Banner already updated, skipping');
} else if (src.includes(oldBanner)) {
  src = src.replace(oldBanner, newBanner);
  console.log('  Banner updated with Google Translate explanation');
} else {
  console.log('  ERROR: Old banner string not found in expected shape');
  console.log('  ABORTING — file unchanged');
  process.exit(1);
}

if (hadCRLF) src = src.replace(/\n/g, '\r\n');

if (src === orig) {
  console.log('No changes.');
} else {
  fs.writeFileSync(FILE, src);
  console.log(`Done. ${orig.length} → ${src.length} bytes`);
  console.log('');
  console.log('Next: rebuild prerendered HTML to see the new banner live:');
  console.log('  npm run build');
}
