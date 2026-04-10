/**
 * Migration 22 — Brighton, Perinton, Village of Fairport roofing entries
 *
 * Three new trades entries from towns already researched this session.
 * CATEGORY_META already patched in migration 21. These are file drops only.
 *
 * Run: node scripts/migrate-trades-entries-22.cjs
 */

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

const entries = [
  {
    filename: 'LGLW6-D_roofing-residential-ny-mon-brighton-town_01.js',
    content: `// LGLW6-D_roofing-residential-ny-mon-brighton-town_01.js
// Town of Brighton roofing entry. Permit REQUIRED — contrast with Pittsford.
// Source: brightonny.gov Building Permit Applications + eCode360 Ch 225.

export const entry = {
  id: "roofing-residential-ny-mon-brighton-town",
  category: "trades",
  tier: "town",
  jurisdiction: "us-ny-monroe-brighton-town",
  status: "active",

  title: {
    en: "Roofing in the Town of Brighton: what the town requires"
  },

  summary: {
    en: "The Town of Brighton requires a building permit for re-roofing work on residential properties. The permit fee is $35. A proposal or contract must be submitted with the application."
  },

  whatItMeans: {
    en: "Re-roofing in the Town of Brighton requires a building permit, unlike some neighboring towns. The application must include a completed permit form and a proposal or contract showing a breakdown of the work. Workers' Compensation insurance is required for all contractors. The Building and Planning Department reviews applications for compliance with NYS Building Code and Town of Brighton Comprehensive Development Regulations. Window replacement also requires a permit if replacing more than 50% of windows, and may require Architectural Review Board review if visible from the street. Review of complete applications can take up to four to six weeks."
  },

  example: {
    en: "A roofing contractor accepts a job to tear off and replace shingles on a house in Brighton. Before starting, the contractor submits a permit application with the signed contract to the Building and Planning Department and pays the $35 fee. The contractor also provides proof of Workers' Compensation insurance. Work cannot begin until the permit is issued."
  },

  whoQualifies: {
    en: [
      "Property owners and contractors performing re-roofing work inside the Town of Brighton",
      "All new construction, additions, alterations, and demolition require a separate construction permit",
      "Window replacement requires a permit when more than 50% of windows are being replaced"
    ]
  },

  yourRights: {
    en: [
      "The right to a clear permit decision within 30 days of filing a complete application, per Town code",
      "The right to written reasons if a permit is denied",
      "All state-level worker protections carried forward from New York State law"
    ]
  },

  legalOptions: {
    en: [
      "The Town of Brighton Building and Planning Department handles permit applications, inspections, and code complaints",
      "The Zoning Board of Appeals hears applications for variances from the Town's Comprehensive Development Regulations",
      "The Architectural Review Board reviews exterior alterations visible from the street in certain districts"
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Town of Brighton Building and Planning Department",
      focus: "Building permits, code compliance, inspections, zoning",
      qualifier: "Open to residents, property owners, and contractors working inside the Town",
      access: "Temporarily at 680 Westfall Road during Town Hall renovation; phone",
      outcome: "Permit issuance, inspection scheduling, code guidance",
      phone: "585-784-5250",
      url: "https://www.brightonny.gov/970/Building-Permit-Applications",
      verified: true,
      bilingual: false,
      languages: ["en"]
    }
  ],

  relatedIds: ["roofing-residential-ny"],
  relatedHelpResources: [],

  tags: [
    "trades", "roofing", "brighton", "monroe county",
    "building permit", "town ordinance", "contractor insurance"
  ],

  sources: [
    "https://www.brightonny.gov/584/Requirements-Fees-for-Residential-Projec",
    "https://www.brightonny.gov/970/Building-Permit-Applications",
    "https://ecode360.com/9443471"
  ],

  lastAudited: "2026-04-10",
  lastVerifiedBy: "Claude + Tony",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
`
  },
  {
    filename: 'LGLW6-D_roofing-residential-ny-mon-perinton-town_01.js',
    content: `// LGLW6-D_roofing-residential-ny-mon-perinton-town_01.js
// Town of Perinton roofing entry. No permit required for re-roofing.
// Source: perinton.org Building and Codes FAQ + eCode360 Ch 53.

export const entry = {
  id: "roofing-residential-ny-mon-perinton-town",
  category: "trades",
  tier: "town",
  jurisdiction: "us-ny-monroe-perinton-town",
  status: "active",

  title: {
    en: "Roofing in the Town of Perinton: what the town requires"
  },

  summary: {
    en: "The Town of Perinton does not require a building permit for re-roofing, re-siding, flooring, cabinet installation, or replacement of windows and doors when the opening size is not changed. The Village of Fairport, which sits inside the Town, has separate rules."
  },

  whatItMeans: {
    en: "Re-roofing in the Town of Perinton is explicitly listed as exempt from the building permit requirement, along with re-siding, flooring, cabinet installation, and window or door replacement where the opening is not enlarged. The Building and Codes Department verifies contractor insurance when a contractor is named on any permit application. All state-level rules still apply — Workers' Compensation, NYS Uniform Code compliance, and wage protections. Larger projects involving additions, decks, or major structural renovations do require permits and may require working drawings and a site survey."
  },

  example: {
    en: "A homeowner in Perinton hires a contractor to strip and replace the roof. Because Perinton exempts re-roofing from permits, no application is needed. The homeowner confirms the contractor carries Workers' Compensation insurance. After the job, if the homeowner has concerns about the workmanship, they can contact the Building and Codes Department."
  },

  whoQualifies: {
    en: [
      "Property owners and contractors working inside the Town of Perinton boundary, outside the Village of Fairport",
      "Re-roofing, re-siding, flooring, cabinet installation, and same-size window or door replacement",
      "Work that involves structural changes, additions, or enlarged openings still requires a permit"
    ]
  },

  yourRights: {
    en: [
      "The right to have re-roofing done without a Town building permit",
      "The right to verify a contractor's insurance through the Building and Codes Department",
      "All state-level worker protections carried forward from New York State law"
    ]
  },

  legalOptions: {
    en: [
      "The Town of Perinton Building and Codes Department handles permits, contractor insurance verification, and construction complaints",
      "The Director of Building and Codes enforces the NYS Uniform Code, Energy Code, and Town codes within the Town boundary",
      "Code compliance orders specify the violation, the applicable code provision, and a reasonable time period to achieve compliance"
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Town of Perinton Building and Codes Department",
      focus: "Building permits, code enforcement, contractor insurance verification",
      qualifier: "Open to residents, property owners, and contractors working inside the Town",
      access: "Town Hall; phone; online permit application at perinton.org",
      outcome: "Permit guidance, inspection scheduling, complaint intake",
      phone: "585-223-0770",
      url: "https://perinton.org/departments/public-works/building-and-codes-department/",
      verified: true,
      bilingual: false,
      languages: ["en"]
    }
  ],

  relatedIds: ["roofing-residential-ny", "roofing-residential-ny-mon-fairport-village"],
  relatedHelpResources: [],

  tags: [
    "trades", "roofing", "perinton", "monroe county",
    "building permit", "town ordinance", "contractor insurance"
  ],

  sources: [
    "https://perinton.org/departments/public-works/building-and-codes-department/frequently-asked-questions-concerning-building-permits/",
    "https://ecode360.com/6739149"
  ],

  lastAudited: "2026-04-10",
  lastVerifiedBy: "Claude + Tony",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
`
  },
  {
    filename: 'LGLW6-D_roofing-residential-ny-mon-fairport-village_01.js',
    content: `// LGLW6-D_roofing-residential-ny-mon-fairport-village_01.js
// Village of Fairport roofing entry. Nested inside Town of Perinton.
// Separate Building & Code Enforcement office with different rules.
// Source: village.fairport.ny.us Building & Code Enforcement.

export const entry = {
  id: "roofing-residential-ny-mon-fairport-village",
  category: "trades",
  tier: "village",
  jurisdiction: "us-ny-monroe-fairport-village",
  status: "active",

  title: {
    en: "Roofing in the Village of Fairport: what the village requires"
  },

  summary: {
    en: "The Village of Fairport has its own Building and Code Enforcement office, separate from the Town of Perinton that surrounds it. Most construction projects in the Village require a permit, including renovations, alterations, and additions. Contractors must provide proof of Workers' Compensation insurance and list the Village as additionally insured on their liability policy."
  },

  whatItMeans: {
    en: "The Village of Fairport administers its own building code enforcement under the NYS Uniform Code and the Code of the Village of Fairport. Most construction projects require a permit — renovations, alterations, additions, sheds, decks, pools, hot tubs, fences, signs, and changes to electrical, gas, or plumbing systems. Before contractors can begin work in the Village, they must provide proof of current Workers' Compensation insurance and list the Village as additionally insured on their liability policy. Contractors with no employees must provide a NYS waiver confirming that status. This is a separate requirement from the Town of Perinton — being cleared to work in the Town does not clear a contractor to work in the Village."
  },

  example: {
    en: "A roofing contractor who just finished a job in Perinton (no permit needed) drives two miles into Fairport village for the next job. Even though both are in Monroe County and the Village sits inside the Town of Perinton, the Village has a separate code enforcement office and the contractor needs to provide insurance documentation to the Village before starting work."
  },

  whoQualifies: {
    en: [
      "Property owners and contractors working inside the Village of Fairport boundary",
      "Most construction, renovation, and alteration projects within the Village",
      "Projects may require review by the Planning Board, Zoning Board of Appeals, or other Village boards depending on scope"
    ]
  },

  yourRights: {
    en: [
      "The right to clear information about which permits are required before work begins",
      "The right to attend and testify at public hearings on applications that affect neighboring properties",
      "All state-level worker protections carried forward from New York State law"
    ]
  },

  legalOptions: {
    en: [
      "The Village of Fairport Office of Building and Code Enforcement handles permit applications, inspections, and code complaints inside the Village boundary",
      "The Village receives and investigates property maintenance code complaints and administers enforcement actions",
      "Applications may involve special permits, variances, site plans, subdivisions, or exterior changes reviewed by Village boards"
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Village of Fairport Building and Code Enforcement",
      focus: "Building permits, code enforcement, contractor insurance verification inside the Village",
      qualifier: "Open to residents, property owners, and contractors working inside the Village",
      access: "Village Hall, 31 South Main Street, Fairport, NY 14450; phone; email",
      outcome: "Permit guidance, inspection scheduling, complaint intake",
      phone: "585-421-3207",
      url: "https://www.village.fairport.ny.us/departments/building_planning___zoning_code_enforcement/index.php",
      verified: true,
      bilingual: false,
      languages: ["en"]
    }
  ],

  relatedIds: ["roofing-residential-ny", "roofing-residential-ny-mon-perinton-town"],
  relatedHelpResources: [],

  tags: [
    "trades", "roofing", "fairport", "perinton", "monroe county",
    "building permit", "village ordinance", "contractor insurance",
    "stacked jurisdiction"
  ],

  sources: [
    "https://www.village.fairport.ny.us/departments/building_planning___zoning_code_enforcement/index.php",
    "https://www.fairportny.org/departments/building_planning___zoning_code_enforcement/index.php"
  ],

  lastAudited: "2026-04-10",
  lastVerifiedBy: "Claude + Tony",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
`
  }
];

let created = 0;
for (const e of entries) {
  const fp = path.join(DIR, e.filename);
  if (fs.existsSync(fp)) {
    console.log('⚠ Already exists: ' + e.filename);
  } else {
    fs.writeFileSync(fp, e.content, 'utf8');
    console.log('✓ Created: ' + e.filename);
    created++;
  }
}

console.log('\\n' + created + ' files created. Expected: 3');
if (created === 3) console.log('✅ Migration 22 complete.');
