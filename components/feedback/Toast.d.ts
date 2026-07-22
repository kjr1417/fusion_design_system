import React from "react";
interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}
export function Toast(props: ToastProps): JSX.Element;
