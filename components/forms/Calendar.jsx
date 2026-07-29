import React, { useState } from "react";
import { sameDay } from "./dateUtils.js";
import { Dropdown } from "./Dropdown.jsx";

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAY_LABELS = ["Mo","Tu","We","Th","Fr","Sa","Su"];

const ChevronLeft = () => (<svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor" aria-hidden="true"><path d="M8 1.5 3.5 6 8 10.5 8.7 9.8 4.9 6 8.7 2.2z"></path></svg>);
const ChevronRight = () => (<svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor" aria-hidden="true"><path d="M4 1.5 8.5 6 4 10.5 3.3 9.8 7.1 6 3.3 2.2z"></path></svg>);

const navBtnStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, border: "none", background: "none", padding: 0, color: "var(--salt-content-secondary-foreground)", cursor: "var(--salt-cursor-hover)", borderRadius: "var(--salt-palette-corner-weak)" };

function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function addMonths(d, n) { return new Date(d.getFullYear(), d.getMonth() + n, 1); }
function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }

function buildWeeks(viewMonth) {
  const first = startOfMonth(viewMonth);
  const firstWeekday = (first.getDay() + 6) % 7; // 0 = Monday
  const gridStart = addDays(first, -firstWeekday);
  const weeks = [];
  let cursor = gridStart;
  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let d = 0; d < 7; d++) { row.push(cursor); cursor = addDays(cursor, 1); }
    weeks.push(row);
  }
  return weeks;
}

/**
 * Salt-style calendar grid. Single-select fires onSelect(date) once per
 * click. Range mode fires onSelect({start, end}) — first click starts a new
 * range (end: null), second click completes it (auto-ordered chronologically);
 * clicking again after a completed range starts over. Hovering while a range
 * is half-picked previews the span that would result.
 */
export function Calendar({ mode = "single", value, onSelect, defaultMonth, size = "medium", style }) {
  const initial = defaultMonth || (mode === "single" ? value : value && value.start) || new Date();
  const [viewMonth, setViewMonth] = useState(startOfMonth(initial));
  const [hoverDate, setHoverDate] = useState(null);
  const today = new Date();

  const start = mode === "range" ? (value && value.start) : null;
  const end = mode === "range" ? (value && value.end) : null;
  const selectedSingle = mode === "single" ? value : null;

  const weeks = buildWeeks(viewMonth);
  const cellSize = size === "small" ? 28 : 32;
  const dropdownHeight = size === "small" ? 28 : 34;
  const monthDropdownWidth = 115;
  const yearDropdownWidth = 80;
  const yearOptions = [];
  for (let y = today.getFullYear() - 100; y <= today.getFullYear() + 20; y++) yearOptions.push(String(y));
  const gridWidth = cellSize * 7 + 12; // 7 columns + 6 gaps of 2px
  const headerWidth = 24 * 2 + 8 * 2 + monthDropdownWidth + yearDropdownWidth;
  const containerWidth = Math.max(gridWidth, headerWidth) + 32; // + container padding (2 * 16)

  const previewEnd = mode === "range" && start && !end ? hoverDate : end;
  const rangeStart = mode === "range" && start && previewEnd ? (start < previewEnd ? start : previewEnd) : null;
  const rangeEndD = mode === "range" && start && previewEnd ? (start < previewEnd ? previewEnd : start) : null;
  const fillStart = mode === "single" ? selectedSingle : rangeStart;
  const fillEnd = mode === "single" ? selectedSingle : rangeEndD;

  const handleDayClick = (date) => {
    if (mode === "single") { onSelect && onSelect(date); return; }
    if (!start || (start && end)) { onSelect && onSelect({ start: date, end: null }); }
    else if (date < start) { onSelect && onSelect({ start: date, end: start }); }
    else { onSelect && onSelect({ start, end: date }); }
  };

  return (
    <div style={{ width: containerWidth, padding: "var(--salt-spacing-100)", background: "var(--salt-color-white)", border: "1px solid var(--salt-color-gray-200)", borderRadius: "var(--salt-palette-corner-weak)", boxShadow: "var(--salt-overlayable-shadow-popout)", fontFamily: "var(--salt-text-fontFamily)", boxSizing: "border-box", ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: "var(--salt-spacing-75)" }}>
        <button type="button" aria-label="Previous month" onClick={() => setViewMonth((m) => addMonths(m, -1))} style={navBtnStyle} onMouseOver={(e) => { e.currentTarget.style.background = "var(--salt-color-gray-100)"; }} onMouseOut={(e) => { e.currentTarget.style.background = "none"; }}><ChevronLeft /></button>
        <Dropdown
          key={`m${viewMonth.getMonth()}`}
          aria-label="Month"
          options={MONTH_NAMES}
          defaultValue={MONTH_NAMES[viewMonth.getMonth()]}
          onChange={(e) => setViewMonth((m) => new Date(m.getFullYear(), MONTH_NAMES.indexOf(e.target.value), 1))}
          chevronPadding={8}
          style={{ minWidth: 0, width: monthDropdownWidth, height: dropdownHeight, fontSize: "var(--salt-text-fontSize)" }}
        />
        <Dropdown
          key={`y${viewMonth.getFullYear()}`}
          aria-label="Year"
          options={yearOptions}
          defaultValue={String(viewMonth.getFullYear())}
          onChange={(e) => setViewMonth((m) => new Date(parseInt(e.target.value, 10), m.getMonth(), 1))}
          chevronPadding={8}
          style={{ minWidth: 0, width: yearDropdownWidth, height: dropdownHeight, fontSize: "var(--salt-text-fontSize)" }}
        />
        <button type="button" aria-label="Next month" onClick={() => setViewMonth((m) => addMonths(m, 1))} style={navBtnStyle} onMouseOver={(e) => { e.currentTarget.style.background = "var(--salt-color-gray-100)"; }} onMouseOut={(e) => { e.currentTarget.style.background = "none"; }}><ChevronRight /></button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(7, ${cellSize}px)`, gap: 2, margin: "0 auto", width: "fit-content" }} onMouseLeave={() => setHoverDate(null)}>
        {WEEKDAY_LABELS.map((w) => (
          <div key={w} style={{ height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--salt-text-label-fontSize)", color: "var(--salt-content-secondary-foreground)" }}>{w}</div>
        ))}
        {weeks.flat().map((date, i) => {
          const inMonth = date.getMonth() === viewMonth.getMonth();
          const isToday = sameDay(date, today);
          const isSelected = mode === "single" ? sameDay(date, selectedSingle) : (sameDay(date, start) || sameDay(date, end));
          const isHoverEnd = mode === "range" && start && !end && sameDay(date, hoverDate) && !sameDay(date, start);
          const inSpan = fillStart && fillEnd && date >= fillStart && date <= fillEnd;
          const isRangeStartEdge = sameDay(date, fillStart);
          const isRangeEndEdge = sameDay(date, fillEnd);
          return (
            <div key={i} style={{ position: "relative", height: cellSize }}>
              {inSpan && (
                <div style={{
                  position: "absolute", top: 2, bottom: 2, left: 0, right: 0,
                  background: "color-mix(in srgb, var(--salt-palette-accent) 25%, transparent)",
                  borderRadius: `${isRangeStartEdge ? 4 : 0}px ${isRangeEndEdge ? 4 : 0}px ${isRangeEndEdge ? 4 : 0}px ${isRangeStartEdge ? 4 : 0}px`,
                }} />
              )}
              <button
                type="button"
                onClick={() => handleDayClick(date)}
                onMouseEnter={() => mode === "range" && setHoverDate(date)}
                style={{
                  position: "relative", width: cellSize, height: cellSize, boxSizing: "border-box",
                  border: isSelected ? "1.5px solid var(--salt-palette-accent)" : "1.5px solid transparent",
                  borderRadius: 4,
                  background: isHoverEnd ? "var(--salt-palette-accent-weakest)" : "transparent",
                  color: isSelected ? "var(--salt-content-primary-foreground)" : inMonth ? "var(--salt-content-primary-foreground)" : "var(--salt-content-secondary-foreground)",
                  opacity: inMonth ? 1 : 0.4, fontSize: "var(--salt-text-fontSize)", cursor: "var(--salt-cursor-hover)",
                }}
                onMouseOver={(e) => { if (!isSelected) e.currentTarget.style.background = mode === "range" && isHoverEnd ? "var(--salt-palette-accent-weakest)" : "var(--salt-color-gray-100)"; }}
                onMouseOut={(e) => { if (!isSelected) e.currentTarget.style.background = mode === "range" && isHoverEnd ? "var(--salt-palette-accent-weakest)" : "transparent"; }}
              >
                {date.getDate()}
              </button>
              {isToday && (
                <div aria-hidden="true" style={{ position: "absolute", left: 6, right: 6, bottom: 2, height: 3, borderRadius: 2, background: "var(--salt-palette-accent)", pointerEvents: "none" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
