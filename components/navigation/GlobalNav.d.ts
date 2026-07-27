import React from "react";
interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  timeAgo: string;
  unread?: boolean;
}
interface UserPanelListItem {
  label: string;
  onClick?: (e: any) => void;
}
interface GlobalNavProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  logoSrc?: string;
  logoAlt?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  showSearch?: boolean;
  userName?: string;
  /** SID shown in the user panel, e.g. "V855888". */
  userSid?: string;
  userEmail?: string;
  /** Fallback badge count when `notifications` isn't provided. */
  notificationCount?: number;
  /** Notifications shown in the Notification Center side panel; the badge count derives from unread items when this is set. */
  notifications?: NotificationItem[];
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSettingsClick?: (e: any) => void;
  onNotificationClick?: (notification: NotificationItem) => void;
  onMarkAllRead?: () => void;
  /** User panel "Account" section list items. Default: [{ label: "Requests" }]. */
  accountItems?: UserPanelListItem[];
  /** User panel "Manage" section list items. Default: [{ label: "Approvals" }]. */
  manageItems?: UserPanelListItem[];
}
export function GlobalNav(props: GlobalNavProps): JSX.Element;
