import React from "react";

export function StackLayout({ gap = 3, align, style, children, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: `var(--salt-spacing-${gap * 50})`, alignItems: align, ...style }} {...rest}>
      {children}
    </div>
  );
}
