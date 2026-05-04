// scripts/migrate-dead-callout-numbers.cjs
// One-shot migration: replaces 7 dead numbers across affected legal entries
// with verified-current replacements. Pure-number swaps where the org name
// stays the same; name+number swaps for the two callouts whose original
// org couldn't be located.
//
// Verified by web-search 2026-05-03. Sources noted per row.

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

// Each replacement is a {from, to} pair — exact string match in the entry source.
// Multiple variants per old number to cover the formatting differences across files.
const REPLACEMENTS = [
  // Greece NY Code Enforcement: (585) 723-2396 → (585) 723-2354
  // Source: greeceny.gov/departments/code-compliance/
  { from: '(585) 723-2396', to: '(585) 723-2354' },
  { from: '585-723-2396', to: '585-723-2354' },
  { from: '5857232396', to: '5857232354' },

  // Monroe County Assigned Counsel: (585) 428-5425 → (585) 753-3430
  // Source: monroecounty.gov/acp
  { from: '(585) 428-5425', to: '(585) 753-3430' },
  { from: '585-428-5425', to: '585-753-3430' },
  { from: '5854285425', to: '5857533430' },

  // Town of Irondequoit DPW: (585) 336-6075 → (585) 336-6090
  // Source: irondequoit.gov/219/Public-Works
  { from: '(585) 336-6075', to: '(585) 336-6090' },
  { from: '585-336-6075', to: '585-336-6090' },
  { from: '5853366075', to: '5853366090' },

  // "Community Law Center" — doesn't exist as a current Rochester org.
  // Web-search confirmed no such entity. Original 585-434-5577 number is dead.
  // Redirect to Monroe County Legal Assistance Center (LawNY) at (585) 325-2520.
  // Source: lawny.org, lawhelpny.org/organization/monroe-county-legal-assistance-center
  { from: 'Community Law Center at (585) 434-5577', to: 'Monroe County Legal Assistance Center (LawNY) at (585) 325-2520' },
  { from: '(585) 434-5577', to: '(585) 325-2520' },
  { from: '585-434-5577', to: '585-325-2520' },
  { from: '5854345577', to: '5853252520' },

  // Brighton CSD Central Registration: (585) 242-5080 → (585) 242-5200
  // Source: bcsd.org/registration
  { from: 'Brighton (585) 242-5080', to: 'Brighton (585) 242-5200' },
  { from: '(585) 242-5080', to: '(585) 242-5200' },
  { from: '585-242-5080', to: '585-242-5200' },
  { from: '5852425080', to: '5852425200' },

  // Army JAG Legal Assistance toll-free is dead — Army JAG no longer publishes
  // a single national hotline. Redirect to Military OneSource at 800-342-9647,
  // which is the DoD-wide legal-assistance entry point.
  // Source: militaryonesource.mil/financial-legal/legal/
  { from: 'Army JAG Legal Assistance at (800) 359-7758', to: 'Military OneSource Legal Assistance at 800-342-9647' },
  { from: '(800) 359-7758', to: '800-342-9647' },
  { from: '800-359-7758', to: '800-342-9647' },
  { from: '8003597758', to: '8003429647' },

  // NYS Motorcycle Safety Program: (518) 474-2121 → 1-800-446-9227
  // Source: nysmsp.org / dmv.ny.gov
  { from: '(518) 474-2121', to: '1-800-446-9227' },
  { from: '518-474-2121', to: '1-800-446-9227' },
  { from: '5184742121', to: '8004469227' },
];

function main() {
  let totalEdits = 0;
  let filesEdited = 0;
  const perFile = {};

  for (const f of fs.readdirSync(ENTRIES_DIR)) {
    if (!f.endsWith('.js')) continue;
    const fp = path.join(ENTRIES_DIR, f);
    let src = fs.readFileSync(fp, 'utf8');
    let edited = false;
    for (const { from, to } of REPLACEMENTS) {
      if (src.includes(from)) {
        const before = src.length;
        src = src.split(from).join(to);
        edited = true;
        perFile[f] = (perFile[f] || []);
        perFile[f].push(`${from} → ${to}`);
        totalEdits++;
      }
    }
    if (edited) {
      fs.writeFileSync(fp, src);
      filesEdited++;
    }
  }

  console.log(`Edited ${filesEdited} files, ${totalEdits} replacements.`);
  console.log('');
  for (const f of Object.keys(perFile).sort()) {
    console.log(f + ':');
    for (const d of perFile[f]) console.log('  ' + d);
  }
}

main();
