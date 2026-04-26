export const REASONABLE_SUSPICION = {
  id: "reasonable-suspicion",
  term: { en: "Reasonable Suspicion" },
  aka: [],
  category: "criminal",
  subtags: ["police", "fourth-amendment"],

  context: {
    en: "Reasonable suspicion is the legal standard police need to briefly stop a person on the street and investigate, or to do a brief vehicle stop. It is a lower standard than probable cause."
  },

  plainEnglish: {
    en: "A specific, articulable basis for suspecting that a person has committed, is committing, or is about to commit a crime. Reasonable suspicion is more than a hunch but less than probable cause. The standard comes from the U.S. Supreme Court case Terry v. Ohio. It allows police to briefly stop and question a person, run a pat-down for weapons if they also reasonably believe the person is armed, or pull over a car. The officer has to point to specific facts — not just a feeling. Common examples include unusual behavior in a high-crime area combined with other facts, an informant tip with details that can be verified, or a description that closely matches a recent crime suspect. A stop based on race or appearance alone is unconstitutional. Evidence obtained from a stop without reasonable suspicion can be suppressed."
  },

  whatToAsk: {
    en: [
      "What specific facts gave the officer reasonable suspicion?",
      "Was the stop short and limited, or did it become a full arrest?",
      "Did the officer separately have reasonable suspicion that the person was armed?",
      "Can a motion to suppress challenge the stop or anything found?",
      "Was race or appearance alone the reason for the stop?"
    ]
  },

  related: ["probable-cause", "stop-and-frisk", "search-warrant", "arrest"],
  legalEntryIds: [],

  citation: "Terry v. Ohio, 392 U.S. 1 (1968); NY CPL § 140.50",
  sourceUrl: "https://www.law.cornell.edu/wex/reasonable_suspicion",
  lastVerified: "2026-04-26",
  status: "active"
};
