import React, { useState, useRef, useCallback, useEffect } from "react";

const CloseIcon = () => (<svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true"><path d="M6 6.707 9.146 9.85l.707-.707L6.707 6l3.146-3.146-.707-.707L6 5.293 2.854 2.147l-.707.707L5.293 6l-3.146 3.146.707.707z"/></svg>);

const closeBtnStyle = {
  width: 28, height: 28, flexShrink: 0, border: "none", background: "transparent",
  borderRadius: "var(--salt-curve-50)", cursor: "pointer", display: "flex", alignItems: "center",
  justifyContent: "center", color: "var(--salt-content-secondary-foreground)",
};

/**
 * Fusion BaseLayout — Studio page shell: full-width GlobalNav, a left
 * VerticalNavigation rail, a PageHeader spanning the remaining width, a
 * spacing-200-padded swappable content area, and the Footer. The PageHeader
 * and content share one scroll region (both directions) — they never scroll
 * independently — while the VerticalNavigation rail and any open
 * rightPanel/overlayPanel stay fixed in place (each may scroll internally).
 * The row itself clips overflow so a closed (off-screen) overlayPanel can't
 * expand the page's scrollable area. min-width 980px (below that the row
 * aligns left and scrolls horizontally rather than squeezing further),
 * max-width 1848px for size="large" or 1500px for size="medium" (centered
 * once the available width exceeds that cap).
 *
 * Two optional right-anchored panels, each triggered by a button folded into
 * PageHeader's own secondaryActions — so it renders in the SAME InlineButtons
 * group as PageHeader's primaryAction/tertiaryAction, immediately after the
 * title with no gap and no separate right-aligned cluster:
 * - `rightPanel` — a full-height panel (spanning from beneath GlobalNav to
 *   above Footer, alongside the nav rail) that pushes the PageHeader+content
 *   column, resizable via a drag splitter on its left edge
 *   (rightPanelMinWidth–rightPanelMaxWidth).
 * - `overlayPanel` — a fixed-width panel that slides in above the PageHeader
 *   and content (full height between GlobalNav and Footer) with a
 *   click-to-dismiss scrim, like SidePanel but non-resizable.
 *
 * Requires FusionDesignSystem_6db751 (GlobalNav, VerticalNavigation,
 * PageHeader, Footer).
 */
export function BaseLayout(props) {
  const {
    size = "large",
    globalNavProps = {},
    navItems = [],
    navCollapsible = true,
    navDefaultCollapsed = false,
    navCollapsed,
    onNavCollapsedChange,
    pageHeaderProps = {},
    rightPanel,
    rightPanelTitle,
    rightPanelTriggerLabel = "Side panel",
    rightPanelMinWidth = 320,
    rightPanelDefaultWidth = 420,
    rightPanelMaxWidth = 640,
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
    showFooter = true,
    footerProps = {},
    contentStyle,
    children,
  } = props;
  const { GlobalNav, VerticalNavigation, PageHeader, Footer } = window.FusionDesignSystem_6db751;
  const contentMaxWidth = size === "medium" ? 1500 : 1848;

  const [rpState, setRpState] = useState(defaultRightPanelOpen);
  const rpOpen = rightPanelOpen !== undefined ? rightPanelOpen : rpState;
  const setRp = (v) => { setRpState(v); onRightPanelOpenChange && onRightPanelOpenChange(v); };

  const [ovState, setOvState] = useState(defaultOverlayOpen);
  const ovOpen = overlayOpen !== undefined ? overlayOpen : ovState;
  const setOv = (v) => { setOvState(v); onOverlayOpenChange && onOverlayOpenChange(v); };

  const [rpWidth, setRpWidth] = useState(rightPanelDefaultWidth);
  const dragRef = useRef(null);
  const onResizerDown = useCallback((e) => {
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startWidth: rpWidth };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [rpWidth]);
  useEffect(() => {
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
  }, [rightPanelMinWidth, rightPanelMaxWidth]);

  const extraSecondary = [];
  if (rightPanel != null) extraSecondary.push({ label: rightPanelTriggerLabel, onClick: () => setRp(!rpOpen) });
  if (overlayPanel != null) extraSecondary.push({ label: overlayTriggerLabel, onClick: () => setOv(!ovOpen) });
  const mergedPageHeaderProps = extraSecondary.length
    ? { ...pageHeaderProps, secondaryActions: [...extraSecondary, ...(pageHeaderProps.secondaryActions || [])] }
    : pageHeaderProps;

  return (
    <div className="salt-theme salt-density-low" style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "var(--salt-palette-background-secondary)", fontFamily: "var(--salt-text-fontFamily)", color: "var(--salt-content-primary-foreground)", position: "relative" }}>
      <GlobalNav {...globalNavProps} style={{ flexShrink: 0, ...(globalNavProps.style || {}) }} />
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: `auto minmax(0,1fr)${rightPanel != null && rpOpen ? " auto auto" : ""}`, gridTemplateRows: "100%" }}>
        <VerticalNavigation
          items={navItems}
          collapsible={navCollapsible}
          defaultCollapsed={navDefaultCollapsed}
          collapsed={navCollapsed}
          onCollapsedChange={onNavCollapsedChange}
          style={{ borderRight: "1px solid var(--salt-separable-secondary-borderColor)", height: "100%" }}
        />
        <div style={{ minWidth: 0, minHeight: 0, display: "flex", flexDirection: "column", overflow: "auto" }}>
          <div style={{ flexShrink: 0, borderBottom: "1px solid var(--salt-separable-secondary-borderColor)", padding: "var(--salt-spacing-200)" }}>
            <div style={{ minWidth: 980, maxWidth: contentMaxWidth, margin: "0 auto" }}>
              <PageHeader {...mergedPageHeaderProps} style={{ paddingLeft: 0, ...(mergedPageHeaderProps.style || {}) }} />
            </div>
          </div>
          <div style={{ flexShrink: 0, padding: "var(--salt-spacing-200)" }}>
            <div style={{ minWidth: 980, maxWidth: contentMaxWidth, margin: "0 auto", ...contentStyle }}>
              {children}
            </div>
          </div>
        </div>

        {rightPanel != null && rpOpen && (
          <>
            <div
              onPointerDown={onResizerDown}
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize panel"
              style={{ width: 6, height: "100%", cursor: "col-resize", position: "relative" }}
            >
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "var(--salt-separable-secondary-borderColor)" }} />
            </div>
            <div style={{ width: rpWidth, minWidth: rightPanelMinWidth, maxWidth: rightPanelMaxWidth, height: "100%", display: "flex", flexDirection: "column", minHeight: 0, background: "var(--salt-container-primary-background)", borderLeft: "1px solid var(--salt-separable-secondary-borderColor)" }}>
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
      {showFooter && <Footer {...footerProps} />}
    </div>
  );
}
