import type { CSSProperties, ReactNode } from "react";

/**
 * Hover-triggered Salt tooltip: a status panel (default `info`) with a subtle
 * status-tinted background, colored border, status icon, popout shadow and arrow.
 */
export interface TooltipProps {
  content: ReactNode;
  placement?: "top" | "bottom";
  /** "plain" is a neutral hover-title style — no colored fill/border, no status icon — for simple clarifying tooltips (e.g. a truncated label, an inline tag's detail). The status colors (info/error/warning/success) are for tooltips that themselves carry a severity. Default "info". */
  status?: "info" | "error" | "warning" | "success" | "plain";
  /** Caps the tooltip's width; it hugs shorter content and wraps text once content exceeds this. Default 220. */
  maxWidth?: number;
  /** Applied to the trigger-wrapping span — use to let the trigger flex/shrink/truncate within a parent layout. */
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}
