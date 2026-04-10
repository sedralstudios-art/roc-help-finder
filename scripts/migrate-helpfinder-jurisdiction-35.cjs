/**
 * migrate-helpfinder-jurisdiction-35.cjs
 *
 * Wires jurisdiction stack into HelpFinder:
 * 1. RocHelp + RocHelpInner accept jurisdictions prop
 * 2. useEffect auto-sets userTown from jurisdictions[0]
 * 3. applyTownFilter fixed: programs without town field always pass through
 *
 * Run: node scripts/migrate-helpfinder-jurisdiction-35.cjs
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
let changes = 0;

// ─── 1. PATCH HelpFinder.jsx ─────────────────────────────────────────

const hfPath = path.join(SRC, 'components', 'HelpFinder.jsx');
let hf = fs.readFileSync(hfPath, 'utf8');

// 1a. Update RocHelpInner signature to accept jurisdictions
const oldInnerSig = 'function RocHelpInner({ onExit, city = "your area" })';
const newInnerSig = 'function RocHelpInner({ onExit, city = "your area", jurisdictions = [] })';

if (hf.includes(oldInnerSig)) {
  hf = hf.replace(oldInnerSig, newInnerSig);
  console.log('✓ HelpFinder — RocHelpInner accepts jurisdictions prop');
  changes++;
}

// 1b. Update RocHelp (outer) signature and pass-through
const oldOuterSig = 'export default function RocHelp({ onExit, city = "your area" })';
const newOuterSig = 'export default function RocHelp({ onExit, city = "your area", jurisdictions = [] })';

if (hf.includes(oldOuterSig)) {
  hf = hf.replace(oldOuterSig, newOuterSig);
  console.log('✓ HelpFinder — RocHelp accepts jurisdictions prop');
  changes++;
}

const oldPassthrough = '<RocHelpInner onExit={onExit} city={city} />';
const newPassthrough = '<RocHelpInner onExit={onExit} city={city} jurisdictions={jurisdictions} />';

if (hf.includes(oldPassthrough)) {
  hf = hf.replace(oldPassthrough, newPassthrough);
  console.log('✓ HelpFinder — RocHelp passes jurisdictions to RocHelpInner');
  changes++;
}

// 1c. Add useEffect to auto-set userTown from jurisdictions
// Insert after the userTown useState line
const userTownLine = '  const [userTown, setUserTown] = useState(null);  // null = no town filter; set by future town picker / zip lookup / URL param';
const userTownWithEffect = `  const [userTown, setUserTown] = useState(null);  // null = no town filter; auto-set from jurisdiction stack

  // Auto-set userTown from jurisdiction stack (most specific match first)
  useEffect(() => {
    if (jurisdictions.length > 0 && !userTown) {
      const slug = jurisdictions[0].name.toLowerCase().replace(/\\s+/g, '-');
      setUserTown(slug);
    }
  }, [jurisdictions]);`;

if (hf.includes(userTownLine)) {
  hf = hf.replace(userTownLine, userTownWithEffect);
  console.log('✓ HelpFinder — added useEffect to auto-set userTown from jurisdictions');
  changes++;
}

fs.writeFileSync(hfPath, hf);

// ─── 2. PATCH HelpFinderQuestions.js ─────────────────────────────────

const hqPath = path.join(SRC, 'components', 'HelpFinderQuestions.js');
let hq = fs.readFileSync(hqPath, 'utf8');

// Fix applyTownFilter: programs without town field should always pass through
const oldFilter = `export function applyTownFilter(programs, userTown) {
  if (!userTown) return programs;
  return programs.filter(p => p.town === userTown || (p.serves && p.serves.includes(userTown)));
}`;

const newFilter = `export function applyTownFilter(programs, userTown) {
  if (!userTown) return programs;
  return programs.filter(p => !p.town || p.town === userTown || (p.serves && p.serves.includes(userTown)));
}`;

if (hq.includes(oldFilter)) {
  hq = hq.replace(oldFilter, newFilter);
  console.log('✓ HelpFinderQuestions — applyTownFilter: untagged programs always pass through');
  changes++;
}

fs.writeFileSync(hqPath, hq);

// ─── 3. VERIFY ───────────────────────────────────────────────────────

const hfFinal = fs.readFileSync(hfPath, 'utf8');
const hqFinal = fs.readFileSync(hqPath, 'utf8');

const checks = [
  ['RocHelpInner accepts jurisdictions', hfFinal.includes('jurisdictions = []') && hfFinal.includes('function RocHelpInner')],
  ['RocHelp accepts jurisdictions', hfFinal.includes('function RocHelp({ onExit, city = "your area", jurisdictions = [] })')],
  ['RocHelp passes jurisdictions through', hfFinal.includes('jurisdictions={jurisdictions}')],
  ['useEffect auto-sets userTown', hfFinal.includes('setUserTown(slug)')],
  ['Only sets if userTown is null', hfFinal.includes('!userTown')],
  ['applyTownFilter has !p.town guard', hqFinal.includes('!p.town ||')],
];

console.log('\n── Verification ──');
let allGood = true;
for (const [label, ok] of checks) {
  console.log(ok ? '✓' : '✗', label);
  if (!ok) allGood = false;
}

console.log('\n' + changes + ' changes applied.');
if (allGood) {
  console.log('All checks passed. Ready to commit.');
} else {
  console.log('SOME CHECKS FAILED — review before committing.');
}
