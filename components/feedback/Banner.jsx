import React from "react";

const ICONS = {
  info: "M6 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2m1 3v5H5V5z",
  success: "m3.871 8.033 6.187-6.187 1.06 1.06-7.247 7.248-2.99-2.99 1.06-1.061z",
  warning: "M5 8V5h2v3zm2 1.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0",
  error: "M5 2h2v5H5zm2 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0",
};

export function Banner({ status = "info", variant = "primary", children, className = "", ...rest }) {
  const cls = ["saltBanner", `saltBanner-${status}`, `saltBanner-${variant}`, className].filter(Boolean).join(" ");
  return (
    <div className={cls} role="status" {...rest}>
      <svg className="saltBanner-icon" viewBox="0 0 12 12" width="16" height="16" fill="currentColor" style={{ flexShrink: 0 }}>
        <path d={ICONS[status] || ICONS.info} />
      </svg>
      <span>{children}</span>
    </div>
  );
}
