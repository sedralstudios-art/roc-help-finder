export const ARBITRATION = {
  id: "arbitration",
  term: { en: "Arbitration" },
  aka: ["Binding Arbitration", "Mandatory Arbitration"],
  category: "consumer",
  subtags: ["alternative-dispute-resolution", "contract"],

  context: {
    en: "Arbitration is a private process for settling disputes outside of court. A neutral arbitrator hears both sides and makes a decision. Many consumer contracts (credit cards, cell phone, employment) require arbitration instead of a lawsuit."
  },

  plainEnglish: {
    en: "A private dispute resolution process where a neutral arbitrator hears both sides and makes a decision. Arbitration is different from mediation — the arbitrator actually decides the case, like a judge. Most arbitration is binding, meaning the decision is final and very hard to appeal. Many consumer contracts (credit cards, cell phone agreements, gym memberships, employment contracts) include a clause requiring arbitration instead of a lawsuit. Some clauses also bar class actions. Arbitration is usually faster than court but can be more limited in discovery, evidence rules, and the right to appeal. Public arbitration through the American Arbitration Association (AAA) or JAMS can have meaningful filing fees, though some consumer rules cap what the consumer pays. A clause requiring arbitration can sometimes be challenged as unconscionable, but courts uphold most of them."
  },

  whatToAsk: {
    en: [
      "Is there an arbitration clause in the contract?",
      "Is the arbitration binding, and what is the appeal right (if any)?",
      "Who picks the arbitrator and where will it be held?",
      "What are the filing fees, and is there a cap on what I have to pay?",
      "Can I bring a class action, or does the clause bar that?"
    ]
  },

  related: ["mediation", "small-claims", "cooling-off-period"],
  legalEntryIds: [],

  citation: "9 USC § 1+ (Federal Arbitration Act); NY CPLR Article 75",
  sourceUrl: "https://www.law.cornell.edu/uscode/text/9",
  lastVerified: "2026-04-26",
  status: "active"
};
