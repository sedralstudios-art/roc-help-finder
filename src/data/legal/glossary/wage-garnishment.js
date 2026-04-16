// Glossary term: Wage Garnishment / Income Execution
// Citation verified: NY CPLR § 5231. Statutory limit: lesser of 10% of
// gross income OR 25% of disposable earnings above 30x minimum wage.
// Modification by motion under § 5231(i). Multiple exempt categories
// of income (Social Security, SSI, TANF, SNAP, etc.).

export const WAGE_GARNISHMENT = {
  id: "wage-garnishment",
  term: { en: "Wage Garnishment" },
  aka: ["Income Execution", "Garnishment"],
  category: "consumer",
  subtags: ["debt", "post-judgment"],

  context: {
    en: "You hear this when a creditor has won a judgment and is taking money directly from a paycheck. It is one of the main ways creditors collect after a court ruling. The employer takes the money before the worker sees it."
  },

  plainEnglish: {
    en: "Money a creditor takes directly from a worker's paycheck after winning a court judgment. In New York, the most that can be taken is the lower of 10% of gross income or 25% of 'disposable earnings' (what is left after mandatory deductions like taxes). Nothing can be taken unless disposable earnings are more than 30 times the state or federal minimum wage for the week. Income from Social Security, SSI, SSDI, Temporary Assistance, SNAP, unemployment, and most pensions is usually exempt and cannot be garnished for regular debts (child support is handled differently). A worker can ask the court to reduce or stop the garnishment because of hardship."
  },

  whatToAsk: {
    en: [
      "Has the creditor actually won a court judgment first?",
      "Is any part of my income exempt?",
      "How much are they taking, and does the math meet the 10% or 25% rule?",
      "Can I ask the court for hardship and get it lowered?",
      "Would bankruptcy stop the garnishment?"
    ]
  },

  related: ["debt-collection", "judgment", "automatic-stay", "bankruptcy", "small-claims"],
  legalEntryIds: ["debt-collection-rights-ny"],

  citation: "NY CPLR § 5231",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CVP/5231",
  lastVerified: "2026-04-15",
  status: "active"
};
