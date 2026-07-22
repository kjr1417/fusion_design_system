import React from "react";
interface GridLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  gap?: number;
  rowGap?: number;
}
export function GridLayout(props: GridLayoutProps): JSX.Element;
