export const CLEAN_SLATE_NY = {
  id: "clean-slate-ny",
  category: "criminal",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY CPL 160.57",
  status: "active",

  // ─── Anchor fields (see src/data/legal/ANCHORS.md) ───
  // 5th anchor candidate. Picked because GSC search-query data showed
  // someone literally typed "automatic sealing" into NY queries
  // (project_gsc_review_2026_05_01.md) and project_anchor_review_difficulty_pattern_2026_05_01.md
  // flagged record-sealing as a strong next-anchor target. CPL 160.57
  // interlocks with CPL 160.50 (favorable-disposition sealing), CPL 160.55
  // (violation/traffic sealing), CPL 160.59 (petition-based sealing), Penal
  // Law Article 220 (drug-felony exception), Correction Law § 168-a
  // (sex-offense definitions), Executive Law § 296(16) (Human Rights Law
  // anti-discrimination right amended into law by Clean Slate), Civil
  // Rights Law § 50-g (unauthorized-disclosure cause of action), and
  // federal NICS / FCRA. R1 expert review applied 2026-05-01 — see
  // src/data/legal/anchor-reviews/clean-slate-ny.md. Hash + lastFetched
  // populated by scripts/check-source-drift.cjs once the relay-Chrome
  // captures source text (NYS Senate hard-blocks bots; same workflow as
  // tenant-habitability-ny). lastFormallyReviewed remains provisional
  // pending R2+ rounds and attorney sign-off.
  isAnchor: true,
  anchorSource: {
    url: "https://www.nysenate.gov/legislation/laws/CPL/160.57",
    hash: "",
    lastFetched: ""
  },
  lastFormallyReviewed: "2026-05-01",
  formallyReviewedBy: "Anthony DiMarzo + WebSearch + R1 expert review (2026-05-01). Provisional, pending R2+ rounds and attorney sign-off. Round-by-round detail: src/data/legal/anchor-reviews/clean-slate-ny.md.",
  pendingLegislation: null,
  sourceChangedSince: null,

  title: { en: "NY Clean Slate Act — Automatic Sealing of Older Criminal Convictions" },

  summary: {
    en: "The NY Clean Slate Act, at Criminal Procedure Law § 160.57, requires the NY court system to automatically seal most older eligible convictions. The law took effect November 16, 2024. Misdemeanors seal three years after the person was sentenced or released, and most felonies seal eight years after the person was sentenced or released — but the clock does not start until any probation, parole, or post-release supervision is fully done. For convictions entered before the law took effect, the court system has until November 16, 2027 to finish the back-log sealing. Convictions entered after November 16, 2024 follow the running 3-year or 8-year schedule with no parallel 2027 deadline. Nothing to file. Sealing is not expungement."
  },

  whoQualifies: {
    en: [
      "A person with a NY misdemeanor conviction at least three years old, measured from when the person was sentenced or released, who has finished any probation, parole, or post-release supervision for that conviction.",
      "A person with a NY felony conviction at least eight years old, measured from when the person was sentenced or released, who has finished any probation, parole, or post-release supervision for that conviction.",
      "A person with a NY DWAI traffic-infraction conviction more than three years old.",
      "A person whose conviction is for an Article 220 drug offense (most NY drug-possession and drug-sale convictions). Class A drug felonies are not blocked by the Class A felony exclusion — but they still must clear every other Clean Slate condition.",
      "A person with no new criminal charge pending anywhere in NY at any level, no new NY conviction picked up since the conviction being sealed, and no requirement to register as a sex offender for the conviction. Corporations and other business-entity defendants are excluded."
    ]
  },

  whatItMeans: {
    en: "The NY Clean Slate Act is Criminal Procedure Law § 160.57. It took effect November 16, 2024. For convictions entered before that date, the NY court system has until November 16, 2027 to seal every eligible record in the back-log. For convictions entered after the effective date, sealing happens on the running 3-year (misdemeanor) or 8-year (felony) clock — there is no parallel 2027 deadline for those.\n\nHow the waiting period works. A NY DWAI (driving while ability impaired) traffic-infraction conviction seals three years after the conviction. A misdemeanor seals three years after the person was released from jail, or three years after sentencing if there was no jail time. A felony seals eight years after the person was released from prison, or eight years after sentencing if there was no prison time. The clock does not start until the person finishes any probation, parole, or post-release supervision for that conviction (§ 160.57(1)(b)(iv)). And if the person picks up a new NY conviction during the waiting period, the prior conviction's clock starts over on the same date as the new conviction's clock — so a new conviction effectively resets both (§ 160.57(1)(b)(i)). Once a conviction meets the rules, sealing happens on its own — no motion, no filing fee, no paperwork from the person convicted.\n\nWho is excluded. The following are not eligible under Clean Slate (§ 160.57(1)(b)): sex offenses and sexually violent offenses, as defined in Correction Law § 168-a; most Class A felonies under the Penal Law (with one exception — drug-related Class A felonies under Article 220 of the Penal Law are not in this exclusion and can still be sealed if every other condition is met (§ 160.57(1)(b)(vi))); anyone with a new criminal charge pending anywhere in NY at any level — violation, misdemeanor, or felony (§ 160.57(1)(b)(iii)); anyone with a felony charge pending in another state (§ 160.57(1)(b)(viii)); anyone with a felony conviction in another state in the previous eight years (§ 160.57(1)(b)(ix)); and corporations and other business-entity defendants (§ 160.57(1)(b)(vii)).\n\nFederal-cooperation caveat. The two out-of-state conditions (the pending out-of-state felony charge and the prior out-of-state felony conviction) only block sealing \"if and when\" federal authorities give NY automated access to the records needed to check them (§ 160.57(1)(b)(viii)–(ix)). As of now that automated access is not in place, so the two out-of-state bars are not yet operative in practice — but they will tighten as soon as the federal data link goes live.\n\nWhat sealing means for a job, license, housing, or clearance. The protection against employers, licensors, and other gatekeepers using a sealed Clean Slate conviction comes from the NY Human Rights Law — Executive Law § 296(16), amended by Clean Slate — not from § 160.57 itself. Under § 296(16), most employers and licensing bodies cannot ask about a sealed conviction, refuse to hire because of it, or fire someone over it, except where federal law requires otherwise. Sealing is not expungement. The record still exists, but most people can't see it.\n\nWho can still see sealed records. Some agencies and people keep access under § 160.57(3)(d) and related provisions. Law enforcement (state, federal, interstate, international) keeps access when acting within official duties. Courts, prosecutors, and defense lawyers can see sealed records when the person later becomes a witness or party in another case. Firearm-licensing agencies and the FBI's NICS system (the National Instant Criminal Background Check System, used for gun-purchase background checks) keep access — meaning a gun store running a NICS check will still see the conviction. Police and peace-officer employers keep access when someone applies for those jobs. Agencies that run sex-offender-registration checks also keep access. The NY State Education Department keeps access for school employment and licensing decisions, the DMV keeps access for driving-related convictions, and transportation network companies (Uber, Lyft) keep access under Vehicle and Traffic Law § 1699.\n\nPlea waivers don't work. A defendant cannot be required to give up Clean Slate sealing eligibility as part of a plea deal, and is not allowed to give it up voluntarily. Any such waiver is void by statute (§ 160.57(4)).\n\nIf sealing was missed or someone violated the rule. If an eligible pre-November 16, 2024 conviction was not sealed by the November 16, 2027 back-log deadline, the person can ask the court to review the missed sealing — the form will be on nycourts.gov by that date. If the sealing happened but someone misused the sealed record (an employer asked about it, a background-check company sold it, an agency disclosed it without authorization), § 160.57 itself gives the person a right to sue for damages, including punitive damages. Civil Rights Law § 50-g adds a parallel cause of action for unauthorized disclosure of a sealed record. To check whether a conviction is sealed, a person can request a copy of their own NY criminal-history record from DCJS — the request requires fingerprints (through IdentoGo) and a fee, with waivers available for low-income applicants.\n\nParallel pathway: § 160.59. A person who does not qualify under Clean Slate can still petition the sentencing court to seal up to two convictions (no more than one felony) after a ten-year wait. Unlike Clean Slate, § 160.59 requires a motion filed in court with the District Attorney's office notified. There is no filing fee, but the motion paperwork — a Certificate of Disposition for each case, a notarized Notice of Motion and Affidavit in Support, and service on the DA of every county where a conviction occurred — is significant. The two pathways operate at the same time. For someone who qualifies under both, § 160.59 may finish before automation reaches them; for someone Clean Slate doesn't reach at all, § 160.59 is the only path.\n\nWhat Clean Slate does not reach. Federal convictions, out-of-state convictions, and offenses requiring sex-offender registration. Immigration is a separate question — federal immigration law may still require disclosure of a sealed conviction, and a sealed record does not erase the offense for immigration purposes.\n\nIn Monroe County, free help with Clean Slate questions, § 160.59 motion preparation, and questions about how a record affects jobs, housing, and licensing comes from LawNY's Reentry / Employment Rights project at (585) 325-2520. The Legal Action Center's statewide hotline at (212) 243-1313 also offers free advice on these issues with no income cap."
  },

  yourRights: {
    en: [
      "A person with a NY conviction that meets the Clean Slate criteria has the right to automatic sealing without a filing fee or application.",
      "A person whose NY conviction is sealed has the right under the NY Human Rights Law (Executive Law § 296(16)) not to be asked about, refused, or fired from a job, license, or clearance because of the sealed conviction — except where federal law requires otherwise.",
      "A person convicted of an Article 220 drug offense, including a Class A drug felony, is not blocked by the Class A felony exclusion and can still qualify for Clean Slate sealing if every other condition is met.",
      "A person whose eligible pre-November 16, 2024 conviction was not sealed by the November 16, 2027 back-log deadline has the right to ask the court to review the missed sealing.",
      "A person not eligible under Clean Slate retains the right to petition the sentencing court to seal up to two convictions (no more than one felony) after a ten-year wait.",
      "A person cannot be required to waive Clean Slate sealing eligibility as part of a plea deal — any such waiver is void.",
      "A person harmed by a violation of Clean Slate sealing, or by someone disclosing a sealed record without authorization, can sue for damages — including punitive damages — under Clean Slate itself and Civil Rights Law § 50-g.",
      "A person can request a copy of their own NY criminal-history record from DCJS to verify whether a conviction is sealed."
    ]
  },

  legalOptions: {
    en: [
      "NY Unified Court System Clean Slate information at nycourts.gov/FORMS/criminal-record-sealing.shtml — rules, implementation timeline, and review-request form (available by November 16, 2027).",
      "NY Division of Criminal Justice Services (DCJS) at criminaljustice.ny.gov — records request for a person's own criminal history. The request requires fingerprints (through IdentoGo) and a fee, with waivers available for low-income applicants.",
      "Legal Action Center statewide hotline at (212) 243-1313 — free advice on Clean Slate questions, § 160.59 petitions, and how a record affects jobs, housing, and licensing. No income cap on hotline advice.",
      "LawNY Reentry / Employment Rights project at (585) 325-2520 — Clean Slate support, § 160.59 motion preparation, and help with employment and housing denials based on records. Routes to the Rochester office (Monroe County); other LawNY counties have separate offices listed at lawny.org/FindaLawyer.",
      "Monroe County Public Defender Office at (585) 753-4210 — represents low-income clients in active criminal cases. Standalone post-conviction § 160.59 motions are not the office's published mandate, but the intake line can confirm whether a specific case fits.",
      "Clean Slate NY campaign information at cleanslateny.org/faq — plain-language Q&A on implementation."
    ]
  },

  example: {
    en: "DeShawn was convicted of a non-violent Class C felony in 2014 and served two years in state prison. He was released in 2016 and finished his post-release supervision (a parole-like check-in period) in 2017. He has had no new arrests or convictions since. Because the Clean Slate clock does not start until supervision is fully done, DeShawn's eight-year felony clock began in 2017, so the conviction became eligible for automatic sealing in 2025. Because the conviction was entered before Clean Slate took effect (November 16, 2024), it sits inside the pre-existing-conviction back-log that the NY court system has until November 16, 2027 to clear. Once the automated process reaches his record, the conviction is sealed on its own. DeShawn files no motion and pays no fee. Once sealed, the conviction will not appear on most civil background checks, and under the NY Human Rights Law (Executive Law § 296(16)) most employers and licensors cannot ask about it, refuse to hire him because of it, or fire him over it."
  },

  counsel: [
    {
      type: "nonprofit",
      name: "LawNY — Reentry / Employment Rights project",
      focus: "Clean Slate sealing questions, Criminal Procedure Law § 160.59 motion preparation, and discrimination based on a sealed record in employment, housing, and licensing.",
      qualifier: "Low-income Monroe County resident. The (585) 325-2520 number routes to the Rochester office; LawNY's other 13 service counties have separate offices listed at lawny.org/FindaLawyer.",
      access: "Phone intake.",
      outcome: "Free representation and advice.",
      phone: "(585) 325-2520",
      url: "https://www.lawny.org",
      verified: true,
      bilingual: false,
      languages: ["es"]
    },
    {
      type: "free",
      name: "Legal Action Center",
      focus: "Statewide Clean Slate guidance, § 160.59 petitions, RAP-sheet review, and discrimination tied to sealed records.",
      qualifier: "Any New Yorker with a criminal record issue — no income cap on hotline advice.",
      access: "Phone helpline at (212) 243-1313 or online intake at lac.org.",
      outcome: "Free advice; sometimes direct representation on sealing motions and discrimination claims.",
      phone: "(212) 243-1313",
      url: "https://www.lac.org/",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "government",
      name: "Monroe County Public Defender",
      focus: "Representation of low-income clients in active criminal cases. Standalone post-conviction § 160.59 motions are not the office's published mandate; the intake line can confirm whether a specific case fits.",
      qualifier: "Monroe County resident unable to afford a private attorney.",
      access: "Phone intake. The office maintains a Language Access Plan for interpreter services rather than bilingual staff representation.",
      outcome: "Free representation in pending criminal cases.",
      phone: "(585) 753-4210",
      url: "https://www.monroecounty.gov/defender",
      verified: true,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    "rights-when-arrested-ny",
    "expungement-vs-sealing-ny",
    "dismissed-case-sealing-ny",
    "marijuana-sealing-ny",
    "fair-chance-act-ban-the-box-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "NY Clean Slate Act",
    "CPL 160.57",
    "automatic sealing NY",
    "misdemeanor 3 year seal",
    "felony 8 year seal",
    "CPL 160.59 petition sealing",
    "background check sealed record",
    "Article 220 drug felony sealing",
    "sex offense not sealed",
    "NY record sealing",
    "Executive Law 296(16)",
    "plea waiver void Clean Slate"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/CPL/160.57",
    "https://www.nysenate.gov/legislation/laws/EXC/296",
    "https://www.nycourts.gov/FORMS/criminal-record-sealing.shtml",
    "https://www.lawny.org/node/571/new-york-state-clean-slate-act"
  ],

  lastVerified: "2026-05-01",
  factCheckedBy: { tool: "websearch+webfetch", date: "2026-05-01" },
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
