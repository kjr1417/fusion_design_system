import React from "react";

export function Stepper({ steps = [], activeStep = 0 }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-50)" }}>
            <span style={{
              width: "var(--salt-spacing-150)", height: "var(--salt-spacing-150)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "var(--salt-text-label-fontSize)", fontWeight: "var(--salt-text-fontWeight-strong)",
              background: i <= activeStep ? "var(--salt-palette-accent)" : "var(--salt-color-gray-200)",
              color: i <= activeStep ? "var(--salt-color-white)" : "var(--salt-content-secondary-foreground)",
            }}>{i + 1}</span>
            <span style={{ fontSize: "var(--salt-text-fontSize)", color: i === activeStep ? "var(--salt-content-primary-foreground)" : "var(--salt-content-secondary-foreground)", fontWeight: i === activeStep ? "var(--salt-text-fontWeight-strong)" : "var(--salt-text-fontWeight)" }}>{label}</span>
          </div>
          {i < steps.length - 1 && <div style={{ width: "var(--salt-spacing-200)", height: "var(--salt-size-fixed-100)", background: "var(--salt-color-gray-300)", margin: "0 var(--salt-spacing-75)" }} />}
        </React.Fragment>
      ))}
    </div>
  );
}
