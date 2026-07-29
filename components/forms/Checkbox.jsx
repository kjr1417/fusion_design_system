import React, { useState } from "react";

export function Checkbox({ label, checked: checkedProp, defaultChecked = false, indeterminate = false, disabled = false, validationState, onChange, ...rest }) {
  const controlled = checkedProp !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = controlled ? checkedProp : internalChecked;
  const inputRef = React.useRef(null);
  React.useEffect(() => { if (inputRef.current) inputRef.current.indeterminate = !!indeterminate && !checked; }, [indeterminate, checked]);
  return (
    <label className={["saltCheckbox", disabled ? "saltCheckbox-disabled" : ""].filter(Boolean).join(" ")}>
      <input
        ref={inputRef}
        type="checkbox"
        className="saltCheckbox-input"
        checked={checked}
        disabled={disabled}
        aria-invalid={validationState === "error" || undefined}
        onChange={(e) => { if (!controlled) setInternalChecked(e.target.checked); onChange && onChange(e); }}
        {...rest}
      />
      <span className={["saltCheckboxIcon", (checked || indeterminate) ? "saltCheckboxIcon-checked" : "", (validationState === "error" && !checked && !indeterminate) ? "saltCheckboxIcon-error" : ""].filter(Boolean).join(" ")}>
        <svg viewBox="0 0 14 14" width="100%" height="100%">
          {checked && <path d="M4 7l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          {!checked && indeterminate && <path d="M4 7h6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />}
        </svg>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}

export function CheckboxGroup({ options = [], defaultValue = [], direction = "vertical", error = false, errorMessage, onChange, style, ...rest }) {
  const [checked, setChecked] = useState(new Set(defaultValue));
  const toggle = (value) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      onChange && onChange(Array.from(next));
      return next;
    });
  };
  const showError = !!(error && errorMessage);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-50)" }}>
      <div role="group" style={{ display: "flex", flexDirection: direction === "horizontal" ? "row" : "column", gap: direction === "horizontal" ? "var(--salt-spacing-200)" : "var(--salt-spacing-50)", flexWrap: direction === "horizontal" ? "wrap" : "nowrap", marginTop: "var(--salt-spacing-75)", marginBottom: "var(--salt-spacing-75)", ...style }} {...rest}>
        {options.map((opt) => (
          <Checkbox key={opt.value} label={opt.label} checked={checked.has(opt.value)} onChange={() => toggle(opt.value)} disabled={opt.disabled} validationState={error ? "error" : undefined} />
        ))}
      </div>
      {showError && (
        <span role="alert" style={{
          display: "flex", alignItems: "center", gap: "var(--salt-spacing-25)",
          fontFamily: "var(--salt-text-label-fontFamily)", fontStyle: "italic",
          fontSize: "var(--salt-text-label-fontSize)", lineHeight: "var(--salt-text-label-lineHeight)",
          color: "var(--salt-palette-negative)",
        }}>
          <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" style={{ flex: "none", fill: "var(--salt-palette-negative)" }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M9 0H3L0 3v6l3 3h6l3-3V3zM7 2H5v5h2zm-1 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2"></path>
          </svg>
          <span style={{ flex: 1 }}>{errorMessage}</span>
        </span>
      )}
    </div>
  );
}
