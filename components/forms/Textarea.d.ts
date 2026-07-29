import type { TextareaHTMLAttributes } from "react";

/**
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  validationState?: "error" | "warning" | "success";
  /** Max character count. Enforced (typing stops at the limit) and shown as a "typed/limit" counter on its own line below the field, under the resize handle — no separate error state. */
  characterLimit?: number;
}
