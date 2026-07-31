import type { CSSProperties } from "react";

/**
 * Fusion Footer — 29px-tall global utility bar for the base of Studio
 * layouts: legal/policy links left, copyright right.
 */
export interface FooterProps {
  /** Placeholder link labels — swap for the real legal set per product. */
  links?: string[];
  onLinkClick?: (label: string) => void;
  copyrightText?: string;
  style?: CSSProperties;
}
export function Footer(props: FooterProps): JSX.Element;
