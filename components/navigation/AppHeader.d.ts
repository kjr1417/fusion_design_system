import type { ReactNode } from "react";

export interface AppHeaderBreadcrumbItem {
  label: string;
  href?: string;
}

export interface AppHeaderAction {
  label: string;
  icon?: ReactNode;
  onClick?: (e: any) => void;
}

export type AppHeaderStatusType = "info" | "success" | "warning" | "error";

export interface AppHeaderToggleOption {
  label: string;
  value: string;
}

/**
 * Fusion AppHeader — 44px nested-page header pattern for platform pages.
 *
 * Layout: spacing-100 top/bottom, spacing-200 left/right, spacing-100 between
 * left-side components, spacing-100 between right-side components with
 * spacing-100 before the status badge.
 *
 * Left side: back button (transparent, neutral) → collapsing breadcrumbs
 * (paths over 2 levels collapse to first + a "…" Menu of hidden levels + last,
 * with an optional edit-title icon after the active page) → vertical Divider
 * → optional version-select Menu → optional category-1 Tag → optional
 * copy-value affordance (plain text + copy icon, no pill background).
 *
 * Right side: optional Visualizer/Code-style ToggleButtonGroup → optional
 * secondary action buttons (bordered appearance only, never primary/solid)
 * → a status badge (2px colored ring + label, no background fill).
 */
export interface AppHeaderProps {
  /** Platform path shown in the breadcrumb trail, root first. */
  breadcrumbItems?: AppHeaderBreadcrumbItem[];
  /** Show the leading transparent back button. Default true. */
  showBackButton?: boolean;
  onBack?: (e: any) => void;
  /** Show the edit-title icon after the active (last) breadcrumb. Default true. */
  showEditIcon?: boolean;
  onEditTitle?: (e: any) => void;
  /** Show the version-select trigger after the divider. Default true. */
  showVersionMenu?: boolean;
  /** Currently displayed version label, e.g. "v2.4". */
  version?: string;
  /** Prior version labels offered in the version menu. */
  versionHistory?: string[];
  onVersionSelect?: (version: string) => void;
  /** Show the category tag. Default true. */
  showTag?: boolean;
  tagLabel?: string;
  /** Show the copy-value affordance. Default true. */
  showCopyValue?: boolean;
  /** The value copied to the clipboard (e.g. an account/resource id). */
  copyValue?: string;
  onCopy?: (value: string) => void;
  /** Show the Visualizer/Code toggle button group. Default false. */
  showViewToggle?: boolean;
  viewToggleOptions?: AppHeaderToggleOption[];
  onViewToggleChange?: (value: string) => void;
  /** Secondary action buttons, left of the status badge. Always rendered bordered/neutral — never primary. */
  actions?: AppHeaderAction[];
  statusType?: AppHeaderStatusType;
  statusLabel?: string;
}

export declare function AppHeader(props: AppHeaderProps): JSX.Element;
