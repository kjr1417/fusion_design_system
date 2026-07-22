import type { ReactNode } from "react";

/**
 * Fusion Carousel — a horizontal, scroll-snapping track of items with paged
 * prev/next controls. Use it for card shelves ("Get started in Fusion",
 * "Recommended for you", catalog rows). Wrap ContentCards (or any items) as
 * children; the carousel handles sizing, snapping, paging, and end-of-track
 * button disabling.
 *
 * Items never shrink below `minItemWidth` (default 348px). When the row is
 * wide enough they grow to share the space evenly; when it isn't, they overflow
 * and scroll one page at a time.
 */
export interface CarouselProps {
  /** The items to lay out in the track (typically ContentCards). */
  children?: ReactNode;
  /** Optional heading rendered above the track. */
  title?: string;
  /** Optional supporting line under the title. */
  subtitle?: string;
  /** Minimum width of each item in px (or a CSS length string). Items never go under this. Default 348. */
  minItemWidth?: number | string;
  /** Gap between items. Any CSS length / token. Default var(--salt-spacing-200). */
  gap?: string;
  /** Show the prev/next controls. Default true. */
  controls?: boolean;
  /** Where the controls sit: "bottom" (under the track, left-aligned) or "top" (in the header, right-aligned). Default "bottom". */
  controlsPlacement?: "bottom" | "top";
  className?: string;
  style?: React.CSSProperties;
}
