import type { CSSProperties } from "react";

export interface UserPanelListItem {
  label: string;
  onClick?: (e: any) => void;
}

/**
 * Fusion UserPanel — dropdown menu anchored below the global-nav user
 * chip. Line 1: user name + SID (e.g. "V855888"). Line 2: email. A
 * hairline divider leads into an "Account" section (default: Requests),
 * another divider leads into a "Manage" section (default: Approvals) —
 * both lists take more items as they're added.
 */
export interface UserPanelProps {
  open: boolean;
  onClose: () => void;
  userName: string;
  /** SID shown next to the name, e.g. "V855888". */
  userSid?: string;
  userEmail?: string;
  accountItems?: UserPanelListItem[];
  manageItems?: UserPanelListItem[];
  style?: CSSProperties;
}

export declare function UserPanel(props: UserPanelProps): JSX.Element;
