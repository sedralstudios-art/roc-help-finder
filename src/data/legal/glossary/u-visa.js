export const U_VISA = {
  id: "u-visa",
  term: { en: "U Visa" },
  aka: ["U Nonimmigrant Status"],
  category: "general",
  subtags: ["immigration", "federal", "crime-victim"],

  context: {
    en: "The U visa is a federal immigration status for victims of certain serious crimes who have suffered substantial physical or mental abuse and have helped (or are likely to help) law enforcement in the investigation or prosecution of the crime. It provides temporary legal status, work authorization, and a path toward a green card."
  },

  plainEnglish: {
    en: "A federal nonimmigrant status under INA § 101(a)(15)(U) for victims of certain serious crimes who have suffered substantial physical or mental abuse and who have helped, are helping, or are likely to help law enforcement in the investigation or prosecution of the crime. Qualifying crimes include domestic violence, sexual assault, human trafficking, kidnapping, felonious assault, and many others — the full list is in 8 USC § 1101(a)(15)(U). A required step is a law enforcement certification (Form I-918, Supplement B) signed by a qualifying agency confirming the helpfulness. The visa lasts up to 4 years and includes work authorization. After 3 years of continuous physical presence in the U.S. on U status, the person may apply to adjust to lawful permanent resident (green card). USCIS limits new U visa principal applicants to 10,000 per fiscal year. Wait times for adjudication have been long. Free or low-cost immigration help with U visa applications is available in Monroe County through Catholic Family Center, Refugees Helping Refugees, and other agencies."
  },

  whatToAsk: {
    en: [
      "Was the qualifying crime one of the offenses listed in INA § 101(a)(15)(U)?",
      "Has a law enforcement agency signed the I-918 Supplement B certification?",
      "What evidence supports the substantial-abuse and helpfulness elements?",
      "What is the current wait time for adjudication?",
      "Where can free immigration help with the U visa application be found?"
    ]
  },

  related: ["asylum", "green-card", "daca", "domestic-violence"],
  legalEntryIds: [],

  citation: "Immigration and Nationality Act § 101(a)(15)(U); 8 CFR Part 214.14",
  sourceUrl: "https://www.uscis.gov/humanitarian/victims-of-human-trafficking-and-other-crimes/victims-of-criminal-activity-u-nonimmigrant-status",
  lastVerified: "2026-04-26",
  status: "active"
};
