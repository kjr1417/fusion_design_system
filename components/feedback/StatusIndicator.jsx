import React from "react";

const COLORS = {
  info: "var(--salt-palette-info)",
  success: "var(--salt-palette-positive)",
  warning: "var(--salt-palette-warning)",
  error: "var(--salt-palette-negative)",
};

export function StatusIndicator({ status = "info", label }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--salt-text-fontSize)" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[status] || COLORS.info, flexShrink: 0 }} />
      {label}
    </span>
  );
}
