export const AFFIRMATIVE_DEFENSE = {
  id: "affirmative-defense",
  term: { en: "Affirmative Defense" },
  aka: ["defense", "legal defense", "justification defense"],
  category: "courts",
  subtags: ["trial", "criminal", "civil"],

  context: {
    en: "This comes up in both criminal and civil cases. Instead of just saying 'I didn't do it,' the person admits something happened but says there is a legal reason they should not be held responsible."
  },

  plainEnglish: {
    en: "An affirmative defense is when the person being accused says: 'Even if what you say happened is true, I had a legal right to do it' or 'there is a legal reason I should not be punished.' Self-defense in an assault case is an example — the person admits they hit someone but says they had to because they were being attacked. Landlord retaliation in an eviction case is another — the tenant says the eviction is payback for a complaint, not a real lease violation. The person raising the defense has to bring it up and provide some evidence. Then the other side has to disprove it."
  },

  whatToAsk: {
    en: [
      "Do I have any affirmative defenses in my case?",
      "Who has to prove the affirmative defense — me or the other side?",
      "Do I have to raise the defense before trial or can I bring it up at trial?",
      "Can I have more than one affirmative defense?"
    ]
  },

  related: ["trial", "plea", "eviction", "landlord-retaliation"],
  legalEntryIds: ["self-defense-laws-ny", "landlord-retaliation-ny", "eviction-process-ny"],

  citation: "NY CPLR § 3018(b)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CVP/3018",
  lastVerified: "2026-04-16",
  status: "active"
};
