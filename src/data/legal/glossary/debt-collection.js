// Glossary term: Debt Collection
// Citation verified: NY General Business Law § 601 (Debt Collection
// Procedures, Article 29-H); federal Fair Debt Collection Practices Act
// at 15 USC 1692. NY DFS Part 1 (23 NYCRR § 1.3) adds disclosure rules
// for third-party collectors.

export const DEBT_COLLECTION = {
  id: "debt-collection",
  term: { en: "Debt Collection" },
  aka: ["Collections"],
  category: "consumer",
  subtags: ["debt", "rights"],

  context: {
    en: "You hear this when someone is being contacted about a debt — calls, letters, texts. There are strict rules about what a debt collector can and cannot do. Many common collection practices are illegal under state and federal law."
  },

  plainEnglish: {
    en: "When a company or person tries to make a consumer pay a debt that is owed (or claimed to be owed). In New York, both state law (General Business Law § 601) and federal law (the Fair Debt Collection Practices Act) limit what a collector can do. They cannot call at unusual hours, use threats, pretend to be police or a lawyer, or tell family members or employers about the debt before getting a court judgment. In the first contact, a collector has to tell the consumer the amount owed, who the original creditor was, and the consumer's right to dispute the debt in writing within 30 days. A collector who breaks these rules can be sued — and the consumer can recover damages and attorney fees."
  },

  whatToAsk: {
    en: [
      "Who is the original creditor, and who owns the debt now?",
      "What is the exact amount owed and how was it calculated?",
      "Is the debt past the statute of limitations?",
      "Did I get the required written notice with dispute rights?",
      "Has the collector done anything the law prohibits?"
    ]
  },

  related: ["statute-of-limitations-debt", "wage-garnishment", "judgment", "bankruptcy", "automatic-stay"],
  legalEntryIds: ["debt-collection-rights-ny", "medical-debt-ny"],

  citation: "NY GBL § 601 (Article 29-H); 15 USC § 1692 (FDCPA)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/GBS/601",
  lastVerified: "2026-04-15",
  status: "active"
};
