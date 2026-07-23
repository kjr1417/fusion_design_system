import type { CSSProperties, ReactNode } from "react";

/**
 * Hover-triggered Salt tooltip: a status panel (default `info`) with a subtle
 * status-tinted background, colored border, status icon, popout shadow and arrow.
 */
export interface TooltipProps {
  content: ReactNode;
  placement?: "top" | "bottom";
  status?: "info" | "error" | "warning" | "success";
  /** Applied to the trigger-wrapping span — use to let the trigger flex/shrink/truncate within a parent layout. */
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}
