import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { Checkbox } from "./Checkbox.jsx";
import { ComboBoxPill as Pill } from "./ComboBox.jsx";
import { HighlightMatch } from "./highlightMatch.jsx";
import { LoadingDots, EmptyStatus, ErrorStatus } from "./ComboBoxStatus.jsx";
import { Spinner } from "../feedback/Spinner.jsx";

const Chevron = ({ expanded }) => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, transform: expanded ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform var(--salt-duration-instant, 100ms) ease" }}>
    <path d="M5.618 8.593 6 9l.382-.407L11 3.661 10.236 3 6 7.524 1.764 3 1 3.66z" />
  </svg>
);
const CloseIcon = () => (<svg viewBox="0 0 12 12" width="9" height="9" fill="currentColor" aria-hidden="true"><path d="m5.999 5.292 3.89-3.888.707.707L6.707 6l3.889 3.889-.707.708-3.89-3.89-3.889 3.89-.707-.708L5.292 6 1.403 2.111l.707-.708z"/></svg>);
const ChevronDown = () => (<svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M5.618 8.593 6 9l.382-.407L11 3.661 10.236 3 6 7.524 1.764 3 1 3.66z"></path></svg>);

const CONTROL_MAX_HEIGHT = 88;
const INDENT = 20;

function flattenValues(nodes) {
  const out = [];
  (function walk(list) { for (const n of list) { out.push(n.value); if (n.children) walk(n.children); } })(nodes);
  return out;
}
function subtreeValues(node) {
  const out = [node.value];
  if (node.children) for (const c of node.children) out.push(...subtreeValues(c));
  return out;
}
function nodeMatches(node, q) {
  if (!q) return true;
  if (node.label.toLowerCase().includes(q)) return true;
  return !!(node.children && node.children.some((c) => nodeMatches(c, q)));
}

function TreeRow({ node, depth, multiselect, selected, indeterminateSet, expandedSet, onToggleExpand, onToggleSelect, onSelectSingle, query, limitReached }) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedSet.has(node.value) || (!!query && hasChildren);
  const isChecked = selected.has(node.value);
  const isIndeterminate = indeterminateSet.has(node.value);
  const visibleChildren = hasChildren ? node.children.filter((c) => nodeMatches(c, query)) : [];
  const disabledByLimit = multiselect && limitReached && !isChecked;

  return (
    <div>
      <div
        role="option"
        aria-selected={!multiselect && isChecked}
        aria-disabled={disabledByLimit}
        title={disabledByLimit ? "Maximum selections reached" : undefined}
        onClick={() => { multiselect ? (!disabledByLimit && onToggleSelect(node)) : (hasChildren ? onToggleExpand(node.value) : onSelectSingle(node)); }}
        style={{
          display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)",
          padding: "var(--salt-spacing-75) var(--salt-spacing-100)",
          paddingLeft: `calc(var(--salt-spacing-100) + ${depth * INDENT}px)`,
          cursor: disabledByLimit ? "not-allowed" : "var(--salt-cursor-hover)",
          background: (!multiselect && isChecked) ? "var(--salt-palette-accent-weakest)" : "transparent",
          opacity: disabledByLimit ? 0.5 : 1,
        }}
        onMouseEnter={(e) => { if ((multiselect && !disabledByLimit) || (!multiselect && !isChecked)) e.currentTarget.style.background = "var(--salt-color-gray-100)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = (!multiselect && isChecked) ? "var(--salt-palette-accent-weakest)" : "transparent"; }}
      >
        <span
          onClick={(e) => { if (hasChildren) { e.stopPropagation(); onToggleExpand(node.value); } }}
          style={{ display: "inline-flex", width: 12, flexShrink: 0, visibility: hasChildren ? "visible" : "hidden" }}
        >
          <Chevron expanded={isExpanded} />
        </span>
        {multiselect && (
          <span style={{ pointerEvents: "none" }}>
            <Checkbox checked={isChecked} indeterminate={isIndeterminate} onChange={() => {}} tabIndex={-1} />
          </span>
        )}
        <span style={{
          fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)",
          fontWeight: "var(--salt-text-fontWeight)",
          color: "var(--salt-content-primary-foreground)",
        }}><HighlightMatch text={node.label} query={query} /></span>
      </div>
      {hasChildren && isExpanded && visibleChildren.map((child) => (
        <TreeRow
          key={child.value} node={child} depth={depth + 1} multiselect={multiselect}
          selected={selected} indeterminateSet={indeterminateSet} expandedSet={expandedSet}
          onToggleExpand={onToggleExpand} onToggleSelect={onToggleSelect} onSelectSingle={onSelectSingle} query={query} limitReached={limitReached}
        />
      ))}
    </div>
  );
}

/**
 * Fusion ComboBoxTreeOverlay — a combo box overlay that nests options into a
 * Salt tree (parent/child folders). Single-select rows show chevron-down /
 * chevron-right to expand or collapse folders; multi-select adds a Checkbox
 * between chevron and label on every row (parents included, tri-state) plus
 * a "Select all" row at the top. Multiselect field pills show only the
 * top-level parent's label with a count of everything selected beneath it
 * (the parent counts toward its own total only when fully selected).
 */
export function ComboBoxTreeOverlay({
  nodes = [],
  multiselect = false,
  defaultValue,
  defaultExpanded,
  placeholder = "Search...",
  size = "medium",
  disabled = false,
  validationState,
  status,
  onReload,
  maxSelections,
  onChange,
  style,
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const [expandedSet, setExpandedSet] = useState(() => new Set(defaultExpanded || []));
  const [selected, setSelected] = useState(() => new Set(multiselect ? (defaultValue || []) : []));
  const [singleValue, setSingleValue] = useState(!multiselect ? (defaultValue || "") : "");
  const ref = useRef(null);
  const rowRef = useRef(null);
  const measureRefs = useRef([]);

  const allValues = useMemo(() => flattenValues(nodes), [nodes]);
  const byValue = useMemo(() => {
    const m = new Map();
    (function walk(list, parent) { for (const n of list) { m.set(n.value, { node: n, parent }); if (n.children) walk(n.children, n.value); } })(nodes, null);
    return m;
  }, [nodes]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const indeterminateSet = useMemo(() => {
    const set = new Set();
    (function walk(list) {
      for (const n of list) {
        if (n.children && n.children.length) {
          walk(n.children);
          const descendants = subtreeValues(n).filter((v) => v !== n.value);
          const anySelectedOrPartial = descendants.some((v) => selected.has(v) || set.has(v));
          if (!selected.has(n.value) && anySelectedOrPartial) set.add(n.value);
        }
      }
    })(nodes);
    return set;
  }, [nodes, selected]);

  const toggleExpand = (value) => {
    setExpandedSet((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  };

  const selectSingle = (node) => {
    setSingleValue(node.value);
    onChange && onChange(node.value);
    setQuery("");
    setOpen(false);
  };

  const toggleSelect = (node) => {
    setSelected((prev) => {
      const next = new Set(prev);
      const values = subtreeValues(node);
      const willCheck = !next.has(node.value);
      if (willCheck) values.forEach((v) => next.add(v));
      else values.forEach((v) => next.delete(v));
      // Bubble up: an ancestor is selected only when every one of its children is selected.
      let parent = byValue.get(node.value)?.parent;
      while (parent) {
        const pNode = byValue.get(parent).node;
        const allChildrenSelected = pNode.children.every((c) => next.has(c.value));
        allChildrenSelected ? next.add(pNode.value) : next.delete(pNode.value);
        parent = byValue.get(parent).parent;
      }
      onChange && onChange(Array.from(next));
      return next;
    });
  };

  const selectAllChecked = allValues.length > 0 && allValues.every((v) => selected.has(v));
  const selectAllIndeterminate = !selectAllChecked && allValues.some((v) => selected.has(v));
  const limitReached = multiselect && maxSelections != null && selected.size >= maxSelections;
  const toggleSelectAll = () => {
    if (!selectAllChecked && limitReached) return;
    const next = selectAllChecked ? new Set() : new Set(allValues);
    setSelected(next);
    onChange && onChange(Array.from(next));
  };

  // Top-level pills: label + count of selected values within that node's subtree.
  const topPills = useMemo(() => {
    if (!multiselect) return [];
    return nodes
      .map((top) => {
        const count = subtreeValues(top).filter((v) => selected.has(v)).length;
        return count > 0 ? { value: top.value, label: `${top.label} (${count})` } : null;
      })
      .filter(Boolean);
  }, [nodes, selected, multiselect]);

  const removeTop = (value, e) => {
    e.stopPropagation();
    const top = nodes.find((n) => n.value === value);
    if (!top) return;
    setSelected((prev) => {
      const next = new Set(prev);
      subtreeValues(top).forEach((v) => next.delete(v));
      onChange && onChange(Array.from(next));
      return next;
    });
  };

  const hasClearable = query.length > 0 || (multiselect ? selected.size > 0 : !!singleValue);
  const handleClear = (e) => {
    e.stopPropagation();
    setQuery("");
    setExpanded(false);
    if (multiselect) { setSelected(new Set()); onChange && onChange([]); }
    else { setSingleValue(""); onChange && onChange(""); }
  };

  useLayoutEffect(() => {
    if (!multiselect || expanded) return;
    const row = rowRef.current;
    if (!row || topPills.length === 0) { setVisibleCount(topPills.length); return; }
    const recalc = () => {
      const available = row.clientWidth - 44;
      let used = 0, count = 0;
      for (let i = 0; i < topPills.length; i++) {
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
  }, [topPills, expanded, multiselect]);

  const singleLabel = !multiselect && singleValue ? (byValue.get(singleValue)?.node.label || "") : "";
  const filteredNodes = nodes.filter((n) => nodeMatches(n, query.toLowerCase()));
  const overflowCount = multiselect ? Math.max(0, topPills.length - visibleCount) : 0;
  const iconGutter = multiselect ? (expanded ? 52 : 28) : 0;

  const smallStyle = size === "small" ? { minHeight: 28, minWidth: 130, fontSize: "var(--salt-text-label-fontSize)", padding: "2px var(--salt-spacing-50)" } : { minWidth: 240, padding: multiselect ? "var(--salt-spacing-25) var(--salt-spacing-100) var(--salt-spacing-25) var(--salt-spacing-50)" : undefined };
  const cls = [
    "saltInput", "saltInput-bordered", "saltInput-primary",
    validationState ? `saltInput-${validationState}` : "",
    open ? "saltInput-focused" : "",
    disabled ? "saltInput-disabled" : "",
  ].filter(Boolean).join(" ");

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
          {multiselect && topPills.map((p, i) => {
            if (!expanded && i >= visibleCount) return null;
            return (
              <span key={p.value} style={{ display: "inline-flex", flex: "none" }}>
                <Pill label={p.label} onRemove={(e) => removeTop(p.value, e)} />
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
            style={{ minWidth: 60, flex: "1 1 auto", display: multiselect && !expanded && topPills.length > 0 ? "none" : undefined }}
            disabled={disabled}
            placeholder={multiselect ? (topPills.length ? "" : placeholder) : (singleLabel || placeholder)}
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          />
        </div>
      </div>
      {multiselect && !expanded && topPills.length > 0 && (
        <div aria-hidden="true" style={{ position: "absolute", visibility: "hidden", top: 0, left: 0, height: 0, overflow: "hidden", display: "flex", gap: 4, pointerEvents: "none" }}>
          {topPills.map((p, i) => (
            <span key={p.value} ref={(el) => (measureRefs.current[i] = el)} style={{ display: "inline-flex", flex: "none" }}><Pill label={p.label} onRemove={() => {}} /></span>
          ))}
        </div>
      )}
      <div style={{ position: "absolute", top: 0, right: 8, height: "var(--salt-size-base)", display: "flex", alignItems: "center", gap: 6, color: "var(--salt-content-secondary-foreground)" }}>
        {status === "loading" && <Spinner size={12} />}
        {hasClearable && (
          <button type="button" aria-label="Clear" onClick={handleClear} style={{ display: "inline-flex", border: "none", background: "none", padding: 0, color: "inherit", cursor: "var(--salt-cursor-hover)" }}>
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
          maxHeight: 320, overflowY: "auto", padding: "var(--salt-spacing-25) 0",
        }}>
          {multiselect && !status && (
            <div
              onClick={toggleSelectAll}
              title={!selectAllChecked && limitReached ? "Maximum selections reached" : undefined}
              style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", padding: "var(--salt-spacing-75) var(--salt-spacing-100)", cursor: (!selectAllChecked && limitReached) ? "not-allowed" : "var(--salt-cursor-hover)", opacity: (!selectAllChecked && limitReached) ? 0.5 : 1, borderBottom: "1px solid var(--salt-separable-tertiary-borderColor)" }}
              onMouseEnter={(e) => { if (selectAllChecked || !limitReached) e.currentTarget.style.background = "var(--salt-color-gray-100)"; }}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ pointerEvents: "none" }}><Checkbox checked={selectAllChecked} indeterminate={selectAllIndeterminate} onChange={() => {}} tabIndex={-1} /></span>
              <span style={{ fontFamily: "var(--salt-text-fontFamily)", fontWeight: "var(--salt-text-fontWeight-strong)", fontSize: "var(--salt-text-fontSize)", color: "var(--salt-content-primary-foreground)" }}>Select all</span>
            </div>
          )}
          {status === "loading" && <LoadingDots />}
          {status === "error" && <ErrorStatus onReload={onReload} />}
          {!status && filteredNodes.length === 0 && <EmptyStatus />}
          {!status && filteredNodes.map((n) => (
            <TreeRow
              key={n.value} node={n} depth={0} multiselect={multiselect}
              selected={selected} indeterminateSet={indeterminateSet} expandedSet={expandedSet}
              onToggleExpand={toggleExpand} onToggleSelect={toggleSelect} onSelectSingle={selectSingle}
              query={query.toLowerCase()} limitReached={limitReached}
            />
          ))}
        </div>
      )}
    </div>
  );
}
