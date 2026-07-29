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
export interface AccordionItem {
  title: ReactNode;
  /** Omit (or set collapsible=false) to render a non-collapsible header row — no chevron, not clickable to expand. */
  content?: ReactNode;
  collapsible?: boolean;
  /** Marks this section as containing a field-level validation error. While the section is COLLAPSED, the whole header row gets a red top border and a tinted red background so the user notices it needs attention (title/chevron stay their normal color); once expanded the header returns to normal (the field's own error styling takes over inside). */
  hasError?: boolean;
  /** Extra style merged onto this item's header button (e.g. a status highlight background/left-border). */
  headerStyle?: object;
  /** Extra style merged onto this item's expanded content wrapper (e.g. to zero out the default top/bottom spacing). */
  contentStyle?: object;
  /** Always-visible block rendered directly below the header button — outside its flex row, so it never affects chevron/icon/label vertical centering, and not gated by expanded state. */
  subtitle?: ReactNode;
  /** Style for the subtitle wrapper (e.g. left padding to align it under the label). */
  subtitleStyle?: object;
  /** Called on every header click, in addition to (and regardless of) the built-in expand/collapse toggle. */
  onHeaderClick?: () => void;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Index of the item open by default. In allowMultiple mode also accepts an array of indices to open several at once. -1 / [] opens none. */
  defaultOpen?: number | number[];
  variant?: "boxed" | "inline";
  allowMultiple?: boolean;
  /** Chevron placement in the header row. "start" (default) matches Salt; "end" right-aligns it so a leading icon + label can sit flush left. */
  chevronPosition?: "start" | "end";
}
