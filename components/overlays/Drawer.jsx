import React from "react";

export function Drawer({ open, title, side = "right", onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 90, pointerEvents: open ? "auto" : "none" }}>
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "var(--salt-overlayable-backdrop)", opacity: open ? 1 : 0, transition: "opacity var(--salt-duration-perceptible) ease-in-out" }}
      />
      <div style={{
        position: "absolute", top: 0, bottom: 0, [side]: 0, width: 360, maxWidth: "90vw",
        background: "var(--salt-container-primary-background)", boxShadow: "var(--salt-shadow-medium)",
        padding: "var(--salt-spacing-150)", display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : `translateX(${side === "right" ? "100%" : "-100%"})`,
        transition: "transform var(--salt-duration-perceptible) ease-in-out",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 className="saltText saltText-h3" style={{ margin: 0 }}>{title}</h3>
          <button className="saltButton saltButton-neutral saltButton-transparent" aria-label="Close" onClick={onClose} style={{ minWidth: "var(--salt-size-base)", width: "var(--salt-size-base)", padding: 0 }}>
            <svg className="saltIcon" viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="m5.999 5.292 3.89-3.888.707.707L6.707 6l3.889 3.889-.707.708-3.89-3.89-3.889 3.89-.707-.708L5.292 6 1.403 2.111l.707-.708z"/></svg>
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
      </div>
    </div>
  );
}
