ExpandableText is a shared line-clamped text block with an inline "View more"/"View less" toggle. It powers the description row in `PageHeader` (1 line), `SubHeader` (1 line), and `SidePanelHeader` (2 lines) — edit this component once and all three patterns' expand/collapse behavior updates together. Reach for it directly whenever a new pattern needs the same truncate-with-toggle behavior instead of re-implementing it.

```jsx
<ExpandableText text={description} lines={2} style={{ marginTop: "var(--salt-spacing-100)" }} />
```

The toggle only renders when the text actually overflows the given `lines`; otherwise the text shows in full with no button. Sizes and colors follow body text tokens (`--salt-text-*`, secondary content color) — override via `textStyle` if a pattern needs different typography. Requires `./ExpandableText.css`.
