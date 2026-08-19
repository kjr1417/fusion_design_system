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
// verbatim path data from icons/expand-all.svg, icons/collapse-all.svg
function ExpandAllIcon({ size = 12 }) {
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M6 0L2 4L3 5L6 2L9 5L10 4L6 0Z" />
      <path d="M6 12L2 8L3 7L6 10L9 7L10 8L6 12Z" />
    </svg>
  );
}
function CollapseAllIcon({ size = 12 }) {
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M6 6.5L2 10.5L3 11.5L6 8.5L9 11.5L10 10.5L6 6.5Z" />
      <path d="M6 5.5L2 1.5L3 0.5L6 3.5L9 0.5L10 1.5L6 5.5Z" />
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
  pageTabs,
  selectedPageTab,
  onPageTabChange,
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
  const categoriesWithSelection = groups.filter((g) => countFor(g) > 0).length;
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
      <span style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-50)", overflow: "hidden" }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{g.label}</span>
        {countFor(g) > 0 && <CountBadge count={countFor(g)} />}
      </span>
    ),
    headerStyle: { gap: 4 },
    contentStyle: { paddingLeft: 24 },
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
      {pageTabs && pageTabs.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}>
          {pageTabs.map((t) => {
            const active = t.id === selectedPageTab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onPageTabChange && onPageTabChange(t.id)}
                style={{
                  all: "unset", boxSizing: "border-box", position: "relative", width: "100%", height: 36,
                  padding: "4px 8px", display: "flex", alignItems: "center", gap: 4, cursor: "var(--salt-cursor-hover, pointer)",
                  borderRadius: "var(--salt-palette-corner-weaker)",
                  background: active ? "var(--salt-palette-accent-weakest, var(--salt-color-blue-50))" : "transparent",
                  color: active ? "var(--salt-palette-accent)" : "var(--salt-content-primary-foreground)",
                  fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)",
                  fontWeight: active ? "var(--salt-text-fontWeight-strong)" : "var(--salt-text-fontWeight)",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--salt-color-gray-100)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                {active && <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, borderRadius: 2, background: "var(--salt-palette-accent)" }} />}
                <span style={{ width: 12, height: 28, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{t.icon}</span>
                <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "left" }}>{t.label}</span>
                {t.count != null && <span style={{ flexShrink: 0, fontSize: "var(--salt-text-label-fontSize)", color: active ? "var(--salt-palette-accent)" : "var(--salt-content-secondary-foreground)" }}>{t.count}</span>}
              </button>
            );
          })}
        </div>
      )}
      {showHeader && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--salt-spacing-100)", height: 28 }}>
          <Text variant="h3" style={{ margin: 0, lineHeight: "28px" }}>{title}</Text>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)", height: 28 }}>
            <Button appearance="transparent" sentiment="accented" disabled={totalSelected === 0} onClick={handleClearAll} style={{ padding: "0 var(--salt-spacing-50)", height: 28 }}>{clearAllLabel} ({categoriesWithSelection})</Button>
            <IconButton appearance="transparent" sentiment="neutral" aria-label={allOpen ? "Collapse all" : "Expand all"} title={allOpen ? "Collapse all" : "Expand all"} onClick={toggleAll} style={{ height: 28 }}>
              {allOpen ? <CollapseAllIcon /> : <ExpandAllIcon />}
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
        <Accordion items={items} allowMultiple open={openIdx} onOpenChange={setOpenIdx} />
      </div>
    </div>
  );
}
