export const ASYLUM = {
  id: "asylum",
  term: { en: "Asylum" },
  aka: ["Asylum Seeker", "Asylee"],
  category: "general",
  subtags: ["immigration", "federal", "humanitarian"],

  context: {
    en: "Asylum is a form of protection for people in the United States who fear persecution in their home country because of race, religion, nationality, political opinion, or membership in a particular social group. Asylees can stay in the U.S. and eventually apply for a green card."
  },

  plainEnglish: {
    en: "A form of humanitarian protection under U.S. immigration law for a person physically present in the United States who has suffered past persecution or who has a well-founded fear of future persecution in their home country. The persecution must be based on race, religion, nationality, political opinion, or membership in a particular social group, and either the home government must be the persecutor or be unable or unwilling to protect the person. There are two main paths. Affirmative asylum is when the person who is not in removal proceedings files Form I-589 with USCIS within one year of arrival (with limited exceptions). Defensive asylum is when the person raises asylum as a defense in removal proceedings before an Immigration Judge. A grant of asylum allows the person to stay, work, and apply for a green card after one year. Asylum seekers can apply for an Employment Authorization Document while the case is pending after a 150-day waiting period. The legal definitions and procedures are in INA § 208."
  },

  whatToAsk: {
    en: [
      "Did the harm or feared harm relate to one of the five protected grounds?",
      "Was Form I-589 filed within one year of arrival, or does an exception apply?",
      "Is the case in affirmative or defensive posture?",
      "When is the work-permit eligibility date based on the filing date?",
      "What documentary and witness evidence supports the claim?"
    ]
  },

  related: ["green-card", "daca", "discrimination"],
  legalEntryIds: [],

  citation: "Immigration and Nationality Act § 208 (8 USC § 1158); 8 CFR Part 208",
  sourceUrl: "https://www.uscis.gov/humanitarian/refugees-and-asylum/asylum",
  lastVerified: "2026-04-26",
  status: "active"
};
