import type { CSSProperties, ReactNode } from "react";

/**
 * Click-triggered info popover — an info-glyph button that opens a small
 * descriptive panel on click (closes on outside click or Escape). Use next
 * to a FormField label for supplementary, non-essential guidance; helper
 * text below the field should hold anything the user always needs to see.
 */
export interface ToggletipProps {
  content: ReactNode;
  title?: string;
  placement?: "top" | "bottom";
  style?: CSSProperties;
}
export function Toggletip(props: ToggletipProps): JSX.Element;
