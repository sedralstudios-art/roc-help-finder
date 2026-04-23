export const ELECTRICAL_RESIDENTIAL_NY_MON_WHEATLAND_TOWN = {
  id: "electrical-residential-ny-mon-wheatland-town",
  category: "trades",
  tier: "town",
  jurisdiction: "us-ny-monroe-wheatland-town",
  authorityType: "local-ordinance",
  status: "active",

  title: { en: "Residential Electrical Work in the Town of Wheatland — Permits, Approved Inspection Agencies, and the 4x Penalty for Unpermitted Work" },

  summary: {
    en: "Wheatland's Building Department and Fire Marshal handle electrical permits for addresses outside Scottsville village. The town itself does not perform electrical inspections — a third-party agency on the town's recognized list does. The approved list is not posted publicly; the Building Department gives the current list by phone. Wheatland takes unpermitted work seriously: the penalty is four times the normal permit fee plus a $100 stop-work order. The village of Scottsville sits inside Wheatland but runs a separate Code Enforcement office; addresses inside village limits go through Scottsville, not the town."
  },

  whatItMeans: {
    en: "Wheatland is a town in Monroe County that includes the village of Scottsville inside its boundary. The two have separate building offices, which trips up residents who are not sure which jurisdiction handles an address. Wheatland Building Department and the Fire Marshal cover everything outside the village.\n\nApproved inspection agencies. The town requires electrical work to be inspected by a third-party electrical inspection agency on the town's approved list. The official list is not posted online — the Building Department gives it by phone at (585) 889-1553. In practice, the list overlaps with Scottsville's approved agencies: Commonwealth Electrical Inspection Service, NY Board of Fire Underwriters (NYBFU), Genesee Star, NY Atlantic-Inland, and Middle Department Inspection Agency (MDIA). Confirming the current list with the town before scheduling the inspection avoids surprises.\n\nThe 4x penalty. Wheatland is strict. Starting electrical work before pulling a permit costs four times the normal permit fee, plus a $100 stop-work order. The math makes the penalty real: on a $100 permit, doing the work first and applying later costs $500. Pulling the permit first is always the cheaper path.\n\nLicensing. The town does not license electricians. It does require the worker to carry liability insurance and workers' compensation coverage. Homeowner self-work rules are not spelled out on the town's public page; calling the Building Department is the reliable way to check.\n\nPermits. Typical permit-triggering projects in Wheatland: a new service panel or subpanel, new circuits, EV chargers (240V Level 2), generator transfer switches, hot tubs, pool bonding, mini-split heat pumps, and finished basements. Small like-for-like repairs usually do not need a permit, but the Building Department sets the line.\n\nInspection flow. After the work is complete (or at rough-in where required), the homeowner or electrician contacts the chosen agency. The agency inspects the work against the New York State Uniform Fire Prevention and Building Code, which incorporates the National Electrical Code (NEC / NFPA 70). When the work passes, the agency issues a Certificate of Compliance and sends a copy to the town. The town requires that Certificate before issuing the final Certificate of Occupancy.\n\nFire Marshal involvement. Wheatland assigns permit coordination to both the Building Department and the Fire Marshal. For projects with fire-safety components — generator transfer switches, large appliance circuits, commercial-grade installations — the Fire Marshal may review the project alongside the Building Inspector.\n\nScottsville village line. Addresses inside Scottsville village use the village Code Enforcement office, not the town. A property's mailing address (Scottsville, NY 14546) is not the same as jurisdiction. A tax bill or the town assessor confirms which office handles the property.\n\nState floor. The statewide electrical-residential-ny entry covers the state-level worker protections and consumer rules that apply on top of Wheatland's local practice — Scaffold Law, wage theft protections, mechanic's liens, and General Business Law 349 for deceptive contractors. Those apply in Wheatland as they do everywhere in New York."
  },

  example: {
    en: "A homeowner in Wheatland (outside Scottsville village) wants to install a mini-split heat pump with an outdoor condenser. He calls the Wheatland Building Department at (585) 889-1553 for the current approved agency list and picks Commonwealth Electrical Inspection Service. He files the permit first — avoiding the 4x penalty. His electrician installs the indoor unit, the outdoor condenser, and the dedicated circuit. Commonwealth inspects the work and issues a Certificate of Compliance. The town closes the permit."
  },

  whoQualifies: {
    en: [
      "A property owner or contractor doing electrical work in Wheatland outside Scottsville village.",
      "An electrician carrying liability insurance and workers' compensation.",
      "A homeowner considering pulling the electrical permit in their own name; the Building Department is the right call for homeowner-rules confirmation."
    ]
  },

  yourRights: {
    en: [
      "A homeowner has the right to avoid the 4x penalty by pulling the permit before work starts.",
      "A homeowner has the right to the current approved inspection agency list from the Building Department.",
      "A property owner has the right to a clear answer on which jurisdiction (Wheatland or Scottsville) covers the address.",
      "State worker protections — wage, safety, and injury — apply in Wheatland as they do statewide.",
      "A homeowner has the right to dispute deceptive contractor practices under General Business Law 349."
    ]
  },

  legalOptions: {
    en: [
      "The Wheatland Building Department and Fire Marshal handle electrical permits for addresses outside Scottsville village.",
      "Town-recognized third-party agencies inspect the electrical work and issue the Certificate of Compliance.",
      "Starting work without a permit costs four times the normal permit fee plus a $100 stop-work order.",
      "Scottsville village addresses go through the village Code Enforcement office, not the town.",
      "For wage or injury issues on an electrical job, the statewide electrical-residential-ny entry covers state-level options (NYS Department of Labor, OSHA, Workers' Compensation Board)."
    ]
  },

  counsel: [{
    type: "free",
    name: "Town of Wheatland Building Department and Fire Marshal",
    focus: "Electrical permits, approved agency list, code compliance, fire safety",
    qualifier: "Residents and contractors in Wheatland outside Scottsville village",
    access: "22 Main St, Scottsville; phone; hours Mon 8-4 and 6-8, Tue-Thu 8-4, Fri 8-1",
    outcome: "Permit issuance, agency coordination, code guidance",
    phone: "(585) 889-1553",
    url: "https://www.townofwheatland.org/building-department",
    verified: true, bilingual: false, languages: ["en"]
  }],

  relatedIds: ["electrical-residential-ny", "electrical-residential-ny-mon-scottsville-village"],
  relatedHelpResources: [],
  tags: ["trades", "electrical", "wheatland", "monroe county", "4x penalty", "strict permit", "scottsville", "village boundary", "town ordinance"],
  sources: ["https://www.townofwheatland.org/building-department", "https://ecode360.com/10499430"],
  lastVerified: "2026-04-22",
  volatility: "moderate", emergencyFlag: false, disclaimer: true, categoryDisclaimer: null
};
