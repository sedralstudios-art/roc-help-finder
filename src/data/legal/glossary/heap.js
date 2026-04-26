export const HEAP = {
  id: "heap",
  term: { en: "HEAP" },
  aka: ["Home Energy Assistance Program", "Heating Help"],
  category: "benefits",
  subtags: ["utilities", "program-jargon"],

  context: {
    en: "You hear this in winter when people need help paying heating bills. HEAP is a federal program run by the state that pays part of your heating costs. Emergency HEAP can help right away if your heat is about to be shut off."
  },

  plainEnglish: {
    en: "A program that helps low-income households pay for heat. In New York, HEAP has two parts. Regular HEAP gives a one-time payment toward the household's heating bill at the start of the season. Emergency HEAP helps when heat is shut off or about to be shut off — it pays to restore service and prevent shutoff. Applications go through the county's Department of Social Services or online at mybenefits.ny.gov. Income must generally be at or below 60% of the state median income. SNAP, Temporary Assistance, and SSI recipients may qualify automatically. HEAP runs out of money each year — applying early in the season matters."
  },

  whatToAsk: {
    en: [
      "Is HEAP still accepting applications this year?",
      "Do I qualify automatically because I receive SNAP or SSI?",
      "Can I get emergency HEAP if my heat is about to be shut off?",
      "What documents do I need to bring?",
      "Does HEAP cover electric heat, or only gas and oil?"
    ]
  },

  related: ["snap", "temporary-assistance", "fpl", "recertification"],
  legalEntryIds: ["heap-utility-assistance-ny"],

  citation: "42 USC § 8621+ (federal LIHEAP); NY Soc. Services Law § 97",
  sourceUrl: "https://otda.ny.gov/programs/heap/",
  lastVerified: "2026-04-16",
  status: "active"
};
