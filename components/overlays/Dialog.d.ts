import type { ReactNode } from "react";

/**
 */
export interface DialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children?: ReactNode;
  actions?: ReactNode;
  /** Replaces the default right-aligned `actions` row with a fully custom footer (e.g. a split left/right action bar). */
  footer?: ReactNode;
  /** Px width of the dialog. Default 420. */
  width?: number;
  /** Caps the dialog card's height (e.g. "80vh"); body content becomes independently scrollable. Default: no cap, dialog grows with content. */
  maxHeight?: string | number;
  /** Extra style merged onto the body wrapper (e.g. to zero out the default padding for image/media content). */
  bodyStyle?: object;
}
