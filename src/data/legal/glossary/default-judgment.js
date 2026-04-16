export const DEFAULT_JUDGMENT = {
  id: "default-judgment",
  term: { en: "Default Judgment" },
  aka: ["default", "judgment by default"],
  category: "courts",
  subtags: ["civil-court", "debt", "eviction"],

  context: {
    en: "This happens when someone is sued and does not respond or show up in court. The other side wins automatically — not because they proved their case, but because no one showed up to argue the other side."
  },

  plainEnglish: {
    en: "If you are sued and you do not file an answer or go to court by the deadline, the judge can give the other side what they asked for — money, eviction, whatever the case is about. This is called a default judgment. You lose without anyone hearing your side. Default judgments happen a lot in debt collection cases and eviction cases because people do not respond to the papers. The good news is that default judgments can sometimes be reopened — a judge can vacate (undo) the default if you have a good reason for not responding and a real defense to the case."
  },

  whatToAsk: {
    en: [
      "How much time do I have to respond before a default judgment is entered?",
      "Can the default judgment be vacated (undone)? What do I need to show?",
      "Is there a deadline to ask the court to vacate a default judgment?",
      "If a default judgment was entered against me, can my wages be garnished?"
    ]
  },

  related: ["judgment", "summons", "wage-garnishment", "eviction"],
  legalEntryIds: ["default-judgment-ny", "respond-to-lawsuit-ny", "wage-garnishment-defense-ny"],

  citation: "NY CPLR § 3215",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CVP/3215",
  lastVerified: "2026-04-16",
  status: "active"
};
