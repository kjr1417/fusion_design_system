import React from "react";
import { Button } from "./Button.jsx";

export function IconButton({ children, "aria-label": ariaLabel, style, ...rest }) {
  return (
    <Button
      aria-label={ariaLabel}
      style={{ width: "var(--salt-size-base)", padding: 0, ...style }}
      {...rest}
    >
      <span style={{ width: 16, height: 16, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{children}</span>
    </Button>
  );
}
