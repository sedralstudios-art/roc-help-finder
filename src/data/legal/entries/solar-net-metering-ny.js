export const SOLAR_NET_METERING_NY = {
  id: "solar-net-metering-ny",
  category: "housing",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY PBS 66-J",
  status: "active",

  title: { en: "NY Home Solar Net Metering — Credit on the Electric Bill for Solar Power Sent Back" },

  summary: {
    en: "New York Public Service Law 66-j requires electric utilities including RG&E to offer net metering to customers with home solar panels up to 25 kilowatts. Excess solar energy sent back to the grid earns credit against future electric usage. Since 2017, new solar customers are on the Value of Distributed Energy Resources (VDER) tariff, which pays slightly less than 1-for-1 but still significantly offsets monthly bills."
  },

  whoQualifies: {
    en: [
      "Any NY homeowner with a rooftop solar installation up to 25 kilowatts.",
      "Any small business or nonprofit with a solar installation that meets size limits.",
      "An RG&E, National Grid, NYSEG, or other investor-owned utility customer who has applied for interconnection.",
      "A homeowner considering solar who wants to understand the bill credit mechanism.",
      "A community solar subscriber who receives allocated net metering credits from a shared solar project."
    ]
  },

  whatItMeans: {
    en: "New York Public Service Law Section 66-j authorizes net metering for customer-owned generation including home solar. Every investor-owned utility including RG&E, National Grid, NYSEG, Con Edison, Orange & Rockland, and Central Hudson must offer net metering to residential customers with solar installations up to 25 kilowatts. The original net metering rule (pre-2017) was a simple 1-for-1 credit — 1 kilowatt-hour of excess solar sent to the grid equaled 1 kilowatt-hour of credit against future usage. The NY Public Service Commission replaced that with the Value of Distributed Energy Resources (VDER) tariff starting in 2017 for new solar customers. VDER values excess solar based on a component called the Value Stack — a combination of the wholesale energy price, capacity value, environmental value (carbon offset credit), demand reduction value, and location-based value. The exact credit per kilowatt-hour varies by utility and time of day but typically ranges 8 to 14 cents per kWh, lower than the retail rate a customer pays (typically 14 to 18 cents per kWh in Monroe County). A residential solar customer who generated 6,000 kWh per year in excess of on-site use would earn approximately 600 to 800 dollars in annual credit under VDER, slightly less than the roughly 900 dollars that would have been earned under pre-2017 net metering. Existing customers who installed solar before 2017 are grandfathered to the original net metering rule for 20 years from their interconnection date. How it works in practice: solar panels generate electricity during the day. The home uses what it needs, and any excess flows to the utility grid through a bi-directional meter. At night or during cloudy periods, the home draws from the grid. The monthly bill shows two amounts — the kilowatt-hours imported from the grid (at the full retail rate) and the kilowatt-hours exported back (credited at the VDER rate or retail 1-for-1 for grandfathered customers). The net amount is billed. In months with large excess generation (summer peak sun), the customer may have a credit that rolls to the next month. Annual true-up occurs at the end of the billing year — remaining credit is usually paid out as a check or held as credit at the customer's option. Installation process: homeowner contacts a NY-certified solar installer (NYSERDA maintains a list at nyserda.ny.gov), gets a site assessment, signs a contract (purchase, financed loan, or lease / Power Purchase Agreement), the installer handles the utility interconnection application and permits with the town, panels are installed (typically 2 to 5 days), utility inspection and final commissioning (2 to 4 weeks), net metering begins at interconnection. Costs: a typical 7 kilowatt rooftop system in Monroe County is 18,000 to 25,000 dollars before incentives. Incentives include the federal Residential Clean Energy Credit (30 percent of the system cost as a tax credit under IRC 25D), the NY-Sun rebate up to 400 dollars per kilowatt (administered by NYSERDA), and the NY solar tax credit up to 5,000 dollars under Tax Law 606. After incentives, the out-of-pocket cost typically drops to 10,000 to 15,000 dollars. Payback period runs 8 to 14 years depending on the system size, incentives, electricity rates, and sun exposure. For community solar subscribers, net metering credits from the shared solar project are allocated to subscriber bills at VDER rates without the subscriber needing to install panels or maintain equipment. Community solar is a good option for renters, homeowners with unsuitable roofs, or those who do not want to invest in their own system."
  },

  yourRights: {
    en: [
      "A NY residential customer up to 25 kW solar has the right to net metering under Public Service Law § 66-j.",
      "A pre-2017 solar customer has the right to grandfathered 1-for-1 net metering for 20 years.",
      "A post-2017 customer has the right to VDER Value Stack compensation for excess generation.",
      "A customer has the right to annual true-up and payout of accumulated credit.",
      "A customer has the right to the federal 30 percent Residential Clean Energy Credit under IRC 25D.",
      "A renter or unsuitable-roof homeowner has the right to community solar with allocated net metering."
    ]
  },

  legalOptions: {
    en: [
      "NYS Public Service Commission at (800) 342-3377 handles net metering complaints and tariff questions.",
      "RG&E Solar Interconnection at (800) 743-1701 handles Monroe County solar applications.",
      "NYSERDA Solar Information at (866) 697-3732 provides incentive guidance and installer locator.",
      "NYSERDA NY-Sun rebate application at nyserda.ny.gov/solar.",
      "For community solar, Monroe County subscription options available through nyserda.ny.gov/community-solar.",
      "IRS Residential Clean Energy Credit at irs.gov/residential-clean-energy-credit for federal incentive."
    ]
  },

  example: {
    en: "The Cheng family installed a 7.2 kilowatt rooftop solar system on their Brighton home in 2024 through a NYSERDA-certified installer for 21,000 dollars before incentives. They received a 6,300 dollar federal tax credit, a 2,880 dollar NY-Sun rebate, and a 5,000 dollar NY state solar tax credit. Net out-of-pocket was 6,820 dollars. Their first year of operation produced 9,200 kWh — about 5,400 kWh consumed on-site and 3,800 kWh exported to the grid. Annual net metering credits from RG&E at VDER rates totaled approximately 440 dollars against their electric bill. Projected payback roughly 10 years."
  },

  counsel: [
    {
      type: "government",
      name: "NYS Public Service Commission",
      focus: "Net metering rules, tariff compliance, customer complaints",
      qualifier: "Any NY electricity customer",
      access: "Phone, online complaint portal",
      outcome: "Investigation, tariff enforcement",
      phone: "",
      url: "https://dps.ny.gov",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "government",
      name: "NYSERDA Solar Information",
      focus: "Incentive programs, NY-Sun rebate, certified installer locator",
      qualifier: "Any NY homeowner considering solar",
      access: "Phone, online installer directory",
      outcome: "Incentive application help, installer referrals",
      phone: "",
      url: "https://www.nyserda.ny.gov/solar",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "solar-panel-rules-ny",
    "community-solar-subscription-ny",
    "home-energy-audit-rebates-ny",
    "weatherization-assistance-ny",
    "attic-insulation-rebate-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "NY solar net metering",
    "PBS 66-j",
    "VDER Value Stack",
    "home solar NY",
    "RG&E solar",
    "NY-Sun rebate",
    "NYSERDA solar",
    "federal clean energy credit",
    "Tax 606 solar",
    "rooftop solar Monroe County"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/PBS/66-J",
    "https://www.nyserda.ny.gov/All-Programs/NY-Sun"
  ],

  lastVerified: "2026-04-20",
  factCheckedBy: { tool: "websearch", date: "2026-04-30" },
  volatility: "medium",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
