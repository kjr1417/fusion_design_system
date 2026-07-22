import type { HTMLAttributes, ReactNode } from "react";

/**
 */
export interface PillProps extends HTMLAttributes<HTMLElement> {
  clickable?: boolean;
  active?: boolean;
  /** Renders a close (x) glyph; called when it's clicked. */
  onClose?: () => void;
  children?: ReactNode;
}
