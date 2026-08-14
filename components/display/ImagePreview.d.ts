import type { CSSProperties } from "react";

export interface ImagePreviewImage {
  src: string;
  alt?: string;
}

/**
 * A thumbnail image (max-height 320px, max-width 100% of its container
 * minus a 108px reserve, aspect ratio preserved) with a hover-revealed
 * toolbar (Copy, Download, Expand — 28px buttons, 16px from the top/right
 * corner, 8px apart). Copy writes the image to the clipboard as a PNG
 * (falls back silently if the clipboard API/permissions aren't available);
 * Download saves the file; Expand opens the full-size image in a Dialog
 * (max-width 900px, max-height 80% of the viewport). Pass `images` (all
 * images from the same response) + this thumbnail's `index` to enable a
 * gallery: the dialog then shows a footer with left-aligned transparent
 * Copy/Download and a right-aligned "n of N" counter with Back/Next.
 * Requires FusionDesignSystem_6db751 (Dialog, IconButton).
 */
export interface ImagePreviewProps {
  src: string;
  alt?: string;
  /** All images belonging to the same response, for gallery nav in the expand dialog. Omit (or pass length <= 1) for a single image with no footer. */
  images?: ImagePreviewImage[];
  /** This thumbnail's 0-based position within `images`. Default 0. */
  index?: number;
  /** Px cap on the thumbnail's rendered height. Default 320. */
  maxHeight?: number;
  style?: CSSProperties;
}
export function ImagePreview(props: ImagePreviewProps): JSX.Element;
