import React from "react";

export function LinkCard({ eyebrow, title, body, href = "#", style, ...rest }) {
  return (
    <a href={href} className="saltCard saltCard-primary saltCard-hoverable" style={{ display: "block", textDecoration: "none", color: "inherit", ...style }} {...rest}>
      {eyebrow && <div style={{ fontSize: "var(--salt-text-notation-fontSize)", fontWeight: "var(--salt-text-fontWeight-strong)", color: "var(--salt-palette-accent)", letterSpacing: "var(--salt-text-action-letterSpacing)", marginBottom: "var(--salt-spacing-50)" }}>{eyebrow}</div>}
      <div style={{ fontWeight: "var(--salt-text-fontWeight-strong)", marginBottom: "var(--salt-spacing-25)" }}>{title}</div>
      {body && <p style={{ margin: 0, color: "var(--salt-content-secondary-foreground)", fontSize: "var(--salt-text-fontSize)" }}>{body}</p>}
    </a>
  );
}
