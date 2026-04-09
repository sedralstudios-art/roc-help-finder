#!/usr/bin/env node
/**
 * scripts/fix-translation-banner-01.cjs
 *
 * The existing translationBanner() in scripts/prerender-legal.cjs already
 * names Google Translate and explains why machine translation is unsafe
 * for legal content. What it doesn't do is tell the user what to do
 * instead. Adding that.
 *
 * New text: same warning, plus a one-line "what to do" — call 211 for a
 * free interpreter, or LawNY at 585-295-5700 which has interpreters on
 * staff. Both are existing, verified Rochester resources.
 *
 * This patches the prerender side ONLY. The React side (LegalLibrary.jsx)
 * has no banner at all and is a separate fix queued for next round.
 *
 * Idempotent. Aborts cleanly if the anchor isn't found.
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'prerender-legal.cjs');

let src = fs.readFileSync(FILE, 'utf8');
const orig = src;

const hadCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

// Idempotency check
if (src.includes('free interpreter')) {
  console.log('  banner already enhanced, skipping');
  process.exit(0);
}

// Anchor: the existing warning line, exactly as discovery showed it.
// We append a new div line immediately after it. The trailing ` +` chains
// the new line into the same string concatenation that builds the banner.
const anchor = `'<div style="font-size:13px;color:#5d4037;line-height:1.5;margin-bottom:8px;">Legal words like <em>may</em>, <em>shall</em>, <em>right</em>, and <em>petition</em> have precise meanings that everyday translation tools (like Google Translate) often miss — and a wrong word can change your rights.</div>' +`;

if (!src.includes(anchor)) {
  console.error('FATAL: existing warning line not found in expected shape.');
  console.error('No changes written.');
  console.error('');
  console.error('Expected to find this exact line in scripts/prerender-legal.cjs:');
  console.error(anchor);
  process.exit(1);
}

const replacement = anchor + `
    '<div style="font-size:13px;color:#5d4037;line-height:1.5;"><strong>If you need help in your language right now:</strong> call <a href="tel:211" style="color:#1565c0;font-weight:600;">211</a> for a free interpreter, or <a href="tel:5852955700" style="color:#1565c0;font-weight:600;">LawNY at 585-295-5700</a> which has interpreters on staff.</div>' +`;

src = src.replace(anchor, replacement);
console.log('  enhanced translation banner with "what to do" guidance');

if (hadCRLF) src = src.replace(/\n/g, '\r\n');

fs.writeFileSync(FILE, src);
console.log(`Done. ${orig.length} → ${src.length} bytes`);
console.log('');
console.log('Spot check:');
console.log('  grep -n "free interpreter" scripts/prerender-legal.cjs');
console.log('  grep -c "translationBanner" scripts/prerender-legal.cjs');
