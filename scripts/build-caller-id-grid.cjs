// scripts/build-caller-id-grid.cjs
// Grid layout for visual review of all caller-ID screenshots.
// Cells: thumbnail + catalogued name + dialed number + click-to-approve.
// State persists to localStorage; "Download approved.json" exports.

const fs = require('fs');
const path = require('path');

const ITEMS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'call-data', 'caller-id-review-items.json'), 'utf8'));
const OUT = path.join(__dirname, '..', 'call-data', 'caller-id-grid.html');

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function fmtNum(d) {
  if (d.length === 10) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  return d;
}

ITEMS.sort((a, b) => String(a.catalogued).localeCompare(String(b.catalogued)));

const cells = ITEMS.map((it) => `
  <div class="cell" data-digits="${esc(it.digits)}" data-base="${esc(it.base)}" tabindex="0">
    <div class="check"><span class="mark">✓</span></div>
    <img src="caller-id-cropped/${esc(it.file)}" alt="caller-id" loading="lazy" />
    <div class="name">${esc(it.catalogued)}</div>
    <div class="num">${esc(fmtNum(it.digits))}</div>
  </div>`).join('');

const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Caller-ID grid (${ITEMS.length})</title>
<style>
  body { font: 13px/1.4 system-ui, sans-serif; margin: 16px; background: #f4f4f4; }
  h1 { font-size: 16px; margin: 0 0 12px; }
  .controls {
    position: sticky; top: 0; background: #fff; padding: 10px 14px;
    border: 1px solid #ddd; border-radius: 8px;
    margin-bottom: 14px; z-index: 100;
    display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
  }
  .controls button {
    padding: 6px 12px; font-size: 13px; cursor: pointer;
    border: 1px solid #999; background: #fafafa; border-radius: 5px;
  }
  .controls button:hover { background: #eaeaea; }
  .controls .stats { font-weight: 600; margin-left: auto; }
  .hint { font-size: 12px; color: #666; }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 10px;
  }
  .cell {
    background: #fff; border: 2px solid #ddd; border-radius: 8px;
    padding: 8px; cursor: pointer; position: relative;
    transition: border-color 0.1s, background 0.1s;
  }
  .cell:hover { border-color: #888; }
  .cell:focus { outline: 2px solid #1565c0; outline-offset: 2px; }
  .cell.approved { border-color: #2e7d32; background: #f1f8e9; }
  .cell .check {
    position: absolute; top: 6px; right: 6px;
    width: 26px; height: 26px; border-radius: 50%;
    background: #fff; border: 2px solid #999;
    display: flex; align-items: center; justify-content: center;
  }
  .cell.approved .check { background: #2e7d32; border-color: #2e7d32; }
  .cell .check .mark { color: #fff; font-size: 16px; line-height: 1; opacity: 0; font-weight: 700; }
  .cell.approved .check .mark { opacity: 1; }
  .cell img {
    display: block; width: 100%; height: auto;
    border: 1px solid #ddd; border-radius: 4px; margin-bottom: 6px;
  }
  .name { font-weight: 600; font-size: 13px; color: #222; line-height: 1.3; }
  .num { font-size: 12px; color: #666; margin-top: 2px; font-family: ui-monospace, monospace; }
</style></head>
<body>
<h1>Caller-ID grid — ${ITEMS.length} May .wav screenshots</h1>
<div class="controls">
  <button id="btn-approve-all">Approve all visible</button>
  <button id="btn-clear">Clear all</button>
  <button id="btn-export">Download approved.json</button>
  <span class="hint">Click any cell to approve / unapprove. State persists across reloads.</span>
  <span class="stats" id="stats">0 of ${ITEMS.length} approved</span>
</div>
<div class="grid" id="grid">${cells}</div>
<script>
const KEY = 'helpfinder-callerid-approved-v2';
const stored = JSON.parse(localStorage.getItem(KEY) || '{}');

function refresh() {
  let n = 0;
  for (const cell of document.querySelectorAll('.cell')) {
    const d = cell.dataset.digits;
    const isOn = !!stored[d];
    cell.classList.toggle('approved', isOn);
    if (isOn) n++;
  }
  document.getElementById('stats').textContent = n + ' of ${ITEMS.length} approved';
}
refresh();

function toggle(cell) {
  const d = cell.dataset.digits;
  if (stored[d]) delete stored[d];
  else stored[d] = { base: cell.dataset.base, ts: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(stored));
  refresh();
}

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => toggle(cell));
  cell.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(cell); }
  });
});

document.getElementById('btn-approve-all').addEventListener('click', () => {
  for (const cell of document.querySelectorAll('.cell')) {
    const d = cell.dataset.digits;
    stored[d] = { base: cell.dataset.base, ts: new Date().toISOString() };
  }
  localStorage.setItem(KEY, JSON.stringify(stored));
  refresh();
});

document.getElementById('btn-clear').addEventListener('click', () => {
  if (!confirm('Clear all approvals?')) return;
  for (const k of Object.keys(stored)) delete stored[k];
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

fs.writeFileSync(OUT, html);
console.log(`Wrote ${OUT}`);
console.log(`Open: file:///${OUT.replace(/\\/g,'/')}`);
