import React, { useState } from "react";
import { ErrorAdornmentIcon } from "./Input.jsx";

export function MultilineInput({ rows = 3, disabled = false, validationState, placeholder, defaultValue = "", bordered = true, startAdornment, endAdornment, characterLimit, onChange, ...rest }) {
  const [focused, setFocused] = useState(false);
  const [count, setCount] = useState(String(rest.value ?? defaultValue ?? "").length);
  const isError = validationState === "error";
  const cls = [
    "saltInput", bordered ? "saltInput-bordered" : "", "saltInput-primary",
    validationState ? `saltInput-${validationState}` : "",
    focused ? "saltInput-focused" : "",
    disabled ? "saltInput-disabled" : "",
  ].filter(Boolean).join(" ");
  const resolvedEndAdornment = isError ? <ErrorAdornmentIcon /> : endAdornment;
  const handleChange = (e) => {
    setCount(e.target.value.length);
    onChange && onChange(e);
  };
  return (
    <div className={cls} style={{ height: "auto", flexDirection: "column", alignItems: "stretch", minWidth: 220, padding: "var(--salt-spacing-50) var(--salt-spacing-100)", gap: "var(--salt-spacing-25)" }}>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {startAdornment && <span className="saltInput-startAdornmentContainer" style={{ marginTop: 2 }}>{startAdornment}</span>}
        <textarea
          className="saltInput-input"
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={defaultValue}
          maxLength={characterLimit}
          aria-invalid={isError || undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          style={{ resize: "vertical", fontFamily: "inherit", fontSize: "inherit", width: "100%" }}
          {...rest}
        />
        {resolvedEndAdornment && <span className="saltInput-endAdornmentContainer" style={{ marginTop: 2 }}>{resolvedEndAdornment}</span>}
      </div>
      {characterLimit != null && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span className="saltInput-characterCount" style={{ fontSize: "var(--salt-text-label-fontSize)", color: "var(--salt-content-secondary-foreground)", fontVariantNumeric: "tabular-nums" }}>{count}/{characterLimit}</span>
        </div>
      )}
    </div>
  );
}
