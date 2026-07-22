import type { HTMLAttributes, ReactNode } from "react";

/**
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  /** Adds a colored accent bar on the given edge. */
  accent?: "top" | "bottom" | "left" | "right";
  /** Raises shadow and highlights the border on hover — for clickable cards. */
  hoverable?: boolean;
  children?: ReactNode;
}
