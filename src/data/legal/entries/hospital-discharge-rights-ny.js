export const HOSPITAL_DISCHARGE_RIGHTS_NY = {
  id: "hospital-discharge-rights-ny",
  category: "health",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY PBH 2803-W",
  status: "active",

  title: { en: "Hospital Discharge Rights — Unsafe Discharge, Observation Status, and the NY CARE Act" },

  summary: {
    en: "A hospital cannot safely discharge a patient without a workable plan. New York Public Health Law and federal Medicare rules require written discharge instructions, caregiver designation and training under the CARE Act, and prompt notice when a patient is on observation status rather than admitted. A patient who believes discharge is unsafe has the right to a quick independent review."
  },

  whoQualifies: {
    en: [
      "Any patient in a New York hospital facing discharge.",
      "Any family member or caregiver involved in a patient's post-hospital care.",
      "Any Medicare beneficiary receiving outpatient observation services rather than inpatient admission.",
      "Any patient or family member who believes a planned discharge is unsafe or premature."
    ]
  },

  whatItMeans: {
    en: "Hospital discharge is regulated under several layers of law. Each layer adds specific patient rights, and together they give patients and caregivers real leverage over when and how a discharge happens.\n\nNew York discharge planning rules. Public Health Law 2803 and the NY Patients' Bill of Rights (10 NYCRR Part 405.7) require every hospital to involve the patient and chosen caregiver in discharge planning. The hospital has to provide written discharge instructions in the patient's primary language. It has to arrange post-discharge care — whether that is home health, visiting nurses, durable medical equipment, or transfer to a skilled nursing facility.\n\nThe CARE Act. The NY Caregiver Advise, Record, Enable (CARE) Act was enacted in 2016 as Public Health Law 2803-w. It gives every hospital patient four specific rights. First, the right to designate a caregiver upon admission. Second, the right to have the caregiver's name recorded in the medical record. Third, the right to be notified before the hospital plans to discharge. Fourth, the right to in-person or telephone instruction on any medical or nursing tasks the caregiver will perform at home. The covered tasks include medication management, wound care, injections, and equipment use.\n\nFederal NOTICE Act and observation status. Many Medicare patients are placed on observation status (outpatient) rather than admitted (inpatient). The two statuses look identical to the patient — same bed, same monitoring, same nurses. They are not identical for billing. The federal NOTICE Act (42 USC 1395cc) requires hospitals to give observation-status Medicare patients a written Medicare Outpatient Observation Notice (MOON) within 36 hours.\n\nWhy observation status matters. Observation does not count toward the 3-day inpatient stay that triggers Medicare coverage for a later skilled nursing facility. Observation patients often face outpatient copays instead of the inpatient deductible. On a long stay, the difference can be thousands of dollars. Asking about status — and getting the MOON in writing within 36 hours — is the first step.\n\nMedicare appeal rights. A Medicare patient who disagrees with a planned discharge has the right to review by a Quality Improvement Organization (QIO). In New York the QIO is Livanta, reached at [number being verified]. Requesting a QIO review before the discharge date keeps the hospital stay covered while Livanta reviews. A decision typically comes within 24 hours. Without the pre-discharge request, the patient may be on the hook for the days after the planned discharge date if the hospital stay continues.\n\nPrivate insurance appeals. Patients with private or Medicare Advantage coverage have similar appeal rights under the plan documents. The plan's member services number (on the insurance card) is the starting point.\n\nUnsafe discharge. Discharging a patient who has nowhere to go, no family support, unmanaged pain, or unstable medical conditions can be reported to NYS DOH at [number being verified]. Hospitals also have their own patient advocate or ombudsman who can intervene.\n\nThe social worker is the usual ally. Hospital social workers and discharge planners are the first point of contact for discharge issues. They can arrange home health aides, durable medical equipment, visiting nurses, transportation home, and short-term nursing home placement when needed. A patient or caregiver who disagrees with a discharge plan should start by asking for a meeting with the social worker."
  },

  yourRights: {
    en: [
      "A patient has the right to designate a caregiver upon admission and have the caregiver trained before discharge (CARE Act).",
      "A patient has the right to written discharge instructions in the patient's primary language.",
      "A Medicare patient on observation status has the right to written MOON notice within 36 hours.",
      "A Medicare patient facing discharge has the right to request QIO review through Livanta before leaving.",
      "A patient has the right to participate in discharge planning and object to a planned discharge.",
      "A patient discharged unsafely has the right to file a complaint with NYS DOH.",
      "A patient has the right to appeal discharge decisions through private insurance plan procedures."
    ]
  },

  legalOptions: {
    en: [
      "Before discharge: ask for the hospital social worker or discharge planner to discuss the discharge plan.",
      "Medicare QIO review (Livanta) at (866) 815-5440 — call before the discharge date to keep coverage during review.",
      "NYS DOH Hospital Complaint Line at (800) 804-5447 — for unsafe discharge complaints.",
      "NYS DOH Patient Rights information at health.ny.gov.",
      "Medicare Rights Center at (800) 333-4114 — free counseling on hospital and Medicare appeals.",
      "Lifespan of Greater Rochester at (585) 244-8400 — older-adult caregiver support and advocacy.",
      "Monroe County Office for the Aging at (585) 753-6280 — senior-specific discharge planning assistance.",
      "Legal Aid Society of Rochester at (585) 232-4090 — for low-income patients facing unsafe discharge."
    ]
  },

  example: {
    en: "A Rochester Medicare beneficiary was admitted to a hospital for heart failure, stayed four nights, and was told she would be discharged in the morning. She was too unsteady to walk safely and her daughter (the designated caregiver under the CARE Act) had not yet received training on the new diuretic schedule. The daughter asked for the hospital social worker, who arranged a bedside caregiver training session and a home health aide referral. The daughter also called Livanta to request QIO review of the discharge timing — Livanta kept Medicare coverage in place overnight while reviewing the case. The review found discharge was premature; the hospital agreed to one more day, arranged visiting nurse services, and discharged her the next afternoon with written instructions and a delivered walker."
  },

  counsel: [
    {
      type: "government",
      name: "Livanta — Medicare QIO for New York",
      focus: "Medicare discharge appeals, quality of care complaints",
      qualifier: "Medicare beneficiaries",
      access: "Phone at (866) 815-5440",
      outcome: "Independent review of discharge decisions, quality complaints",
      phone: "",
      url: "https://livanta.com",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "nonprofit",
      name: "Lifespan of Greater Rochester",
      focus: "Caregiver support, hospital discharge advocacy for older adults",
      qualifier: "Adults 60+ and their caregivers in the Rochester region",
      access: "Phone at (585) 244-8400",
      outcome: "Care planning, caregiver training, elder advocacy",
      phone: "",
      url: "https://www.lifespan-roch.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "government",
      name: "NYS Department of Health — Hospital Complaints",
      focus: "Unsafe discharge complaints, patient rights enforcement",
      qualifier: "Any NY hospital patient or family member",
      access: "Phone at (800) 804-5447",
      outcome: "Complaint investigation, regulatory enforcement",
      phone: "",
      url: "https://health.ny.gov",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "nursing-home-discharge-rights-ny",
    "living-will-advance-directive-ny",
    "caregiver-rights-family-ny",
    "medicare-late-enrollment-penalty-ny",
    "adult-protective-services-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "hospital discharge",
    "CARE Act",
    "PHL 2803-w",
    "observation status",
    "NOTICE Act",
    "MOON notice",
    "Livanta QIO",
    "unsafe discharge",
    "Medicare appeal",
    "caregiver training"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/PBH/2803-W",
    "https://www.nysenate.gov/legislation/laws/PBH/2803",
    "https://www.law.cornell.edu/uscode/text/42/1395cc"
  ],

  lastVerified: "2026-04-23",
  factCheckedBy: { tool: "websearch", date: "2026-04-30" },
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
