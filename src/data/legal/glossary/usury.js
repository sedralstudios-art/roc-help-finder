export const USURY = {
  id: "usury",
  term: { en: "Usury" },
  aka: ["illegal interest rate", "loan sharking", "predatory interest"],
  category: "consumer",
  subtags: ["debt", "lending", "interest"],

  context: {
    en: "This comes up when a lender charges an interest rate that is higher than the law allows. In New York, the legal limit is 16% for most loans. Charging more than 25% is a crime."
  },

  plainEnglish: {
    en: "Usury means charging an interest rate on a loan that is higher than the law allows. In New York, the civil usury limit is 16% per year for most loans. If the rate is above 16%, the borrower may not have to pay the interest — and in some cases, the entire loan may be voided. If the rate is above 25%, it is criminal usury — a felony. Payday loans are illegal in New York because the interest rates (often 300%+) far exceed the usury cap. Banks and credit cards are often exempt from state usury laws because federal law allows them to use the interest rate of the state where they are based."
  },

  whatToAsk: {
    en: [
      "Is the interest rate on my loan above the legal limit?",
      "If the rate is usurious, do I still have to pay back the loan?",
      "Are online lenders subject to New York's usury laws?",
      "Does the usury limit apply to credit cards?"
    ]
  },

  related: ["debt-collection", "judgment"],
  legalEntryIds: ["predatory-lending-ny", "payday-lending-ny", "debt-collection-rights-ny"],

  citation: "NY GOL § 5-501; NY Penal Law § 190.40",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/GOB/5-501",
  lastVerified: "2026-04-16",
  status: "active"
};
