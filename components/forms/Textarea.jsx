import React, { useState } from "react";

export function Textarea({ rows = 3, disabled = false, validationState, placeholder, defaultValue = "", ...rest }) {
  const [focused, setFocused] = useState(false);
  const cls = [
    "saltInput", "saltInput-bordered", "saltInput-primary",
    validationState ? `saltInput-${validationState}` : "",
    focused ? "saltInput-focused" : "",
    disabled ? "saltInput-disabled" : "",
  ].filter(Boolean).join(" ");
  return (
    <div className={cls} style={{ height: "auto", alignItems: "flex-start", padding: "var(--salt-spacing-50) var(--salt-spacing-100)" }}>
      <textarea
        className="saltInput-input"
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ resize: "vertical", fontFamily: "inherit", fontSize: "inherit" }}
        {...rest}
      />
    </div>
  );
}
