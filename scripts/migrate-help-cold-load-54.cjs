#!/usr/bin/env node
/**
 * migrate-help-cold-load-54.cjs
 * ==============================
 * Fixes a latent bug in src/App.jsx: cold-loading /help (bookmark, shared
 * link, Google result) showed LandingPage instead of the HelpFinder app
 * because App.jsx only switched views on in-page click, not on pathname.
 *
 * Adds three small behaviors:
 *   1. On mount, check window.location.pathname. If it matches /help or
 *      /help/*, setView(HELP).
 *   2. goToHelp() pushes /help into browser history so the URL matches
 *      what the user sees.
 *   3. goHome() pushes / into history and a popstate listener keeps
 *      the view in sync when the user uses browser back/forward.
 *
 * LandingPage.jsx has its own popstate listener for its internal routes
 * (/about, /know-your-rights, /glossary, etc.). That keeps working —
 * App.jsx's listener only flips between LANDING and HELP views.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APP = path.join(ROOT, 'src/App.jsx');
let app = fs.readFileSync(APP, 'utf8');
let failures = 0;
let successes = 0;

function doReplace(oldStr, newStr, label) {
  if (!app.includes(oldStr)) {
    console.error('ABORT: ' + label);
    console.error('  Expected: ' + JSON.stringify(oldStr).slice(0, 180));
    failures++;
    return;
  }
  app = app.replace(oldStr, newStr);
  console.log('OK: ' + label);
  successes++;
}

// ═══════════════════════════════════════════════
// 1. Import useEffect
// ═══════════════════════════════════════════════
doReplace(
  'import { useState } from "react";\n',
  'import { useState, useEffect } from "react";\n',
  'Import useEffect'
);

// ═══════════════════════════════════════════════
// 2. Replace the view-switch handlers + useState block with the
//    pathname-aware version. Single replace covers state init,
//    effects, goToHelp, goHome, and view routing.
// ═══════════════════════════════════════════════
doReplace(
  'export default function App() {\n' +
  '  const [view, setView] = useState(VIEWS.LANDING);\n' +
  '  const [lang, setLang] = useState("en");\n' +
  '  const [city, setCity] = useState("your area");\n' +
  '  const [jurisdictions, setJurisdictions] = useState([]);\n' +
  '\n' +
  '  const goToHelp = () => { setView(VIEWS.HELP); window.scrollTo(0, 0); };\n' +
  '  const goHome = () => { setView(VIEWS.LANDING); window.scrollTo(0, 0); };\n' +
  '\n' +
  '  if (view === VIEWS.HELP) return <HelpFinder onExit={goHome} city={city} jurisdictions={jurisdictions} />;\n' +
  '  return <LandingPage onNavigateHelp={goToHelp} onLangChange={setLang} onCityDetected={setCity} onJurisdictionsDetected={setJurisdictions} />;\n' +
  '}\n',
  'export default function App() {\n' +
  '  const isHelpPath = (p) => p === "/help" || (p && p.startsWith("/help/"));\n' +
  '  const initialView = typeof window !== "undefined" && isHelpPath(window.location.pathname)\n' +
  '    ? VIEWS.HELP\n' +
  '    : VIEWS.LANDING;\n' +
  '\n' +
  '  const [view, setView] = useState(initialView);\n' +
  '  const [lang, setLang] = useState("en");\n' +
  '  const [city, setCity] = useState("your area");\n' +
  '  const [jurisdictions, setJurisdictions] = useState([]);\n' +
  '\n' +
  '  // Keep view and URL in sync when the user uses browser back/forward.\n' +
  '  // LandingPage.jsx has its own popstate listener for its internal routes\n' +
  '  // (/about, /know-your-rights, /glossary, etc.) — this one only flips\n' +
  '  // between LANDING and HELP views, so they coexist without conflict.\n' +
  '  useEffect(() => {\n' +
  '    const onPop = () => {\n' +
  '      setView(isHelpPath(window.location.pathname) ? VIEWS.HELP : VIEWS.LANDING);\n' +
  '      window.scrollTo(0, 0);\n' +
  '    };\n' +
  '    window.addEventListener("popstate", onPop);\n' +
  '    return () => window.removeEventListener("popstate", onPop);\n' +
  '  }, []);\n' +
  '\n' +
  '  const goToHelp = () => {\n' +
  '    setView(VIEWS.HELP);\n' +
  '    if (typeof window !== "undefined" && !isHelpPath(window.location.pathname)) {\n' +
  '      try { window.history.pushState({}, "", "/help" + window.location.hash); } catch (e) {}\n' +
  '    }\n' +
  '    window.scrollTo(0, 0);\n' +
  '  };\n' +
  '  const goHome = () => {\n' +
  '    setView(VIEWS.LANDING);\n' +
  '    if (typeof window !== "undefined" && isHelpPath(window.location.pathname)) {\n' +
  '      try { window.history.pushState({}, "", "/"); } catch (e) {}\n' +
  '    }\n' +
  '    window.scrollTo(0, 0);\n' +
  '  };\n' +
  '\n' +
  '  if (view === VIEWS.HELP) return <HelpFinder onExit={goHome} city={city} jurisdictions={jurisdictions} />;\n' +
  '  return <LandingPage onNavigateHelp={goToHelp} onLangChange={setLang} onCityDetected={setCity} onJurisdictionsDetected={setJurisdictions} />;\n' +
  '}\n',
  'App: detect /help on mount, sync URL on view change, handle popstate'
);

if (failures === 0) {
  fs.writeFileSync(APP, app, 'utf8');
}
console.log('\n' + successes + ' changes, ' + failures + ' failures.');
if (failures > 0) {
  console.error('\nABORT: source file NOT written.');
  process.exit(1);
}
console.log('\nWrote: ' + path.relative(ROOT, APP));
