import React, { useState } from "react";

/* Selectable card — a tile that behaves like a radio (single, `name` shared)
   or checkbox (`multiple`) but renders as a bordered, clickable card instead
   of an inline control. Salt selectable-card visual language: accent border
   + weakest-accent tint + check glyph when selected. */
export function SelectableCard({
  title,
  description,
  icon,
  value,
  name,
  multiple = false,
  selected: selectedProp,
  defaultSelected = false,
  disabled = false,
  onChange,
  style,
}) {
  const controlled = selectedProp !== undefined;
  const [internal, setInternal] = useState(defaultSelected);
  const selected = controlled ? selectedProp : internal;

  const toggle = () => {
    if (disabled) return;
    const next = multiple ? !selected : true;
    if (!controlled) setInternal(next);
    onChange && onChange(next, value);
  };

  return (
    <div
      role={multiple ? "checkbox" : "radio"}
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
      style={{
        display: "flex", flexDirection: "column", gap: "var(--salt-spacing-50)",
        padding: "var(--salt-spacing-100)", borderRadius: "var(--salt-palette-corner)",
        border: "1px solid " + (selected ? "var(--salt-palette-accent)" : "var(--salt-color-gray-200)"),
        background: selected ? "var(--salt-palette-accent-weakest)" : "var(--salt-color-white)",
        cursor: disabled ? "not-allowed" : "var(--salt-cursor-hover)",
        opacity: disabled ? 0.4 : 1,
        outline: "none",
        boxShadow: selected ? "none" : "var(--salt-shadow-lowest, 0 1px 3px rgba(0,0,0,0.1))",
        position: "relative",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--salt-spacing-50)" }}>
        {icon && <span style={{ color: "var(--salt-palette-accent)", flex: "none" }}>{icon}</span>}
        <span style={{
          flex: "none", width: 16, height: 16, borderRadius: multiple ? "var(--salt-palette-corner-weak)" : "50%",
          border: "1.5px solid " + (selected ? "var(--salt-palette-accent)" : "var(--salt-color-gray-400)"),
          background: selected ? "var(--salt-palette-accent)" : "transparent",
          display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--salt-color-white)",
          marginLeft: "auto",
        }}>
          {selected && <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.2 5 8.7l4.5-5"></path></svg>}
        </span>
      </div>
      <span style={{ fontFamily: "var(--salt-text-fontFamily)", fontWeight: "var(--salt-text-fontWeight-strong)", fontSize: "var(--salt-text-fontSize)", color: "var(--salt-content-primary-foreground)" }}>{title}</span>
      {description && <span style={{ fontSize: "var(--salt-text-label-fontSize)", lineHeight: "var(--salt-text-label-lineHeight)", color: "var(--salt-content-secondary-foreground)" }}>{description}</span>}
    </div>
  );
}
