import React from "react";
import { StaticList } from "./StaticList.jsx";

function chunk(items, n) {
  const size = Math.ceil(items.length / n);
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  while (out.length < n) out.push([]);
  return out;
}

export function StaticListGroup({
  items = [],
  orientation = "vertical",
  columns = 1,
  dividers = true,
  labelPosition = "left",
  labelWidth = "fluid",
  fixedWidth = 140,
  rowGap,
  style,
}) {
  const listProps = { labelPosition, labelWidth, fixedWidth };
  const defaultRowGap = labelPosition === "top" ? "var(--salt-spacing-250)" : "var(--salt-spacing-fixed-100)";
  const gap = rowGap || defaultRowGap;
  const alignLabels = labelPosition === "left" && labelWidth === "fluid";
  const columnGap = labelWidth === "hug" ? "var(--salt-spacing-100)" : "var(--salt-spacing-300)";

  function renderColumn(colItems, keyPrefix) {
    if (alignLabels) {
      return (
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap, rowGap: gap, alignItems: "start" }}>
          {colItems.map((it, i) => (
            <StaticList key={keyPrefix + i} label={it.label} value={it.value} {...listProps} gridAlign />
          ))}
        </div>
      );
    }
    return (
      <div style={{ display: "flex", flexDirection: "column", gap }}>
        {colItems.map((it, i) => (
          <StaticList key={keyPrefix + i} label={it.label} value={it.value} {...listProps} />
        ))}
      </div>
    );
  }

  if (columns > 1) {
    const cols = chunk(items, columns);
    return (
      <div style={{ display: "flex", minWidth: 0, ...style }}>
        {cols.map((colItems, ci) => (
          <React.Fragment key={ci}>
            {ci > 0 && dividers && (
              <div style={{ alignSelf: "stretch", flex: "0 0 auto", width: 1, background: "var(--salt-color-gray-200)", margin: "0 var(--salt-spacing-600)" }} />
            )}
            {ci > 0 && !dividers && <div style={{ flex: "0 0 auto", width: "var(--salt-spacing-600)" }} />}
            <div style={{ flex: "1 1 0", minWidth: 0 }}>{renderColumn(colItems, `c${ci}-`)}</div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (orientation === "horizontal") {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", minWidth: 0, ...style }}>
        {items.map((it, i) => (
          <React.Fragment key={i}>
            <StaticList label={it.label} value={it.value} {...listProps} />
            {i < items.length - 1 && (
              <span aria-hidden="true" style={{ margin: "0 var(--salt-spacing-150)", color: "var(--salt-content-secondary-foreground)" }}>
                &bull;
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return <div style={{ minWidth: 0, ...style }}>{renderColumn(items, "i-")}</div>;
}
