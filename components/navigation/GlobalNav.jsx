import React from "react";
import { Input } from "../forms/Input.jsx";
import { IconButton } from "../actions/IconButton.jsx";
import { Badge } from "../feedback/Badge.jsx";
import { Avatar } from "../display/Avatar.jsx";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ display: "block" }}>
      <circle cx="11" cy="11" r="7" {...stroke} />
      <line x1="16.5" y1="16.5" x2="21" y2="21" {...stroke} />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" style={{ display: "block" }}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" {...stroke} />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" {...stroke} />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" style={{ display: "block" }}>
      <polyline points="6 9 12 15 18 9" {...stroke} />
    </svg>
  );
}

function CmdKHint() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 8px",
        border: "1px solid var(--salt-color-gray-300)",
        borderRadius: 6,
        fontSize: 13,
        fontWeight: "var(--salt-text-fontWeight-strong)",
        lineHeight: 1,
        color: "var(--salt-content-secondary-foreground)",
        whiteSpace: "nowrap",
      }}
    >
      {"\u2318K"}
    </span>
  );
}

export function GlobalNav({
  logoSrc = "../../assets/logo.svg",
  logoAlt = "Fusion",
  searchPlaceholder = "Search Fusion Studio\u2026",
  searchValue,
  showSearch = true,
  userName = "Carolina A.",
  notificationCount = 3,
  onSearch,
  style,
  ...rest
}) {
  const searchProps = searchValue === undefined ? {} : { value: searchValue };
  return (
    <header
      className="fusionGlobalNav"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--salt-spacing-300)",
        padding: "14px 28px",
        background: "var(--salt-palette-background-secondary)",
        fontFamily: "var(--salt-text-fontFamily)",
        color: "var(--salt-content-primary-foreground)",
        ...style,
      }}
      {...rest}
    >
      <img src={logoSrc} alt={logoAlt} style={{ height: 26, width: "auto", display: "block", flexShrink: 0 }} />
      {showSearch ? (
        <div style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 560 }}>
            <Input
              placeholder={searchPlaceholder}
              startAdornment={<SearchIcon />}
              endAdornment={<CmdKHint />}
              onChange={onSearch}
              style={{ width: "100%" }}
              {...searchProps}
            />
          </div>
        </div>
      ) : (
        <div style={{ flex: 1 }} />
      )}
      <span style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
        <IconButton appearance="transparent" sentiment="neutral" aria-label="Notifications">
          <BellIcon />
        </IconButton>
        {notificationCount ? <Badge value={notificationCount} topRight /> : null}
      </span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "6px 12px 6px 8px",
          border: "1px solid var(--salt-color-gray-300)",
          borderRadius: 999,
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <Avatar name={userName} size={26} />
        <span style={{ fontSize: 16, fontWeight: "var(--salt-text-fontWeight-strong)", letterSpacing: ".03em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{userName}</span>
        <ChevronDown />
      </span>
    </header>
  );
}
