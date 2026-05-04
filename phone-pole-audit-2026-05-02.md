# Phone Pole Audit 2026-05-02

Read-only inventory of every phone reference in `src/data/`. Groups by normalized digit string (leading `1` stripped). Cross-references existing canonical poles in `src/data/canonical/phones.js`.

## Stats

- Files scanned: **1476**
- Total phone references: **9111**
- Unique numbers: **1213**
- Already in canonical poles: **56**
- **Orphans (need a pole):** **1157**
- Crisis-line numbers found anywhere: **12**

## Crisis-line numbers

These should all carry `blockDial: true` in the unified pole registry. Currently the dialer-helper.ps1 hardcodes the list; the goal is to derive it from this metadata.

### 211 (in canonical: `call211`) — 75 ref(s)

- `src/data/canonical/phones.js:116` — `211`
- `src/data/legal/entries/amended-tax-return-1040x-ny.js:44` — `211`
- `src/data/legal/entries/amended-tax-return-1040x-ny.js:63` — `211`
- `src/data/legal/entries/amended-tax-return-1040x-ny.js:65` — `211`
- `src/data/legal/entries/apartment-too-hot-summer-ny.js:46` — `211`
- `src/data/legal/entries/apply-for-benefits-online-ny-program.js:43` — `211`
- `src/data/legal/entries/apply-for-benefits-online-ny-program.js:69` — `211`
- `src/data/legal/entries/apply-for-benefits-online-ny-program.js:74` — `211`
- _... and 67 more refs_

### 311 (in canonical: `municipal311`) — 155 ref(s)

- `src/data/canonical/phones.js:443` — `311`
- `src/data/canonical/phones.js:446` — `311`
- `src/data/legal/entries/abandoned-house-next-door-ny.js:42` — `311`
- `src/data/legal/entries/abandoned-house-next-door-ny.js:54` — `311`
- `src/data/legal/entries/abandoned-house-next-door-ny.js:60` — `311`
- `src/data/legal/entries/abandoned-house-next-door-ny.js:63` — `311`
- `src/data/legal/entries/abandoned-house-next-door-ny.js:65` — `311`
- `src/data/legal/entries/abandoned-vehicle-ny.js:27` — `311`
- _... and 147 more refs_

### 8002738255 (in canonical: `suicide988Legacy`) — 1 ref(s)

- `src/data/canonical/phones.js:371` — `800-273-8255`

### 8004224453 (in canonical: `childhelp`) — 2 ref(s)

- `src/data/canonical/phones.js:387` — `800-422-4453`
- `src/data/programs.js:181` — `800-422-4453`

### 8006564673 (in canonical: `rainn`) — 4 ref(s)

- `src/data/canonical/phones.js:403` — `800-656-4673`
- `src/data/legal/entries/child-victims-act-statute-of-limitations-ny.js:50` — `(800) 656-4673`
- `src/data/legal/entries/sexual-assault-survivors-rights-ny.js:47` — `(800) 656-4673`
- `src/data/programs.js:182` — `800-656-4673`

### 8007997233 (in canonical: `dvHotline`) — 5 ref(s)

- `src/data/canonical/phones.js:379` — `800-799-7233`
- `src/data/legal/entries/domestic-violence-legal-options-ny.js:44` — `1-800-799-7233`
- `src/data/legal/entries/domestic-violence-legal-options-ny.js:78` — `1-800-799-7233`
- `src/data/legal/entries/order-of-protection-ny.js:48` — `1-800-799-7233`
- `src/data/programs.js:180` — `800-799-7233`

### 8009855990 (in canonical: `disasterDistress`) — 1 ref(s)

- `src/data/canonical/phones.js:411` — `800-985-5990`

### 8664887386 (in canonical: `trevorProject`) — 2 ref(s)

- `src/data/canonical/phones.js:395` — `866-488-7386`
- `src/data/programs.js:224` — `866-488-7386`

### 8775658860 (in canonical: `transLifeline`) — 2 ref(s)

- `src/data/canonical/phones.js:419` — `877-565-8860`
- `src/data/programs.js:223` — `877-565-8860`

### 8778467369 (in canonical: `oasasHopeline`) — 11 ref(s)

- `src/data/canonical/phones.js:427` — `877-846-7369`
- `src/data/legal/entries/drug-possession-basics-ny.js:51` — `(877) 846-7369`
- `src/data/legal/entries/good-samaritan-law-ny.js:47` — `(877) 846-7369`
- `src/data/legal/entries/good-samaritan-law-ny.js:88` — `(877) 846-7369`
- `src/data/legal/entries/good-samaritan-law-ny.js:90` — `(877) 846-7369`
- `src/data/legal/entries/medical-cannabis-program-ny.js:51` — `(877) 846-7369`
- `src/data/legal/entries/mental-health-records-access-ny.js:47` — `(877) 846-7369`
- `src/data/legal/entries/narcan-access-ny.js:47` — `(877) 846-7369`
- _... and 3 more refs_

### 8888439461 (in canonical: `womensLawVAW`) — 1 ref(s)

- `src/data/canonical/phones.js:436` — `888-843-9461`

### 988 (in canonical: `call988`) — 23 ref(s)

- `src/data/canonical/phones.js:126` — `988`
- `src/data/canonical/phones.js:127` — `988`
- `src/data/canonical/phones.js:129` — `988`
- `src/data/canonical/phones.js:374` — `988`
- `src/data/legal/entries/mental-health-crisis-rights-ny.js:26` — `988`
- `src/data/legal/entries/mental-health-crisis-rights-ny.js:45` — `988`
- `src/data/legal/entries/mental-health-crisis-rights-ny.js:45` — `988`
- `src/data/legal/entries/mental-health-crisis-rights-ny.js:72` — `988`
- _... and 15 more refs_

## Orphans (not in canonical) — sorted by reference count

Each of these needs either (a) a new pole entry in `canonical/phones.js`, or (b) a decision that it's a one-off legal-entry-local number that doesn't need a global pole. Highest-reference-count numbers are the most consequential — drift on them propagates widest.

### 5854287274 — 35 ref(s)
- `src/data/legal/entries/animal-at-large-roaming-dog-ny.js:42` — `(585) 428-7274`
- `src/data/legal/entries/animal-at-large-roaming-dog-ny.js:78` — `(585) 428-7274`
- `src/data/legal/entries/animal-at-large-roaming-dog-ny.js:80` — `(585) 428-7274`
- `src/data/legal/entries/animal-cruelty-reporting-ny.js:46` — `(585) 428-7274`
- `src/data/legal/entries/animal-cruelty-reporting-ny.js:76` — `(585) 428-7274`
- _... and 30 more refs_

### 8007721213 — 35 ref(s)
- `src/data/legal/entries/beneficiary-designation-trumps-will-ny.js:46` — `(800) 772-1213`
- `src/data/legal/entries/benefits-verification-letter-ny-program.js:26` — `1-800-772-1213`
- `src/data/legal/entries/benefits-verification-letter-ny-program.js:43` — `1-800-772-1213`
- `src/data/legal/entries/benefits-verification-letter-ny-program.js:77` — `(800) 772-1213`
- `src/data/legal/entries/disabled-homeowner-property-tax-exemption-ny.js:52` — `(800) 772-1213`
- _... and 30 more refs_

### 8009938982 — 33 ref(s)
- `src/data/legal/entries/acces-vr-ny.js:80` — `1-800-993-8982`
- `src/data/legal/entries/acces-vr-ny.js:82` — `1-800-993-8982`
- `src/data/legal/entries/ada-public-transit-ny.js:48` — `(800) 993-8982`
- `src/data/legal/entries/ada-public-transit-ny.js:62` — `(800) 993-8982`
- `src/data/legal/entries/ada-public-transit-ny.js:64` — `(800) 993-8982`
- _... and 28 more refs_

### 5857536532 — 31 ref(s)
- `src/data/legal/entries/adult-home-resident-rights-ny.js:50` — `(585) 753-6532`
- `src/data/legal/entries/animal-hoarding-reporting-ny.js:46` — `(585) 753-6532`
- `src/data/legal/entries/assisted-living-complaint-ny.js:27` — `(585) 753-6532`
- `src/data/legal/entries/assisted-living-complaint-ny.js:45` — `(585) 753-6532`
- `src/data/legal/entries/assisted-living-complaint-ny.js:90` — `(585) 753-6532`
- _... and 26 more refs_

### 5855467220 — 31 ref(s)
- `src/data/legal/entries/after-a-fire-ny.js:45` — `(585) 546-7220`
- `src/data/legal/entries/free-legal-help-monroe-ny-program.js:24` — `(585) 546-7220`
- `src/data/legal/entries/free-legal-help-monroe-ny-program.js:41` — `(585) 546-7220`
- `src/data/legal/entries/free-legal-help-monroe-ny-program.js:139` — `(585) 546-7220`
- `src/data/legal/entries/grandparent-adoption-ny.js:47` — `(585) 546-7220`
- _... and 26 more refs_

### 8003423334 — 31 ref(s)
- `src/data/legal/entries/apply-for-benefits-online-ny-program.js:24` — `(800) 342-3334`
- `src/data/legal/entries/benefit-overpayment-ny.js:44` — `(800) 342-3334`
- `src/data/legal/entries/benefits-denial-appeal-ny.js:27` — `(800) 342-3334`
- `src/data/legal/entries/benefits-denial-appeal-ny.js:44` — `(800) 342-3334`
- `src/data/legal/entries/benefits-denial-appeal-ny.js:66` — `(800) 342-3334`
- _... and 26 more refs_

### 5855465110 — 31 ref(s)
- `src/data/legal/entries/contest-will-ny.js:48` — `(585) 546-5110`
- `src/data/legal/entries/contracts-must-be-in-writing-ny.js:29` — `(585) 546-5110`
- `src/data/legal/entries/contracts-must-be-in-writing-ny.js:50` — `(585) 546-5110`
- `src/data/legal/entries/contracts-must-be-in-writing-ny.js:90` — `(585) 546-5110`
- `src/data/legal/entries/contracts-must-be-in-writing-ny.js:92` — `(585) 546-5110`
- _... and 26 more refs_

### 2126073300 — 30 ref(s)
- `src/data/legal/entries/anti-slapp-lawsuit-ny.js:44` — `(212) 607-3300`
- `src/data/legal/entries/article-78-proceeding-review-agency-ny.js:52` — `(212) 607-3300`
- `src/data/legal/entries/civil-asset-forfeiture-defense-ny.js:53` — `(212) 607-3300`
- `src/data/legal/entries/early-voting-absentee-ballot-ny.js:48` — `(212) 607-3300`
- `src/data/legal/entries/election-law-ballot-challenge-ny.js:51` — `(212) 607-3300`
- _... and 25 more refs_

### 5853713544 — 29 ref(s)
- `src/data/legal/entries/adoption-basics-ny.js:46` — `(585) 371-3544`
- `src/data/legal/entries/child-support-modification-income-change-ny.js:43` — `(585) 371-3544`
- `src/data/legal/entries/child-support-modification-ny.js:44` — `(585) 371-3544`
- `src/data/legal/entries/child-support-new-hire-reporting-ny.js:43` — `(585) 371-3544`
- `src/data/legal/entries/child-support-ny.js:44` — `(585) 371-3544`
- _... and 24 more refs_

### 5852265400 — 29 ref(s)
- `src/data/legal/entries/boat-registration-ny.js:47` — `(585) 226-5400`
- `src/data/legal/entries/bottle-deposit-returnable-ny.js:42` — `(585) 226-5400`
- `src/data/legal/entries/bottle-deposit-returnable-ny.js:74` — `(585) 226-5400`
- `src/data/legal/entries/coyote-wild-turkey-urban-wildlife-ny.js:42` — `(585) 226-5400`
- `src/data/legal/entries/coyote-wild-turkey-urban-wildlife-ny.js:61` — `(585) 226-5400`
- _... and 24 more refs_

### 5856176195 — 29 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-ogden-town.js:12` — `(585) 617-6195`
- `src/data/legal/entries/electrical-residential-ny-mon-ogden-town.js:16` — `(585) 617-6195`
- `src/data/legal/entries/electrical-residential-ny-mon-ogden-town.js:43` — `(585) 617-6195`
- `src/data/legal/entries/electrical-residential-ny-mon-ogden-town.js:58` — `(585) 617-6195`
- `src/data/legal/entries/electrical-residential-ny-mon-spencerport-village.js:16` — `(585) 617-6195`
- _... and 24 more refs_

### 8006694000 — 28 ref(s)
- `src/data/legal/entries/ada-workplace-accommodation-ny.js:42` — `(800) 669-4000`
- `src/data/legal/entries/age-discrimination-work-ny.js:44` — `(800) 669-4000`
- `src/data/legal/entries/age-discrimination-work-ny.js:65` — `(800) 669-4000`
- `src/data/legal/entries/constructive-discharge-ny.js:45` — `(800) 669-4000`
- `src/data/legal/entries/crown-act-hair-discrimination-ny.js:46` — `(800) 669-4000`
- _... and 23 more refs_

### 5853713412 — 28 ref(s)
- `src/data/legal/entries/commercial-eviction-process-ny.js:45` — `(585) 371-3412`
- `src/data/legal/entries/concert-ticket-resale-rights-ny.js:50` — `(585) 371-3412`
- `src/data/legal/entries/consumer-credit-fairness-act-ny.js:48` — `(585) 371-3412`
- `src/data/legal/entries/deceptive-business-practices-ny.js:72` — `(585) 371-3412`
- `src/data/legal/entries/default-judgment-ny.js:44` — `(585) 371-3412`
- _... and 23 more refs_

### 5857536040 — 28 ref(s)
- `src/data/legal/entries/kendras-law-assisted-outpatient-treatment-ny.js:43` — `(585) 753-6040`
- `src/data/legal/entries/kendras-law-assisted-outpatient-treatment-ny.js:62` — `(585) 753-6040`
- `src/data/legal/entries/kendras-law-assisted-outpatient-treatment-ny.js:64` — `(585) 753-6040`
- `src/data/legal/entries/problem-solving-courts-ny-program.js:43` — `(585) 753-6040`
- `src/data/legal/entries/problem-solving-courts-ny-program.js:74` — `(585) 753-6040`
- _... and 23 more refs_

### 5857534300 — 27 ref(s)
- `src/data/legal/entries/acd-adjournment-contemplation-dismissal-ny.js:45` — `(585) 753-4300`
- `src/data/legal/entries/acd-adjournment-contemplation-dismissal-ny.js:65` — `(585) 753-4300`
- `src/data/legal/entries/acd-adjournment-contemplation-dismissal-ny.js:67` — `(585) 753-4300`
- `src/data/legal/entries/bail-how-it-works-ny.js:25` — `(585) 753-4300`
- `src/data/legal/entries/bail-how-it-works-ny.js:41` — `(585) 753-4300`
- _... and 22 more refs_

### 5184744429 — 27 ref(s)
- `src/data/legal/entries/boundary-line-agreement-rpl-345-ny.js:48` — `(518) 474-4429`
- `src/data/legal/entries/home-inspection-contract-ny.js:46` — `(518) 474-4429`
- `src/data/legal/entries/home-inspection-contract-ny.js:80` — `(518) 474-4429`
- `src/data/legal/entries/home-inspection-contract-ny.js:82` — `(518) 474-4429`
- `src/data/legal/entries/home-inspector-licensing-ny.js:43` — `(518) 474-4429`
- _... and 22 more refs_

### 5852227233 — 27 ref(s)
- `src/data/legal/entries/change-locks-tenant-ny.js:45` — `(585) 222-7233`
- `src/data/legal/entries/change-locks-tenant-ny.js:61` — `(585) 222-7233`
- `src/data/legal/entries/change-locks-tenant-ny.js:63` — `(585) 222-7233`
- `src/data/legal/entries/child-victims-act-statute-of-limitations-ny.js:43` — `(585) 222-7233`
- `src/data/legal/entries/domestic-violence-legal-options-ny.js:45` — `(585) 222-7233`
- _... and 22 more refs_

### 5853713310 — 26 ref(s)
- `src/data/legal/entries/adoption-basics-ny.js:46` — `(585) 371-3310`
- `src/data/legal/entries/adoption-basics-ny.js:76` — `(585) 371-3310`
- `src/data/legal/entries/adult-adoption-ny.js:42` — `(585) 371-3310`
- `src/data/legal/entries/adult-adoption-ny.js:61` — `(585) 371-3310`
- `src/data/legal/entries/adult-adoption-ny.js:63` — `(585) 371-3310`
- _... and 21 more refs_

### 511 — 24 ref(s)
- `src/data/legal/entries/court-of-claims-suing-state-ny.js:56` — `511`
- `src/data/legal/entries/court-of-claims-suing-state-ny.js:56` — `511`
- `src/data/legal/entries/driving-suspended-license-ny.js:7` — `511`
- `src/data/legal/entries/driving-suspended-license-ny.js:13` — `511`
- `src/data/legal/entries/driving-suspended-license-ny.js:26` — `511`
- _... and 19 more refs_

### 5857532550 — 23 ref(s)
- `src/data/legal/entries/agricultural-assessment-farm-rpt-305-ny.js:49` — `(585) 753-2550`
- `src/data/legal/entries/agricultural-assessment-farm-rpt-305-ny.js:79` — `(585) 753-2550`
- `src/data/legal/entries/agricultural-assessment-farm-rpt-305-ny.js:81` — `(585) 753-2550`
- `src/data/legal/entries/beekeeping-laws-ny.js:45` — `(585) 753-2550`
- `src/data/legal/entries/beekeeping-laws-ny.js:74` — `(585) 753-2550`
- _... and 18 more refs_

### 5854286720 — 23 ref(s)
- `src/data/legal/entries/bicycle-helmet-under-14-ny.js:43` — `(585) 428-6720`
- `src/data/legal/entries/burning-trash-leaves-laws-ny.js:44` — `(585) 428-6720`
- `src/data/legal/entries/car-boot-immobilizer-ny.js:47` — `(585) 428-6720`
- `src/data/legal/entries/catalytic-converter-theft-ny.js:27` — `(585) 428-6720`
- `src/data/legal/entries/catalytic-converter-theft-ny.js:45` — `(585) 428-6720`
- _... and 18 more refs_

### 5857845250 — 23 ref(s)
- `src/data/legal/entries/deck-patio-permit-ny.js:45` — `(585) 784-5250`
- `src/data/legal/entries/electrical-residential-ny-mon-brighton-town.js:14` — `(585) 784-5250`
- `src/data/legal/entries/electrical-residential-ny-mon-brighton-town.js:18` — `(585) 784-5250`
- `src/data/legal/entries/electrical-residential-ny-mon-brighton-town.js:22` — `(585) 784-5250`
- `src/data/legal/entries/electrical-residential-ny-mon-brighton-town.js:46` — `(585) 784-5250`
- _... and 18 more refs_

### 5853408636 — 22 ref(s)
- `src/data/legal/entries/above-ground-pool-rules-ny.js:47` — `(585) 340-8636`
- `src/data/legal/entries/electrical-residential-ny-mon-penfield-town.js:12` — `(585) 340-8636`
- `src/data/legal/entries/electrical-residential-ny-mon-penfield-town.js:16` — `(585) 340-8636`
- `src/data/legal/entries/electrical-residential-ny-mon-penfield-town.js:44` — `(585) 340-8636`
- `src/data/legal/entries/electrical-residential-ny-mon-penfield-town.js:59` — `(585) 340-8636`
- _... and 17 more refs_

### 8008291040 — 22 ref(s)
- `src/data/legal/entries/adoption-tax-credit-ny.js:42` — `(800) 829-1040`
- `src/data/legal/entries/adoption-tax-credit-ny.js:63` — `(800) 829-1040`
- `src/data/legal/entries/amended-tax-return-1040x-ny.js:49` — `(800) 829-1040`
- `src/data/legal/entries/amended-tax-return-1040x-ny.js:76` — `(800) 829-1040`
- `src/data/legal/entries/amended-tax-return-1040x-ny.js:78` — `(800) 829-1040`
- _... and 17 more refs_

### 8003423720 — 22 ref(s)
- `src/data/legal/entries/animal-hoarding-reporting-ny.js:46` — `(800) 342-3720`
- `src/data/legal/entries/child-care-licensing-ny.js:46` — `(800) 342-3720`
- `src/data/legal/entries/child-protective-services-process-ny.js:27` — `1-800-342-3720`
- `src/data/legal/entries/child-protective-services-process-ny.js:44` — `(800) 342-3720`
- `src/data/legal/entries/child-protective-services-process-ny.js:76` — `(800) 342-3720`
- _... and 17 more refs_

### 5852231330 — 20 ref(s)
- `src/data/legal/entries/animal-at-large-roaming-dog-ny.js:51` — `(585) 223-1330`
- `src/data/legal/entries/animal-at-large-roaming-dog-ny.js:65` — `(585) 223-1330`
- `src/data/legal/entries/animal-at-large-roaming-dog-ny.js:67` — `(585) 223-1330`
- `src/data/legal/entries/animal-cruelty-reporting-ny.js:46` — `(585) 223-1330`
- `src/data/legal/entries/animal-cruelty-reporting-ny.js:63` — `(585) 223-1330`
- _... and 15 more refs_

### 8776324996 — 20 ref(s)
- `src/data/legal/entries/caregiver-rights-family-ny.js:43` — `(877) 632-4996`
- `src/data/legal/entries/domestic-worker-rights-ny.js:47` — `(877) 632-4996`
- `src/data/legal/entries/mental-health-day-work-ny.js:46` — `(877) 632-4996`
- `src/data/legal/entries/pesticide-worker-protection-standard-ny.js:51` — `(877) 632-4996`
- `src/data/legal/entries/scaffold-law-construction-240-ny.js:61` — `(877) 632-4996`
- _... and 15 more refs_

### 5853713758 — 19 ref(s)
- `src/data/legal/entries/alimony-modification-ny.js:42` — `(585) 371-3758`
- `src/data/legal/entries/annulment-vs-divorce-ny.js:42` — `(585) 371-3758`
- `src/data/legal/entries/article-78-proceeding-review-agency-ny.js:47` — `(585) 371-3758`
- `src/data/legal/entries/civil-tro-preliminary-injunction-ny.js:45` — `(585) 371-3758`
- `src/data/legal/entries/commercial-eviction-process-ny.js:46` — `(585) 371-3758`
- _... and 14 more refs_

### 5857535150 — 19 ref(s)
- `src/data/legal/entries/bicycle-helmet-under-14-ny.js:42` — `(585) 753-5150`
- `src/data/legal/entries/bicycle-helmet-under-14-ny.js:63` — `(585) 753-5150`
- `src/data/legal/entries/child-car-seat-booster-ny.js:41` — `(585) 753-5150`
- `src/data/legal/entries/federal-lead-paint-disclosure-ny.js:45` — `(585) 753-5150`
- `src/data/legal/entries/federal-lead-paint-disclosure-ny.js:77` — `(585) 753-5150`
- _... and 14 more refs_

### 5857531550 — 19 ref(s)
- `src/data/legal/entries/crown-act-hair-discrimination-ny.js:45` — `(585) 753-1550`
- `src/data/legal/entries/early-voting-absentee-ballot-ny.js:46` — `(585) 753-1550`
- `src/data/legal/entries/early-voting-absentee-ballot-ny.js:66` — `(585) 753-1550`
- `src/data/legal/entries/early-voting-absentee-ballot-ny.js:68` — `(585) 753-1550`
- `src/data/legal/entries/election-law-ballot-challenge-ny.js:46` — `(585) 753-1550`
- _... and 14 more refs_

### 5857534500 — 18 ref(s)
- `src/data/legal/entries/acd-adjournment-contemplation-dismissal-ny.js:51` — `(585) 753-4500`
- `src/data/legal/entries/anti-hazing-law-ny.js:47` — `(585) 753-4500`
- `src/data/legal/entries/anti-hazing-law-ny.js:66` — `(585) 753-4500`
- `src/data/legal/entries/anti-hazing-law-ny.js:68` — `(585) 753-4500`
- `src/data/legal/entries/child-victims-act-statute-of-limitations-ny.js:49` — `(585) 753-4500`
- _... and 13 more refs_

### 5853403300 — 18 ref(s)
- `src/data/legal/entries/attic-insulation-rebate-ny.js:42` — `(585) 340-3300`
- `src/data/legal/entries/attic-insulation-rebate-ny.js:61` — `(585) 340-3300`
- `src/data/legal/entries/attic-insulation-rebate-ny.js:63` — `(585) 340-3300`
- `src/data/legal/entries/foreclosure-defense-ny.js:43` — `(585) 340-3300`
- `src/data/legal/entries/foreclosure-defense-ny.js:76` — `(585) 340-3300`
- _... and 13 more refs_

### 8006699777 — 18 ref(s)
- `src/data/legal/entries/disability-housing-accommodation-ny.js:42` — `(800) 669-9777`
- `src/data/legal/entries/emotional-support-animal-housing-ny.js:43` — `(800) 669-9777`
- `src/data/legal/entries/emotional-support-animal-housing-ny.js:61` — `(800) 669-9777`
- `src/data/legal/entries/emotional-support-animal-housing-ny.js:63` — `(800) 669-9777`
- `src/data/legal/entries/esa-vs-service-animal-ny.js:42` — `(800) 669-9777`
- _... and 13 more refs_

### 5852628100 — 18 ref(s)
- `src/data/legal/entries/homeless-student-rights-ny.js:43` — `(585) 262-8100`
- `src/data/legal/entries/homeless-student-rights-ny.js:63` — `(585) 262-8100`
- `src/data/legal/entries/menstrual-products-schools-ny.js:47` — `(585) 262-8100`
- `src/data/legal/entries/school-field-trip-permission-liability-ny.js:45` — `(585) 262-8100`
- `src/data/legal/entries/school-lunch-debt-ny.js:44` — `(585) 262-8100`
- _... and 13 more refs_

### 5857232396 — 17 ref(s)
- `src/data/legal/entries/abandoned-house-next-door-ny.js:43` — `(585) 723-2396`
- `src/data/legal/entries/basketball-hoop-street-driveway-ny.js:43` — `(585) 723-2396`
- `src/data/legal/entries/code-enforcement-complaint-ny.js:44` — `(585) 723-2396`
- `src/data/legal/entries/dumpster-placement-permit-ny.js:42` — `(585) 723-2396`
- `src/data/legal/entries/fence-height-rules-ny.js:43` — `(585) 723-2396`
- _... and 12 more refs_

### 5854287033 — 17 ref(s)
- `src/data/legal/entries/abandoned-vehicle-ny.js:27` — `(585) 428-7033`
- `src/data/legal/entries/abandoned-vehicle-ny.js:44` — `(585) 428-7033`
- `src/data/legal/entries/anti-hazing-law-ny.js:48` — `(585) 428-7033`
- `src/data/legal/entries/contractor-fraud-ny.js:42` — `(585) 428-7033`
- `src/data/legal/entries/harassment-cyberstalking-ny.js:43` — `(585) 428-7033`
- _... and 12 more refs_

### 8553221022 — 17 ref(s)
- `src/data/legal/entries/birth-certificate-correction-ny.js:42` — `(855) 322-1022`
- `src/data/legal/entries/birth-certificate-correction-ny.js:62` — `(855) 322-1022`
- `src/data/legal/entries/death-certificate-ordering-ny.js:44` — `(855) 322-1022`
- `src/data/legal/entries/death-certificate-ordering-ny.js:64` — `(855) 322-1022`
- `src/data/legal/entries/gender-marker-change-ny.js:26` — `(855) 322-1022`
- _... and 12 more refs_

### 8888387697 — 17 ref(s)
- `src/data/legal/entries/burial-cremation-rights-low-income-ny.js:46` — `(888) 838-7697`
- `src/data/legal/entries/college-in-state-tuition-residency-ny.js:53` — `(888) 838-7697`
- `src/data/legal/entries/military-divorce-benefits-ny.js:47` — `(888) 838-7697`
- `src/data/legal/entries/military-spouse-rights-ny.js:47` — `(888) 838-7697`
- `src/data/legal/entries/military-spouse-rights-ny.js:61` — `(888) 838-7697`
- _... and 12 more refs_

### 5184575181 — 17 ref(s)
- `src/data/legal/entries/car-donation-charity-ny.js:44` — `(518) 457-5181`
- `src/data/legal/entries/child-dependent-care-credit-ny.js:43` — `(518) 457-5181`
- `src/data/legal/entries/child-dependent-care-credit-ny.js:64` — `(518) 457-5181`
- `src/data/legal/entries/empire-state-child-credit-ny.js:42` — `(518) 457-5181`
- `src/data/legal/entries/empire-state-child-credit-ny.js:63` — `(518) 457-5181`
- _... and 12 more refs_

### 5857531441 — 17 ref(s)
- `src/data/legal/entries/child-support-enforcement-ny.js:42` — `(585) 753-1441`
- `src/data/legal/entries/child-support-enforcement-ny.js:61` — `(585) 753-1441`
- `src/data/legal/entries/child-support-enforcement-ny.js:63` — `(585) 753-1441`
- `src/data/legal/entries/child-support-modification-income-change-ny.js:44` — `(585) 753-1441`
- `src/data/legal/entries/child-support-modification-ny.js:45` — `(585) 753-1441`
- _... and 12 more refs_

### 5856375300 — 17 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-brockport-village.js:12` — `(585) 637-5300`
- `src/data/legal/entries/electrical-residential-ny-mon-brockport-village.js:16` — `(585) 637-5300`
- `src/data/legal/entries/electrical-residential-ny-mon-brockport-village.js:44` — `(585) 637-5300`
- `src/data/legal/entries/electrical-residential-ny-mon-brockport-village.js:59` — `(585) 637-5300`
- `src/data/legal/entries/hvac-residential-ny-mon-brockport-village.js:18` — `(585) 637-5300`
- _... and 12 more refs_

### 5854286526 — 17 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-rochester-city.js:14` — `(585) 428-6526`
- `src/data/legal/entries/electrical-residential-ny-mon-rochester-city.js:18` — `(585) 428-6526`
- `src/data/legal/entries/electrical-residential-ny-mon-rochester-city.js:47` — `(585) 428-6526`
- `src/data/legal/entries/electrical-residential-ny-mon-rochester-city.js:75` — `(585) 428-6526`
- `src/data/legal/entries/elevator-inspection-rules-ny.js:28` — `(585) 428-6526`
- _... and 12 more refs_

### 5854678840 — 16 ref(s)
- `src/data/legal/entries/abandoned-house-next-door-ny.js:44` — `(585) 467-8840`
- `src/data/legal/entries/basic-star-exemption-credit-ny.js:43` — `(585) 467-8840`
- `src/data/legal/entries/code-enforcement-complaint-ny.js:45` — `(585) 467-8840`
- `src/data/legal/entries/dumpster-placement-permit-ny.js:43` — `(585) 467-8840`
- `src/data/legal/entries/fence-height-rules-ny.js:44` — `(585) 467-8840`
- _... and 11 more refs_

### 8778762455 — 16 ref(s)
- `src/data/legal/entries/check-fraud-stolen-check-ny.js:43` — `(877) 876-2455`
- `src/data/legal/entries/check-fraud-stolen-check-ny.js:60` — `(877) 876-2455`
- `src/data/legal/entries/check-fraud-stolen-check-ny.js:62` — `(877) 876-2455`
- `src/data/legal/entries/mail-theft-federal-crime-ny.js:13` — `(877) 876-2455`
- `src/data/legal/entries/mail-theft-federal-crime-ny.js:27` — `(877) 876-2455`
- _... and 11 more refs_

### 5853597060 — 16 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-henrietta-town.js:18` — `(585) 359-7060`
- `src/data/legal/entries/electrical-residential-ny-mon-henrietta-town.js:56` — `585-359-7060`
- `src/data/legal/entries/hvac-residential-ny-mon-henrietta-town.js:18` — `(585) 359-7060`
- `src/data/legal/entries/hvac-residential-ny-mon-henrietta-town.js:57` — `585-359-7060`
- `src/data/legal/entries/outdoor-fire-pit-rules-ny.js:47` — `(585) 359-7060`
- _... and 11 more refs_

### 5853929449 — 16 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-hilton-village.js:16` — `(585) 392-9449`
- `src/data/legal/entries/electrical-residential-ny-mon-parma-town.js:12` — `(585) 392-9449`
- `src/data/legal/entries/electrical-residential-ny-mon-parma-town.js:44` — `(585) 392-9449`
- `src/data/legal/entries/electrical-residential-ny-mon-parma-town.js:58` — `(585) 392-9449`
- `src/data/legal/entries/hvac-residential-ny-mon-parma-town.js:18` — `(585) 392-9449`
- _... and 11 more refs_

### 5856246150 — 16 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-honeoye-falls-village.js:12` — `(585) 624-6150`
- `src/data/legal/entries/electrical-residential-ny-mon-honeoye-falls-village.js:16` — `(585) 624-6150`
- `src/data/legal/entries/electrical-residential-ny-mon-honeoye-falls-village.js:20` — `(585) 624-6150`
- `src/data/legal/entries/electrical-residential-ny-mon-honeoye-falls-village.js:44` — `(585) 624-6150`
- `src/data/legal/entries/electrical-residential-ny-mon-honeoye-falls-village.js:59` — `(585) 624-6150`
- _... and 11 more refs_

### 5857535064 — 16 ref(s)
- `src/data/legal/entries/housing-code-violations-ny.js:46` — `(585) 753-5064`
- `src/data/legal/entries/housing-code-violations-ny.js:75` — `(585) 753-5064`
- `src/data/legal/entries/lead-paint-tenant-rights-ny.js:42` — `(585) 753-5064`
- `src/data/legal/entries/lead-paint-tenant-rights-ny.js:74` — `(585) 753-5064`
- `src/data/legal/entries/lead-testing-child-ny.js:43` — `(585) 753-5064`
- _... and 11 more refs_

### 5857232443 — 15 ref(s)
- `src/data/legal/entries/above-ground-pool-rules-ny.js:43` — `(585) 723-2443`
- `src/data/legal/entries/backyard-chicken-laws-ny.js:46` — `(585) 723-2443`
- `src/data/legal/entries/deck-patio-permit-ny.js:43` — `(585) 723-2443`
- `src/data/legal/entries/electrical-residential-ny-mon-greece-town.js:61` — `(585) 723-2443`
- `src/data/legal/entries/hvac-residential-ny-mon-greece-town.js:16` — `(585) 723-2443`
- _... and 10 more refs_

### 5857531661 — 15 ref(s)
- `src/data/legal/entries/bottle-bill-deposit-return-ny.js:48` — `(585) 753-1661`
- `src/data/legal/entries/credit-card-minimum-purchase-rules-ny.js:53` — `(585) 753-1661`
- `src/data/legal/entries/door-to-door-sales-cooling-off-ny.js:48` — `(585) 753-1661`
- `src/data/legal/entries/eyeglass-contact-lens-prescription-release-ny.js:49` — `(585) 753-1661`
- `src/data/legal/entries/grocery-item-pricing-accuracy-ny.js:49` — `(585) 753-1661`
- _... and 10 more refs_

### 5857536006 — 15 ref(s)
- `src/data/legal/entries/cdpap-consumer-directed-care-ny.js:43` — `(585) 753-6006`
- `src/data/legal/entries/cdpap-consumer-directed-care-ny.js:62` — `(585) 753-6006`
- `src/data/legal/entries/cdpap-consumer-directed-care-ny.js:64` — `(585) 753-6006`
- `src/data/legal/entries/emergency-shelter-warming-center-ny.js:43` — `(585) 753-6006`
- `src/data/legal/entries/emergency-shelter-warming-center-ny.js:64` — `(585) 753-6006`
- _... and 10 more refs_

### 5855863553 — 15 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-east-rochester-village.js:12` — `(585) 586-3553`
- `src/data/legal/entries/electrical-residential-ny-mon-east-rochester-village.js:16` — `(585) 586-3553`
- `src/data/legal/entries/electrical-residential-ny-mon-east-rochester-village.js:44` — `(585) 586-3553`
- `src/data/legal/entries/electrical-residential-ny-mon-east-rochester-village.js:59` — `(585) 586-3553`
- `src/data/legal/entries/hvac-residential-ny-mon-east-rochester-village.js:57` — `585-586-3553`
- _... and 10 more refs_

### 5856246066 — 15 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-mendon-town.js:12` — `(585) 624-6066`
- `src/data/legal/entries/electrical-residential-ny-mon-mendon-town.js:16` — `(585) 624-6066`
- `src/data/legal/entries/electrical-residential-ny-mon-mendon-town.js:44` — `(585) 624-6066`
- `src/data/legal/entries/electrical-residential-ny-mon-mendon-town.js:59` — `(585) 624-6066`
- `src/data/legal/entries/hvac-residential-ny-mon-mendon-town.js:18` — `(585) 624-6066`
- _... and 10 more refs_

### 5856378684 — 15 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-sweden-town.js:12` — `(585) 637-8684`
- `src/data/legal/entries/electrical-residential-ny-mon-sweden-town.js:44` — `(585) 637-8684`
- `src/data/legal/entries/electrical-residential-ny-mon-sweden-town.js:59` — `(585) 637-8684`
- `src/data/legal/entries/hvac-residential-ny-mon-sweden-town.js:12` — `(585) 637-8684`
- `src/data/legal/entries/hvac-residential-ny-mon-sweden-town.js:16` — `(585) 637-8684`
- _... and 10 more refs_

### 8007432110 — 15 ref(s)
- `src/data/legal/entries/home-energy-audit-rebates-ny.js:44` — `(800) 743-2110`
- `src/data/legal/entries/home-generator-rules-ny.js:42` — `(800) 743-2110`
- `src/data/legal/entries/power-outage-rights-ny.js:43` — `(800) 743-2110`
- `src/data/legal/entries/power-outage-rights-ny.js:46` — `(800) 743-2110`
- `src/data/legal/entries/smart-meter-opt-out-ny.js:27` — `(800) 743-2110`
- _... and 10 more refs_

### 8882014563 — 15 ref(s)
- `src/data/legal/entries/long-term-care-ombudsman-ny.js:28` — `(888) 201-4563`
- `src/data/legal/entries/long-term-care-ombudsman-ny.js:48` — `(888) 201-4563`
- `src/data/legal/entries/long-term-care-ombudsman-ny.js:91` — `(888) 201-4563`
- `src/data/legal/entries/long-term-care-ombudsman-ny.js:93` — `(888) 201-4563`
- `src/data/legal/entries/nursing-home-bed-hold-readmission-ny.js:26` — `1-888-201-4563`
- _... and 10 more refs_

### 5857531125 — 14 ref(s)
- `src/data/legal/entries/agricultural-assessment-farm-rpt-305-ny.js:46` — `(585) 753-1125`
- `src/data/legal/entries/agricultural-assessment-farm-rpt-305-ny.js:66` — `(585) 753-1125`
- `src/data/legal/entries/agricultural-assessment-farm-rpt-305-ny.js:68` — `(585) 753-1125`
- `src/data/legal/entries/basic-star-exemption-credit-ny.js:44` — `(585) 753-1125`
- `src/data/legal/entries/basic-star-exemption-credit-ny.js:75` — `(585) 753-1125`
- _... and 9 more refs_

### 7168815222 — 14 ref(s)
- `src/data/legal/entries/bait-and-switch-advertising-ny.js:28` — `(716) 881-5222`
- `src/data/legal/entries/bait-and-switch-advertising-ny.js:47` — `(716) 881-5222`
- `src/data/legal/entries/concert-ticket-resale-rights-ny.js:51` — `(716) 881-5222`
- `src/data/legal/entries/credit-card-surcharge-ny.js:50` — `(716) 881-5222`
- `src/data/legal/entries/defective-product-ucc-warranty-ny.js:28` — `(716) 881-5222`
- _... and 9 more refs_

### 5184633200 — 14 ref(s)
- `src/data/legal/entries/bulk-sale-notice-ny.js:52` — `(518) 463-3200`
- `src/data/legal/entries/handwritten-will-ny.js:50` — `(518) 463-3200`
- `src/data/legal/entries/military-divorce-benefits-ny.js:52` — `(518) 463-3200`
- `src/data/legal/entries/non-solicitation-agreement-ny-cl.js:51` — `(518) 463-3200`
- `src/data/legal/entries/pet-trust-ny.js:48` — `(518) 463-3200`
- _... and 9 more refs_

### 8882255322 — 14 ref(s)
- `src/data/legal/entries/cell-phone-contract-rights-ny.js:63` — `(888) 225-5322`
- `src/data/legal/entries/internet-outage-refund-ny.js:43` — `(888) 225-5322`
- `src/data/legal/entries/internet-outage-refund-ny.js:61` — `(888) 225-5322`
- `src/data/legal/entries/internet-outage-refund-ny.js:63` — `(888) 225-5322`
- `src/data/legal/entries/internet-service-outage-refund-ny.js:43` — `(888) 225-5322`
- _... and 9 more refs_

### 2122431313 — 14 ref(s)
- `src/data/legal/entries/clean-slate-ny.js:55` — `(212) 243-1313`
- `src/data/legal/entries/clean-slate-ny.js:75` — `(212) 243-1313`
- `src/data/legal/entries/clean-slate-ny.js:105` — `(212) 243-1313`
- `src/data/legal/entries/clean-slate-ny.js:107` — `(212) 243-1313`
- `src/data/legal/entries/dismissed-case-sealing-ny.js:49` — `(212) 243-1313`
- _... and 9 more refs_

### 5853366026 — 14 ref(s)
- `src/data/legal/entries/deck-patio-permit-ny.js:44` — `(585) 336-6026`
- `src/data/legal/entries/electrical-residential-ny-mon-irondequoit-town.js:12` — `(585) 336-6026`
- `src/data/legal/entries/electrical-residential-ny-mon-irondequoit-town.js:16` — `(585) 336-6026`
- `src/data/legal/entries/electrical-residential-ny-mon-irondequoit-town.js:44` — `(585) 336-6026`
- `src/data/legal/entries/electrical-residential-ny-mon-irondequoit-town.js:59` — `(585) 336-6026`
- _... and 9 more refs_

### 5854213207 — 14 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-fairport-village.js:12` — `(585) 421-3207`
- `src/data/legal/entries/electrical-residential-ny-mon-fairport-village.js:16` — `(585) 421-3207`
- `src/data/legal/entries/electrical-residential-ny-mon-fairport-village.js:20` — `(585) 421-3207`
- `src/data/legal/entries/electrical-residential-ny-mon-fairport-village.js:44` — `(585) 421-3207`
- `src/data/legal/entries/electrical-residential-ny-mon-fairport-village.js:59` — `(585) 421-3207`
- _... and 9 more refs_

### 5858891553 — 14 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-wheatland-town.js:16` — `(585) 889-1553`
- `src/data/legal/entries/electrical-residential-ny-mon-wheatland-town.js:20` — `(585) 889-1553`
- `src/data/legal/entries/electrical-residential-ny-mon-wheatland-town.js:58` — `(585) 889-1553`
- `src/data/legal/entries/hvac-residential-ny-mon-wheatland-town.js:18` — `(585) 889-1553`
- `src/data/legal/entries/hvac-residential-ny-mon-wheatland-town.js:57` — `585-889-1553`
- _... and 9 more refs_

### 5857845220 — 13 ref(s)
- `src/data/legal/entries/abandoned-house-next-door-ny.js:45` — `(585) 784-5220`
- `src/data/legal/entries/above-ground-pool-rules-ny.js:51` — `(585) 784-5220`
- `src/data/legal/entries/code-enforcement-complaint-ny.js:43` — `(585) 784-5220`
- `src/data/legal/entries/dumpster-placement-permit-ny.js:44` — `(585) 784-5220`
- `src/data/legal/entries/fence-height-rules-ny.js:42` — `(585) 784-5220`
- _... and 8 more refs_

### 5852486265 — 13 ref(s)
- `src/data/legal/entries/backyard-chicken-laws-ny.js:49` — `(585) 248-6265`
- `src/data/legal/entries/electrical-residential-ny-mon-pittsford-town.js:16` — `(585) 248-6265`
- `src/data/legal/entries/electrical-residential-ny-mon-pittsford-town.js:20` — `(585) 248-6265`
- `src/data/legal/entries/electrical-residential-ny-mon-pittsford-town.js:44` — `(585) 248-6265`
- `src/data/legal/entries/electrical-residential-ny-mon-pittsford-town.js:58` — `(585) 248-6265`
- _... and 8 more refs_

### 5184572036 — 13 ref(s)
- `src/data/legal/entries/basic-star-exemption-credit-ny.js:26` — `(518) 457-2036`
- `src/data/legal/entries/basic-star-exemption-credit-ny.js:42` — `(518) 457-2036`
- `src/data/legal/entries/basic-star-exemption-credit-ny.js:62` — `(518) 457-2036`
- `src/data/legal/entries/plastic-bag-fee-ban-ny.js:50` — `(518) 457-2036`
- `src/data/legal/entries/property-tax-installment-plan-ny.js:45` — `(518) 457-2036`
- _... and 8 more refs_

### 5852262466 — 13 ref(s)
- `src/data/legal/entries/bottle-bill-deposit-return-ny.js:50` — `(585) 226-2466`
- `src/data/legal/entries/burning-trash-leaves-laws-ny.js:43` — `(585) 226-2466`
- `src/data/legal/entries/burning-trash-leaves-laws-ny.js:45` — `(585) 226-2466`
- `src/data/legal/entries/burning-trash-leaves-laws-ny.js:60` — `(585) 226-2466`
- `src/data/legal/entries/burning-trash-leaves-laws-ny.js:62` — `(585) 226-2466`
- _... and 8 more refs_

### 5184852889 — 13 ref(s)
- `src/data/legal/entries/bulk-sale-notice-ny.js:46` — `(518) 485-2889`
- `src/data/legal/entries/credit-card-surcharge-ny.js:53` — `(518) 485-2889`
- `src/data/legal/entries/garage-sale-estate-sale-tax-ny.js:44` — `(518) 485-2889`
- `src/data/legal/entries/home-business-sales-tax-ny.js:47` — `(518) 485-2889`
- `src/data/legal/entries/home-business-sales-tax-ny.js:61` — `(518) 485-2889`
- _... and 8 more refs_

### 5854287538 — 13 ref(s)
- `src/data/legal/entries/dumpster-placement-permit-ny.js:41` — `(585) 428-7538`
- `src/data/legal/entries/dumpster-placement-permit-ny.js:62` — `(585) 428-7538`
- `src/data/legal/entries/dumpster-placement-permit-ny.js:64` — `(585) 428-7538`
- `src/data/legal/entries/mailbox-rules-usps-ny.js:46` — `(585) 428-7538`
- `src/data/legal/entries/moving-truck-street-permit-ny.js:41` — `(585) 428-7538`
- _... and 8 more refs_

### 5853924144 — 13 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-hilton-village.js:16` — `(585) 392-4144`
- `src/data/legal/entries/electrical-residential-ny-mon-hilton-village.js:20` — `(585) 392-4144`
- `src/data/legal/entries/electrical-residential-ny-mon-hilton-village.js:58` — `(585) 392-4144`
- `src/data/legal/entries/hvac-residential-ny-mon-hilton-village.js:12` — `(585) 392-4144`
- `src/data/legal/entries/hvac-residential-ny-mon-hilton-village.js:16` — `(585) 392-4144`
- _... and 8 more refs_

### 5852933880 — 13 ref(s)
- `src/data/legal/entries/electrical-residential-ny-mon-riga-town.js:18` — `(585) 293-3880`
- `src/data/legal/entries/electrical-residential-ny-mon-riga-town.js:18` — `(585) 293-3880`
- `src/data/legal/entries/electrical-residential-ny-mon-riga-town.js:56` — `585-293-3880`
- `src/data/legal/entries/hvac-residential-ny-mon-riga-town.js:57` — `585-293-3880`
- `src/data/legal/entries/plumbing-residential-ny-mon-riga-town.js:23` — `(585) 293-3880`
- _... and 8 more refs_

### 5854287522 — 13 ref(s)
- `src/data/legal/entries/landlord-interference-quiet-enjoyment-ny-cl.js:28` — `(585) 428-7522`
- `src/data/legal/entries/landlord-interference-quiet-enjoyment-ny-cl.js:49` — `(585) 428-7522`
- `src/data/legal/entries/landlord-interference-quiet-enjoyment-ny-cl.js:91` — `(585) 428-7522`
- `src/data/legal/entries/landlord-interference-quiet-enjoyment-ny-cl.js:93` — `(585) 428-7522`
- `src/data/legal/entries/late-rent-fee-cap-ny.js:49` — `(585) 428-7522`
- _... and 8 more refs_

### 5854287482 — 13 ref(s)
- `src/data/legal/entries/parking-overnight-street-ny.js:65` — `(585) 428-7482`
- `src/data/legal/entries/parking-overnight-street-ny.js:67` — `(585) 428-7482`
- `src/data/legal/entries/parking-ticket-ny.js:40` — `(585) 428-7482`
- `src/data/legal/entries/parking-ticket-ny.js:43` — `(585) 428-7482`
- `src/data/legal/entries/parking-ticket-ny.js:60` — `(585) 428-7482`
- _... and 8 more refs_

### 8005806665 — 13 ref(s)
- `src/data/legal/entries/workers-comp-claim-walkthrough-ny.js:27` — `(800) 580-6665`
- `src/data/legal/entries/workers-comp-claim-walkthrough-ny.js:46` — `(800) 580-6665`
- `src/data/legal/entries/workers-comp-claim-walkthrough-ny.js:63` — `(800) 580-6665`
- `src/data/legal/entries/workers-comp-claim-walkthrough-ny.js:65` — `(800) 580-6665`
- `src/data/legal/entries/workers-comp-lump-sum-settlement-ny.js:29` — `(800) 580-6665`
- _... and 8 more refs_

_Truncated. 1082 additional orphan numbers in the JSON report._

## Numbers already in canonical poles

| Digits | Pole slug | Refs |
|---|---|---|
| 5852324090 | `legalAidRoc` | 1185 |
| 5855462130 | `monroeBarReferral` | 512 |
| 5854544060 | `empireJustice` | 405 |
| 8007717755 | `nysAGConsumer` | 315 |
| 5853252520 | `lawNY` | 192 |
| 311 | `municipal311` | 155 |
| 5852323051 | `justCause` | 151 |
| 8003423736 | `nysDFS` | 136 |
| 8884697365 | `nysDOLLaborStandards` | 114 |
| 5857534210 | `publicDefender` | 108 |
| 5852448400 | `seniorHEAPViaLifespan` | 106 |
| 911 | `emergency911` | 101 |
| 8883923644 | `nysDHR` | 98 |
| 5855463700 | `housingCouncil` | 95 |
| 5857531600 | `clerk` | 81 |
| 5854286520 | `bureauInspection` | 81 |
| 5857536998 | `main` | 77 |
| 211 | `call211` | 75 |
| 5184869786 | `nysDMVAbandonedVehicle` | 63 |
| 5857535555 | `main` | 52 |
| 8773824357 | `ftcConsumer` | 50 |
| 5857536280 | `main` | 49 |
| 8554112372 | `cfpb` | 48 |
| 5855467510 | `centerForDisabilityRights` | 45 |
| 8006971220 | `nysDCP` | 42 |
| 5853253050 | `workerJusticeCenter` | 42 |
| 8886145400 | `cssnyHealth` | 41 |
| 5857534178 | `sheriff` | 40 |
| 8553555777 | `nyStateOfHealth` | 38 |
| 8003423377 | `nysPSC` | 38 |
| 988 | `call988` | 23 |
| 8666973732 | `empowerPlus` | 20 |
| 8778467369 | `oasasHopeline` | 11 |
| 5857536316 | `childCare` | 10 |
| 8003323742 | `epic` | 9 |
| 5857534942 | `wic` | 8 |
| 8007431701 | `rgeMain` | 7 |
| 5857536960 | `snapAppointmentLine` | 6 |
| 8007997233 | `dvHotline` | 5 |
| 5857536477 | `heapDirect` | 4 |
| 741741 | `crisisText` | 4 |
| 5852758686 | `psychCrisisLine` | 4 |
| 5859001004 | `cashRoc` | 4 |
| 8006564673 | `rainn` | 4 |
| 5857535765 | `fosterCareIntake` | 3 |
| 5852753535 | `main` | 3 |
| 5852754501 | `psychEmergency` | 3 |
| 8772663492 | `rgeBillHelp` | 3 |
| 8006984543 | `childHealthPlus` | 2 |
| 5852753161 | `behavioralHealthClinic` | 2 |
| 8004224453 | `childhelp` | 2 |
| 8664887386 | `trevorProject` | 2 |
| 8775658860 | `transLifeline` | 2 |
| 8002738255 | `suicide988Legacy` | 1 |
| 8009855990 | `disasterDistress` | 1 |
| 8888439461 | `womensLawVAW` | 1 |

