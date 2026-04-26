export const IMPLIED_WARRANTY = {
  id: "implied-warranty",
  term: { en: "Implied Warranty" },
  aka: ["Implied Warranty of Merchantability", "Implied Warranty of Fitness"],
  category: "consumer",
  subtags: ["contract", "products"],

  context: {
    en: "An implied warranty is a promise about a product that the law adds to the sale automatically, even if the seller never put it in writing. It applies to most consumer goods sold by a merchant in New York under the Uniform Commercial Code."
  },

  plainEnglish: {
    en: "An automatic legal promise that the law adds to the sale of goods, even when the seller never says anything about it. New York has two main implied warranties under UCC Article 2. The implied warranty of merchantability says that goods sold by a merchant must be fit for the ordinary purposes for which they are used and pass without objection in the trade. The implied warranty of fitness for a particular purpose applies when the seller knows the buyer's specific use and the buyer relies on the seller's skill to pick the goods. Implied warranties can be disclaimed only with very specific language — usually 'as is' or 'with all faults' — and the disclaimer has to be conspicuous. The federal Magnuson-Moss Warranty Act limits the ability to disclaim implied warranties when the seller offers a written warranty. A breach of an implied warranty can support a claim for refund, repair, replacement, or damages."
  },

  whatToAsk: {
    en: [
      "What ordinary purposes is the product supposed to be fit for?",
      "Did the seller know about my specific intended use and recommend the product?",
      "Did the contract include an 'as is' disclaimer that meets UCC formality requirements?",
      "Is there a written warranty that limits the seller's ability to disclaim?",
      "What remedies are available — refund, repair, replacement, or damages?"
    ]
  },

  related: ["breach-of-contract", "cooling-off-period", "small-claims", "damages"],
  legalEntryIds: [],

  citation: "NY UCC § 2-314 (merchantability), § 2-315 (fitness); 15 USC § 2301+ (Magnuson-Moss)",
  sourceUrl: "https://www.law.cornell.edu/ucc/2/article2",
  lastVerified: "2026-04-26",
  status: "active"
};
