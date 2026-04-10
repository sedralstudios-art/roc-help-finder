/**
 * Migration 24 — Webster + Irondequoit roofing entries
 * Run: node scripts/migrate-trades-entries-24.cjs
 */
const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

const entries = [
  {
    filename: 'LGLW6-D_roofing-residential-ny-mon-webster-town_01.js',
    content: `// LGLW6-D_roofing-residential-ny-mon-webster-town_01.js
// Town of Webster roofing entry. Broad permit language.
// Note: Village of Webster is a separate jurisdiction with its own code.
// Source: websterny.gov Building Dept + eCode360 Ch 119.

export const entry = {
  id: "roofing-residential-ny-mon-webster-town",
  category: "trades",
  tier: "town",
  jurisdiction: "us-ny-monroe-webster-town",
  status: "active",

  title: {
    en: "Roofing in the Town of Webster: what the town requires"
  },

  summary: {
    en: "The Town of Webster requires building permits for construction work that must conform to the NYS Uniform Building Code. Permits are required for accessory structures, sheds, pools, decks, generators, finished basements, and demolition. If you are unsure whether your roofing project requires a permit, the Building Department advises contacting them before starting. The Village of Webster has separate code enforcement."
  },

  whatItMeans: {
    en: "Webster's Building Department administers the NYS Uniform Code for building construction and local zoning compliance. Permit applications must be accompanied by appropriate documentation and may require duplicate copies of plans and specifications. All insurance certificates must list the Town of Webster (1000 Ridge Rd, Webster, NY 14580) as certificate holder. For construction over $20,000, two sets of plans stamped by a licensed architect or engineer are required plus a PDF copy. The Town explicitly advises contacting the Building Department at 585-872-7036 to confirm whether a permit is needed before starting any project."
  },

  example: {
    en: "A contractor planning a residential roof replacement in Webster calls the Building Department to confirm permit requirements. The department reviews the scope and advises whether the project falls under permit-required work based on the NYS Uniform Code and Town regulations."
  },

  whoQualifies: {
    en: [
      "Property owners and contractors working inside the Town of Webster boundary",
      "The Village of Webster is a separate jurisdiction — verify which you are in before starting",
      "Contact the Building Department at 585-872-7036 to confirm permit needs before starting"
    ]
  },

  yourRights: {
    en: [
      "The right to clear guidance from the Building Department on permit requirements before work begins",
      "All state-level worker protections carried forward from New York State law"
    ]
  },

  legalOptions: {
    en: [
      "The Town of Webster Building Department handles permit applications, plan review, inspections, and code enforcement",
      "The Building Inspector may revoke a permit if work does not conform to approved plans or applicable code"
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Town of Webster Building Department",
      focus: "Building permits, code compliance, inspections, zoning",
      qualifier: "Open to residents, property owners, and contractors working inside the Town",
      access: "1000 Ridge Rd, Webster, NY 14580; phone",
      outcome: "Permit issuance, inspection scheduling, code guidance",
      phone: "585-872-7036",
      url: "https://www.websterny.gov/162/Building-Department",
      verified: true,
      bilingual: false,
      languages: ["en"]
    }
  ],

  relatedIds: ["roofing-residential-ny"],
  relatedHelpResources: [],

  tags: [
    "trades", "roofing", "webster", "monroe county",
    "building permit", "town ordinance", "contractor insurance"
  ],

  sources: [
    "https://www.websterny.gov/162/Building-Department",
    "https://ecode360.com/38732484"
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
    filename: 'LGLW6-D_roofing-residential-ny-mon-irondequoit-town_01.js',
    content: `// LGLW6-D_roofing-residential-ny-mon-irondequoit-town_01.js
// Town of Irondequoit roofing entry. Non-structural repairs exempt.
// Re-shingling over sound decking = no permit. Sheathing replacement = permit.
// Fire Marshal permit required for heat-generating roofing equipment.
// Source: irondequoit.gov Building Dept + eCode360 Ch 98.

export const entry = {
  id: "roofing-residential-ny-mon-irondequoit-town",
  category: "trades",
  tier: "town",
  jurisdiction: "us-ny-monroe-irondequoit-town",
  status: "active",

  title: {
    en: "Roofing in the Town of Irondequoit: what the town requires"
  },

  summary: {
    en: "In the Town of Irondequoit, no building permit is required for repairs that are not structural in nature and do not involve plumbing, electrical, heating, ventilation, or fire-protection systems. Simple re-shingling over sound decking is a non-structural repair. If the roof deck or structural framing needs replacement, a permit is required. A separate Fire Marshal permit is required when heat-generating roofing equipment or open-flame devices are used."
  },

  whatItMeans: {
    en: "Irondequoit's Town Code Chapter 98 exempts non-structural repairs from the building permit requirement. Re-shingling a roof where the underlying decking and framing are sound falls under this exemption — it is a repair, not a structural alteration. If the project involves replacing plywood sheathing, repairing structural framing, or altering the roof structure, a building permit is required. Additionally, the Fire Marshal requires a separate permit for any roof repair or replacement that uses heat-generating equipment or open-flame devices (such as torch-applied roofing). Contractors must carry liability, disability, and Workers' Compensation insurance with the Town of Irondequoit named as certificate holder for the duration of the project. Plumbing work requires a plumber licensed in the Town."
  },

  example: {
    en: "A roofer in Irondequoit tears off old asphalt shingles and inspects the decking. The plywood is solid with no water damage. The roofer installs new shingles directly over the existing sound decking. Because this is a non-structural repair, no Town building permit is needed. On a different job where the decking has rotted through, the roofer contacts the Building Department at 585-336-6020 to apply for a permit before replacing the sheathing."
  },

  whoQualifies: {
    en: [
      "Property owners and contractors working inside the Town of Irondequoit",
      "Non-structural roof repairs (re-shingling over sound decking) do not require a building permit",
      "Structural roof work (sheathing or framing replacement) requires a building permit",
      "Use of heat-generating or open-flame roofing equipment requires a Fire Marshal permit"
    ]
  },

  yourRights: {
    en: [
      "The right to perform non-structural roof repairs without a building permit",
      "The right to contact the Building Department to verify permit needs before starting",
      "Qualified residents may be eligible for the Irondequoit Home Improvement Program (IHIP) which provides grant funds for specified renovation projects",
      "All state-level worker protections carried forward from New York State law"
    ]
  },

  legalOptions: {
    en: [
      "The Town of Irondequoit Building Department handles permit applications, inspections, and code enforcement for construction work inside the Town",
      "The Fire Marshal handles permits for heat-generating roofing equipment and fire-related code enforcement",
      "The Irondequoit Home Improvement Program (IHIP) provides grant funds to qualified residents for specified home renovation projects",
      "Permit review generally takes 7 to 10 business days, up to 15 during peak building season"
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Town of Irondequoit Building Department",
      focus: "Building permits, code compliance, inspections",
      qualifier: "Open to residents, property owners, and contractors working inside the Town",
      access: "Town Hall; phone; inspection request line (requests by 3pm for next-day inspection)",
      outcome: "Permit issuance, inspection scheduling, code guidance",
      phone: "585-336-6020",
      url: "https://www.irondequoit.gov/180/Building",
      verified: true,
      bilingual: false,
      languages: ["en"]
    }
  ],

  relatedIds: ["roofing-residential-ny"],
  relatedHelpResources: [],

  tags: [
    "trades", "roofing", "irondequoit", "monroe county",
    "building permit", "town ordinance", "fire marshal",
    "non-structural repair", "IHIP home improvement grant"
  ],

  sources: [
    "https://www.irondequoit.gov/180/Building",
    "https://ecode360.com/6404661",
    "https://ecode360.com/6404785"
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

console.log('\\n' + created + ' files created. Expected: 2');
if (created === 2) console.log('✅ Migration 24 complete.');
