import React from "react";

export function Breadcrumbs({ items = [] }) {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "var(--salt-text-fontSize)" }} aria-label="Breadcrumb">
      {items.map((it, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {i > 0 && <span style={{ color: "var(--salt-content-secondary-foreground)" }}>/</span>}
          {i === items.length - 1 ? (
            <span style={{ color: "var(--salt-content-primary-foreground)", fontWeight: "var(--salt-text-fontWeight-strong)" }}>{it.label}</span>
          ) : (
            <a href={it.href || "#"} className="saltLink saltText" style={{ color: "var(--salt-content-secondary-foreground)" }}>{it.label}</a>
          )}
        </span>
      ))}
    </nav>
  );
}
