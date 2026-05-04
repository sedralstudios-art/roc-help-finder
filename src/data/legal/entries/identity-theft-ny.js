export const IDENTITY_THEFT_NY = {
  id: "identity-theft-ny",
  category: "consumer",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY PEN 190.78",
  status: "active",

  title: { en: "NY Identity Theft — Criminal Charges, Credit Freeze, and the FTC Recovery Plan" },

  summary: {
    en: "Identity theft in New York is a crime under Penal Law § 190.78 (third degree, Class A misdemeanor), § 190.79 (second degree, Class E felony), and § 190.80 (first degree, Class D felony). A victim has the right to a police report, a free credit freeze and fraud alert at all three credit bureaus, dispute rights under the federal Fair Credit Reporting Act, and an FTC Identity Theft Report generated at identitytheft.gov. A victim is not responsible for the debts the thief created."
  },

  whoQualifies: {
    en: [
      "A NY resident whose personal identifying information (Social Security number, name, date of birth, address, bank or credit card number, login credentials) has been used without permission.",
      "A NY resident who discovers unauthorized accounts, charges, tax filings, or loan applications in their own name.",
      "A NY resident receiving bills, collection letters, or lawsuits for debts the resident did not create.",
      "A NY resident notified of a data breach whose Social Security number or other identifying data was exposed.",
      "A NY family member of a deceased relative whose identity is being used posthumously."
    ]
  },

  whatItMeans: {
    en: "Identity theft happens when someone uses another person's identifying information — Social Security number, name, date of birth, bank or credit card numbers, login credentials — to obtain goods, services, credit, or to commit another crime. NY criminalizes identity theft in three degrees under Penal Law Article 190. Third-degree identity theft, at Penal Law § 190.78, is a Class A misdemeanor. A person commits this offense by knowingly and with intent to defraud assuming another's identity — by presenting themselves as that person, acting as that person, or using that person's personal identifying information — and either (1) obtaining goods, money, property, services, or credit in the other's name, or causing financial loss, or (2) committing a separate Class A misdemeanor or higher crime. Second-degree identity theft at Penal Law § 190.79 is a Class E felony, applying when the loss exceeds specified dollar thresholds or the act meets aggravating factors. First-degree identity theft at Penal Law § 190.80 is a Class D felony, covering still larger loss amounts or prior identity-theft convictions. The NY Attorney General and local police both have authority to investigate. Federal law adds civil and recovery protections. The Fair Credit Reporting Act (FCRA, 15 USC § 1681) gives every consumer the right to a free credit freeze at each of the three nationwide credit bureaus (Equifax, Experian, TransUnion), the right to a free fraud alert, and the right to dispute fraudulent accounts. A credit bureau must investigate a dispute within 30 days and remove information found to be fraudulent. A one-call fraud alert at one bureau propagates to all three automatically. A credit freeze blocks new accounts from being opened unless the victim lifts the freeze. The Federal Trade Commission's IdentityTheft.gov portal generates a personalized recovery plan, an FTC Identity Theft Report, and pre-filled dispute letters. That FTC report is accepted by creditors and credit bureaus as documentation of the theft and unlocks stronger FCRA remedies — including blocking fraudulent entries on a credit report without further investigation. The recommended recovery sequence: (1) file at identitytheft.gov to generate the FTC Identity Theft Report; (2) file a police report with the local police department (Rochester non-emergency line at [number being verified]); (3) place a credit freeze or fraud alert at the three bureaus; (4) contact each creditor where fraudulent accounts exist and dispute them in writing, attaching the FTC report and police report; (5) file a complaint with the NY Attorney General's office for company intervention if a creditor refuses to remove a fraudulent account. Victims who are sued by a creditor for fraud-related debt can raise identity theft as a defense and may challenge a default judgment under CPLR § 5015 or CPLR § 317 (covered in the default-judgment entry). Free legal help is available through Legal Aid Society of Rochester, LawNY, and Empire Justice Center for low-income Monroe County residents."
  },

  yourRights: {
    en: [
      "A NY resident has the right to file a criminal identity-theft complaint under PEN §§ 190.78, 190.79, or 190.80 with local police and the NY Attorney General.",
      "A NY resident has the right under the federal Fair Credit Reporting Act to a free credit freeze at each of the three nationwide credit bureaus.",
      "A NY resident has the right to a free fraud alert — calling one bureau propagates the alert to all three.",
      "A NY resident has the right to dispute fraudulent accounts and have credit bureaus investigate within 30 days and remove information found to be fraudulent.",
      "A NY resident has the right to a free FTC Identity Theft Report at identitytheft.gov, which creditors and credit bureaus must accept as documentation of the theft.",
      "A NY resident has the right to block fraudulent entries on a credit report without further investigation when an FTC Identity Theft Report is provided.",
      "A NY resident is not legally responsible for debts the thief created and may defend against a collection lawsuit on identity-theft grounds."
    ]
  },

  legalOptions: {
    en: [
      "FTC IdentityTheft.gov or (877) 438-4338 — generates a personalized recovery plan, an FTC Identity Theft Report, and pre-filled dispute letters.",
      "Rochester Police non-emergency line at (585) 428-6666 (or the police agency for the municipality where the victim lives) — file a police report with the FTC Identity Theft Report attached.",
      "Credit bureau freeze and fraud alert numbers: Equifax (800) 685-1111, Experian (888) 397-3742, TransUnion (888) 909-8872. Freezes and fraud alerts are free under the FCRA.",
      "NY Attorney General Consumer Frauds and Identity Theft Unit at (800) 771-7755 or ag.ny.gov/internet/identity-theft — investigates complaints and contacts non-cooperating companies.",
      "IRS Identity Protection Specialized Unit at (800) 908-4490 — for tax-related identity theft (fraudulent return filed in the victim's name).",
      "Legal Aid Society of Rochester at (585) 232-4090 — low-income Monroe County residents defending identity-theft-related collection lawsuits.",
      "LawNY at (585) 325-2520 — identity-theft defense across 14-county Western NY service area."
    ]
  },

  example: {
    en: "Tamika pulls her annual credit reports and finds two credit cards and an auto loan she never applied for. She goes to identitytheft.gov and creates an FTC Identity Theft Report, then files a police report with the Rochester Police non-emergency line attaching the FTC report. She calls Equifax and places a credit freeze — TransUnion and Experian are automatically notified. She mails the FTC report and police report to each of the three creditors whose accounts appeared fraudulently. Under the FCRA, the credit bureaus remove the fraudulent entries within 30 days. Within about 60 days her credit report is cleared of the fraudulent accounts and collection calls stop."
  },

  counsel: [
    {
      type: "government",
      name: "FTC Identity Theft Recovery (IdentityTheft.gov)",
      focus: "Identity theft reporting, recovery plan, pre-filled dispute letters",
      qualifier: "Any U.S. resident",
      access: "Online, phone",
      outcome: "Personalized recovery plan and official FTC Identity Theft Report",
      phone: "",
      url: "https://identitytheft.gov",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "government",
      name: "NY Attorney General — Consumer Frauds and Identity Theft Unit",
      focus: "Identity theft complaints and intervention with non-cooperating companies",
      qualifier: "Any NY resident",
      access: "Phone, online complaint",
      outcome: "Investigation and mediation",
      phone: "",
      url: "https://ag.ny.gov/internet/identity-theft",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "nonprofit",
      name: "Legal Aid Society of Rochester",
      focus: "Identity theft in collection lawsuits, FCRA dispute representation",
      qualifier: "Low-income Monroe County resident",
      access: "Phone intake",
      outcome: "Free representation and advice",
      phone: "",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "debt-collection-rights-ny",
    "default-judgment-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "NY identity theft",
    "PEN 190.78",
    "PEN 190.79",
    "PEN 190.80",
    "credit freeze",
    "fraud alert",
    "FTC Identity Theft Report",
    "FCRA 30-day dispute",
    "IRS identity theft IPSU",
    "Consumer Sentinel"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/PEN/190.78",
    "https://identitytheft.gov",
    "https://ag.ny.gov/internet/identity-theft"
  ],

  lastVerified: "2026-04-21",
  factCheckedBy: { tool: "websearch", date: "2026-04-30" },
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
