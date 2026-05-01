export const HVAC_RESIDENTIAL_NY = {
  id: "hvac-residential-ny",
  category: "trades",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY EXC 377",
  status: "active",

  // ─── Anchor fields (see src/data/legal/ANCHORS.md) ───
  // Topic anchor for the HVAC trades cluster — 21 town variants
  // (hvac-residential-ny-mon-*) reference this entry via statuteAnchor.
  // The renderer pulls this anchor's whatItMeans before each town entry's
  // own whatItMeans so town entries can stay short and town-specific while
  // the state framework (codes, EPA 608, gas-line-as-plumbing) lives in
  // ONE canonical place. lastFormallyReviewed is provisional — grounded in
  // WebSearch corroboration, pending attorney sign-off.
  isAnchor: true,
  anchorSource: {
    // §377 is the section that creates the NY Uniform Fire Prevention and
    // Building Code itself. (§378 lists subjects the Code must address;
    // §379 governs local-government authority to adopt stricter standards.
    // Earlier provisional draft cited §379 as adoption — corrected per
    // expert review 2026-05-01.) NYS Senate bot-blocks 403; phone capture
    // pending.
    url: "https://www.nysenate.gov/legislation/laws/EXC/377",
    hash: "",
    lastFetched: ""
  },
  lastFormallyReviewed: "2026-05-01",
  formallyReviewedBy: "Anthony DiMarzo + WebSearch corroboration + two rounds of expert review 2026-05-01: (Round 1) NYC exemption + §378/§379 misattribution + RCNYS scope. (Round 2) GBL § 349(h) damages structure (actual + $50 floor + capped treble + fees, per Hobish v. AXA 2025; FAIR Business Practices Act expansion is AG-only); NYSERDA role corrected (Code adopted by Code Council under DOS, written into 19 NYCRR Part 1240, published by ICC; NYSERDA does training + voluntary NYStretch); Scaffold Law homeowner exemption added (1-2 family owners not directing/controlling work); plus refinements: § 374 Council establishment cite, 40 CFR Part 82 Subpart F precision, suspended fossil-fuel ban (Part 1240.6) noted, Amanda's Law CO alarm requirement upgraded from 'some installations' to near-universal, gas-piping rule marked as locally varying, Nassau/Suffolk small claims $5k added. Provisional, pending attorney sign-off.",
  pendingLegislation: null,
  sourceChangedSince: null,

  title: { en: "Residential HVAC Work in New York — Permits, Gas-Line Rules, Energy Code, and Worker Protections" },

  summary: {
    en: "NY sets the statewide floor for residential heating, ventilation, and air-conditioning work — outside NYC, which has its own separate Construction Codes. The NY Uniform Fire Prevention and Building Code (created under NY Executive Law § 377, with the State Fire Prevention and Building Code Council operating under Article 18) governs the work. For one- and two-family homes, the Residential Code of NY State (RCNYS) is the primary book; for larger buildings, the standalone Mechanical Code (MCNYS) and Fuel Gas Code (FGCNYS) apply. The 2025 Energy Code took effect December 31, 2025 — permits filed after that date have to meet the stricter rules. There is no statewide HVAC contractor license. Licensing is local. Gas piping from the meter to the furnace requires a licensed plumber. Any worker handling refrigerant needs federal EPA Section 608 certification. Town Building Inspectors handle HVAC inspections directly; unlike electrical, third-party agencies are not used for HVAC."
  },

  whatItMeans: {
    en: "HVAC work on homes in New York State has to follow the NY Uniform Fire Prevention and Building Code. (NYC has its own separate Construction Codes — this entry covers the rest of the state.) The Uniform Code is run by the State Fire Prevention and Building Code Council, which operates under Article 18 of NY Executive Law. The Council itself is established under § 374; the Code is formulated under § 377; § 378 lists the subjects the Code must cover; § 379 lets local governments adopt stricter standards but not weaker ones.\n\nWhich book applies to a particular job depends on the building. For one- and two-family homes — by far the most common type — the rules come from the Residential Code of NY State (RCNYS), which has its own chapters for mechanical and fuel-gas work. Larger buildings (apartment buildings above three units, commercial properties) follow the standalone Mechanical Code of NY State (MCNYS) and Fuel Gas Code of NY State (FGCNYS). All three books sit under the same Uniform Code framework.\n\nEnergy code (ECCCNYS). The Energy Conservation Construction Code of New York State applies on top of the mechanical code. The 2025 version took effect December 31, 2025, with stricter efficiency requirements. Any HVAC permit filed after that date has to meet the 2025 rules. For furnaces, AC systems, and heat pumps, the code drives minimum efficiency ratings (AFUE, SEER, HSPF) and sets duct sealing and insulation requirements. The Energy Code is adopted by the State Fire Prevention and Building Code Council under the Department of State and is written into 19 NYCRR Part 1240; the official book is published by the International Code Council. NYSERDA — the NY State Energy Research and Development Authority — produces training materials and the voluntary NYStretch supplement, but it does not publish the Code itself.\n\nFossil-fuel ban (suspended). The 2025 Energy Code includes a ban on installing fossil-fuel equipment in NEW buildings, with limited exceptions (written into 19 NYCRR Part 1240.6). The ban does not apply to replacing existing equipment in an existing home — so an oil-to-gas furnace swap on an existing house is unaffected. As of late 2025 the new-construction ban is suspended by court order and not being enforced; the rule remains on the books pending the litigation outcome.\n\nNo statewide HVAC license. New York does not issue a general HVAC contractor license. Licensing is local, and most Monroe County towns do not license HVAC contractors at all. Most NY municipalities (including NYC and most Monroe County towns) require a licensed plumber for any gas piping work — the gas line from the meter to the furnace is treated as plumbing. An HVAC tech can usually set and connect the furnace itself but cannot run the gas pipe in those municipalities. The rule varies — a few NY counties (Putnam is one example) allow a licensed mechanical tradesperson to run gas piping. The local town code office is the source of truth.\n\nEPA refrigerant handling (40 CFR Part 82, Subpart F). Any worker who handles refrigerant — installation, service, recovery — has to hold federal EPA Section 608 certification. There are several types (Type I for small appliances, Type II for high-pressure systems, Type III for low-pressure chillers, and Universal). Certification is a one-time federal requirement with no renewal. Improper refrigerant release is a federal violation enforced by the EPA.\n\nInspections. HVAC inspections are handled by the town Building Inspector directly. This is different from electrical work in New York, which uses third-party agencies. An HVAC permit is pulled at the Town Building Department; the inspector signs off after rough-in and final.\n\nCombustion appliance safety and CO alarms. Gas and oil furnaces, boilers, and water heaters require proper venting and a clear combustion-air path. Under Amanda's Law (NY Executive Law § 378(5-a)), every NY residence with a fuel-burning appliance or an attached garage must have a working carbon monoxide alarm — this is essentially every home with a furnace, boiler, or water heater. The code also addresses chimney condition for a new appliance that uses an existing flue; a chimney inspection often has to be part of the permit package.\n\nPermits. Typical permit-triggering HVAC projects: a new furnace, boiler, or AC system; a new gas line or gas pipe extension (plumbing permit); a heat pump installation; a mini-split; a new ductwork run; and a fuel-source change (oil to gas, for example). Small like-for-like repairs usually do not need a permit, but the town sets the line.\n\nHomeowner work. In most upstate towns, a homeowner can do HVAC work on a home they own and live in. A permit and inspection are still required, the licensed-plumber rule for gas piping still applies in towns that require one, and EPA Section 608 certification is still required to handle refrigerant. NYC does not allow homeowner HVAC work.\n\nWorker protections. Labor Law 191 requires timely payment of wages. Labor Law 193 bans most paycheck deductions. Wage protections apply to workers paid in cash, by check, or off the books, and regardless of immigration status. Calling a regular helper a '1099 contractor' does not make the helper a contractor when the work looks like employment.\n\nScaffold Law and the homeowner exemption. The Scaffold Law (Labor Law § 240 and § 241(6)) makes contractors strictly liable to their workers for elevated-work injuries — which includes a rooftop unit install. But both sections carve out a critical exception for homeowners: an owner of a one- or two-family dwelling who hires a contractor and does not direct or control the work is generally NOT liable to the contractor's workers. The contractor remains strictly liable. The exemption does not apply if the owner directed or controlled the work, or if the home is used commercially.\n\nConsumer protection (GBL § 349). A contractor who lies about licensing, EPA 608 certification, or equipment efficiency can be sued under General Business Law § 349. The damages structure has three layers under § 349(h): (1) actual damages, with a $50 floor (statutory minimum) when actual damages are smaller; (2) discretionary treble (3x) damages capped at $1,000, available only if the court finds the violation was willful or knowing; and (3) reasonable attorney's fees at the court's discretion. The NY Court of Appeals reaffirmed this layered structure in Hobish v. AXA Equitable Life (Jan. 2025). The FAIR Business Practices Act, signed Dec. 19, 2025 and effective Feb. 17, 2026, expanded § 349 to cover 'unfair' and 'abusive' acts — but only for Attorney General enforcement; private-right-of-action damages did not change. The Attorney General's Consumer Frauds Bureau also investigates patterns of deceptive practices.\n\nUnpaid work. An HVAC worker or subcontractor who has not been paid can file a mechanic's lien against the property under Lien Law § 3 and § 10 — 4 months on a single-family home, 8 months on other buildings."
  },

  example: {
    en: "A homeowner in a Monroe County suburb wants to replace an old oil furnace with a new high-efficiency gas furnace. This is a big job. The homeowner needs: (1) a mechanical permit from the town for the furnace; (2) a plumbing permit for the gas line, pulled by a licensed plumber; (3) a chimney review to confirm the existing flue is safe to reuse; and (4) inspections after install. The town Building Inspector — not a third-party agency — performs the inspection. Because the permit is filed after December 31, 2025, the new furnace has to meet the 2025 Energy Code efficiency rules."
  },

  whoQualifies: {
    en: [
      "Any person doing HVAC work on a home in New York, including a homeowner doing their own work outside of NYC.",
      "HVAC contractors, their workers, day laborers, and subcontractors — state worker protections apply.",
      "Workers paid in cash, by check, or off the books — wage laws apply the same way.",
      "Workers without work authorization — New York wage protections apply the same as for any other worker.",
      "Anyone handling refrigerant — EPA Section 608 certification is required by federal law."
    ]
  },

  yourRights: {
    en: [
      "A worker has the right to be paid for hours worked under Labor Law 191 and 193, even without a written contract.",
      "A worker has the right to safe working conditions; the Scaffold Law (Labor Law § 240 and § 241(6)) makes the contractor strictly liable for elevated-work injuries. A homeowner of a one- or two-family dwelling who does not direct or control the work is generally exempt; the contractor remains liable.",
      "An injured worker has the right to workers' compensation — even when the contractor failed to carry coverage.",
      "A worker called a '1099 contractor' by an employer can challenge the label and recover unpaid wages when the work was really employment.",
      "A worker has the right to file a wage theft complaint without retaliation, regardless of immigration status.",
      "A homeowner has the right to perform HVAC work on a home they own and occupy outside of NYC, with a permit and inspection (and a licensed plumber for gas piping).",
      "A homeowner has the right to dispute a bad HVAC job through consumer protection channels, including General Business Law 349 for deceptive contractors."
    ]
  },

  legalOptions: {
    en: [
      "The NY Department of Labor (dol.ny.gov/wage-theft-hub) takes complaints about unpaid HVAC wages.",
      "An HVAC worker or subcontractor who was not paid can file a mechanic's lien against the property (Lien Law 3 and 10) — 4 months on a single-family home, 8 months on other buildings.",
      "Small claims court handles disputes up to $5,000 in Rochester City Court (and Nassau/Suffolk District Courts) and up to $3,000 in town or village court. NYC Civil Court small claims is $10,000.",
      "The NY Workers' Compensation Board takes injury claims even when the employer failed to carry coverage.",
      "OSHA takes safety complaints, including anonymous ones. HVAC work involves refrigerant exposure, electrical hazards, confined spaces, falls, and carbon monoxide risks.",
      "A consumer who hired a contractor who lied about licensing, certification, or equipment efficiency can sue under General Business Law § 349(h). Remedies are layered: actual damages (with a $50 statutory floor when actual damages are smaller); discretionary treble damages capped at $1,000 IF the court finds the violation was willful or knowing; and reasonable attorney's fees at the court's discretion.",
      "Refrigerant spills or improper handling can be reported to the federal EPA at epa.gov/section608.",
      "If work failed inspection or was done without a permit, the Town Code Enforcement Officer can require corrections, tear-out, or a full redo before the house can pass a final inspection or certificate of occupancy check."
    ]
  },

  counsel: [
    {
      type: "free",
      name: "Worker Justice Center of New York",
      focus: "Wage theft, misclassification, and unpaid wages in construction and trades",
      qualifier: "Low-income workers; services available regardless of immigration status",
      access: "Walk-in and by appointment; Spanish and English",
      outcome: "Claim filing assistance, legal representation, worker education",
      phone: "(585) 325-3050",
      url: "https://www.wjcny.org",
      verified: true,
      bilingual: true,
      languages: ["en", "es"]
    },
    {
      type: "free",
      name: "Legal Assistance of Western New York (LawNY)",
      focus: "Civil legal aid for low-income residents including employment and wage issues",
      qualifier: "Income-eligible residents of Monroe and surrounding counties",
      access: "Phone intake and online application",
      outcome: "Advice, brief services, and full representation depending on the case",
      phone: "(585) 325-2520",
      url: "https://www.lawny.org",
      verified: true,
      bilingual: false,
      languages: ["en"]
    },
    {
      type: "free",
      name: "NYS Department of Labor — Division of Labor Standards",
      focus: "Unpaid wages and wage theft complaints across all industries",
      qualifier: "Any worker in New York, regardless of immigration or licensing status",
      access: "Online complaint form or phone intake",
      outcome: "State investigation and potential recovery of unpaid wages",
      phone: "(888) 469-7365",
      url: "https://dol.ny.gov/wage-theft-hub",
      verified: true,
      bilingual: true,
      languages: ["en", "es"]
    },
    {
      type: "free",
      name: "NYS Attorney General — Consumer Frauds Bureau",
      focus: "Deceptive contractor practices, unlicensed work, false claims about certifications",
      qualifier: "Any New York consumer",
      access: "Online complaint form; phone intake",
      outcome: "State investigation and possible enforcement action",
      phone: "(800) 771-7755",
      url: "https://ag.ny.gov/consumer-frauds",
      verified: true,
      bilingual: true,
      languages: ["en", "es"]
    }
  ],

  relatedIds: ["roofing-residential-ny", "plumbing-residential-ny", "electrical-residential-ny"],
  relatedHelpResources: [],

  tags: [
    "trades", "HVAC", "heating", "cooling", "furnace", "air conditioning",
    "heat pump", "mini-split", "refrigerant", "EPA Section 608",
    "gas line", "energy code", "ECCCNYS",
    "permit", "wage theft", "mechanic lien"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/EXC/377",
    "https://www.nysenate.gov/legislation/laws/EXC/378",
    "https://www.nysenate.gov/legislation/laws/EXC/379",
    "https://www.nysenate.gov/legislation/laws/EXC/A18",
    "https://dos.ny.gov/building-standards-and-codes",
    "https://www.nysenate.gov/legislation/laws/LAB/191",
    "https://www.nysenate.gov/legislation/laws/LAB/193",
    "https://www.nysenate.gov/legislation/laws/LIE/3",
    "https://www.nysenate.gov/legislation/laws/GBS/349",
    "https://www.epa.gov/section608/section-608-technician-certification-requirements",
    "https://www.nyserda.ny.gov/All-Programs/Energy-Code",
    "https://dol.ny.gov/wage-theft-hub"
  ],

  lastVerified: "2026-05-01",
  factCheckedBy: { tool: "websearch+expert-review", date: "2026-05-01" },
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
