import React from "react";

export function NavigationItem({ label, href = "#", active = false, icon, orientation = "horizontal", onClick, style, children, ...rest }) {
  const isActive = active;
  return (
    <a
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: "var(--salt-spacing-100)",
        padding: orientation === "vertical" ? "var(--salt-spacing-100) var(--salt-spacing-150)" : "var(--salt-spacing-100) var(--salt-spacing-50)",
        fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)",
        fontWeight: isActive ? "var(--salt-text-fontWeight-strong)" : "var(--salt-text-fontWeight)",
        color: isActive ? "var(--salt-content-primary-foreground)" : "var(--salt-content-secondary-foreground)",
        textDecoration: "none", cursor: "pointer", position: "relative",
        borderBottom: orientation === "horizontal" ? `2px solid ${isActive ? "var(--salt-palette-accent)" : "transparent"}` : "none",
        borderLeft: orientation === "vertical" ? `2px solid ${isActive ? "var(--salt-palette-accent)" : "transparent"}` : "none",
        ...style,
      }}
      {...rest}
    >
      {icon}
      {label || children}
    </a>
  );
}
