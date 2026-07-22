import React from "react";

export function Badge({ value, dot = false, topRight = false, className = "", style, ...rest }) {
  const cls = ["saltBadge-badge", dot ? "saltBadge-dotBadge" : "", topRight ? "saltBadge-topRight" : "", className].filter(Boolean).join(" ");
  if (dot) return <span className={["saltBadge", cls].join(" ")} style={style} {...rest} />;
  return (
    <span className="saltBadge" style={style} {...rest}>
      <span className={cls}>{value}</span>
    </span>
  );
}
