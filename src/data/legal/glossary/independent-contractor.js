export const INDEPENDENT_CONTRACTOR = {
  id: "independent-contractor",
  term: { en: "Independent Contractor" },
  aka: ["IC", "1099 Worker", "Freelancer"],
  category: "employment",
  subtags: ["worker-status", "tax"],

  context: {
    en: "An independent contractor is a worker who is not an employee. ICs work on their own schedule, control their own methods, get paid without tax withholding, and do not get most employee protections like minimum wage, overtime, unemployment, or workers' compensation."
  },

  plainEnglish: {
    en: "A worker who is in business for themselves and provides services to a client under a contract, rather than as the client's employee. The IRS, the U.S. Department of Labor, the New York Department of Labor, and the Workers' Compensation Board each use somewhat different tests to decide whether a worker is an employee or an independent contractor. The tests look at how much control the company has over the work, who supplies tools and materials, who sets the schedule, the permanence of the relationship, and the worker's opportunity for profit or loss. Misclassification is common — many workers labeled as ICs are actually employees under one or more tests. Misclassified workers may be entitled to back wages (including overtime), unemployment benefits, workers' compensation, and other employee protections. New York launched a Worker Misclassification Task Force and provides reporting paths through the Labor Department and the Workers' Compensation Board."
  },

  whatToAsk: {
    en: [
      "How does the company describe the working relationship in the contract?",
      "Who controls the schedule, methods, and tools?",
      "Have I been classified as an IC but treated more like an employee?",
      "What protections am I missing because of the IC label?",
      "Where can a misclassification complaint be filed?"
    ]
  },

  related: ["unemployment-insurance", "workers-compensation", "discrimination", "retaliation-employment"],
  legalEntryIds: [],

  citation: "NY Labor Law § 861-c (construction); IRS Pub. 1779; 29 USC § 203 (FLSA)",
  sourceUrl: "https://dol.ny.gov/independent-contractors",
  lastVerified: "2026-04-26",
  status: "active"
};
