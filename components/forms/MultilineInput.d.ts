import React from "react";
interface MultilineInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
  disabled?: boolean;
  validationState?: "error" | "warning" | "success";
  bordered?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  /** Max character count. Enforced (typing stops at the limit) and shown as a "typed/limit" counter on its own line below the field, under the resize handle — no separate error state. */
  characterLimit?: number;
}
export function MultilineInput(props: MultilineInputProps): JSX.Element;
