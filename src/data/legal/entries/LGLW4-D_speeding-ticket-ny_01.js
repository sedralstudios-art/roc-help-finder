export const SPEEDING_TICKET_NY = {
  id: "speeding-ticket-ny",
  category: "vehicle",
  tier: "state",
  jurisdiction: "us-ny",
  status: "active",

  title: { en: "Speeding Tickets — What Points, Fines, and Consequences You Face" },

  summary: {
    en: "A speeding ticket in New York is more than just a fine. It adds points to your license, triggers mandatory surcharges, and can increase your insurance rates for years. Too many points may lead to license suspension. You have the right to plead not guilty and contest the ticket in court."
  },

  whoQualifies: {
    en: [
      "Any driver who receives a speeding ticket under VTL § 1180 in New York State.",
      "This includes New York licensed drivers, out-of-state drivers ticketed in New York, and commercial drivers (who face additional CDL consequences).",
      "Drivers who receive tickets from automated work zone speed cameras also receive points and fines under VTL § 1180(f).",
      "These protections and consequences apply whether the ticket is issued by state police, county sheriff, or local police."
    ]
  },

  whatItMeans: {
    en: "Under VTL § 1180, New York assigns points to your driving record based on how fast you were going over the posted limit. The points are 4 for 1–10 mph over, 4 for 11–20 mph over, 6 for 21–30 mph over, 8 for 31–40 mph over, and 11 for 41 or more mph over. Fines range from $45 to $600 for a first offense, with higher fines for school zones and work zones. A mandatory state surcharge of $88 to $93 is added on top of the fine. If you accumulate 6 or more points within 18 months, the DMV imposes a Driver Responsibility Assessment. This is an additional annual fee of $300 plus $75 per point over six, payable for three consecutive years."
  },

  yourRights: {
    en: [
      "You have the right to plead not guilty to a speeding ticket and have a hearing or trial before a judge.",
      "Outside of New York City, traffic cases are heard in local courts (town, village, or city court) where plea negotiations are generally permitted and an attorney may appear on your behalf without you being present.",
      "You have the right to see the evidence against you, including the officer's notes and the method used to determine your speed.",
      "You have the right to take a DMV-approved Defensive Driving Course (also called the Point and Insurance Reduction Program) to reduce up to 4 points from your record and receive a 10% auto insurance discount for three years.",
      "If you receive a notice that your license will be suspended due to point accumulation, you have the right to request a hearing before the suspension takes effect (VTL § 510).",
      "You have the right to challenge the accuracy of the speed detection method used — radar, laser, pacing, or visual estimation."
    ]
  },

  legalOptions: {
    en: [
      "In most local courts outside New York City, traffic attorneys regularly negotiate speeding tickets down to non-moving violations or lower-point offenses. A reduction to a non-point violation can avoid the Driver Responsibility Assessment, insurance increases, and points on your record.",
      "In New York City, speeding tickets are handled by the Traffic Violations Bureau (TVB), where plea bargaining is not permitted. Drivers must either plead guilty or have a hearing before an administrative law judge.",
      "The New York DMV's Point and Insurance Reduction Program (PIRP) — commonly called a Defensive Driving Course — is available online or in person. Completing the course reduces up to 4 points for DMV purposes and provides a 10% insurance discount for three years. Course information is available at dmv.ny.gov.",
      "Under VTL § 510, accumulating 10 or more points within a 24-month period may result in license suspension. Accumulating 11 or more points results in mandatory revocation. Three speeding convictions within 18 months also triggers mandatory revocation. These thresholds were updated effective February 16, 2026.",
      "Current fine schedules, point values, and surcharge amounts are published by the Governor's Traffic Safety Committee at trafficsafety.ny.gov and by the DMV at dmv.ny.gov.",
      "Free or low-cost legal help may be available for drivers who cannot afford an attorney. In Monroe County, the Legal Aid Society of Rochester at (585) 232-4090 may assist with traffic-related legal issues that affect employment, housing, or public benefits."
    ]
  },

  example: {
    en: "Jenna was pulled over on Route 31 in Wayne County for going 78 in a 55 mph zone — 23 miles per hour over the posted limit. The ticket was written under VTL § 1180(d). A conviction at that speed would add 6 points to her license and trigger a Driver Responsibility Assessment of $300 per year for three years, on top of a fine up to $300 plus a $93 surcharge. Jenna pleaded not guilty and appeared in the local town court. The prosecutor agreed to reduce the charge to a non-point parking violation in exchange for a higher fine. Jenna paid $200 total and avoided any points on her license."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Civil legal issues arising from traffic matters — license suspension affecting employment, housing, benefits",
      qualifier: "Low income residents of Monroe County and surrounding counties",
      access: "Phone intake at (585) 232-4090",
      outcome: "Advice and referral on traffic-related civil consequences",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "dwi-first-offense-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "speeding ticket",
    "traffic ticket",
    "points on license",
    "how many points",
    "license suspended",
    "too many points",
    "fight a ticket",
    "plead not guilty",
    "traffic court",
    "fine for speeding",
    "driver responsibility assessment",
    "defensive driving course",
    "insurance went up",
    "work zone speeding",
    "school zone ticket"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/VAT/1180",
    "https://dmv.ny.gov/driver-license-points-and-penalties",
    "https://trafficsafety.ny.gov/penalties-speeding",
    "https://dmv.ny.gov/tickets/pay-driver-responsibility-assessment"
  ],

  lastVerified: "2026-04-04",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
