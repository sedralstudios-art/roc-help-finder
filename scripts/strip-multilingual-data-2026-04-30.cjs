// One-shot: strip all foreign-language data from the codebase.
// Site is locked English-only per maintainer policy 2026-04-30. Translation
// data was preserved in the lock commit (5e56340) but is now being removed
// at maintainer request. Reversible via git history.
//
// Patterns stripped:
//   1. `, tr:{...}` blocks in src/data/programs.js (per-program translation maps)
//   2. Top-level `es: {...}`, `ne: {...}`, etc. sub-objects in UI/TABS/etc.
//      objects in HelpFinder.jsx and LandingPage.jsx
//   3. Inline single-line foreign-language keys: `es:"...",`, `ne:"...",`,
//      etc. (when paired with sibling `en:` key)
//   4. Translation files: src/data/legal/translations/{es,zh}.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FOREIGN_LANGS = ['es', 'ne', 'ar', 'sw', 'my', 'so', 'zh'];

function findMatchingBrace(text, openIdx) {
  // Returns index of the brace that closes the one at text[openIdx] === '{'.
  let depth = 0;
  let inString = false;
  let stringChar = null;
  let escaped = false;
  for (let i = openIdx; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === stringChar) { inString = false; stringChar = null; }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true; stringChar = ch; continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

// ─────────── Step 1: strip tr:{...} blocks from programs.js ───────────
function stripProgramsTr() {
  const file = path.join(ROOT, 'src', 'data', 'programs.js');
  let src = fs.readFileSync(file, 'utf8');
  let stripped = 0;
  // Find each occurrence of " tr:{" or ", tr:{" and remove the whole thing.
  const re = /,\s*tr:\s*\{/g;
  let cursor = 0;
  let out = '';
  let m;
  while ((m = re.exec(src)) !== null) {
    const startOfClause = m.index;          // points at the ","
    const openBrace = m.index + m[0].length - 1;  // points at "{"
    const closeBrace = findMatchingBrace(src, openBrace);
    if (closeBrace === -1) {
      console.error('  ! unmatched brace at offset ' + openBrace);
      return null;
    }
    out += src.slice(cursor, startOfClause);
    cursor = closeBrace + 1;
    stripped++;
    re.lastIndex = cursor;
  }
  out += src.slice(cursor);
  fs.writeFileSync(file, out);
  return stripped;
}

// ─────────── Step 2: strip top-level foreign-lang sub-objects ───────────
// Removes blocks like:
//   es: {
//     ...lots of lines...
//   },
// when they appear as a sub-object of a parent object literal that also has
// an `en:` sibling.
function stripForeignLangSubObjects(file) {
  let src = fs.readFileSync(file, 'utf8');
  let stripped = 0;
  for (const lang of FOREIGN_LANGS) {
    // Pattern: start of line + indentation + "lang: {"
    const re = new RegExp('^(\\s*)' + lang + ':\\s*\\{', 'm');
    while (true) {
      const m = re.exec(src);
      if (!m) break;
      const indentLen = m[1].length;
      const openBrace = m.index + m[0].length - 1;
      const closeBrace = findMatchingBrace(src, openBrace);
      if (closeBrace === -1) {
        console.error('  ! unmatched brace at offset ' + openBrace + ' (' + file + ', ' + lang + ')');
        return null;
      }
      // Extend forward through any trailing comma + newline.
      let endCut = closeBrace + 1;
      if (src[endCut] === ',') endCut++;
      if (src[endCut] === '\n') endCut++;
      // Also pull leading newline + same-indent blank line if present.
      let startCut = m.index;
      // Trim any leading whitespace-only lines back if they're only on the same
      // indentation and immediately precede this block — leave alone for safety.
      src = src.slice(0, startCut) + src.slice(endCut);
      stripped++;
    }
  }
  fs.writeFileSync(file, src);
  return stripped;
}

// ─────────── Step 3: strip inline single-line foreign-lang keys ───────────
// Removes lines like:    es: "Necesito ayuda",
// when they appear inside an object that also has an `en:` sibling key.
// Heuristic: just delete every line that is exactly indentation + lang +
// `:` + string + optional trailing comma. This is safe because foreign-lang
// keys aren't used outside of localization objects.
function stripInlineForeignKeys(file) {
  let src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');
  const out = [];
  let stripped = 0;
  const lineRe = new RegExp(
    '^\\s*(' + FOREIGN_LANGS.join('|') + ')\\s*:\\s*"([^"\\\\]|\\\\.)*"\\s*,?\\s*$'
  );
  for (const line of lines) {
    if (lineRe.test(line)) {
      stripped++;
      continue;
    }
    out.push(line);
  }
  fs.writeFileSync(file, out.join('\n'));
  return stripped;
}

// ─────────── Step 4: delete translation files ───────────
function deleteTranslationFiles() {
  const dir = path.join(ROOT, 'src', 'data', 'legal', 'translations');
  let deleted = 0;
  for (const lang of FOREIGN_LANGS) {
    const f = path.join(dir, lang + '.js');
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
      deleted++;
    }
  }
  return deleted;
}

// ─────────── Run ───────────
console.log('Stripping multilingual data...');

const trCount = stripProgramsTr();
console.log('  programs.js: stripped ' + trCount + ' tr:{} blocks');

for (const f of [
  path.join(ROOT, 'src', 'components', 'HelpFinder.jsx'),
  path.join(ROOT, 'src', 'components', 'LandingPage.jsx'),
]) {
  const subCount = stripForeignLangSubObjects(f);
  const inlineCount = stripInlineForeignKeys(f);
  console.log('  ' + path.basename(f) + ': stripped ' + subCount + ' sub-object(s), ' + inlineCount + ' inline key(s)');
}

const delCount = deleteTranslationFiles();
console.log('  translations/: deleted ' + delCount + ' file(s)');

console.log('Done.');
