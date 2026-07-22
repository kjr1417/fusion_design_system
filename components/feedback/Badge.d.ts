import type { HTMLAttributes } from "react";

/**
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Count or short label shown inside the badge. Ignored when dot is true. */
  value?: string | number;
  /** Renders a small dot instead of a value — for unread/status indicators. */
  dot?: boolean;
  /** Positions the badge at the top-right corner of its relatively-positioned parent. */
  topRight?: boolean;
}
