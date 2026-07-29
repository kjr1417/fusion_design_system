import type { CSSProperties } from "react";

export interface ComboBoxTreeNode {
  value: string;
  label: string;
  children?: ComboBoxTreeNode[];
}
/**
 * ComboBox variant whose overlay nests options into parent/child folders
 * (a Salt tree). Single-select shows chevron-down/chevron-right to expand
 * or collapse folders and selects on click. Multiselect adds a tri-state
 * Checkbox between chevron and label on every row (parents included) plus
 * a "Select all" row; selecting a parent selects its whole subtree, and a
 * parent shows indeterminate when only some descendants are selected.
 */
export interface ComboBoxTreeOverlayProps {
  nodes: ComboBoxTreeNode[];
  multiselect?: boolean;
  /** Multiselect: array of selected values. Single-select: ignored (use a single string via defaultValue below). */
  defaultValue?: string | string[];
  /** Values expanded on mount. */
  defaultExpanded?: string[];
  placeholder?: string;
  size?: "medium" | "small";
  disabled?: boolean;
  validationState?: "error" | "warning" | "success";
  onChange?: (value: string | string[]) => void;
  style?: CSSProperties;
}
export function ComboBoxTreeOverlay(props: ComboBoxTreeOverlayProps): JSX.Element;
