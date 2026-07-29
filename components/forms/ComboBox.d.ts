import type { CSSProperties } from "react";

export interface ComboBoxOption {
  value: string;
  label: string;
}
/**
 * Search-ahead combo box. `multiselect=false` (default) is single-select —
 * typed text filters the list, picking an option fills the field and closes
 * the list. `multiselect=true` renders chosen options as removable chips
 * inside the field and keeps the list open across picks.
 *
 * Empty state shows placeholder text inviting a selection — standard is
 * "Select {value}" (e.g. "Select team"), contextual to the field.
 */
export interface ComboBoxProps {
  options: ComboBoxOption[];
  multiselect?: boolean;
  defaultValue?: string | string[];
  placeholder?: string;
  size?: "medium" | "small";
  disabled?: boolean;
  validationState?: "error" | "warning" | "success";
  onChange?: (value: string | string[]) => void;
  style?: CSSProperties;
}
export function ComboBox(props: ComboBoxProps): JSX.Element;
