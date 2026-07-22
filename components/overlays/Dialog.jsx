import React from "react";

export function Dialog({ open, title, onClose, children, actions }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "var(--salt-overlayable-backdrop)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--salt-container-primary-background)", borderRadius: "var(--salt-palette-corner)",
          boxShadow: "var(--salt-shadow-medium)", width: 420, maxWidth: "90vw", padding: "var(--salt-spacing-150)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 className="saltText saltText-h3" style={{ margin: 0 }}>{title}</h3>
          <button className="saltButton saltButton-neutral saltButton-transparent" aria-label="Close" onClick={onClose} style={{ minWidth: "var(--salt-size-base)", width: "var(--salt-size-base)", padding: 0 }}>
            <svg className="saltIcon" viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="m5.999 5.292 3.89-3.888.707.707L6.707 6l3.889 3.889-.707.708-3.89-3.89-3.889 3.89-.707-.708L5.292 6 1.403 2.111l.707-.708z"/></svg>
          </button>
        </div>
        <div style={{ marginBottom: 20 }}>{children}</div>
        {actions && <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>{actions}</div>}
      </div>
    </div>
  );
}
