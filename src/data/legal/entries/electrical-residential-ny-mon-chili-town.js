export const ELECTRICAL_RESIDENTIAL_NY_MON_CHILI_TOWN = {
  id: "electrical-residential-ny-mon-chili-town",
  category: "trades",
  tier: "town",
  jurisdiction: "us-ny-monroe-chili-town",
  authorityType: "local-ordinance",
  status: "active",

  title: { en: "Residential Electrical Work in the Town of Chili — Agency Licensing Under Chapter 248" },

  summary: {
    en: "Chili takes an unusual approach in Monroe County. The town does not license individual electricians, but it does license the Electrical Inspection Agencies that operate inside the town. Only agencies holding a current annual Chili license can inspect electrical work at a Chili address. Town Code Chapter 248 sets the framework. Building permits run through CloudPermit. The Building Department at (585) 889-6143 holds the current list of licensed agencies. Chili also licenses plumbers through a separate chapter, which is unusual — most Monroe County towns license neither trade."
  },

  whatItMeans: {
    en: "Chili's electrical rule is the inverse of many towns. Most towns approve inspection agencies loosely. Chili runs a formal licensing program under Town Code Chapter 248 (adopted 1985). An agency that wants to inspect electrical work in Chili has to apply, pay the annual fee, maintain insurance, and stay on the current licensed list. An inspection by an agency that is not on the current Chili list does not get accepted by the town, even if the agency is approved elsewhere in Monroe County.\n\nBefore starting any electrical wiring. The homeowner or the contractor files an application with the town's Electrical Inspector and picks from the currently licensed agencies. Calling the Building Department at (585) 889-6143 confirms the active list. The active list is not always posted online; calling ahead is the reliable way to check.\n\nPermit triggers. Typical permit-triggering projects: a new service panel or subpanel, new circuits, EV chargers (240V Level 2), generator transfer switches, hot tubs, pool bonding, mini-split installations, and finished basements. Small like-for-like repairs usually do not need a permit, but the Building Department sets the line.\n\nContractor insurance. Electricians working in Chili need current general liability insurance and workers' compensation coverage. The town or the inspection agency may require proof.\n\nInspection flow. The licensed agency inspects the installation against the NY State Uniform Fire Prevention and Building Code, which incorporates the National Electrical Code (NEC / NFPA 70). When the work passes, the agency issues a Certificate of Compliance and sends a copy to the town. The town code enforcement officer uses the CoC to close the permit.\n\nPower-on. Electricity cannot be turned on until the inspector issues at least a temporary certificate. The final CoC triggers the occupancy sign-off for larger projects.\n\nHomeowner self-work. Whether a homeowner can perform electrical work on a home they own and occupy in Chili is not fully spelled out in the posted code. The default New York rule allows it with a permit and inspection, but the town office has the final word for Chili-specific practice. Calling the Building Department before starting avoids surprises.\n\nBuilding permits through CloudPermit. Chili uses CloudPermit for building permit applications. The same portal handles the application side; the inspection side runs through the licensed agency.\n\nPlumber licensing in parallel. Chili is unusual in running a separate plumber licensing chapter on top of the electrical agency licensing. A contractor working both trades often has to track both programs.\n\nFailed inspection or unpermitted work. The Town Code Enforcement Officer can require corrections, tear-out, or a full redo when work was done without a permit or does not meet code. Unpermitted electrical work can block a future certificate of occupancy check and can surface at resale.\n\nState-level rules. Wage theft protections (Labor Law 191 and 193), the Scaffold Law for elevated work (LL 240 and 241(6)), mechanic's liens for unpaid work (Lien Law 3 and 10), and General Business Law 349 for deceptive contractors apply in Chili as they do statewide. The electrical-residential-ny entry covers those layers."
  },

  example: {
    en: "A Chili homeowner wants to install an EV charger. She calls the Chili Building Department at (585) 889-6143 to ask which inspection agencies currently hold a Chili license. The town gives her the list. She picks one from the list. Her electrician files a permit through CloudPermit and does the install. The licensed agency inspects the circuit, the panel tap, and the charger itself. Only after the agency's final Certificate of Compliance does the town issue the occupancy sign-off."
  },

  whoQualifies: {
    en: [
      "A property owner or contractor doing electrical work inside the Town of Chili.",
      "An electrician using a Chili-licensed Inspection Agency.",
      "A homeowner considering self-work; calling the Building Department confirms the rules."
    ]
  },

  yourRights: {
    en: [
      "A homeowner has the right to pick from the current Chili-licensed Electrical Inspection Agencies.",
      "A property owner has the right to clear guidance from the Building Department on which agencies are licensed.",
      "State worker protections — wage, safety, injury — apply in Chili as they do statewide.",
      "A property owner has the right to dispute a deceptive contractor under General Business Law 349."
    ]
  },

  legalOptions: {
    en: [
      "The Chili Building Department handles agency licensing (Chapter 248), electrical permits, and occupancy sign-offs.",
      "Only agencies currently holding a Chili license can inspect electrical work in Chili.",
      "Building permits are filed through CloudPermit.",
      "For wage or injury issues on an electrical job, the statewide electrical-residential-ny entry covers state-level channels."
    ]
  },

  counsel: [{
    type: "free",
    name: "Town of Chili Building Department",
    focus: "Electrical inspection agency licensing, permits, code compliance",
    qualifier: "Residents and contractors working in Chili",
    access: "3333 Chili Ave; phone; email building@chiliny.gov",
    outcome: "Licensed-agency list, permit issuance, code guidance",
    phone: "(585) 889-6143",
    url: "https://www.chiliny.gov/202/Building-Department",
    verified: true, bilingual: false, languages: ["en"]
  }],

  relatedIds: ["electrical-residential-ny"],
  relatedHelpResources: [],
  tags: ["trades", "electrical", "chili", "monroe county", "inspection agency license", "chapter 248", "CloudPermit", "town ordinance"],
  sources: ["https://www.chiliny.gov/202/Building-Department", "https://ecode360.com/12423687"],
  lastVerified: "2026-04-23",
  volatility: "moderate", emergencyFlag: false, disclaimer: true, categoryDisclaimer: null
};
