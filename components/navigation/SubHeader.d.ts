import type { ReactNode } from "react";

export interface SubHeaderAction {
  label: string;
  onClick?: (e: any) => void;
}

/**
 * Fusion SubHeader — a compact header pattern: title, neutral transparent
 * action buttons, and a section description. Unlike PageHeader it carries
 * no breadcrumb nav, metadata row, or tabs, and applies no outer padding
 * of its own.
 *
 * Line 1: H2 title → up to two bordered/neutral action buttons
 * → an optional tertiary transparent icon button (spacing-300 between
 * the title and the first action; spacing-100 between subsequent
 * actions/icon button).
 *
 * Line 2 (optional, spacing-200 below line 1): single-line section
 * description, ellipsis-truncated; a "View more" toggle appears
 * automatically only when the text actually overflows the line, and
 * expands it to wrap in place.
 */
export interface SubHeaderProps {
  /** The section title, rendered as an H2. */
  title: string;
  /** Bordered, neutral action buttons shown after the title. Only the first two are rendered. */
  actions?: SubHeaderAction[];
  /** Single tertiary action, rendered as a transparent neutral icon button (kebab glyph); label is used as its aria-label. */
  tertiaryAction?: SubHeaderAction;
  /** Single-line section description. A "View more" toggle appears automatically when it overflows the line. */
  description?: string;
  style?: React.CSSProperties;
}

export declare function SubHeader(props: SubHeaderProps): JSX.Element;
