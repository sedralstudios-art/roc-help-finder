#!/usr/bin/env node
/**
 * migrate-results-cleanup-44.cjs
 * ===============================
 * Fixes 4 results page issues:
 *
 * 1. HEADER: When userTown is set (manual or geo), show its display name
 *    as the city label instead of showing both geo + dropdown.
 *
 * 2. COMMUNITY GROUPS: Add category tags so groups show only when relevant.
 *    Food groups show in food results, housing in housing, etc.
 *
 * 3. FOOTER: Use userTown display name instead of raw geo city.
 *
 * 4. HOME COUNT: Replace hardcoded PROGRAMS.length with filtered count.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HF = path.join(ROOT, 'src/components/HelpFinder.jsx');
let hf = fs.readFileSync(HF, 'utf8');
let failures = 0;
let successes = 0;

function doReplace(oldStr, newStr, label) {
  if (!hf.includes(oldStr)) {
    console.error("ABORT: " + label);
    console.error("  Expected: " + JSON.stringify(oldStr).slice(0, 140));
    failures++;
    return;
  }
  hf = hf.replace(oldStr, newStr);
  console.log("OK: " + label);
  successes++;
}

// ═══════════════════════════════════════════════
// 1. HEADER: Show selected town name, not both geo + dropdown
// ═══════════════════════════════════════════════

doReplace(
  `              <div style={{ fontSize: 11, color: "#767676", marginTop: 1 }}>
                {city}
                {userTown && <span style={{ marginLeft: 4 }}>·</span>}
                <select`,
  `              <div style={{ fontSize: 11, color: "#767676", marginTop: 1 }}>
                <select`,
  'Header: remove raw city text before dropdown'
);

// Update the "All areas" / "Select town" default option to show current city
doReplace(
  `<option value="">{userTown ? "All areas" : "Select town"}</option>`,
  `<option value="">{userTown ? "All Monroe County" : (city && city !== "your area" ? city : "Select your town")}</option>`,
  'Header: better default option text'
);

// ═══════════════════════════════════════════════
// 2. COMMUNITY GROUPS: Add category tags
// ═══════════════════════════════════════════════

doReplace(
  `const COMMUNITY = [
  { n:"Rochester Hope", d:"Saturday: free food, clothing, haircuts, health screenings, legal aid, 50+ agencies. Every Saturday 9:30am-3:30pm.", loc:"869 N Clinton Ave", url:"https://rochesterhope.org" },
  { n:"Roc Food Not Bombs", d:"Free hot meals and grocery stands across Rochester. No ID, no questions.", url:"https://www.facebook.com/rocfoodnotbombs/" },
  { n:"Rochester Mutual Aid Network", d:"Connects people who need help with people who can help.", url:"https://www.rocmutualaid.com" },
  { n:"Rochester NY Food Relief", d:"Active Facebook group sharing free food, pantry info, meal locations.", url:"https://www.facebook.com/groups/rochesterNYfoodrelief" },
  { n:"Buy Nothing Rochester", d:"Free items shared among neighbors. Search 'Buy Nothing' + your neighborhood on Facebook." },
  { n:"ROC COVID Mutual Aid", d:"Emergency funds, supplies, rides, community support. Still active.", url:"https://www.facebook.com/groups/roccovidmutualaid" },
  { n:"Rochester Free Store", d:"Free clothing and household items. 3rd Saturday monthly. Search 'Rochester Free Store' on Facebook." },
  { n:"Rochester NY Moms Group", d:"Parenting support, baby items, advice. Search 'Rochester NY Moms Group' on Facebook." },
  { n:"Rochester Housing Help", d:"Housing leads, roommate searches, rental info. Search 'Rochester Housing Help' on Facebook." },
  { n:"Rochester Job Hunters", d:"Job postings, résumé help, networking. Search 'Rochester Job Hunters' on Facebook." },
];`,
  `const COMMUNITY = [
  { n:"Rochester Hope", d:"Saturday: free food, clothing, haircuts, health screenings, legal aid, 50+ agencies. Every Saturday 9:30am-3:30pm.", loc:"869 N Clinton Ave", url:"https://rochesterhope.org", cats:["food","clothing","health","legal","cash"] },
  { n:"Roc Food Not Bombs", d:"Free hot meals and grocery stands across Rochester. No ID, no questions.", url:"https://www.facebook.com/rocfoodnotbombs/", cats:["food"] },
  { n:"Rochester Mutual Aid Network", d:"Connects people who need help with people who can help.", url:"https://www.rocmutualaid.com", cats:["cash","housing","food","clothing","transport"] },
  { n:"Rochester NY Food Relief", d:"Active Facebook group sharing free food, pantry info, meal locations.", url:"https://www.facebook.com/groups/rochesterNYfoodrelief", cats:["food"] },
  { n:"Buy Nothing Rochester", d:"Free items shared among neighbors. Search 'Buy Nothing' + your neighborhood on Facebook.", cats:["clothing","cash"] },
  { n:"ROC COVID Mutual Aid", d:"Emergency funds, supplies, rides, community support. Still active.", url:"https://www.facebook.com/groups/roccovidmutualaid", cats:["cash","transport","food"] },
  { n:"Rochester Free Store", d:"Free clothing and household items. 3rd Saturday monthly. Search 'Rochester Free Store' on Facebook.", cats:["clothing"] },
  { n:"Rochester NY Moms Group", d:"Parenting support, baby items, advice. Search 'Rochester NY Moms Group' on Facebook.", cats:["childcare","crisisChild"] },
  { n:"Rochester Housing Help", d:"Housing leads, roommate searches, rental info. Search 'Rochester Housing Help' on Facebook.", cats:["housing"] },
  { n:"Rochester Job Hunters", d:"Job postings, résumé help, networking. Search 'Rochester Job Hunters' on Facebook.", cats:["employment"] },
];`,
  'Community groups: add category tags'
);

// Update CommunitySection to accept category and filter
doReplace(
  `const CommunitySection = ({ lang }) => (
  <div style={{ marginTop: 32 }}>`,
  `const CommunitySection = ({ lang, category }) => {
  const groups = category ? COMMUNITY.filter(g => !g.cats || g.cats.includes(category)) : COMMUNITY;
  if (groups.length === 0) return null;
  return (
  <div style={{ marginTop: 32 }}>`,
  'CommunitySection: add category filtering'
);

doReplace(
  `    {COMMUNITY.map((g, i) => (`,
  `    {groups.map((g, i) => (`,
  'CommunitySection: use filtered groups'
);

// Close the function body (was a const arrow returning JSX, now a function)
doReplace(
  `  </div>
);`,
  `  </div>
  );
};`,
  'CommunitySection: close function body'
);

// Pass category to CommunitySection
doReplace(
  `<CommunitySection lang={lang} />`,
  `<CommunitySection lang={lang} category={category} />`,
  'Pass category to CommunitySection'
);

// ═══════════════════════════════════════════════
// 3. FOOTER: Use selected town display name
// ═══════════════════════════════════════════════

doReplace(
  `Sedral Studios · {city}<br />`,
  `Sedral Studios · {userTown ? (TOWN_LABELS[userTown] || city) : city}<br />`,
  'Footer: show selected town name'
);

// ═══════════════════════════════════════════════
// 4. HOME COUNT: Use filtered count instead of PROGRAMS.length
// ═══════════════════════════════════════════════

doReplace(
  `{PROGRAMS.length} free programs{city && city !== "your area" ? \` in \${city}\` : ""}`,
  `{PROGRAMS.filter(p => !p.town || !userTown || p.town === userTown || (p.serves && p.serves.includes(userTown))).length} free programs{userTown ? \` in \${TOWN_LABELS[userTown] || city}\` : (city && city !== "your area" ? \` in \${city}\` : "")}`,
  'Home: filtered program count + town label'
);

fs.writeFileSync(HF, hf, 'utf8');
console.log("\n" + successes + " changes, " + failures + " failures.");
if (failures > 0) process.exit(1);
