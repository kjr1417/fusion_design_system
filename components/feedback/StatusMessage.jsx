import React, { useLayoutEffect, useRef, useState } from "react";
import { Tooltip } from "../overlays/Tooltip";

const COLOR = {
  info: "var(--salt-palette-info)",
  success: "var(--salt-palette-positive)",
  warning: "var(--salt-palette-warning)",
  error: "var(--salt-palette-negative)",
};
// solid status glyphs, verbatim salt-ds path data (icons/*-solid.svg)
const GLYPH = {
  info: "M0 0h12v12H0zm6 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2m1 3v5H5V5z",
  success: "M12 0H0v12h12zM9.858 1.846 3.672 8.033l-1.93-1.93-1.06 1.06 2.99 2.991 7.247-7.247z",
  warning: "m6 0 6 12H0zM5 5h2v3H5zm2 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0",
  error: "M9 0H3L0 3v6l3 3h6l3-3V3zM7 2H5v5h2zm-1 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
};
// "tearaway" glyph (icons/tear-out.svg) — signals the link opens in a new tab
const TEAROUT_PATHS = ["M0 12L12 12L12 6H11L11 11L1 11L1 1L6 1V5.24536e-07L1.04907e-06 0L0 12Z", "M11.9962 4V9.53989e-08H7.99619V1H10.2891L5.99608 5.29289L6.70319 6L10.9962 1.70711V4H11.9962Z"];

export function StatusMessage({
  status = "info",
  title,
  children,
  showLink = true,
  linkText = "Learn more",
  href = "#",
  onLinkClick,
  className = "",
  ...rest
}) {
  const textRef = useRef(null);
  const [truncated, setTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const check = () => setTruncated(el.scrollWidth > el.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  const bodyStyle = {
    display: "block",
    width: "100%",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: "var(--salt-text-fontFamily)",
    fontWeight: "var(--salt-text-fontWeight)",
    fontSize: "var(--salt-text-fontSize)",
    lineHeight: "var(--salt-text-lineHeight)",
    color: "var(--salt-content-primary-foreground)",
  };
  const bodyText = (
    <span ref={textRef} style={bodyStyle}>
      {children}
    </span>
  );

  return (
    <div
      className={["fusionStatusMessage", className].filter(Boolean).join(" ")}
      role="status"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--salt-spacing-75)",
        paddingTop: "var(--salt-spacing-75)",
        paddingBottom: "var(--salt-spacing-75)",
      }}
      {...rest}
    >
      <svg
        viewBox="0 0 12 12"
        aria-hidden="true"
        style={{ width: "var(--salt-size-icon)", height: "var(--salt-size-icon)", flexShrink: 0, marginTop: 2, fill: COLOR[status] || COLOR.info }}
      >
        <path fillRule="evenodd" clipRule="evenodd" d={GLYPH[status] || GLYPH.info} />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-50)", minWidth: 0, flex: 1 }}>
        {title ? (
          <span
            style={{
              fontFamily: "var(--salt-text-fontFamily)",
              fontWeight: "var(--salt-text-fontWeight-strong)",
              fontSize: "var(--salt-text-fontSize)",
              lineHeight: "var(--salt-text-lineHeight)",
              color: "var(--salt-content-primary-foreground)",
            }}
          >
            {title}
          </span>
        ) : null}
        <div style={{ display: "flex", alignItems: "baseline", gap: "var(--salt-spacing-75)", minWidth: 0 }}>
          {truncated ? (
            <Tooltip content={children} style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
              {bodyText}
            </Tooltip>
          ) : (
            <span style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>{bodyText}</span>
          )}
          {showLink ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onLinkClick}
              className="saltLink saltText saltLink-primary saltLink-underlineDefault"
              style={{ display: "inline-flex", alignItems: "center", gap: 4, flexShrink: 0, whiteSpace: "nowrap" }}
            >
              {linkText}
              <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" style={{ width: "var(--salt-size-icon)", height: "var(--salt-size-icon)", flexShrink: 0 }}>
                {TEAROUT_PATHS.map((d, i) => <path key={i} d={d} />)}
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
