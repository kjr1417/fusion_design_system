import React from "react";
interface StackLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  align?: React.CSSProperties["alignItems"];
}
export function StackLayout(props: StackLayoutProps): JSX.Element;
