import React, { useState, useRef, useEffect } from "react";

export function Menu({ items = [], onSelect = () => {}, trigger = "Menu", triggerProps = {} }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button className="saltButton saltButton-neutral saltButton-bordered" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open} {...triggerProps}>
        {trigger}
      </button>
      {open && (
        <div className="saltMenuPanel" role="menu" style={{ position: "absolute", top: "calc(100% + var(--salt-spacing-50))", left: 0 }}>
          <div className="saltMenuPanel-container">
            {items.map((item, i) => (
              <div key={i} className="saltMenuItem" role="menuitem" tabIndex={0} onClick={() => { onSelect(item); setOpen(false); }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
