StageLayout is the Studio wizard shell — GlobalNav, an AppHeader (fixed through vertical scroll), a left ProgressTracker rail, spacing-300-padded swappable content, a full-width ButtonBar, and the Footer. Build multi-step form-wizard Templates on top of it.

```jsx
<StageLayout
  size="large"
  appHeaderProps={{ breadcrumbItems: [{ label: "Agents" }, { label: "New Agent" }], statusLabel: "Draft" }}
  progressTrackerProps={{ headerTitle: "Create Agent", steps: ["Connect data", "Configure", "Review"], activeStep: 1 }}
  buttonBarProps={{ secondaryActions: [{ label: "Back" }], primaryAction: { label: "Continue" } }}
  rightPanel={<AiAssistChat />}
  rightPanelTitle="AI Assist"
>
  {stepFields}
</StageLayout>
```

`size="large"` caps content at 980-1848px; `size="small"` (covers X-Small/Small) caps it at 400-1280px — below the minimum, content scrolls horizontally while the ProgressTracker stays fixed. `showProgressTracker={false}` drops the rail for the large sub-variant without it.

`rightPanel` pushes the content column, triggered by a button folded into AppHeader's `actions` at its right edge (before the StatusBadge) — resizable by default (`rightPanelResizable`, min/max width), or set `rightPanelResizable={false}` for a fixed-width push panel. `overlayPanel` is a separate fixed-width panel that slides in with a scrim, non-resizable, for a lighter-weight aside.
