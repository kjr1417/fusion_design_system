import type { CSSProperties } from "react";

/**
 */
export interface ToggleButtonGroupProps {
  options: { label: string; value: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  style?: CSSProperties;
}
