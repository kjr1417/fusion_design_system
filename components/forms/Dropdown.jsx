import React from "react";

export function Dropdown({ options = [], defaultValue, placeholder = "Select...", disabled = false, ...rest }) {
  return (
    <div className={["saltInput", "saltInput-bordered", "saltInput-primary", disabled ? "saltInput-disabled" : ""].filter(Boolean).join(" ")}>
      <select
        className="saltInput-input"
        defaultValue={defaultValue}
        disabled={disabled}
        style={{ background: "none", border: "none", font: "inherit", color: "inherit", width: "100%", cursor: disabled ? "not-allowed" : "pointer" }}
        {...rest}
      >
        {!defaultValue && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );
}
