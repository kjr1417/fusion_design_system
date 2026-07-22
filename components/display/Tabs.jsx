import React, { useState } from "react";

export function Tabs({ items = [], defaultActive = 0, onChange, style, ...rest }) {
  const [active, setActive] = useState(defaultActive);
  return (
    <div
      className="saltTabs"
      role="tablist"
      style={{ display: "flex", gap: "var(--salt-spacing-150)", borderBottom: "1px solid var(--salt-color-gray-200)", ...style }}
      {...rest}
    >
      {items.map((label, i) => (
        <button
          key={label}
          role="tab"
          aria-selected={active === i}
          onClick={() => { setActive(i); onChange && onChange(i); }}
          style={{
            all: "unset",
            cursor: "pointer",
            padding: "var(--salt-spacing-75) 0",
            fontFamily: "var(--salt-text-fontFamily)",
            fontWeight: active === i ? "var(--salt-text-fontWeight-strong)" : "var(--salt-text-fontWeight)",
            fontSize: "var(--salt-text-fontSize)",
            color: active === i ? "var(--salt-content-primary-foreground)" : "var(--salt-content-secondary-foreground)",
            borderBottom: active === i ? "2px solid var(--salt-palette-accent)" : "2px solid transparent",
            marginBottom: -1,
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
