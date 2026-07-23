import React, { useState } from "react";

const STATUS = {
  info: { bg: "var(--salt-status-info-background, var(--salt-palette-info-weakest))", border: "var(--salt-status-info-borderColor)", icon: "var(--salt-status-info-foreground-decorative)" },
  error: { bg: "var(--salt-status-error-background, var(--salt-palette-negative-weakest))", border: "var(--salt-status-error-borderColor)", icon: "var(--salt-status-error-foreground-decorative)" },
  warning: { bg: "var(--salt-status-warning-background, var(--salt-palette-warning-weakest))", border: "var(--salt-status-warning-borderColor)", icon: "var(--salt-status-warning-foreground-decorative)" },
  success: { bg: "var(--salt-status-success-background, var(--salt-palette-positive-weakest))", border: "var(--salt-status-success-borderColor)", icon: "var(--salt-status-success-foreground-decorative)" },
};

// solid status glyphs (verbatim salt-ds path data)
const GLYPH = {
  info: "M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0m.75 9.5h-1.5V5h1.5zM6 4a.9.9 0 1 1 0-1.8A.9.9 0 0 1 6 4",
  error: "M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0m.75 9.5h-1.5V8h1.5zm0-3h-1.5v-4h1.5z",
  warning: "M6.9.6a1 1 0 0 0-1.8 0L.1 10.6a1 1 0 0 0 .9 1.4h10a1 1 0 0 0 .9-1.4zM6.75 10h-1.5V8.5h1.5zm0-3h-1.5V4h1.5z",
  success: "M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0m2.7 4.3-3.2 3.9-2-2 .8-.9 1.1 1.1 2.4-2.9z",
};

export function Tooltip({ content, placement = "top", status = "info", style, className, children }) {
  const [open, setOpen] = useState(false);
  const s = STATUS[status] || STATUS.info;
  const top = placement === "bottom";
  return (
    <span className={className} style={{ position: "relative", display: "inline-flex", ...style }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && (
        <span role="tooltip" style={{
          position: "absolute", zIndex: 10, whiteSpace: "nowrap",
          bottom: placement === "top" ? "calc(100% + 8px)" : "auto",
          top: placement === "bottom" ? "calc(100% + 8px)" : "auto",
          left: "50%", transform: "translateX(-50%)",
          display: "inline-flex", alignItems: "center", gap: "var(--salt-spacing-100)",
          background: s.bg, color: "var(--salt-content-primary-foreground)",
          border: "1px solid " + s.border, borderRadius: "var(--salt-palette-corner-weak)",
          boxShadow: "var(--salt-overlayable-shadow-popout)",
          padding: "calc(var(--salt-spacing-100) - 1px) var(--salt-spacing-100)",
          fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)",
          fontFamily: "var(--salt-text-fontFamily)",
        }}>
          <svg className="saltIcon" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" style={{ fill: s.icon, flex: "none" }}><path d={GLYPH[status] || GLYPH.info} /></svg>
          {content}
          <span style={{
            position: "absolute", left: "50%", width: 8, height: 8, background: s.bg, rotate: "45deg",
            marginLeft: -4,
            top: top ? -5 : "auto", bottom: top ? "auto" : -5,
            borderTop: top ? "1px solid " + s.border : "none",
            borderLeft: top ? "1px solid " + s.border : "none",
            borderBottom: top ? "none" : "1px solid " + s.border,
            borderRight: top ? "none" : "1px solid " + s.border,
          }} />
        </span>
      )}
    </span>
  );
}
