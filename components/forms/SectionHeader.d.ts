import type { CSSProperties, ReactNode } from "react";

/**
 * Recurring section-opening header for forms: optional error/info banners,
 * a "* = Required field" note paired with a "Show optional fields" Switch,
 * the section title, and an optional single-line expandable description.
 * Row order top to bottom: error banners, info banners, required-note/switch
 * row, title, description.
 */
export interface SectionHeaderProps {
  /** "h3" (default) for a standalone section, "h4" for the compact "Chat Use Only" title. */
  titleVariant?: "h3" | "h4";
  title: ReactNode;
  /** Rendered via ExpandableText, truncated to one line with a "View more" toggle. */
  description?: string;
  /** Show the "* = Required field" label. Default true. */
  showRequiredNote?: boolean;
  /** Show the "Show optional fields" Switch. Default true. */
  showOptionalToggle?: boolean;
  optionalToggleLabel?: string;
  optionalToggleChecked?: boolean;
  onOptionalToggleChange?: (checked: boolean) => void;
  /** Rendered above info banners, always. */
  errorBanners?: ReactNode[];
  infoBanners?: ReactNode[];
  style?: CSSProperties;
}

export function SectionHeader(props: SectionHeaderProps): JSX.Element;
