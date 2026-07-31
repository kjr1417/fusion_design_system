import React, { useState, useRef, useCallback, useEffect } from "react";

const GLYPHS = {
  minimize: "M0 8H12V10H0V8Z",
  add: "M6.5 5.5H11v1H6.5V11h-1V6.5H1v-1h4.5V1h1z",
  undo: "M7.29407 10.8311C9.9614 10.1164 11.5443 7.37472 10.8296 4.70739C10.1149 2.04006 7.37321 0.457151 4.70588 1.17186C4.01758 1.35629 3.40262 1.67508 2.88062 2.09207C2.60406 2.313 2.35338 2.56167 2.1317 2.8328C1.95979 3.04306 1.80536 3.26678 1.66986 3.50147L4 3.50146V4.50146H0L9.53674e-07 0.501464L1 0.501465L1 2.68471C1.11089 2.51742 1.2302 2.35556 1.35753 2.19983C1.62338 1.87467 1.92424 1.57616 2.25647 1.31077C2.88418 0.809327 3.62306 0.426724 4.44706 0.205934C7.64786 -0.651717 10.9379 1.24778 11.7955 4.44858C12.6532 7.64937 10.7537 10.9394 7.55289 11.797L7.29407 10.8311Z",
  refresh: "M4.707 10.831a5 5 0 1 1 5.625-7.33h-2.33v1h4v-4h-1v2.184A6 6 0 0 0 9.745 1.31a6 6 0 1 0 2.052 6.244l-.966-.26a5 5 0 0 1-6.124 3.536",
  tree: "M4 5h1.5v1H1v2H0v4h4V8H2V7h8v1H8v4h4V8h-1V6H6.5V5H8V1H4zm3-3H5v2h2zm2 7v2h2V9zM1 9v2h2V9z|fill",
  "panel-open-left_solid": "M12 12H0V0H12V12ZM1 11H4.00391V1H1V11ZM6.46875 3.87891L8.08984 5.5H5.00391V6.5H8.08984L6.46875 8.12109L7.17578 8.82812L10.0039 6L7.17578 3.17188L6.46875 3.87891Z",
  "panel-open-right_solid": "M12 12H0V0H12V12ZM8 11H11V1H8V11ZM2 6L4.82812 8.82812L5.53516 8.12109L3.91406 6.5H7V5.5H3.91406L5.53516 3.87891L4.82812 3.17188L2 6Z",
  "panel-close-left": "M12 12H0V0H12V12ZM1 11H3V1H1V11ZM4 11H11V1H4V11ZM8.53516 3.87891L6.91406 5.5H10V6.5H6.91406L8.53516 8.12109L7.82812 8.82812L5 6L7.82812 3.17188L8.53516 3.87891Z",
  "panel-close-right": "M7 6L4.17188 8.82812L3.46484 8.12109L5.08594 6.5H2V5.5H5.08594L3.46484 3.87891L4.17188 3.17188L7 6Z|M12 12H0V0H12V12ZM1 11H8V1H1V11ZM9 11H11V1H9V11Z",
  "arrow-up": "M5.5 12h1V1.915l3.146 3.147.707-.708L6 0 1.646 4.353l.708.707L5.5 1.914z",
};

function IconGlyph({ name, size = 14 }) {
  const spec = GLYPHS[name];
  if (!spec) return <span style={{ width: size, height: size, flexShrink: 0, display: "inline-block" }} />;
  const evenOdd = spec.endsWith("|fill");
  const parts = (evenOdd ? spec.slice(0, -5) : spec).split("|");
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, display: "block" }}>
      {parts.map((p, i) => <path key={i} d={p} fillRule={evenOdd ? "evenodd" : undefined} clipRule={evenOdd ? "evenodd" : undefined} />)}
    </svg>
  );
}

const floatBtnStyle = (side) => ({
  position: "absolute", top: "var(--salt-spacing-200)", [side]: "var(--salt-spacing-200)", zIndex: 5,
  width: 32, height: 32, borderRadius: "var(--salt-curve-50)", border: "1px solid var(--salt-separable-primary-borderColor)",
  background: "var(--salt-container-primary-background)", boxShadow: "var(--salt-shadow-low)",
  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--salt-content-primary-foreground)",
});


const toolbarBtnStyle = {
  width: 32, height: 32, flexShrink: 0, border: "none", background: "transparent",
  borderRadius: "var(--salt-curve-50)", cursor: "pointer", display: "flex", alignItems: "center",
  justifyContent: "center", color: "var(--salt-content-primary-foreground)",
};
const hoverOn = (e) => (e.currentTarget.style.background = "var(--salt-actionable-subtle-background-hover)");
const hoverOff = (e) => (e.currentTarget.style.background = "transparent");

/**
 * Fusion CanvasLayout — Studio canvas shell: full-width GlobalNav, a
 * full-width AppHeader, optional left/right collapsible panels flanking a
 * central canvas, a full-width ButtonBar, and the Footer. Collapsed panels
 * leave a floating reopen button pinned to their canvas-side corner
 * (spacing-200 from the top and side edges); the same trigger becomes the
 * close button once expanded, rendered as a standard SidePanelHeader
 * (spacing-200 padded, matching SidePanel's own header treatment) — a
 * push panel rather than SidePanel's overlay-drawer collapse. Each open
 * panel has a draggable splitter on its canvas-facing edge (matching
 * SidePanel/StageLayout's splitter) that resizes it between
 * leftPanelMinWidth–leftPanelMaxWidth / rightPanelMinWidth–rightPanelMaxWidth.
 * The canvas also gets a floating bottom-left toolbar (zoom out/in,
 * undo/redo, fit-to-canvas) for panning an unbounded lineage/node system,
 * rendered over a React-Flow-style 1px dot grid (spacing-200 gap). The
 * canvas itself is also directly draggable (click-drag empty canvas space)
 * to pan — both content and dot grid translate together, and content also
 * scales with the Zoom In/Out toolbar buttons (0.4–2x). Every pan/zoom
 * change is a step in an undo/redo history the toolbar's Undo/Redo buttons
 * walk (disabled at the ends). Fit-to-canvas resets pan and zoom to center
 * (as its own history step) before also calling `onFitToCanvas` (for
 * consumers with their own node-graph framing to layer on top).
 * Requires FusionDesignSystem_6db751 (GlobalNav, AppHeader, ButtonBar,
 * Footer, SidePanelHeader) plus ./AppHeader.css, ./Breadcrumbs.css,
 * ./CopyValue.css, and ./SidePanelHeader.css (same stylesheet set as
 * StageLayout).
 */
export function CanvasLayout({
  globalNavProps = {},
  appHeaderProps = {},
  leftPanel,
  leftPanelTitle,
  leftPanelWidth = 280,
  leftPanelMinWidth = 200,
  leftPanelMaxWidth = 480,
  leftOpen,
  defaultLeftOpen = true,
  onLeftOpenChange,
  rightPanel,
  rightPanelTitle,
  rightPanelWidth = 320,
  rightPanelMinWidth = 240,
  rightPanelMaxWidth = 560,
  rightOpen,
  defaultRightOpen = true,
  onRightOpenChange,
  buttonBarProps = { primaryAction: { label: "Save" } },
  showFooter = true,
  footerProps = {},
  onZoomOut,
  onZoomIn,
  onUndo,
  onRedo,
  onFitToCanvas,
  children,
}) {
  const { GlobalNav, AppHeader, ButtonBar, Footer, SidePanelHeader } = window.FusionDesignSystem_6db751;
  const [leftState, setLeftState] = useState(defaultLeftOpen);
  const [rightState, setRightState] = useState(defaultRightOpen);
  const left = leftOpen !== undefined ? leftOpen : leftState;
  const right = rightOpen !== undefined ? rightOpen : rightState;
  const setLeft = (v) => { setLeftState(v); onLeftOpenChange && onLeftOpenChange(v); };
  const setRight = (v) => { setRightState(v); onRightOpenChange && onRightOpenChange(v); };

  const [leftW, setLeftW] = useState(leftPanelWidth);
  const [rightW, setRightW] = useState(rightPanelWidth);
  const [hist, setHist] = useState({ list: [{ x: 0, y: 0, zoom: 1 }], index: 0 });
  const transform = hist.list[hist.index];
  const pushTransform = (next) => setHist((h) => ({ list: [...h.list.slice(0, h.index + 1), next], index: h.index + 1 }));
  const [panning, setPanning] = useState(false);
  const [livePan, setLivePan] = useState(null);
  const panDragRef = useRef(null);
  const pan = livePan || transform;
  const onCanvasPointerDown = useCallback((e) => {
    if (e.target.closest && e.target.closest("button")) return;
    e.preventDefault();
    panDragRef.current = { startX: e.clientX, startY: e.clientY, startPan: transform, moved: false };
    setPanning(true);
  }, [transform]);
  useEffect(() => {
    const onMove = (e) => {
      const d = panDragRef.current;
      if (!d) return;
      const x = d.startPan.x + (e.clientX - d.startX);
      const y = d.startPan.y + (e.clientY - d.startY);
      if (x !== d.startPan.x || y !== d.startPan.y) d.moved = true;
      setLivePan({ x, y, zoom: d.startPan.zoom });
    };
    const onUp = () => {
      const d = panDragRef.current;
      panDragRef.current = null;
      setPanning(false);
      if (d && d.moved) {
        setLivePan((lp) => { if (lp) pushTransform(lp); return null; });
      } else {
        setLivePan(null);
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  }, [hist]);
  const dragRef = useRef(null);
  const onResizerDown = useCallback((side) => (e) => {
    e.preventDefault();
    dragRef.current = { side, startX: e.clientX, startWidth: side === "left" ? leftW : rightW };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [leftW, rightW]);
  useEffect(() => {
    const onMove = (e) => {
      const d = dragRef.current;
      if (!d) return;
      if (d.side === "left") {
        const next = Math.min(leftPanelMaxWidth, Math.max(leftPanelMinWidth, d.startWidth + (e.clientX - d.startX)));
        setLeftW(next);
      } else {
        const next = Math.min(rightPanelMaxWidth, Math.max(rightPanelMinWidth, d.startWidth + (d.startX - e.clientX)));
        setRightW(next);
      }
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
  }, [leftPanelMinWidth, leftPanelMaxWidth, rightPanelMinWidth, rightPanelMaxWidth]);

  const canUndo = hist.index > 0;
  const canRedo = hist.index < hist.list.length - 1;
  const ZOOM_STEP = 0.2, MIN_ZOOM = 0.4, MAX_ZOOM = 2;
  const resetPan = () => pushTransform({ x: 0, y: 0, zoom: 1 });
  const toolbarButtons = [
    { icon: "minimize", label: "Zoom Out", onClick: () => { pushTransform({ ...transform, zoom: Math.max(MIN_ZOOM, transform.zoom - ZOOM_STEP) }); onZoomOut && onZoomOut(); } },
    { icon: "add", label: "Zoom In", onClick: () => { pushTransform({ ...transform, zoom: Math.min(MAX_ZOOM, transform.zoom + ZOOM_STEP) }); onZoomIn && onZoomIn(); } },
    { icon: "undo", label: "Undo", disabled: !canUndo, onClick: () => { setHist((h) => ({ ...h, index: Math.max(0, h.index - 1) })); onUndo && onUndo(); } },
    { icon: "refresh", label: "Redo", disabled: !canRedo, onClick: () => { setHist((h) => ({ ...h, index: Math.min(h.list.length - 1, h.index + 1) })); onRedo && onRedo(); } },
    { icon: "tree", label: "Fit to Canvas", onClick: () => { resetPan(); onFitToCanvas && onFitToCanvas(); } },
  ];

  return (
    <div className="salt-theme salt-density-low" style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "var(--salt-palette-background-secondary)", fontFamily: "var(--salt-text-fontFamily)", color: "var(--salt-content-primary-foreground)" }}>
      <GlobalNav {...globalNavProps} style={{ flexShrink: 0, ...(globalNavProps.style || {}) }} />
      <AppHeader {...appHeaderProps} style={{ flexShrink: 0, ...(appHeaderProps.style || {}) }} />
      <div style={{ flex: 1, display: "flex", minHeight: 0, position: "relative" }}>
        {leftPanel != null && left && (
          <div style={{ width: leftW, flexShrink: 0, position: "relative", borderRight: "1px solid var(--salt-separable-secondary-borderColor)", background: "var(--salt-container-primary-background)", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div
              onPointerDown={onResizerDown("left")}
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize left panel"
              className="saltSplitter-track"
              style={{ position: "absolute", top: 0, bottom: 0, right: -6, width: 12, cursor: "col-resize", zIndex: 6, display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <div className="saltSplitter-bar" style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "var(--salt-separable-tertiary-borderColor)" }} />
              <div className="saltSplitter-grip" style={{ position: "relative", width: 4, height: 32, borderRadius: "var(--salt-palette-corner)", background: "var(--salt-separable-secondary-borderColor)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, minHeight: 0, padding: "var(--salt-spacing-200)" }}>
              <SidePanelHeader title={leftPanelTitle || "Panel"} onClose={() => setLeft(false)} />
              <div style={{ flex: 1, overflow: "auto", marginTop: "var(--salt-spacing-200)" }}>{leftPanel}</div>
            </div>
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0, overflow: "hidden", position: "relative", background: "var(--salt-palette-background-secondary)", backgroundImage: "radial-gradient(circle, var(--salt-separable-secondary-borderColor) 1px, transparent 1px)", backgroundSize: "var(--salt-spacing-200) var(--salt-spacing-200)", backgroundPosition: `${pan.x}px ${pan.y}px`, cursor: panning ? "grabbing" : "grab" }} onPointerDown={onCanvasPointerDown}>
          {leftPanel != null && !left && (
            <button aria-label="Open left panel" title="Open panel" onClick={() => setLeft(true)} style={floatBtnStyle("left")}>
              <IconGlyph name="panel-open-left_solid" size={16} />
            </button>
          )}
          {rightPanel != null && !right && (
            <button aria-label="Open right panel" title="Open panel" onClick={() => setRight(true)} style={floatBtnStyle("right")}>
              <IconGlyph name="panel-open-right_solid" size={16} />
            </button>
          )}
          <div style={{ position: "absolute", bottom: "var(--salt-spacing-200)", left: "var(--salt-spacing-200)", zIndex: 5, display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)" }}>
            {toolbarButtons.map((b, i) => (
              <button key={i} aria-label={b.label} title={b.label} onClick={b.onClick} disabled={b.disabled} style={{ ...toolbarBtnStyle, opacity: b.disabled ? 0.4 : 1, cursor: b.disabled ? "default" : "pointer" }} onMouseEnter={b.disabled ? undefined : hoverOn} onMouseLeave={b.disabled ? undefined : hoverOff}>
                <IconGlyph name={b.icon} size={16} />
              </button>
            ))}
          </div>
          <div style={{ position: "absolute", inset: 0, transform: `translate(${pan.x}px, ${pan.y}px) scale(${pan.zoom})`, transformOrigin: "center", pointerEvents: panning ? "none" : "auto" }}>{children}</div>
        </div>
        {rightPanel != null && right && (
          <div style={{ width: rightW, flexShrink: 0, position: "relative", borderLeft: "1px solid var(--salt-separable-secondary-borderColor)", background: "var(--salt-container-primary-background)", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div
              onPointerDown={onResizerDown("right")}
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize right panel"
              className="saltSplitter-track"
              style={{ position: "absolute", top: 0, bottom: 0, left: -6, width: 12, cursor: "col-resize", zIndex: 6, display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <div className="saltSplitter-bar" style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "var(--salt-separable-tertiary-borderColor)" }} />
              <div className="saltSplitter-grip" style={{ position: "relative", width: 4, height: 32, borderRadius: "var(--salt-palette-corner)", background: "var(--salt-separable-secondary-borderColor)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, minHeight: 0, padding: "var(--salt-spacing-200)" }}>
              <SidePanelHeader title={rightPanelTitle || "Panel"} onClose={() => setRight(false)} />
              <div style={{ flex: 1, overflow: "auto", marginTop: "var(--salt-spacing-200)" }}>{rightPanel}</div>
            </div>
          </div>
        )}
      </div>
      <style>{`.saltSplitter-grip{transition:background var(--salt-duration-instant) ease-in-out,width var(--salt-duration-instant) ease-in-out,height var(--salt-duration-instant) ease-in-out}[role="separator"]:hover .saltSplitter-grip,[role="separator"]:active .saltSplitter-grip{background:var(--salt-accent-background);width:4px;height:48px}[role="separator"]:hover .saltSplitter-bar,[role="separator"]:active .saltSplitter-bar{background:var(--salt-accent-background)}`}</style>
      <ButtonBar {...buttonBarProps} />
      {showFooter && <Footer {...footerProps} />}
    </div>
  );
}
