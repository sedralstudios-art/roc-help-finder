export const ELECTRICAL_RESIDENTIAL_NY_MON_GREECE_TOWN = {
  id: "electrical-residential-ny-mon-greece-town",
  category: "trades",
  tier: "town",
  jurisdiction: "us-ny-monroe-greece-town",
  authorityType: "local-ordinance",
  status: "active",

  title: {
    en: "Residential Electrical Work in the Town of Greece — Approved Inspection Agencies and Permit Process"
  },

  summary: {
    en: "The Town of Greece approves three Electrical Inspection Agencies: NYEIA, Commonwealth, and Middle Department. The town itself does not perform electrical inspections. A homeowner or contractor picks one of the three agencies, that agency inspects the work, and the agency issues the Certificate of Compliance. Electrical questions go to the agency that was picked, not to the town. Homeowners can apply for building permits themselves, though the town notes that a homeowner-held permit carries more responsibility and liability for code compliance. The statewide electrical-residential entry (electrical-residential-ny) covers the rules that apply on top of local practice."
  },

  whatItMeans: {
    en: "Greece takes a hands-off approach to electrical inspections. Town code enforcement covers building, plumbing, mechanical, and other trades, but electrical is handled through approved third-party agencies. The town maintains a public list of three registered agencies and requires electrical work to be inspected by one of them.\n\nThe approved Electrical Inspection Agencies in Greece:\n- New York Electrical Inspection Agency (NYEIA) at (585) 436-4460\n- Commonwealth Electrical Inspection Service at (585) 624-2380\n- Middle Department Inspection Agency (MDIA) at (585) 454-5191\n\nThe town's guidance to homeowners and contractors is to direct any electrical questions about a specific installation to the registered agency that will inspect the work. The town building department handles the permit itself and the non-electrical components of the project.\n\nPermits. A building permit is filed at the Greece Building Department for any project that triggers a permit — a new service panel or subpanel, new circuits, EV chargers (240V Level 2), generator transfer switches, hot tubs, pool bonding, and finished basements are all typical triggers. Small like-for-like repairs (replacing a receptacle) usually do not need a permit, but the building department sets the line.\n\nHomeowner-applied permits. A homeowner can apply for a building permit on a property they own and occupy, even when a contractor is doing the actual work. The town reminds homeowners that a homeowner-held permit comes with a higher level of responsibility and liability for code compliance than a contractor-held permit. Whether a homeowner can perform the physical electrical work themselves in Greece is not clearly answered in the posted code; calling the Building Department to confirm is the best first step.\n\nInspection flow. After the electrical work is complete (or in rough-in stage, depending on project), the homeowner or electrician contacts the chosen agency. The agency inspects the work against the New York State Uniform Fire Prevention and Building Code, which incorporates the National Electrical Code (NEC / NFPA 70). If it passes, the agency issues a Certificate of Compliance and sends a copy to the town. The town closes the permit once the certificate is on file.\n\nFees. The town charges each inspection agency a registration fee (the town sets the current amount, historically $600) for the privilege of operating in Greece. That fee is paid by the agency, not by the homeowner. Per-inspection fees to the homeowner are set by the agency and are not uniform across the three — calling each for a quote makes sense on larger jobs.\n\nDispute or denied inspection. When an agency fails an installation, the agency issues a correction notice listing specific items. After corrections are made, the agency re-inspects. A homeowner who believes an agency acted improperly can contact the town Building Department or file a consumer complaint with the NYS Attorney General's Consumer Frauds Bureau.\n\nState floor applies. The statewide electrical-residential-ny entry covers the rules that apply on top of local practice — worker protections, Scaffold Law, wage theft protections, mechanic's liens, and General Business Law 349 for deceptive contractors. Those state rules apply in Greece as they do everywhere in New York."
  },

  example: {
    en: "A homeowner in Greece wants to install a whole-house generator with an automatic transfer switch. The Town Building Department explains that electrical inspections are not done by town staff. The homeowner picks MDIA from the town's list of three approved agencies. A licensed electrician performs the install. MDIA inspects the transfer switch, the grounding, and the generator connection, and issues a Certificate of Compliance. MDIA sends the certificate to the town, and the town closes out the permit."
  },

  whoQualifies: {
    en: [
      "A property owner or contractor doing electrical work inside the Town of Greece.",
      "An electrician carrying liability insurance and workers' compensation coverage.",
      "A homeowner considering pulling the electrical permit in their own name — the town recommends a call to the Building Department first."
    ]
  },

  yourRights: {
    en: [
      "A homeowner has the right to pick any of the town's three approved inspection agencies (NYEIA, Commonwealth, MDIA).",
      "A homeowner has the right to direct electrical-specific questions to the agency that will perform the inspection.",
      "A homeowner has the right to pull the building permit in their own name; the town notes this comes with added code-compliance responsibility.",
      "State worker protections — wage, safety, injury — apply in Greece as they do statewide.",
      "A homeowner has the right to file a consumer complaint about deceptive contractor practices with the NYS Attorney General under General Business Law 349."
    ]
  },

  legalOptions: {
    en: [
      "The Greece Building Department handles overall building permits. It does not perform electrical inspections.",
      "Three approved Electrical Inspection Agencies inspect electrical work and issue Certificates of Compliance.",
      "The agencies register with the town (practice-of-trade fee paid by the agency, not by homeowners).",
      "For electrical-specific questions, calling the agency that was picked is the right route, not the town.",
      "For wage or injury issues on an electrical job, see the statewide electrical-residential-ny entry for the state-level options (NYS Department of Labor, OSHA, Workers' Compensation Board)."
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Town of Greece Building Department",
      focus: "Permit intake, agency list, overall code compliance (not electrical inspection itself)",
      qualifier: "Residents, property owners, and electricians working inside the town",
      access: "Town Hall at 1 Vince Tofany Blvd; phone; email BuildingDepartment@greeceny.gov",
      outcome: "Permit issuance, agency list, code guidance",
      phone: "(585) 723-2443",
      url: "https://greeceny.gov/departments/building/",
      verified: true,
      bilingual: false,
      languages: ["en"]
    },
    {
      type: "free",
      name: "New York Electrical Inspection Agency (NYEIA)",
      focus: "Electrical inspection and Certificate of Compliance for Greece properties",
      qualifier: "Any electrical work inside the Town of Greece",
      access: "Phone to schedule inspection",
      outcome: "Electrical inspection and certificate issuance",
      phone: "(585) 436-4460",
      url: "https://nyeia.com",
      verified: true,
      bilingual: false,
      languages: ["en"]
    }
  ],

  relatedIds: ["electrical-residential-ny"],
  relatedHelpResources: [],

  tags: [
    "trades", "electrical", "electrician", "greece",
    "monroe county", "NYEIA", "Commonwealth", "MDIA",
    "inspection agency", "third-party inspection",
    "EV charger", "service panel", "generator", "town ordinance"
  ],

  sources: [
    "https://greeceny.gov/departments/building/"
  ],

  lastVerified: "2026-04-22",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
