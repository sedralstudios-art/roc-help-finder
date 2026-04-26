export const PROBABLE_CAUSE = {
  id: "probable-cause",
  term: { en: "Probable Cause" },
  aka: [],
  category: "criminal",
  subtags: ["arrest", "search", "fourth-amendment"],

  context: {
    en: "Probable cause is the legal standard police usually need before they can make an arrest, get a search warrant, or conduct certain searches. It is more than a hunch but less than proof beyond a reasonable doubt."
  },

  plainEnglish: {
    en: "A reasonable basis to believe that a crime has been or is being committed. It also covers a reasonable basis to believe evidence of a crime is in a particular place. Police need probable cause to make a warrantless arrest, to apply for a search warrant, or to conduct certain warrantless searches like a search of a car. Probable cause is a higher standard than reasonable suspicion (which allows a brief stop). But it is a lower standard than the proof needed to convict at trial. The court looks at the totality of the circumstances — what the officer knew at the time and the reasonable inferences from those facts. An arrest or search without probable cause is unconstitutional. The evidence found can usually be kept out of court through a motion to suppress."
  },

  whatToAsk: {
    en: [
      "Did the police have probable cause for the arrest or search?",
      "What facts did the officer know at the time?",
      "Can a motion to suppress be filed to challenge the arrest or the evidence?",
      "Is this a stop-and-frisk situation (reasonable suspicion) or a full arrest (probable cause)?",
      "Was a warrant obtained, and what did the warrant say?"
    ]
  },

  related: ["arrest", "search-warrant", "miranda-rights", "discovery"],
  legalEntryIds: [],

  citation: "Fourth Amendment; NY CPL Article 140 (arrest)",
  sourceUrl: "https://www.law.cornell.edu/wex/probable_cause",
  lastVerified: "2026-04-26",
  status: "active"
};
