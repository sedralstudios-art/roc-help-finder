export const ELECTRICAL_RESIDENTIAL_NY_MON_HILTON_VILLAGE = {
  id: "electrical-residential-ny-mon-hilton-village",
  category: "trades",
  tier: "village",
  jurisdiction: "us-ny-monroe-hilton-village",
  authorityType: "local-ordinance",
  status: "active",

  title: { en: "Residential Electrical Work in the Village of Hilton — Permits, Approved Inspection Agencies, and the Parma Town Boundary" },

  summary: {
    en: "The Village of Hilton has its own Code Enforcement Officer who handles electrical permits for addresses inside village limits. NYEIA is confirmed as an approved inspection agency; the Building Department confirms the current list of other accepted agencies. Hilton sits inside the Town of Parma, but the two run separate Building Departments. Confirming which jurisdiction covers a specific address — through the tax assessor or the village office — avoids filing in the wrong place. The Code Enforcement Officer also serves as Fire Marshal."
  },

  whatItMeans: {
    en: "Hilton village runs its own Code Enforcement office inside the Town of Parma. The village Code Enforcement Officer — currently Mark Mazzucco — also serves as Fire Marshal. The village administers the NY State Uniform Fire Prevention and Building Code directly for properties inside village limits.\n\nPermit triggers. Typical permit-triggering projects: a new service panel or subpanel, new circuits, EV chargers (240V Level 2), generator transfer switches, hot tubs, pool bonding, mini-split heat pumps, and finished basements. Small like-for-like repairs (swapping a receptacle) generally do not need a permit, but the Building Department sets the line.\n\nApproved inspection agencies. NYEIA (New York Electrical Inspection Agency) is explicitly listed as an inspector for the Village of Hilton. Whether other agencies (Commonwealth, MDIA, Genesee Star, NY Atlantic-Inland, NYBFU) are accepted is not published on the village page; calling [number being verified] ext 106 confirms the current approved list.\n\nContractor insurance. Electricians working in the village need current general liability insurance and workers' compensation coverage. The village and the agency typically ask for proof.\n\nHomeowner self-work. Whether a homeowner can perform electrical work on a home they own and occupy is not fully spelled out in the posted code. The default New York rule permits it with a permit and inspection, but the village office has the final word for Hilton-specific practice.\n\nInspection flow. The homeowner or contractor schedules the inspection through the chosen approved agency. The agency inspects the work against the NY State Uniform Fire Prevention and Building Code, which incorporates the National Electrical Code (NEC / NFPA 70). When the work passes, the agency issues a Certificate of Compliance and sends a copy to the village. The village Code Enforcement Officer uses the CoC to close the permit.\n\nFire Marshal overlap. Because the Code Enforcement Officer also serves as Fire Marshal, projects with fire-safety components — a generator transfer switch, a dedicated circuit near a fire-rated wall, commercial-grade installations — may see the fire safety layer reviewed at the same time.\n\nVillage versus town boundary. The Town of Parma surrounds Hilton. A property inside the village goes through the Hilton Building Department. A property outside the village goes through the Parma Building Department at [number being verified]. Mailing address is not the same as jurisdiction — 'Hilton, NY 14468' covers both village and non-village properties. The tax assessor or the town assessor confirms which office handles a specific address. The electrical-residential-ny-mon-parma-town entry covers the town side.\n\nFailed inspection or unpermitted work. The village Code Enforcement Officer can require corrections, tear-out, or a full redo when work was done without a permit or does not meet code.\n\nState-level rules. Wage theft protections (Labor Law 191 and 193), the Scaffold Law (LL 240 and 241(6)), mechanic's liens for unpaid work (Lien Law 3 and 10), and General Business Law 349 for deceptive contractors apply in Hilton as they do statewide."
  },

  example: {
    en: "A homeowner inside Hilton village wants to install an EV charger. He calls the village Code Enforcement Officer at [number being verified] ext 106 to confirm the permit requirements. He files a village permit. His electrician does the install, including the panel tap and dedicated circuit. NYEIA inspects and issues the Certificate of Compliance. The village Code Enforcement Officer uses the CoC to close the permit."
  },

  whoQualifies: {
    en: [
      "A property owner or contractor doing electrical work inside the Village of Hilton.",
      "An electrician with current general liability and workers' compensation insurance.",
      "A homeowner considering self-work; calling the village office confirms the rules.",
      "A property owner unsure whether the address is inside village limits or in the surrounding Town of Parma."
    ]
  },

  yourRights: {
    en: [
      "A property owner has the right to clear guidance from the village Code Enforcement Officer.",
      "A property owner has the right to a clear answer on which jurisdiction (Hilton village or Parma town) covers the address.",
      "A property owner has the right to the current approved inspection agency list from the village.",
      "State worker protections — wage, safety, injury — apply in Hilton as they do statewide.",
      "A property owner has the right to dispute a deceptive contractor under General Business Law 349."
    ]
  },

  legalOptions: {
    en: [
      "The Village of Hilton Code Enforcement office handles electrical permits inside the village.",
      "NYEIA is confirmed as an approved inspection agency; the village confirms other accepted agencies on request.",
      "For Parma addresses outside the village, the Parma Building Department handles the permit. The electrical-residential-ny-mon-parma-town entry covers those rules.",
      "For wage or injury issues on an electrical job, the statewide electrical-residential-ny entry covers state-level channels."
    ]
  },

  counsel: [{
    type: "free",
    name: "Village of Hilton Building Department",
    focus: "Electrical permits, inspection agency coordination, code compliance",
    qualifier: "Residents and contractors inside the Village",
    access: "59 Henry St; phone; email mark@hiltonny.org",
    outcome: "Permit issuance, agency coordination, code guidance",
    phone: "",
    url: "https://hiltonny.gov/html/building-dept.html",
    verified: true, bilingual: false, languages: ["en"]
  }],

  relatedIds: ["electrical-residential-ny", "electrical-residential-ny-mon-parma-town"],
  relatedHelpResources: [],
  tags: ["trades", "electrical", "hilton", "monroe county", "NYEIA", "parma", "village boundary", "village ordinance"],
  sources: ["https://hiltonny.gov/html/building-dept.html"],
  lastVerified: "2026-04-23",
  volatility: "moderate", emergencyFlag: false, disclaimer: true, categoryDisclaimer: null
};
