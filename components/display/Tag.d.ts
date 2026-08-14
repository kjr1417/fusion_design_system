import type { ReactNode } from "react";

/**
 */
export interface TagProps {
  /** "file" is category-15 — a light neutral fill reserved for file-type tags (attachment tiles). */
  color?: "neutral" | "accent" | "positive" | "negative" | "file";
  children?: ReactNode;
  style?: React.CSSProperties;
}
