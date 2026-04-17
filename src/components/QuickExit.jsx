import React, { useRef, useState, useCallback } from "react";

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

  const [pos, setPos] = useState({ x: 12, y: null });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const moved = useRef(false);
  const elRef = useRef(null);

  const getCoords = (e) => {
    if (e.touches && e.touches[0]) return { cx: e.touches[0].clientX, cy: e.touches[0].clientY };
    return { cx: e.clientX, cy: e.clientY };
  };

  const onStart = useCallback((e) => {
    dragging.current = true;
    moved.current = false;
    const { cx, cy } = getCoords(e);
    const rect = elRef.current.getBoundingClientRect();
    offset.current = { x: cx - rect.left, y: cy - rect.top };
  }, []);

  const onMove = useCallback((e) => {
    if (!dragging.current) return;
    moved.current = true;
    const { cx, cy } = getCoords(e);
    const nx = cx - offset.current.x;
    const ny = cy - offset.current.y;
    setPos({ x: nx, y: ny });
  }, []);

  const onEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  const handleExit = (e) => {
    e.preventDefault();
    if (moved.current) { moved.current = false; return; }
    try { document.body.innerHTML = ""; } catch (err) { /* fail silently */ }
    window.location.replace(getRandomSite());
  };

  const bottom = pos.y == null ? 24 : undefined;
  const top = pos.y != null ? pos.y : undefined;

  return (
    <a
      ref={elRef}
      href="https://www.google.com"
      onClick={handleExit}
      onMouseDown={onStart}
      onMouseMove={onMove}
      onMouseUp={onEnd}
      onTouchStart={onStart}
      onTouchMove={onMove}
      onTouchEnd={onEnd}
      style={{
        position: "fixed",
        left: pos.x,
        top,
        bottom,
        zIndex: 9999,
        background: "#d32f2f",
        color: "#fff",
        border: "none",
        padding: "8px 18px",
        borderRadius: 20,
        fontWeight: 700,
        fontSize: 14,
        textDecoration: "none",
        cursor: dragging.current ? "grabbing" : "grab",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      ✕ {lang === "es" ? "Salida" : lang === "ar" ? "خروج" : lang === "zh" ? "退出" : "Exit"}
    </a>
  );
}
