import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight of the button. */
  appearance?: "solid" | "bordered" | "transparent";
  /** Semantic color intent. */
  sentiment?: "accented" | "neutral" | "negative" | "positive" | "caution";
  disabled?: boolean;
  /** Shows a pending/progress cursor and disables interaction color changes. */
  loading?: boolean;
  children?: ReactNode;
}
