import React, { useState } from "react";

export function Checkbox({ label, defaultChecked = false, disabled = false, ...rest }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label className={["saltCheckbox", disabled ? "saltCheckbox-disabled" : ""].filter(Boolean).join(" ")}>
      <input
        type="checkbox"
        className="saltCheckbox-input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => setChecked(e.target.checked)}
        {...rest}
      />
      <span className={["saltCheckboxIcon", checked ? "saltCheckboxIcon-checked" : ""].filter(Boolean).join(" ")}>
        <svg viewBox="0 0 14 14" width="100%" height="100%">
          {checked && <path d="M4 7l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
