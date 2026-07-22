import React from "react";

export function SaltProviderNext({ mode = "light", density = "low", children, style, ...rest }) {
  return (
    <div className="salt-theme salt-density-low" data-mode={mode === "dark" ? "dark" : undefined} style={{ background: "var(--salt-palette-background-primary)", color: "var(--salt-content-primary-foreground)", ...style }} {...rest}>
      {children}
    </div>
  );
}
