export const CLEAN_SLATE_NY = {
  id: "clean-slate-ny",
  category: "criminal",
  tier: "state",
  jurisdiction: "us-ny",
  status: "active",

  title: { en: "Clean Slate Act — Automatic Sealing of Your Criminal Record" },

  summary: {
    en: "New York's Clean Slate Act automatically seals most criminal conviction records after a waiting period. Misdemeanors seal after three years and felonies after eight. Once sealed, these convictions are hidden from most background checks for jobs, housing, and education. You do not need to apply. The sealing happens automatically if you meet the requirements."
  },

  whoQualifies: {
    en: [
      "Anyone convicted of a misdemeanor under New York State law whose sentence or release from incarceration was at least three years ago, with no new convictions or pending criminal charges since then.",
      "Anyone convicted of a felony under New York State law whose sentence or release from incarceration was at least eight years ago, with no new convictions or pending charges since then.",
      "The person must not be currently on probation, parole, or post-release supervision.",
      "Drug-related convictions are eligible for sealing, even Class A drug felonies. However, sex offenses, most non-drug Class A felonies (including murder), and convictions requiring sex offender registration are not eligible."
    ]
  },

  whatItMeans: {
    en: "Under CPL § 160.57, the Clean Slate Act requires the New York State Unified Court System to automatically seal eligible conviction records by November 16, 2027. Sealing means the conviction will not appear on most background checks used for employment, housing, education, or lending. Employers are prohibited from asking about sealed convictions or taking adverse action based on them. Sealing is not the same as expungement — the records still exist and remain accessible to law enforcement, prosecutors, courts, and certain licensing agencies. If you are convicted of a new crime during the waiting period, the clock resets."
  },

  yourRights: {
    en: [
      "You have the right to have eligible convictions automatically sealed without filing any application or petition. The process is handled by the court system (CPL § 160.57).",
      "Once your record is sealed, employers are prohibited from inquiring about the sealed conviction or making any adverse employment decision based on it.",
      "You have the right to bring a civil lawsuit under Civil Rights Law § 50-g against anyone who knowingly and willfully discloses your sealed conviction without authorization, if the disclosure causes you injury.",
      "If your conviction has not been sealed by November 16, 2027, and you believe it should have been, you or your attorney may petition the court for a manual review of your record.",
      "There is no limit on the number of convictions that may be sealed under the Clean Slate Act, as long as each conviction meets the eligibility requirements.",
      "If you also qualify under the older petition-based sealing law (CPL § 160.59), which allows sealing of up to two convictions after a 10-year waiting period, that option remains available as an alternative."
    ]
  },

  legalOptions: {
    en: [
      "Under CPL § 160.57, eligible convictions are sealed automatically by the Unified Court System. The system has until November 16, 2027, to seal all qualifying records. No application is required.",
      "For individuals who cannot wait for automatic sealing, CPL § 160.59 allows a petition to be filed in the sentencing court to seal up to two convictions (with no more than one felony) after a 10-year waiting period. This requires a court motion and is not automatic.",
      "The New York State Division of Criminal Justice Services (DCJS) maintains criminal history records. Individuals may request a copy of their own rap sheet to check whether their convictions have been sealed. Instructions are available at the DCJS website.",
      "Free legal help with record sealing and the collateral consequences of criminal convictions in Monroe County is available through the Legal Aid Society of Rochester at (585) 232-4090 and Legal Assistance of Western New York (LawNY) at (585) 325-2520.",
      "The Clean Slate Act applies only to convictions under New York State law. Federal convictions and convictions from other states are not affected. Immigration matters require separate analysis — sealed convictions must still be disclosed to USCIS.",
      "The New York State Unified Court System publishes updates on Clean Slate implementation at nycourts.gov/FORMS/criminal-record-sealing.shtml."
    ]
  },

  example: {
    en: "DeShawn was convicted of a nonviolent felony in Cayuga County in 2016 and served two years in state prison. He was released in 2018 and completed parole in 2021. He has had no new arrests or convictions since then. Under the Clean Slate Act, his felony conviction is eligible to be sealed eight years after his release — in 2026. Once sealed, the conviction will no longer appear on background checks when he applies for jobs or housing. He does not need to file any paperwork. The court system handles the sealing automatically."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Record sealing, reentry services, collateral consequences of convictions",
      qualifier: "Low income residents of Monroe County and surrounding counties",
      access: "Phone intake at (585) 232-4090",
      outcome: "Direct representation and advice on record sealing and reentry",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "free",
      name: "Legal Assistance of Western New York (LawNY)",
      focus: "Record sealing, reentry, employment rights, housing",
      qualifier: "Low income residents in 14 Western NY counties including Monroe",
      access: "Phone intake at (585) 325-2520",
      outcome: "Direct representation in record sealing matters",
      phone: "(585) 325-2520",
      url: "https://www.lawny.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Empire Justice Center",
      focus: "Reentry, record sealing, systemic advocacy, employment rights",
      qualifier: "Low and moderate income residents statewide (all NYS counties except NYC)",
      access: "Phone intake at (585) 454-4060",
      outcome: "Direct representation, impact litigation, and policy advocacy",
      phone: "(585) 454-4060",
      url: "https://www.empirejustice.org",
      verified: true,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    "rights-when-arrested-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "clean slate",
    "seal my record",
    "criminal record",
    "background check",
    "expunge my record",
    "old conviction",
    "can't get a job because of record",
    "record sealing",
    "felony on record",
    "misdemeanor on record",
    "second chance",
    "criminal history",
    "employer background check",
    "housing denied criminal record",
    "reentry"
  ],

  sources: [
    "https://www.nycourts.gov/FORMS/criminal-record-sealing.shtml",
    "https://www.nysenate.gov/legislation/bills/2023/S7551",
    "https://www.lawny.org/node/571/new-york-state-clean-slate-act",
    "https://www.cleanslateny.org/faq",
    "https://www.nysenate.gov/legislation/laws/CPL/160.57"
  ],

  lastVerified: "2026-04-04",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
