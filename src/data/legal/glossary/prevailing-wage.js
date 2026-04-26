export const PREVAILING_WAGE = {
  id: "prevailing-wage",
  term: { en: "Prevailing Wage" },
  aka: ["Prevailing Rate"],
  category: "employment",
  subtags: ["wages", "construction", "public-works"],

  context: {
    en: "Prevailing wage is the minimum hourly rate (plus benefits) that contractors must pay workers on most public works projects. New York's rates are set by the State Department of Labor and the New York City Comptroller for projects in their respective jurisdictions."
  },

  plainEnglish: {
    en: "The minimum hourly wage and supplemental benefits that contractors and subcontractors must pay workers on most public works construction projects. The rates are set by trade and locality. New York's prevailing wage law (Labor Law Article 8) covers projects funded by state, county, town, or village government. The federal Davis-Bacon Act covers federally funded projects. Each trade — laborer, carpenter, electrician, plumber, ironworker, and so on — has its own published rate. The contractor must pay the higher of the basic hourly wage or the contracted rate. Supplemental benefits (health, pension, training contributions) are added on top, often as a separate hourly amount. The contractor must keep certified payroll records showing every worker, hours, classification, and rate. Workers who were paid less than prevailing wage can file a complaint with the NY Department of Labor's Bureau of Public Work. Recovery can include back wages, interest, and civil penalties. Repeat violators can be debarred from public-works bidding."
  },

  whatToAsk: {
    en: [
      "Was the project funded by state, county, town, village, or federal money?",
      "What trade classification applies to the work performed?",
      "What is the published prevailing wage rate for that trade and locality?",
      "Were the supplemental benefits paid in cash or to a benefit fund?",
      "Where can a wage complaint be filed with the Bureau of Public Work?"
    ]
  },

  related: ["minimum-wage", "wage-theft", "independent-contractor", "retaliation-employment"],
  legalEntryIds: [],

  citation: "NY Labor Law Article 8 (§§ 220-224); federal Davis-Bacon Act (40 USC § 3141+)",
  sourceUrl: "https://dol.ny.gov/public-work-and-prevailing-wage",
  lastVerified: "2026-04-26",
  status: "active"
};
