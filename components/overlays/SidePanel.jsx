import React, { useState, useRef, useCallback, useEffect } from "react";

const MIN_WIDTH = 320;
const DEFAULT_WIDTH = 560;
const MAX_WIDTH = 640;

/**
 * Fusion SidePanel — slide-in panel for detail or a secondary task
 * alongside the current view, with a SidePanelHeader (title, description,
 * metadata) built in, and a draggable splitter on its edge for resizing
 * (320–640px, default 560px). Requires FusionDesignSystem_6db751
 * (SidePanelHeader).
 */
export function SidePanel({
  open,
  onClose,
  side = "right",
  title,
  secondaryInfo,
  onBack,
  backLabel,
  actions,
  closeLabel,
  description,
  primaryTag,
  secondaryTag,
  status,
  copyValue,
  onCopy,
  dataLabels,
  primaryAction,
  secondaryActions,
  tertiaryActions,
  children,
}) {
  const { SidePanelHeader, InlineButtons } = window.FusionDesignSystem_6db751;
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const dragRef = useRef(null);

  const onPointerDown = useCallback((e) => {
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startWidth: width };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [width]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current) return;
      const delta = side === "right" ? dragRef.current.startX - e.clientX : e.clientX - dragRef.current.startX;
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, dragRef.current.startWidth + delta));
      setWidth(next);
    };
    const onUp = () => {
      if (!dragRef.current) return;
      dragRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  }, [side]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 90, pointerEvents: open ? "auto" : "none" }}>
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "var(--salt-overlayable-backdrop)", opacity: open ? 1 : 0, transition: "opacity var(--salt-duration-perceptible) ease-in-out" }}
      />
      <div style={{
        position: "absolute", top: 0, bottom: 0, [side]: 0, width, maxWidth: "90vw",
        background: "var(--salt-container-primary-background)", boxShadow: "var(--salt-shadow-medium)",
        display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : `translateX(${side === "right" ? "100%" : "-100%"})`,
        transition: dragRef.current ? "none" : "transform var(--salt-duration-perceptible) ease-in-out",
      }}>
        <div
          onPointerDown={onPointerDown}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panel"
          className="saltSplitter-track"
          style={{
            position: "absolute", top: 0, bottom: 0, [side === "right" ? "left" : "right"]: -6,
            width: 12, cursor: "col-resize", zIndex: 1, display: "flex", justifyContent: "center", alignItems: "center",
          }}
        >
          <div className="saltSplitter-bar" style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "var(--salt-separable-tertiary-borderColor)" }} />
          <div className="saltSplitter-grip" style={{ position: "relative", width: 4, height: 32, borderRadius: "var(--salt-palette-corner)", background: "var(--salt-separable-secondary-borderColor)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, minHeight: 0, padding: "var(--salt-spacing-200)" }}>
          <SidePanelHeader
            title={title}
            secondaryInfo={secondaryInfo}
            onBack={onBack}
            backLabel={backLabel}
            actions={actions}
            onClose={onClose}
            closeLabel={closeLabel}
            description={description}
            primaryTag={primaryTag}
            secondaryTag={secondaryTag}
            status={status}
            copyValue={copyValue}
            onCopy={onCopy}
            dataLabels={dataLabels}
          />
          <div style={{ flex: 1, overflow: "auto", marginTop: "var(--salt-spacing-200)" }}>{children}</div>
          {(primaryAction || (secondaryActions && secondaryActions.length) || (tertiaryActions && tertiaryActions.length)) && (
            <InlineButtons
              style={{ marginTop: "var(--salt-spacing-200)", flexShrink: 0 }}
              primaryAction={primaryAction}
              secondaryActions={secondaryActions}
              tertiaryActions={tertiaryActions}
            />
          )}
        </div>
      </div>
      <style>{`.saltSplitter-grip{transition:background var(--salt-duration-instant) ease-in-out,width var(--salt-duration-instant) ease-in-out,height var(--salt-duration-instant) ease-in-out}[role="separator"]:hover .saltSplitter-grip,[role="separator"]:active .saltSplitter-grip{background:var(--salt-accent-background);width:4px;height:48px}[role="separator"]:hover .saltSplitter-bar,[role="separator"]:active .saltSplitter-bar{background:var(--salt-accent-background)}`}</style>
    </div>
  );
}
