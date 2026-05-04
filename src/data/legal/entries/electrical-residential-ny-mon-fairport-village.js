export const ELECTRICAL_RESIDENTIAL_NY_MON_FAIRPORT_VILLAGE = {
  id: "electrical-residential-ny-mon-fairport-village",
  category: "trades",
  tier: "village",
  jurisdiction: "us-ny-monroe-fairport-village",
  authorityType: "local-ordinance",
  status: "active",

  title: { en: "Residential Electrical Work in the Village of Fairport — Separate Code Office, Village-Owned Utility" },

  summary: {
    en: "The Village of Fairport runs its own Building and Code Enforcement office, separate from the Town of Perinton that surrounds it. Electrical work inside village limits needs a permit filed with the village. Fairport is one of the few Monroe County municipalities with a village-owned electric utility (Fairport Electric, part of the Fairport Municipal Commission), which has to be coordinated for any service change. The village approves third-party electrical inspection agencies. The Code Enforcement office at [number being verified] confirms the current approved agency list, fees, and homeowner-self-work rules."
  },

  whatItMeans: {
    en: "Fairport is one of two Monroe County villages (Fairport and Spencerport) that operates a municipal electric utility. That adds an extra coordination step on top of the typical permit process.\n\nJurisdictional boundary. A property with a Fairport, NY 14450 mailing address can sit inside the village (under village Code Enforcement) or outside the village in the Town of Perinton (under Perinton's Building Department). The two offices are separate and do not share permit files. The Monroe County Real Property Portal confirms which jurisdiction governs a specific address before the application is filed.\n\nWhen a permit is required. Any install, alteration, or repair to lighting, heating, cooling, power, or signal systems inside village limits requires a village electrical permit. Like-for-like fixture swaps generally do not. Panel replacements, new circuits, service upgrades, EV charger installs, and pool wiring all require the permit.\n\nFairport Electric coordination. Any job that involves a service change — a new panel, a service upgrade from 100A to 200A, a new meter, or restoration after a major panel replacement — requires coordination with Fairport Electric at [number being verified]. Fairport Electric owns the meter and the lateral connection from the street. The village utility operates independently from RG&E and has its own service procedures.\n\nApproved inspection agencies. The village's current approved list is maintained by the Code Enforcement office at [number being verified]. The regional standard in Monroe County is NYEIA, MDIA, and Commonwealth; Fairport typically accepts all three, but the current list should be confirmed before filing.\n\nContractor insurance. Electricians working in the village need current general liability insurance and workers' compensation coverage under Workers' Compensation Law 10.\n\nHomeowner self-work. The village's public code does not clearly spell out whether homeowners can pull permits and do their own electrical work on an owner-occupied single-family home. The Code Enforcement office confirms the current rule. Village Building Inspector Mark Lenzi is the contact for these questions.\n\nInspection and closeout. After the work is complete, the selected third-party agency performs the inspection against the National Electrical Code (NEC) and the NY Uniform Fire Prevention and Building Code. On approval, the agency issues a Certificate of Compliance to the village. The village files the certificate and coordinates with Fairport Electric to energize new service if applicable.\n\nState protections. Wage theft protections (Labor Law 191 and 193), the Scaffold Law for elevated work (Labor Law 240 and 241(6)), mechanic's liens (Lien Law 3 and 10), and General Business Law 349 for deceptive home-improvement practices apply in Fairport village as statewide. The statewide electrical-residential-ny entry covers those layers."
  },

  example: {
    en: "A Fairport village homeowner wants to install a 100A subpanel in her basement for a home office and a future heat pump. She confirms the address is in village limits via the Monroe County Real Property Portal. Her electrician files a village electrical permit at [number being verified], does the work, and an approved third-party agency inspects. The agency issues the Certificate of Compliance, which the village files. Because the work does not change the main service, Fairport Electric coordination is limited to a notification rather than a full service change."
  },

  whoQualifies: {
    en: [
      "A property owner or electrician doing residential electrical work inside the Village of Fairport.",
      "A property owner with a Fairport, NY 14450 mailing address who is confirming whether the parcel sits in village limits or in the Town of Perinton.",
      "A homeowner planning a service upgrade who needs to coordinate with Fairport Electric separately from RG&E.",
      "An electrician new to Fairport village who needs to coordinate with an approved inspection agency and with the village-owned utility."
    ]
  },

  yourRights: {
    en: [
      "A property owner has the right to clear guidance from village Code Enforcement on permit scope and the approved inspection agency list.",
      "A property owner has the right to a clear answer on jurisdiction — Fairport village or Town of Perinton — for a specific address.",
      "A property owner has the right to coordinate service changes directly with Fairport Electric at (585) 223-9500.",
      "State worker protections — wage, safety, injury — apply in Fairport village as statewide.",
      "A property owner has the right to dispute a deceptive electrical contractor under General Business Law 349."
    ]
  },

  legalOptions: {
    en: [
      "The Village Building and Code Enforcement office at (585) 421-3207 handles electrical permits for village-limit addresses.",
      "Fairport Electric at (585) 223-9500 coordinates service changes, new meters, and post-panel-replacement energizing.",
      "The approved third-party inspection agencies issue the Certificate of Compliance; the village files it.",
      "For addresses outside village limits, the Town of Perinton Building Department handles the permit.",
      "For wage or injury issues on an electrical job, the statewide electrical-residential-ny entry covers state-level channels."
    ]
  },

  counsel: [{
    type: "free",
    name: "Village of Fairport Building and Code Enforcement",
    focus: "Electrical permits, code compliance, utility coordination",
    qualifier: "Residents and contractors inside the Village",
    access: "31 South Main Street; phone; email mjl@fairportny.com; hours M-F 8am-4pm",
    outcome: "Permit issuance, agency coordination, code guidance",
    phone: "",
    url: "https://www.village.fairport.ny.us/departments/building_planning___zoning_code_enforcement/",
    verified: true, bilingual: false, languages: ["en"]
  }],

  relatedIds: ["electrical-residential-ny", "electrical-residential-ny-mon-perinton-town"],
  relatedHelpResources: [],
  tags: ["trades", "electrical", "fairport", "monroe county", "municipal electric", "village ordinance", "village boundary"],
  sources: ["https://www.village.fairport.ny.us/departments/building_planning___zoning_code_enforcement/", "https://ecode360.com/10645596"],
  lastVerified: "2026-04-23",
  volatility: "moderate", emergencyFlag: false, disclaimer: true, categoryDisclaimer: null
};
