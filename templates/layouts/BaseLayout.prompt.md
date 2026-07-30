BaseLayout is the Studio page shell — GlobalNav, a left VerticalNavigation rail, a PageHeader beside it, spacing-200-padded swappable content, and the Footer. Build Templates for standard product pages (not multi-step wizards or canvases) on top of it.

```jsx
<BaseLayout
  size="large"
  navItems={navItems}
  pageHeaderProps={{ title: "Knowledge Bases", primaryAction: { label: "Create" } }}
>
  {pageContent}
</BaseLayout>
```

`size="large"` caps the shared PageHeader+content column at 1848px; `size="medium"` caps it at 1500px — both center once the container exceeds that width, and both align left with horizontal scroll below a 980px minimum rather than squeezing further. Everything else — nav items, header, footer — stays identical between sizes.

Two optional right-anchored panels, each triggered by a button folded into PageHeader's own secondaryActions — so it renders in the same InlineButtons group as the primary action, immediately after the title with no gap:

```jsx
<BaseLayout
  pageHeaderProps={{ title: "Datasets" }}
  rightPanel={<ComparisonView />}
  rightPanelTitle="Compare versions"
  overlayPanel={<RecordDetail />}
  overlayTitle="Record detail"
>
  {pageContent}
</BaseLayout>
```

`rightPanel` pushes the content column and is resizable via a drag splitter (`rightPanelMinWidth`–`rightPanelMaxWidth`). `overlayPanel` is a fixed-width panel (`overlayWidth`) that slides in above everything with a click-to-dismiss scrim, like `SidePanel` but non-resizable. Omit either prop to skip that panel and its trigger button entirely.
