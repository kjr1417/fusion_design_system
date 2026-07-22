import React from "react";

export function ProgressBar({ value = 0, max = 100, label }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{ width: "100%" }}>
      {label && <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--salt-text-label-fontSize)", marginBottom: "var(--salt-spacing-25)" }}>
        <span>{label}</span><span>{Math.round(pct)}%</span>
      </div>}
      <div style={{ height: "var(--salt-size-bar)", borderRadius: "var(--salt-palette-corner-weaker)", background: "var(--salt-color-gray-200)", overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: "var(--salt-palette-accent)", transition: "width var(--salt-duration-perceptible) ease-in-out" }} />
      </div>
    </div>
  );
}
