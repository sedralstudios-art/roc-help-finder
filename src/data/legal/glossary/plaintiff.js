export const PLAINTIFF = {
  id: "plaintiff",
  term: { en: "Plaintiff" },
  aka: ["Petitioner", "Claimant"],
  category: "courts",
  subtags: ["procedure", "civil"],

  context: {
    en: "The plaintiff is the person who starts a civil lawsuit. In Family Court, the same role is called the petitioner. In small claims court, sometimes called the claimant."
  },

  plainEnglish: {
    en: "The party who files a civil lawsuit. The plaintiff has the burden of proving the case — the standard depends on the type of case (preponderance of the evidence for most civil cases, clear and convincing for some special cases). The plaintiff drafts a complaint or petition that lists the facts and the legal claims, files it with the court, pays the filing fee or applies for a fee waiver, and arranges for service of process on the defendant. After the case is filed, the plaintiff is responsible for moving the case forward — requesting court conferences, conducting discovery, and either settling or asking the court for a trial. In Family Court, the plaintiff is called a petitioner. In small claims court, the plaintiff is sometimes called the claimant."
  },

  whatToAsk: {
    en: [
      "Am I the plaintiff or the defendant in this case?",
      "What does the complaint or petition need to say?",
      "How is service of process done in this kind of case?",
      "What is the filing fee, and can it be waived?",
      "If I do not move the case forward, can it be dismissed?"
    ]
  },

  related: ["defendant", "summons", "small-claims", "default-judgment"],
  legalEntryIds: [],

  citation: "NY CPLR Article 30 (parties)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CVP/A30",
  lastVerified: "2026-04-26",
  status: "active"
};
