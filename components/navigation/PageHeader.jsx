import React, { useState, useRef, useEffect } from "react";

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M12 6.5v-1H1.915l3.147-3.146-.708-.707L0 6l4.353 4.354.707-.707L1.914 6.5z" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="10" height="10" aria-hidden="true">
    <path d="M5.618 8.593 6 9l.382-.407L11 3.661 10.236 3 6 7.524 1.764 3 1 3.66z" />
  </svg>
);
const KebabIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true">
    <path d="M5 11V9H7V11H5Z" /><path d="M5 7L5 5H7L7 7H5Z" /><path d="M5 1V3H7V1L5 1Z" />
  </svg>
);

/**
 * Fusion PageHeader — full page-level header pattern (distinct from the
 * compact 44px AppHeader nested-page bar).
 * Requires FusionDesignSystem_6db751 (Button, Menu, Tag, StatusIndicator,
 * CopyValue, Tabs, Divider, Text/H1) plus ./PageHeader.css.
 */
export function PageHeader({
  showBreadcrumbNav = false,
  onBreadcrumbBack,
  breadcrumbMenuItems = [],
  onBreadcrumbMenuSelect,
  title,
  primaryAction,
  secondaryActions = [],
  tertiaryAction,
  overflowActions = [],
  onOverflowSelect,
  description,
  primaryTag,
  secondaryTag,
  status,
  copyValue,
  onCopy,
  dataLabels = [],
  tabs = [],
  activeTab = 0,
  onTabChange,
  style,
}) {
  const { Button, Menu, Tag, StatusIndicator, CopyValue, Tabs, Divider, H1, Text } = window.FusionDesignSystem_6db751;
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

  const hasMeta = primaryTag || secondaryTag || status || copyValue || dataLabels.length > 0;

  const metaItems = [];
  if (primaryTag) metaItems.push({ key: "primaryTag", node: <Tag color="accent">{primaryTag}</Tag>, gapAfter: secondaryTag ? "100" : "200" });
  if (secondaryTag) metaItems.push({ key: "secondaryTag", node: <Tag color="positive">{secondaryTag}</Tag>, gapAfter: "200" });
  if (status) metaItems.push({ key: "status", node: <StatusIndicator status={status.type || "info"} label={status.label} />, gapAfter: "200" });
  if (copyValue) metaItems.push({ key: "copyValue", node: <CopyValue value={copyValue} onCopy={onCopy} />, gapAfter: "200" });
  dataLabels.forEach((label, i) => metaItems.push({ key: `label-${i}`, node: <Text variant="label" color="secondary">{label}</Text>, gapAfter: "200" }));

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingTop: "var(--salt-spacing-300)", paddingLeft: "var(--salt-spacing-300)", paddingRight: "var(--salt-spacing-300)", fontFamily: "var(--salt-text-fontFamily)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
        {showBreadcrumbNav && (
          <div className="ph-seg-nav" style={{ marginRight: "var(--salt-spacing-200)" }}>
            <button type="button" className="ph-seg-btn" aria-label="Back" onClick={onBreadcrumbBack}>
              <ArrowLeftIcon />
            </button>
            <span className="ph-seg-divider" />
            <Menu
              items={breadcrumbMenuItems}
              onSelect={onBreadcrumbMenuSelect}
              trigger={<ChevronDownIcon />}
              triggerProps={{ className: "ph-seg-btn", "aria-label": "Show breadcrumb levels" }}
            />
          </div>
        )}
        <H1 style={{ minWidth: 0, flex: "0 1 auto", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: "var(--salt-spacing-200)" }}>{title}</H1>

        {primaryAction && (
          <Button appearance="solid" sentiment="accented" onClick={primaryAction.onClick} style={{ flexShrink: 0, marginRight: "var(--salt-spacing-50)" }}>{primaryAction.label}</Button>
        )}
        {secondaryActions.length > 0 && (
          <div className="ph-seg-group" style={{ flexShrink: 0, marginRight: "var(--salt-spacing-50)" }}>
            <button
              type="button"
              className="saltButton saltButton-neutral saltButton-solid ph-seg-group-btn"
              onClick={secondaryActions[0].onClick}
              style={{
                borderTopLeftRadius: "var(--salt-palette-corner-strongest)",
                borderBottomLeftRadius: "var(--salt-palette-corner-strongest)",
                borderTopRightRadius: secondaryActions.length > 1 ? 0 : "var(--salt-palette-corner-strongest)",
                borderBottomRightRadius: secondaryActions.length > 1 ? 0 : "var(--salt-palette-corner-strongest)",
              }}
            >
              {secondaryActions[0].label}
            </button>
            {secondaryActions.length > 1 && (
              <Menu
                items={secondaryActions.slice(1).map((a) => a.label)}
                onSelect={(label) => secondaryActions.slice(1).find((a) => a.label === label)?.onClick?.()}
                trigger={<ChevronDownIcon />}
                triggerProps={{
                  className: "saltButton saltButton-neutral saltButton-solid ph-seg-group-btn ph-seg-group-chevron",
                  "aria-label": "More secondary actions",
                }}
              />
            )}
          </div>
        )}
        {tertiaryAction && (
          <Button appearance="bordered" sentiment="neutral" onClick={tertiaryAction.onClick} style={{ flexShrink: 0, marginRight: "var(--salt-spacing-50)" }}>{tertiaryAction.label}</Button>
        )}
        {overflowActions.length > 0 && (
          <Menu
            items={overflowActions}
            onSelect={onOverflowSelect}
            trigger={<KebabIcon />}
            triggerProps={{ className: "ph-seg-btn ph-overflow-btn", "aria-label": "More actions", style: { flexShrink: 0 } }}
          />
        )}
      </div>

      {description && (
        !expanded ? (
          <div style={{ display: "flex", alignItems: "baseline", gap: "var(--salt-spacing-100)", minWidth: 0, marginTop: "var(--salt-spacing-150)", paddingTop: "var(--salt-spacing-75)", paddingBottom: "var(--salt-spacing-75)" }}>
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
              <button type="button" className="ph-view-more" onClick={() => setExpanded(true)}>View more</button>
            )}
          </div>
        ) : (
          <p
            style={{
              margin: 0, textWrap: "pretty", marginTop: "var(--salt-spacing-150)", paddingTop: "var(--salt-spacing-75)", paddingBottom: "var(--salt-spacing-75)",
              fontFamily: "var(--salt-text-fontFamily)", fontWeight: "var(--salt-text-fontWeight)",
              fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)",
              color: "var(--salt-content-secondary-foreground)",
            }}
          >
            {description}{" "}
            <button type="button" className="ph-view-more ph-view-more-inline" onClick={() => setExpanded(false)}>View less</button>
          </p>
        )
      )}

      {hasMeta && (
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginTop: "var(--salt-spacing-150)" }}>
          {metaItems.map((item, i) => (
            <div key={item.key} style={{ marginRight: i < metaItems.length - 1 ? `var(--salt-spacing-${item.gapAfter})` : 0 }}>{item.node}</div>
          ))}
        </div>
      )}

      {tabs.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "var(--salt-spacing-300)" }}>
          <Tabs items={tabs} defaultActive={activeTab} onChange={onTabChange} style={{ borderBottom: "none" }} />
          <Divider />
        </div>
      )}
    </div>
  );
}
