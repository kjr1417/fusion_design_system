import React, { useState } from "react";

/**
 * Two candidate agent responses shown side by side (stacks on narrow
 * widths), each in a Card with an "Use this" action pinned to its
 * bottom. Selecting one calls `onSelect(index)`; the chosen card gets
 * an accent border and its button swaps to a confirmed state.
 * Requires FusionDesignSystem_6db751 (Card, Button). Pass
 * `renderBlocks(blocks)` to render an option's `blocks` (structured
 * response typography) — ConversationArea wires this to its own
 * ResponseContent renderer; without it, options with `blocks` fall
 * back to their `text` (if any) or are left blank.
 */
export function AnswerComparison({ options = [], selectedIndex, onSelect, actionLabel = "Use this", renderBlocks }) {
  const { Card, Button } = window.FusionDesignSystem_6db751;
  const [internal, setInternal] = useState(null);
  const selected = selectedIndex !== undefined ? selectedIndex : internal;

  const choose = (i) => {
    if (selectedIndex === undefined) setInternal(i);
    onSelect && onSelect(i);
  };

  return (
    <div style={{ display: "flex", gap: "var(--salt-spacing-200)", flexWrap: "wrap" }}>
      {options.map((opt, i) => (
        <Card key={i} variant="secondary" style={{ flex: "1 1 280px", minWidth: 260, display: "flex", flexDirection: "column", gap: "var(--salt-spacing-150)", ...(selected === i ? { borderColor: "var(--salt-palette-accent)" } : {}) }}>
          {opt.label && <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--salt-content-secondary-foreground)" }}>{opt.label}</div>}
          <div style={{ fontSize: 14, lineHeight: 1.6, flex: 1 }}>
            {opt.blocks ? (renderBlocks ? renderBlocks(opt.blocks) : <div>{opt.text}</div>) : <div>{opt.text}</div>}
          </div>
          <Button
            appearance={selected === i ? "solid" : "bordered"}
            sentiment={selected === i ? "positive" : "accented"}
            onClick={() => choose(i)}
          >
            {selected === i ? "Selected" : actionLabel}
          </Button>
        </Card>
      ))}
    </div>
  );
}
