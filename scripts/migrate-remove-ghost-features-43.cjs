#!/usr/bin/env node
/**
 * migrate-remove-ghost-features-43.cjs
 * =====================================
 * Removes dead UI strings from LandingPage.jsx that were never rendered:
 *   - Clarity Reading (door2*, clarity*, cdoor*)
 *   - The Library (libraryTitle, libraryDesc)
 *   - Submit Creative Works (submitTitle, submitDesc)
 *   - Community Bulletin Board (bulletinTitle, bulletinDesc)
 *   - Support door (door3Title, door3Desc)
 *   - Clarity disclaimer (disclaimer — the one mentioning "Readings")
 *   - aboutP3 (Clarity Reading description)
 *   - privacyP3 (Clarity Reading AI disclosure)
 *   - termsP3 (Clarity Reading terms)
 *
 * Strategy: Parse line-by-line, remove lines containing dead keys.
 * This avoids paste-editing AR/ZH characters which can silently corrupt.
 *
 * Safety: only removes lines inside the UI = { ... } object that contain
 * dead key names as standalone property definitions. Verifies the key is
 * at the start of a property assignment (after optional whitespace).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LP = path.join(ROOT, 'src/components/LandingPage.jsx');

const DEAD_KEYS = new Set([
  'door2Title', 'door2Hook', 'door2Desc', 'door2Btn', 'door2Footer',
  'clarityLine1', 'clarityLine2', 'clarityLine3', 'clarityLine4', 'clarityLine5',
  'clarityPrivacy', 'clarityEnter', 'clarityBack',
  'cdoor1Title', 'cdoor1Desc', 'cdoor1Label',
  'cdoor2Title', 'cdoor2Desc', 'cdoor2Label',
  'cdoor3Title', 'cdoor3Desc', 'cdoor3Label',
  'disclaimer',
  'door3Title', 'door3Desc',
  'libraryTitle', 'libraryDesc',
  'submitTitle', 'submitDesc',
  'bulletinTitle', 'bulletinDesc',
  'aboutP3',
  'privacyP3',
  'termsP3',
]);

let content = fs.readFileSync(LP, 'utf8');
const lines = content.split('\n');
const kept = [];
let removed = 0;
let inUI = false;
let braceDepth = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Track if we're inside the UI object
  if (line.includes('const UI = {')) inUI = true;
  if (inUI) {
    braceDepth += (line.match(/{/g) || []).length;
    braceDepth -= (line.match(/}/g) || []).length;
    if (braceDepth <= 0 && i > 0) inUI = false;
  }

  if (!inUI) {
    kept.push(line);
    continue;
  }

  // Check if this line starts with (or contains as first key) a dead key
  // Match patterns like:  key: "...", or key: "..." at line start
  const trimmed = line.trim();

  // Check if ANY dead key appears as a property on this line
  let hasDead = false;
  let hasLive = false;

  for (const key of DEAD_KEYS) {
    // Match key: at word boundary (property definition)
    const keyPattern = new RegExp('(?:^|[,\\s])' + key + '\\s*:');
    if (keyPattern.test(trimmed)) {
      hasDead = true;
    }
  }

  // If the line has dead keys, check if it also has live keys we need to keep
  if (hasDead) {
    // Extract all property keys from this line
    const allKeys = [];
    const keyRegex = /(?:^|,\s*)([a-zA-Z][a-zA-Z0-9]*)\s*:/g;
    let m;
    while ((m = keyRegex.exec(trimmed)) !== null) {
      allKeys.push(m[1]);
    }

    const liveKeys = allKeys.filter(k => !DEAD_KEYS.has(k));

    if (liveKeys.length > 0) {
      // This line has both dead and live keys — need to surgically remove dead ones
      // This happens on compound lines like: bulletinTitle: "...", feedbackTitle: "...",
      let newLine = line;
      for (const key of DEAD_KEYS) {
        // Remove key: "value" or key: "value",  (with optional trailing comma+space)
        // Handle both single-quoted and double-quoted string values
        const removePattern = new RegExp(',?\\s*' + key + '\\s*:\\s*"[^"]*"\\s*,?', 'g');
        newLine = newLine.replace(removePattern, (match, offset) => {
          // If removing leaves a dangling comma at line boundary, clean it
          return '';
        });
      }
      // Clean up any double commas or leading/trailing commas
      newLine = newLine.replace(/,\s*,/g, ',').replace(/,\s*$/, ',').replace(/\{\s*,/, '{');
      if (newLine.trim() && newLine.trim() !== ',') {
        kept.push(newLine);
        removed++;
        console.log('PARTIAL line ' + (i+1) + ': kept live keys [' + liveKeys.join(', ') + '], removed dead keys');
      } else {
        removed++;
        console.log('REMOVED line ' + (i+1) + ' (became empty after cleanup)');
      }
    } else {
      // Entire line is dead keys — remove it
      removed++;
      console.log('REMOVED line ' + (i+1) + ': ' + allKeys.join(', '));
    }
  } else {
    kept.push(line);
  }
}

fs.writeFileSync(LP, kept.join('\n'), 'utf8');
console.log('\nRemoved or modified ' + removed + ' lines.');
console.log('File saved.');

// Verify no dead keys remain
const verify = fs.readFileSync(LP, 'utf8');
let residual = 0;
for (const key of DEAD_KEYS) {
  const pattern = new RegExp(key + '\\s*:', 'g');
  const matches = verify.match(pattern);
  if (matches) {
    console.error('WARNING: ' + key + ' still found ' + matches.length + ' time(s)');
    residual++;
  }
}
if (residual === 0) {
  console.log('Verification passed: all dead keys removed.');
} else {
  console.error(residual + ' dead key(s) remain — manual cleanup needed.');
  process.exit(1);
}
