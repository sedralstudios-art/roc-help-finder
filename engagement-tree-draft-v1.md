# engagement-tree-draft-v1.json

> Discovery-mode engagement questionnaire — first taxonomy draft for review BEFORE any UI work. See project_engagement_questionnaire_2026_05_02.md for full design rationale.

Status: **draft for review — not wired into the app**.  Version: draft-v1.  Created: 2026-05-02.

**32 nodes** (7 questions, 25 leaves) · **86 suggestion slots** · avg 3.4 per leaf.

---

## 🏁 What's the biggest thing on your mind right now?  `[start]`
_Pick the one that fits best — you can come back and try other paths._

- ▸ **Money is tight or bills are piling up** → `money-which`
- ▸ **Health, doctor, or medication problem** → `health-which`
- ▸ **Something at work or losing my job** → `work-which`
- ▸ **Where I live — eviction, repairs, no place to go** → `housing-which`
- ▸ **Family — kids, breakup, caregiving, baby on the way** → `family-which`
- ▸ **Something about my situation — record, immigration, age, disability** → `status-which`
- ▸ **Something else / not sure** → `leaf-not-sure`

  ## ❓ Which of these is the biggest pain right now?  `[money-which]`

  - ▸ **Can't pay rent or behind on rent** → `leaf-money-rent`
  - ▸ **Not enough food in the house** → `leaf-money-food`
  - ▸ **Behind on heat / electric / gas** → `leaf-money-utilities`
  - ▸ **Drowning in debt or credit-card calls** → `leaf-money-debt`
  - ▸ **Need cash now and don't know where to start** → `leaf-money-cash`

    ### 🍀 leaf  `[leaf-money-rent]`
    _Behind on rent has more options than most people realize. Here's a starting list — none of these require a lawyer._

    - `ta` (program) — Emergency rent / one-shot deal at Monroe County DSS — apply in person at 691 St Paul
    - `communityplace` (program) — Rent assistance + case management; specific zips
    - `eviction-process-ny` (entry) — What the landlord has to do BEFORE eviction — buys time and may surface defenses
    - `tenant-habitability-ny` (entry) — Rent-withholding may be available if the unit has serious problems the landlord won't fix
    - `211` (program) — Call 211 — they coordinate emergency rental assistance and can route to current programs

    🎯 SEO target queries: `behind on rent ny`, `rent assistance rochester`, `emergency rental assistance ny`, `can't pay rent help`, `one shot deal monroe county`

    ### 🍀 leaf  `[leaf-money-food]`
    _Several things stack on top of each other — most don't require an income check._

    - `snap` (program) — Monthly food benefit on an EBT card
    - `snap-rights-ny` (entry) — What rights SNAP recipients have — recertification, fair hearings, post-conviction eligibility
    - `foodlink` (program) — Free pantry — no paperwork, no income check at most locations
    - `wic` (program) — If pregnant, postpartum, or kids under 5 — extra free food + nutrition counseling
    - `meals` (program) — If RCSD student — free breakfast and lunch automatically
    - `market` (program) — Rochester Public Market — Double Up matches SNAP $1-for-$1 on produce
    - `mow` (program) — Meals on Wheels if 60+ or homebound

    🎯 SEO target queries: `snap eligibility ny`, `food assistance ny`, `food pantry rochester`, `wic eligibility ny`, `free food near me`, `ebt apply ny`, `snap requirements ny`

    ### 🍀 leaf  `[leaf-money-utilities]`
    _Utility shutoff has a specific path — and there's a separate program for the equipment itself._

    - `heap` (program) — Help with heating bills; emergency HEAP if heat is shut off
    - `herr` (program) — If 60+ and own the home — pays up to $4-8K to repair or replace the furnace
    - `rge` (program) — RG&E payment plans — call BEFORE shutoff
    - `empower` (program) — Free home insulation, air sealing, heat pumps — lowers future bills

    🎯 SEO target queries: `heap ny apply`, `emergency heap ny`, `can't pay heat bill`, `rge payment plan`, `heap eligibility ny`, `furnace replacement help ny`

    ### 🍀 leaf  `[leaf-money-debt]`
    _Free help here — be wary of for-profit 'debt relief' companies._

    - `fec` (program) — Rochester Financial Empowerment Center — free 1-on-1 debt counseling
    - `bankruptcyhelp` (program) — JustCause monthly bankruptcy clinic — find out if Chapter 7 or 13 fits
    - `rmapi` (program) — Free coaching and financial counseling

    🎯 SEO target queries: `debt help free ny`, `credit counseling rochester`, `bankruptcy help free rochester`, `drowning in debt help`, `financial empowerment center`

    ### 🍀 leaf  `[leaf-money-cash]`
    _There's no single 'just give me money' program, but a few benefits add up. The state's myBenefits portal is the one application that covers most._

    - `myb` (program) — One application — SNAP + Medicaid + cash assistance + HEAP + childcare in one
    - `ta` (program) — Temporary Assistance — monthly cash for rent, utilities, basics
    - `eitc` (program) — Earned Income Tax Credit — refundable, you may have unclaimed past years
    - `vita` (program) — CASH/VITA does free tax prep — can help recover past EITC
    - `benefits-verification-letter-ny-program` (entry) — How to prove SNAP/Medicaid/cash receipt to landlord, employer, court — uniform letter from each agency

    🎯 SEO target queries: `what benefits do i qualify for`, `what assistance is available ny`, `mybenefits ny gov`, `cash assistance ny`, `one application ny benefits`, `temporary assistance ny`

  ## ❓ What's the most pressing health issue?  `[health-which]`

  - ▸ **No insurance / lost insurance** → `leaf-health-insurance`
  - ▸ **Can't afford prescriptions** → `leaf-health-rx`
  - ▸ **Mental health crisis or addiction** → `leaf-health-crisis`
  - ▸ **Need a doctor / dentist and can't pay** → `leaf-health-clinic`

    ### 🍀 leaf  `[leaf-health-insurance]`
    _Most NY adults under 65 apply through NY State of Health. Different doors for different situations._

    - `medicaid` (program) — Free or very low cost — covers doctors, hospital, dental, mental health, prescriptions
    - `chip` (program) — If kids under 19 — free or low-cost coverage with a per-income premium
    - `myb` (program) — One application covers Medicaid + cash + SNAP + HEAP

    🎯 SEO target queries: `medicaid eligibility ny`, `free health insurance ny`, `no insurance what to do ny`, `ny state of health enroll`, `child health plus ny`, `medicaid apply ny`

    ### 🍀 leaf  `[leaf-health-rx]`
    _Three things stack here — and the state has a senior-specific program most people miss._

    - `nyrxcard` (program) — Free discount card — up to 80% off, no application, use at CVS or Wegmans
    - `epic` (program) — EPIC — NY's prescription program for seniors 65+ on Medicare
    - `trill` (program) — Trillium pharmacy — sliding scale, no insurance required

    🎯 SEO target queries: `free prescription discount ny`, `epic ny seniors`, `can't afford medication`, `ny rx card`, `prescription help ny`, `medicare part d help ny`

    ### 🍀 leaf  `[leaf-health-crisis]`
    > ⚠ **If suicide or immediate self-harm: call or text 988 — free, 24/7. Spanish text: AYUDA to 988.**
    _If in immediate danger to self or others, call 988 right now or go to a Strong walk-in. Otherwise these are the next-best paths._

    - `988crisis` (program) — Suicide and crisis lifeline — 24/7, includes addiction crisis
    - `strongcrisis` (program) — Strong Memorial Psych Emergency — walk-in 24/7, no appointment
    - `bhacccrisis` (program) — BHACC — walk-in crisis center, no appointment, daily 9am-9pm
    - `trill` (program) — Trillium Health behavioral health — sliding scale

    🎯 SEO target queries: `988 lifeline`, `mental health crisis rochester`, `suicide hotline ny`, `psych emergency rochester`, `behavioral health crisis center rochester`

    ### 🍀 leaf  `[leaf-health-clinic]`
    _Sliding-scale clinics see anyone who walks in — Jordan and Trillium take everyone insured or not._

    - `jordan` (program) — Jordan Health Center — primary care, dental, mental health, walk-ins welcome
    - `trill` (program) — Trillium Health — primary care, sliding scale, LGBTQ+ healthcare leader
    - `eastmandental` (program) — Eastman Dental — sliding scale dental, walk-ins for emergencies
    - `pp` (program) — Planned Parenthood — reproductive health + birth control + STI testing

    🎯 SEO target queries: `free clinic rochester`, `sliding scale clinic rochester`, `no insurance doctor rochester`, `free dental rochester`, `jordan health center`, `trillium health rochester`

  ## ❓ Which one is closest?  `[work-which]`

  - ▸ **Got fired or laid off** → `leaf-work-fired`
  - ▸ **Hurt at work** → `leaf-work-injury`
  - ▸ **Boss isn't paying me / wage theft** → `leaf-work-wages`
  - ▸ **Looking for work / training** → `leaf-work-training`

    ### 🍀 leaf  `[leaf-work-fired]`
    _Some firings are unlawful even in an at-will state. Filing has hard deadlines._

    - `wrongful-termination-ny` (entry) — When a firing is against the law — discrimination, retaliation, whistleblower
    - `ta` (program) — Temporary Assistance to bridge until next paycheck
    - `snap` (program) — Apply right away — SNAP processes faster after job loss
    - `medicaid` (program) — Lost-job often qualifies for Medicaid even if it didn't before

    🎯 SEO target queries: `wrongfully fired ny`, `fired for retaliation ny`, `wrongful termination new york`, `discrimination at work ny`, `at will employment ny`, `ny eeoc complaint`

    ### 🍀 leaf  `[leaf-work-injury]`
    _Workers' comp covers job injuries — including from desk-job repetitive strain. Don't miss the filing window._

    - `workers-compensation-ny` (entry) — How NY workers' comp works — what's covered, deadlines, retaliation protection
    - `lawny` (program) — LawNY — free legal help for low-income workers including comp denials
    - `wjcny` (program) — Worker Justice Center — wage theft + retaliation + injury cases

    🎯 SEO target queries: `workers comp ny`, `hurt at work ny`, `workers compensation claim ny`, `workers compensation rochester`, `wcb ny`

    ### 🍀 leaf  `[leaf-work-wages]`
    _Wage theft is illegal regardless of immigration status. NY has strong remedies._

    - `wage-theft-ny` (entry) — What counts as wage theft + how to file with NY DOL
    - `wjcny` (program) — Worker Justice Center of NY — wage theft, retaliation, harassment cases for low-wage workers; represents regardless of immigration status
    - `lawny` (program) — LawNY — free representation in employment cases for low-income workers

    🎯 SEO target queries: `wage theft ny`, `boss not paying me`, `minimum wage violation ny`, `report wage theft new york`, `ny labor law unpaid wages`, `final paycheck ny`

    ### 🍀 leaf  `[leaf-work-training]`
    _Multiple paths — RochesterWorks for adults, Learn2Earn for older teens._

    - `l2e` (program) — Learn2Earn — paid internships and career exploration for older teens
    - `fec` (program) — Rochester Financial Empowerment Center — free coaching including career and budget planning

    🎯 SEO target queries: `job training rochester`, `free job training ny`, `rochesterworks`, `career training rochester`, `workforce development rochester`

  ## ❓ Which is happening right now?  `[housing-which]`

  - ▸ **Got an eviction notice or court papers** → `leaf-housing-eviction`
  - ▸ **No place to sleep / homeless** → `leaf-housing-homeless`
  - ▸ **Apartment is unsafe — heat, mold, leaks, no lock** → `leaf-housing-unsafe`
  - ▸ **Landlord won't return my security deposit** → `leaf-housing-deposit`

    ### 🍀 leaf  `[leaf-housing-eviction]`
    _Eviction has a process. Court papers do NOT mean you have to move that day._

    - `eviction-process-ny` (entry) — What the landlord has to do BEFORE you can be removed — the timeline + cure window
    - `ta` (program) — Emergency one-shot rent through Monroe DSS, in-person at 691 St Paul
    - `vlsp` (program) — JustCause free legal clinics — online intake at legalhelprochester.com
    - `lawny` (program) — LawNY — free housing legal help across 14 counties

    🎯 SEO target queries: `eviction notice ny`, `stop eviction ny`, `rpapl 753`, `eviction process new york`, `rochester eviction help`, `court papers landlord ny`

    ### 🍀 leaf  `[leaf-housing-homeless]`
    _Walk-in shelter exists tonight. Daytime services (food + clothing + case management) stack on top._

    - `housemercy` (program) — House of Mercy — emergency overnight shelter open 24/7, no ID required
    - `communityplace` (program) — Community Place — case management + food + clothing + advocacy
    - `ta` (program) — Temporary Assistance can fund placement into transitional housing

    🎯 SEO target queries: `homeless shelter rochester`, `emergency shelter ny`, `where to sleep tonight rochester`, `house of mercy rochester`, `24 hour shelter rochester`

    ### 🍀 leaf  `[leaf-housing-unsafe]`
    _NY has the warranty of habitability — every NY landlord makes this promise automatically. Lease can't waive it._

    - `tenant-habitability-ny` (entry) — What the warranty of habitability actually covers + tenant remedies
    - `tenant-paint-lead-safe-ny` (entry) — Lead-paint hazards in pre-1978 rentals — RRP rules, landlord disclosure, what to do
    - `vlsp` (program) — JustCause clinics — landlord-tenant cases
    - `lawny` (program) — LawNY — direct representation in unsafe-conditions cases

    🎯 SEO target queries: `landlord wont fix ny`, `unsafe apartment ny`, `warranty of habitability ny`, `no heat in apartment ny`, `rpp 235-b`, `code enforcement rochester`

    ### 🍀 leaf  `[leaf-housing-deposit]`
    _NY caps deposits at 1 month and gives a 14-day return deadline. Missing the deadline forfeits the right to keep ANY of it._

    - `security-deposit-ny` (entry) — Anchor on GOL § 7-108 — 14-day rule, walk-throughs, what the landlord can and can't deduct
    - `vlsp` (program) — JustCause Legal Clinics — free landlord-tenant clinic, online intake at legalhelprochester.com
    - `lawny` (program) — LawNY — free housing legal help across 14 counties including security-deposit cases

    🎯 SEO target queries: `security deposit ny`, `landlord not returning deposit ny`, `14 day rule security deposit`, `gob 7-108`, `one month rule security deposit ny`

  ## ❓ Which best fits your situation?  `[family-which]`

  - ▸ **Pregnant or new baby** → `leaf-family-baby`
  - ▸ **Divorce, separation, custody** → `leaf-family-split`
  - ▸ **Caring for an older parent or disabled adult** → `leaf-family-caregiving`

    ### 🍀 leaf  `[leaf-family-baby]`
    _Several stacking benefits — and NY's new Paid Prenatal Leave is unique._

    - `wic` (program) — WIC — free healthy food + nutrition counseling for pregnancy + kids under 5
    - `medicaid` (program) — Pregnancy Medicaid available even at higher incomes; kids under 1 covered automatically
    - `chip` (program) — Child Health Plus — kids under 19, scales with income

    🎯 SEO target queries: `ny paid family leave`, `wic ny apply`, `pregnancy benefits ny`, `paid prenatal leave ny`, `child health plus ny`, `new baby benefits ny`

    ### 🍀 leaf  `[leaf-family-split]`
    _Free family-law clinics exist — and child support intake is its own line at DSS._

    - `child-support-ny` (entry) — How NY calculates child support + how to modify orders
    - `vlspfamily` (program) — JustCause Family Law Clinic — custody + orders of protection

    🎯 SEO target queries: `child support ny`, `custody help free ny`, `family law clinic rochester`, `divorce help free ny`, `order of protection ny`, `justcause family law`

    ### 🍀 leaf  `[leaf-family-caregiving]`
    _EISEP is the in-home help program most people miss. Office for the Aging is the front door for seniors._

    - `ofa` (program) — Office for the Aging — meals, transportation, Medicare help, caregiver support
    - `eisep` (program) — Free in-home help for seniors 60+ NOT on Medicaid — personal care + housekeeping
    - `mow` (program) — Meals on Wheels — hot meals delivered if 60+ or homebound

    🎯 SEO target queries: `office for aging rochester`, `in home care for senior ny`, `caregiver support ny`, `eisep ny`, `meals on wheels rochester`, `monroe county aging`

  ## ❓ Which is closest?  `[status-which]`

  - ▸ **I have a criminal record from years ago** → `leaf-status-record`
  - ▸ **Just turned 60 or older** → `leaf-status-senior`
  - ▸ **Have a disability** → `leaf-status-disability`
  - ▸ **Recently released from incarceration** → `leaf-status-reentry`

    ### 🍀 leaf  `[leaf-status-record]`
    _NY's Clean Slate Act now seals most older convictions automatically — most people don't realize they qualify._

    - `clean-slate-ny` (entry) — Anchor — automatic sealing of older convictions; nothing to file
    - `wjcny` (program) — Worker Justice Center — represents people with records facing employment discrimination
    - `snap-rights-ny` (entry) — SNAP eligibility after a conviction — most felony bars eliminated under recent NY changes
    - `211` (program) — Call 211 — connects to current reentry programs in Monroe County

    🎯 SEO target queries: `clean slate act ny`, `automatic sealing ny`, `seal criminal record ny`, `what is clean slate`, `cpl 160.57`

    ### 🍀 leaf  `[leaf-status-senior]`
    _Office for the Aging is the front door. EPIC for prescriptions is uniquely NY._

    - `ofa` (program) — Office for the Aging — meals + transport + Medicare help + caregiver support
    - `epic` (program) — NY's prescription program for seniors on Medicare
    - `mow` (program) — Meals on Wheels if homebound
    - `lunchclub` (program) — Free sit-down lunch at 20 senior centers across Monroe

    🎯 SEO target queries: `senior services rochester`, `office for the aging monroe`, `epic prescription ny seniors`, `meals on wheels rochester`, `monroe county lunch club`

    ### 🍀 leaf  `[leaf-status-disability]`
    _ABLE accounts let people with disabilities save without losing SSI / Medicaid. Most people don't know about them._

    - `able-account-disability-savings-ny` (entry) — How NY ABLE accounts work — tax-advantaged savings without losing SSI/Medicaid
    - `cdrny` (program) — Center for Disability Rights — advocacy, ABLE account help, benefits planning; run by people with disabilities

    🎯 SEO target queries: `able account ny`, `disability benefits ny`, `ssi savings ny`, `center for disability rights rochester`, `disability advocacy ny`

    ### 🍀 leaf  `[leaf-status-reentry]`
    _Reentry has multiple stacking supports. SNAP and Medicaid often re-activate post-release._

    - `clean-slate-ny` (entry) — Most older convictions seal automatically under Clean Slate Act
    - `snap` (program) — SNAP after conviction — most felony bars eliminated under recent NY changes

    🎯 SEO target queries: `reentry programs rochester`, `after prison help ny`, `snap after conviction ny`, `clean slate ny`, `criminal record sealing ny`

  ### 🍀 leaf  `[leaf-not-sure]`
  _When the situation is hard to name, two paths cover the most ground: 211 connects to anything, and HelpFinder's main questionnaire walks through specifics._

  - `211` (program) — Call 211 (or 1-877-356-9211) — staffed routing for any situation, 24/7
  - `myb` (program) — myBenefits.ny.gov — one application covers SNAP + Medicaid + HEAP + cash + childcare

  🎯 SEO target queries: `what help is available ny`, `do i qualify for help ny`, `ny benefits eligibility`, `211 ny`, `mybenefits ny gov`, `find help rochester`

