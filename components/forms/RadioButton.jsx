import React, { useState } from "react";

export function RadioButton({ label, name, value, defaultChecked = false, disabled = false, ...rest }) {
  const [checked, setChecked] = React.useState(defaultChecked);
  return (
    <label className={["saltRadioButton", disabled ? "saltRadioButton-disabled" : ""].filter(Boolean).join(" ")}>
      <input
        type="radio" name={name} value={value} checked={checked} disabled={disabled}
        className="saltRadioButton-input"
        onChange={(e) => { setChecked(e.target.checked); rest.onChange && rest.onChange(e); }}
        {...rest}
      />
      <span className={["saltRadioButtonIcon", checked ? "saltRadioButtonIcon-checked" : ""].filter(Boolean).join(" ")} />
      {label && <span>{label}</span>}
    </label>
  );
}

export function RadioButtonGroup({ name, options = [], defaultValue, direction = "vertical", onChange, style, ...rest }) {
  return (
    <div role="radiogroup" style={{ display: "flex", flexDirection: direction === "horizontal" ? "row" : "column", gap: direction === "horizontal" ? 16 : 8, ...style }} {...rest}>
      {options.map((opt) => (
        <RadioButton key={opt.value} name={name} value={opt.value} label={opt.label} defaultChecked={opt.value === defaultValue} onChange={() => onChange && onChange(opt.value)} />
      ))}
    </div>
  );
}
