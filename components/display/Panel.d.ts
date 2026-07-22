import React from "react";
interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "tertiary";
}
export function Panel(props: PanelProps): JSX.Element;
