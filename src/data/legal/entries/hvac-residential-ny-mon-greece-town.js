export const HVAC_RESIDENTIAL_NY_MON_GREECE_TOWN = {
  id: "hvac-residential-ny-mon-greece-town",
  category: "trades",
  tier: "town",
  jurisdiction: "us-ny-monroe-greece-town",
  authorityType: "local-ordinance",
  status: "active",

  title: { en: "Residential HVAC Work in the Town of Greece — Gas Appliance Permit, Manual J, and Homeowner Self-Work Rules" },

  summary: {
    en: "The Town of Greece runs a dedicated gas appliance permit for HVAC work. A Manual J heat loss calculation is required when a furnace is replaced. Gas line work is plumbing — a Greece-registered plumber pulls the gas piping permit. Town staff perform HVAC inspections directly; Greece does not use third-party agencies for HVAC the way it does for electrical. The town explicitly allows a homeowner to do HVAC work on their own homestead, with the permit and inspection still required. The 2025 NY Energy Code applies to permits filed after December 31, 2025."
  },

  whatItMeans: {
    en: "The Town of Greece Building Department handles HVAC permits through a gas appliance permit track. That covers furnaces, boilers, water heaters, and other gas-fired appliances.\n\nManual J on furnace replacement. When a furnace is being replaced, Greece requires a Manual J heat loss calculation. Manual J is an industry-standard document showing the new furnace is the right size for the home — not oversized, not undersized. An oversized furnace short-cycles and wastes fuel; an undersized furnace cannot keep up in cold weather. The HVAC contractor usually produces the Manual J as part of the permit package.\n\nGas line work is plumbing. Greece registers plumbers on a 2-year cycle. A Greece-registered plumber pulls a separate plumbing permit for gas piping — the line from the gas meter to the appliance. An HVAC technician can set the appliance and make the final connection, but the gas pipe itself is plumbing work.\n\nInsurance. Contractors have to file proof of general liability coverage and workers' compensation coverage, with the Town of Greece listed as a certificate holder.\n\nInspections. Greece inspectors do HVAC inspections directly — not a third-party agency. Inspection scheduling runs through (585) 723-1923. The main Building Department line is (585) 723-2443.\n\nHomeowner self-work. Greece explicitly allows a homeowner to do HVAC work on their own homestead. The town's gas appliance page points to New York State rules that permit homeowner work with a permit and inspection. A homeowner doing the work still has to hold the required permit and call in the inspection. Gas piping stays a plumber's job even on a homeowner project.\n\n2025 NY Energy Code. Permits filed after December 31, 2025 have to meet the stricter 2025 energy code requirements. For new furnaces, AC systems, and heat pumps, that means higher minimum efficiency ratings (AFUE, SEER, HSPF) and additional duct-sealing and insulation requirements. NYSERDA publishes the plain-English compliance guide.\n\nCombustion safety. A replacement furnace that reuses an existing chimney flue usually triggers a chimney review — undersized or deteriorated flues are a carbon monoxide risk. The Greece inspector checks flue sizing as part of the final inspection. Some installations require a stainless-steel flue liner to match the output of the new high-efficiency appliance.\n\nEPA Section 608 refrigerant rule. Any worker who handles refrigerant — AC installation, heat pump service, refrigerant recovery — has to hold federal EPA Section 608 certification. This is a federal rule that applies across all of New York; Greece does not add a separate local layer on top.\n\nScottsville or other village boundaries. The Town of Greece does not contain a village with its own code enforcement, so the town office handles the full territory. Residents unsure about the jurisdiction for a specific address can confirm with the town assessor.\n\nState floor. The statewide hvac-residential-ny entry covers the worker protections and consumer rules that apply on top of Greece's local practice — Scaffold Law, wage theft protections, mechanic's liens, and General Business Law 349 for deceptive contractors."
  },

  example: {
    en: "A Greece homeowner replaces an old gas furnace. Her HVAC contractor runs a Manual J calculation to size the new unit, then files the gas appliance permit with the town. The gas line needs a short reroute, so a Greece-registered plumber pulls a separate plumbing permit for the piping. The Greece inspector schedules a final inspection through (585) 723-1923. After the inspector signs off on the furnace, the flue, and the gas line, the new system can operate."
  },

  whoQualifies: {
    en: [
      "A property owner or contractor doing HVAC work inside the Town of Greece.",
      "A plumber registered with Greece (2-year cycle) for gas line work.",
      "A homeowner working on their own homestead — the town explicitly permits homeowner HVAC work with a permit and inspection."
    ]
  },

  yourRights: {
    en: [
      "A homeowner has the right to do HVAC work on their own homestead under the town's explicit rule; a permit and inspection are still required.",
      "A property owner has the right to clear guidance from the Building Department on the permit, inspection, and Manual J requirements.",
      "A property owner has the right to a town-staff inspection, not a third-party inspection.",
      "State worker protections — wage, safety, injury — apply in Greece as they do statewide.",
      "A property owner has the right to dispute a deceptive HVAC contractor under General Business Law 349."
    ]
  },

  legalOptions: {
    en: [
      "The Greece Building Department handles gas appliance permits and HVAC inspections.",
      "A Manual J heat loss calculation is required when a furnace is replaced.",
      "A Greece-registered plumber is required for gas line piping work; the plumbing permit is separate from the HVAC permit.",
      "Contractors file proof of general liability and workers' compensation insurance with the town listed as certificate holder.",
      "For wage or injury issues on an HVAC job, the statewide hvac-residential-ny entry covers state-level channels (NYS Department of Labor, OSHA, Workers' Compensation Board)."
    ]
  },

  counsel: [{
    type: "free",
    name: "Town of Greece Building Department",
    focus: "HVAC and gas appliance permits, Manual J review, inspections",
    qualifier: "Residents and contractors inside the Town of Greece",
    access: "1 Vince Tofany Blvd; main line; inspection line (585) 723-1923; email BuildingDepartment@greeceny.gov",
    outcome: "Permit issuance, inspection scheduling, code guidance",
    phone: "(585) 723-2443",
    url: "https://greeceny.gov/departments/building/gas-appliances-and-venting/",
    verified: true,
    bilingual: false,
    languages: ["en"]
  }],

  relatedIds: ["hvac-residential-ny", "plumbing-residential-ny-mon-greece-town"],
  relatedHelpResources: [],
  tags: ["trades", "HVAC", "furnace", "heat pump", "greece", "monroe county", "gas appliance permit", "Manual J", "homeowner HVAC", "town ordinance"],
  sources: [
    "https://greeceny.gov/departments/building/",
    "https://greeceny.gov/departments/building/gas-appliances-and-venting/"
  ],

  lastVerified: "2026-04-22",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
