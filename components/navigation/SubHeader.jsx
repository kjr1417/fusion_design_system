import React, { useState, useRef, useEffect } from "react";

const KebabIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true">
    <path d="M5 11V9H7V11H5Z" /><path d="M5 7L5 5H7L7 7H5Z" /><path d="M5 1V3H7V1L5 1Z" />
  </svg>
);

/**
 * Fusion SubHeader — compact header pattern: title, up to two bordered
 * neutral action buttons, an optional tertiary transparent icon button,
 * and a section description. No breadcrumb nav, metadata, or tabs, and no
 * outer pattern padding (the parent controls placement).
 * Requires FusionDesignSystem_6db751 (Button, IconButton, Text/H1) plus
 * ./SubHeader.css.
 */
export function SubHeader({ title, actions = [], tertiaryAction, description, style }) {
  const { Button, IconButton, H2 } = window.FusionDesignSystem_6db751;
  const visibleActions = actions.slice(0, 2);
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const check = () => setTruncated(el.scrollWidth > el.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    window.addEventListener("resize", check);
    return () => { ro.disconnect(); window.removeEventListener("resize", check); };
  }, [description, expanded]);

  return (
    <div style={{ display: "flex", flexDirection: "column", fontFamily: "var(--salt-text-fontFamily)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
        <H2 style={{ minWidth: 0, flex: "0 1 auto", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: (visibleActions.length > 0 || tertiaryAction) ? "var(--salt-spacing-300)" : 0 }}>{title}</H2>
        {visibleActions.map((action, i) => (
          <Button
            key={i}
            appearance="bordered"
            sentiment="neutral"
            onClick={action.onClick}
            style={{ flexShrink: 0, marginRight: (i < visibleActions.length - 1 || tertiaryAction) ? "var(--salt-spacing-100)" : 0 }}
          >
            {action.label}
          </Button>
        ))}
        {tertiaryAction && (
          <IconButton appearance="transparent" sentiment="neutral" aria-label={tertiaryAction.label} onClick={tertiaryAction.onClick} style={{ flexShrink: 0 }}>
            <KebabIcon />
          </IconButton>
        )}
      </div>

      {description && (
        !expanded ? (
          <div style={{ display: "flex", alignItems: "baseline", gap: "var(--salt-spacing-100)", minWidth: 0, marginTop: "var(--salt-spacing-200)" }}>
            <p
              ref={textRef}
              style={{
                margin: 0, flex: "1 1 auto", minWidth: 0,
                fontFamily: "var(--salt-text-fontFamily)", fontWeight: "var(--salt-text-fontWeight)",
                fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)",
                color: "var(--salt-content-secondary-foreground)",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}
            >
              {description}
            </p>
            {truncated && (
              <button type="button" className="sh-view-more" onClick={() => setExpanded(true)}>View more</button>
            )}
          </div>
        ) : (
          <p
            style={{
              margin: 0, textWrap: "pretty", marginTop: "var(--salt-spacing-200)",
              fontFamily: "var(--salt-text-fontFamily)", fontWeight: "var(--salt-text-fontWeight)",
              fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)",
              color: "var(--salt-content-secondary-foreground)",
            }}
          >
            {description}{" "}
            <button type="button" className="sh-view-more sh-view-more-inline" onClick={() => setExpanded(false)}>View less</button>
          </p>
        )
      )}
    </div>
  );
}
