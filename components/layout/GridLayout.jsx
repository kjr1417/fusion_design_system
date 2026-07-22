import React from "react";

export function GridLayout({ columns = 12, gap = 3, rowGap, style, children, ...rest }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: typeof columns === "number" ? `repeat(${columns}, 1fr)` : columns, columnGap: `var(--salt-spacing-${gap * 50})`, rowGap: `var(--salt-spacing-${(rowGap ?? gap) * 50})`, ...style }} {...rest}>
      {children}
    </div>
  );
}
