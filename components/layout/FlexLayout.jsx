import React from "react";

export function FlexLayout({ direction = "row", gap = 2, align, justify, wrap = false, style, children, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: direction, gap: `var(--salt-spacing-${gap * 50})`, alignItems: align, justifyContent: justify, flexWrap: wrap ? "wrap" : "nowrap", ...style }} {...rest}>
      {children}
    </div>
  );
}
