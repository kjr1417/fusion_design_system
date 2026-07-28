import React, { useState } from "react";

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

  return (
    <div className={cls} style={{ ...smallStyle, ...style }}>
      {startAdornment && <span className="saltInput-startAdornmentContainer">{startAdornment}</span>}
      <input
        className="saltInput-input"
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
      {endAdornment && <span className="saltInput-endAdornmentContainer">{endAdornment}</span>}
      <div className="saltInput-activationIndicator" />
    </div>
  );
}
