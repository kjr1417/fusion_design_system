import React, { useState } from "react";

const CopyIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="11" height="11" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M4 0h4.707L11 2.293V9H8v3H1V3h3zm1 1v7h5V4H7V1zm3 0v2h2v-.293L8.293 1zM2 4h2v5h3v2H2z" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="11" height="11" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.952 9.294 10 3.73 8.9 2.706 4.875 7.163 3.027 5.446 2 6.546z" />
  </svg>
);

export function CopyValue({ value = "", onCopy, style }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    onCopy && onCopy(value);
  };

  return (
    <div
      className="cv-root"
      style={{
        display: "flex", alignItems: "center", gap: 4,
        fontFamily: "var(--salt-typography-fontFamily-mono)", fontSize: 12,
        color: "var(--salt-content-secondary-foreground)", lineHeight: "16px",
        whiteSpace: "nowrap", minWidth: 0, overflow: "hidden", ...style,
      }}
    >
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", minWidth: 40 }}>{value}</span>
      <button
        onClick={handleCopy}
        aria-label="Copy value"
        title={copied ? "Copied" : "Copy value"}
        className="cv-btn"
        style={{ boxSizing: "border-box", border: "none", font: "inherit", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "var(--salt-curve-50)", color: "var(--salt-content-secondary-foreground)" }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}
