import React from "react";

const STYLES = {
  h1: { fontFamily: "var(--salt-text-h1-fontFamily)", fontWeight: "var(--salt-text-h1-fontWeight)", fontSize: "var(--salt-text-h1-fontSize)", lineHeight: "var(--salt-text-h1-lineHeight)" },
  h2: { fontFamily: "var(--salt-text-h2-fontFamily)", fontWeight: "var(--salt-text-h2-fontWeight)", fontSize: "var(--salt-text-h2-fontSize)", lineHeight: "var(--salt-text-h2-lineHeight)" },
  h3: { fontFamily: "var(--salt-text-h3-fontFamily)", fontWeight: "var(--salt-text-h3-fontWeight)", fontSize: "var(--salt-text-h3-fontSize)", lineHeight: "var(--salt-text-h3-lineHeight)" },
  h4: { fontFamily: "var(--salt-text-h4-fontFamily)", fontWeight: "var(--salt-text-h4-fontWeight)", fontSize: "var(--salt-text-h4-fontSize)", lineHeight: "var(--salt-text-h4-lineHeight)" },
  body: { fontFamily: "var(--salt-text-fontFamily)", fontWeight: "var(--salt-text-fontWeight)", fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)" },
  label: { fontFamily: "var(--salt-text-label-fontFamily)", fontWeight: "var(--salt-text-label-fontWeight)", fontSize: "var(--salt-text-label-fontSize)", lineHeight: "var(--salt-text-label-lineHeight)" },
};
const TAG = { h1: "h1", h2: "h2", h3: "h3", h4: "h4", body: "p", label: "span" };
const COLOR = {
  primary: "var(--salt-content-primary-foreground)",
  secondary: "var(--salt-content-secondary-foreground)",
  disabled: "var(--salt-content-primary-foreground-disabled)",
};

export function Text({ variant = "body", color = "primary", as, style, children, ...rest }) {
  const Tag = as || TAG[variant] || "span";
  return (
    <Tag style={{ ...STYLES[variant], color: COLOR[color] || COLOR.primary, margin: 0, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
export const H1 = (p) => <Text variant="h1" {...p} />;
export const H2 = (p) => <Text variant="h2" {...p} />;
export const H3 = (p) => <Text variant="h3" {...p} />;
export const H4 = (p) => <Text variant="h4" {...p} />;
