// v2
import React, { useState, useRef, useLayoutEffect } from "react";
import { Accordion } from "../display/Accordion.jsx";

const ListGlyph = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flex: "none" }}>
    <path d="M4 2.5h7v1H4zm0 3h7v1H4zm0 3h7v1H4zM3 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m0-3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m0-3a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
  </svg>
);

// verbatim path data from VerticalNavigation's footer toggle glyphs, plus the right-docked mirrors
const PanelGlyph = ({ name }) => {
  const d = {
    "panel-close-left": "M12 12H0V0H12V12ZM1 11H3V1H1V11ZM4 11H11V1H4V11ZM8.53516 3.87891L6.91406 5.5H10V6.5H6.91406L8.53516 8.12109L7.82812 8.82812L5 6L7.82812 3.17188L8.53516 3.87891Z",
    "panel-open-left-solid": "M12 12H0V0H12V12ZM1 11H4.00391V1H1V11ZM6.46875 3.87891L8.08984 5.5H5.00391V6.5H8.08984L6.46875 8.12109L7.17578 8.82812L10.0039 6L7.17578 3.17188L6.46875 3.87891Z",
    "panel-close-right": "M12 12H0V0H12V12ZM1 11H8V1H1V11ZM9 11H11V1H9V11ZM7 6L4.17188 8.82812L3.46484 8.12109L5.08594 6.5H2V5.5H5.08594L3.46484 3.87891L4.17188 3.17188L7 6Z",
    "panel-open-right-solid": "M12 12H0V0H12V12ZM8 11H11V1H8V11ZM2 6L4.82812 8.82812L5.53516 8.12109L3.91406 6.5H7V5.5H3.91406L5.53516 3.87891L4.82812 3.17188L2 6Z",
  }[name];
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flex: "none" }}>
      <path d={d} />
    </svg>
  );
};

// verbatim path data from icons/progress-todo.svg, icons/progress-inprogress.svg,
// icons/progress-complete.svg, icons/error-solid.svg, plus the solid-dot "step-active" glyph
const STATUS_ICONS = {
  todo: {
    color: "var(--salt-color-gray-500)",
    paths: [{ d: "M11.6827 4.07119L10.7361 4.39361C10.6326 4.08951 10.4977 3.79029 10.3301 3.49999C10.1625 3.2097 9.9708 2.94332 9.75923 2.70157L10.5118 2.04301C10.766 2.33353 10.9958 2.65297 11.1961 2.99999C11.3965 3.34702 11.5583 3.70574 11.6827 4.07119ZM8.65409 0.618234L8.21261 1.51551C7.62338 1.22559 6.9813 1.05355 6.32606 1.01001L6.39236 0.012207C7.17803 0.0644141 7.94757 0.270611 8.65409 0.618234ZM4.07119 0.31726L4.39361 1.26385C4.08951 1.36744 3.79029 1.50226 3.49999 1.66987C3.2097 1.83747 2.94332 2.02919 2.70157 2.24076L2.04301 1.48823C2.33353 1.23399 2.65297 1.0042 2.99999 0.803842C3.34702 0.603486 3.70574 0.441736 4.07119 0.31726ZM0.618235 3.3459L1.51551 3.78738C1.22559 4.37661 1.05355 5.01869 1.01001 5.67393L0.012207 5.60763C0.0644141 4.82196 0.270611 4.05242 0.618235 3.3459ZM0.31726 7.9288C0.441736 8.29425 0.603486 8.65297 0.803842 8.99999C1.0042 9.34702 1.23399 9.66646 1.48823 9.95698L2.24076 9.29842C2.02919 9.05667 1.83747 8.79029 1.66987 8.49999C1.50226 8.2097 1.36744 7.91048 1.26386 7.60638L0.31726 7.9288ZM3.3459 11.3818L3.78738 10.4845C4.37661 10.7744 5.01869 10.9464 5.67393 10.99L5.60763 11.9878C4.82196 11.9356 4.05242 11.7294 3.3459 11.3818ZM7.9288 11.6827L7.60638 10.7361C7.91048 10.6326 8.2097 10.4977 8.49999 10.3301C8.79029 10.1625 9.05667 9.9708 9.29842 9.75923L9.95698 10.5118C9.66646 10.766 9.34702 10.9958 8.99999 11.1961C8.65297 11.3965 8.29425 11.5583 7.9288 11.6827ZM11.3818 8.65409L10.4845 8.21261C10.7744 7.62338 10.9464 6.9813 10.99 6.32606L11.9878 6.39236C11.9356 7.17803 11.7294 7.94757 11.3818 8.65409Z", fillRule: "evenodd" }],
  },
  active: {
    color: "var(--salt-palette-info)",
    paths: [{ d: "M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" }],
  },
  inprogress: {
    color: "var(--salt-palette-info)",
    paths: [{ d: "M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM1 6C1 3.23858 3.23858 1 6 1V11C3.23858 11 1 8.76142 1 6Z", fillRule: "evenodd" }],
  },
  complete: {
    color: "var(--salt-palette-positive)",
    paths: [{ d: "M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM3.20711 5.62132L2.5 6.32843L4.97487 8.8033L9.57107 4.20711L8.86396 3.5L4.97487 7.38909L3.20711 5.62132Z", fillRule: "evenodd" }],
  },
  error: {
    color: "var(--salt-palette-negative)",
    paths: [{ d: "M9 0H3L0 3v6l3 3h6l3-3V3zM7 2H5v5h2zm-1 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2", fillRule: "evenodd" }],
  },
};

// error steps cannot be disabled — status is always authoritative there
function StatusIcon({ status, disabled, size = 12 }) {
  const spec = STATUS_ICONS[status] || STATUS_ICONS.todo;
  const isDisabled = disabled && status !== "error";
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} aria-hidden="true"
      style={{ flex: "none", fill: spec.color, opacity: isDisabled ? 0.4 : 1 }}>
      {spec.paths.map((p, i) => <path key={i} d={p.d} fillRule={p.fillRule} clipRule={p.fillRule ? "evenodd" : undefined} />)}
    </svg>
  );
}

function ChildItem({ child, selected, onClick }) {
  const status = child.status || "todo";
  const disabled = !!child.disabled && status !== "error";
  const tooltip = disabled ? (child.disabledReason || "You do not have permissions to access these fields.") : child.label;
  return (
    <button
      onClick={() => !disabled && onClick && onClick()}
      disabled={disabled}
      title={tooltip}
      style={{
        all: "unset", boxSizing: "border-box", width: "100%", position: "relative",
        display: "flex", alignItems: child.description ? "flex-start" : "center", gap: "var(--salt-spacing-50)", minHeight: 36,
        padding: "var(--salt-spacing-25) var(--salt-spacing-100) var(--salt-spacing-25) 32px",
        borderRadius: "var(--salt-palette-corner-weaker)",
        cursor: disabled ? "not-allowed" : onClick ? "pointer" : "default",
        fontFamily: "var(--salt-text-fontFamily)",
        fontSize: "var(--salt-text-h4-fontSize)",
        fontWeight: "var(--salt-text-fontWeight)",
        color: disabled ? "var(--salt-content-secondary-foreground-disabled)" : "var(--salt-content-secondary-foreground)",
        background: "transparent",
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = "var(--salt-color-gray-100)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      {selected && <span style={{ position: "absolute", left: 2, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, borderRadius: 2, background: "var(--salt-palette-accent)" }} />}
      <StatusIcon status={status} disabled={disabled} />
      <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", textAlign: "left" }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{child.label}</span>
        {child.description && <span style={{ fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)", color: "var(--salt-content-secondary-foreground)", whiteSpace: "normal", paddingBottom: "var(--salt-spacing-25)" }}>{child.description}</span>}
      </span>
    </button>
  );
}

function StepList({ steps, statusOf, activeChild, onStepClick, onChildClick, expanded }) {
  if (!expanded) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {steps.map((raw, i) => {
          const s = typeof raw === "string" ? { label: raw } : raw;
          const status = statusOf(i, s);
          const disabled = !!s.disabled && status !== "error";
          return (
            <div key={i} title={disabled ? (s.disabledReason || "You do not have permissions to access these fields.") : s.label} style={{
              display: "flex", alignItems: "center", justifyContent: "center", minHeight: 36, boxSizing: "border-box",
              borderTop: "1px solid var(--salt-color-gray-200)",
              borderBottom: i === steps.length - 1 ? "1px solid var(--salt-color-gray-200)" : "none",
            }}>
              <StatusIcon status={status} disabled={disabled} />
            </div>
          );
        })}
      </div>
    );
  }

  const defaultOpenIndices = steps.reduce((acc, raw, i) => {
    const s = typeof raw === "string" ? { label: raw } : raw;
    const hasChildren = !!(s.children && s.children.length);
    if (hasChildren && s.defaultExpanded !== false) acc.push(i);
    return acc;
  }, []);

  const items = steps.map((raw, i) => {
    const s = typeof raw === "string" ? { label: raw } : raw;
    const status = statusOf(i, s);
    const highlighted = status === "active";
    const disabled = !!s.disabled && status !== "error";
    const children = (s.children || []).map((c) => (typeof c === "string" ? { label: c } : c));
    const hasChildren = children.length > 0;

    return {
      title: <span title={disabled ? (s.disabledReason || "You do not have permissions to access these fields.") : s.label} style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-50)", minWidth: 0 }}>
        {highlighted && <span style={{ position: "absolute", left: 2, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, borderRadius: 2, background: "var(--salt-palette-accent)" }} />}
        <StatusIcon status={status} disabled={disabled} />
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</span>
      </span>,
      subtitle: s.description,
      subtitleStyle: {
        paddingLeft: 36, paddingRight: "var(--salt-spacing-100)", paddingBottom: "var(--salt-spacing-50)",
        fontSize: "var(--salt-text-label-fontSize)", lineHeight: "var(--salt-text-label-lineHeight)", fontWeight: "var(--salt-text-fontWeight)",
        color: "var(--salt-content-secondary-foreground)", whiteSpace: "normal", textAlign: "left",
      },
      content: hasChildren ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {children.map((child, ci) => (
            <ChildItem
              key={ci}
              child={child}
              selected={(!!activeChild && activeChild.step === i && activeChild.child === ci) || child.status === "active"}
              onClick={onChildClick ? () => onChildClick(i, ci) : undefined}
            />
          ))}
        </div>
      ) : undefined,
      onHeaderClick: onStepClick && !disabled ? () => onStepClick(i) : undefined,
      contentStyle: { padding: 0 },
      headerStyle: {
        position: "relative",
        padding: "4px 12px 4px 16px",
        cursor: disabled ? "not-allowed" : onStepClick ? "pointer" : "default",
        fontFamily: "var(--salt-text-label-fontFamily)",
        fontWeight: highlighted ? "var(--salt-text-fontWeight-strong)" : "var(--salt-text-fontWeight)",
        color: disabled ? "var(--salt-content-secondary-foreground-disabled)" : "var(--salt-content-secondary-foreground)",
      },
    };
  });

  return (
    <Accordion variant="inline" chevronPosition="end" allowMultiple defaultOpen={defaultOpenIndices} items={items} />
  );
}

export function ProgressTracker({
  headerTitle, headerDescription, steps = [], activeStep = 0, activeChild,
  onStepClick, onChildClick, dock = "left", expandOnHover = false,
  showFooterToggle = true, defaultRailCollapsed = false, railCollapsed: railCollapsedProp, onRailCollapsedChange,
}) {
  const isRailControlled = railCollapsedProp !== undefined;
  const [railCollapsedState, setRailCollapsedState] = useState(defaultRailCollapsed);
  const railCollapsed = isRailControlled ? railCollapsedProp : railCollapsedState;
  const setRailCollapsed = (updater) => {
    const next = typeof updater === "function" ? updater(railCollapsed) : updater;
    if (isRailControlled) onRailCollapsedChange && onRailCollapsedChange(next);
    else setRailCollapsedState(next);
  };
  const statusOf = (i, s) => s.status || (i < activeStep ? "complete" : i === activeStep ? "active" : "todo");
  const [hovered, setHovered] = useState(false);
  const isFlyout = expandOnHover && railCollapsed && hovered;
  const expanded = !railCollapsed || isFlyout;
  const dockRight = dock === "right";
  const scrollRef = useRef(null);
  const [scrollable, setScrollable] = useState(false);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setScrollable(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    for (const child of el.children) ro.observe(child);
    window.addEventListener("resize", check);
    return () => { ro.disconnect(); window.removeEventListener("resize", check); };
  });

  return (
    <div style={{ width: railCollapsed ? 45 : 260, flexShrink: 0, position: "relative", height: "100%", marginLeft: dockRight ? "auto" : 0, transition: "width 150ms ease-in-out" }}>
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
      fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)",
      position: isFlyout ? "absolute" : "relative",
      top: 0, bottom: 0, [dockRight ? "right" : "left"]: 0,
      width: expanded ? 260 : 45, boxSizing: "border-box", height: "100%",
      display: "flex", flexDirection: "column", transition: "width 150ms ease-in-out, box-shadow 150ms ease-in-out",
      background: "var(--salt-container-primary-background)",
      boxShadow: isFlyout ? "var(--salt-shadow-low)" : "none",
      zIndex: isFlyout ? 50 : 1,
      borderLeft: !isFlyout && dockRight ? "var(--salt-size-fixed-100) solid var(--salt-separable-tertiary-borderColor)" : "none",
      borderRight: !isFlyout && !dockRight ? "var(--salt-size-fixed-100) solid var(--salt-separable-tertiary-borderColor)" : "none",
    }}>
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column" }}>
      {expanded ? (
        (headerTitle || headerDescription) && (
          <div style={{
            display: "flex", flexDirection: "column", gap: "var(--salt-spacing-100)",
            padding: "var(--salt-spacing-200) var(--salt-spacing-100)",
            position: "sticky", top: 0, zIndex: 1,
            background: "var(--salt-container-primary-background)",
          }}>
            {headerTitle && (
              <span style={{
                fontFamily: "var(--salt-text-h3-fontFamily)", fontWeight: "var(--salt-text-h3-fontWeight)",
                fontSize: "var(--salt-text-h3-fontSize)", lineHeight: "var(--salt-text-h3-lineHeight)",
                color: "var(--salt-content-primary-foreground)",
              }}>{headerTitle}</span>
            )}
            {headerDescription && (
              <span style={{
                fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)",
                color: "var(--salt-content-secondary-foreground)",
              }}>{headerDescription}</span>
            )}
          </div>
        )
      ) : (
        <div title={headerTitle ? `{${headerTitle}}` : "Progress"} style={{
          display: "flex", alignItems: "center", justifyContent: "center", minHeight: 36, boxSizing: "border-box",
          position: "sticky", top: 0, zIndex: 1,
          background: "var(--salt-container-primary-background)",
          borderTop: "1px solid var(--salt-color-gray-200)",
          color: "var(--salt-content-primary-foreground)",
        }}>
          <ListGlyph />
        </div>
      )}
      <StepList steps={steps} statusOf={statusOf} activeChild={activeChild} onStepClick={onStepClick} onChildClick={onChildClick} expanded={expanded} />
      </div>
      {showFooterToggle && (
        <div style={{
          position: "sticky", bottom: 0, marginTop: "auto", flexShrink: 0,
          borderTop: scrollable ? "1px solid var(--salt-color-gray-200)" : "none",
          background: "var(--salt-container-primary-background)",
          padding: expanded ? "var(--salt-spacing-100) var(--salt-spacing-100)" : "var(--salt-spacing-100) 0",
          display: "flex", justifyContent: expanded ? "stretch" : "center",
        }}>
          <button
            onClick={() => setRailCollapsed((c) => !c)}
            aria-label={railCollapsed ? "Expand" : "Collapse"}
            title={railCollapsed ? "Expand" : "Collapse"}
            style={{
              all: "unset", display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", minHeight: 32,
              justifyContent: expanded ? (dockRight ? "flex-start" : "flex-end") : "center", width: expanded ? "100%" : 32, height: 32, boxSizing: "border-box",
              padding: expanded ? "0 var(--salt-spacing-100)" : 0,
              margin: expanded ? 0 : "0 6px",
              borderRadius: "var(--salt-palette-corner-weaker)",
              cursor: "pointer", color: "var(--salt-content-primary-foreground)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--salt-color-gray-100)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <PanelGlyph name={dockRight ? (railCollapsed ? "panel-open-right-solid" : "panel-close-right") : (railCollapsed ? "panel-open-left-solid" : "panel-close-left")} />
          </button>
        </div>
      )}
    </div>
    </div>
  );
}
