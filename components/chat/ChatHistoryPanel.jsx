import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import { ChatIcon } from "./chatIcons.jsx";

const WIDTH_EXPANDED = 300;
const WIDTH_COLLAPSED = 45;

function ChatRow({ item, query, onRenameRequest }) {
  const { Menu, HighlightMatch } = window.FusionDesignSystem_6db751;
  const [hovered, setHovered] = useState(false);
  const showHoverLook = hovered || item.hovered;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", display: "flex", alignItems: "center", minHeight: 32, borderRadius: "var(--salt-palette-corner-weaker)", padding: "var(--salt-spacing-50) var(--salt-spacing-100) var(--salt-spacing-50) 0", background: showHoverLook ? "var(--salt-actionable-subtle-background-hover)" : "transparent" }}
    >
      {item.active && <span style={{ position: "absolute", left: "var(--salt-spacing-50)", top: "var(--salt-spacing-50)", bottom: "var(--salt-spacing-50)", width: 3, borderRadius: 2, background: "var(--salt-palette-accent)" }} />}
      <button
        onClick={item.onClick}
        title={item.title}
        style={{ all: "unset", boxSizing: "border-box", display: "flex", alignItems: "center", minWidth: 0, flex: 1, cursor: "pointer", paddingLeft: 35, fontFamily: "inherit" }}
      >
        <span style={{ display: "flex", alignItems: "center", minWidth: 0, flex: "0 1 auto" }}>
          <span style={{ minWidth: 0, flex: "0 1 auto", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 14, fontWeight: item.active ? "var(--salt-text-fontWeight-strong, 700)" : 400, color: "var(--salt-content-primary-foreground)" }}><HighlightMatch text={item.title} query={query} /></span>
          {item.draft && <span aria-label="Draft" style={{ marginLeft: "var(--salt-spacing-100)", width: 8, height: 8, minWidth: 8, borderRadius: "50%", background: "var(--salt-sentiment-accent-background)", flexShrink: 0 }} />}
        </span>
      </button>
      <span style={{ marginLeft: "var(--salt-spacing-100)", flexShrink: 0, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", opacity: showHoverLook ? 1 : 0, pointerEvents: showHoverLook ? "auto" : "none" }}>
        <Menu
          items={item.menuItems || ["Rename", "Share", "Delete"]}
          onSelect={(v) => { if (v === "Rename") { onRenameRequest && onRenameRequest(item); return; } item.onMenuSelect && item.onMenuSelect(v); }}
          trigger={<ChatIcon name="micro-menu" size={14} />}
          triggerAppearance="transparent"
          triggerProps={{ "aria-label": "Chat options", title: "Chat options", tabIndex: showHoverLook ? 0 : -1 }}
        />
      </span>
    </div>
  );
}

/**
 * Fusion ChatHistoryPanel — a left-anchored, fixed-width chat-list rail
 * (300px expanded, 45px collapsed — never resizable). New chat button
 * (primary), search, and grouped/date-labeled chat rows, plus a footer
 * toggle ported from VerticalNavigation (same panel-open-left_solid /
 * panel-close-left glyphs). Collapsed, New Chat/Search/Expand render as
 * centered icon buttons; hovering Search or the footer flies the rail
 * out to 300px (hovering New Chat does not — it only fires `onNewChat`
 * on click). Each row: a full-height (minus row padding) active accent
 * bar, a draft dot (accent-background, spacing-100 right of the title,
 * never hidden — the title truncates first), and a hover-revealed
 * transparent kebab opening a Menu. Selecting "Rename" from that menu
 * opens the same rename Dialog pattern as ChatHeader (single "Title"
 * field); Save calls `onRenameChat(id, title)`.
 * Requires FusionDesignSystem_6db751 (Button, IconButton, Input, Menu,
 * Dialog, FormField).
 */
export function ChatHistoryPanel({
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  expandOnHover = true,
  onNewChat,
  hideNewChat = false,
  searchable = true,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search chats",
  groups = [],
  emptyStateText = "No conversations yet.",
  onRenameChat,
  style,
}) {
  const { Button, IconButton, Input, Dialog, FormField } = window.FusionDesignSystem_6db751;
  const isControlled = collapsedProp !== undefined;
  const [collapsedState, setCollapsedState] = useState(defaultCollapsed);
  const [flyoutHover, setFlyoutHover] = useState(false);
  const [renaming, setRenaming] = useState(null);
  const [renameDraft, setRenameDraft] = useState("");
  const [hasMoreBelow, setHasMoreBelow] = useState(false);
  const listRef = useRef(null);
  const recomputeScrollBorder = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setHasMoreBelow(el.scrollHeight - el.scrollTop - el.clientHeight > 1);
  }, []);
  const collapsed = isControlled ? collapsedProp : collapsedState;
  const setCollapsed = (v) => { isControlled ? (onCollapsedChange && onCollapsedChange(v)) : setCollapsedState(v); };

  const isFlyout = collapsed && expandOnHover && flyoutHover;
  const expanded = !collapsed || isFlyout;
  const query = searchValue.trim();
  const filteredGroups = query
    ? groups.map((g) => ({ ...g, items: (g.items || []).filter((it) => it.title.toLowerCase().includes(query.toLowerCase())) }))
    : groups;
  const hasChats = filteredGroups.some((g) => (g.items || []).length > 0);

  useLayoutEffect(() => {
    recomputeScrollBorder();
    const el = listRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(recomputeScrollBorder);
    ro.observe(el);
    return () => ro.disconnect();
  }, [recomputeScrollBorder, filteredGroups, expanded]);

  return (
    <div style={{ width: collapsed ? WIDTH_COLLAPSED : WIDTH_EXPANDED, flexShrink: 0, position: "relative", height: "100%" }}>
      <div
        onMouseLeave={() => setFlyoutHover(false)}
        style={{
          position: isFlyout ? "absolute" : "relative", top: 0, left: 0, bottom: 0,
          width: expanded ? WIDTH_EXPANDED : WIDTH_COLLAPSED, height: "100%",
          display: "flex", flexDirection: "column", boxSizing: "border-box",
          background: "var(--salt-palette-background-secondary)",
          borderRight: isFlyout ? "none" : "1px solid var(--salt-separable-secondary-borderColor)",
          boxShadow: isFlyout ? "var(--salt-shadow-low)" : "none",
          zIndex: isFlyout ? 50 : 1,
          fontFamily: "var(--salt-text-fontFamily)",
          ...style,
        }}
      >
        <div style={{ paddingTop: "var(--salt-spacing-200)", paddingLeft: "var(--salt-spacing-100)", paddingRight: "var(--salt-spacing-100)", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: expanded ? "stretch" : "center", gap: "var(--salt-spacing-200)" }}>
          {!hideNewChat && (
            expanded ? (
              <Button appearance="solid" sentiment="accented" onClick={onNewChat} style={{ width: "100%", justifyContent: "center", gap: 8 }}>
                <ChatIcon name="add" size={14} />New chat
              </Button>
            ) : (
              <IconButton appearance="solid" sentiment="accented" aria-label="New chat" title="New chat" onClick={onNewChat}>
                <ChatIcon name="add" size={14} />
              </IconButton>
            )
          )}
          {searchable && (
            expanded ? (
              <Input value={searchValue} onChange={(e) => onSearchChange && onSearchChange(e.target.value)} placeholder={searchPlaceholder} startAdornment={<ChatIcon name="search" size={14} />} size="small" />
            ) : (
              <div onMouseEnter={() => setFlyoutHover(true)}>
                <IconButton appearance="transparent" sentiment="neutral" aria-label="Search chats" title="Search chats">
                  <ChatIcon name="search" size={14} />
                </IconButton>
              </div>
            )
          )}
        </div>

        <div ref={listRef} onScroll={recomputeScrollBorder} style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: expanded ? "var(--salt-spacing-200) var(--salt-spacing-100) 0" : "var(--salt-spacing-200) 0 0" }}>
          {expanded && !hasChats && (
            <div style={{ padding: "var(--salt-spacing-200)", fontSize: 13, color: "var(--salt-content-secondary-foreground)", textAlign: "center" }}>{query ? "No matching chats." : emptyStateText}</div>
          )}
          {expanded && filteredGroups.map((group, gi) => (group.items && group.items.length > 0) && (
            <div key={gi} style={{ marginTop: gi === 0 ? 0 : "var(--salt-spacing-200)" }}>
              <div style={{ padding: "0 0 var(--salt-spacing-100)", fontSize: 12, fontWeight: "var(--salt-text-fontWeight-strong, 700)", color: "var(--salt-content-secondary-foreground)", textTransform: "uppercase", letterSpacing: ".03em" }}>{group.label}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-fixed-100)" }}>
                {group.items.map((item) => <ChatRow key={item.id} item={item} query={query} onRenameRequest={(it) => { setRenaming(it); setRenameDraft(it.title); }} />)}
              </div>
            </div>
          ))}
        </div>

        <div
          onMouseEnter={() => setFlyoutHover(true)}
          style={{ borderTop: hasMoreBelow ? "1px solid var(--salt-separable-secondary-borderColor)" : "1px solid transparent", padding: expanded ? "var(--salt-spacing-100) var(--salt-spacing-100) var(--salt-spacing-200)" : "var(--salt-spacing-100) 0 var(--salt-spacing-200)", flexShrink: 0, display: "flex", justifyContent: "center" }}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand" : "Collapse"}
            title={collapsed ? "Expand" : "Collapse"}
            style={{
              all: "unset", display: "flex", alignItems: "center", minHeight: 32, boxSizing: "border-box",
              justifyContent: expanded ? "flex-end" : "center",
              padding: expanded ? "0 var(--salt-spacing-100)" : 0,
              width: expanded ? "100%" : "auto",
              margin: expanded ? 0 : "0 6px",
              borderRadius: "var(--salt-palette-corner-weaker)",
              cursor: "pointer", color: "var(--salt-content-primary-foreground)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--salt-actionable-subtle-background-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {collapsed ? <ChatIcon name="panel-open-left-solid" size={16} /> : <ChatIcon name="panel-close-left" size={16} />}
          </button>
        </div>
      </div>

      {renaming && (
        <Dialog
          open={!!renaming}
          title="Rename chat"
          onClose={() => setRenaming(null)}
          actions={<>
            <Button appearance="bordered" sentiment="neutral" onClick={() => setRenaming(null)}>Cancel</Button>
            <Button appearance="solid" sentiment="accented" onClick={() => { onRenameChat && onRenameChat(renaming.id, renameDraft.trim() || renaming.title); setRenaming(null); }}>Save</Button>
          </>}
        >
          <FormField label="Title">
            <Input value={renameDraft} onChange={(e) => setRenameDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { onRenameChat && onRenameChat(renaming.id, renameDraft.trim() || renaming.title); setRenaming(null); } }} autoFocus />
          </FormField>
        </Dialog>
      )}
    </div>
  );
}
