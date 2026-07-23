import React from "react";
import { Button } from "./Button.jsx";

function ActionButton({ action, appearance, sentiment }) {
  const { label, onClick, style, ...rest } = action;
  return (
    <Button appearance={appearance} sentiment={sentiment} onClick={onClick} style={{ whiteSpace: "nowrap", flexShrink: 0, ...style }} {...rest}>
      {label}
    </Button>
  );
}

export function InlineButtons({
  direction = "right-to-left",
  primaryAction,
  secondaryActions = [],
  tertiaryActions = [],
  className = "",
  style,
  ...rest
}) {
  const cls = ["fusionInlineButtons", className].filter(Boolean).join(" ");
  const ordered = direction === "left-to-right"
    ? [primaryAction ? <ActionButton key="p" action={primaryAction} appearance="solid" sentiment="accented" /> : null,
       ...secondaryActions.map((a, i) => <ActionButton key={`s${i}`} action={a} appearance="bordered" sentiment="neutral" />),
       ...tertiaryActions.map((a, i) => <ActionButton key={`t${i}`} action={a} appearance="transparent" sentiment="neutral" />)]
    : [...tertiaryActions.map((a, i) => <ActionButton key={`t${i}`} action={a} appearance="transparent" sentiment="neutral" />),
       ...secondaryActions.map((a, i) => <ActionButton key={`s${i}`} action={a} appearance="bordered" sentiment="neutral" />),
       primaryAction ? <ActionButton key="p" action={primaryAction} appearance="solid" sentiment="accented" /> : null];

  return (
    <div
      className={cls}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--salt-spacing-100)",
        justifyContent: direction === "left-to-right" ? "flex-start" : "flex-end",
        ...style,
      }}
      {...rest}
    >
      {ordered}
    </div>
  );
}
