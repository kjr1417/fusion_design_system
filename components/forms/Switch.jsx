import React, { useState } from "react";

export function Switch({ label, defaultChecked = false, disabled = false, onChange, ...rest }) {
  const [checked, setChecked] = useState(defaultChecked);
  const cls = ["saltSwitch", checked ? "saltSwitch-checked" : "", disabled ? "saltSwitch-disabled" : ""].filter(Boolean).join(" ");
  return (
    <label className={cls}>
      <input
        type="checkbox"
        role="switch"
        className="saltSwitch-input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => { setChecked(e.target.checked); onChange && onChange(e.target.checked); }}
        {...rest}
      />
      <span className="saltSwitch-track">
        <span className="saltSwitch-thumb" />
      </span>
      {label && <span className="saltSwitch-label">{label}</span>}
    </label>
  );
}
