import type { ReactNode } from "react";

/**
 */
export interface TagProps {
  color?: "neutral" | "accent" | "positive" | "negative";
  children?: ReactNode;
}
