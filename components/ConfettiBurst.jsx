import React from "react";

// Simple confetti SVG burst for demo (replace with a library for more advanced effects)
export default function ConfettiBurst({ show }) {
  if (!show) return null;
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 50 }}>
      <svg width="100vw" height="100vh" viewBox="0 0 100 100" style={{ width: "100vw", height: "100vh" }}>
        <g>
          <circle cx="50" cy="50" r="2" fill="#fbbf24" />
          <circle cx="30" cy="40" r="1.5" fill="#34d399" />
          <circle cx="70" cy="60" r="1.5" fill="#60a5fa" />
          <circle cx="60" cy="30" r="1.2" fill="#f472b6" />
          <circle cx="40" cy="70" r="1.2" fill="#f87171" />
          <circle cx="80" cy="50" r="1.5" fill="#fbbf24" />
          <circle cx="20" cy="60" r="1.5" fill="#34d399" />
        </g>
      </svg>
    </div>
  );
}
