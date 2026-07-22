import React from "react";
interface GlobalNavProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  logoSrc?: string;
  logoAlt?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  showSearch?: boolean;
  userName?: string;
  notificationCount?: number;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function GlobalNav(props: GlobalNavProps): JSX.Element;
