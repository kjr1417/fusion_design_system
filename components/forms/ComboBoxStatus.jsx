import React, { useEffect, useState } from "react";
import { StatusMessage } from "../feedback/StatusMessage.jsx";
import { Link } from "../actions/Link.jsx";

/** Italic gray "Loading" with an ellipsis that fills one dot at a time, then clears and repeats. */
export function LoadingDots({ label = "Loading" }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v + 1) % 4), 400);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ padding: "var(--salt-spacing-100)", display: "flex" }}>
      <span style={{
        fontFamily: "var(--salt-text-fontFamily)", fontStyle: "italic", fontSize: "var(--salt-text-fontSize)",
        color: "var(--salt-content-secondary-foreground)",
      }}>
        {label}
        <span style={{ display: "inline-block", width: "1.5em", textAlign: "left" }}>{".".repeat(n)}</span>
      </span>
    </div>
  );
}

/** "No results found" — info status, shown when a search/filter yields zero items. */
export function EmptyStatus({ label = "No results found." }) {
  return (
    <div style={{ padding: "var(--salt-spacing-50) var(--salt-spacing-100)" }}>
      <StatusMessage status="info" showLink={false}>{label}</StatusMessage>
    </div>
  );
}

const ERROR_GLYPH = "M9 0H3L0 3v6l3 3h6l3-3V3zM7 2H5v5h2zm-1 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2";

/** "Results could not load. Reload." — error status and its Reload link on a single line. */
export function ErrorStatus({ label = "Results could not load.", onReload }) {
  return (
    <div style={{ padding: "var(--salt-spacing-50) var(--salt-spacing-100)", display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", whiteSpace: "nowrap" }}>
      <svg viewBox="0 0 12 12" aria-hidden="true" style={{ width: "var(--salt-size-icon)", height: "var(--salt-size-icon)", flexShrink: 0, fill: "var(--salt-palette-negative)" }}>
        <path fillRule="evenodd" clipRule="evenodd" d={ERROR_GLYPH} />
      </svg>
      <span style={{ fontFamily: "var(--salt-text-fontFamily)", fontWeight: "var(--salt-text-fontWeight)", fontSize: "var(--salt-text-fontSize)", color: "var(--salt-content-primary-foreground)" }}>
        {label} <Link href="#" onClick={(e) => { e.preventDefault(); onReload && onReload(); }} style={{ display: "inline" }}>Reload.</Link>
      </span>
    </div>
  );
}
