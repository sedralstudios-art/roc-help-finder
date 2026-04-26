export const COMPLAINT = {
  id: "complaint",
  term: { en: "Complaint (Civil)" },
  aka: ["Civil Complaint", "Petition"],
  category: "courts",
  subtags: ["civil", "procedure", "pleading"],

  context: {
    en: "A complaint is the paper that starts a civil lawsuit. It tells the court and the defendant who is being sued, what happened, and what the plaintiff wants. In Family Court, the same paper is called a petition."
  },

  plainEnglish: {
    en: "The first paper filed in a civil lawsuit. The complaint identifies the plaintiff and defendant, describes what the defendant allegedly did, lists the legal claims, and asks the court for a specific result — money damages, an order to do or stop doing something, or both. The complaint is filed with the court and served on the defendant along with a summons. The defendant then has a set time to file an answer (usually 20 to 30 days). A complaint that fails to state a legal claim, or that is too vague, can be challenged through a motion to dismiss. Family Court uses the term petition for the same kind of paper. Small claims court uses a simpler form. The plaintiff can usually amend the complaint to fix problems or add facts."
  },

  whatToAsk: {
    en: [
      "What does the complaint actually claim — what wrongdoing and what relief?",
      "How long do I have to file an answer?",
      "Can the complaint be challenged through a motion to dismiss?",
      "Can the plaintiff amend the complaint to add new claims?",
      "Where is the complaint filed and how is it served?"
    ]
  },

  related: ["plaintiff", "defendant", "summons", "default-judgment", "motion-to-dismiss"],
  legalEntryIds: ["respond-to-lawsuit-ny"],

  citation: "NY CPLR § 3013 (statements in pleadings); CPLR Article 30",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CVP/3013",
  lastVerified: "2026-04-26",
  status: "active"
};
