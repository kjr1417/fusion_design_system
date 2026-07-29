import React, { useState } from "react";

/* OOTB Salt error adornment: small solid red dot. Replaces whatever
   endAdornment was passed once validationState="error" — the field's own
   icon (calendar, clock, clear button, etc.) steps aside so the error state
   is unambiguous. */
export const ErrorAdornmentIcon = () => (
  <svg viewBox="0 0 6 6" width="6" height="6" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="3" cy="3" r="3" fill="var(--salt-palette-negative)" />
  </svg>
);

export function Input({
  variant = "primary",
  validationState,
  disabled = false,
  readOnly = false,
  placeholder,
  defaultValue = "",
  startAdornment,
  endAdornment,
  size = "medium",
  className = "",
  style,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const isError = validationState === "error";
  const cls = [
    "saltInput",
    "saltInput-bordered",
    `saltInput-${variant}`,
    validationState ? `saltInput-${validationState}` : "",
    focused ? "saltInput-focused" : "",
    disabled ? "saltInput-disabled" : "",
    readOnly ? "saltInput-readOnly" : "",
    className,
  ].filter(Boolean).join(" ");

  const smallStyle = size === "small" ? { height: 28, minHeight: 28, minWidth: 130, fontSize: "var(--salt-text-label-fontSize)", padding: "0 var(--salt-spacing-50)" } : { minWidth: 220 };
  const resolvedEndAdornment = isError ? <ErrorAdornmentIcon /> : endAdornment;

  return (
    <div className={cls} style={{ ...smallStyle, ...style }}>
      {startAdornment && <span className="saltInput-startAdornmentContainer">{startAdornment}</span>}
      <input
        className="saltInput-input"
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={isError || undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
      {resolvedEndAdornment && <span className="saltInput-endAdornmentContainer">{resolvedEndAdornment}</span>}
      <div className="saltInput-activationIndicator" />
    </div>
  );
}
