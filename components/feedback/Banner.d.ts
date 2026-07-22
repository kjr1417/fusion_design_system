import type { HTMLAttributes, ReactNode } from "react";

/**
 */
export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  status?: "info" | "success" | "warning" | "error";
  /** primary is outlined only; secondary tints the background with the status color. */
  variant?: "primary" | "secondary";
  children?: ReactNode;
}
