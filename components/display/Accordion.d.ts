import type { ReactNode } from "react";

/**
 * Collapsible sections. `boxed` (default) draws a bordered container; `inline`
 * is borderless with hairline rules between sections — use it to make form
 * sections collapsible (chevron sits to the left of each section title).
 */
export interface AccordionProps {
  items: { title: string; content: ReactNode }[];
  defaultOpen?: number;
  variant?: "boxed" | "inline";
  allowMultiple?: boolean;
}
