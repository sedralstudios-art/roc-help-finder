export const DWI_FIRST_OFFENSE_NY = {
  id: "dwi-first-offense-ny",
  category: "vehicle",
  tier: "state",
  jurisdiction: "us-ny",
  status: "active",

  title: { en: "DWI First Offense — What Happens After a Drunk Driving Arrest in New York" },

  summary: {
    en: "A first-offense DWI in New York is a misdemeanor with serious consequences. Penalties include fines of $500 to $1,000, up to one year in jail, and a minimum six-month license revocation. The court must also order an ignition interlock device. The DMV imposes a $250-per-year assessment for three years. Commercial license holders face a one-year CDL disqualification — even if they were driving their personal vehicle."
  },

  whoQualifies: {
    en: [
      "Any driver arrested for operating a motor vehicle while intoxicated or impaired under VTL § 1192 in New York State.",
      "This includes drivers charged with DWAI (BAC .05–.07, a traffic infraction), DWI (BAC .08 or higher, a misdemeanor), or Aggravated DWI (BAC .18 or higher, a misdemeanor with enhanced penalties).",
      "Commercial driver's license (CDL) holders face a lower threshold — a BAC of .04% or higher triggers charges under VTL § 1192(5) and results in CDL disqualification even if the arrest occurred in a personal vehicle.",
      "Drivers under 21 are subject to the Zero Tolerance Law (VTL § 1192-a) — any BAC of .02% or higher triggers administrative penalties."
    ]
  },

  whatItMeans: {
    en: "New York uses a three-tier system for alcohol-related driving offenses under VTL § 1192. DWAI (driving while ability impaired, BAC .05–.07) is a traffic infraction carrying up to a $500 fine, 15 days in jail, and a 90-day license suspension. DWI (BAC .08 or higher) is a misdemeanor carrying a $500–$1,000 fine, up to one year in jail, and at least a six-month license revocation. Aggravated DWI (BAC .18 or higher) carries a $1,000–$2,500 fine, up to one year in jail, and at least a one-year revocation. On top of the fine, every conviction carries a mandatory surcharge of approximately $395. The DMV also imposes a Driver Responsibility Assessment of $250 per year for three years."
  },

  yourRights: {
    en: [
      "You have the right to an attorney at every stage of the process, including arraignment, pretrial hearings, and trial. If you cannot afford an attorney, one will be appointed for you.",
      "You have the right to plead not guilty and have a trial. The prosecution must prove every element of the offense beyond a reasonable doubt.",
      "You have the right to challenge the legality of the traffic stop, the administration of field sobriety tests, and the accuracy of any chemical test (breathalyzer, blood, or urine).",
      "You have the right to refuse a chemical test, but refusal triggers an automatic one-year license revocation through a separate DMV administrative hearing — regardless of whether you are convicted of the criminal charge.",
      "After 30 days of suspension or revocation, you may be eligible for a conditional license through the Impaired Driver Program (IDP), which allows limited driving to work, school, medical appointments, and court-ordered programs.",
      "A second DWI conviction within 10 years is a Class E felony carrying up to four years in prison, fines of $1,000 to $5,000, and at least a one-year license revocation."
    ]
  },

  legalOptions: {
    en: [
      "Under VTL § 1192, a first-offense DWI is handled in local criminal court. The right to a jury trial applies to DWI misdemeanors in most courts outside of New York City.",
      "In many local courts, prosecutors may offer a plea reduction from DWI to DWAI (a non-criminal traffic infraction) when the evidence supports it. A DWAI plea avoids a criminal record but still carries a license suspension, fine, surcharge, and DRA. New York law prohibits reduction to a non-alcohol-related offense in most cases.",
      "Under Leandra's Law (VTL § 1193), courts must order installation of an ignition interlock device on any vehicle the convicted person owns or operates for at least six months following a DWI conviction. The cost of installation and monthly monitoring is paid by the driver.",
      "The New York DMV conducts a separate administrative hearing for chemical test refusals. The refusal hearing is independent of the criminal case — a driver may face license revocation even if the criminal charge is dismissed.",
      "Free legal representation is available through the Monroe County Public Defender's Office at (585) 753-4210 for anyone charged with a crime who cannot afford an attorney.",
      "The Impaired Driver Program (IDP), required for most DWI convictions, is a seven-week course. Completion of the IDP is typically required to restore full driving privileges. Program information is available through the NYS DMV at dmv.ny.gov."
    ]
  },

  example: {
    en: "Brian was pulled over at a checkpoint in Schuyler County and arrested for DWI after a breathalyzer showed a BAC of .11%. At arraignment the next morning, the judge suspended his license and appointed a public defender. Brian's attorney reviewed the case and negotiated a plea reduction to DWAI. Brian paid a $300 fine plus the $395 surcharge, received a 90-day license suspension, and was required to complete the Impaired Driver Program. After 30 days, he received a conditional license so he could drive to work while completing the program."
  },

  counsel: [
    {
      type: "free",
      name: "Monroe County Public Defender's Office",
      focus: "Criminal defense for all charges including DWI, DWAI, and Aggravated DWI",
      qualifier: "Anyone charged with a crime in Monroe County who cannot afford an attorney",
      access: "Appointed at arraignment or by request",
      outcome: "Full criminal defense representation from arraignment through trial or disposition",
      phone: "(585) 753-4210",
      url: "https://www.monroecounty.gov/defender",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Civil consequences of DWI — license issues affecting employment, housing, benefits",
      qualifier: "Low income residents of Monroe County and surrounding counties",
      access: "Phone intake at (585) 232-4090",
      outcome: "Advice and representation on civil impacts of a criminal case",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "speeding-ticket-ny",
    "rights-when-arrested-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "DWI",
    "DUI",
    "drunk driving",
    "arrested for drinking and driving",
    "breathalyzer",
    "BAC",
    "blood alcohol",
    "license revoked",
    "ignition interlock",
    "first offense DWI",
    "DWAI",
    "impaired driving",
    "drinking and driving",
    "got pulled over",
    "refused breathalyzer",
    "CDL DWI"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/VAT/1192",
    "https://dmv.ny.gov/tickets/penalties-alcohol-or-drug-related-violations",
    "https://www.criminaljustice.ny.gov/ops/erc/faqs.htm",
    "https://dmv.ny.gov/tickets/pay-driver-responsibility-assessment",
    "https://www.nysenate.gov/legislation/laws/VAT/1193"
  ],

  lastVerified: "2026-04-04",
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
