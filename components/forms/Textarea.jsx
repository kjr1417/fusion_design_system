import React, { useState } from "react";

export function Textarea({ rows = 3, disabled = false, validationState, placeholder, defaultValue = "", characterLimit, onChange, ...rest }) {
  const [focused, setFocused] = useState(false);
  const [count, setCount] = useState(String(rest.value ?? defaultValue ?? "").length);
  const cls = [
    "saltInput", "saltInput-bordered", "saltInput-primary",
    validationState ? `saltInput-${validationState}` : "",
    focused ? "saltInput-focused" : "",
    disabled ? "saltInput-disabled" : "",
  ].filter(Boolean).join(" ");
  const handleChange = (e) => {
    setCount(e.target.value.length);
    onChange && onChange(e);
  };
  return (
    <div className={cls} style={{ height: "auto", flexDirection: "column", alignItems: "stretch", padding: "var(--salt-spacing-50) var(--salt-spacing-100)", gap: "var(--salt-spacing-25)" }}>
      <textarea
        className="saltInput-input"
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        maxLength={characterLimit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        style={{ resize: "vertical", fontFamily: "inherit", fontSize: "inherit" }}
        {...rest}
      />
      {characterLimit != null && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span className="saltInput-characterCount" style={{ fontSize: "var(--salt-text-label-fontSize)", color: "var(--salt-content-secondary-foreground)", fontVariantNumeric: "tabular-nums" }}>{count}/{characterLimit}</span>
        </div>
      )}
    </div>
  );
}
