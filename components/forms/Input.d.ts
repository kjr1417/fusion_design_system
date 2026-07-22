import type { InputHTMLAttributes, ReactNode } from "react";

/**
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "primary" | "secondary" | "tertiary";
  validationState?: "error" | "warning" | "success";
  readOnly?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}
