import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from "react";

const MIN_WIDTH = 320;
const DEFAULT_WIDTH = 400;
const MAX_WIDTH = 640;

const stroke12 = { fill: "currentColor" };

function NotificationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 12 12" style={stroke12} aria-hidden="true">
      <path d="M2.004 6V3q0-.62.234-1.16.235-.55.633-.95.41-.41.961-.656A3 3 0 0 1 5.004 0h1.992q.621 0 1.172.234.55.246.95.657.409.398.644.949.234.54.234 1.16v3q.152.855.399 1.36.257.503.609.644H12V9H0v-.996h.996q.351-.141.598-.645.258-.504.41-1.359m7.605 2.004a3.7 3.7 0 0 1-.351-.809 9 9 0 0 1-.246-1.02L9 6V3q0-.82-.586-1.406a1.93 1.93 0 0 0-1.418-.586H5.004q-.832 0-1.418.586T3 3v3l-.012.176q-.105.563-.246 1.02-.14.456-.351.808zM6 12a1.52 1.52 0 0 1-1.066-.41 1.27 1.27 0 0 1-.434-.973v-.609h3v.609q0 .574-.445.973Q6.62 12 6 12" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" style={stroke12} aria-hidden="true">
      <path d="m5.999 5.292 3.89-3.888.707.707L6.707 6l3.889 3.889-.707.708-3.89-3.89-3.889 3.89-.707-.708L5.292 6 1.403 2.111l.707-.708z" />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" style={stroke12} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M9 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
      <path fillRule="evenodd" clipRule="evenodd" d="M10.752 2.618a1 1 0 0 1-1.273-1.507A6 6 0 0 0 6.997.082.997.997 0 0 1 6 1a1 1 0 0 1-.997-.918 5.96 5.96 0 0 0-2.482 1.03 1 1 0 0 1-.057 1.352 1 1 0 0 1-1.353.057A6 6 0 0 0 .082 5.003.997.997 0 0 1 1 6a1 1 0 0 1-.918.997 5.96 5.96 0 0 0 1.03 2.482 1 1 0 0 1 1.352.057 1 1 0 0 1 .057 1.353 6 6 0 0 0 2.482 1.029.999.999 0 0 1 1.994 0 5.95 5.95 0 0 0 2.482-1.03 1 1 0 0 1 1.41-1.41 6 6 0 0 0 1.029-2.481.999.999 0 0 1 0-1.994 5.95 5.95 0 0 0-1.03-2.482q-.064.055-.136.097M6 2c.632 0 1.196-.293 1.562-.751q.36.118.693.287a2 2 0 0 0 .573 1.636 2 2 0 0 0 1.636.573q.169.333.287.693C10.293 4.804 10 5.368 10 6s.293 1.196.751 1.562q-.118.36-.287.693a2 2 0 0 0-1.636.573 2 2 0 0 0-.573 1.636 5 5 0 0 1-.693.287A2 2 0 0 0 6 10c-.632 0-1.196.293-1.562.751a5 5 0 0 1-.693-.287 2 2 0 0 0-.573-1.636 2 2 0 0 0-1.636-.573 5 5 0 0 1-.287-.693C1.707 7.196 2 6.632 2 6s-.293-1.196-.751-1.562q.118-.36.287-.693a2 2 0 0 0 1.636-.573 2 2 0 0 0 .573-1.636q.333-.169.693-.287C4.804 1.707 5.368 2 6 2" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" style={stroke12} aria-hidden="true">
      <path d="M6 3V6H3V7H7V3H6Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z" />
    </svg>
  );
}

function NotificationRow({ notification, unread, onClick }) {
  const { Text } = window.FusionDesignSystem_6db751;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(notification)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(notification); } }}
      className="fusionNotifCard"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "12px 16px 12px 14px",
        border: "1px solid var(--salt-color-gray-200)",
        borderLeft: "4px solid var(--salt-palette-accent)",
        borderRadius: "var(--salt-palette-corner-weak)",
        background: unread ? "var(--salt-palette-accent-weakest)" : "var(--salt-container-secondary-background)",
        cursor: "pointer",
      }}
    >
      {unread && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute", top: 10, right: 10, width: 8, height: 8, borderRadius: "50%",
            background: "var(--salt-palette-accent)",
          }}
        />
      )}
      <Text variant="body" style={{ fontWeight: "var(--salt-text-fontWeight-strong)", paddingRight: unread ? 16 : 0 }}>{notification.title}</Text>
      {notification.description && <Text variant="body" color="secondary">{notification.description}</Text>}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2, color: "var(--salt-content-secondary-foreground)" }}>
        <ClockIcon />
        <Text variant="label" color="secondary">{notification.timeAgo}</Text>
      </div>
    </div>
  );
}

/**
 * Fusion NotificationCenter — slide-in side panel listing notifications
 * as stacked interactive cards (spacing-50 gap between cards, spacing-200
 * panel padding around the list so card edges align with the header). Header: bell icon + title, "Mark all
 * N as read" link (shown only while unread items remain), a settings
 * icon button and a close icon button (each with a native title-attribute
 * tooltip: "Notification Settings" / "Close Notification Center") sitting
 * close together as a pair. "Mark all N as read" sits inline in the title row by default and
 * only drops to its own row (right-aligned) beneath the title when the
 * row doesn't have room for it. Unread cards get an accent-weakest fill and a small accent dot
 * in the top-right corner; read cards lose both. Every card keeps a 1px
 * gray border on all sides plus a thicker (4px) accent-colored left
 * border regardless of read state. A draggable splitter on
 * its leading edge resizes the panel between 320px and 640px (default
 * 400px), matching SidePanel. Requires FusionDesignSystem_6db751 (Text,
 * Link, IconButton, Divider).
 */
export function NotificationCenter({
  open,
  onClose,
  title = "Notification Center",
  notifications = [],
  onSettingsClick,
  onNotificationClick,
  onMarkAllRead,
}) {
  const { Text, Link, IconButton, Divider } = window.FusionDesignSystem_6db751;
  const [readIds, setReadIds] = useState(() => new Set());
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const dragRef = useRef(null);

  const onPointerDown = useCallback((e) => {
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startWidth: width };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [width]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current) return;
      const delta = dragRef.current.startX - e.clientX;
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, dragRef.current.startWidth + delta));
      setWidth(next);
    };
    const onUp = () => {
      if (!dragRef.current) return;
      dragRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  }, []);

  const isUnread = (n) => !!n.unread && !readIds.has(n.id);
  const unreadCount = notifications.filter(isUnread).length;

  // --- collision: keep "Mark all N as read" inline with the title row
  // unless it doesn't fit, then drop it to its own row beneath.
  const rowRef = useRef(null);
  const fixedMeasureRef = useRef(null);
  const titleMeasureRef = useRef(null);
  const markAllMeasureRef = useRef(null);
  const [markAllInline, setMarkAllInline] = useState(true);

  const recomputeRow = useCallback(() => {
    const row = rowRef.current;
    if (!row || unreadCount === 0) return;
    const available = row.clientWidth;
    const fixedW = fixedMeasureRef.current ? fixedMeasureRef.current.offsetWidth : 0;
    const titleW = titleMeasureRef.current ? titleMeasureRef.current.offsetWidth : 0;
    const markAllW = markAllMeasureRef.current ? markAllMeasureRef.current.offsetWidth + 8 : 0;
    setMarkAllInline((prev) => {
      const fits = fixedW + titleW + markAllW <= available;
      return prev === fits ? prev : fits;
    });
  }, [unreadCount]);

  useLayoutEffect(() => {
    recomputeRow();
    const row = rowRef.current;
    if (!row || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(recomputeRow);
    ro.observe(row);
    return () => ro.disconnect();
  }, [recomputeRow]);


  const handleCardClick = (n) => {
    if (isUnread(n)) setReadIds((prev) => new Set(prev).add(n.id));
    if (onNotificationClick) onNotificationClick(n);
  };
  const handleMarkAllRead = () => {
    setReadIds(new Set(notifications.map((n) => n.id)));
    if (onMarkAllRead) onMarkAllRead();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, pointerEvents: open ? "auto" : "none" }}>
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "var(--salt-overlayable-backdrop)", opacity: open ? 1 : 0, transition: "opacity var(--salt-duration-perceptible) ease-in-out" }}
      />
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width, maxWidth: "90vw",
        background: "var(--salt-container-primary-background)", boxShadow: "var(--salt-shadow-medium)",
        display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: dragRef.current ? "none" : "transform var(--salt-duration-perceptible) ease-in-out",
      }}>
        <div
          onPointerDown={onPointerDown}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panel"
          className="saltSplitter-track"
          style={{ position: "absolute", top: 0, bottom: 0, left: -6, width: 12, cursor: "col-resize", zIndex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div className="saltSplitter-bar" style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "var(--salt-separable-tertiary-borderColor)" }} />
          <div className="saltSplitter-grip" style={{ position: "relative", width: 4, height: 32, borderRadius: "var(--salt-palette-corner)", background: "var(--salt-separable-secondary-borderColor)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, padding: "var(--salt-spacing-200)" }}>
          <div ref={rowRef} style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            {/* hidden measurement layer */}
            <div aria-hidden="true" style={{ position: "absolute", visibility: "hidden", height: 0, overflow: "hidden", pointerEvents: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <span ref={fixedMeasureRef} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-flex" }}><NotificationIcon /></span>
                <span style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-25)" }}>
                  <span style={{ width: "var(--salt-size-base)", display: "inline-block" }} />
                  <span style={{ width: "var(--salt-size-base)", display: "inline-block" }} />
                </span>
              </span>
              <span ref={titleMeasureRef}><Text variant="h3" style={{ margin: 0, whiteSpace: "nowrap" }}>{title}</Text></span>
              {unreadCount > 0 && <span ref={markAllMeasureRef} style={{ whiteSpace: "nowrap" }}><Link href="#" underline="default">Mark all {unreadCount} as read</Link></span>}
            </div>
            <span style={{ display: "inline-flex", flexShrink: 0, color: "var(--salt-content-primary-foreground)" }}><NotificationIcon /></span>
            <Text variant="h3" style={{ margin: 0, flex: 1, minWidth: 60, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</Text>
            {markAllInline && unreadCount > 0 && (
              <Link href="#" underline="default" onClick={(e) => { e.preventDefault(); handleMarkAllRead(); }} style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
                Mark all {unreadCount} as read
              </Link>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-25)", flexShrink: 0 }}>
              <IconButton appearance="transparent" sentiment="neutral" aria-label="Notification settings" title="Notification Settings" onClick={onSettingsClick}><SettingsIcon /></IconButton>
              <IconButton appearance="transparent" sentiment="neutral" aria-label="Close" title="Close Notification Center" onClick={onClose}><CloseIcon /></IconButton>
            </div>
          </div>
          {!markAllInline && unreadCount > 0 && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--salt-spacing-100)" }}>
              <Link href="#" underline="default" onClick={(e) => { e.preventDefault(); handleMarkAllRead(); }} style={{ whiteSpace: "nowrap" }}>
                Mark all {unreadCount} as read
              </Link>
            </div>
          )}
          <Divider style={{ marginTop: "var(--salt-spacing-200)" }} />
          <div style={{ flex: 1, overflowY: "auto", margin: "0 calc(var(--salt-spacing-200) * -1)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-50)", padding: "var(--salt-spacing-200) var(--salt-spacing-200)" }}>
              {notifications.length === 0 ? (
                <Text color="secondary" style={{ padding: "24px var(--salt-spacing-150)" }}>You're all caught up.</Text>
              ) : (
                notifications.map((n) => (
                  <NotificationRow key={n.id} notification={n} unread={isUnread(n)} onClick={handleCardClick} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`.fusionNotifCard:hover{filter:brightness(0.98)}.fusionNotifCard:focus-visible{outline:var(--salt-focused-outline);outline-offset:-2px}.saltSplitter-grip{transition:background var(--salt-duration-instant) ease-in-out,width var(--salt-duration-instant) ease-in-out,height var(--salt-duration-instant) ease-in-out}[role="separator"]:hover .saltSplitter-grip,[role="separator"]:active .saltSplitter-grip{background:var(--salt-accent-background);width:4px;height:48px}[role="separator"]:hover .saltSplitter-bar,[role="separator"]:active .saltSplitter-bar{background:var(--salt-accent-background)}`}</style>
    </div>
  );
}
