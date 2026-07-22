import React from "react";

export function FormField({ label, helperText, necessity, children, style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-25)", ...style }} {...rest}>
      {label && (
        <label style={{
          fontFamily: "var(--salt-text-label-fontFamily)",
          fontWeight: "var(--salt-text-label-fontWeight)",
          fontSize: "var(--salt-text-label-fontSize)",
          lineHeight: "var(--salt-text-label-lineHeight)",
          color: "var(--salt-content-primary-foreground)",
        }}>
          {label}
          {necessity === "required" && <span style={{ color: "var(--salt-palette-negative)" }}> *</span>}
          {necessity === "optional" && <span style={{ color: "var(--salt-content-secondary-foreground)" }}> (optional)</span>}
        </label>
      )}
      {children}
      {helperText && (
        <span style={{
          fontSize: "var(--salt-text-label-fontSize)",
          lineHeight: "var(--salt-text-label-lineHeight)",
          color: "var(--salt-content-secondary-foreground)",
        }}>
          {helperText}
        </span>
      )}
    </div>
  );
}
