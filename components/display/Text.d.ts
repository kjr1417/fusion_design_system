import React from "react";
interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "label";
  color?: "primary" | "secondary" | "disabled";
  as?: keyof JSX.IntrinsicElements;
}
export function Text(props: TextProps): JSX.Element;
export function H1(props: Omit<TextProps, "variant">): JSX.Element;
export function H2(props: Omit<TextProps, "variant">): JSX.Element;
export function H3(props: Omit<TextProps, "variant">): JSX.Element;
export function H4(props: Omit<TextProps, "variant">): JSX.Element;
