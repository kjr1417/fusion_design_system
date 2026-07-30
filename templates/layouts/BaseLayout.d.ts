import type { CSSProperties, ReactNode } from "react";

export interface BaseLayoutProps {
  /** "large" caps the shared PageHeader+content column at 1848px; "medium" caps it at 1500px. Both align left and scroll horizontally below 980px. Default "large". */
  size?: "large" | "medium";
  /** Props spread onto the full-width GlobalNav. */
  globalNavProps?: Record<string, unknown>;
  /** Items for the left VerticalNavigation rail. */
  navItems?: unknown[];
  navCollapsible?: boolean;
  navDefaultCollapsed?: boolean;
  navCollapsed?: boolean;
  onNavCollapsedChange?: (collapsed: boolean) => void;
  /** Props spread onto the PageHeader. */
  pageHeaderProps?: Record<string, unknown>;
  /** Inline right panel content — pushes the content column when open. Resizable via a drag splitter. Omit to not offer this panel. */
  rightPanel?: ReactNode;
  rightPanelTitle?: string;
  /** Label for the button folded into PageHeader's secondaryActions. Default "Side panel". */
  rightPanelTriggerLabel?: string;
  rightPanelMinWidth?: number;
  rightPanelDefaultWidth?: number;
  rightPanelMaxWidth?: number;
  /** Controlled open state — pass with onRightPanelOpenChange to drive it externally. */
  rightPanelOpen?: boolean;
  defaultRightPanelOpen?: boolean;
  onRightPanelOpenChange?: (open: boolean) => void;
  /** Fixed-width right-anchored overlay content, opens above everything with a scrim (like SidePanel, but not resizable). Omit to not offer this overlay. */
  overlayPanel?: ReactNode;
  overlayTitle?: string;
  /** Label for the button folded into PageHeader's secondaryActions. Default "Overlay". */
  overlayTriggerLabel?: string;
  overlayWidth?: number;
  overlayOpen?: boolean;
  defaultOverlayOpen?: boolean;
  onOverlayOpenChange?: (open: boolean) => void;
  showFooter?: boolean;
  footerProps?: Record<string, unknown>;
  /** Extra style on the spacing-200-padded content wrapper. */
  contentStyle?: CSSProperties;
  /** Swappable page content. */
  children?: ReactNode;
}
export function BaseLayout(props: BaseLayoutProps): JSX.Element;
