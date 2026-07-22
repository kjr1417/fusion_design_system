import React from "react";

export function Card({ variant = "primary", accent, hoverable = false, children, className = "", style, ...rest }) {
  const cls = [
    "saltCard",
    `saltCard-${variant}`,
    accent ? "saltCard-accent" : "",
    accent ? `saltCard-accent${accent.charAt(0).toUpperCase()}${accent.slice(1)}` : "",
    hoverable ? "saltCard-hoverable" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className={cls} style={style} {...rest}>
      {children}
    </div>
  );
}
