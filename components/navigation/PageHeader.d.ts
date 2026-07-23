import type { ReactNode } from "react";

export interface PageHeaderAction {
  label: string;
  onClick?: (e: any) => void;
}

export type PageHeaderStatusType = "info" | "success" | "warning" | "error";

/**
 * Fusion PageHeader — the full page-level header pattern for top-of-page
 * chrome (distinct from AppHeader, the compact 44px nested-page bar).
 *
 * Line 1: optional transparent segmented back/breadcrumb-menu control (←
 * steps back one level, ⌄ opens a Menu of the full breadcrumb trail) →
 * strong H1 title → solid/accented primary action → solid/neutral secondary
 * action (with a chevron-down segment opening a menu of any further
 * secondary actions) → bordered/neutral tertiary action → transparent
 * overflow (kebab) Menu, rightmost.
 *
 * Line 2 (optional): single-line description, ellipsis-truncated; a
 * "View more" toggle appears automatically only when the text actually
 * overflows the line, and expands it to wrap in place.
 *
 * Line 3 (optional metadata row): category-1 primary Tag, category-2
 * secondary Tag, a StatusIndicator badge, a CopyValue affordance, and any
 * number of plain secondary data labels.
 *
 * Line 4 (optional): page Tabs with a Divider directly beneath.
 */
export interface PageHeaderProps {
  /** Show the leading transparent back/breadcrumb-menu segmented control. Default false. */
  showBreadcrumbNav?: boolean;
  onBreadcrumbBack?: (e: any) => void;
  /** Labels for every level in the breadcrumb trail, shown in the ⌄ menu. */
  breadcrumbMenuItems?: string[];
  onBreadcrumbMenuSelect?: (item: string) => void;
  /** The page title, rendered as a strong H1. */
  title: string;
  /** Primary, solid/accented call-to-action — at most one per page. */
  primaryAction?: PageHeaderAction;
  /** Secondary actions: the first renders as a solid/neutral button; any further items collapse behind a chevron-down segment that opens a menu. */
  secondaryActions?: PageHeaderAction[];
  /** Single tertiary action, rendered bordered/neutral. */
  tertiaryAction?: PageHeaderAction;
  /** Extra action labels shown in the transparent overflow (kebab) menu. */
  overflowActions?: string[];
  onOverflowSelect?: (item: string) => void;
  /** Single-line page description. A "View more" toggle appears automatically when it overflows the line. */
  description?: string;
  /** Primary category tag, rendered with category-1 (accent) coloring. */
  primaryTag?: string;
  /** Secondary category tag, rendered with category-2 (positive) coloring. */
  secondaryTag?: string;
  status?: { type?: PageHeaderStatusType; label: string };
  /** A copyable value (id, key, code) shown with a copy-to-clipboard icon. */
  copyValue?: string;
  onCopy?: (value: string) => void;
  /** Plain secondary metadata labels (e.g. "Owner: J. Chen", "Updated 2h ago"). */
  dataLabels?: string[];
  /** Page tab labels; shown with a Divider directly beneath. */
  tabs?: string[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  style?: React.CSSProperties;
}

export declare function PageHeader(props: PageHeaderProps): JSX.Element;
