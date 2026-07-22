import type { InputHTMLAttributes } from "react";

/**
 */
export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  disabled?: boolean;
}

export interface RadioButtonGroupProps {
  name: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
  direction?: "vertical" | "horizontal";
  onChange?: (value: string) => void;
}
