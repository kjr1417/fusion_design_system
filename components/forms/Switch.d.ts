import type { InputHTMLAttributes } from "react";

/**
 */
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}
