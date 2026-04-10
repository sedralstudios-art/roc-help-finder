#!/usr/bin/env node
// migrate-trades-crosslinks-32.cjs
// Patches relatedIds on all 29 trades entries to cross-link
// parent towns with their villages. Every town/village pair
// should reference each other + the state floor.

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

// Define the cross-link map: town → villages inside it
const STACKS = {
  'roofing-residential-ny-mon-perinton-town': [
    'roofing-residential-ny-mon-fairport-village'
  ],
  'roofing-residential-ny-mon-ogden-town': [
    'roofing-residential-ny-mon-spencerport-village'
  ],
  'roofing-residential-ny-mon-parma-town': [
    'roofing-residential-ny-mon-hilton-village'
  ],
  'roofing-residential-ny-mon-riga-town': [
    'roofing-residential-ny-mon-churchville-village'
  ],
  'roofing-residential-ny-mon-mendon-town': [
    'roofing-residential-ny-mon-honeoye-falls-village'
  ],
  'roofing-residential-ny-mon-wheatland-town': [
    'roofing-residential-ny-mon-scottsville-village'
  ],
  // Brockport straddles two towns
  'roofing-residential-ny-mon-sweden-town': [
    'roofing-residential-ny-mon-brockport-village'
  ],
  'roofing-residential-ny-mon-clarkson-town': [
    'roofing-residential-ny-mon-brockport-village'
  ],
};

const STATE_FLOOR = 'roofing-residential-ny';

// Build the full relatedIds for each entry
function buildRelatedIds(entryId) {
  const related = new Set();
  related.add(STATE_FLOOR);

  // If this entry is a town, add its villages
  if (STACKS[entryId]) {
    for (const v of STACKS[entryId]) related.add(v);
  }

  // If this entry is a village, add its parent town(s)
  for (const [town, villages] of Object.entries(STACKS)) {
    if (villages.includes(entryId)) {
      related.add(town);
      // Also add sibling villages in the same town
      for (const v of villages) {
        if (v !== entryId) related.add(v);
      }
    }
  }

  related.delete(entryId); // don't self-reference
  return [...related];
}

// Find and patch each entry file
let patched = 0;
let skipped = 0;

const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.startsWith('LGLW6-D_roofing-'));

for (const file of files) {
  const filePath = path.join(ENTRIES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract the entry id
  const idMatch = content.match(/id:\s*"([^"]+)"/);
  if (!idMatch) {
    console.log(`⚠ Could not find id in ${file}, skipping`);
    skipped++;
    continue;
  }

  const entryId = idMatch[1];
  const newRelated = buildRelatedIds(entryId);

  // Check if relatedIds needs updating
  const currentRelatedMatch = content.match(/relatedIds:\s*\[([^\]]*)\]/);
  if (!currentRelatedMatch) {
    console.log(`⚠ Could not find relatedIds in ${file}, skipping`);
    skipped++;
    continue;
  }

  const newRelatedStr = newRelated.map(id => `"${id}"`).join(', ');
  const oldBlock = currentRelatedMatch[0];
  const newBlock = `relatedIds: [${newRelatedStr}]`;

  if (oldBlock === newBlock) {
    skipped++;
    continue;
  }

  content = content.replace(oldBlock, newBlock);
  fs.writeFileSync(filePath, content, 'utf8');
  patched++;
  console.log(`✓ Patched ${entryId} → [${newRelated.join(', ')}]`);
}

console.log(`\nDone: ${patched} patched, ${skipped} unchanged.`);
console.log(`Cross-links: town↔village pairs now reference each other.`);
console.log(`All entries still reference the state floor.`);
