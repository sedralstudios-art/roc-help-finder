// One-shot: stamp hidden:true on DV + immigration programs.
// Reason: sensitive content went live without per-batch fact-check verification.
// Reversal: remove the hidden:true field from any restored program after verification.
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'data', 'programs.js');

const HIDE_IDS = new Set([
  // domesticSvc (9)
  'willow', 'biv', 'restore', 'cps', 'nysdvh', 'ndvh', 'ncah', 'rainn', 'saathi',
  // parentalProtection (16)
  'familycourt', 'rochcitycourt', 'daunit', 'selfhelpcourt', 'familycourthelp',
  'supervvisit', 'mclerk', 'townhall', 'mclegislature', 'willowsafety',
  'lawnyparent', 'laparent', 'vlspfamily', 'cpsparent', 'opdvinfo', 'nychncustoday',
  // immigration in c:"documents" (3)
  'uscis', 'newhopeilm', 'cfcimmig',
  // legalImmigration (5)
  'cfcimmiglaw', 'newhopeilslaw', 'laimmig', 'nycairr', 'iactcenter'
]);

const lines = fs.readFileSync(FILE, 'utf8').split('\n');
let stamped = 0;
const found = new Set();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idMatch = line.match(/id\s*:\s*["']([^"']+)["']/);
  if (!idMatch) continue;
  const id = idMatch[1];
  if (!HIDE_IDS.has(id)) continue;
  found.add(id);
  if (/hidden\s*:\s*true/.test(line)) continue; // already hidden
  // Insert ", hidden:true" before the final " }" or "}"
  const updated = line.replace(/\}\s*,?\s*$/, (m) => {
    const trailingComma = m.trim().endsWith(',') ? ',' : '';
    return `, hidden:true }${trailingComma}`;
  });
  if (updated !== line) {
    lines[i] = updated;
    stamped++;
  }
}

const missing = [...HIDE_IDS].filter(id => !found.has(id));
if (missing.length) {
  console.error('MISSING IDs (not found in programs.js):');
  missing.forEach(id => console.error('  -', id));
  process.exit(1);
}

fs.writeFileSync(FILE, lines.join('\n'));
console.log(`Stamped hidden:true on ${stamped} programs (of ${HIDE_IDS.size} targeted).`);
