import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 */
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "accent";
  underline?: "default" | "never";
  children?: ReactNode;
}
