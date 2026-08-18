import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";

export function Menu({ items = [], onSelect = () => {}, trigger = "Menu", triggerProps = {}, triggerAppearance = "bordered" }) {
  const [open, setOpen] = useState(false);
  const [menuRect, setMenuRect] = useState(null);
  const ref = useRef(null);
  const panelRef = useRef(null);
  const { className: extraClassName, style: extraStyle, ...restTriggerProps } = triggerProps;

  const updateMenuRect = useCallback(() => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - r.bottom;
    const spaceAbove = r.top;
    const openUp = spaceBelow < 160 && spaceAbove > spaceBelow;
    setMenuRect(openUp ? { bottom: window.innerHeight - r.top + 4, left: r.left } : { top: r.bottom + 4, left: r.left });
  }, []);

  useEffect(() => {
    if (!open) return;
    updateMenuRect();
    const close = (e) => {
      if (ref.current && ref.current.contains(e.target)) return;
      if (panelRef.current && panelRef.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", close);
    window.addEventListener("resize", updateMenuRect);
    window.addEventListener("scroll", updateMenuRect, true);
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("resize", updateMenuRect);
      window.removeEventListener("scroll", updateMenuRect, true);
    };
  }, [open, updateMenuRect]);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        className={["saltButton", "saltButton-neutral", triggerAppearance === "transparent" ? "saltButton-transparent" : "saltButton-bordered", extraClassName].filter(Boolean).join(" ")}
        onClick={(e) => { e.currentTarget.blur(); setOpen((o) => !o); }}
        aria-haspopup="menu"
        aria-expanded={open}
        style={triggerAppearance === "transparent" ? { outline: "none", ...extraStyle } : extraStyle}
        {...restTriggerProps}
      >
        {trigger}
      </button>
      {open && menuRect ? ReactDOM.createPortal(
        <div ref={panelRef} className="salt-theme saltMenuPanel" role="menu" style={{ position: "fixed", ...(menuRect.bottom !== undefined ? { bottom: menuRect.bottom } : { top: menuRect.top }), left: menuRect.left, zIndex: 10000 }}>
          <div className="saltMenuPanel-container">
            {items.map((item, i) => (
              <div key={i} className="saltMenuItem" role="menuitem" tabIndex={0} onClick={() => { onSelect(item); setOpen(false); }}>
                {item}
              </div>
            ))}
          </div>
        </div>,
        document.body
      ) : null}
    </div>
  );
}
