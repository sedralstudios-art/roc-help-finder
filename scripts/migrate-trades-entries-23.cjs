/**
 * Migration 23 — Greece + Henrietta roofing entries
 *
 * Run: node scripts/migrate-trades-entries-23.cjs
 */

const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

const entries = [
  {
    filename: 'LGLW6-D_roofing-residential-ny-mon-greece-town_01.js',
    content: `// LGLW6-D_roofing-residential-ny-mon-greece-town_01.js
// Town of Greece roofing entry. Conditional permit — only when
// sheathing/plywood replacement is involved. Simple re-shingling exempt.
// Source: greeceny.gov Building Dept brochure + eCode360 Ch 114.

export const entry = {
  id: "roofing-residential-ny-mon-greece-town",
  category: "trades",
  tier: "town",
  jurisdiction: "us-ny-monroe-greece-town",
  status: "active",

  title: {
    en: "Roofing in the Town of Greece: what the town requires"
  },

  summary: {
    en: "The Town of Greece requires a building permit for roof work only when the job involves replacing plywood or sheathing. Simple re-shingling over existing sound sheathing does not require a permit. Plumbers must be registered with the Town."
  },

  whatItMeans: {
    en: "Greece takes a middle position on roofing permits. The Town's Building Department guidelines list 'replacing a roof that needs new plywood or sheathing' as requiring a permit, while simple re-roofing (shingle replacement over sound decking) is not listed among permit-required work. This means the permit requirement depends on the condition of the roof deck, not just whether the shingles are being replaced. Contractors should confirm the scope with the Building Department before starting if there is any uncertainty about whether sheathing will need replacement. The Town administers its own code under NYS Uniform Fire Prevention and Building Code. Plumbing work requires a permit obtained by a plumber registered with the Town of Greece."
  },

  example: {
    en: "A roofing contractor inspects a house in Greece and finds the shingles are worn but the plywood decking underneath is solid. The contractor can proceed with a tear-off and re-shingle without a Town permit. On the next job two streets over, the decking has water damage and needs partial replacement. That job requires a permit from the Building Department before work begins."
  },

  whoQualifies: {
    en: [
      "Property owners and contractors working inside the Town of Greece",
      "Roof replacement involving plywood or sheathing replacement requires a permit",
      "Simple re-shingling over sound existing decking does not require a permit"
    ]
  },

  yourRights: {
    en: [
      "The right to have simple re-shingling done without a building permit when the roof deck is sound",
      "The right to contact the Building Department for guidance when the scope is uncertain",
      "All state-level worker protections carried forward from New York State law"
    ]
  },

  legalOptions: {
    en: [
      "The Town of Greece Building Department handles permit applications, plan review, and inspections for construction work inside the Town",
      "Electrical inspections are performed by outside agencies licensed by the Town — the applicant chooses the agency",
      "The Building Inspector may issue stop-work orders for construction performed in violation of code or without required permits"
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Town of Greece Building Department",
      focus: "Building permits, code compliance, inspections, zoning",
      qualifier: "Open to residents, property owners, and contractors working inside the Town",
      access: "Town Hall; phone; email BuildingDepartment@greeceny.gov",
      outcome: "Permit issuance, inspection scheduling, code guidance",
      phone: "585-723-2443",
      url: "https://greeceny.gov/departments/building/",
      verified: true,
      bilingual: false,
      languages: ["en"]
    }
  ],

  relatedIds: ["roofing-residential-ny"],
  relatedHelpResources: [],

  tags: [
    "trades", "roofing", "greece", "monroe county",
    "building permit", "town ordinance", "conditional permit"
  ],

  sources: [
    "https://greeceny.gov/departments/building/",
    "https://greeceny.gov/files/Guildlines_for_residential_permits_brochurexfinalx.pdf",
    "https://ecode360.com/10838059"
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
    filename: 'LGLW6-D_roofing-residential-ny-mon-henrietta-town_01.js',
    content: `// LGLW6-D_roofing-residential-ny-mon-henrietta-town_01.js
// Town of Henrietta roofing entry. Broad permit language — permits required
// for construction, modification, installation, or demolition of structures.
// Source: henrietta.org Building & Fire Prevention + eCode360 Ch 48.

export const entry = {
  id: "roofing-residential-ny-mon-henrietta-town",
  category: "trades",
  tier: "town",
  jurisdiction: "us-ny-monroe-henrietta-town",
  status: "active",

  title: {
    en: "Roofing in the Town of Henrietta: what the town requires"
  },

  summary: {
    en: "The Town of Henrietta requires building permits for the construction, modification, installation, or demolition of structures on properties. This broad language covers most roofing work. Contact the Building and Fire Prevention Department to confirm whether your specific project requires a permit."
  },

  whatItMeans: {
    en: "Henrietta's permit requirement language is broad: building permits are required to construct, modify, install, or demolish any structures on properties, including houses. The Town does not publish a specific roofing exemption the way some neighboring towns do. The Building and Fire Prevention Department, staffed by NYS Department of State certified Code Enforcement inspectors, reviews all permit applications. Electrical inspections are performed by three outside agencies — call the Building Department for the list. The Town also adopted NYStretch Energy Code (effective January 2023) which adds energy efficiency requirements beyond the base NYS Energy Code."
  },

  example: {
    en: "A contractor planning a residential roof replacement in Henrietta calls the Building and Fire Prevention Department at 585-359-7060 to confirm whether a permit is needed. Because the Town's code uses broad language covering modifications to structures, the department advises that a residential building permit application is required before work begins."
  },

  whoQualifies: {
    en: [
      "Property owners and contractors working inside the Town of Henrietta",
      "Building permits cover construction, modification, installation, and demolition of structures",
      "Contact the Building and Fire Prevention Department to confirm specific project requirements"
    ]
  },

  yourRights: {
    en: [
      "The right to clear guidance from the Building and Fire Prevention Department on permit requirements",
      "All permit transaction records are public records open to inspection during business hours",
      "All state-level worker protections carried forward from New York State law"
    ]
  },

  legalOptions: {
    en: [
      "The Town of Henrietta Building and Fire Prevention Department handles residential and commercial permit applications, inspections, and code enforcement",
      "The Zoning Board of Appeals hears variance applications for situations that do not fit within standard zoning codes",
      "The Building Inspector may issue stop-work orders for work performed in violation of applicable codes or without required permits"
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Town of Henrietta Building and Fire Prevention Department",
      focus: "Building permits, fire prevention, code enforcement, inspections",
      qualifier: "Open to residents, property owners, and contractors working inside the Town",
      access: "Henrietta Town Hall, 475 Calkins Road, Rochester, NY 14623; phone",
      outcome: "Permit issuance, inspection scheduling, code guidance",
      phone: "585-359-7060",
      url: "https://www.henrietta.org/building",
      verified: true,
      bilingual: false,
      languages: ["en"]
    }
  ],

  relatedIds: ["roofing-residential-ny"],
  relatedHelpResources: [],

  tags: [
    "trades", "roofing", "henrietta", "monroe county",
    "building permit", "town ordinance", "NYStretch energy code"
  ],

  sources: [
    "https://www.henrietta.org/building",
    "https://www.henrietta.org/building/page/permit-applications",
    "https://ecode360.com/8222912"
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
if (created === 2) console.log('✅ Migration 23 complete.');
