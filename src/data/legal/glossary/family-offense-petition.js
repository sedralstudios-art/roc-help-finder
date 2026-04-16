// Glossary term: Family Offense Petition
// Citation verified: NY FCA Article 8 (§§ 812-847). Civil family court
// pathway for orders of protection between family or household members —
// distinct from the criminal order of protection path under CPL § 530.12.
// Family Court and criminal court have concurrent jurisdiction; a
// petitioner can usually pick either or both. Violation of a Family Court
// order of protection can be prosecuted criminally.

export const FAMILY_OFFENSE_PETITION = {
  id: "family-offense-petition",
  term: { en: "Family Offense Petition" },
  aka: ["Article 8 Petition", "Family Court Order of Protection"],
  category: "family",
  subtags: ["safety", "court-filing"],

  context: {
    en: "You hear this when someone in a family or household wants a court order telling another family member to stay away. It is filed in Family Court, not criminal court. The person filing is called the petitioner. The person it is against is called the respondent."
  },

  plainEnglish: {
    en: "A civil case in Family Court asking for an order of protection against a family or household member — a spouse, ex, co-parent, child's other parent, sibling, parent, or someone you have been in a dating relationship with. On the day the petition is filed, the judge can issue a temporary order of protection right away if there is good cause. A longer order can come after a hearing. Orders can require no contact, stay-away, no harassment or threats, no guns, and more. This is separate from any criminal case — both can happen at the same time. Breaking a Family Court order of protection is a crime that can be prosecuted in criminal court."
  },

  whatToAsk: {
    en: [
      "Do I need a criminal case too, or is Family Court enough?",
      "Can I get a temporary order of protection today?",
      "What can the order require the other person to do or not do?",
      "Is there a filing fee, or is it free?",
      "If the other person breaks the order, what do I do?"
    ]
  },

  related: ["family-court", "order-of-protection", "custody", "visitation"],
  legalEntryIds: ["order-of-protection-ny"],

  citation: "NY FCA Article 8 (§§ 812-847)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/FCT/A8",
  lastVerified: "2026-04-15",
  status: "active"
};
