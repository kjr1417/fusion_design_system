import type { ReactNode } from "react";

/**
 * Hover-triggered Salt tooltip: a status panel (default `info`) with a subtle
 * status-tinted background, colored border, status icon, popout shadow and arrow.
 */
export interface TooltipProps {
  content: ReactNode;
  placement?: "top" | "bottom";
  status?: "info" | "error" | "warning" | "success";
  children?: ReactNode;
}
