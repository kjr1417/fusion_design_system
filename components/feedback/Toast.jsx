import React from "react";

const ICONS = {
  success: <path fillRule="evenodd" clipRule="evenodd" d="M0 0h12v12H0zm9.858 1.846L3.672 8.033l-1.93-1.93-1.06 1.06 2.99 2.991 7.247-7.247z" />,
  error: <path fillRule="evenodd" clipRule="evenodd" d="M9 0H3L0 3v6l3 3h6l3-3V3zM7 2H5v5h2zm-1 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />,
  warning: <path fillRule="evenodd" clipRule="evenodd" d="m6 0 6 12H0zM5 5h2v3H5zm2 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />,
  info: <path fillRule="evenodd" clipRule="evenodd" d="M0 0h12v12H0zm6 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2m1 3v5H5V5z" />,
};
const COLOR = {
  success: "var(--salt-status-success-borderColor)",
  error: "var(--salt-status-error-borderColor)",
  warning: "var(--salt-status-warning-borderColor)",
  info: "var(--salt-status-info-borderColor)",
};

export function Toast({ status = "info", children, onClose, style, ...rest }) {
  return (
    <div role="alert" style={{
      display: "flex", alignItems: "flex-start", gap: "var(--salt-spacing-100)",
      background: "var(--salt-container-primary-background)",
      border: "1px solid var(--salt-container-primary-borderColor)",
      borderLeft: `3px solid ${COLOR[status]}`,
      borderRadius: "var(--salt-palette-corner)",
      boxShadow: "var(--salt-overlayable-shadow-popout)",
      padding: "var(--salt-spacing-100) var(--salt-spacing-150)",
      fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)",
      color: "var(--salt-content-primary-foreground)", minWidth: 280, boxSizing: "border-box",
      ...style,
    }} {...rest}>
      <svg viewBox="0 0 12 12" width="16" height="16" fill={COLOR[status]} style={{ flexShrink: 0, marginTop: 2 }}>{ICONS[status]}</svg>
      <div style={{ flex: 1 }}>{children}</div>
      {onClose && (
        <button onClick={onClose} aria-label="Close" style={{ border: "none", background: "none", cursor: "pointer", color: "var(--salt-content-secondary-foreground)", padding: 0, lineHeight: 1 }}>
          <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor"><path d="m5.999 5.292 3.89-3.888.707.707L6.707 6l3.889 3.889-.707.708-3.89-3.89-3.889 3.89-.707-.708L5.292 6 1.403 2.111l.707-.708z" /></svg>
        </button>
      )}
    </div>
  );
}
