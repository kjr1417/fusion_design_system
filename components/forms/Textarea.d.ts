import type { TextareaHTMLAttributes } from "react";

/**
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  validationState?: "error" | "warning" | "success";
}
