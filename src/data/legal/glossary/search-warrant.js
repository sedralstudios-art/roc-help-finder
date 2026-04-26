export const SEARCH_WARRANT = {
  id: "search-warrant",
  term: { en: "Search Warrant" },
  aka: [],
  category: "criminal",
  subtags: ["search", "police", "fourth-amendment"],

  context: {
    en: "A search warrant is a court order signed by a judge that lets police search a specific place for specific items. It comes up when police want to search a home, car, phone, or other place protected by Fourth Amendment privacy rights."
  },

  plainEnglish: {
    en: "A written order signed by a judge authorizing police to search a specific place at a specific time for specific items, evidence, or people. To get a search warrant, police submit a sworn application showing probable cause — usually a written affidavit describing what evidence is expected and why. The warrant must describe the place to be searched and the items to be seized with particularity. Most warrants must be served during daytime hours unless the judge approves a nighttime warrant. Police executing a search warrant must usually knock and announce, with narrow exceptions. Evidence seized through an invalid warrant — or a search beyond the warrant's scope — can be suppressed through a motion in court. The defense lawyer can review the warrant application and challenge it during the case."
  },

  whatToAsk: {
    en: [
      "Was a search warrant signed by a judge?",
      "What did the warrant authorize police to search and to seize?",
      "Did the search stay within the scope of the warrant?",
      "Was the warrant executed during the time the warrant allowed?",
      "Can the defense file a motion to suppress to challenge the warrant?"
    ]
  },

  related: ["arrest-warrant", "probable-cause", "miranda-rights", "discovery"],
  legalEntryIds: [],

  citation: "Fourth Amendment; NY CPL Article 690 (search warrants)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CPL/A690",
  lastVerified: "2026-04-26",
  status: "active"
};
