import React from "react";
interface MultilineInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
  disabled?: boolean;
  validationState?: "error" | "warning" | "success";
  bordered?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}
export function MultilineInput(props: MultilineInputProps): JSX.Element;
