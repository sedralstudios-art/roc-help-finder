// scripts/verify-tree-by-dialer.cjs
//
// Confirm-only verifier. Walks data/phones/<digits>/, finds the newest May+
// (.wav era) run for each digit, and stamps the aggregate meta.json with
// status:"verified-by-dialer" if the transcript clearly contains the
// catalogued name. Otherwise leaves the folder alone.
//
// HARD RULES:
//   - .amr-era runs are NEVER used as confirmation evidence (Apr 17 dialer
//     had file-misalignment bugs; see project_apr17_dialer_fail_2026_05_03.md).
//   - Source files (programs.js, entries) are NEVER edited. Verification
//     stamps stay in the tree's meta.json only — the website can read tree
//     status to show a "verified by call" badge separately.
//   - Conservative match bar: at least 2 significant catalogued tokens
//     appear in transcript opening, AND the most-distinctive token (longest)
//     is present.
//   - Mismatch is NOT auto-flagged. If transcript ≠ catalogued, the
//     verifier silently does nothing. Drift detection is a separate, human-
//     reviewed concern.
//
// Usage:
//   node scripts/verify-tree-by-dialer.cjs              (write)
//   node scripts/verify-tree-by-dialer.cjs --dry-run   (preview, no writes)

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TREE_ROOT = path.join(ROOT, 'data', 'phones');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');

// Words that don't carry org-identifying signal — drop before token matching.
const STOPWORDS = new Set([
  'the','a','an','of','for','and','at','to','in','on','with','by','or','are',
  'is','this','that','our','your','their','we','you','their','i','me',
  'inc','llc','llp','corp','corporation','company','co','ltd',
  'rochester','monroe','county','york','ny','nys','new','western','wny',
  'office','services','service','department','dept','program','programs',
  'center','centre','help','helping','helps','assistance','support',
  'organization','agency','foundation','association','society','council',
  'thank','calling','reached','please','hold','have','our',
  'hours','open','closed','main','line','representative',
  'directory','available','now','currently',
  // common bracketed glosses our catalogue uses
  'free','low','income','low-income','crisis','hotline','helpline',
]);

function tokenize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1 && !STOPWORDS.has(t));
}

// Conservative match: significant catalogued tokens appear in transcript.
// Returns { matched: bool, hits: [tokens-found], misses: [tokens-missing] }.
function evaluateMatch(catalogedName, transcript) {
  if (!catalogedName || !transcript) return { matched: false, reason: 'missing input' };
  const txLower = String(transcript).toLowerCase();
  const catalogTokens = tokenize(catalogedName);
  if (catalogTokens.length === 0) return { matched: false, reason: 'no significant catalogued tokens' };
  const hits = [], misses = [];
  for (const t of catalogTokens) {
    if (txLower.includes(t)) hits.push(t);
    else misses.push(t);
  }
  // Distinctive token = longest catalogued token (e.g., "penfield" beats "rec")
  const distinctive = [...catalogTokens].sort((a, b) => b.length - a.length)[0];
  const distinctiveHit = txLower.includes(distinctive);
  // Bar: at least 2 hits AND the distinctive token must appear
  // (single-token catalogues like "Goodwill" qualify on distinctive-only)
  let matched = false;
  if (catalogTokens.length === 1) {
    matched = distinctiveHit;
  } else {
    matched = distinctiveHit && hits.length >= 2;
  }
  const ratio = hits.length / catalogTokens.length;
  return {
    matched,
    hits, misses,
    distinctive, distinctiveHit,
    ratio,
    reason: matched ? `${hits.length}/${catalogTokens.length} tokens hit; distinctive '${distinctive}' present` : `${hits.length}/${catalogTokens.length} tokens hit; distinctive '${distinctive}' present=${distinctiveHit}`,
  };
}

function loadJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return null; }
}

function main() {
  if (!fs.existsSync(TREE_ROOT)) {
    console.error('Tree not found at ' + TREE_ROOT);
    process.exit(1);
  }
  let totalDigits = 0, evaluated = 0, confirmed = 0, unconfirmedNoMatch = 0,
      noWavRun = 0, noTranscript = 0, alreadyVerified = 0;

  for (const digits of fs.readdirSync(TREE_ROOT)) {
    if (!/^\d{7,11}$/.test(digits)) continue;
    totalDigits++;
    const digitDir = path.join(TREE_ROOT, digits);
    const aggregatePath = path.join(digitDir, 'meta.json');
    const aggregate = loadJson(aggregatePath);
    if (!aggregate) continue;

    const runsDir = path.join(digitDir, 'runs');
    if (!fs.existsSync(runsDir)) { noWavRun++; continue; }

    // Find newest .wav-era run with non-empty transcript
    const runs = fs.readdirSync(runsDir).sort().reverse();
    let chosen = null, chosenTranscript = null, chosenMeta = null;
    for (const run of runs) {
      const runDir = path.join(runsDir, run);
      const callMeta = loadJson(path.join(runDir, 'meta.json'));
      if (!callMeta) continue;
      // Skip Apr-17-era .amr (untrusted)
      if (callMeta.quality === 'untrusted') continue;
      const audioName = (callMeta.artifacts && callMeta.artifacts.audio) || '';
      if (audioName.endsWith('.amr')) continue;
      // Need a transcript
      const txPath = path.join(runDir, 'transcript.txt');
      if (!fs.existsSync(txPath)) continue;
      const tx = fs.readFileSync(txPath, 'utf8').trim();
      if (!tx || tx.length < 20) continue;
      chosen = run;
      chosenMeta = callMeta;
      chosenTranscript = tx;
      break;
    }
    if (!chosen) { noWavRun++; continue; }

    // Catalogued name: prefer aggregate.primaryName, fall back to call meta
    const catalogedName = aggregate.primaryName || (chosenMeta && chosenMeta.catalogedName);
    if (!catalogedName) { noTranscript++; continue; }

    evaluated++;
    const result = evaluateMatch(catalogedName, chosenTranscript);

    if (result.matched) {
      // Stamp aggregate meta.json. Idempotent — re-stamping with newer evidence is fine.
      const newAggregate = { ...aggregate };
      newAggregate.status = 'verified-by-dialer';
      newAggregate.verifiedAt = new Date().toISOString();
      newAggregate.verifiedRun = chosen;
      newAggregate.verifiedTranscriptOpening = chosenTranscript.slice(0, 200).replace(/[\r\n]+/g, ' ');
      newAggregate.verifiedMatchTokens = result.hits;
      newAggregate.verifiedRatio = result.ratio;
      const wasVerified = aggregate.status === 'verified-by-dialer';
      if (wasVerified) alreadyVerified++;
      if (!DRY_RUN) {
        fs.writeFileSync(aggregatePath, JSON.stringify(newAggregate, null, 2));
      }
      confirmed++;
    } else {
      unconfirmedNoMatch++;
    }
  }

  console.log('');
  console.log('Confirm-only verifier' + (DRY_RUN ? ' (DRY RUN)' : '') + ':');
  console.log('  Total digit folders:           ' + totalDigits);
  console.log('  Folders with no .wav run yet:  ' + noWavRun);
  console.log('  Folders with .wav, evaluated:  ' + evaluated);
  console.log('  CONFIRMED (verified-by-dialer): ' + confirmed);
  console.log('    of which already-verified before this run: ' + alreadyVerified);
  console.log('  Unconfirmed (no token match):  ' + unconfirmedNoMatch);
  console.log('  Skipped (no catalogued name):  ' + noTranscript);
  console.log('');
  console.log('Confirmation does NOT edit source files. To surface on the website,');
  console.log('a separate render-time read of tree meta.json is required.');
}

main();
