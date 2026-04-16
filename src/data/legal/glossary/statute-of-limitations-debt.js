// Glossary term: Statute of Limitations on Consumer Debt
// Citation verified: NY CPLR § 214-i (added by Consumer Credit Fairness
// Act, effective April 7, 2022). Three-year limit on consumer-credit
// debt suits. CCFA also prevents a partial payment or acknowledgment
// from restarting/reviving the limitations clock.

export const STATUTE_OF_LIMITATIONS_DEBT = {
  id: "statute-of-limitations-debt",
  term: { en: "Statute of Limitations on Debt" },
  aka: ["SOL on Debt", "Time-Barred Debt"],
  category: "consumer",
  subtags: ["debt", "defenses", "rights"],

  context: {
    en: "You hear this when someone is being sued or contacted about an old debt. New York has a time limit for how long a creditor has to file a lawsuit. After the limit runs out, the debt is called time-barred and cannot be enforced in court."
  },

  plainEnglish: {
    en: "A time limit set by state law on how long a creditor has to sue over a debt. In New York, the time limit for consumer credit debt — like credit cards, personal loans, and most medical bills — is three years. This was lowered from six years by the Consumer Credit Fairness Act, effective April 7, 2022. The clock usually starts running on the date of the last missed payment. If the creditor does not sue in that time, the debt becomes time-barred. Making a partial payment no longer restarts the clock in New York — that is a key change from older rules. The debt may still exist on a credit report for up to 7 years, but the creditor cannot win a court case to collect it."
  },

  whatToAsk: {
    en: [
      "When was the date of my last payment on this debt?",
      "What type of debt is it — consumer credit, or something else?",
      "Has the three-year period passed?",
      "Could anything I did have restarted the clock before the CCFA took effect?",
      "If I am being sued on a time-barred debt, how do I raise it as a defense?"
    ]
  },

  related: ["debt-collection", "judgment", "small-claims", "bankruptcy"],
  legalEntryIds: ["debt-collection-rights-ny"],

  citation: "NY CPLR § 214-i (Consumer Credit Fairness Act)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CVP/214-I",
  lastVerified: "2026-04-15",
  status: "active"
};
