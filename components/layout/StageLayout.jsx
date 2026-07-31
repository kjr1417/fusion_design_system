import React, { useState, useRef, useCallback, useEffect } from "react";

const CloseIcon = () => (<svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true"><path d="M6 6.707 9.146 9.85l.707-.707L6.707 6l3.146-3.146-.707-.707L6 5.293 2.854 2.147l-.707.707L5.293 6l-3.146 3.146.707.707z"/></svg>);

const closeBtnStyle = {
  width: 28, height: 28, flexShrink: 0, border: "none", background: "transparent",
  borderRadius: "var(--salt-curve-50)", cursor: "pointer", display: "flex", alignItems: "center",
  justifyContent: "center", color: "var(--salt-content-secondary-foreground)",
};

/**
 * Fusion StageLayout — Studio wizard shell: full-width GlobalNav, an AppHeader
 * directly beneath it (fixed in place through vertical scroll — both sit
 * outside the scrolling region), a left ProgressTracker rail, a
 * spacing-300-padded swappable content area, a full-width ButtonBar, and the
 * Footer. Collapsing the ProgressTracker rail (its own built-in toggle)
 * reflows the content area to fill the reclaimed width automatically — it's a
 * plain flex sibling, no special-casing needed. size="large" caps content at
 * 980–1848px; size="small" (covers X-Small/Small) caps it at 400–1280px.
 * Below its minimum, content aligns left and scrolls horizontally rather than
 * squeezing further — the ProgressTracker rail stays fixed (not part of the
 * horizontal scroll) throughout.
 *
 * One optional right-anchored panel, triggered by a button folded into
 * AppHeader's own `actions` (so it renders at the header's right edge,
 * immediately before the StatusBadge):
 * - `rightPanel` — full-height, pushes the content column. `rightPanelResizable`
 *   (default true) adds a drag splitter on its left edge
 *   (rightPanelMinWidth–rightPanelMaxWidth); set false for a fixed, non-resizable
 *   push panel at `rightPanelWidth`. Content scrolls horizontally *behind* it —
 *   the panel is a flex sibling of the scrolling content, not inside it.
 *
 * A second, independent overlay panel:
 * - `overlayPanel` — a fixed-width (`overlayWidth`) panel that slides in above
 *   the ProgressTracker and content with a click-to-dismiss scrim, like
 *   SidePanel but non-resizable.
 *
 * `showProgressTracker` (default true) drops the rail entirely — the
 * size="large" sub-variant without it.
 *
 * Requires FusionDesignSystem_6db751 (GlobalNav, AppHeader, ProgressTracker,
 * ButtonBar, Footer).
 */
export function StageLayout(props) {
  const {
    size = "large",
    globalNavProps = {},
    appHeaderProps = {},
    showProgressTracker = true,
    progressTrackerProps = { steps: [] },
    buttonBarProps = { primaryAction: { label: "Continue" } },
    showFooter = true,
    footerProps = {},
    contentStyle,
    rightPanel,
    rightPanelTitle,
    rightPanelTriggerLabel = "AI Assist",
    rightPanelResizable = true,
    rightPanelWidth = 380,
    rightPanelMinWidth = 320,
    rightPanelMaxWidth = 560,
    rightPanelOpen,
    defaultRightPanelOpen = false,
    onRightPanelOpenChange,
    overlayPanel,
    overlayTitle,
    overlayTriggerLabel = "Overlay",
    overlayWidth = 480,
    overlayOpen,
    defaultOverlayOpen = false,
    onOverlayOpenChange,
    children,
  } = props;
  const { GlobalNav, AppHeader, ProgressTracker, ButtonBar, Footer } = window.FusionDesignSystem_6db751;
  const small = size === "small";
  const contentMinWidth = small ? 400 : 980;
  const contentMaxWidth = small ? 1280 : 1848;

  const [rpState, setRpState] = useState(defaultRightPanelOpen);
  const rpOpen = rightPanelOpen !== undefined ? rightPanelOpen : rpState;
  const setRp = (v) => { setRpState(v); onRightPanelOpenChange && onRightPanelOpenChange(v); };

  const [ovState, setOvState] = useState(defaultOverlayOpen);
  const ovOpen = overlayOpen !== undefined ? overlayOpen : ovState;
  const setOv = (v) => { setOvState(v); onOverlayOpenChange && onOverlayOpenChange(v); };

  const [rpWidth, setRpWidth] = useState(rightPanelWidth);
  const dragRef = useRef(null);
  const onResizerDown = useCallback((e) => {
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startWidth: rpWidth };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [rpWidth]);
  useEffect(() => {
    if (!rightPanelResizable) return;
    const onMove = (e) => {
      if (!dragRef.current) return;
      const delta = dragRef.current.startX - e.clientX;
      setRpWidth(Math.min(rightPanelMaxWidth, Math.max(rightPanelMinWidth, dragRef.current.startWidth + delta)));
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
  }, [rightPanelResizable, rightPanelMinWidth, rightPanelMaxWidth]);

  const extraActions = [];
  if (rightPanel != null) extraActions.push({ label: rightPanelTriggerLabel, onClick: () => setRp(!rpOpen) });
  if (overlayPanel != null) extraActions.push({ label: overlayTriggerLabel, onClick: () => setOv(!ovOpen) });
  const mergedAppHeaderProps = extraActions.length
    ? { ...appHeaderProps, actions: [...extraActions, ...(appHeaderProps.actions || [])] }
    : appHeaderProps;

  const panelWidth = rightPanelResizable ? rpWidth : rightPanelWidth;

  return (
    <div className="salt-theme salt-density-low" style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "var(--salt-palette-background-secondary)", fontFamily: "var(--salt-text-fontFamily)", color: "var(--salt-content-primary-foreground)", position: "relative" }}>
      <GlobalNav {...globalNavProps} style={{ flexShrink: 0, ...(globalNavProps.style || {}) }} />
      <AppHeader {...mergedAppHeaderProps} style={{ flexShrink: 0, ...(mergedAppHeaderProps.style || {}) }} />
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden", display: "flex" }}>
        {showProgressTracker && <ProgressTracker {...progressTrackerProps} />}

        <div style={{ flex: 1, minWidth: 0, minHeight: 0, overflow: "auto", position: "relative" }}>
          <div style={{ boxSizing: "border-box", minWidth: contentMinWidth, maxWidth: contentMaxWidth, margin: "0 auto", padding: "var(--salt-spacing-300)", ...contentStyle }}>
            {children}
          </div>
        </div>

        {rightPanel != null && rpOpen && (
          <>
            {rightPanelResizable && (
              <div
                onPointerDown={onResizerDown}
                role="separator"
                aria-orientation="vertical"
                aria-label="Resize panel"
                style={{ width: 6, height: "100%", flexShrink: 0, cursor: "col-resize", position: "relative" }}
              >
                <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "var(--salt-separable-secondary-borderColor)" }} />
              </div>
            )}
            <div style={{
              width: panelWidth, flexShrink: 0,
              minWidth: rightPanelResizable ? rightPanelMinWidth : rightPanelWidth,
              maxWidth: rightPanelResizable ? rightPanelMaxWidth : rightPanelWidth,
              height: "100%", display: "flex", flexDirection: "column", minHeight: 0,
              background: "var(--salt-container-primary-background)",
              borderLeft: rightPanelResizable ? "none" : "1px solid var(--salt-separable-secondary-borderColor)",
            }}>
              {rightPanelTitle && (
                <div style={{ height: 44, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 var(--salt-spacing-200)", borderBottom: "1px solid var(--salt-separable-secondary-borderColor)" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rightPanelTitle}</div>
                  <button aria-label="Close panel" onClick={() => setRp(false)} style={closeBtnStyle}><CloseIcon /></button>
                </div>
              )}
              <div style={{ flex: 1, minHeight: 0, overflow: "auto", padding: "var(--salt-spacing-200)" }}>{rightPanel}</div>
            </div>
          </>
        )}

        {overlayPanel != null && (
          <div style={{ position: "absolute", inset: 0, zIndex: 90, pointerEvents: ovOpen ? "auto" : "none" }}>
            <div
              onClick={() => setOv(false)}
              style={{ position: "absolute", inset: 0, background: "var(--salt-overlayable-backdrop)", opacity: ovOpen ? 1 : 0, transition: "opacity var(--salt-duration-perceptible) ease-in-out" }}
            />
            <div style={{
              position: "absolute", top: 0, bottom: 0, right: 0, width: overlayWidth, maxWidth: "90vw",
              background: "var(--salt-container-primary-background)", boxShadow: "var(--salt-shadow-medium)",
              display: "flex", flexDirection: "column",
              transform: ovOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform var(--salt-duration-perceptible) ease-in-out",
            }}>
              <div style={{ height: 44, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 var(--salt-spacing-200)", borderBottom: "1px solid var(--salt-separable-secondary-borderColor)" }}>
                <div style={{ fontSize: 15, fontWeight: 700, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{overlayTitle}</div>
                <button aria-label="Close overlay" onClick={() => setOv(false)} style={closeBtnStyle}><CloseIcon /></button>
              </div>
              <div style={{ flex: 1, overflow: "auto", padding: "var(--salt-spacing-200)" }}>{overlayPanel}</div>
            </div>
          </div>
        )}
      </div>
      <ButtonBar {...buttonBarProps} />
      {showFooter && <Footer {...footerProps} />}
    </div>
  );
}
