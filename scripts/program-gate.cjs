// scripts/program-gate.cjs
//
// Content gate for help-program fact-check workflow. Sister to claim-gate.cjs
// (which gates legal entries). Operates on the single-line program objects in
// src/data/programs.js.
//
// Each program has compact fields: id, n, c, d, ph, ad, url, hr, doc, tg,
// inc, fc, lastVerified, etc. The fact-check stamp is `fc:"YYYY-MM-DD"`
// (compact equivalent of legal entries' factCheckedBy: { tool, date }).
//
// Usage:
//   node scripts/program-gate.cjs <program-id>           # print manifest
//   node scripts/program-gate.cjs <program-id> --write   # if no FAILs, stamp fc
//   node scripts/program-gate.cjs --all                  # scan every program,
//                                                        # exit 1 on any FAIL
//
// Tiers:
//   FAIL  - already-swept wrong phone number (shared with legal entries)
//           or new program lacking `fc` and not on the grandfather list.
//   WARN  - stale figure paired with topic. Author judgment required.
//   PASS  - no flagged claims; gate has no objection.

const fs = require('fs');
const path = require('path');
const { SWEPT_WRONG_PHONES, findPhoneMatches } = require('./lib/swept-phones.cjs');

const PROGRAMS_FILE = path.join(__dirname, '..', 'src', 'data', 'programs.js');
const GRANDFATHER_PATH = path.join(__dirname, 'data', 'program-factcheck-grandfather.json');

// ─────────── Sensitive-category hide gate ───────────
// Programs in these categories must carry `hidden: true` until verified.
// "Verified" for sensitive content means more than the fc:"YYYY-MM-DD" stamp
// (which only certifies the metadata sweep) — it requires call-confirmation
// or maintainer review. See feedback_sensitive_programs_need_verification.md.
//
// The 33 programs hidden on 2026-04-30 were the live-leak that exposed the
// gap. This rule prevents recurrence: any future program added to a
// sensitive category MUST be flagged hidden until the maintainer flips it.
const HIDE_GATED_CATEGORIES = new Set([
  'domesticSvc',         // DV crisis services
  'parentalProtection',  // Family court / orders of protection (DV-adjacent)
  'legalImmigration',    // Immigration legal services
]);

// For programs whose `c` is generic (e.g., "documents") but whose subject
// matter is sensitive, the author tags `sensitiveTopic:"immigration"` or
// `sensitiveTopic:"dv"`. The gate catches both the category and the topic.
const HIDE_GATED_TOPICS = new Set([
  'immigration',
  'dv',
]);

let GRANDFATHER = new Set();
try {
  const raw = JSON.parse(fs.readFileSync(GRANDFATHER_PATH, 'utf8'));
  GRANDFATHER = new Set(raw.ids || []);
} catch (_e) {
  // No manifest yet — every program without fc will FAIL.
}

// ─────────── Stale figures (WARN) ───────────
// Patterns we have caught wrong before in programs.js or in the legal-entry
// drain that might also appear in program descriptions.
const STALE_FIGURES = [
  // SNAP household income limit was 130%/150% historically; NY now uses
  // 150% for earned-income households, 130% otherwise, 200% for elderly/disabled.
  // No clean stale-figure pattern yet — placeholder for future drift.
];

// ─────────── Parsing ───────────

function loadPrograms() {
  const src = fs.readFileSync(PROGRAMS_FILE, 'utf8');
  const lines = src.split(/\r?\n/);
  const programs = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const idMatch = line.match(/\bid\s*:\s*"([^"]+)"/);
    if (!idMatch) continue;
    // Only count program object lines (start with optional whitespace then `{`)
    if (!/^\s*\{/.test(line)) continue;
    programs.push({ id: idMatch[1], lineNum: i + 1, line });
  }
  return programs;
}

function readField(line, key) {
  const re = new RegExp('\\b' + key + '\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"');
  const m = line.match(re);
  return m ? m[1].replace(/\\"/g, '"') : null;
}

function readNumField(line, key) {
  const re = new RegExp('\\b' + key + '\\s*:\\s*(\\d+(?:\\.\\d+)?)');
  const m = line.match(re);
  return m ? Number(m[1]) : null;
}

// ─────────── The gate ───────────

function gateProgram(program) {
  const { id, line } = program;
  const fails = [];
  const warns = [];

  const fc = readField(line, 'fc');
  const name = readField(line, 'n') || '(unnamed)';
  const phone = readField(line, 'ph');
  const description = readField(line, 'd') || '';

  // 1. Already-swept wrong phones — scan the whole line so address-context
  //    and description-context cooccur regexes can match.
  for (const rule of SWEPT_WRONG_PHONES) {
    const hits = findPhoneMatches(line, rule.num, rule.cooccur);
    if (hits.length > 0) {
      fails.push({
        kind: 'SWEPT_PHONE',
        label: rule.label + ' — ' + rule.num,
        fix: rule.fix,
        excerpt: hits[0].raw,
      });
    }
  }

  // 2. Stale figures (WARN) — currently empty list; placeholder for future drift.
  for (const rule of STALE_FIGURES) {
    let m = rule.pat.exec(line);
    rule.pat.lastIndex = 0;
    if (!m) continue;
    if (rule.cooccur && !rule.cooccur.test(line)) continue;
    warns.push({ kind: 'STALE_FIGURE', label: rule.label, fix: rule.fix });
  }

  // 3. New-program fact-check enforcement (FAIL)
  //    Any program lacking `fc` AND not on the grandfather list blocks the
  //    build. New programs added after the gate landed must be fact-checked.
  if (!fc && !GRANDFATHER.has(id)) {
    fails.push({
      kind: 'UNSTAMPED_NEW_PROGRAM',
      label: 'program has no fc:"YYYY-MM-DD" stamp and is not on the grandfather list',
      fix: 'fact-check via WebSearch (use scripts/fact-check-program-prompt.cjs ' + id + ') then run: node scripts/program-gate.cjs ' + id + ' --write',
    });
  }

  // 4. Sensitive-category hide enforcement (FAIL)
  //    Programs in DV / immigration categories must have hidden:true until
  //    real verification (call + maintainer greenlight) exists. The fc stamp
  //    alone is NOT sufficient for sensitive content.
  const category = readField(line, 'c');
  const sensitiveTopic = readField(line, 'sensitiveTopic');
  const isHidden = /\bhidden\s*:\s*true\b/.test(line);
  const inSensitiveCategory = category && HIDE_GATED_CATEGORIES.has(category);
  const inSensitiveTopic = sensitiveTopic && HIDE_GATED_TOPICS.has(sensitiveTopic);

  if ((inSensitiveCategory || inSensitiveTopic) && !isHidden) {
    const reason = inSensitiveCategory
      ? 'category "' + category + '" is in HIDE_GATED_CATEGORIES'
      : 'sensitiveTopic "' + sensitiveTopic + '" is in HIDE_GATED_TOPICS';
    fails.push({
      kind: 'SENSITIVE_PROGRAM_NOT_HIDDEN',
      label: 'sensitive program must have hidden:true until call-verified — ' + reason,
      fix: 'add ", hidden:true" to the program object. Restoration requires call-verification (not just fc stamp). See ~/.claude/projects/C--Users-adima/memory/feedback_sensitive_programs_need_verification.md.',
    });
  }

  return { id, name, fc, fails, warns };
}

// ─────────── Output ───────────

function printManifest(report) {
  const { id, name, fc, fails, warns } = report;
  console.log('\n=== ' + id + ' (' + name + ') ===');
  if (fc) console.log('  fc: ' + fc);

  if (fails.length === 0 && warns.length === 0) {
    console.log('  (no flags)');
    return;
  }

  if (fails.length > 0) {
    console.log('\n  FAIL (' + fails.length + '):');
    for (const f of fails) {
      console.log('    [' + f.kind + '] ' + f.label);
      if (f.excerpt) console.log('      excerpt: "' + f.excerpt + '"');
      console.log('      fix:     ' + f.fix);
    }
  }

  if (warns.length > 0) {
    console.log('\n  WARN (' + warns.length + '):');
    for (const w of warns) {
      console.log('    [' + w.kind + '] ' + w.label);
      if (w.fix) console.log('      hint:    ' + w.fix);
    }
  }
}

function stampProgram(id) {
  const src = fs.readFileSync(PROGRAMS_FILE, 'utf8');
  const lines = src.split(/\r?\n/);
  const today = new Date().toISOString().slice(0, 10);
  const stamp = ' fc:"' + today + '"';

  let touched = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const idMatch = line.match(/\bid\s*:\s*"([^"]+)"/);
    if (!idMatch || idMatch[1] !== id) continue;
    if (!/^\s*\{/.test(line)) continue;

    if (/\bfc\s*:\s*"\d{4}-\d{2}-\d{2}"/.test(line)) {
      // Already stamped — refresh the date.
      lines[i] = line.replace(/\bfc\s*:\s*"\d{4}-\d{2}-\d{2}"/, 'fc:"' + today + '"');
    } else {
      // Insert before the closing `},` (or `}`) of the object.
      const closeRe = /\s*\},?\s*$/;
      const closeMatch = line.match(closeRe);
      if (!closeMatch) {
        console.error('  ! could not find object close on line ' + (i + 1));
        return false;
      }
      const head = line.slice(0, closeMatch.index);
      const tail = closeMatch[0];
      // Add comma if head doesn't already end with one.
      const sep = /,\s*$/.test(head) ? '' : ',';
      lines[i] = head + sep + stamp + ' ' + tail.trimStart();
    }
    touched = true;
    break;
  }

  if (!touched) {
    console.error('  ! program not found: ' + id);
    return false;
  }

  fs.writeFileSync(PROGRAMS_FILE, lines.join('\n'));
  console.log('  ✓ stamped fc:"' + today + '"');
  return true;
}

function main() {
  const args = process.argv.slice(2);
  const writeMode = args.includes('--write');
  const allMode = args.includes('--all');

  const programs = loadPrograms();

  if (allMode) {
    let totalFails = 0;
    let stamped = 0;
    let unstamped = 0;
    const failingIds = [];
    for (const p of programs) {
      const r = gateProgram(p);
      if (r.fc) stamped++; else unstamped++;
      if (r.fails.length > 0) {
        printManifest(r);
        totalFails += r.fails.length;
        failingIds.push(r.id);
      }
    }
    console.log('\n────────────────────────────────────────');
    console.log('Scanned ' + programs.length + ' programs; ' + failingIds.length + ' have FAILs (' + totalFails + ' total).');
    console.log('Program fact-check drain: ' + stamped + ' stamped / ' + unstamped + ' pending.');
    process.exit(failingIds.length > 0 ? 1 : 0);
  }

  const id = args.find(a => !a.startsWith('--'));
  if (!id) {
    console.error('Usage: node scripts/program-gate.cjs <program-id> [--write]');
    console.error('       node scripts/program-gate.cjs --all');
    process.exit(1);
  }

  const program = programs.find(p => p.id === id);
  if (!program) {
    console.error('Program not found: ' + id);
    process.exit(1);
  }

  const report = gateProgram(program);
  printManifest(report);

  if (writeMode) {
    if (report.fails.length > 0) {
      console.log('\n  ✗ refusing to stamp: ' + report.fails.length + ' FAIL(s) must be fixed first');
      process.exit(1);
    }
    console.log('');
    stampProgram(id);
  }

  process.exit(report.fails.length > 0 ? 1 : 0);
}

main();
