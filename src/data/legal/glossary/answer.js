export const ANSWER = {
  id: "answer",
  term: { en: "Answer (Civil Pleading)" },
  aka: ["Civil Answer"],
  category: "courts",
  subtags: ["civil", "procedure", "pleading"],

  context: {
    en: "An answer is the defendant's written response to a civil complaint. It admits or denies each allegation, lists any defenses, and can include counterclaims. Missing the deadline to answer can lead to a default judgment."
  },

  plainEnglish: {
    en: "The defendant's written response to a civil complaint or petition. The answer goes paragraph by paragraph through the complaint, admitting or denying each allegation. Anything not denied is treated as admitted. The answer also lists any affirmative defenses — legal reasons the defendant should win even if the plaintiff's facts are true. The answer can include counterclaims and cross-claims if the defendant has claims back at the plaintiff or another party. New York generally gives the defendant 20 days from personal service of the summons and complaint, or 30 days if served another way. Missing the deadline allows the plaintiff to ask for a default judgment. An answer that needs more time can be extended by stipulation or by motion. The answer is filed with the court and served on the plaintiff."
  },

  whatToAsk: {
    en: [
      "How many days do I have to file an answer?",
      "What affirmative defenses might apply to my case?",
      "Should I include any counterclaims against the plaintiff?",
      "What happens if I miss the deadline?",
      "Can I get a free lawyer to help draft the answer?"
    ]
  },

  related: ["complaint", "defendant", "default-judgment", "summons", "affirmative-defense", "counterclaim"],
  legalEntryIds: ["respond-to-lawsuit-ny"],

  citation: "NY CPLR § 320 (time to answer); CPLR § 3018 (admissions and denials)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CVP/320",
  lastVerified: "2026-04-26",
  status: "active"
};
