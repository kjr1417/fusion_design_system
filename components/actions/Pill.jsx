import React from "react";

export function Pill({ clickable = false, active = false, onClose, children, className = "", ...rest }) {
  const cls = ["saltPill", clickable ? "saltPill-clickable" : "", active ? "saltPill-active" : "", className].filter(Boolean).join(" ");
  const Tag = clickable ? "button" : "div";
  return (
    <Tag className={cls} {...rest}>
      <span style={{ padding: "0 6px" }}>{children}</span>
      {onClose && (
        <button
          aria-label="Remove"
          onClick={onClose}
          style={{ all: "unset", cursor: "pointer", display: "inline-flex", width: 12, height: 12, marginRight: 4 }}
        >
          <svg viewBox="0 0 12 12" fill="currentColor" width="10" height="10">
            <path d="m5.999 5.292 3.89-3.888.707.707L6.707 6l3.889 3.889-.707.708-3.89-3.89-3.889 3.89-.707-.708L5.292 6 1.403 2.111l.707-.708z" />
          </svg>
        </button>
      )}
    </Tag>
  );
}
