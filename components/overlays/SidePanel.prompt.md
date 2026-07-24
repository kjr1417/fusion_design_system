SidePanel shows detail or a secondary task alongside the current view without fully replacing it — record detail panels, filters. Its header is a built-in `SidePanelHeader` — title/secondaryInfo/back/actions/close, a 2-line description, and a metadata row matching `PageHeader`'s.

```jsx
<SidePanel
  open={open}
  side="right"
  title="AI Research Adoption"
  secondaryInfo="Dataset · ds-88213"
  actions={[{ label: "Edit" }]}
  description="Tracks how research teams are adopting the platform's AI capabilities across the firm."
  primaryTag="Dataset"
  status={{ label: "Published" }}
  dataLabels={["Owner: J. Chen", "Updated 2h ago"]}
  onClose={() => setOpen(false)}
  secondaryActions={[{ label: "Cancel", onClick: () => setOpen(false) }]}
  primaryAction={{ label: "Save", onClick: handleSave }}
>...</SidePanel>
```

All `SidePanelHeader` props pass straight through onto SidePanel itself — see `SidePanelHeader` for their layout. `children` renders below the header, scrollable, in a panel that slides in from `side`, with spacing-200 padding on all sides. A splitter track sits on the panel's inner edge — a hairline plus a visible grip handle (drag to resize, 320–640px, default 560px; both grow accent-colored on hover/drag so the resize affordance is obvious even at rest). `primaryAction`/`secondaryActions`/`tertiaryActions` render as a right-aligned `InlineButtons` footer row, spacing-200 below the content, only when at least one is given. Requires `SidePanelHeader`, `InlineButtons` from the bundle.
