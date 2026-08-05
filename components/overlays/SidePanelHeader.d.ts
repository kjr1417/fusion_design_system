import type { CSSProperties } from "react";

export interface SidePanelHeaderAction {
  label: string;
  onClick?: (e: any) => void;
  /** When set, always renders as an icon-only button (this icon, `label` as its title/aria-label) instead of the text Button — ignores the width-collision text/icon/none collapse. */
  icon?: any;
}

/**
 * Fusion SidePanelHeader — SidePanel's header block.
 *
 * Line 1: optional transparent back IconButton → H2 title → secondary
 * info text (id/type) → up to two bordered/neutral action buttons →
 * trailing transparent close IconButton. On width collision, in order:
 * 1) secondary info is dropped, 2) action buttons shrink to icon-only
 * (edit glyph), 3) action buttons are dropped entirely, 4) the title
 * itself truncates — so the truncated title and close button are always
 * the last two things visible.
 *
 * Line 2 (optional): supporting description, clamped to 2 lines with a
 * "View more" link that appears only when the text overflows and expands
 * it in place ("View less" to re-collapse). Sits spacing-100 below the
 * title row; the metadata row sits spacing-100 below it.
 *
 * Line 3 (optional metadata row): same structure as PageHeader's —
 * primary Tag, secondary Tag, StatusBadge, CopyValue, plain data labels
 * (spacing-150 between each item). Action buttons are spacing-100 apart;
 * title and secondary info are spacing-100 apart. Never wraps: items
 * that don't fit collapse into a "+n" trigger that lists them on hover.
 */
export interface SidePanelHeaderProps {
  /** Panel title, rendered as an H2. Truncates with an ellipsis if it won't fit. */
  title: string;
  /** Short secondary label next to the title (e.g. an id or type), in secondary-foreground text. */
  secondaryInfo?: string;
  /** Shows a leading transparent back icon button when provided. */
  onBack?: (e: any) => void;
  /** aria-label/title for the back icon button. Default "Back". */
  backLabel?: string;
  /** aria-label/title for the close icon button. Default "Close". */
  closeLabel?: string;
  /** Bordered, neutral action buttons shown before the close button. Only the first two are rendered. */
  actions?: SidePanelHeaderAction[];
  /** Called when the close icon button is clicked. */
  onClose: () => void;
  /** Supporting description, clamped to 2 lines. */
  description?: string;
  /** Primary category tag, rendered with category-1 (accent) coloring. */
  primaryTag?: string;
  /** Secondary category tag, rendered with category-2 (positive) coloring. */
  secondaryTag?: string;
  /** Rendered as a StatusBadge; `label` is matched against its built-in status vocabulary. */
  status?: { label: string };
  /** A copyable value (id, key, code) shown with a copy-to-clipboard icon. */
  copyValue?: string;
  onCopy?: (value: string) => void;
  /** Plain secondary metadata labels (e.g. "Owner: J. Chen", "Updated 2h ago"). */
  dataLabels?: string[];
  style?: CSSProperties;
}

export declare function SidePanelHeader(props: SidePanelHeaderProps): JSX.Element;
