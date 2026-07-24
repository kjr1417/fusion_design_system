import React, { useState } from "react";
import { H4 } from "./Text";

const ChevronDown = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flex: "none" }}>
    <path d="M5.618 8.593 6 9l.382-.407L11 3.661 10.236 3 6 7.524 1.764 3 1 3.66z" />
  </svg>
);
const ChevronUp = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flex: "none" }}>
    <path d="M5.618 3.407 6 3l.382.407L11 8.339 10.236 9 6 4.476 1.764 9 1 8.34z" />
  </svg>
);

export function Accordion({ items = [], defaultOpen = 0, variant = "boxed", allowMultiple = false }) {
  const [open, setOpen] = useState(() => (allowMultiple ? (defaultOpen === -1 ? [] : [defaultOpen]) : defaultOpen));
  const isOpen = (i) => (allowMultiple ? open.includes(i) : open === i);
  const toggle = (i) => {
    if (allowMultiple) setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
    else setOpen(open === i ? -1 : i);
  };
  const boxed = variant === "boxed";
  const contentIndent = "calc(var(--salt-spacing-200) + 12px)";
  return (
    <div style={boxed ? { border: "1px solid var(--salt-color-gray-200)", borderRadius: "var(--salt-palette-corner)", overflow: "hidden" } : undefined}>
      {items.map((it, i) => (
        <div key={i} style={{ borderTop: boxed && i === 0 ? "none" : "1px solid var(--salt-color-gray-200)" }}>
          <button
            onClick={() => toggle(i)}
            aria-expanded={isOpen(i)}
            style={{
              all: "unset", cursor: "pointer", width: "100%", boxSizing: "border-box",
              height: 37,
              display: "flex", gap: "var(--salt-spacing-100)", alignItems: "center",
              padding: "var(--salt-spacing-50) var(--salt-spacing-100)",
              color: "var(--salt-content-primary-foreground)",
            }}
          >
            {isOpen(i) ? <ChevronUp /> : <ChevronDown />}
            <H4 style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.title}</H4>
          </button>
          {isOpen(i) && (
            <div style={{
              paddingTop: "var(--salt-spacing-100)",
              paddingBottom: "var(--salt-spacing-150)",
              paddingLeft: contentIndent,
              paddingRight: "var(--salt-spacing-100)",
              color: "var(--salt-content-secondary-foreground)", fontSize: "var(--salt-text-fontSize)",
            }}>
              {it.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
