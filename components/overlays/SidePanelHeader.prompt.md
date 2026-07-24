SidePanelHeader is the header block for SidePanel — title row, a 2-line description, and a metadata row matching PageHeader's.

```jsx
<SidePanelHeader
  onBack={() => {}}
  title="AI Research Adoption"
  secondaryInfo="Dataset · ds-88213"
  actions={[{ label: "Edit" }, { label: "Duplicate" }]}
  onClose={() => setOpen(false)}
  description="Tracks how research teams are adopting the platform's AI capabilities across the firm."
  primaryTag="Dataset"
  secondaryTag="Governed"
  status={{ label: "Published" }}
  copyValue="ds-88213"
  dataLabels={["Owner: J. Chen", "Updated 2h ago"]}
/>
```

Line 1: optional transparent back icon button → H2 title → (spacing-100) → secondary info text → up to two bordered/neutral action buttons, spacing-100 apart → a trailing transparent close icon button (always present, always rightmost). On width collision, collapses in order: secondary info drops first, then action buttons shrink to icon-only (edit glyph), then action buttons drop entirely, then the title itself truncates — the truncated title and close button are always the last two things visible. Line 2 is an optional description clamped to 2 lines, spacing-100 below the title row; a "View more" link appears only when the text actually overflows those 2 lines, expanding it in place ("View less" re-collapses). Line 3 is an optional metadata row spacing-100 below the description, with the same items and order as `PageHeader`'s metadata row (primary Tag (accent), secondary Tag (positive), StatusBadge, CopyValue, then any plain data labels), spacing-150 between each item. The metadata row never wraps — items that don't fit collapse into a "+n" chip that lists the hidden items on hover. Requires `H2`, `Text`, `Button`, `IconButton`, `Tag`, `StatusBadge`, `CopyValue` from the bundle, plus `./SidePanelHeader.css` for the view-more hover state and the overflow trigger/panel styling. The "+n" overflow chip shows a neutral, unclipped floating panel (fixed-positioned, clamped to the viewport, flips above when there's no room below) listing the hidden metadata items — no icon or status coloring.
