export const COSIGNER = {
  id: "cosigner",
  term: { en: "Cosigner" },
  aka: ["Co-Signer", "Guarantor"],
  category: "consumer",
  subtags: ["debt", "credit", "contract"],

  context: {
    en: "A cosigner is a person who agrees to be legally responsible for someone else's debt if the main borrower does not pay. Cosigning is common on student loans, auto loans, and apartment leases. The cosigner's credit and assets are on the line."
  },

  plainEnglish: {
    en: "A person who signs a loan or lease alongside the main borrower or tenant and agrees to be legally responsible if the borrower defaults. The cosigner is fully liable from day one — the lender can collect from either signer or both. Late payments hit the cosigner's credit report along with the main borrower's. Cosigning is common on student loans, auto loans, apartment leases, and personal loans for people with limited credit history. The cosigner is usually only released from the obligation in narrow situations — formal release by the lender after a certain payment history, refinance into the main borrower's name alone, payoff, or in some cases bankruptcy of the main borrower (which does not always discharge the cosigner). Federal student loan cosigners can request release after a set number of on-time payments. The Federal Trade Commission requires lenders to give cosigners a clear written notice about the risks before signing."
  },

  whatToAsk: {
    en: [
      "What is my full liability as a cosigner from day one?",
      "Will late payments by the main borrower hit my credit report?",
      "What does it take to be released from the cosigning obligation?",
      "Is there a way to refinance the loan into the main borrower's name alone?",
      "How does bankruptcy of the main borrower affect me as cosigner?"
    ]
  },

  related: ["debt-collection", "credit-report", "credit-freeze", "bankruptcy", "garnishment"],
  legalEntryIds: [],

  citation: "16 CFR § 444 (FTC Credit Practices Rule); NY UCC Article 3",
  sourceUrl: "https://consumer.ftc.gov/articles/cosigning-loan",
  lastVerified: "2026-04-26",
  status: "active"
};
