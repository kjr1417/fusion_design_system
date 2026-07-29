import React from "react";
import { ErrorAdornmentIcon } from "./Input.jsx";

const ChevronDown = () => (<svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M5.618 8.593 6 9l.382-.407L11 3.661 10.236 3 6 7.524 1.764 3 1 3.66z"></path></svg>);

export function Dropdown({ options = [], defaultValue, placeholder = "Select...", disabled = false, validationState, chevronPadding, style, ...rest }) {
  const normalized = options.map((opt) => (typeof opt === "string" ? { value: opt, label: opt } : opt));
  const isError = validationState === "error";
  const cls = ["saltInput", "saltInput-bordered", "saltInput-primary", validationState ? `saltInput-${validationState}` : "", disabled ? "saltInput-disabled" : ""].filter(Boolean).join(" ");
  return (
    <div className={cls} style={{ minWidth: 220, position: "relative", ...style }}>
      <select
        className="saltInput-input"
        defaultValue={rest.value === undefined ? defaultValue : undefined}
        disabled={disabled}
        aria-invalid={isError || undefined}
        style={{ background: "none", border: "none", font: "inherit", color: "inherit", width: "100%", cursor: disabled ? "not-allowed" : "pointer", appearance: "none", WebkitAppearance: "none", paddingRight: chevronPadding ?? (isError ? 46 : 28) }}
        {...rest}
      >
        {!defaultValue && <option value="" disabled>{placeholder}</option>}
        {normalized.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, right: 4, height: "100%", display: "flex", alignItems: "center", gap: 6, color: "var(--salt-content-secondary-foreground)", pointerEvents: "none" }}>
        {isError && <ErrorAdornmentIcon />}
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20 }}><ChevronDown /></span>
      </div>
    </div>
  );
}
