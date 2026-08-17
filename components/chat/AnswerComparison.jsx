import React, { useState, useRef, useLayoutEffect } from "react";

const letterOf = (i) => String.fromCharCode(65 + i);

/**
 * Fusion AnswerComparison — the response card for two (or more) AI-generated
 * answers awaiting a user pick. Wide layouts split the conversation width
 * evenly into one Card per option, each with a right-aligned, bordered
 * "Choose Option A" button. Below a measured width threshold it collapses
 * into Tabs so only one option's card shows at a time. Picking an option
 * replaces the whole comparison with that option's response plus an italic
 * disclaimer noting it was user-selected.
 * Requires FusionDesignSystem_6db751 (Card, InlineButtons, Tabs). Pass
 * `renderBlocks(blocks)` to render an option's `blocks` (structured
 * response typography) — ConversationArea wires this to its own
 * ResponseContent renderer; without it, options with `blocks` fall back to
 * their `text` (if any) or are left blank.
 */
export function AnswerComparison({ options = [], selectedIndex, onSelect, onChangeSelection, allowChange = true, renderBlocks, style }) {
  const { Card, InlineButtons, Tabs, Link } = window.FusionDesignSystem_6db751;
  const [internal, setInternal] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const ref = useRef(null);
  const selected = selectedIndex !== undefined ? selectedIndex : internal;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || options.length < 2) return;
    const threshold = 260 * options.length + 16 * (options.length - 1);
    const recalc = () => setNarrow(el.clientWidth < threshold);
    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => ro.disconnect();
  }, [options.length]);

  const choose = (i) => {
    if (selectedIndex === undefined) setInternal(i);
    onSelect && onSelect(i);
  };
  const changeSelection = () => {
    if (selectedIndex === undefined) setInternal(null);
    onChangeSelection && onChangeSelection();
  };

  if (selected != null) {
    const opt = options[selected];
    return (
      <div ref={ref} style={style}>
        <div style={{ fontSize: 14, lineHeight: "18px" }}>
          {opt.blocks ? (renderBlocks ? renderBlocks(opt.blocks) : <div>{opt.text}</div>) : <div>{opt.text}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)", fontStyle: "italic", fontSize: 12, lineHeight: "16px", color: "var(--salt-content-secondary-foreground)", marginTop: "var(--salt-spacing-100)" }}>
          <span>Based on your selection of {opt.label || `Option ${letterOf(selected)}`}.</span>
          {allowChange && <Link href="#" onClick={(e) => { e.preventDefault(); changeSelection(); }} variant="accent" style={{ fontFamily: "inherit", fontStyle: "italic", fontSize: "inherit", lineHeight: "inherit" }}>Change answer</Link>}
        </div>
      </div>
    );
  }

  const renderCard = (opt, i) => (
    <Card key={i} variant="secondary" style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-150)", boxSizing: "border-box", minWidth: 0 }}>
      {opt.label && <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--salt-content-secondary-foreground)" }}>{opt.label}</div>}
      <div style={{ fontSize: 14, lineHeight: 1.6, flex: 1 }}>
        {opt.blocks ? (renderBlocks ? renderBlocks(opt.blocks) : <div>{opt.text}</div>) : <div>{opt.text}</div>}
      </div>
      <InlineButtons direction="right-to-left" secondaryActions={[{ label: `Choose Option ${letterOf(i)}`, onClick: () => choose(i) }]} />
    </Card>
  );

  return (
    <div ref={ref} style={{ minWidth: 0, ...style }}>
      {narrow ? (
        <React.Fragment>
          <Tabs items={options.map((opt, i) => opt.label || `Option ${letterOf(i)}`)} onChange={setActiveTab} style={{ marginBottom: "var(--salt-spacing-150)" }} />
          {renderCard(options[activeTab], activeTab)}
        </React.Fragment>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${options.length}, 1fr)`, gap: "var(--salt-spacing-200)" }}>
          {options.map((opt, i) => renderCard(opt, i))}
        </div>
      )}
    </div>
  );
}
