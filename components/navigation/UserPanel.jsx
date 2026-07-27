import React, { useRef, useEffect } from "react";

/**
 * Fusion UserPanel — dropdown menu anchored below the global-nav user
 * chip: name + SID, email, then an "Account" section (e.g. Requests) and
 * a "Manage" section (e.g. Approvals), divided by hairlines. Requires
 * FusionDesignSystem_6db751 (Avatar, Text, Divider).
 */
export function UserPanel({
  open,
  onClose,
  userName,
  userSid,
  userEmail,
  accountItems = [{ label: "Requests" }],
  manageItems = [{ label: "Approvals" }],
  style,
}) {
  const { Avatar, Text, Divider } = window.FusionDesignSystem_6db751;
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose && onClose(); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="menu"
      className="saltMenuPanel"
      style={{
        position: "absolute", top: "calc(100% + var(--salt-spacing-100))", right: 0, zIndex: 1000,
        width: "max-content", minWidth: 220, maxWidth: 340, ...style,
      }}
    >
      <div className="saltMenuPanel-container" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "var(--salt-spacing-100) var(--salt-spacing-100)" }}>
          <Avatar name={userName} size={32} />
          <div style={{ minWidth: 0 }}>
            <Text variant="body" style={{ fontWeight: "var(--salt-text-fontWeight-strong)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {userName}{userSid ? ` \u00b7 ${userSid}` : ""}
            </Text>
            <Text variant="label" color="secondary" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
              {userEmail}
            </Text>
          </div>
        </div>
        <Divider />
        <div style={{ padding: "var(--salt-spacing-50) 0" }}>
          <Text variant="label" color="secondary" style={{ padding: "6px var(--salt-spacing-100) var(--salt-spacing-25)", textTransform: "uppercase", letterSpacing: ".03em", display: "block" }}>
            Account
          </Text>
          {accountItems.map((item, i) => (
            <div key={i} className="saltMenuItem" role="menuitem" tabIndex={0} style={{ margin: "0 var(--salt-spacing-50)" }} onClick={() => { item.onClick && item.onClick(); onClose && onClose(); }}>
              {item.label}
            </div>
          ))}
        </div>
        <Divider />
        <div style={{ padding: "var(--salt-spacing-50) 0" }}>
          <Text variant="label" color="secondary" style={{ padding: "6px var(--salt-spacing-100) var(--salt-spacing-25)", textTransform: "uppercase", letterSpacing: ".03em", display: "block" }}>
            Manage
          </Text>
          {manageItems.map((item, i) => (
            <div key={i} className="saltMenuItem" role="menuitem" tabIndex={0} style={{ margin: "0 var(--salt-spacing-50)" }} onClick={() => { item.onClick && item.onClick(); onClose && onClose(); }}>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
