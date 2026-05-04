// scripts/build-caller-id-review.cjs
//
// Generates a static HTML page (call-data/caller-id-review.html) that lays
// out every cropped caller-ID image next to:
//   • the catalogued name of the org we DIALED (from results.json)
//   • the transcript opening (so we know what the org actually said)
//   • the digits
//
// The reviewer scans for mismatches between catalogued name and visible image
// content (the contact-override case — operator's phone showed a different
// name than the actual answering org). Per-row approve/skip with localStorage
// persistence + JSON export of approved digits.
//
// Output of the review process: call-data/caller-id-approved.json (manual
// export from the HTML page). That JSON drives the publish step.
//
// Filter: only includes screenshots whose paired call was a SUCCESS in May
// (.wav recording). Apr 17 .amr screenshots are excluded entirely.

const fs = require('fs');
const path = require('path');

const CROPPED_DIR = path.join(__dirname, '..', 'call-data', 'caller-id-cropped');
const RESULTS = path.join(__dirname, '..', 'call-data', 'results.json');
const OUT_HTML = path.join(__dirname, '..', 'call-data', 'caller-id-review.html');

function dnorm(s) {
  const d = String(s || '').replace(/\D/g, '');
  return d.length === 11 && d.startsWith('1') ? d.substring(1) : d;
}

function main() {
  const results = JSON.parse(fs.readFileSync(RESULTS, 'utf8'));
  const cropped = fs.readdirSync(CROPPED_DIR).filter(f => f.toLowerCase().endsWith('.jpg'));
  console.log(`Found ${cropped.length} cropped images`);

  // Index results by 10-digit phone (multiple rows can share digits across
  // runs). Screenshot filenames embed digits as the trailing _NNNNNNNNNN.png
  // segment; we match cropped image to results by extracting those digits.
  // .wav recordings only — Apr 17 .amr excluded by spec.
  const byDigits = new Map();
  for (const r of results) {
    if (!r.recording) continue;
    if (!String(r.recording).toLowerCase().endsWith('.wav')) continue;
    const d = dnorm(r.number);
    if (d.length !== 10) continue;
    if (!byDigits.has(d)) byDigits.set(d, []);
    byDigits.get(d).push(r);
  }

  const items = [];
  let skippedNoMatch = 0, skippedNoSuccess = 0;
  for (const f of cropped) {
    // Pull trailing digits from the basename
    const m = f.match(/_(\d{10})\.jpg$/i);
    if (!m) { skippedNoMatch++; continue; }
    const digits = m[1];
    const rows = byDigits.get(digits) || [];
    if (rows.length === 0) { skippedNoMatch++; continue; }
    // Prefer a successful row; fall back to most recent if none successful
    rows.sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)));
    const r = rows.find(x => x.status === 'success') || rows[0];
    if (r.status !== 'success') { skippedNoSuccess++; continue; }

    const transcript = (r.transcript || '').slice(0, 200).replace(/[\r\n]+/g, ' ');
    const owners = r.owners || [];

    items.push({
      file: f,
      base: f.replace(/\.jpg$/i, ''),
      digits,
      catalogued: r.name || '(unknown)',
      number: r.number,
      timestamp: r.timestamp,
      transcript,
      owners,
    });
  }

  console.log(`Skipped (no May result for digits): ${skippedNoMatch}`);
  console.log(`Skipped (May result but not success): ${skippedNoSuccess}`);

  console.log(`After filter (May .wav success only): ${items.length} reviewable items`);

  // Sort by catalogued name for easier scanning
  items.sort((a, b) => String(a.catalogued).localeCompare(String(b.catalogued)));

  // Build HTML. Each row: thumbnail + label + checkbox. localStorage persists
  // the approved-set across reloads. A "Download approved.json" button exports.
  const rows = items.map((it, i) => `
    <div class="row" data-digits="${it.digits}" data-base="${escapeHtml(it.base)}">
      <input type="checkbox" class="approve" id="cb${i}" />
      <label for="cb${i}" class="thumb"><img src="caller-id-cropped/${escapeHtml(it.file)}" alt="caller-id"/></label>
      <div class="meta">
        <div class="name">${escapeHtml(it.catalogued)}</div>
        <div class="num">${escapeHtml(it.number)}  ·  digits ${escapeHtml(it.digits)}  ·  ${escapeHtml(it.timestamp.slice(0,10))}</div>
        <div class="tx">${escapeHtml(it.transcript)}</div>
      </div>
    </div>`).join('');

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Caller-ID review (${items.length} items)</title>
<style>
  body { font: 14px/1.4 system-ui, sans-serif; margin: 20px; background: #f4f4f4; }
  h1 { font-size: 18px; }
  .controls { position: sticky; top: 0; background: #fff; padding: 12px; border: 1px solid #ddd; margin-bottom: 16px; z-index: 100; }
  .controls button { margin-right: 8px; padding: 6px 12px; cursor: pointer; }
  .stats { font-weight: bold; }
  .row { display: grid; grid-template-columns: 24px 480px 1fr; gap: 12px; padding: 8px; background: #fff; border: 1px solid #ddd; margin-bottom: 6px; align-items: center; }
  .row.approved { background: #e6ffe6; }
  .thumb img { display: block; width: 480px; height: auto; border: 1px solid #ccc; }
  .meta .name { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
  .meta .num { color: #666; margin-bottom: 8px; }
  .meta .tx { color: #444; font-size: 12px; }
  .approve { width: 18px; height: 18px; cursor: pointer; }
</style></head>
<body>
<h1>Caller-ID review — ${items.length} screenshots awaiting approval</h1>
<div class="controls">
  Check the box for screenshots whose visible content matches the catalogued org name. Skip any where the phone is showing a different name (contact-override) or the image is unreadable.
  <br><br>
  <button id="btn-approve-all">Approve all visible</button>
  <button id="btn-clear">Clear all</button>
  <button id="btn-export">Download approved.json</button>
  <span class="stats" id="stats">0 of ${items.length} approved</span>
</div>
<div id="rows">${rows}</div>
<script>
const KEY = 'helpfinder-callerid-approved';
const stored = JSON.parse(localStorage.getItem(KEY) || '{}');

function refresh() {
  let n = 0;
  for (const row of document.querySelectorAll('.row')) {
    const d = row.dataset.digits;
    const cb = row.querySelector('.approve');
    cb.checked = !!stored[d];
    row.classList.toggle('approved', !!stored[d]);
    if (stored[d]) n++;
  }
  document.getElementById('stats').textContent = n + ' of ${items.length} approved';
}
refresh();

document.querySelectorAll('.approve').forEach(cb => {
  cb.addEventListener('change', e => {
    const row = cb.closest('.row');
    const d = row.dataset.digits;
    if (cb.checked) stored[d] = { base: row.dataset.base, ts: new Date().toISOString() };
    else delete stored[d];
    localStorage.setItem(KEY, JSON.stringify(stored));
    refresh();
  });
});

document.getElementById('btn-approve-all').addEventListener('click', () => {
  for (const row of document.querySelectorAll('.row')) {
    const d = row.dataset.digits;
    stored[d] = { base: row.dataset.base, ts: new Date().toISOString() };
  }
  localStorage.setItem(KEY, JSON.stringify(stored));
  refresh();
});

document.getElementById('btn-clear').addEventListener('click', () => {
  Object.keys(stored).forEach(k => delete stored[k]);
  localStorage.setItem(KEY, JSON.stringify(stored));
  refresh();
});

document.getElementById('btn-export').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(stored, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'caller-id-approved.json';
  a.click();
  URL.revokeObjectURL(url);
});
</script>
</body></html>`;

  fs.writeFileSync(OUT_HTML, html);
  console.log(`Wrote ${OUT_HTML}`);
  console.log(`Open in browser: file:///${OUT_HTML.replace(/\\/g,'/')}`);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

main();
