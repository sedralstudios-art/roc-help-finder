export const COLLATERAL = {
  id: "collateral",
  term: { en: "Collateral" },
  aka: ["Security Interest"],
  category: "consumer",
  subtags: ["debt", "secured-debt", "contract"],

  context: {
    en: "Collateral is property a borrower pledges to a lender to secure a loan. If the borrower defaults, the lender can take the collateral to recover the debt. Common examples are a house securing a mortgage and a car securing an auto loan."
  },

  plainEnglish: {
    en: "Property a borrower pledges to a lender to back up a loan. If the borrower defaults, the lender has the right to take the collateral and sell it to recover the debt. Common examples include a house securing a mortgage, a car securing an auto loan, equipment securing a small-business loan, and inventory or accounts receivable securing a commercial line of credit. Collateralized loans are called secured debt. Loans without collateral — most credit cards, personal loans, and student loans — are unsecured. Secured loans typically have lower interest rates because the lender's risk is lower. The lender's rights to the collateral are governed by the loan agreement and, for personal property, by Article 9 of the Uniform Commercial Code. Repossession, foreclosure, and judicial sale procedures are how the lender enforces those rights. Some collateral can be exempt from creditors in bankruptcy under federal or state exemption rules."
  },

  whatToAsk: {
    en: [
      "What property is pledged as collateral on this loan?",
      "What does the security agreement say about default and repossession?",
      "Could any of this collateral be exempt in a bankruptcy?",
      "Are there limits on how the lender can take or sell the collateral?",
      "How does the deficiency work if the sale does not cover the full loan?"
    ]
  },

  related: ["repossession", "mortgage", "foreclosure", "garnishment", "bankruptcy"],
  legalEntryIds: [],

  citation: "NY UCC Article 9 (secured transactions); NY RPL (mortgages)",
  sourceUrl: "https://www.law.cornell.edu/ucc/9/article9",
  lastVerified: "2026-04-26",
  status: "active"
};
