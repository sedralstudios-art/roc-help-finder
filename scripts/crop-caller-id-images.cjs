// scripts/crop-caller-id-images.cjs
//
// Bulk-crops every PNG in call-data/screenshots/ to the caller-ID block
// only — strips the status bar, duration pill, avatar, call-controls, and
// navigation. Output: 480×200 JPEG into call-data/caller-id-cropped/.
//
// Crop region calibrated for Samsung S23 1440×3088 in-call screen:
//   crop=1296:540:72:280   (x_offset=72, y_offset=280, w=1296, h=540)
//   scale=480:200          (4:1 → ~2.4:1; preserves text readability)
//
// Idempotent: skips files whose cropped output already exists.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SRC_DIR = path.join(__dirname, '..', 'call-data', 'screenshots');
const OUT_DIR = path.join(__dirname, '..', 'call-data', 'caller-id-cropped');
const FFMPEG = 'ffmpeg';

const CROP = '1296:540:72:280';
const SCALE = '480:200';
const QUALITY = 5; // JPEG quality 1-31, lower=better. 5 ≈ 30-50KB at this size.

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(SRC_DIR).filter(f => f.toLowerCase().endsWith('.png'));
console.log(`Found ${files.length} screenshots in ${SRC_DIR}`);

let cropped = 0, skipped = 0, failed = 0;

for (const f of files) {
  const srcPath = path.join(SRC_DIR, f);
  const outName = f.replace(/\.png$/i, '.jpg');
  const outPath = path.join(OUT_DIR, outName);
  if (fs.existsSync(outPath)) { skipped++; continue; }

  const cmd = [
    `"${FFMPEG}"`,
    '-y -hide_banner -loglevel error',
    `-i "${srcPath}"`,
    `-vf "crop=${CROP},scale=${SCALE}"`,
    `-q:v ${QUALITY}`,
    `"${outPath}"`,
  ].join(' ');
  try {
    execSync(cmd, { stdio: 'pipe' });
    cropped++;
  } catch (e) {
    failed++;
    console.error(`  FAIL: ${f} — ${e.message.slice(0, 200)}`);
  }
}

console.log('');
console.log(`Cropped: ${cropped}, skipped (already done): ${skipped}, failed: ${failed}`);
console.log(`Output: ${OUT_DIR}`);
