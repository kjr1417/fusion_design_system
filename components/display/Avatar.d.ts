import type { HTMLAttributes } from "react";

/**
 */
export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name?: string;
  src?: string;
  size?: number;
}
