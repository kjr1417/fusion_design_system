import type { SelectHTMLAttributes } from "react";

/**
 */
export interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
  placeholder?: string;
  /** Reserved space (px) for the trailing chevron/error icon. Default 28 (46 with a validation error) — narrow it (e.g. down to 8) only for tightly-constrained fields, like the Calendar's month/year selects, where the caller already sizes the field to just fit its text. */
  chevronPadding?: number;
}
