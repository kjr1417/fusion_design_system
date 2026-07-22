import React from "react";
interface FlowLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
}
export function FlowLayout(props: FlowLayoutProps): JSX.Element;
