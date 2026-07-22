import React from "react";

export function FlowLayout({ gap = 2, align, justify, style, children, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: `var(--salt-spacing-${gap * 50})`, alignItems: align, justifyContent: justify, ...style }} {...rest}>
      {children}
    </div>
  );
}
