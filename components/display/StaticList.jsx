import React from "react";

const labelBase = {
  fontFamily: "var(--salt-text-fontFamily)",
  fontWeight: "var(--salt-text-fontWeight-strong)",
  fontSize: "var(--salt-text-fontSize)",
  lineHeight: "var(--salt-text-lineHeight)",
  color: "var(--salt-content-secondary-foreground)",
  margin: 0,
};
const valueBase = {
  fontFamily: "var(--salt-text-fontFamily)",
  fontWeight: "var(--salt-text-fontWeight)",
  fontSize: "var(--salt-text-fontSize)",
  lineHeight: "var(--salt-text-lineHeight)",
  color: "var(--salt-content-primary-foreground)",
  margin: 0,
};
const clamp2 = { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" };
const singleLine = { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };

export function StaticList({ label, value, labelPosition = "left", labelWidth = "fluid", fixedWidth = 140, gridAlign = false, style }) {
  const isTop = labelPosition === "top";
  const gap = labelWidth === "hug" ? "var(--salt-spacing-100)" : "var(--salt-spacing-300)";

  if (gridAlign && !isTop) {
    // Rendered as a grid row by StaticListGroup so fluid labels share one aligned column width.
    return (
      <React.Fragment>
        <span title={typeof label === "string" ? label : undefined} style={{ ...labelBase, minWidth: 0, ...clamp2 }}>{label}</span>
        <span title={typeof value === "string" ? value : undefined} style={{ ...valueBase, minWidth: 0, ...clamp2 }}>{value}</span>
      </React.Fragment>
    );
  }

  if (isTop) {
    const topGap = "var(--salt-spacing-25)";
    const labelStyle = {
      ...labelBase,
      width: labelWidth === "fixed" ? fixedWidth : labelWidth === "hug" ? "fit-content" : "auto",
      display: labelWidth === "hug" ? "inline-block" : "block",
    };
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: topGap, minWidth: 0, ...style }}>
        <span style={labelStyle}>{label}</span>
        <span style={valueBase}>{value}</span>
      </div>
    );
  }

  const truncate = labelWidth === "hug" ? singleLine : clamp2;
  const labelStyle =
    labelWidth === "hug"
      ? { ...labelBase, flex: "0 0 auto", ...singleLine }
      : labelWidth === "fixed"
      ? { ...labelBase, flex: `0 0 ${fixedWidth}px`, ...clamp2 }
      : { ...labelBase, flex: "0 1 auto", ...clamp2 };

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap, minWidth: 0, ...style }}>
      <span title={typeof label === "string" ? label : undefined} style={labelStyle}>{label}</span>
      <span title={typeof value === "string" ? value : undefined} style={{ ...valueBase, flex: "1 1 auto", minWidth: 0, ...truncate }}>{value}</span>
    </div>
  );
}
