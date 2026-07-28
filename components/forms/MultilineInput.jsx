import React, { useState } from "react";

export function MultilineInput({ rows = 3, disabled = false, validationState, placeholder, defaultValue = "", bordered = true, startAdornment, endAdornment, ...rest }) {
  const [focused, setFocused] = useState(false);
  const cls = [
    "saltInput", bordered ? "saltInput-bordered" : "", "saltInput-primary",
    validationState ? `saltInput-${validationState}` : "",
    focused ? "saltInput-focused" : "",
    disabled ? "saltInput-disabled" : "",
  ].filter(Boolean).join(" ");
  return (
    <div className={cls} style={{ height: "auto", alignItems: "flex-start", minWidth: 220, padding: "var(--salt-spacing-50) var(--salt-spacing-100)" }}>
      {startAdornment && <span className="saltInput-startAdornmentContainer" style={{ marginTop: 2 }}>{startAdornment}</span>}
      <textarea
        className="saltInput-input"
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ resize: "vertical", fontFamily: "inherit", fontSize: "inherit", width: "100%" }}
        {...rest}
      />
      {endAdornment && <span className="saltInput-endAdornmentContainer" style={{ marginTop: 2 }}>{endAdornment}</span>}
    </div>
  );
}
