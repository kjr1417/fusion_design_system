import React, { useEffect } from "react";

const CloseIcon = () => (<svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="m5.999 5.292 3.89-3.888.707.707L6.707 6l3.889 3.889-.707.708-3.89-3.89-3.889 3.89-.707-.708L5.292 6 1.403 2.111l.707-.708z"/></svg>);

/**
 * Fusion Drawer — bottom sheet that slides up from the base of the screen,
 * for a secondary task or a "browse everything" surface launched from a
 * denser control (e.g. a combo box's "Browse All" action). Requires
 * FusionDesignSystem_6db751 (InlineButtons) when actions are passed.
 */
export function Drawer({ open, onClose, title, children, height = "70vh", primaryAction, secondaryActions, tertiaryActions }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const hasActions = primaryAction || (secondaryActions && secondaryActions.length) || (tertiaryActions && tertiaryActions.length);
  const InlineButtons = hasActions ? window.FusionDesignSystem_6db751.InlineButtons : null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 120, pointerEvents: open ? "auto" : "none" }}>
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "var(--salt-overlayable-backdrop)", opacity: open ? 1 : 0, transition: "opacity var(--salt-duration-perceptible) ease-in-out" }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height, maxHeight: "90vh",
          background: "var(--salt-container-primary-background)", boxShadow: "var(--salt-shadow-medium)",
          borderTopLeftRadius: "var(--salt-palette-corner)", borderTopRightRadius: "var(--salt-palette-corner)",
          display: "flex", flexDirection: "column",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform var(--salt-duration-perceptible) ease-in-out",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "var(--salt-spacing-100) 0 0" }}>
          <span aria-hidden="true" style={{ width: 36, height: 4, borderRadius: "var(--salt-palette-corner-pill, 999px)", background: "var(--salt-color-gray-200)" }} />
        </div>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "var(--salt-spacing-150) var(--salt-spacing-300)",
          borderBottom: "1px solid var(--salt-separable-tertiary-borderColor)", flexShrink: 0,
        }}>
          <h3 className="saltText saltText-h3" style={{ margin: 0 }}>{title}</h3>
          <button
            type="button" aria-label="Close" onClick={onClose}
            className="saltButton saltButton-neutral saltButton-transparent"
            style={{ minWidth: "var(--salt-size-base)", width: "var(--salt-size-base)", padding: 0 }}
          >
            <CloseIcon />
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "var(--salt-spacing-300)" }}>{children}</div>
        {hasActions && (
          <div style={{ flexShrink: 0, padding: "var(--salt-spacing-200) var(--salt-spacing-300)", borderTop: "1px solid var(--salt-separable-tertiary-borderColor)" }}>
            <InlineButtons primaryAction={primaryAction} secondaryActions={secondaryActions} tertiaryActions={tertiaryActions} />
          </div>
        )}
      </div>
    </div>
  );
}
