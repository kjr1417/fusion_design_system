import React from "react";
interface NavigationItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label?: string;
  href?: string;
  active?: boolean;
  icon?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}
export function NavigationItem(props: NavigationItemProps): JSX.Element;
