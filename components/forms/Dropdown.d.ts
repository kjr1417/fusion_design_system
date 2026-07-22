import type { SelectHTMLAttributes } from "react";

/**
 */
export interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
  placeholder?: string;
}
