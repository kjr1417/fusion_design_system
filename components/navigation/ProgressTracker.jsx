import React, { useState } from "react";

const Chevron = ({ open }) => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"
    style={{ flex: "none", transform: open ? "none" : "rotate(180deg)", transition: "transform var(--salt-duration-instant) ease-in-out" }}>
    <path d="M5.618 3.407 6 3l.382.407L11 8.339 10.236 9 6 4.476 1.764 9 1 8.34z" />
  </svg>
);

// half-filled ring used as the group glyph
const GroupGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" style={{ flex: "none" }}>
    <circle cx="8" cy="8" r="6.5" fill="none" stroke="var(--salt-content-primary-foreground)" strokeWidth="1.5" />
    <path d="M8 1.5 A6.5 6.5 0 0 1 8 14.5 Z" fill="var(--salt-content-primary-foreground)" />
  </svg>
);

function Indicator({ status }) {
  if (status === "complete") {
    return (
      <span style={{ flex: "none", width: 16, height: 16, borderRadius: "50%", background: "var(--salt-content-primary-foreground)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 12 12" width="9" height="9" fill="var(--salt-palette-neutral-secondary-background, var(--salt-color-white))" aria-hidden="true">
          <path d="M4.706 9 1 5.395l.99-.964L4.706 7.07 10.01 1.91l.99.964z" />
        </svg>
      </span>
    );
  }
  if (status === "active") {
    return <span style={{ flex: "none", width: 16, height: 16, borderRadius: "50%", background: "var(--salt-content-primary-foreground)" }} />;
  }
  return <span style={{ flex: "none", width: 16, height: 16, borderRadius: "50%", border: "1.5px dashed var(--salt-color-gray-400)", boxSizing: "border-box" }} />;
}

export function ProgressTracker({ title, steps = [], activeStep = 0, collapsible = true, defaultCollapsed = false, onStepClick }) {
  const [open, setOpen] = useState(!defaultCollapsed);
  const statusOf = (i, s) => s.status || (i < activeStep ? "complete" : i === activeStep ? "active" : "upcoming");
  return (
    <div style={{ fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)", width: "100%" }}>
      {title && (
        <button
          onClick={() => collapsible && setOpen((o) => !o)}
          style={{
            all: "unset", cursor: collapsible ? "pointer" : "default", boxSizing: "border-box", width: "100%",
            display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)",
            padding: "var(--salt-spacing-100) var(--salt-spacing-150)",
            fontWeight: "var(--salt-text-fontWeight-strong)", color: "var(--salt-content-primary-foreground)",
          }}
        >
          <GroupGlyph />
          <span style={{ flex: 1 }}>{title}</span>
          {collapsible && <Chevron open={open} />}
        </button>
      )}
      {open && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {steps.map((raw, i) => {
            const s = typeof raw === "string" ? { label: raw } : raw;
            const status = statusOf(i, s);
            const active = status === "active";
            return (
              <button
                key={i}
                onClick={() => onStepClick && onStepClick(i)}
                style={{
                  all: "unset", cursor: onStepClick ? "pointer" : "default", boxSizing: "border-box", width: "100%",
                  display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)",
                  padding: "var(--salt-spacing-100) var(--salt-spacing-150)",
                  paddingLeft: active ? "calc(var(--salt-spacing-150) - 3px)" : "var(--salt-spacing-150)",
                  borderLeft: active ? "3px solid var(--salt-palette-accent)" : "3px solid transparent",
                  background: active ? "var(--salt-palette-accent-weakest)" : "transparent",
                  color: active ? "var(--salt-content-primary-foreground)" : "var(--salt-content-secondary-foreground)",
                  fontWeight: active ? "var(--salt-text-fontWeight-strong)" : "var(--salt-text-fontWeight)",
                }}
              >
                <Indicator status={status} />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
