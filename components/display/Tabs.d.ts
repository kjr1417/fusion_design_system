import type { HTMLAttributes } from "react";

/**
 */
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  items: string[];
  defaultActive?: number;
  onChange?: (index: number) => void;
}
