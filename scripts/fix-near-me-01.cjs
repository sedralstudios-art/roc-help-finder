#!/usr/bin/env node
/**
 * scripts/fix-near-me-01.cjs
 *
 * Two fixes:
 *   1. Delete dead FOOD_COORDS const (referenced nowhere except itself,
 *      and 3 of its 4 keys never matched real program ids).
 *   2. Rewrite filteredPrograms useMemo so the Near Me button actually
 *      sorts by distance from p.lat/p.lng. addressSuppressed programs
 *      sort to the END so they remain visible (reached by phone) but
 *      never lead the list with a fake or precise distance.
 *
 * Idempotent. Handles CRLF/LF line endings.
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'components', 'HelpFinder.jsx');

let src = fs.readFileSync(FILE, 'utf8');
const orig = src;

// Normalize line endings for matching, preserve original on write
const hadCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

// ── 1. Delete FOOD_COORDS const ──
const foodCoordsBlock = `// Programs with coordinates for Near Me (food-related)
const FOOD_COORDS = {
  "foodlink": [43.1566, -77.6088],
  "salvation": [43.1610, -77.6219],
  "food_stamps": null,
  "pantry": [43.1490, -77.6011],
};
`;

if (src.includes('const FOOD_COORDS')) {
  if (src.includes(foodCoordsBlock)) {
    src = src.replace(foodCoordsBlock, '');
    console.log('  deleted FOOD_COORDS const');
  } else {
    console.log('  ERROR: FOOD_COORDS exists but block does not match expected shape');
    console.log('  ABORTING — file unchanged');
    process.exit(1);
  }
} else {
  console.log('  FOOD_COORDS already removed, skipping');
}

// ── 2. Rewrite filteredPrograms useMemo end ──
const oldUseMemoEnd = `    // "none" and "crisis" = show everything (they qualify for all income-limited programs)

    return progs;
  }, [category, who, how]);`;

const newUseMemoEnd = `    // "none" and "crisis" = show everything (they qualify for all income-limited programs)

    // NEAR ME: when user enables location, sort by distance from user.
    // Programs with addressSuppressed:true (crisis nurseries, DV shelters)
    // sort to the END so they remain visible but never lead the list with
    // a fake distance — those resources are reached by phone, not by directions.
    if (nearMe && userCoords) {
      const [userLat, userLng] = userCoords;
      progs = progs
        .map((p) => {
          const usable = !p.addressSuppressed
            && typeof p.lat === "number"
            && typeof p.lng === "number";
          return {
            prog: p,
            dist: usable ? distanceMiles(userLat, userLng, p.lat, p.lng) : Infinity,
          };
        })
        .sort((a, b) => a.dist - b.dist)
        .map((x) => x.prog);
    }

    return progs;
  }, [category, who, how, nearMe, userCoords]);`;

if (src.includes('NEAR ME: when user enables location')) {
  console.log('  Near Me sort already present, skipping');
} else if (src.includes(oldUseMemoEnd)) {
  src = src.replace(oldUseMemoEnd, newUseMemoEnd);
  console.log('  added Near Me distance sort to filteredPrograms useMemo');
} else {
  console.log('  ERROR: filteredPrograms useMemo end marker not found');
  console.log('  ABORTING — file unchanged');
  process.exit(1);
}

// Restore original line endings
if (hadCRLF) src = src.replace(/\n/g, '\r\n');

if (src === orig) {
  console.log('No changes.');
} else {
  fs.writeFileSync(FILE, src);
  console.log(`Done. ${orig.length} → ${src.length} bytes`);
}

console.log('');
console.log('Spot check:');
console.log('  grep -c "FOOD_COORDS" src/components/HelpFinder.jsx       # should be 0');
console.log('  grep -n "NEAR ME: when user" src/components/HelpFinder.jsx # should show 1 line');
console.log('  grep -c "addressSuppressed" src/components/HelpFinder.jsx  # should be >= 4');
