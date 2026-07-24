import React, { useState } from "react";

const GLYPHS = {
  home: "M0 4.875 6 0l6 4.875L11 6l-1-.825V12H7V9H5v3H2V5.095L.875 6zm3-.585V11h1V8h4v3h1V4.35L6 1.875z",
  "chart-pie": "M4.5 2.626a4.002 4.002 0 0 0 1 7.874v1a5 5 0 0 1 0-10v5h5a5 5 0 0 1-5 5v-1a4 4 0 0 0 3.874-3H4.5z|M6.5.5a5 5 0 0 1 5 5h-5zm1 4h2.874A4.01 4.01 0 0 0 7.5 1.626z",
  database: "M2 2.25h1v1H2zm1 6.5H2v1h1zm2 0H4v1h1zm0-6.5H4v1h1z|M0 5.5V0h12v5.5zM1 1h10v3.5H1zM0 12V6.5h12V12zm1-4.5h10V11H1z",
  settings: "M9 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0|M10.752 2.618a1 1 0 0 1-1.273-1.507A6 6 0 0 0 6.997.082.997.997 0 0 1 6 1a1 1 0 0 1-.997-.918 5.96 5.96 0 0 0-2.482 1.03 1 1 0 0 1-.057 1.352 1 1 0 0 1-1.353.057A6 6 0 0 0 .082 5.003.997.997 0 0 1 1 6a1 1 0 0 1-.918.997 5.96 5.96 0 0 0 1.03 2.482 1 1 0 0 1 1.352.057 1 1 0 0 1 .057 1.353 6 6 0 0 0 2.482 1.029.999.999 0 0 1 1.994 0 5.95 5.95 0 0 0 2.482-1.03 1 1 0 0 1 1.41-1.41 6 6 0 0 0 1.029-2.481.999.999 0 0 1 0-1.994 5.95 5.95 0 0 0-1.03-2.482q-.064.055-.136.097M6 2c.632 0 1.196-.293 1.562-.751q.36.118.693.287a2 2 0 0 0 .573 1.636 2 2 0 0 0 1.636.573q.169.333.287.693C10.293 4.804 10 5.368 10 6s.293 1.196.751 1.562q-.118.36-.287.693a2 2 0 0 0-1.636.573 2 2 0 0 0-.573 1.636 5 5 0 0 1-.693.287A2 2 0 0 0 6 10c-.632 0-1.196.293-1.562.751a5 5 0 0 1-.693-.287 2 2 0 0 0-.573-1.636 2 2 0 0 0-1.636-.573 5 5 0 0 1-.287-.693C1.707 7.196 2 6.632 2 6s-.293-1.196-.751-1.562q.118-.36.287-.693a2 2 0 0 0 1.636-.573 2 2 0 0 0 .573-1.636q.333-.169.693-.287C4.804 1.707 5.368 2 6 2",
  users: "circle:4,3,1.5|circle:8,3,1.5|M1 10c0-1.5 1-2.5 3-2.5s3 1 3 2.5M5 10c0-1.5 1-2.5 3-2.5s3 1 3 2.5",
  help: "M6.08 2.25c.14 0 .29.01.43.04.14.02.27.06.4.1.12.05.24.1.35.16.12.06.22.13.32.21.09.08.17.18.24.28.08.1.14.21.2.33.05.12.09.26.12.4.03.13.05.28.05.44 0 .11-.01.21-.02.3l-.08.24c-.03.09-.07.17-.1.24l-.14.19-.16.21-.13.13-.13.13-.16.16-.09.09-.12.11-.06.06-.05.07-.04.06-.03.06-.03.07-.02.06-.01.07-.01.08v1.1H4.87v-1.05l.01-.14.02-.14.03-.11.04-.1.07-.11.06-.06.06-.06.14-.14.77-.79c.09-.09.15-.18.19-.28.04-.1.06-.22.06-.35 0-.13-.02-.25-.07-.35-.04-.11-.1-.2-.18-.29-.09-.08-.19-.13-.3-.17-.11-.05-.23-.07-.35-.07-.14 0-.27.03-.39.08-.12.05-.22.11-.31.2-.09.09-.16.2-.22.31-.05.12-.08.24-.1.38l-1.27-.09c.02-.16.06-.31.1-.45.04-.14.09-.27.15-.4.06-.12.13-.24.21-.34l.28-.28c.11-.09.22-.16.35-.22.13-.06.27-.11.42-.14.15-.03.31-.05.48-.05z|M5.96 8.03c.11 0 .21.02.3.06.1.04.18.09.26.16.08.08.14.16.18.26.05.09.07.18.07.28 0 .11-.02.21-.06.3-.04.09-.1.17-.18.25-.08.08-.17.14-.27.18-.1.04-.2.06-.31.06-.05 0-.1 0-.15-.01l-.15-.03-.14-.06-.14-.07-.09-.08-.09-.09-.08-.1-.06-.1-.05-.11-.02-.11-.01-.13c0-.11.02-.21.06-.3.04-.09.1-.17.18-.25.08-.08.17-.14.27-.18.09-.04.19-.06.3-.06z|M12 12V0H0v12zM1 1.01h10v10H1z",
  "panel-close-left": "M12 12H0V0H12V12ZM1 11H3V1H1V11ZM4 11H11V1H4V11ZM8.53516 3.87891L6.91406 5.5H10V6.5H6.91406L8.53516 8.12109L7.82812 8.82812L5 6L7.82812 3.17188L8.53516 3.87891Z",
  "panel-open-right": "M12 12H0V0H12V12ZM8 11H11V1H8V11ZM2 6L4.82812 8.82812L5.53516 8.12109L3.91406 6.5H7V5.5H3.91406L5.53516 3.87891L4.82812 3.17188L2 6Z",
  "panel-open-left-solid": "M12 12H0V0H12V12ZM1 11H4.00391V1H1V11ZM6.46875 3.87891L8.08984 5.5H5.00391V6.5H8.08984L6.46875 8.12109L7.17578 8.82812L10.0039 6L7.17578 3.17188L6.46875 3.87891Z",
};

function Glyph({ name, size = 12 }) {
  const spec = GLYPHS[name];
  if (!spec) return <span style={{ width: size, height: size, flexShrink: 0, display: "inline-block" }} />;
  const parts = spec.split("|");
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, display: "block" }}>
      {parts.map((p, i) =>
        p.startsWith("circle:") ? (
          (() => { const [cx, cy, r] = p.slice(7).split(",").map(Number); return <circle key={i} cx={cx} cy={cy} r={r} />; })()
        ) : (
          <path key={i} d={p} />
        )
      )}
    </svg>
  );
}

function ChevronDown({ size = 12 }) {
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M5.618 8.593 6 9l.382-.407L11 3.661 10.236 3 6 7.524 1.764 3 1 3.66z" />
    </svg>
  );
}

function Level2Item({ item, activeId, onNavigate, indent = 48 }) {
  const active = item.id === activeId;
  return (
    <a
      href={item.href || "#"}
      onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(item); } }}
      style={{
        display: "flex", alignItems: "center", minHeight: 32, position: "relative",
        padding: `var(--salt-spacing-25) var(--salt-spacing-100) var(--salt-spacing-25) ${indent}px`,
        borderRadius: "var(--salt-palette-corner-weaker)",
        textDecoration: "none", cursor: "pointer",
        fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-h4-fontSize)",
        fontWeight: "var(--salt-text-fontWeight)",
        color: active ? "var(--salt-palette-accent)" : "var(--salt-content-primary-foreground)",
        background: "transparent",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--salt-color-gray-100)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      {active && <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 28, background: "var(--salt-palette-accent)" }} />}
      {item.label}
    </a>
  );
}

function Level0Section({ item, activeId, toggle, openIds, onNavigate, expanded, showIcon = true }) {
  const hasChildren = !!(item.items && item.items.length);
  const open = openIds.includes(item.id);
  const active = item.id === activeId;

  if (!expanded) {
    if (!showIcon) return null;
    return (
      <div style={{ position: "relative" }}>
        {active && <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 28, background: "var(--salt-palette-accent)" }} />}
        <a
          href={hasChildren ? undefined : item.href || "#"}
          onClick={(e) => { if (!hasChildren && onNavigate) { e.preventDefault(); onNavigate(item); } }}
          title={item.label}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", height: 32, margin: "2px 6px",
            borderRadius: "var(--salt-palette-corner-weaker)", cursor: "pointer", textDecoration: "none",
            color: active ? "var(--salt-palette-accent)" : "var(--salt-content-secondary-foreground)",
            background: "transparent",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--salt-color-gray-100)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <Glyph name={item.icon} />
        </a>
      </div>
    );
  }

  return (
    <div>
      <a
        href={hasChildren ? undefined : item.href || "#"}
        onClick={(e) => {
          if (hasChildren) { toggle(item.id); return; }
          if (onNavigate) { e.preventDefault(); onNavigate(item); }
        }}
        aria-expanded={hasChildren ? open : undefined}
        style={{
          display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", minHeight: 36, position: "relative",
          padding: "var(--salt-spacing-50) var(--salt-spacing-100) var(--salt-spacing-50) calc(3px + var(--salt-spacing-75))",
          borderRadius: "var(--salt-palette-corner-weaker)",
          textDecoration: "none", cursor: "pointer",
          fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-h4-fontSize)",
          fontWeight: "var(--salt-text-fontWeight-strong)",
          color: active ? "var(--salt-palette-accent)" : "var(--salt-content-primary-foreground)",
          background: "transparent",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--salt-color-gray-100)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      >
        {active && <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 28, background: "var(--salt-palette-accent)" }} />}
        {showIcon && <Glyph name={item.icon} />}
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>
        {hasChildren && <span style={{ transform: open ? "rotate(180deg)" : "none", display: "inline-flex", transition: "transform 150ms ease-in-out" }}><ChevronDown /></span>}
      </a>
      {hasChildren && open && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-fixed-100)", marginTop: 2, marginBottom: 6 }}>
          {item.items.map((child) => (
            <Level2Item key={child.id} item={child} activeId={activeId} onNavigate={onNavigate} indent={showIcon ? 39 : 15} />
          ))}
        </div>
      )}
    </div>
  );
}

export function VerticalNavigation({
  items = [],
  collapsible = false,
  defaultCollapsed = false,
  expandOnHover = false,
  defaultOpenIds = [],
  activeId,
  onNavigate,
  showIcons = true,
  showFooterToggle = true,
  collapsed: collapsedProp,
  onCollapsedChange,
  supportLabel = "Support",
  supportIcon = "help",
  supportHref = "#",
  onSupportClick,
  style,
  ...rest
}) {
  const isControlled = collapsedProp !== undefined;
  const [collapsedState, setCollapsedState] = useState(collapsible && defaultCollapsed);
  const [openIds, setOpenIds] = useState(defaultOpenIds);
  const [hovered, setHovered] = useState(false);

  const collapsed = isControlled ? collapsedProp : collapsedState;
  const setCollapsed = (updater) => {
    const next = typeof updater === "function" ? updater(collapsed) : updater;
    if (isControlled) onCollapsedChange && onCollapsedChange(next);
    else setCollapsedState(next);
  };

  const toggle = (id) => setOpenIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  const isFlyout = (collapsible || isControlled) && expandOnHover && collapsed && hovered;
  const expanded = !collapsed || isFlyout;
  const widthCollapsed = showIcons ? 45 : 0;
  const widthExpanded = 230;

  return (
    <div style={{ width: (collapsible || isControlled) && collapsed ? widthCollapsed : widthExpanded, flexShrink: 0, position: "relative", height: "100%", transition: "width 150ms ease-in-out" }}>
      <nav
        aria-label="Primary"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: isFlyout ? "absolute" : "relative",
          top: 0, left: 0, bottom: 0,
          width: expanded ? widthExpanded : widthCollapsed,
          height: "100%",
          display: "flex", flexDirection: "column",
          paddingTop: "var(--salt-spacing-200)", paddingBottom: "var(--salt-spacing-200)",
          background: "var(--salt-palette-background-primary)",
          borderRight: isFlyout ? "none" : "1px solid var(--salt-color-gray-200)",
          boxShadow: isFlyout ? "var(--salt-shadow-low)" : "none",
          zIndex: isFlyout ? 50 : 1,
          boxSizing: "border-box",
          transition: "width 150ms ease-in-out, box-shadow 150ms ease-in-out",
          fontFamily: "var(--salt-text-fontFamily)",
          ...style,
        }}
        {...rest}
      >
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: expanded ? "0 var(--salt-spacing-100)" : "0", display: "flex", flexDirection: "column", gap: "var(--salt-spacing-fixed-100)" }}>
          {items.map((item) => (
            <Level0Section key={item.id} item={item} activeId={activeId} openIds={openIds} toggle={toggle} onNavigate={onNavigate} expanded={expanded} showIcon={showIcons} />
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--salt-color-gray-200)", padding: expanded ? "var(--salt-spacing-100) var(--salt-spacing-100) 0" : "var(--salt-spacing-100) 0 0", display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}>
          <a
            href={supportHref}
            onClick={(e) => { if (onSupportClick) { e.preventDefault(); onSupportClick(); } }}
            title="Support"
            style={{
              display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", minHeight: 32, boxSizing: "border-box",
              justifyContent: expanded ? "flex-start" : "center",
              padding: expanded ? "0 var(--salt-spacing-100)" : 0,
              margin: expanded ? 0 : "0 6px",
              borderRadius: "var(--salt-palette-corner-weaker)",
              textDecoration: "none", cursor: "pointer",
              fontSize: "var(--salt-text-h4-fontSize)", color: "var(--salt-content-primary-foreground)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--salt-color-gray-100)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {showIcons && <Glyph name={supportIcon} />}
            {expanded && <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{supportLabel}</span>}
          </a>

          {collapsible && showFooterToggle && (
            <button
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expand" : "Collapse"}
              title={collapsed ? "Expand" : "Collapse"}
              style={{
                all: "unset", display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", minHeight: 32,
                justifyContent: expanded ? "flex-end" : "center",
                padding: expanded ? "0 var(--salt-spacing-100)" : 0,
                margin: expanded ? 0 : "0 6px",
                borderRadius: "var(--salt-palette-corner-weaker)",
                cursor: "pointer", color: "var(--salt-content-primary-foreground)",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--salt-color-gray-100)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <Glyph name={collapsed ? "panel-open-left-solid" : "panel-close-left"} />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
