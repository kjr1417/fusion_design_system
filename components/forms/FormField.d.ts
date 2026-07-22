import type { HTMLAttributes, ReactNode } from "react";

/**
 */
export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  helperText?: string;
  necessity?: "required" | "optional";
  children?: ReactNode;
}
