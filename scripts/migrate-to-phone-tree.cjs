// scripts/migrate-to-phone-tree.cjs
//
// One-shot migration of existing dialer artifacts into the phone-keyed data
// tree at data/phones/<digits>/runs/<ts>_<uuid>/. Source: results.json + the
// flat recordings/ + screenshots/ + transcripts/ folders.
//
// Each row becomes a per-call directory containing audio + screenshot +
// transcript + verdict + meta. Apr 17 .amr-era rows tagged quality:"untrusted"
// because of the file-misalignment bug documented in
// project_apr17_dialer_fail_2026_05_03.md. PC-driven .wav rows tagged trusted.
//
// Idempotent: skips rows whose target directory already exists.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const RESULTS = path.join(ROOT, 'call-data', 'results.json');
const RECORDINGS_DIR = path.join(ROOT, 'call-data', 'recordings');
const SCREENSHOTS_DIR = path.join(ROOT, 'call-data', 'screenshots');
const TRANSCRIPTS_DIR = path.join(ROOT, 'call-data', 'transcripts');
const TAGGED_PHONES = path.join(ROOT, 'scripts', 'data', 'tagged-phones.json');
const TREE_ROOT = path.join(ROOT, 'data', 'phones');

// Build digits → catalogued name lookup from tagged-phones.json so rows whose
// results.json `name` is null/undefined still get a reasonable label.
function loadTaggedNames() {
  if (!fs.existsSync(TAGGED_PHONES)) return new Map();
  const t = JSON.parse(fs.readFileSync(TAGGED_PHONES, 'utf8'));
  const map = new Map();
  for (const rec of (t.records || [])) {
    if (!rec.digits || rec.digits.length !== 10) continue;
    const programOwner = (rec.owners || []).find(o => o.type === 'program');
    const poleOwner = (rec.owners || []).find(o => o.type === 'pole');
    const entryOwner = (rec.owners || []).find(o => o.type === 'entry');
    let label = null;
    if (programOwner) label = programOwner.name || ('program:' + programOwner.id);
    else if (poleOwner) label = poleOwner.group + '.' + poleOwner.slug;
    else if (entryOwner) label = 'entry-callout:' + entryOwner.id;
    else if (rec.name) label = rec.name;
    if (label) map.set(rec.digits, label);
  }
  return map;
}

// Auto-classification removed 2026-05-03 — see
// feedback_no_auto_verification_from_transcripts.md. Migration writes the
// raw artifacts into the tree without any auto-derived verdict; humans review.

function dnorm(s) {
  const d = String(s || '').replace(/\D/g, '');
  return d.length === 11 && d.startsWith('1') ? d.substring(1) : d;
}

function tsForDir(timestamp) {
  return String(timestamp || new Date().toISOString()).replace(/[:.]/g, '-');
}

function safeCopyFile(src, dst) {
  if (!src || !fs.existsSync(src)) return false;
  try { fs.copyFileSync(src, dst); return true; } catch (e) { return false; }
}

function main() {
  if (!fs.existsSync(RESULTS)) {
    console.error('results.json not found:', RESULTS);
    process.exit(1);
  }
  if (!fs.existsSync(TREE_ROOT)) fs.mkdirSync(TREE_ROOT, { recursive: true });

  const rows = JSON.parse(fs.readFileSync(RESULTS, 'utf8'));
  const taggedNames = loadTaggedNames();
  let migrated = 0, skipped = 0, badDigits = 0, missingArtifacts = 0, namedFromTagged = 0;

  for (const r of rows) {
    const digits = dnorm(r.number);
    if (digits.length !== 10) { badDigits++; continue; }

    // Determine quality from recording extension. .amr = Apr 17 era (untrusted),
    // .wav = May+ PC-driven (trusted), missing = unknown.
    let quality = 'unknown';
    let originalAudio = null;
    if (r.recording) {
      originalAudio = r.recording;
      if (originalAudio.toLowerCase().endsWith('.amr')) quality = 'untrusted';
      else if (originalAudio.toLowerCase().endsWith('.wav')) quality = 'trusted';
    }

    // Synthesize a deterministic-ish callId so re-running migrate is idempotent.
    // Hash the original recording filename + timestamp to get a stable UUID-ish id.
    const seed = (originalAudio || '') + '|' + (r.timestamp || '') + '|' + (r.id || '');
    const hash = crypto.createHash('sha256').update(seed).digest('hex');
    const callId = [
      hash.substring(0, 8), hash.substring(8, 12), hash.substring(12, 16),
      hash.substring(16, 20), hash.substring(20, 32),
    ].join('-');

    const callDirName = tsForDir(r.timestamp) + '_' + callId;
    const callDir = path.join(TREE_ROOT, digits, 'runs', callDirName);
    if (fs.existsSync(callDir)) { skipped++; continue; }
    fs.mkdirSync(callDir, { recursive: true });

    // Copy audio (preserving extension), screenshot, transcript into call dir
    const audioBaseName = originalAudio
      ? (originalAudio.toLowerCase().endsWith('.amr') ? 'audio.amr' : 'audio.wav')
      : null;
    let audioCopied = false, ssCopied = false, txCopied = false;
    if (audioBaseName) {
      audioCopied = safeCopyFile(originalAudio, path.join(callDir, audioBaseName));
    }
    if (r.screenshot) {
      ssCopied = safeCopyFile(r.screenshot, path.join(callDir, 'screenshot.png'));
    }
    // Transcript: prefer matching .txt in transcripts/ by recording basename
    if (originalAudio) {
      const txCandidate = path.join(TRANSCRIPTS_DIR, path.basename(originalAudio).replace(/\.(wav|amr)$/i, '.txt'));
      txCopied = safeCopyFile(txCandidate, path.join(callDir, 'transcript.txt'));
    }
    // If no transcript file, write one from results.json transcript field
    if (!txCopied && r.transcript) {
      try { fs.writeFileSync(path.join(callDir, 'transcript.txt'), r.transcript); txCopied = true; } catch (e) { /* */ }
    }

    if (!audioCopied && !ssCopied && !txCopied) missingArtifacts++;

    // Resolve catalogued name: prefer results.json `name`, fall back to
    // tagged-phones.json owner label (programs.js / canonical poles / entries)
    let catalogedName = r.name && r.name !== 'undefined' ? r.name : null;
    if (!catalogedName) {
      const fromTagged = taggedNames.get(digits);
      if (fromTagged) { catalogedName = fromTagged; namedFromTagged++; }
    }

    // meta.json (no auto-classification — human review is the verification layer)
    const meta = {
      callId,
      digits,
      dialedNumber: r.number,
      catalogedName,
      sourceId: r.id || null,
      sourceOwners: r.owners || [],
      dialIntentTs: r.timestamp || null,
      durationSec: r.duration || null,
      status: r.status || null,
      reason: r.reason || null,
      endedReason: r.endedReason || null,
      artifacts: {
        audio: audioCopied ? audioBaseName : null,
        screenshot: ssCopied ? 'screenshot.png' : null,
        transcript: txCopied ? 'transcript.txt' : null,
      },
      quality,
      migration: { sourceFile: 'call-data/results.json', migratedAt: new Date().toISOString() },
    };
    fs.writeFileSync(path.join(callDir, 'meta.json'), JSON.stringify(meta, null, 2));

    migrated++;
  }

  // After all rows, write per-digits aggregate meta + references files. The
  // digits-level meta.json captures: most-recent verdict, status, name history.
  console.log('');
  console.log('Building per-digits aggregate meta.json + references.json...');
  const digitDirs = fs.readdirSync(TREE_ROOT).filter(d => /^\d{10}$/.test(d));
  for (const digits of digitDirs) {
    const digitDir = path.join(TREE_ROOT, digits);
    const runsDir = path.join(digitDir, 'runs');
    if (!fs.existsSync(runsDir)) continue;
    const runs = fs.readdirSync(runsDir).sort().reverse();
    const recentRun = runs[0];
    let recentMeta = null;
    if (recentRun) {
      try { recentMeta = JSON.parse(fs.readFileSync(path.join(runsDir, recentRun, 'meta.json'), 'utf8')); } catch (e) { /* */ }
    }
    const aggregateMeta = {
      digits,
      kind: digits.length === 10 ? 'phone' : 'shortcode',
      callsRecorded: runs.length,
      mostRecent: recentRun ? { run: recentRun, meta: recentMeta } : null,
      status: 'active', // refined by human review
      replacedBy: null,
      replaces: null,
    };
    fs.writeFileSync(path.join(digitDir, 'meta.json'), JSON.stringify(aggregateMeta, null, 2));
  }

  console.log('');
  console.log('Migration summary:');
  console.log('  Rows processed: ' + rows.length);
  console.log('  Migrated to tree: ' + migrated);
  console.log('  Skipped (already in tree): ' + skipped);
  console.log('  Bad digits (filtered): ' + badDigits);
  console.log('  Rows with no copyable artifacts: ' + missingArtifacts);
  console.log('  Names backfilled from tagged-phones.json: ' + namedFromTagged);
  console.log('  Unique digits-folders: ' + digitDirs.length);
  console.log('  Tree root: ' + TREE_ROOT);
}

main();
