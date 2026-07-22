import React, { useState } from "react";

const Chevron = ({ open }) => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"
    style={{ flex: "none", transform: open ? "none" : "rotate(180deg)", transition: "transform var(--salt-duration-instant) ease-in-out" }}>
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
  return (
    <div style={boxed ? { border: "1px solid var(--salt-color-gray-200)", borderRadius: "var(--salt-palette-corner)", overflow: "hidden" } : undefined}>
      {items.map((it, i) => (
        <div key={i} style={{ borderTop: i > 0 ? "1px solid var(--salt-color-gray-200)" : (boxed ? "none" : "1px solid var(--salt-color-gray-200)") }}>
          <button
            onClick={() => toggle(i)}
            style={{
              all: "unset", cursor: "pointer", width: "100%", boxSizing: "border-box",
              display: "flex", gap: "var(--salt-spacing-75)", alignItems: "center",
              padding: boxed ? "var(--salt-spacing-75) var(--salt-spacing-100)" : "var(--salt-spacing-100) 0",
              fontWeight: "var(--salt-text-fontWeight-strong)", fontSize: "var(--salt-text-fontSize)",
              color: "var(--salt-content-primary-foreground)",
            }}
          >
            <Chevron open={isOpen(i)} />
            {it.title}
          </button>
          {isOpen(i) && (
            <div style={{
              padding: boxed
                ? "0 var(--salt-spacing-100) var(--salt-spacing-100) calc(var(--salt-spacing-100) + 20px)"
                : "0 0 var(--salt-spacing-150) calc(12px + var(--salt-spacing-75))",
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
