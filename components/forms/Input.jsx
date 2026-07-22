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
  className = "",
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

  return (
    <div className={cls}>
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
