import React, { useRef, useState, useEffect } from "react";

const ClockIcon = () => (<svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M6 3V6H3V7H7V3H6Z"></path><path fillRule="evenodd" clipRule="evenodd" d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"></path></svg>);

const SEGMENT_PLACEHOLDER = { hh: "hh", mm: "mm", ss: "ss", ap: "aa" };

function parseValue(str, mode12, showSeconds) {
  const empty = { hh: "", mm: "", ss: "", ap: "" };
  if (!str) return empty;
  const m = String(str).trim().match(showSeconds
    ? (mode12 ? /^(\d{1,2}):(\d{2}):(\d{2})\s*(AM|PM)$/i : /^(\d{1,2}):(\d{2}):(\d{2})$/)
    : (mode12 ? /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i : /^(\d{1,2}):(\d{2})$/));
  if (!m) return empty;
  if (showSeconds) return { hh: m[1].padStart(2, "0"), mm: m[2], ss: m[3], ap: mode12 ? m[4].toUpperCase() : "" };
  return { hh: m[1].padStart(2, "0"), mm: m[2], ss: "", ap: mode12 ? m[3].toUpperCase() : "" };
}

function formatValue(values, mode12, showSeconds) {
  if (!values.hh || !values.mm || (showSeconds && !values.ss) || (mode12 && !values.ap)) return "";
  let out = `${values.hh}:${values.mm}`;
  if (showSeconds) out += `:${values.ss}`;
  if (mode12) out += ` ${values.ap}`;
  return out;
}

function segmentValid(key, values, mode12) {
  const v = values[key];
  if (!v || v.length < 2) return false;
  if (key === "ap") return v === "AM" || v === "PM";
  const n = parseInt(v, 10);
  if (key === "hh") return mode12 ? n >= 1 && n <= 12 : n >= 0 && n <= 23;
  return n >= 0 && n <= 59; // mm, ss
}

const SEGMENT_LABEL = { hh: "Hour", mm: "Minutes", ss: "Seconds" };

function firstErrorMessage(order, values, mode12) {
  for (const key of order) {
    const v = values[key] || "";
    if (key === "ap") { if (!v) return "Select AM or PM."; continue; }
    if (v.length < 2) return `${SEGMENT_LABEL[key]} is incomplete.`;
    const n = parseInt(v, 10);
    if (key === "hh") {
      const [min, max] = mode12 ? [1, 12] : [0, 23];
      if (n < min || n > max) return `Hour must be between ${String(min).padStart(2, "0")}-${max}.`;
    } else if (n < 0 || n > 59) {
      return `${SEGMENT_LABEL[key]} must be between 00-59.`;
    }
  }
  return "";
}

function Segment({ segKey, value, focused, onKeyDownSeg, onFocusSeg, onBlurSeg, setRef }) {
  return (
    <span
      ref={setRef}
      tabIndex={0}
      role="spinbutton"
      aria-label={segKey === "ap" ? "Meridiem" : segKey}
      onKeyDown={(e) => onKeyDownSeg(segKey, e)}
      onFocus={() => onFocusSeg(segKey)}
      onBlur={onBlurSeg}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        minWidth: "1.6em", height: "1.6em", padding: "0 2px", borderRadius: 2,
        background: focused ? "var(--salt-color-blue-100)" : "transparent",
        color: value ? "var(--salt-content-primary-foreground)" : "var(--salt-content-secondary-foreground)",
        outline: "none", cursor: "text", fontVariantNumeric: "tabular-nums",
      }}
    >
      {value || SEGMENT_PLACEHOLDER[segKey]}
    </span>
  );
}

/**
 * Segmented time field — hh : mm [: ss]  aa, each unit independently typeable
 * (auto-advances after two characters; digits only in hh/mm/ss, A/P only in
 * the meridiem segment). Always renders at the compact "small" field size and
 * never stretches to fill its container. `mode="24h"` drops the meridiem
 * segment; `showSeconds` adds the ss segment (off by default — reserved for
 * technical use cases).
 */
export function TimeInput({ mode = "12h", showSeconds = false, defaultValue = "", value, onChange, disabled = false, validationState, style }) {
  const mode12 = mode === "12h";
  const isControlled = value !== undefined;
  const [values, setValues] = useState(() => parseValue(isControlled ? value : defaultValue, mode12, showSeconds));
  const [focusedKey, setFocusedKey] = useState(null);
  const [touched, setTouched] = useState(false);
  const refs = useRef({});
  const containerRef = useRef(null);

  useEffect(() => {
    if (isControlled) setValues(parseValue(value, mode12, showSeconds));
  }, [value, mode12, showSeconds, isControlled]);

  const order = ["hh", "mm", ...(showSeconds ? ["ss"] : []), ...(mode12 ? ["ap"] : [])];

  const focusSeg = (key) => refs.current[key] && refs.current[key].focus();
  const focusNext = (from) => { const i = order.indexOf(from); if (i < order.length - 1) focusSeg(order[i + 1]); };
  const focusPrev = (from) => { const i = order.indexOf(from); if (i > 0) focusSeg(order[i - 1]); };

  const update = (next) => {
    setValues(next);
    const formatted = formatValue(next, mode12, showSeconds);
    onChange && onChange({ target: { value: formatted } });
  };

  const handleKeyDown = (key, e) => {
    if (disabled) return;
    if (e.key === "Tab") return;
    if (e.key === "ArrowLeft") { e.preventDefault(); focusPrev(key); return; }
    if (e.key === "ArrowRight") { e.preventDefault(); focusNext(key); return; }
    if (e.key === "Backspace") {
      e.preventDefault();
      const cur = values[key] || "";
      if (cur) update({ ...values, [key]: cur.slice(0, -1) });
      else focusPrev(key);
      return;
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      if (key === "ap") { update({ ...values, ap: values.ap === "AM" ? "PM" : "AM" }); return; }
      const min = key === "hh" ? (mode12 ? 1 : 0) : 0;
      const max = key === "hh" ? (mode12 ? 12 : 23) : 59;
      let n = parseInt(values[key], 10);
      if (isNaN(n)) { n = e.key === "ArrowUp" ? min : max; }
      else {
        n = e.key === "ArrowUp" ? n + 1 : n - 1;
        if (n > max) n = min;
        if (n < min) n = max;
      }
      update({ ...values, [key]: String(n).padStart(2, "0") });
      return;
    }
    e.preventDefault();
    if (key === "ap") {
      if (/^[ap]$/i.test(e.key)) update({ ...values, ap: e.key.toLowerCase() === "a" ? "AM" : "PM" });
      return;
    }
    if (/^[0-9]$/.test(e.key)) {
      let cur = values[key] || "";
      if (cur.length >= 2) cur = "";
      const next = cur + e.key;
      update({ ...values, [key]: next });
      if (next.length === 2) focusNext(key);
    }
  };

  const allEmpty = order.every((k) => !values[k]);
  const allValid = order.every((k) => segmentValid(k, values, mode12));
  const isError = validationState === "error" || (touched && !allEmpty && !allValid);
  const errorMessage = isError ? firstErrorMessage(order, values, mode12) : "";
  const isFocused = focusedKey != null;

  const cls = ["saltInput", "saltInput-bordered", "saltInput-primary", isError ? "saltInput-error" : "", isFocused ? "saltInput-focused" : "", disabled ? "saltInput-disabled" : ""].filter(Boolean).join(" ");

  const handleContainerBlur = (e) => {
    if (containerRef.current && e.relatedTarget && containerRef.current.contains(e.relatedTarget)) return;
    setFocusedKey(null);
    setTouched(true);
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: "var(--salt-spacing-25)", width: "fit-content" }}>
    <div
      ref={containerRef}
      className={cls}
      onBlur={handleContainerBlur}
      style={{ display: "inline-flex", flex: "none", width: "fit-content", height: 28, minHeight: 28, minWidth: 0, fontSize: "var(--salt-text-label-fontSize)", padding: "0 var(--salt-spacing-50)", alignItems: "center", gap: "var(--salt-spacing-50)", ...style }}
    >
      <Segment segKey="hh" value={values.hh} focused={focusedKey === "hh"} onKeyDownSeg={handleKeyDown} onFocusSeg={setFocusedKey} onBlurSeg={() => {}} setRef={(el) => (refs.current.hh = el)} />
      <span aria-hidden="true" style={{ color: "var(--salt-content-secondary-foreground)" }}>:</span>
      <Segment segKey="mm" value={values.mm} focused={focusedKey === "mm"} onKeyDownSeg={handleKeyDown} onFocusSeg={setFocusedKey} onBlurSeg={() => {}} setRef={(el) => (refs.current.mm = el)} />
      {showSeconds && (
        <React.Fragment>
          <span aria-hidden="true" style={{ color: "var(--salt-content-secondary-foreground)" }}>:</span>
          <Segment segKey="ss" value={values.ss} focused={focusedKey === "ss"} onKeyDownSeg={handleKeyDown} onFocusSeg={setFocusedKey} onBlurSeg={() => {}} setRef={(el) => (refs.current.ss = el)} />
        </React.Fragment>
      )}
      {mode12 && (
        <React.Fragment>
          <span aria-hidden="true" style={{ width: "1em" }} />
          <Segment segKey="ap" value={values.ap} focused={focusedKey === "ap"} onKeyDownSeg={handleKeyDown} onFocusSeg={setFocusedKey} onBlurSeg={() => {}} setRef={(el) => (refs.current.ap = el)} />
        </React.Fragment>
      )}
      <span style={{ display: "inline-flex", marginLeft: "auto", paddingLeft: 4, color: isError ? "var(--salt-palette-negative)" : "var(--salt-content-secondary-foreground)" }}>
        {isError ? (
          <svg viewBox="0 0 6 6" width="6" height="6" aria-hidden="true"><circle cx="3" cy="3" r="3" fill="var(--salt-palette-negative)" /></svg>
        ) : (
          <ClockIcon />
        )}
      </span>
    </div>
    {isError && errorMessage && (
      <span role="alert" style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-25)", fontFamily: "var(--salt-text-label-fontFamily)", fontStyle: "italic", fontSize: "var(--salt-text-label-fontSize)", lineHeight: "var(--salt-text-label-lineHeight)", color: "var(--salt-palette-negative)" }}>
        <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" style={{ flex: "none", fill: "var(--salt-palette-negative)" }}>
          <path fillRule="evenodd" clipRule="evenodd" d="M9 0H3L0 3v6l3 3h6l3-3V3zM7 2H5v5h2zm-1 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2"></path>
        </svg>
        <span style={{ flex: 1 }}>{errorMessage}</span>
      </span>
    )}
    </div>
  );
}
