import React from "react";

export function List({ items = [], renderItem, dividers = true }) {
  return (
    <div>
      {items.map((it, i) => (
        <div key={i}>
          <div style={{ padding: "var(--salt-spacing-75) 0" }}>
            {renderItem ? renderItem(it, i) : <div style={{ fontSize: "var(--salt-text-fontSize)" }}>{it}</div>}
          </div>
          {dividers && i < items.length - 1 && <div style={{ height: 1, background: "var(--salt-color-gray-200)" }} />}
        </div>
      ))}
    </div>
  );
}
