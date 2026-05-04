export const HVAC_RESIDENTIAL_NY_MON_SWEDEN_TOWN = {
  id: "hvac-residential-ny-mon-sweden-town",
  category: "trades",
  tier: "town",
  jurisdiction: "us-ny-monroe-sweden-town",
  authorityType: "local-ordinance",
  status: "active",

  title: { en: "Residential HVAC Work in the Town of Sweden — No Town HVAC License, In-House Inspection, Brockport Village Separate" },

  summary: {
    en: "The Town of Sweden follows the New York Uniform Fire Prevention and Building Code for HVAC work, including the Mechanical Code and the Fuel Gas Code. The town does not license HVAC contractors directly. Gas line work attached to a new furnace still needs a qualified plumber (gas piping is plumbing work). Town staff inspect the HVAC work in-house rather than delegating to third-party agencies. The 2025 NY Energy Code applies to permits filed after December 31, 2025. Sweden covers addresses outside Brockport village; the village has its own separate Building Department. The Sweden Building Department at [number being verified] confirms scope and fees."
  },

  whatItMeans: {
    en: "Sweden enforces the New York Uniform Fire Prevention and Building Code (adopted statewide under Executive Law 379) for all HVAC work inside town limits (outside the Village of Brockport). The Uniform Code incorporates the International Mechanical Code (IMC) and the International Fuel Gas Code (IFGC), along with New York state-specific amendments.\n\nNo town HVAC license. The town does not license HVAC contractors. New York does not have a statewide HVAC license — the statewide trade is self-regulated through insurance, EPA certifications, and the Home Improvement Contractor requirements.\n\nGas line work is plumbing. Any gas line installation or alteration attached to a new HVAC unit (furnace, boiler, water heater) is plumbing work. It requires a qualified plumber with current insurance and a separate plumbing permit. The HVAC contractor pulls the mechanical permit; a plumber pulls a separate permit for the gas line from the meter to the appliance.\n\nIn-house inspection. Unlike electrical (which uses three Town-Board-approved third-party agencies), the town does HVAC inspections in-house. Sweden Building Department staff inspect the mechanical installation. This keeps inspection scheduling simple but means availability depends on town staff capacity.\n\n2025 Energy Code. New York adopted the 2020 Energy Conservation Construction Code (ECCCNYS) with the stretch code update effective after December 31, 2025. Permits filed after that date have to meet the newer efficiency standards. For HVAC, that means minimum AFUE ratings for furnaces (typically 95 percent for gas), minimum SEER2 for air conditioners, and tighter duct sealing requirements.\n\nEPA Section 608 certification. Anyone handling refrigerant — including during AC or heat pump installation, repair, or removal — must have federal EPA Section 608 certification under 40 CFR Part 82. This is a federal requirement. A homeowner cannot legally recover refrigerant when replacing an old unit.\n\nJurisdictional boundary. The Village of Brockport sits inside the Town of Sweden along the southern edge. A property with a Brockport, NY 14420 mailing address can sit in village limits or in the surrounding Sweden town area. The two offices do not share permit files. The Monroe County Real Property Portal confirms which office governs a specific address.\n\nSUNY Brockport context. Sweden hosts a large share of the student-adjacent rental housing tied to SUNY Brockport. A landlord replacing a furnace or adding AC in a Sweden rental (outside village limits) goes through the Sweden Building Department. A landlord in Brockport village goes through the village office.\n\nHomeowner self-work. The town's public code does not clearly address whether homeowners can pull HVAC permits and do the work personally. A call to the Building Department at [number being verified] confirms the current rule for a specific project.\n\nState protections. Wage theft protections (Labor Law 191 and 193), the Scaffold Law for elevated work (Labor Law 240 and 241(6)), mechanic's liens (Lien Law 3 and 10), and General Business Law 349 for deceptive home-improvement practices apply in Sweden as statewide. The statewide hvac-residential-ny entry covers those layers."
  },

  example: {
    en: "A homeowner in Sweden, outside Brockport village, replaces an old natural-gas furnace with a new high-efficiency condensing furnace. The HVAC contractor files the mechanical permit with the Sweden Building Department. A separate licensed plumber files a plumbing permit for the new gas line from the meter to the furnace. Town staff inspect both installations. Because the permit is filed after December 31, 2025, the new furnace has to meet the 2025 Energy Code's 95 percent AFUE minimum."
  },

  whoQualifies: {
    en: [
      "A property owner or HVAC contractor doing residential HVAC work in the Town of Sweden outside village limits.",
      "A plumber doing gas line work attached to an HVAC install (separate plumbing permit required).",
      "A property owner with a Brockport, NY 14420 mailing address who is confirming whether the parcel sits in village limits or in Sweden.",
      "A homeowner considering self-work who is confirming the town's rule with the Building Department."
    ]
  },

  yourRights: {
    en: [
      "A property owner has the right to clear guidance from the Building Department on which HVAC scopes require a permit.",
      "A property owner has the right to inspection by town staff rather than a paid third-party agency.",
      "A property owner has the right to a clear answer on jurisdiction — Sweden or Brockport village — for a specific address.",
      "State worker protections — wage, safety, injury — apply in Sweden as statewide.",
      "A property owner has the right to dispute a deceptive HVAC contractor under General Business Law 349."
    ]
  },

  legalOptions: {
    en: [
      "The Town of Sweden Building Department at (585) 637-8684 handles HVAC permits and inspections.",
      "Gas line work requires a separate plumbing permit and a licensed plumber.",
      "Refrigerant handling requires federal EPA Section 608 certification under 40 CFR Part 82.",
      "For addresses inside village limits, the Village of Brockport Building and Code Enforcement office handles the permit.",
      "For wage or injury issues on an HVAC job, the statewide hvac-residential-ny entry covers state-level channels."
    ]
  },

  counsel: [{
    type: "free",
    name: "Town of Sweden Building Department",
    focus: "HVAC permits, inspections, code compliance",
    qualifier: "Residents and contractors working in Town of Sweden outside Brockport village",
    access: "Phone",
    outcome: "Permit issuance, inspection scheduling, code guidance",
    phone: "",
    url: "https://www.townofswedenny.gov/building-department",
    verified: true,
    bilingual: false,
    languages: ["en"]
  }],

  relatedIds: ["hvac-residential-ny", "plumbing-residential-ny-mon-sweden-town", "electrical-residential-ny-mon-sweden-town"],
  relatedHelpResources: [],
  tags: ["trades", "HVAC", "furnace", "heat pump", "sweden", "monroe county", "town ordinance", "energy code", "gas line"],
  sources: ["https://www.townofswedenny.gov/building-department", "https://ecode360.com/10493157"],
  lastVerified: "2026-04-23",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
