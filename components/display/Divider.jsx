import React from "react";

export function Divider({ orientation = "horizontal", style, ...rest }) {
  const isH = orientation === "horizontal";
  return (
    <hr
      style={{
        border: "none",
        background: "var(--salt-color-gray-200)",
        width: isH ? "100%" : "1px",
        height: isH ? "1px" : "100%",
        margin: 0,
        ...style,
      }}
      {...rest}
    />
  );
}
