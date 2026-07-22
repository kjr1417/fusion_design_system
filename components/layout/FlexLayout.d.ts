import React from "react";
interface FlexLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  gap?: number;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  wrap?: boolean;
}
export function FlexLayout(props: FlexLayoutProps): JSX.Element;
