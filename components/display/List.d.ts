import type { ReactNode } from "react";

/**
 */
export interface ListProps<T = unknown> {
  items: T[];
  renderItem?: (item: T, index: number) => ReactNode;
  dividers?: boolean;
}
