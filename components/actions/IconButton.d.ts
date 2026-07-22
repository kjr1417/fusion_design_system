import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 */
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: "solid" | "bordered" | "transparent";
  sentiment?: "accented" | "neutral" | "negative" | "positive" | "caution";
  /** Required — IconButton has no visible label. */
  "aria-label": string;
  children?: ReactNode;
}
