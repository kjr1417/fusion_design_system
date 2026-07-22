import React from "react";
interface SaltProviderNextProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "light" | "dark";
  density?: "low";
}
export function SaltProviderNext(props: SaltProviderNextProps): JSX.Element;
