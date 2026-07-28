import React, { useState } from "react";

export function RadioButton({ label, name, value, checked: checkedProp, defaultChecked = false, disabled = false, onChange, ...rest }) {
  const controlled = checkedProp !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const checked = controlled ? checkedProp : internalChecked;
  return (
    <label className={["saltRadioButton", disabled ? "saltRadioButton-disabled" : ""].filter(Boolean).join(" ")}>
      <input
        type="radio" name={name} value={value} checked={checked} disabled={disabled}
        className="saltRadioButton-input"
        onChange={(e) => { if (!controlled) setInternalChecked(e.target.checked); onChange && onChange(e); }}
        {...rest}
      />
      <span className={["saltRadioButtonIcon", checked ? "saltRadioButtonIcon-checked" : ""].filter(Boolean).join(" ")} />
      {label && <span>{label}</span>}
    </label>
  );
}

export function RadioButtonGroup({ name, options = [], defaultValue, direction = "vertical", onChange, style, ...rest }) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <div role="radiogroup" style={{ display: "flex", flexDirection: direction === "horizontal" ? "row" : "column", gap: direction === "horizontal" ? 16 : 8, marginTop: "var(--salt-spacing-75)", marginBottom: "var(--salt-spacing-75)", ...style }} {...rest}>
      {options.map((opt) => (
        <RadioButton key={opt.value} name={name} value={opt.value} label={opt.label} checked={value === opt.value} disabled={opt.disabled} onChange={() => { setValue(opt.value); onChange && onChange(opt.value); }} />
      ))}
    </div>
  );
}
