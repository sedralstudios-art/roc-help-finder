#!/usr/bin/env node
/**
 * migrate-town-selector-42.cjs
 * ============================
 * Adds a manual town selector dropdown to HelpFinder so users can:
 *   - See their auto-detected town (from geo)
 *   - Change it manually if geo is wrong or unavailable
 *   - Browse other towns' local programs
 *
 * The dropdown uses the existing MONROE_TOWNS list and setUserTown.
 * It appears below the logo in the HelpFinder header.
 *
 * Also fixes /help href crawlability (nofollow).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HF = path.join(ROOT, 'src/components/HelpFinder.jsx');
const LP = path.join(ROOT, 'src/components/LandingPage.jsx');
let hf = fs.readFileSync(HF, 'utf8');
let lp = fs.readFileSync(LP, 'utf8');
let failures = 0;
let successes = 0;

function replace(content, oldStr, newStr, label) {
  if (!content.includes(oldStr)) {
    console.error("ABORT: " + label);
    console.error("  Expected: " + JSON.stringify(oldStr).slice(0, 140));
    failures++;
    return content;
  }
  console.log("OK: " + label);
  successes++;
  return content.replace(oldStr, newStr);
}

// ═══════════════════════════════════════════════
// 1. Add town selector helper function + slug-to-display map
// ═══════════════════════════════════════════════

// Add a display name map right after MONROE_TOWNS
hf = replace(hf,
  `const MONROE_TOWNS = [
  "brighton", "brockport", "chili", "churchville", "clarkson",
  "east-rochester", "fairport", "gates", "greece", "hamlin",
  "henrietta", "hilton", "honeoye-falls", "irondequoit", "mendon",
  "ogden", "parma", "penfield", "perinton", "pittsford",
  "riga", "rochester", "rush", "scottsville", "spencerport",
  "sweden", "webster", "wheatland",
];`,
  `const MONROE_TOWNS = [
  "brighton", "brockport", "chili", "churchville", "clarkson",
  "east-rochester", "fairport", "gates", "greece", "hamlin",
  "henrietta", "hilton", "honeoye-falls", "irondequoit", "mendon",
  "ogden", "parma", "penfield", "perinton", "pittsford",
  "riga", "rochester", "rush", "scottsville", "spencerport",
  "sweden", "webster", "wheatland",
];
// Display labels for the town selector dropdown
const TOWN_LABELS = {
  "brighton":"Town of Brighton", "brockport":"Village of Brockport",
  "chili":"Town of Chili", "churchville":"Village of Churchville",
  "clarkson":"Town of Clarkson", "east-rochester":"Village of East Rochester",
  "fairport":"Village of Fairport", "gates":"Town of Gates",
  "greece":"Town of Greece", "hamlin":"Town of Hamlin",
  "henrietta":"Town of Henrietta", "hilton":"Village of Hilton",
  "honeoye-falls":"Village of Honeoye Falls", "irondequoit":"Town of Irondequoit",
  "mendon":"Town of Mendon", "ogden":"Town of Ogden",
  "parma":"Town of Parma", "penfield":"Town of Penfield",
  "perinton":"Town of Perinton", "pittsford":"Town of Pittsford",
  "riga":"Town of Riga", "rochester":"City of Rochester",
  "rush":"Town of Rush", "scottsville":"Village of Scottsville",
  "spencerport":"Village of Spencerport", "sweden":"Town of Sweden",
  "webster":"Town of Webster", "wheatland":"Town of Wheatland",
};`,
  'Add TOWN_LABELS map'
);

// ═══════════════════════════════════════════════
// 2. Replace the city display in the header with a dropdown
// ═══════════════════════════════════════════════

hf = replace(hf,
  `              <div style={{ fontSize: 11, color: "#767676", marginTop: 1 }}>
                {city}
              </div>`,
  `              <div style={{ fontSize: 11, color: "#767676", marginTop: 1 }}>
                {city}
                {userTown && <span style={{ marginLeft: 4 }}>·</span>}
                <select
                  value={userTown || ""}
                  onChange={(e) => setUserTown(e.target.value || null)}
                  style={{
                    background: "none", border: "none", color: "#2e7d32",
                    fontSize: 11, fontWeight: 600, cursor: "pointer",
                    fontFamily: "inherit", padding: 0, marginLeft: 2,
                    appearance: "auto",
                  }}
                  aria-label="Select your town"
                >
                  <option value="">{userTown ? "All areas" : "Select town"}</option>
                  {MONROE_TOWNS.map(t => (
                    <option key={t} value={t}>{TOWN_LABELS[t] || t}</option>
                  ))}
                </select>
              </div>`,
  'Add town selector dropdown in header'
);

// ═══════════════════════════════════════════════
// 3. Fix /help hrefs in LandingPage for crawlability
// ═══════════════════════════════════════════════

// Main "Find help" button — add rel="nofollow"
lp = replace(lp,
  `<a href="/help"
              onClick={(e) => { e.preventDefault(); if (onNavigateHelp) onNavigateHelp(); }}`,
  `<a href="/help" rel="nofollow"
              onClick={(e) => { e.preventDefault(); if (onNavigateHelp) onNavigateHelp(); }}`,
  'LandingPage: add nofollow to /help link'
);

// Pets tile — add rel="nofollow"
lp = replace(lp,
  `href="/help#c=pets"
            onClick`,
  `href="/help#c=pets" rel="nofollow"
            onClick`,
  'LandingPage: add nofollow to /help#c=pets link'
);

fs.writeFileSync(HF, hf, 'utf8');
fs.writeFileSync(LP, lp, 'utf8');

console.log("\n" + successes + " changes, " + failures + " failures.");
if (failures > 0) process.exit(1);
