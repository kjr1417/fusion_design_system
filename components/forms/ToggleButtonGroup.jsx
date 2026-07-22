import React, { useState } from "react";

export function ToggleButtonGroup({ options = [], defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue ?? options[0]?.value);
  return (
    <div className="saltToggleButtonGroup saltToggleButtonGroup-horizontal" role="group">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className="saltToggleButton saltToggleButton-neutral"
          aria-pressed={value === opt.value}
          onClick={() => { setValue(opt.value); onChange && onChange(opt.value); }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
