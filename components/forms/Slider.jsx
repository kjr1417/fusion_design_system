import React, { useState } from "react";

export function Slider({ min = 0, max = 100, step = 1, defaultValue = 50, disabled = false, onChange, ...rest }) {
  const [value, setValue] = useState(defaultValue);
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", opacity: disabled ? 0.4 : 1 }}>
      <div style={{ position: "relative", flex: 1, height: "var(--salt-size-selectable)", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: "var(--salt-size-bar)", borderRadius: "var(--salt-palette-corner-weaker)", background: "var(--salt-color-gray-200)" }} />
        <div style={{ position: "absolute", left: 0, width: pct + "%", height: "var(--salt-size-bar)", borderRadius: "var(--salt-palette-corner-weaker)", background: "var(--salt-palette-accent)" }} />
        <input
          type="range" min={min} max={max} step={step} value={value} disabled={disabled}
          onChange={(e) => { setValue(Number(e.target.value)); onChange && onChange(Number(e.target.value)); }}
          style={{ position: "relative", width: "100%", accentColor: "var(--salt-palette-accent)" }}
          {...rest}
        />
      </div>
      <span style={{ fontSize: "var(--salt-text-label-fontSize)", minWidth: "var(--salt-spacing-150)", textAlign: "right" }}>{value}</span>
    </div>
  );
}
