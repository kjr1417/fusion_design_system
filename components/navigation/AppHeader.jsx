import React, { useState } from "react";

const STATUS_COLORS = {
  info: "var(--salt-palette-info, #2170ff)",
  success: "var(--salt-palette-positive, #22885a)",
  warning: "var(--salt-palette-warning, #b7690a)",
  error: "var(--salt-palette-negative, #d0343d)",
};

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M12 6.5v-1H1.915l3.147-3.146-.708-.707L0 6l4.353 4.354.707-.707L1.914 6.5z" />
  </svg>
);
const CopyIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="11" height="11" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M4 0h4.707L11 2.293V9H8v3H1V3h3zm1 1v7h5V4H7V1zm3 0v2h2v-.293L8.293 1zM2 4h2v5h3v2H2z" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="11" height="11" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.952 9.294 10 3.73 8.9 2.706 4.875 7.163 3.027 5.446 2 6.546z" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="10" height="10" aria-hidden="true">
    <path d="M8.593 5.618 9 6l-.407.382L3.661 11 3 10.236 7.524 6 3 1.764 3.66 1z" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="10" height="10" aria-hidden="true">
    <path d="M5.618 8.593 6 9l.382-.407L11 3.661 10.236 3 6 7.524 1.764 3 1 3.66z" />
  </svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.564.293a1 1 0 0 0-1.415 0L6.735 1.707l3.536 3.536 1.414-1.415a1 1 0 0 0 0-1.414zm-.354 1.06a.5.5 0 0 0-.707 0l-.354.354 2.122 2.121.353-.353a.5.5 0 0 0 0-.707z" />
    <path d="m7.442 3.828.707.708L4.26 8.425a.5.5 0 1 1-.707-.707z" />
    <path d="m8.857 5.243.707.707-4.243 4.242L0 12l1.786-5.343 4.207-4.208.707.707-4.03 4.031-.796 2.387.53.53 2.387-.795z" />
  </svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true">
    <path d="M5.5 0h1v7.114l2.682-2.682.707.707L6 9.03 2.11 5.14l.708-.707L5.5 7.114zM12 11v1H0v-1z" />
  </svg>
);

const iconBtnStyle = {
  boxSizing: "border-box", cursor: "pointer", font: "inherit",
  width: 28, height: 28, minWidth: 28, flexShrink: 0, padding: 0,
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  border: "none", borderRadius: "var(--salt-curve-50)",
  color: "var(--salt-content-primary-foreground)",
};

/**
 * Fusion AppHeader — 44px nested-page header pattern.
 * Left: back button, collapsing breadcrumbs (first + …-menu + last), optional
 * edit-title icon, a Divider, an optional version-select Menu, an optional
 * category Tag, and an optional CopyValue affordance.
 * Right: an optional Visualizer/Code-style ToggleButtonGroup, optional
 * secondary (bordered, never primary) action buttons, and a StatusBadge.
 *
 * Requires FusionDesignSystem_6db751 (Button, Divider, Tag, Menu,
 * ToggleButtonGroup) to be loaded on the page, plus ./AppHeader.css
 * (hover states + Menu dropdown theming not covered by salt-components.css).
 */
export function AppHeader({
  breadcrumbItems = [],
  showBackButton = true,
  onBack,
  showEditIcon = true,
  onEditTitle,
  showVersionMenu = true,
  version = "v2.4",
  versionHistory = [],
  onVersionSelect,
  showTag = true,
  tagLabel = "Beta",
  showCopyValue = true,
  copyValue = "",
  onCopy,
  showViewToggle = false,
  viewToggleOptions = [{ label: "Visualizer", value: "Visualizer" }, { label: "Code", value: "Code" }],
  onViewToggleChange,
  actions = [],
  statusType = "info",
  statusLabel = "Draft",
}) {
  const { Button, Divider, Tag, Menu, ToggleButtonGroup } = window.FusionDesignSystem_6db751;
  const [copied, setCopied] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(version);

  const parts = breadcrumbItems.length ? breadcrumbItems : [];
  let crumbs;
  if (parts.length > 2) {
    crumbs = [
      { ...parts[0], isFirst: true },
      { isMenu: true, menuItems: parts.slice(1, -1).map((p) => p.label) },
      { ...parts[parts.length - 1], isLast: true },
    ];
  } else {
    crumbs = parts.map((p, i) => ({ ...p, isFirst: i === 0, isLast: i === parts.length - 1 }));
  }

  const handleCopy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(copyValue).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    onCopy && onCopy(copyValue);
  };

  const handleVersionSelect = (v) => {
    setCurrentVersion(v);
    onVersionSelect && onVersionSelect(v);
  };

  const statusColor = STATUS_COLORS[statusType] || STATUS_COLORS.info;

  return (
    <header
      style={{
        height: 44, boxSizing: "border-box", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "var(--salt-spacing-100) var(--salt-spacing-200)",
        background: "var(--salt-container-primary-background, #fff)",
        borderBottom: "1px solid var(--salt-color-gray-200)", overflow: "visible", borderRadius: "inherit",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)", minWidth: 0, flex: "1 1 auto", overflow: "visible" }}>
        {showBackButton && (
          <button aria-label="Back" onClick={onBack} style={iconBtnStyle} className="ah-icon-btn">
            <ArrowLeftIcon />
          </button>
        )}

        <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)", flexShrink: 0, whiteSpace: "nowrap" }}>
          {crumbs.map((crumb, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              {i > 0 && <span style={{ display: "inline-flex", color: "var(--salt-content-secondary-foreground)", flexShrink: 0 }}><ChevronRightIcon /></span>}
              {crumb.isMenu ? (
                <Menu
                  items={crumb.menuItems}
                  trigger="…"
                  triggerProps={{
                    className: "ah-ellipsis-trigger",
                    style: { color: "var(--salt-content-secondary-foreground)", fontWeight: "var(--salt-text-fontWeight-strong)" },
                    "aria-label": "Show hidden breadcrumb levels",
                  }}
                />
              ) : (
                <span
                  onClick={crumb.href ? undefined : undefined}
                  style={
                    crumb.isLast
                      ? { color: "var(--salt-content-primary-foreground)", fontWeight: "var(--salt-text-fontWeight-strong)", whiteSpace: "nowrap" }
                      : { color: "var(--salt-content-secondary-foreground)", whiteSpace: "nowrap" }
                  }
                >
                  {crumb.label}
                </span>
              )}
              {crumb.isLast && showEditIcon && (
                <button aria-label="Edit page title" onClick={onEditTitle} className="ah-icon-btn" style={{ ...iconBtnStyle, width: 20, height: 20, color: "var(--salt-content-secondary-foreground)" }}>
                  <EditIcon />
                </button>
              )}
            </span>
          ))}
        </nav>

        <Divider orientation="vertical" style={{ height: 20, flexShrink: 0 }} />

        {showVersionMenu && (
          <Menu
            items={versionHistory}
            onSelect={handleVersionSelect}
            trigger={<span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{currentVersion}<span style={{ display: "inline-flex" }}><ChevronDownIcon /></span></span>}
            triggerProps={{ className: "ah-version-trigger", "aria-label": "Select version" }}
          />
        )}

        {showTag && (
          <div style={{ flexShrink: 0 }}>
            <Tag color="accent" bordered>{tagLabel}</Tag>
          </div>
        )}

        {showCopyValue && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--salt-typography-fontFamily-mono)", fontSize: 12, color: "var(--salt-content-secondary-foreground)", lineHeight: "16px", whiteSpace: "nowrap", minWidth: 0, flexShrink: 1, marginRight: 4, overflow: "hidden" }}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", minWidth: 40 }}>{copyValue}</span>
            <button
              onClick={handleCopy}
              aria-label="Copy value"
              title={copied ? "Copied" : "Copy value"}
              style={{ boxSizing: "border-box", border: "none", font: "inherit", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "var(--salt-curve-50)", color: "var(--salt-content-secondary-foreground)" }}
              className="ah-copy-btn"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0 }}>
        <div className="ah-actions" style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)" }}>
          {showViewToggle && <ToggleButtonGroup options={viewToggleOptions} defaultValue={viewToggleOptions[0]?.value} onChange={onViewToggleChange} />}
          {actions.map((action, i) => (
            <Button key={i} appearance="bordered" sentiment="neutral" onClick={action.onClick} style={{ height: 28 }}>
              {action.icon && <span style={{ display: "inline-flex", marginRight: 6, flexShrink: 0 }}>{action.icon}</span>}
              {action.label}
            </Button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", marginLeft: "var(--salt-spacing-100)", fontFamily: "var(--salt-text-fontFamily)", fontSize: 12, fontWeight: "var(--salt-text-fontWeight-strong)", color: "var(--salt-content-primary-foreground)", whiteSpace: "nowrap", flexShrink: 0 }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", border: `2px solid ${statusColor}`, background: "transparent", boxSizing: "border-box", flexShrink: 0 }} />
          <span>{statusLabel}</span>
        </div>
      </div>
    </header>
  );
}

export { DownloadIcon as AppHeaderDownloadIcon };
