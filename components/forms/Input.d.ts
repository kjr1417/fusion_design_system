import type { InputHTMLAttributes, ReactNode } from "react";

/**
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "primary" | "secondary" | "tertiary";
  validationState?: "error" | "warning" | "success";
  readOnly?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  /** "small" shrinks height/padding for dense field rows (e.g. paired date/number fields). Default "medium". */
  size?: "medium" | "small";
  /** Max character count. Enforced (typing stops at the limit) and shown as a "typed/limit" counter to the right of endAdornment — no separate error state, the counter is the only feedback. */
  characterLimit?: number;
}
