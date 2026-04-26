import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Hide the prerendered SEO shell as soon as the React tree is ready. The shell
// stays in the DOM until then so crawlers and slow connections see real
// content; once React mounts, fade the shell out and remove it so users only
// see the React UI. The fade transition is set in index.html.
function hidePrerenderShell() {
  const el = document.getElementById("prerender-content");
  if (!el) return;
  el.style.opacity = "0";
  setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 160);
}

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Run after the first paint so React content is on screen before the shell
// fades out — avoids a blank flash between removal and React render.
requestAnimationFrame(() => requestAnimationFrame(hidePrerenderShell));
