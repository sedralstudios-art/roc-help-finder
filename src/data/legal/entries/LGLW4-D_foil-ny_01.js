export const FOIL_NY = {
  id: "foil-ny",
  category: "criminal",
  tier: "state",
  jurisdiction: "us-ny",
  status: "active",

  title: { en: "FOIL — How to Get Government Records in New York" },

  summary: {
    en: "The Freedom of Information Law (FOIL) lets anyone in New York ask a government agency for its records. You don't have to say why you want them. Agencies have 5 business days to respond, and most records are public by default."
  },

  whoQualifies: {
    en: [
      "Anyone can file a FOIL request. You don't have to be a New York resident, a citizen, or a lawyer.",
      "You don't have to explain why you want the records.",
      "You can file for yourself, for your family, for a business, or for a group.",
      "FOIL only covers state and local agencies in New York. Federal agencies are covered by a different law called FOIA."
    ]
  },

  whatItMeans: {
    en: "The Freedom of Information Law (Public Officers Law § 84-90) says records held by a New York state or local agency are presumed public. That means the agency has to release them unless a specific exemption applies.\n\nFOIL covers things like: police incident reports, 911 call logs, code enforcement records, property tax records, school records, court administrative records, contracts with vendors, emails between officials, meeting minutes, inspection reports, and more.\n\nThe agency has 5 business days to either give you the records, deny your request with a reason, or acknowledge it and give you a date by when they'll respond (Public Officers Law § 89).\n\nAgencies can charge up to 25 cents per page for paper copies. Electronic records are usually free unless the agency has to do special programming.\n\nIf the agency denies you, delays too long, or redacts too much, you can appeal inside the agency first (within 30 days). If that fails, you can sue in State Supreme Court under an Article 78 proceeding. If the court rules in your favor, the agency has to pay your attorney fees.\n\nCommon exemptions: records that would invade personal privacy, ongoing law enforcement investigations, trade secrets, attorney-client privileged records, and records specifically sealed by another statute."
  },

  yourRights: {
    en: [
      "You have the right to ask for any record held by a New York state or local agency. No reason required.",
      "You have the right to a response within 5 business days (Public Officers Law § 89(3)).",
      "You have the right to a written denial that cites the specific exemption the agency is relying on.",
      "You have the right to appeal a denial to the agency's FOIL appeals officer within 30 days.",
      "You have the right to sue in State Supreme Court (Article 78) if the agency keeps denying or delaying without a valid reason.",
      "You have the right to attorney fees if you win in court and the agency had no reasonable basis to deny (Public Officers Law § 89(4)(c)).",
      "You have the right to records in the format you ask for (paper, electronic, etc.) if the agency already stores them that way.",
      "You have the right to free or low-cost copies — the cap is 25 cents per page for paper, and electronic records are usually free."
    ]
  },

  legalOptions: {
    en: [
      "Find the agency's Records Access Officer (RAO). Every agency has to name one. Look on the agency website for 'FOIL' or 'Records Access'.",
      "Send a written request. Email, fax, mail, or online form all count. Describe the records you want as specifically as you can (dates, names, subject matter).",
      "Keep a copy of your request and the date you sent it. Start a 5-business-day clock.",
      "If you don't hear back in 5 business days, or the response is just a stall, you can treat that as a denial and appeal.",
      "If you get a denial, file a written appeal to the agency's FOIL appeals officer within 30 days. The agency has 10 business days to decide.",
      "If the appeal is denied, you can file an Article 78 petition in State Supreme Court within 4 months. Filing fee is around $210.",
      "Free help understanding FOIL: NY Committee on Open Government (518-474-2518). They give free written advisory opinions.",
      "Free legal help with FOIL lawsuits in Monroe County: LawNY (585-325-2520) for low-income residents, or the Reporters Committee for Freedom of the Press hotline (1-800-336-4243) for journalists."
    ]
  },

  example: {
    en: "Marcus wants the police report from a traffic stop where he got a ticket. He emails the Rochester Police Department's Records Access Officer a short FOIL request: his name, the date of the stop, the location, and a request for the incident report and any body-worn camera footage. Six business days later he gets an email back saying they need 30 more days. He waits. On day 36 they send him the report with the officer's personal phone number redacted. He asks for a written explanation of the redaction. They cite the privacy exemption. Marcus decides that's fair and doesn't appeal. Total cost: nothing."
  },

  counsel: [
    {
      type: "free",
      name: "NY Committee on Open Government",
      focus: "Free advisory opinions on FOIL and Open Meetings Law",
      qualifier: "Anyone — residents, journalists, agencies",
      access: "Phone or email",
      outcome: "Written advisory opinion explaining whether a denial or delay was proper",
      phone: "518-474-2518",
      url: "https://opengovernment.ny.gov/",
      verified: true,
      bilingual: false,
      languages: ["en"]
    },
    {
      type: "free",
      name: "Reporters Committee for Freedom of the Press — Legal Defense Hotline",
      focus: "FOIL help for journalists and documentarians",
      qualifier: "Journalists, student journalists, documentary filmmakers",
      access: "Phone or online intake",
      outcome: "Legal advice and sometimes direct representation",
      phone: "1-800-336-4243",
      url: "https://www.rcfp.org/legal-hotline/",
      verified: true,
      bilingual: false,
      languages: ["en"]
    },
    {
      type: "free",
      name: "Legal Assistance of Western New York (LawNY)",
      focus: "Civil legal help including FOIL issues tied to benefits, housing, or government services",
      qualifier: "Low-income residents in 14 Western NY counties including Monroe",
      access: "Phone intake at (585) 325-2520",
      outcome: "Representation in civil legal matters involving government records",
      phone: "(585) 325-2520",
      url: "https://www.lawny.org",
      verified: true,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    "rights-when-arrested-ny",
    "clean-slate-ny",
    "license-suspension-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "FOIL",
    "freedom of information",
    "public records",
    "government records",
    "police report request",
    "body camera footage",
    "records request",
    "open government",
    "Public Officers Law",
    "Article 78",
    "records access officer",
    "911 call records",
    "school records request",
    "agency emails"
  ],

  sources: [
    "https://opengovernment.ny.gov/",
    "https://www.nysenate.gov/legislation/laws/PBO/A6",
    "https://opengovernment.ny.gov/foil-sample-letter",
    "https://www.rcfp.org/open-government-guide/new-york/"
  ],

  lastVerified: "2026-04-14",
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
