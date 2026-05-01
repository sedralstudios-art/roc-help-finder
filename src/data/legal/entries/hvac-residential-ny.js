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
  reviewTier: "anchor-reviewed",
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
  formallyReviewedBy: "Anthony DiMarzo + WebSearch + R1–R3 expert review (2026-05-01). Provisional, pending attorney sign-off. Round-by-round detail: src/data/legal/anchor-reviews/hvac-residential-ny.md.",
  pendingLegislation: null,
  sourceChangedSince: null,

  title: { en: "Residential HVAC Work in New York — Permits, Gas-Line Rules, Energy Code, and Worker Protections" },

  summary: {
    en: "NY State sets the basic rules for heating, ventilation, and air-conditioning work on homes — except in NYC, which has its own separate building rules. For single-family houses and duplexes, the Residential Code of NY State is the main rulebook. For apartment buildings and commercial properties, separate Mechanical and Fuel Gas Codes apply. A new energy code took effect December 31, 2025 with stricter efficiency rules for new equipment. NY does not have a statewide HVAC contractor license — licensing is done by each town or village. The gas line between the meter and the furnace counts as plumbing in most towns, so a licensed plumber is needed for that part of the job. Anyone working with refrigerant needs federal EPA Section 608 certification. Town building inspectors do HVAC inspections directly, unlike electrical work which uses outside inspection agencies."
  },

  whatItMeans: {
    en: "HVAC stands for heating, ventilation, and air conditioning. Anyone replacing or installing a furnace, boiler, AC unit, or heat pump on a home in NY State has to follow the NY Uniform Fire Prevention and Building Code. NYC has its own separate building rules, so this Code covers everywhere outside NYC. The Code is decided by a state board called the Code Council. Local towns and villages can add stricter rules of their own but cannot make the rules looser than the state minimum.\n\nDifferent parts of the Code apply to different buildings. For single-family houses, two-family houses (duplexes), and townhouses up to three stories — the most common types — the rules are in the Residential Code of NY State (RCNYS for short). For larger apartment buildings and commercial properties, the standalone Mechanical Code and Fuel Gas Code apply instead. All three rulebooks belong to the same overall Uniform Code.\n\nEnergy code. NY has a separate energy code on top of the building rules — the Energy Conservation Construction Code of NY State (ECCCNYS). The 2025 version took effect December 31, 2025. Any HVAC permit filed after that date has to meet the stricter 2025 rules. New furnaces, AC units, and heat pumps have minimum efficiency ratings (AFUE, SEER, HSPF — the labels on the equipment). The code also requires sealing ductwork and adding insulation. The Department of State publishes the rule book in 19 NYCRR Part 1240; the Code Council adopts it. NYSERDA (NY State Energy Research and Development Authority) helps DOS develop the energy codes under the 2022 Advanced Building Codes Act, runs training, and publishes a stricter optional code called NYStretch.\n\nFossil-fuel ban (currently on hold). The 2025 energy code includes a ban on installing new fossil-fuel equipment — gas furnaces, oil furnaces, gas water heaters — in NEW buildings, with some exceptions. The ban does NOT cover replacements in existing homes. Swapping an old oil furnace for a new gas furnace in an existing house is allowed. As of late 2025 NY agreed to pause the new-construction ban while a federal lawsuit (Mulhern Gas Co. v. Mosley) goes through appeal. The rule is still on the books but is not being enforced.\n\nNo state HVAC license. NY does not have a single statewide license for HVAC contractors. Each town or village decides whether to license HVAC contractors. Most Monroe County towns do not license them. What most NY towns DO require is a licensed plumber for the gas line — the gas pipe between the meter and the furnace counts as plumbing, not HVAC. In towns that follow this rule, the HVAC tech can set the furnace, connect the ductwork, and connect electrical, but the gas line itself is the plumber's job. A few NY counties (Putnam County is one example) let licensed mechanical tradespeople run gas. The local town code office is the answer for any specific town.\n\nRefrigerant handling. Anyone who works with the refrigerant inside an AC, heat pump, or commercial chiller (installing, fixing, or recovering it) has to hold federal EPA Section 608 certification. Four types: Type I (small appliances), Type II (high-pressure systems), Type III (low-pressure chillers), and Universal. The federal rule is 40 CFR Part 82, Subpart F. Section 608 is one-time and lifetime — no renewal. Releasing refrigerant into the air is a federal violation that the EPA enforces.\n\nInspections. Town building inspectors do HVAC inspections directly. Electrical work is different: in most NY towns, the contractor or homeowner has to hire a third-party electrical inspector from the town's approved list and pay the inspector directly. The town does not arrange or pay for the electrical inspection. An HVAC permit is filed at the Town Building Department. The inspector signs off twice: at rough-in (the middle of the job) and at final (after the work is finished).\n\nCombustion safety and CO alarms. Gas and oil furnaces, boilers, and water heaters need correct venting and a clear path for combustion air. Under Amanda's Law (NY Executive Law section 378(5-a)), every NY home with a fuel-burning appliance — or with an attached garage — has to have a working carbon monoxide (CO) alarm. That covers nearly every home, since most homes have at least a furnace, boiler, or water heater. When a new appliance shares an existing chimney, the code often requires a chimney inspection as part of the permit.\n\nWhich projects need a permit. Typical permit-triggering HVAC work: a new furnace, boiler, or AC; a new gas line or extension (plumbing permit); a heat pump or mini-split install; new ductwork; and a fuel-source change like oil to gas. Small like-for-like repairs usually do not need a permit. Each town sets that line.\n\nHomeowner work. In most upstate NY towns, a homeowner can do HVAC work on a home they own and live in. A permit and inspection are still required. In towns where gas piping requires a licensed plumber, that rule still applies. Refrigerant work still requires Section 608 certification. NYC does not allow homeowner HVAC work.\n\nWorker pay rules. NY Labor Law section 191 sets when wages have to be paid. Section 193 limits what an employer can deduct from a paycheck. These protections apply to workers paid in cash, by check, or off the books. They apply regardless of immigration status. Calling a regular helper a '1099 contractor' does not actually make them an independent contractor. When the work looks like an employee job — set hours, the employer controls how the work is done, the worker uses the employer's tools — the law treats it as employment.\n\nOn bigger jobs (apartment buildings, commercial sites), Labor Law section 198-e (Construction Industry Wage Theft, in effect since January 4, 2022) lets an HVAC worker go after the general contractor for unpaid wages if their direct employer (the subcontractor) does not pay. This rule does not cover most home-improvement work or new construction of one or two family homes — it applies to the larger commercial and multi-family projects.\n\nScaffold Law and the homeowner exception. The Scaffold Law refers to NY Labor Law sections 240 and 241(6). Under this law, when a worker is hurt during elevated work — like installing a rooftop AC unit — the contractor that hired the worker has to pay for the injury even if the contractor was careful and did nothing personally wrong. This kind of automatic legal responsibility is called strict liability — the contractor is on the hook regardless of fault. The law has a built-in exception for homeowners: when the owner of a one- or two-family house hires a contractor and does not run the job (does not tell the workers how or when to do the work), the homeowner is not on the hook for an injured worker. The contractor still is. The exception goes away if the homeowner controls HOW the work gets done — for example, telling workers what method or tools to use, or running the job day to day. Just hiring a contractor, picking out a furnace, or saying when it is a good time to start does NOT count as running the job. The exception also goes away if the home is being used commercially.\n\nConsumer protection. NY has a consumer protection law at General Business Law section 349. A contractor who lies about their license, EPA 608 certification, or how efficient the equipment is can be sued under this law. Damages are layered. (1) Actual damages — the money the consumer actually lost. If actual damages were less than $50, the law guarantees at least $50. (2) The court CAN raise the award up to three times the actual damages. But the amount the court adds on top of actual damages is capped at $1,000 (so the total cannot exceed actual damages plus $1,000). The court only adds this bonus if it finds the contractor knew the statement was false. (3) The court CAN award the consumer's reasonable attorney fees. NY's highest court confirmed this three-layer structure in a January 2025 ruling and held nothing more is available — even punitive damages above the $1,000 cap are not allowed. A separate law (the FAIR Business Practices Act, effective February 17, 2026) lets the NY Attorney General bring claims under section 349 for 'unfair' or 'abusive' acts, not just deceptive ones. That expansion only applies when the AG sues. The AG's Consumer Frauds Bureau also investigates patterns of deceptive practices.\n\nUnpaid work. An HVAC worker or subcontractor who hasn't been paid can put a mechanic's lien on the property — a legal claim against the property for the unpaid amount. The right to file a lien is in NY Lien Law section 3. The deadline rules are in section 10: the lien has to be filed within 4 months of finishing the work for a single-family home, or within 8 months for other buildings."
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
      "An injured worker has the right to workers' compensation — even when the contractor failed to carry coverage. NY has an Uninsured Employers Fund that can pay these claims, and on construction jobs the general contractor can also be on the hook for the sub's missing coverage.",
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
      "A consumer who hired a contractor who lied about licensing, certification, or equipment efficiency can sue under General Business Law section 349(h). Remedies are layered: actual damages (the law guarantees at least $50 even if the actual loss was smaller); the court CAN choose to add up to triple the actual damages, capped at an extra $1,000, if it finds the contractor knew the statement was false; and the court CAN award the consumer's reasonable attorney fees.",
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
