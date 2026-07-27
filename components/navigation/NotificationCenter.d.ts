import type { ReactNode } from "react";

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  /** Pre-formatted relative time, e.g. "1d ago". */
  timeAgo: string;
  unread?: boolean;
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
 * row doesn't have room for it. Unread cards render an accent-weakest fill and a small accent
 * dot top-right; both disappear once read (clicking a card, or "Mark
 * all as read", marks it read). Every card keeps a 1px gray border on
 * all sides plus a thicker (4px) accent-colored left border regardless
 * of state. A draggable splitter on its leading
 * edge resizes the panel between 320px and 640px (default 400px),
 * matching SidePanel.
 */
export interface NotificationCenterProps {
  open: boolean;
  onClose: () => void;
  /** Panel title, next to the bell icon. Default "Notification Center". */
  title?: string;
  notifications?: NotificationItem[];
  onSettingsClick?: (e: any) => void;
  onNotificationClick?: (notification: NotificationItem) => void;
  onMarkAllRead?: () => void;
}

export declare function NotificationCenter(props: NotificationCenterProps): JSX.Element;
