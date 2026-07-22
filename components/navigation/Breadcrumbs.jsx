import React from "react";

const ChevronRightIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="10" height="10" aria-hidden="true">
    <path d="M8.593 5.618 9 6l-.407.382L3.661 11 3 10.236 7.524 6 3 1.764 3.66 1z" />
  </svg>
);

export function Breadcrumbs({ items = [] }) {
  const { Menu } = window.FusionDesignSystem_6db751;

  let crumbs;
  if (items.length > 2) {
    crumbs = [
      { ...items[0], isFirst: true },
      { isMenu: true, menuItems: items.slice(1, -1).map((p) => p.label) },
      { ...items[items.length - 1], isLast: true },
    ];
  } else {
    crumbs = items.map((it, i) => ({ ...it, isFirst: i === 0, isLast: i === items.length - 1 }));
  }

  return (
    <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)", flexWrap: "wrap" }}>
      {crumbs.map((crumb, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {i > 0 && <span style={{ display: "inline-flex", color: "var(--salt-content-secondary-foreground)", flexShrink: 0 }}><ChevronRightIcon /></span>}
          {crumb.isMenu ? (
            <Menu
              items={crumb.menuItems}
              trigger="…"
              triggerProps={{ className: "bc-ellipsis", "aria-label": "Show hidden breadcrumb levels" }}
            />
          ) : crumb.isLast ? (
            <span style={{ color: "var(--salt-content-primary-foreground)", fontWeight: "var(--salt-text-fontWeight-strong)", whiteSpace: "nowrap" }}>{crumb.label}</span>
          ) : (
            <a href={crumb.href || "#"} className="saltLink saltText" style={{ color: "var(--salt-content-secondary-foreground)", whiteSpace: "nowrap" }}>{crumb.label}</a>
          )}
        </span>
      ))}
    </nav>
  );
}
