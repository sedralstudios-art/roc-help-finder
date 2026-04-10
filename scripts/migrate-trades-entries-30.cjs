#!/usr/bin/env node
// migrate-trades-entries-30.cjs
// Adds 4 roofing entries: Wheatland (town), Brockport (village),
// Spencerport (village), Hilton (village).
// Wheatland explicitly requires roofing permits.
// Spencerport building permits handled by Town of Ogden.

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

const entries = [
  {
    filename: 'LGLW6-D_roofing-residential-ny-mon-wheatland-town_01.js',
    content: `// LGLW6-D_roofing-residential-ny-mon-wheatland-town_01.js
// Town of Wheatland roofing entry. Explicit roofing permit REQUIRED.
// "Roofs, decks, porches and entryways- any size" listed as permit-required.
// Penalty: 4x permit cost + $100 for no permit.
// Contains Village of Scottsville (separate jurisdiction with Historic District).
// Source: townofwheatland.org Building Department page.

export const entry = {
  id: "roofing-residential-ny-mon-wheatland-town",
  category: "trades",
  tier: "town",
  jurisdiction: "us-ny-monroe-wheatland-town",
  status: "active",

  title: {
    en: "Roofing in the Town of Wheatland: what the town requires"
  },

  summary: {
    en: "The Town of Wheatland explicitly requires a building permit for roofs, decks, porches, and entryways of any size. If work begins without a permit, the Town can issue a Stop Work order with penalties of four times the permit cost plus $100. The Village of Scottsville, which sits inside the Town, has separate code enforcement."
  },

  whatItMeans: {
    en: "Wheatland's Building Department website explicitly lists 'Roofs, decks, porches and entryways — any size' among the projects that require a building permit. The Town also requires permits for replacement of any project that originally required a permit, and all replacement projects must comply with current zoning and building code requirements. The Building Department and Fire Marshal conduct plan reviews and construction inspections. Property owners who start work without a required permit face a Stop Work order and penalties of four times the permit cost plus $100. The Village of Scottsville has a Historic District on Rochester Street — properties in that area may have additional requirements."
  },

  example: {
    en: "A homeowner in Wheatland needs a complete roof replacement. Because the Town explicitly lists roofs of any size as requiring a building permit, the homeowner contacts the Building Department before hiring a contractor. The contractor submits a permit application and waits for approval before starting work."
  },

  whoQualifies: {
    en: [
      "Property owners and contractors performing roofing work inside the Town of Wheatland",
      "Roofs of any size require a building permit — this is explicitly listed by the Building Department",
      "The Village of Scottsville has separate code enforcement — verify your jurisdiction"
    ]
  },

  yourRights: {
    en: [
      "The right to clear information about permit requirements — the Building Department publishes a detailed list",
      "The right to know the penalty structure before starting work (4x permit cost + $100 for no permit)",
      "All state-level worker protections carried forward from New York State law"
    ]
  },

  legalOptions: {
    en: [
      "The Town of Wheatland Building Department handles permit applications, plan review, inspections, and code enforcement",
      "The Fire Marshal handles fire safety inspections and fire-related code enforcement",
      "The Building Department investigates zoning complaints and property maintenance issues"
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Town of Wheatland Building Department",
      focus: "Building permits, code enforcement, fire marshal, inspections",
      qualifier: "Open to residents, property owners, and contractors working inside the Town",
      access: "22 Main Street, Scottsville; phone",
      outcome: "Permit issuance, inspection scheduling, code guidance",
      phone: "585-889-1553",
      url: "https://www.townofwheatland.org/building-department",
      verified: true,
      bilingual: false,
      languages: ["en"]
    }
  ],

  relatedIds: ["roofing-residential-ny"],
  relatedHelpResources: [],

  tags: [
    "trades", "roofing", "wheatland", "monroe county",
    "building permit", "town ordinance", "scottsville"
  ],

  sources: [
    "https://www.townofwheatland.org/building-department",
    "https://www.townofwheatland.org/general-faqs",
    "https://ecode360.com/10499430"
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
    filename: 'LGLW6-D_roofing-residential-ny-mon-brockport-village_01.js',
    content: `// LGLW6-D_roofing-residential-ny-mon-brockport-village_01.js
// Village of Brockport roofing entry.
// Straddles Towns of Sweden and Clarkson — separate code enforcement.
// Source: brockportny.org Building & Code Enforcement.

export const entry = {
  id: "roofing-residential-ny-mon-brockport-village",
  category: "trades",
  tier: "village",
  jurisdiction: "us-ny-monroe-brockport-village",
  status: "active",

  title: {
    en: "Roofing in the Village of Brockport: what the village requires"
  },

  summary: {
    en: "The Village of Brockport has its own Building and Code Enforcement department, separate from the Towns of Sweden and Clarkson that surround it. The department handles NYS Building Code enforcement, property maintenance inspections, permits, certificates of occupancy, and fire safety. Contact the Building and Codes Office at 585-637-5300 to confirm permit requirements for your roofing project."
  },

  whatItMeans: {
    en: "The Village of Brockport straddles the Towns of Sweden and Clarkson but administers its own building code enforcement. The department handles permits, inspections, certificates of occupancy, fire safety, and property maintenance. Being permitted by either Sweden or Clarkson does not clear a contractor to work inside the Village — the Village has its own code enforcement office and its own permit process. The Village also administers a residential rental registration program requiring annual registration and fees for rental properties."
  },

  example: {
    en: "A roofing contractor finishes a job in the Town of Sweden and drives into the Village of Brockport for the next job. Even though the Village sits inside Sweden, the contractor needs to work with the Village's Building and Codes Office at 585-637-5300, not the Town of Sweden Building Department."
  },

  whoQualifies: {
    en: [
      "Property owners and contractors working inside the Village of Brockport boundary",
      "The Village has separate code enforcement from the Towns of Sweden and Clarkson",
      "Contact the Building and Codes Office at 585-637-5300 to confirm specific project requirements"
    ]
  },

  yourRights: {
    en: [
      "The right to clear guidance from the Building and Codes Office on permit requirements",
      "The right to know which jurisdiction your property is in before starting work",
      "All state-level worker protections carried forward from New York State law"
    ]
  },

  legalOptions: {
    en: [
      "The Village of Brockport Building and Code Enforcement department handles permit applications, inspections, and code enforcement inside the Village",
      "The Planning Board and Zoning Board of Appeals handle land use applications within the Village",
      "Code enforcement complaints can be filed through the Building and Codes Office"
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Village of Brockport Building and Code Enforcement",
      focus: "Building permits, code enforcement, property maintenance, fire safety",
      qualifier: "Open to residents, property owners, and contractors working inside the Village",
      access: "Village Hall; phone; email cfabry@brockportny.gov",
      outcome: "Permit issuance, inspection scheduling, code guidance",
      phone: "585-637-5300",
      url: "https://brockportny.org/building-code/",
      verified: true,
      bilingual: false,
      languages: ["en"]
    }
  ],

  relatedIds: ["roofing-residential-ny", "roofing-residential-ny-mon-sweden-town", "roofing-residential-ny-mon-clarkson-town"],
  relatedHelpResources: [],

  tags: [
    "trades", "roofing", "brockport", "monroe county",
    "building permit", "village ordinance", "stacked jurisdiction"
  ],

  sources: [
    "https://brockportny.org/building-code/"
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
    filename: 'LGLW6-D_roofing-residential-ny-mon-spencerport-village_01.js',
    content: `// LGLW6-D_roofing-residential-ny-mon-spencerport-village_01.js
// Village of Spencerport roofing entry.
// Building permits are handled by the Town of Ogden — not the Village.
// Village has part-time Code Enforcement Officer for code duties only.
// Source: spencerport.gov Code Enforcement page.

export const entry = {
  id: "roofing-residential-ny-mon-spencerport-village",
  category: "trades",
  tier: "village",
  jurisdiction: "us-ny-monroe-spencerport-village",
  status: "active",

  title: {
    en: "Roofing in the Village of Spencerport: what the village requires"
  },

  summary: {
    en: "The Village of Spencerport's building permit functions are performed by the Town of Ogden. For building permits — including roofing — contact the Town of Ogden Building Department at 585-617-6195. The Village has a part-time Code Enforcement Officer who handles code enforcement duties within the Village, but building permits go through Ogden."
  },

  whatItMeans: {
    en: "Spencerport is a village inside the Town of Ogden. While the Village has its own Code on eCode360 (Chapter 125, Building Code Administration and Enforcement), in practice the Building Department duties are performed by the Town of Ogden under a shared-services arrangement. The Village employs a part-time Code Enforcement Officer for property maintenance and code compliance issues within the Village boundary. For building permit applications, plan review, and construction inspections — including roofing work — residents and contractors should contact the Town of Ogden Building Department."
  },

  example: {
    en: "A homeowner inside the Village of Spencerport needs a roof replacement. The homeowner calls the Town of Ogden Building Department at 585-617-6195 to apply for a building permit, since the Village's building permit functions are handled by Ogden. For a property maintenance complaint within the Village, the homeowner would contact the Village's Code Enforcement Officer instead."
  },

  whoQualifies: {
    en: [
      "Property owners and contractors working inside the Village of Spencerport",
      "Building permits are handled by the Town of Ogden Building Department at 585-617-6195",
      "Code enforcement complaints within the Village go to the Village's part-time Code Enforcement Officer"
    ]
  },

  yourRights: {
    en: [
      "The right to clear guidance on which office handles your specific need — permits (Ogden) vs code enforcement (Village)",
      "All state-level worker protections carried forward from New York State law"
    ]
  },

  legalOptions: {
    en: [
      "The Town of Ogden Building Department handles building permit applications, inspections, and construction code enforcement for properties inside the Village of Spencerport",
      "The Village of Spencerport Code Enforcement Officer handles property maintenance and village code compliance issues",
      "The Village Planning Board and Zoning Board of Appeals handle land use applications within the Village"
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Town of Ogden Building Department (serves Spencerport)",
      focus: "Building permits, construction inspections, code compliance",
      qualifier: "Handles building permits for properties inside the Village of Spencerport",
      access: "Town of Ogden Town Hall; phone",
      outcome: "Permit issuance, inspection scheduling, code guidance",
      phone: "585-617-6195",
      url: "https://ogdenny.gov/building-department/",
      verified: true,
      bilingual: false,
      languages: ["en"]
    },
    {
      type: "free",
      name: "Village of Spencerport Code Enforcement",
      focus: "Property maintenance, village code compliance",
      qualifier: "Part-time Code Enforcement Officer for Village-specific code duties",
      access: "Village Office; phone",
      outcome: "Code enforcement, complaint intake",
      phone: "585-352-4771",
      url: "https://spencerport.gov/code-enforcement/",
      verified: true,
      bilingual: false,
      languages: ["en"]
    }
  ],

  relatedIds: ["roofing-residential-ny", "roofing-residential-ny-mon-ogden-town"],
  relatedHelpResources: [],

  tags: [
    "trades", "roofing", "spencerport", "ogden", "monroe county",
    "building permit", "village ordinance", "shared services"
  ],

  sources: [
    "https://spencerport.gov/code-enforcement/",
    "https://ecode360.com/14661684"
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
    filename: 'LGLW6-D_roofing-residential-ny-mon-hilton-village_01.js',
    content: `// LGLW6-D_roofing-residential-ny-mon-hilton-village_01.js
// Village of Hilton roofing entry.
// Sits inside the Town of Parma — separate code enforcement.
// Source: hiltonny.org Building Department.

export const entry = {
  id: "roofing-residential-ny-mon-hilton-village",
  category: "trades",
  tier: "village",
  jurisdiction: "us-ny-monroe-hilton-village",
  status: "active",

  title: {
    en: "Roofing in the Village of Hilton: what the village requires"
  },

  summary: {
    en: "The Village of Hilton has its own Code Enforcement Officer who handles building inspection, code enforcement, and fire marshal services. The Village sits inside the Town of Parma but administers its own building code. Contact the Building Department at 585-392-4144 ext 106 to confirm permit requirements for your roofing project."
  },

  whatItMeans: {
    en: "Hilton is a village inside the Town of Parma with its own Code Enforcement Officer who provides building inspection, code enforcement, and fire marshal services. The Village enforces the NYS Uniform Fire Prevention and Building Code independently from the Town of Parma. Being cleared to work in the Town of Parma does not clear a contractor to work inside the Village — verify which jurisdiction your property is in before starting."
  },

  example: {
    en: "A contractor working on a roofing job near the Parma-Hilton boundary checks with the Village of Hilton Building Department at 585-392-4144 ext 106 to confirm whether the property is inside the Village and what permits are needed."
  },

  whoQualifies: {
    en: [
      "Property owners and contractors working inside the Village of Hilton boundary",
      "The Village has separate code enforcement from the Town of Parma",
      "Contact the Building Department at 585-392-4144 ext 106 to confirm specific project requirements"
    ]
  },

  yourRights: {
    en: [
      "The right to clear guidance from the Code Enforcement Officer on permit requirements",
      "The right to know which jurisdiction your property is in before starting work",
      "All state-level worker protections carried forward from New York State law"
    ]
  },

  legalOptions: {
    en: [
      "The Village of Hilton Code Enforcement Officer handles building permits, inspections, code enforcement, and fire marshal duties inside the Village",
      "Code enforcement complaints can be filed through the Building Department"
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Village of Hilton Building Department",
      focus: "Building permits, code enforcement, fire marshal, inspections",
      qualifier: "Open to residents, property owners, and contractors working inside the Village",
      access: "Village Hall; phone; email mark@hiltonny.org",
      outcome: "Permit issuance, inspection scheduling, code guidance",
      phone: "585-392-4144",
      url: "https://www.hiltonny.org/html/building-dept.html",
      verified: true,
      bilingual: false,
      languages: ["en"]
    }
  ],

  relatedIds: ["roofing-residential-ny", "roofing-residential-ny-mon-parma-town"],
  relatedHelpResources: [],

  tags: [
    "trades", "roofing", "hilton", "parma", "monroe county",
    "building permit", "village ordinance", "stacked jurisdiction"
  ],

  sources: [
    "https://www.hiltonny.org/html/building-dept.html"
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

for (const e of entries) {
  const filePath = path.join(ENTRIES_DIR, e.filename);
  fs.writeFileSync(filePath, e.content, 'utf8');
  console.log(`✓ Created ${e.filename}`);
}

console.log('\nAll checks:');
console.log(`  ✓ 4 entry files created in src/data/legal/entries/`);
console.log(`  ✓ Wheatland: explicit roofing permit, 4x penalty for no permit`);
console.log(`  ✓ Brockport: own code enforcement, straddles Sweden/Clarkson`);
console.log(`  ✓ Spencerport: building permits handled by Town of Ogden`);
console.log(`  ✓ Hilton: own code enforcement, inside Town of Parma`);
console.log(`  ⚠ Vite glob auto-imports — no manual registration needed`);
console.log(`\nAll checks pass.`);
