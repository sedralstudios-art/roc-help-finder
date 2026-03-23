import { useState } from "react";
import LandingPage from "./components/LandingPage.jsx";
import HelpFinder from "./components/HelpFinder.jsx";
import ClarityReading from "./components/ClarityReading.jsx";

// HELPFINDER.HELP — App Router
// Three products. One site. One router.

const VIEWS = { LANDING: "landing", HELP: "help", CLARITY: "clarity" };

export default function App() {
  const [view, setView] = useState(VIEWS.LANDING);
  const [clarityDoor, setClarityDoor] = useState("mirror");

  const goToHelp = () => { setView(VIEWS.HELP); window.scrollTo(0, 0); };
  const goToClarity = (door) => { setClarityDoor(door || "mirror"); setView(VIEWS.CLARITY); window.scrollTo(0, 0); };
  const goHome = () => { setView(VIEWS.LANDING); window.scrollTo(0, 0); };

  if (view === VIEWS.HELP) return <HelpFinder onExit={goHome} />;
  if (view === VIEWS.CLARITY) return <ClarityReading initialDoor={clarityDoor} onExit={goHome} />;
  return <LandingPage onNavigateHelp={goToHelp} onNavigateClarity={goToClarity} />;
}
