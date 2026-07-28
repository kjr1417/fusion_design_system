import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Checkbox } from "./Checkbox.jsx";

const ChevronDown = () => (<svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M5.618 8.593 6 9l.382-.407L11 3.661 10.236 3 6 7.524 1.764 3 1 3.66z"></path></svg>);
const CloseIcon = () => (<svg viewBox="0 0 12 12" width="9" height="9" fill="currentColor" aria-hidden="true"><path d="m5.999 5.292 3.89-3.888.707.707L6.707 6l3.889 3.889-.707.708-3.89-3.89-3.889 3.89-.707-.708L5.292 6 1.403 2.111l.707-.708z"></path></svg>);

const PILL_MAX_WIDTH = 190;
const CONTROL_MAX_HEIGHT = 88;

function Pill({ label, onRemove }) {
  const textRef = useRef(null);
  const [truncated, setTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const check = () => setTruncated(el.scrollWidth > el.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [label]);

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4, maxWidth: PILL_MAX_WIDTH,
      background: "var(--salt-palette-accent-weakest)", color: "var(--salt-content-accent-foreground)",
      borderRadius: "var(--salt-palette-corner-pill, 999px)", padding: "2px 4px 2px 8px",
      fontSize: "var(--salt-text-label-fontSize)", lineHeight: "var(--salt-text-label-lineHeight)",
    }}>
      <span ref={textRef} title={truncated ? label : undefined} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{label}</span>
      <button type="button" aria-label={`Remove ${label}`} onClick={onRemove} style={{ display: "inline-flex", flex: "none", border: "none", background: "none", padding: 2, color: "inherit", cursor: "var(--salt-cursor-hover)" }}>
        <CloseIcon />
      </button>
    </span>
  );
}

/* Salt-style combo box: type-ahead search over `options`, single- or
   multi-select. Multi-select renders chosen values as removable chips
   (max 240px, ellipsis + hover tooltip when truncated). When chips overflow
   the field's single visible row, a "+n" indicator replaces the rest;
   clicking it expands the control (max 88px / ~3 rows, scrollable, last row
   partially clipped to hint more) and reveals a clear-all icon beside the
   chevron. */
export function ComboBox({
  options = [],
  multiselect = false,
  defaultValue,
  placeholder = "Search...",
  size = "medium",
  disabled = false,
  validationState,
  onChange,
  style,
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const [selected, setSelected] = useState(() => multiselect ? (defaultValue || []) : (defaultValue || ""));
  const ref = useRef(null);
  const rowRef = useRef(null);
  const measureRefs = useRef([]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Measure how many chips fit on one collapsed row from an always-fully-rendered,
  // visibility:hidden measuring copy (so hiding chips in the visible row never feeds
  // back into their own width — that caused chips to be miscounted as fitting).
  useLayoutEffect(() => {
    if (!multiselect || expanded) return;
    const row = rowRef.current;
    if (!row || selected.length === 0) { setVisibleCount(selected.length); return; }
    const recalc = () => {
      const available = row.clientWidth - 44; // reserve for "+n" badge
      let used = 0, count = 0;
      for (let i = 0; i < selected.length; i++) {
        const chip = measureRefs.current[i];
        if (!chip) break;
        const w = chip.offsetWidth + 4;
        if (i > 0 && used + w > available) break;
        used += w;
        count++;
      }
      setVisibleCount(count);
    };
    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(row);
    return () => ro.disconnect();
  }, [selected, expanded, multiselect]);

  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
  const selectedLabel = !multiselect && selected ? (options.find((o) => o.value === selected)?.label || "") : "";

  const pick = (opt) => {
    if (multiselect) {
      const next = selected.includes(opt.value) ? selected.filter((v) => v !== opt.value) : [...selected, opt.value];
      setSelected(next);
      onChange && onChange(next);
      setQuery("");
    } else {
      setSelected(opt.value);
      onChange && onChange(opt.value);
      setQuery("");
      setOpen(false);
    }
  };

  const removeChip = (value, e) => {
    e.stopPropagation();
    const next = selected.filter((v) => v !== value);
    setSelected(next);
    onChange && onChange(next);
  };

  const clearAll = (e) => {
    e.stopPropagation();
    setSelected([]);
    setExpanded(false);
    onChange && onChange([]);
  };

  const smallStyle = size === "small" ? { minHeight: 28, minWidth: 130, fontSize: "var(--salt-text-label-fontSize)", padding: "2px var(--salt-spacing-50)" } : { minWidth: 220, padding: multiselect ? "var(--salt-spacing-25) var(--salt-spacing-100) var(--salt-spacing-25) var(--salt-spacing-50)" : undefined };

  const cls = [
    "saltInput", "saltInput-bordered", "saltInput-primary",
    validationState ? `saltInput-${validationState}` : "",
    open ? "saltInput-focused" : "",
    disabled ? "saltInput-disabled" : "",
  ].filter(Boolean).join(" ");

  // Collapsed row shows as many chips as fit (measured), then a "+n" badge for the rest.
  const overflowCount = multiselect ? Math.max(0, selected.length - visibleCount) : 0;
  const iconGutter = multiselect ? (expanded ? 52 : 28) : 0;

  return (
    <div ref={ref} style={{ position: "relative", ...style }}>
      <div
        className={cls}
        style={{
          height: "auto", minHeight: "var(--salt-size-base)", cursor: disabled ? "not-allowed" : "text",
          position: "relative", paddingRight: iconGutter || undefined,
          maxHeight: multiselect && expanded ? CONTROL_MAX_HEIGHT : undefined,
          overflowY: multiselect && expanded ? "auto" : undefined,
          alignItems: multiselect && expanded ? "flex-start" : "center",
          ...smallStyle,
        }}
        onClick={() => !disabled && setOpen(true)}
      >
        <div ref={rowRef} style={{ display: "flex", flexWrap: multiselect && expanded ? "wrap" : "nowrap", alignItems: "center", gap: 4, flex: 1, minWidth: 0, overflow: multiselect && !expanded ? "hidden" : undefined }}>
          {multiselect && selected.map((v, i) => {
            const opt = options.find((o) => o.value === v);
            if (!opt) return null;
            if (!expanded && i >= visibleCount) return null;
            return (
              <span key={v} style={{ display: "inline-flex", flex: "none" }}>
                <Pill label={opt.label} onRemove={(e) => removeChip(v, e)} />
              </span>
            );
          })}
          {multiselect && !expanded && overflowCount > 0 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
              style={{
                flex: "none", border: "none", background: "var(--salt-color-gray-100)", color: "var(--salt-content-secondary-foreground)",
                borderRadius: "var(--salt-palette-corner-pill, 999px)", padding: "2px 8px", fontSize: "var(--salt-text-label-fontSize)",
                cursor: "var(--salt-cursor-hover)",
              }}
            >
              +{overflowCount}
            </button>
          )}
          <input
            className="saltInput-input"
            style={{ minWidth: 60, flex: "1 1 auto", display: multiselect && !expanded && selected.length > 0 ? "none" : undefined }}
            disabled={disabled}
            placeholder={multiselect ? (selected.length ? "" : placeholder) : (selectedLabel || placeholder)}
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          />
        </div>
      </div>
      {multiselect && !expanded && selected.length > 0 && (
        <div aria-hidden="true" style={{ position: "absolute", visibility: "hidden", top: 0, left: 0, height: 0, overflow: "hidden", display: "flex", gap: 4, pointerEvents: "none" }}>
          {selected.map((v, i) => {
            const opt = options.find((o) => o.value === v);
            if (!opt) return null;
            return <span key={v} ref={(el) => (measureRefs.current[i] = el)} style={{ display: "inline-flex", flex: "none" }}><Pill label={opt.label} onRemove={() => {}} /></span>;
          })}
        </div>
      )}
      <div style={{ position: "absolute", top: 0, right: 8, height: "var(--salt-size-base)", display: "flex", alignItems: "center", gap: 6, color: "var(--salt-content-secondary-foreground)" }}>
        {multiselect && expanded && (
          <button type="button" aria-label="Clear all selections" onClick={clearAll} style={{ display: "inline-flex", border: "none", background: "none", padding: 0, color: "inherit", cursor: "var(--salt-cursor-hover)" }}>
            <CloseIcon />
          </button>
        )}
        <button
          type="button"
          aria-label={expanded ? "Collapse" : "Expand"}
          onClick={(e) => { if (multiselect) { e.stopPropagation(); setExpanded((x) => !x); } }}
          style={{ display: "inline-flex", border: "none", background: "none", padding: 0, color: "inherit", cursor: multiselect ? "var(--salt-cursor-hover)" : "inherit", transform: expanded ? "rotate(180deg)" : "none" }}
        >
          <ChevronDown />
        </button>
      </div>
      {open && !disabled && (
        <div role="listbox" style={{
          position: "absolute", zIndex: 10, top: "calc(100% + 4px)", left: 0, right: 0,
          background: "var(--salt-color-white)", border: "1px solid var(--salt-color-gray-200)",
          borderRadius: "var(--salt-palette-corner-weak)", boxShadow: "var(--salt-overlayable-shadow-popout)",
          maxHeight: 200, overflowY: "auto", padding: "var(--salt-spacing-25) 0",
        }}>
          {filtered.length === 0 && (
            <div style={{ padding: "var(--salt-spacing-50) var(--salt-spacing-100)", color: "var(--salt-content-secondary-foreground)", fontSize: "var(--salt-text-fontSize)" }}>No matches</div>
          )}
          {filtered.map((opt) => {
            const isSel = multiselect ? selected.includes(opt.value) : selected === opt.value;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSel}
                onClick={() => pick(opt)}
                style={{
                  display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", justifyContent: multiselect ? "flex-start" : "space-between",
                  padding: "var(--salt-spacing-50) var(--salt-spacing-100)", cursor: "var(--salt-cursor-hover)",
                  background: isSel ? "var(--salt-palette-accent-weakest)" : "transparent",
                  color: isSel ? "var(--salt-content-primary-foreground)" : "var(--salt-content-primary-foreground)",
                  fontSize: "var(--salt-text-fontSize)",
                }}
                onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = "var(--salt-color-gray-100)"; }}
                onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = "transparent"; }}
              >
                {multiselect && <span style={{ pointerEvents: "none" }}><Checkbox checked={isSel} onChange={() => {}} tabIndex={-1} /></span>}
                <span>{opt.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
