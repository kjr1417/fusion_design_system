import React from "react";

export function Link({ variant = "primary", underline = "default", href = "#", children, className = "", ...rest }) {
  const cls = [
    "saltLink",
    "saltText",
    variant === "secondary" ? "saltLink-secondary" : variant === "accent" ? "saltLink-accent" : "saltLink-primary",
    underline === "never" ? "saltLink-underlineNever" : "saltLink-underlineDefault",
    className,
  ].join(" ");
  return (
    <a className={cls} href={href} {...rest}>
      {children}
    </a>
  );
}
