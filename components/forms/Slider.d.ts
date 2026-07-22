import type { InputHTMLAttributes } from "react";

/**
 */
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "min" | "max" | "step"> {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}
