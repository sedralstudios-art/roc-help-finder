export const SENTENCING_OPTIONS_NY = {
  id: "sentencing-options-ny",
  category: "criminal",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY PEN P2TEA60",
  status: "active",

  title: { en: "NY Criminal Sentencing — Dispositions, Surcharges, Restitution, and the Right of Allocution" },

  summary: {
    en: "NY criminal sentencing is governed by Penal Law Articles 60-85. After a conviction or guilty plea, the court imposes a sentence drawn from a set of authorized dispositions. The main options run from unconditional discharge (no punishment) through fines, conditional discharge, probation, local jail for misdemeanors, to state prison for felonies. Most sentences also carry a mandatory surcharge under Penal Law § 60.35 and potential restitution under Penal Law § 60.27. The defendant has the right of allocution — to speak to the court before sentence is imposed."
  },

  whoQualifies: {
    en: [
      "A NY defendant convicted of a violation, misdemeanor, or felony awaiting sentencing.",
      "A NY defendant considering a guilty plea and needing to understand the sentencing range before accepting an offer.",
      "A victim of a crime exercising victim-impact rights at sentencing.",
      "A family member of a defendant trying to understand what sentence may be imposed.",
      "A defendant whose plea agreement includes a specific sentencing commitment from the court."
    ]
  },

  whatItMeans: {
    en: "Sentencing is the stage after a conviction where the court imposes the authorized punishment. NY Penal Law Articles 60 through 85 govern authorized dispositions. The main disposition options, from least to most severe: unconditional discharge — the court releases the defendant with no further consequences beyond the conviction itself. Conditional discharge — no jail time, but the defendant must follow court-set conditions for one year (misdemeanor) or three years (felony), with violation potentially leading to resentencing. Probation — no jail time, but supervision by a probation officer with reporting requirements for two or three years (misdemeanor) or three to five years (felony, longer for certain offenses). Local jail (county correctional facility) — misdemeanor and violation sentences, capped at one year. State prison — felony sentences of more than one year. The specific minimum-and-maximum ranges for imprisonment are set by offense class in Penal Law § 70.00 and § 70.02. Article 65 governs probation and discharges; Article 80 covers fines. In addition to the core disposition, the court imposes additional orders. Mandatory surcharge and crime-victim fee under Penal Law § 60.35: the surcharge is $300 for a felony and $175 for a misdemeanor, plus a $25 crime-victim assistance fee and small additional fees. Amounts are set by statute and periodically adjusted. The judge has very limited discretion to waive the surcharge. Restitution under Penal Law § 60.27 applies when the offense caused financial loss to a specific victim. The amount is capped at $15,000 for most felonies and $10,000 for non-felonies unless the defendant consents to a higher amount. The court can order restitution even when the main sentence is non-custodial. Fines are separate from surcharges and restitution and have maximum amounts tied to offense class — $5,000 or double the defendant's gain for a felony, $1,000 for a Class A misdemeanor, less for lower offenses. Orders of protection may be entered when the offense involved a victim. Sex-offense convictions carry separate registration requirements under the Sex Offender Registration Act. Under the 2021 Clean Slate Act, most misdemeanor and non-violent felony convictions are eligible for automatic sealing after three or eight years (covered in the clean-slate-ny entry). The right of allocution is an important procedural protection. Before pronouncing sentence, the court must ask the defendant if there is anything the defendant wishes to say. This is the chance to express remorse, explain circumstances, or ask for leniency. The victim also has a right to speak or submit a written statement under Criminal Procedure Law § 380.50. Assigned counsel continues to represent indigent defendants through sentencing. If the sentence is part of a plea agreement, the court must generally honor it or allow the defendant to withdraw the plea under Criminal Procedure Law § 220.60. Most sentences are appealable to the Appellate Division (covered in the criminal-appeal-ny entry). Federal sentencing and Family Court dispositions use separate frameworks."
  },

  yourRights: {
    en: [
      "A NY defendant has the right to assigned counsel at sentencing when the defendant cannot afford private counsel.",
      "A NY defendant has the right of allocution — to speak to the court before sentence is imposed — required by NY case law and Criminal Procedure Law § 380.50.",
      "A NY defendant has the right to know the maximum authorized sentence before entering a guilty plea, under Criminal Procedure Law § 220.60.",
      "A NY defendant whose guilty plea was conditioned on a specific sentence has the right to withdraw the plea if the court imposes a harsher sentence.",
      "A NY defendant has the right under Criminal Procedure Law § 60.27 to argue against or negotiate the amount of restitution if the financial loss is disputed.",
      "A NY defendant who cannot afford the mandatory surcharge has the right to request community service instead of payment under Penal Law § 60.35.",
      "A NY defendant has the right to appeal most sentences to the Appellate Division under CPL Article 450 — the criminal-appeal entry covers this in detail."
    ]
  },

  legalOptions: {
    en: [
      "Monroe County Public Defender at (585) 753-4210 — represents indigent defendants through sentencing with full advocacy including pre-sentence investigation.",
      "Monroe County 18-B Assigned Counsel Program — conflict-case sentencing representation.",
      "Monroe County Probation Department — conducts the pre-sentence investigation that shapes the sentencing recommendation.",
      "NY Office of Victim Services — advises victims on restitution rights and coordinates impact statements under Criminal Procedure Law § 380.50.",
      "Legal Aid Society of Rochester at (585) 232-4090 — collateral consequences counseling (housing, employment, immigration) that can shape sentencing arguments.",
      "Pre-sentence report access under Criminal Procedure Law § 390.50 — defense counsel can request the probation department's pre-sentence report (with certain redactions) before the sentencing date.",
      "Criminal Procedure Law § 220.60 plea-withdrawal motion — available if the court departs from a sentence promised in the plea agreement."
    ]
  },

  example: {
    en: "After pleading guilty to a Class A misdemeanor in Rochester City Court, Ana was sentenced to a one-year conditional discharge under Penal Law § 65.05. The conditions: no new arrests during the year and 40 hours of community service. The court also imposed a $175 mandatory surcharge and $25 crime-victim fee under Penal Law § 60.35, plus $150 in restitution to the store under Penal Law § 60.27. Before sentence, the judge exercised Ana's right of allocution — Ana apologized and explained her circumstances. The Monroe County Public Defender used the allocution and a sentencing memorandum to argue for the conditional discharge instead of jail. The court explained that a violation of the conditions could lead to resentencing up to one year in local jail."
  },

  counsel: [
    {
      type: "government",
      name: "Monroe County Public Defender",
      focus: "Sentencing advocacy, plea-agreement enforcement, allocution",
      qualifier: "Monroe County defendant unable to afford private counsel",
      access: "Assigned at arraignment or by application",
      outcome: "Full representation through sentencing including pre-sentence investigation",
      phone: "",
      url: "https://www.monroecounty.gov/publicdefender",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "nonprofit",
      name: "Legal Aid Society of Rochester",
      focus: "Collateral-consequences counseling for sentencing mitigation",
      qualifier: "Low-income Monroe County defendant",
      access: "Phone intake",
      outcome: "Advice on housing, employment, and immigration effects of sentencing",
      phone: "",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "government",
      name: "NY Office of Victim Services",
      focus: "Victim rights at sentencing including restitution and impact statements",
      qualifier: "Any crime victim in NY",
      access: "Phone, online",
      outcome: "Guidance on Criminal Procedure Law § 380.50 impact statements and restitution advocacy",
      phone: "",
      url: "https://ovs.ny.gov",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "criminal-case-process-ny",
    "rights-when-arrested-ny",
    "clean-slate-ny",
    "criminal-appeal-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "NY criminal sentencing",
    "PEN Article 60",
    "conditional discharge PEN 65.05",
    "probation PEN 65.00",
    "PEN 60.35 mandatory surcharge",
    "PEN 60.27 restitution",
    "right of allocution",
    "CPL 380.50 victim statement",
    "CPL 220.60 plea withdrawal",
    "pre-sentence investigation"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/PEN/P2TEA60",
    "https://www.nysenate.gov/legislation/laws/PEN/60.35",
    "https://www.nysenate.gov/legislation/laws/PEN/60.27"
  ],

  lastVerified: "2026-04-21",
  factCheckedBy: { tool: "websearch", date: "2026-04-30" },
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
