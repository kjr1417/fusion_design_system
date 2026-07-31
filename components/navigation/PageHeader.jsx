import React from "react";

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
 * compact 44px AppHeader nested-page bar). Title-row actions (primary,
 * secondary, tertiary) render as a single InlineButtons group immediately
 * after the title.
 * Requires FusionDesignSystem_6db751 (InlineButtons, Menu, Tag, StatusBadge,
 * CopyValue, Tabs, Divider, Text/H1, ExpandableText) plus ./PageHeader.css.
 */
export function PageHeader(props) {
  const {
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
  } = props;
  const { Menu, Tag, StatusBadge, CopyValue, Tabs, Divider, H1, Text, ExpandableText, InlineButtons } = window.FusionDesignSystem_6db751;

  const hasMeta = primaryTag || secondaryTag || status || copyValue || dataLabels.length > 0;

  const metaItems = [];
  if (primaryTag) metaItems.push({ key: "primaryTag", node: <Tag color="accent">{primaryTag}</Tag>, gapAfter: secondaryTag ? "100" : "200" });
  if (secondaryTag) metaItems.push({ key: "secondaryTag", node: <Tag color="positive">{secondaryTag}</Tag>, gapAfter: "200" });
  if (status) metaItems.push({ key: "status", node: <StatusBadge status={status.label} />, gapAfter: "200" });
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

        {(primaryAction || secondaryActions.length > 0 || tertiaryAction) && (
          <InlineButtons
            direction="left-to-right"
            primaryAction={primaryAction}
            secondaryActions={secondaryActions}
            tertiaryActions={tertiaryAction ? [tertiaryAction] : []}
            style={{ flexShrink: 0, marginRight: "var(--salt-spacing-50)" }}
          />
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
        <ExpandableText text={description} lines={1} style={{ marginTop: "var(--salt-spacing-150)", paddingTop: "var(--salt-spacing-75)", paddingBottom: "var(--salt-spacing-75)" }} />
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
