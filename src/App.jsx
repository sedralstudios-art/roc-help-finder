import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage.jsx";
import HelpFinder from "./components/HelpFinder.jsx";

// HELPFINDER.HELP — App Router
// One purpose. One product. Free help, everywhere.

const VIEWS = { LANDING: "landing", HELP: "help" };

export default function App() {
  const isHelpPath = (p) => p === "/help" || (p && p.startsWith("/help/"));
  const initialView = typeof window !== "undefined" && isHelpPath(window.location.pathname)
    ? VIEWS.HELP
    : VIEWS.LANDING;

  const [view, setView] = useState(initialView);
  const [lang, setLang] = useState("en");
  const [city, setCity] = useState("your area");
  const [jurisdictions, setJurisdictions] = useState([]);

  // Keep view and URL in sync when the user uses browser back/forward.
  // LandingPage.jsx has its own popstate listener for its internal routes
  // (/about, /know-your-rights, /glossary, etc.) — this one only flips
  // between LANDING and HELP views, so they coexist without conflict.
  useEffect(() => {
    const onPop = () => {
      setView(isHelpPath(window.location.pathname) ? VIEWS.HELP : VIEWS.LANDING);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const goToHelp = () => {
    setView(VIEWS.HELP);
    if (typeof window !== "undefined" && !isHelpPath(window.location.pathname)) {
      try { window.history.pushState({}, "", "/help" + window.location.hash); } catch (e) {}
    }
    window.scrollTo(0, 0);
  };
  const goHome = () => {
    setView(VIEWS.LANDING);
    if (typeof window !== "undefined" && isHelpPath(window.location.pathname)) {
      try { window.history.pushState({}, "", "/"); } catch (e) {}
    }
    window.scrollTo(0, 0);
  };

  if (view === VIEWS.HELP) return <HelpFinder onExit={goHome} city={city} jurisdictions={jurisdictions} />;
  return <LandingPage onNavigateHelp={goToHelp} onLangChange={setLang} onCityDetected={setCity} onJurisdictionsDetected={setJurisdictions} />;
}
