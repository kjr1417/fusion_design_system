import React from "react";

const ICONS = {
  info: "M6 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2m1 3v5H5V5z",
  success: "m3.871 8.033 6.187-6.187 1.06 1.06-7.247 7.248-2.99-2.99 1.06-1.061z",
  warning: "m6 0 6 12H0zM5 5h2v3H5zm2 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0",
  error: "M9 0H3L0 3v6l3 3h6l3-3V3zM7 2H5v5h2zm-1 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2",
};

const COLOR = {
  info: "var(--salt-status-info-foreground-decorative)",
  warning: "var(--salt-status-warning-foreground-decorative)",
  success: "var(--salt-status-success-foreground-decorative, var(--salt-palette-positive))",
  error: "var(--salt-status-error-foreground-decorative)",
};

export function Banner({ status = "info", variant = "primary", children, className = "", ...rest }) {
  const cls = ["saltBanner", `saltBanner-${status}`, `saltBanner-${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={cls} role="status" {...rest}>
      <svg className="saltBanner-icon" viewBox="0 0 12 12" width="16" height="16" fill="currentColor" style={{ flexShrink: 0, color: COLOR[status] || COLOR.info }}>
        <path fillRule="evenodd" clipRule="evenodd" d={ICONS[status] || ICONS.info} />
      </svg>
      <span>{children}</span>
    </div>
  );
}
