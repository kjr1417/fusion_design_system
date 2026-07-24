import type { ReactNode } from "react";

/**
 * Collapsible sections, based on the Salt accordion. `boxed` (default) draws
 * a bordered container; `inline` is borderless — either way each section has
 * a hairline border on top and a 37px-tall header (chevron-down when
 * collapsed, chevron-up when expanded, H4 label). Expanded content sits
 * spacing-100 below the header and spacing-150 above the next section,
 * indented spacing-200 plus the icon width to align with the label.
 * Collapsed sections in a stack sit flush with no gap between them.
 */
export interface AccordionProps {
  items: { title: string; content: ReactNode }[];
  defaultOpen?: number;
  variant?: "boxed" | "inline";
  allowMultiple?: boolean;
}
