import React from "react";
// Site-wide Quick Exit button. Immediately replaces the current page
// with a randomly selected common, innocuous website. Uses
// location.replace() so the back button does NOT return to HelpFinder.
//
// The exit destinations are popular sites that anyone might visit —
// deliberately chosen to be unremarkable in browser history.
// Randomized on each click so there is no predictable pattern.

const SAFE_SITES = [
  "https://www.google.com",
  "https://www.amazon.com",
  "https://www.youtube.com",
  "https://www.espn.com",
  "https://www.netflix.com",
  "https://www.walmart.com",
  "https://www.target.com",
  "https://www.cnn.com",
  "https://www.wikipedia.org",
  "https://www.bestbuy.com",
  "https://www.homedepot.com",
  "https://www.ebay.com",
];

function getRandomSite() {
  return SAFE_SITES[Math.floor(Math.random() * SAFE_SITES.length)];
}

export default function QuickExit({ lang, show }) {
  if (show === false) return null;
  const isRTL = lang === "ar";

  const handleExit = (e) => {
    e.preventDefault();
    // Clear the page content immediately before redirect
    // so even a slow connection doesn't show HelpFinder content
    try { document.body.innerHTML = ""; } catch (err) { /* fail silently */ }
    window.location.replace(getRandomSite());
  };

  return (
    <a
      href="https://www.google.com"
      onClick={handleExit}
      style={{
        position: "fixed",
        top: "max(12px, env(safe-area-inset-top, 12px))",
        zIndex: 9999,
        ...(isRTL ? { left: 12 } : { right: 12 }),
        background: "#d32f2f",
        color: "#fff",
        border: "none",
        padding: "8px 18px",
        borderRadius: 20,
        fontWeight: 700,
        fontSize: 14,
        textDecoration: "none",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      ✕ {lang === "es" ? "Salida" : lang === "ar" ? "خروج" : lang === "zh" ? "退出" : "Exit"}
    </a>
  );
}
