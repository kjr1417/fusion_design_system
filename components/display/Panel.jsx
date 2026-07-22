import React from "react";

export function Panel({ variant = "primary", className = "", style, children, ...rest }) {
  return (
    <div className={["saltPanel", `saltPanel-${variant}`, className].filter(Boolean).join(" ")} style={style} {...rest}>
      {children}
    </div>
  );
}
