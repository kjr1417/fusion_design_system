import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "./Button.jsx";
import { IconButton } from "./IconButton.jsx";
import { Banner } from "../feedback/Banner.jsx";
import { Text } from "../display/Text.jsx";

// Matches tokens/spacing.css
const SPACE_100 = 16;
const SPACE_150 = 24;
const SPACE_200 = 32;

const hiddenStyle = { position: "absolute", top: 0, left: 0, visibility: "hidden", height: 0, overflow: "hidden", pointerEvents: "none", whiteSpace: "nowrap" };

function OverflowIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true">
      <circle cx="2" cy="6" r="1.25" />
      <circle cx="6" cy="6" r="1.25" />
      <circle cx="10" cy="6" r="1.25" />
    </svg>
  );
}

function ActionButton({ action, appearance, sentiment }) {
  const { label, onClick, style, ...rest } = action;
  return (
    <Button appearance={appearance} sentiment={sentiment} onClick={onClick} style={{ whiteSpace: "nowrap", flexShrink: 0, ...style }} {...rest}>
      {label}
    </Button>
  );
}

export function ButtonBar({
  statusMessage,
  errorMessage,
  primaryAction,
  secondaryActions = [],
  tertiaryActions = [],
  className = "",
  style,
  ...rest
}) {
  const containerRef = useRef(null);
  const statusMeasureRef = useRef(null);
  const fullButtonsMeasureRef = useRef(null);
  const collapsedButtonsMeasureRef = useRef(null);
  const primaryOnlyMeasureRef = useRef(null);
  const errorMeasureRef = useRef(null);
  const errorRef = useRef(null);

  const collapsibleActions = [...tertiaryActions, ...secondaryActions];
  const hasCollapsible = collapsibleActions.length > 0;

  const [layout, setLayout] = useState({ showStatus: true, collapsed: false, primaryOnly: false });
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [menuRect, setMenuRect] = useState(null);
  const overflowRef = useRef(null);

  const updateMenuRect = useCallback(() => {
    if (!overflowRef.current) return;
    const r = overflowRef.current.getBoundingClientRect();
    setMenuRect({ top: r.bottom + 4, right: window.innerWidth - r.right });
  }, []);

  const recompute = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const availableWidth = container.clientWidth - SPACE_200 * 2;
    const statusW = statusMessage && statusMeasureRef.current ? statusMeasureRef.current.offsetWidth : 0;
    const errorW = errorMessage && errorMeasureRef.current ? errorMeasureRef.current.offsetWidth : 0;
    const fullButtonsW = fullButtonsMeasureRef.current ? fullButtonsMeasureRef.current.offsetWidth : 0;
    const collapsedButtonsW = collapsedButtonsMeasureRef.current ? collapsedButtonsMeasureRef.current.offsetWidth : 0;
    const primaryOnlyW = primaryOnlyMeasureRef.current ? primaryOnlyMeasureRef.current.offsetWidth : 0;
    const rightGap = errorMessage ? SPACE_200 : 0;

    const rightSideFullW = errorW + rightGap + fullButtonsW;
    const rightSideCollapsedW = errorW + rightGap + collapsedButtonsW;
    const totalFullW = (statusMessage ? statusW + SPACE_200 : 0) + rightSideFullW;

    const showStatus = !!statusMessage && availableWidth >= totalFullW;
    const primaryOnly = !showStatus && availableWidth < rightSideCollapsedW;
    const collapsed = !showStatus && !primaryOnly;

    setLayout((prev) => (prev.showStatus === showStatus && prev.collapsed === collapsed && prev.primaryOnly === primaryOnly ? prev : { showStatus, collapsed, primaryOnly }));
  }, [statusMessage, errorMessage]);

  useLayoutEffect(() => {
    recompute();
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(recompute);
    ro.observe(container);
    return () => ro.disconnect();
  }, [recompute, primaryAction, secondaryActions, tertiaryActions]);

  useEffect(() => {
    if (!overflowOpen) return;
    updateMenuRect();
    const close = (e) => { if (overflowRef.current && !overflowRef.current.contains(e.target)) setOverflowOpen(false); };
    document.addEventListener("mousedown", close);
    window.addEventListener("resize", updateMenuRect);
    window.addEventListener("scroll", updateMenuRect, true);
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("resize", updateMenuRect);
      window.removeEventListener("scroll", updateMenuRect, true);
    };
  }, [overflowOpen, updateMenuRect]);

  const cls = ["fusionButtonBar", className].filter(Boolean).join(" ");

  return (
    <div
      ref={containerRef}
      className={cls}
      style={{
        position: "relative",
        boxSizing: "border-box",
        width: "100%",
        minHeight: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--salt-spacing-200)",
        paddingTop: "var(--salt-spacing-150)",
        paddingBottom: "var(--salt-spacing-150)",
        paddingLeft: "var(--salt-spacing-200)",
        paddingRight: "var(--salt-spacing-200)",
        background: "var(--salt-container-primary-background)",
        borderTop: "var(--salt-spacing-fixed-100) solid var(--salt-container-tertiary-borderColor)",
        ...style,
      }}
      {...rest}
    >
      {/* hidden measurement layer — mirrors content to decide collision state */}
      <div aria-hidden="true" style={hiddenStyle}>
        <span ref={statusMeasureRef}>{statusMessage}</span>
      </div>
      <div aria-hidden="true" ref={fullButtonsMeasureRef} style={{ ...hiddenStyle, display: "flex", gap: "var(--salt-spacing-100)" }}>
        {tertiaryActions.map((a, i) => <ActionButton key={`t${i}`} action={a} appearance="transparent" sentiment="neutral" />)}
        {secondaryActions.map((a, i) => <ActionButton key={`s${i}`} action={a} appearance="bordered" sentiment="neutral" />)}
        {primaryAction ? <ActionButton action={primaryAction} appearance="solid" sentiment="accented" /> : null}
      </div>
      <div aria-hidden="true" ref={collapsedButtonsMeasureRef} style={{ ...hiddenStyle, display: "flex", gap: "var(--salt-spacing-100)" }}>
        {hasCollapsible ? <IconButton appearance="bordered" sentiment="neutral" aria-label="More actions"><OverflowIcon /></IconButton> : null}
        {primaryAction ? <ActionButton action={primaryAction} appearance="solid" sentiment="accented" /> : null}
      </div>
      <div aria-hidden="true" ref={primaryOnlyMeasureRef} style={{ ...hiddenStyle, display: "flex" }}>
        {primaryAction ? <ActionButton action={primaryAction} appearance="solid" sentiment="accented" /> : null}
      </div>
      {errorMessage ? (
        <div aria-hidden="true" ref={errorMeasureRef} style={hiddenStyle}>
          <Banner status="error" variant="secondary">{errorMessage}</Banner>
        </div>
      ) : null}

      {layout.showStatus ? (
        <Text variant="body" style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: "0 1 auto" }}>
          {statusMessage}
        </Text>
      ) : <span />}

      <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-200)", flexShrink: 0 }}>
        {errorMessage && !layout.primaryOnly ? (
          <div ref={errorRef} style={{ flexShrink: 0 }}>
            <Banner status="error" variant="secondary">{errorMessage}</Banner>
          </div>
        ) : null}

        <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)", flexShrink: 0 }}>
          {layout.primaryOnly ? (
            primaryAction ? <ActionButton action={primaryAction} appearance="solid" sentiment="accented" /> : null
          ) : layout.collapsed ? (
            <React.Fragment>
              {hasCollapsible ? (
                <div ref={overflowRef} style={{ position: "relative" }}>
                  <IconButton
                    appearance="bordered"
                    sentiment="neutral"
                    aria-label="More actions"
                    aria-haspopup="menu"
                    aria-expanded={overflowOpen}
                    onClick={() => setOverflowOpen((o) => !o)}
                  >
                    <OverflowIcon />
                  </IconButton>
                  {overflowOpen && menuRect ? ReactDOM.createPortal(
                    <div className="saltMenuPanel" role="menu" style={{ position: "fixed", top: menuRect.top, right: menuRect.right, zIndex: 10000 }}>
                      <div className="saltMenuPanel-container">
                        {collapsibleActions.map((a, i) => (
                          <div
                            key={i}
                            className="saltMenuItem"
                            role="menuitem"
                            tabIndex={0}
                            onClick={() => { a.onClick && a.onClick(); setOverflowOpen(false); }}
                          >
                            {a.label}
                          </div>
                        ))}
                      </div>
                    </div>,
                    document.body
                  ) : null}
                </div>
              ) : null}
              {primaryAction ? <ActionButton action={primaryAction} appearance="solid" sentiment="accented" /> : null}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {tertiaryActions.map((a, i) => <ActionButton key={`t${i}`} action={a} appearance="transparent" sentiment="neutral" />)}
              {secondaryActions.map((a, i) => <ActionButton key={`s${i}`} action={a} appearance="bordered" sentiment="neutral" />)}
              {primaryAction ? <ActionButton action={primaryAction} appearance="solid" sentiment="accented" /> : null}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
