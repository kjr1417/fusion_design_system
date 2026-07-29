import React, { useState } from "react";
import { H4 } from "./Text";

const ChevronDown = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flex: "none" }}>
    <path d="M5.618 8.593 6 9l.382-.407L11 3.661 10.236 3 6 7.524 1.764 3 1 3.66z" />
  </svg>
);
const ErrorGlyph = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="var(--salt-palette-negative)" aria-hidden="true" style={{ flex: "none" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M9 0H3L0 3v6l3 3h6l3-3V3zM7 2H5v5h2zm-1 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
  </svg>
);
const ChevronUp = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flex: "none" }}>
    <path d="M5.618 3.407 6 3l.382.407L11 8.339 10.236 9 6 4.476 1.764 9 1 8.34z" />
  </svg>
);

export function Accordion({ items = [], defaultOpen = 0, variant = "boxed", allowMultiple = false, chevronPosition = "start" }) {
  const [open, setOpen] = useState(() => {
    if (allowMultiple) return Array.isArray(defaultOpen) ? defaultOpen : (defaultOpen === -1 ? [] : [defaultOpen]);
    return defaultOpen;
  });
  const isOpen = (i) => (allowMultiple ? open.includes(i) : open === i);
  const toggle = (i) => {
    if (allowMultiple) setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
    else setOpen(open === i ? -1 : i);
  };
  const boxed = variant === "boxed";
  const chevronEnd = chevronPosition === "end";
  const contentIndent = chevronEnd ? "var(--salt-spacing-200)" : "calc(var(--salt-spacing-200) + 12px)";
  return (
    <div style={boxed ? { border: "1px solid var(--salt-color-gray-200)", borderRadius: "var(--salt-palette-corner)", overflow: "hidden" } : undefined}>
      {items.map((it, i) => {
        const collapsible = it.content != null && it.collapsible !== false;
        const errored = it.hasError && !isOpen(i);
        return (
        <div key={i} style={{
          borderTop: errored ? "1px solid var(--salt-palette-negative)" : (boxed && i === 0 ? "none" : "1px solid var(--salt-color-gray-200)"),
          borderBottom: !boxed && i === items.length - 1 ? "1px solid var(--salt-color-gray-200)" : "none",
          background: errored ? "var(--salt-palette-negative-weakest)" : undefined,
        }}>
          <button
            onClick={() => { if (collapsible) toggle(i); it.onHeaderClick && it.onHeaderClick(); }}
            aria-expanded={collapsible ? isOpen(i) : undefined}
            aria-invalid={it.hasError || undefined}
            style={{
              all: "unset", cursor: collapsible ? "pointer" : "default", width: "100%", boxSizing: "border-box",
              minHeight: 36,
              display: "flex", gap: "var(--salt-spacing-100)", alignItems: "center",
              justifyContent: chevronEnd ? "space-between" : "flex-start",
              padding: "var(--salt-spacing-50) var(--salt-spacing-100)",
              color: "var(--salt-content-primary-foreground)",
              ...it.headerStyle,
            }}
          >
            {!chevronEnd && collapsible && (isOpen(i) ? <ChevronUp /> : <ChevronDown />)}
            <H4 style={{ flex: chevronEnd ? "1 1 auto" : undefined, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.title}</H4>
            {chevronEnd && collapsible && <span style={{ flexShrink: 0, display: "flex" }}>{isOpen(i) ? <ChevronUp /> : <ChevronDown />}</span>}
            {errored && <span title="One or more inputs in this section has an error" style={{ marginLeft: "auto", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}><ErrorGlyph /></span>}
          </button>
          {it.subtitle != null && (
            <div style={{ ...it.subtitleStyle }}>{it.subtitle}</div>
          )}
          {collapsible && isOpen(i) && (
            <div style={{
              paddingTop: "var(--salt-spacing-100)",
              paddingBottom: "var(--salt-spacing-150)",
              paddingLeft: contentIndent,
              paddingRight: "var(--salt-spacing-100)",
              color: "var(--salt-content-secondary-foreground)", fontSize: "var(--salt-text-fontSize)",
              ...it.contentStyle,
            }}>
              {it.content}
            </div>
          )}
        </div>
        );
      })}
    </div>
  );
}
