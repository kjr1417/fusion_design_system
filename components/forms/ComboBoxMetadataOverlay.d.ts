import type { CSSProperties } from "react";
import type { StaticListGroupItem } from "../data/StaticListGroup";

export interface ComboBoxMetadataOption {
  value: string;
  label: string;
  /** Rendered as a single horizontal, label-left StaticListGroup row beneath the label. */
  metadata?: StaticListGroupItem[];
}
export interface ComboBoxMetadataAction {
  label: string;
  onClick?: () => void;
}
/**
 * ComboBox variant for data-heavy option lists: each row shows a label plus
 * a single horizontal row of comparison metadata beneath it, and the
 * overlay's footer offers up to two secondary actions plus a "Browse All"
 * primary action (tear-out icon) that opens an (empty, ready-to-fill) Drawer.
 */
export interface ComboBoxMetadataOverlayProps {
  options: ComboBoxMetadataOption[];
  multiselect?: boolean;
  defaultValue?: string | string[];
  placeholder?: string;
  size?: "medium" | "small";
  disabled?: boolean;
  validationState?: "error" | "warning" | "success";
  /** Up to 2 secondary footer buttons, left of "Browse All". */
  secondaryActions?: ComboBoxMetadataAction[];
  browseAllLabel?: string;
  onBrowseAll?: () => void;
  onChange?: (value: string | string[]) => void;
  style?: CSSProperties;
}
export function ComboBoxMetadataOverlay(props: ComboBoxMetadataOverlayProps): JSX.Element;
