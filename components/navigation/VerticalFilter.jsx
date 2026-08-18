import React, { useState } from "react";
import { Accordion } from "../display/Accordion.jsx";
import { Text } from "../display/Text.jsx";
import { Button } from "../actions/Button.jsx";
import { IconButton } from "../actions/IconButton.jsx";
import { Input } from "../forms/Input.jsx";
import { Checkbox } from "../forms/Checkbox.jsx";
import { RadioButton } from "../forms/RadioButton.jsx";
import { HighlightMatch } from "../forms/highlightMatch.jsx";
import { ComboBox } from "../forms/ComboBox.jsx";

const SearchGlyph = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M8 9a5 5 0 1 1 1-1l3 3-1 1zm1-4a4 4 0 1 1-8 0 4 4 0 0 1 8 0" />
  </svg>
);
const CHEVRON_DOWN = "M5.618 8.593 6 9l.382-.407L11 3.661 10.236 3 6 7.524 1.764 3 1 3.66z";
const CHEVRON_UP = "M5.618 3.407 6 3l.382.407L11 8.339 10.236 9 6 4.476 1.764 9 1 8.34z";
function DoubleChevron({ direction = "down", size = 14 }) {
  const d = direction === "down" ? CHEVRON_DOWN : CHEVRON_UP;
  const offset = direction === "down" ? [-2.4, 2.4] : [2.4, -2.4];
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d={d} transform={`translate(0,${offset[0]})`} />
      <path d={d} transform={`translate(0,${offset[1]})`} />
    </svg>
  );
}

const LINK_BTN_STYLE = {
  all: "unset", display: "inline-flex", cursor: "var(--salt-cursor-hover, pointer)",
  color: "var(--salt-palette-accent)", fontFamily: "var(--salt-text-fontFamily)",
  fontSize: "var(--salt-text-fontSize)", fontWeight: "var(--salt-text-fontWeight-strong)",
};

function CountBadge({ count }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      minWidth: 18, height: 18, padding: "0 5px", borderRadius: 999,
      background: "var(--salt-palette-accent)", color: "var(--salt-color-white)",
      fontSize: 11, lineHeight: 1, fontWeight: "var(--salt-text-fontWeight-strong)", flexShrink: 0,
    }}>{count}</span>
  );
}

function GroupContent({ group, query, onQueryChange, selected, onToggle, visibleCount, onViewMore, onViewLess }) {
  const searchable = group.options.length > 8;
  const q = (query || "").trim();
  const filtered = q ? group.options.filter((o) => o.label.toLowerCase().includes(q.toLowerCase())) : group.options;
  const showAll = group.options.length <= 8;
  const cap = showAll ? filtered.length : Math.min(visibleCount, filtered.length);
  const displayed = filtered.slice(0, cap);
  const hasMore = !showAll && cap < filtered.length;
  const canCollapse = !showAll && cap >= filtered.length && filtered.length > 5;
  const selectedSet = group.type === "radio" ? null : new Set(selected || []);

  return (
    <div>
      {searchable && (
        <Input
          placeholder={group.searchPlaceholder || "Search"}
          value={query || ""}
          onChange={(e) => onQueryChange(e.target.value)}
          startAdornment={<SearchGlyph />}
          style={{ width: "100%", marginBottom: 16 }}
        />
      )}
      {displayed.length === 0 ? (
        <Text color="secondary" style={{ padding: "2px 0" }}>No matches</Text>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-100)", marginBottom: (hasMore || canCollapse) ? 8 : 0 }}>
          {displayed.map((o) => group.type === "radio" ? (
            <RadioButton key={o.value} name={`vf-${group.id}`} value={o.value} label={<HighlightMatch text={o.label} query={q} />} checked={selected === o.value} disabled={o.disabled} onChange={() => onToggle(o.value)} />
          ) : (
            <Checkbox key={o.value} label={<HighlightMatch text={o.label} query={q} />} checked={selectedSet.has(o.value)} disabled={o.disabled} onChange={() => onToggle(o.value)} />
          ))}
        </div>
      )}
      {hasMore && <button type="button" onClick={onViewMore} style={LINK_BTN_STYLE}>View more</button>}
      {canCollapse && <button type="button" onClick={onViewLess} style={LINK_BTN_STYLE}>View less</button>}
    </div>
  );
}

/**
 * Fusion VerticalFilter — a persistent (non-collapsible) faceted-filter rail:
 * an optional header (title + "Clear all" + expand/collapse-all toggle), an
 * optional top ComboBox, and a stack of accordion groups each holding a
 * checkbox or radio-button list. Groups with more than 8 options gain a
 * local search box and 5-at-a-time "View more"/"View less" paging; search
 * matches are bolded via HighlightMatch. A blue count badge appears on any
 * group with an active selection. The panel hugs its content — give it a
 * bounded, scrollable container from the outside (e.g. `overflowY: "auto"`
 * on a parent with a height) rather than capping it here.
 *
 * Requires FusionDesignSystem_6db751 siblings: Accordion, Text, Button,
 * IconButton, Input, Checkbox, RadioButton, HighlightMatch, ComboBox.
 */
export function VerticalFilter({
  title = "Filters",
  showHeader = true,
  clearAllLabel = "Clear all",
  comboBox,
  groups = [],
  values = {},
  onChange,
  onClearAll,
  defaultOpen = [0],
  style,
}) {
  const [openIdx, setOpenIdx] = useState(defaultOpen);
  const [queries, setQueries] = useState({});
  const [visibleCounts, setVisibleCounts] = useState({});

  const setQuery = (id, v) => { setQueries((q) => ({ ...q, [id]: v })); setVisibleCounts((c) => ({ ...c, [id]: 5 })); };
  const viewMore = (id) => setVisibleCounts((c) => ({ ...c, [id]: (c[id] || 5) + 5 }));
  const viewLess = (id) => setVisibleCounts((c) => ({ ...c, [id]: 5 }));

  const countFor = (g) => {
    const v = values[g.id];
    if (g.type === "radio") return v ? 1 : 0;
    return Array.isArray(v) ? v.length : 0;
  };
  const totalSelected = groups.reduce((sum, g) => sum + countFor(g), 0);
  const allOpen = openIdx.length === groups.length && groups.length > 0;

  const toggleAll = () => setOpenIdx(allOpen ? [] : groups.map((_, i) => i));
  const handleClearAll = () => {
    if (onClearAll) { onClearAll(); return; }
    groups.forEach((g) => onChange && onChange(g.id, g.type === "radio" ? null : []));
  };
  const handleToggle = (g, value) => {
    if (g.type === "radio") { onChange && onChange(g.id, value); return; }
    const cur = values[g.id] || [];
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    onChange && onChange(g.id, next);
  };

  const items = groups.map((g) => ({
    title: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: "var(--salt-spacing-100)" }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.label}</span>
        {countFor(g) > 0 && <CountBadge count={countFor(g)} />}
      </div>
    ),
    content: (
      <GroupContent
        group={g}
        query={queries[g.id]}
        onQueryChange={(v) => setQuery(g.id, v)}
        selected={values[g.id]}
        onToggle={(v) => handleToggle(g, v)}
        visibleCount={visibleCounts[g.id] || 5}
        onViewMore={() => viewMore(g.id)}
        onViewLess={() => viewLess(g.id)}
      />
    ),
  }));

  const { label: comboLabel, ...comboRest } = comboBox || {};

  return (
    <div style={{ display: "flex", flexDirection: "column", fontFamily: "var(--salt-text-fontFamily)", ...style }}>
      {showHeader && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--salt-spacing-100)" }}>
          <Text variant="h3" style={{ margin: 0 }}>{title}</Text>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)" }}>
            <Button appearance="transparent" sentiment="accented" disabled={totalSelected === 0} onClick={handleClearAll} style={{ padding: "0 var(--salt-spacing-50)" }}>{clearAllLabel}</Button>
            <IconButton appearance="transparent" sentiment="neutral" aria-label={allOpen ? "Collapse all" : "Expand all"} title={allOpen ? "Collapse all" : "Expand all"} onClick={toggleAll}>
              <DoubleChevron direction={allOpen ? "up" : "down"} />
            </IconButton>
          </div>
        </div>
      )}
      {comboBox && (
        <div style={{ marginTop: showHeader ? 16 : 0, display: "flex", flexDirection: "column", gap: "var(--salt-spacing-50)" }}>
          {comboLabel && <Text variant="label">{comboLabel}</Text>}
          <ComboBox {...comboRest} />
        </div>
      )}
      <div style={{ marginTop: (showHeader || comboBox) ? 24 : 0 }}>
        <Accordion items={items} allowMultiple open={openIdx} onOpenChange={setOpenIdx} chevronPosition="end" />
      </div>
    </div>
  );
}
