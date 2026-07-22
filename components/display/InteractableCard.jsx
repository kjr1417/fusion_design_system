import React from "react";

export function InteractableCard({ variant = "primary", accent, disabled = false, selected = false, className = "", style, onClick, children, ...rest }) {
  const cls = [
    "saltInteractableCard",
    `saltInteractableCard-${variant}`,
    accent ? "saltInteractableCard-accent" : "",
    accent ? `saltInteractableCard-accent${accent.charAt(0).toUpperCase()}${accent.slice(1)}` : "",
    disabled ? "saltInteractableCard-disabled" : "",
    selected ? "saltInteractableCard-selected" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className={cls} role="button" tabIndex={disabled ? -1 : 0} aria-disabled={disabled} onClick={disabled ? undefined : onClick} style={style} {...rest}>
      {children}
    </div>
  );
}
