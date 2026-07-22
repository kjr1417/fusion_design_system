import React, { useState } from "react";

// Salt's segmented control is a toggle-button group; reuse the real Salt classes.
export function SegmentedButtonGroup({ options = [], defaultValue, value, onChange, style, ...rest }) {
  const [internal, setInternal] = useState(defaultValue ?? (options[0] && (options[0].value ?? options[0])));
  const current = value ?? internal;
  const norm = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <div className="saltToggleButtonGroup saltToggleButtonGroup-horizontal" role="group" style={style} {...rest}>
      {norm.map((o) => (
        <button
          key={o.value}
          type="button"
          className="saltToggleButton saltToggleButton-neutral"
          aria-pressed={o.value === current}
          onClick={() => { setInternal(o.value); onChange && onChange(o.value); }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
