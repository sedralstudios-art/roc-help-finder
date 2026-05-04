// scripts/build-rebuild-evidence.cjs
//
// Builds call-data/rebuild-evidence-by-program.md — staging doc for the
// manual phone-re-verification work after the 2026-05-03 strip.
//
// For each program in programs.js (now with empty ph after the strip):
//   • Pre-strip phone from git HEAD (what we had BEFORE the strip)
//   • Tree status: data/phones/<digits>/meta.json (if any)
//   • Verbatim transcript opening (if dialer-verified)
//   • Audio path for re-listening
//   • Official URL
//
// Sort by evidence strength: verified-by-dialer first (high-confidence,
// low-effort decisions), then has-URL-only, then no-evidence. The user reads
// each row, makes their own verification decision, types the number back
// into programs.js with a lastVerified date and source comment.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PROGRAMS = path.join(ROOT, 'src', 'data', 'programs.js');
const TREE = path.join(ROOT, 'data', 'phones');
const OUT = path.join(ROOT, 'call-data', 'rebuild-evidence-by-program.md');

function digitsOf(s) {
  const d = String(s || '').replace(/\D/g, '');
  return d.length === 11 && d.startsWith('1') ? d.substring(1) : d;
}

// Parse program rows out of a programs.js source string. Each row matches
// `{ id:"..." ... }`. Tolerant of nested braces (serviceArea objects etc.).
function parseProgramsSource(src) {
  const rows = [];
  const re = /\{\s*id:"([^"]*)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const startIdx = m.index;
    let depth = 0, i = startIdx;
    for (; i < src.length; i++) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') { depth--; if (depth === 0) { i++; break; } }
    }
    const blob = src.substring(startIdx, i);
    const get = (k) => (blob.match(new RegExp('\\b' + k + ':"((?:[^"\\\\]|\\\\.)*)"')) || [])[1] || null;
    rows.push({
      id: m[1],
      n: get('n'),
      ph: get('ph'),
      url: get('url'),
      ad: get('ad'),
      hr: get('hr'),
      c: get('c'),
      hidden: /\bhidden:\s*true\b/.test(blob),
      draft: /\bstatus:"draft"/.test(blob),
    });
  }
  return rows;
}

function main() {
  // Pre-strip programs.js from HEAD (the strip is uncommitted)
  const preStrip = execSync('git show HEAD:src/data/programs.js', { cwd: ROOT, encoding: 'utf8' });
  const preStripRows = parseProgramsSource(preStrip);
  const preStripByid = new Map(preStripRows.map(r => [r.id, r]));

  const currentSrc = fs.readFileSync(PROGRAMS, 'utf8');
  const currentRows = parseProgramsSource(currentSrc);

  // Tree lookup: digits → aggregate meta
  const treeByDigits = new Map();
  if (fs.existsSync(TREE)) {
    for (const d of fs.readdirSync(TREE)) {
      if (!/^\d{7,11}$/.test(d)) continue;
      const mp = path.join(TREE, d, 'meta.json');
      if (fs.existsSync(mp)) {
        try { treeByDigits.set(d, JSON.parse(fs.readFileSync(mp, 'utf8'))); } catch (e) {}
      }
    }
  }

  const items = [];
  for (const r of currentRows) {
    const pre = preStripByid.get(r.id);
    const oldPh = pre && pre.ph ? pre.ph : null;
    const oldDigits = oldPh ? digitsOf(oldPh) : null;
    const treeMeta = oldDigits ? treeByDigits.get(oldDigits) : null;
    let evidenceTier = 4; // 1=verified, 2=tree-has-data-but-not-verified, 3=url-only, 4=nothing
    if (treeMeta && treeMeta.status === 'verified-by-dialer') evidenceTier = 1;
    else if (treeMeta && treeMeta.callsRecorded > 0) evidenceTier = 2;
    else if (r.url) evidenceTier = 3;
    items.push({ ...r, oldPh, oldDigits, treeMeta, evidenceTier });
  }

  items.sort((a, b) => a.evidenceTier - b.evidenceTier || String(a.n || '').localeCompare(String(b.n || '')));

  let md = '# Phone re-verification work surface\n\n';
  md += `Generated ${new Date().toISOString()} after the 2026-05-03 strip-and-rebuild reset.\n\n`;
  md += `Total programs: ${items.length}. Currently ${items.filter(i => i.ph).length} have non-empty ph (crisis-tier preserved); ${items.filter(i => !i.ph).length} await manual re-verification.\n\n`;
  md += `Each section sorts programs by evidence tier:\n`;
  md += `- **Tier 1 (${items.filter(i => i.evidenceTier === 1).length})** — dialer transcript verified the org self-identified by name. Lowest-effort decisions: re-listen to the audio link if you want to double-check, then type the number back in.\n`;
  md += `- **Tier 2 (${items.filter(i => i.evidenceTier === 2).length})** — dialer captured audio but transcript didn't auto-confirm. Listen to the recording, decide.\n`;
  md += `- **Tier 3 (${items.filter(i => i.evidenceTier === 3).length})** — official URL exists; no dialer evidence. Verify on org's website.\n`;
  md += `- **Tier 4 (${items.filter(i => i.evidenceTier === 4).length})** — no evidence. Manual research required.\n\n`;
  md += `**Discipline:** every number you add back goes with \`lastVerified:"YYYY-MM-DD"\` and a comment naming the source. See \`feedback_phones_must_pass_human_verification.md\`.\n\n`;
  md += '---\n\n';

  const tierHeaders = {
    1: '## Tier 1 — dialer-verified evidence (re-listen, decide quickly)',
    2: '## Tier 2 — dialer-captured but unconfirmed (listen to audio)',
    3: '## Tier 3 — URL-only (verify on website)',
    4: '## Tier 4 — no evidence (full manual research)',
  };
  let currentTier = 0;
  for (const it of items) {
    if (it.evidenceTier !== currentTier) {
      currentTier = it.evidenceTier;
      md += '\n' + tierHeaders[currentTier] + '\n\n';
    }
    md += `### \`${it.id}\` — ${it.n || '(unnamed)'}\n`;
    if (it.hidden) md += '- ⚠️ Currently `hidden:true` (was hidden during triage today)\n';
    if (it.oldPh) md += `- **Pre-strip ph:** \`${it.oldPh}\`\n`;
    if (it.url) md += `- **URL:** ${it.url}\n`;
    if (it.ad) md += `- **Address:** ${it.ad}\n`;
    if (it.hr) md += `- **Hours:** ${it.hr}\n`;
    if (it.treeMeta) {
      md += `- **Tree status:** \`${it.treeMeta.status}\`, ${it.treeMeta.callsRecorded || 0} calls archived\n`;
      if (it.treeMeta.verifiedTranscriptOpening) {
        md += `- **Verified transcript opening:** \`${it.treeMeta.verifiedTranscriptOpening.slice(0, 200)}\`\n`;
        md += `- **Verified at:** ${it.treeMeta.verifiedAt}\n`;
        md += `- **Audio path:** \`data/phones/${it.oldDigits}/runs/${it.treeMeta.verifiedRun}/audio.wav\`\n`;
      } else if (it.treeMeta.mostRecent && it.treeMeta.mostRecent.run) {
        md += `- **Most-recent run:** \`data/phones/${it.oldDigits}/runs/${it.treeMeta.mostRecent.run}/\`\n`;
      }
    }
    md += '\n';
  }

  fs.writeFileSync(OUT, md);
  console.log('Wrote ' + OUT);
  console.log('');
  console.log('Tier counts:');
  for (const t of [1, 2, 3, 4]) {
    console.log('  Tier ' + t + ': ' + items.filter(i => i.evidenceTier === t).length);
  }
}

main();
