import React from "react";

export function Spinner({ size = 24, label }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: "saltSpin 0.8s linear infinite" }}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="var(--salt-color-gray-200)" strokeWidth="3" />
        <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="var(--salt-palette-accent)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {label && <span style={{ fontSize: "var(--salt-text-fontSize)", color: "var(--salt-content-secondary-foreground)" }}>{label}</span>}
      <style>{"@keyframes saltSpin { to { transform: rotate(360deg); } }"}</style>
    </span>
  );
}
