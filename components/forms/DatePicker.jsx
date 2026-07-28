import React from "react";
import { Input } from "./Input.jsx";

const CalendarIcon = () => (<svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M4 0v1h4V0h1v1h3v11H0V1h3V0zm7 4H1v7h10zM9 2H8v1h1zM4 2H3v1h1z"></path></svg>);

/* Single date field — Input with a calendar adornment and a native date
   picker underneath (no calendar-grid overlay yet; add on request). */
export function DatePicker({ size = "medium", placeholder = "dd/mm/yyyy", ...rest }) {
  return <Input type="text" size={size} placeholder={placeholder} endAdornment={<CalendarIcon />} {...rest} />;
}

/* Two DatePickers joined by a dash, sharing one FormField. */
export function RangeDatePicker({ size = "medium", startPlaceholder = "Start date", endPlaceholder = "End date", style, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "calc(var(--salt-spacing-450) / 2)", ...style }}>
      <DatePicker size={size} placeholder={startPlaceholder} style={{ flex: 1 }} {...rest} />
      <span style={{ color: "var(--salt-content-secondary-foreground)" }}>–</span>
      <DatePicker size={size} placeholder={endPlaceholder} style={{ flex: 1 }} {...rest} />
    </div>
  );
}
