import React, { useState, useRef, useEffect } from "react";
import { Input } from "./Input.jsx";
import { Calendar } from "./Calendar.jsx";
import { formatDate, parseDate } from "./dateUtils.js";

const CalendarIcon = () => (<svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M4 0v1h4V0h1v1h3v11H0V1h3V0zm7 4H1v7h10zM9 2H8v1h1zM4 2H3v1h1z"></path></svg>);

function usePopoverDismiss(open, setOpen, ref) {
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
}

/* Single date field — Input with a calendar adornment. Clicking the
   adornment opens a Calendar popover; picking a day writes the formatted
   date into the field. `disableCalendar`/`onCalendarIconClick` let
   RangeDatePicker drive a single shared popover from either field's icon. */
export function DatePicker({ size = "medium", placeholder = "dd mmm yyyy", defaultValue = "", value, onChange, disableCalendar = false, onCalendarIconClick, style, ...rest }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(value ?? defaultValue);
  const ref = useRef(null);
  const isControlled = value !== undefined;
  const shownValue = isControlled ? value : text;
  usePopoverDismiss(open, setOpen, ref);

  const emit = (v) => {
    if (!isControlled) setText(v);
    onChange && onChange({ target: { value: v } });
  };

  const handleIconClick = (e) => {
    e.stopPropagation();
    if (onCalendarIconClick) { onCalendarIconClick(e); return; }
    if (!disableCalendar) setOpen((o) => !o);
  };

  const handleSelect = (date) => {
    emit(formatDate(date));
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex", ...style }}>
      <Input
        type="text"
        size={size}
        placeholder={placeholder}
        value={shownValue}
        onChange={(e) => emit(e.target.value)}
        endAdornment={
          <button type="button" aria-label="Open calendar" onClick={handleIconClick} style={{ display: "inline-flex", border: "none", background: "none", padding: 0, color: "inherit", cursor: "var(--salt-cursor-hover)" }}>
            <CalendarIcon />
          </button>
        }
        {...rest}
      />
      {open && !disableCalendar && (
        <div style={{ position: "absolute", zIndex: 20, top: "calc(100% + 4px)", left: 0 }}>
          <Calendar mode="single" size={size} value={parseDate(shownValue)} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
}

/* Two DatePickers joined by a dash, sharing one range calendar popover —
   opened from either field's calendar icon and filling both on selection. */
export function RangeDatePicker({ size = "medium", startPlaceholder = "Start date", endPlaceholder = "End date", value, defaultValue, onChange, style, ...rest }) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState(() => value ?? defaultValue ?? { start: "", end: "" });
  const ref = useRef(null);
  const isControlled = value !== undefined;
  const shown = isControlled ? value : range;
  usePopoverDismiss(open, setOpen, ref);

  const emit = (next) => {
    if (!isControlled) setRange(next);
    onChange && onChange(next);
  };

  const handleSelect = (sel) => {
    emit({ start: sel.start ? formatDate(sel.start) : "", end: sel.end ? formatDate(sel.end) : "" });
    if (sel.start && sel.end) setOpen(false);
  };

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: "calc(var(--salt-spacing-450) / 2)", position: "relative", ...style }}>
      <DatePicker size={size} placeholder={startPlaceholder} value={shown.start} onChange={(e) => emit({ ...shown, start: e.target.value })} disableCalendar onCalendarIconClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }} style={{ flex: 1 }} {...rest} />
      <span style={{ color: "var(--salt-content-secondary-foreground)" }}>–</span>
      <DatePicker size={size} placeholder={endPlaceholder} value={shown.end} onChange={(e) => emit({ ...shown, end: e.target.value })} disableCalendar onCalendarIconClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }} style={{ flex: 1 }} {...rest} />
      {open && (
        <div style={{ position: "absolute", zIndex: 20, top: "calc(100% + 4px)", left: 0 }}>
          <Calendar mode="range" size={size} value={{ start: parseDate(shown.start), end: parseDate(shown.end) }} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
}
