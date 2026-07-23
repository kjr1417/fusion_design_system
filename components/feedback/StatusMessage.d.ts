import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

/**
 * Compact status line: solid status icon, optional strong title, one line of
 * body text (truncates with a hover tooltip showing the full content), and a
 * trailing "Learn more" link that opens in a new tab.
 */
export interface StatusMessageProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  status?: "info" | "success" | "warning" | "error";
  /** Optional bold title above the body line. */
  title?: ReactNode;
  /** Body text — kept to one line; truncates with an ellipsis + tooltip if it overflows. */
  children?: ReactNode;
  /** Set false to omit the trailing "Learn more" link entirely. */
  showLink?: boolean;
  linkText?: string;
  href?: AnchorHTMLAttributes<HTMLAnchorElement>["href"];
  onLinkClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
  className?: string;
}
