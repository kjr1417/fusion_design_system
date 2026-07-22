Carousel lays out a horizontal, scroll-snapping shelf of items with paged prev/next controls. Use it for card rows like "Get started in Fusion", "Recommended for you", or a catalog shelf — wrap ContentCards as children and let the carousel own sizing, snapping, paging, and disabling the arrows at the ends.

```jsx
<Carousel title="Get started in Fusion" subtitle="Things you can do across the platform">
  <ContentCard variant="media" category="documentation" eyebrow="Guide" title="Build an Agent"
    description="Build AI agents and workflows using a drag-and-drop visual editor."
    cta={{ label: "Learn more", href: "#" }} />
  <ContentCard variant="media" category="data" eyebrow="Guide" title="Manage Data"
    description="Register, discover, access and integrate data across the firm."
    cta={{ label: "Learn more", href: "#" }} />
  {/* …more cards */}
</Carousel>
```

Items never shrink below `minItemWidth` (default **348px**) — when the row is wide they grow to share the space evenly, when it isn't they overflow and scroll one page per arrow click. Set `controlsPlacement="top"` to move the arrows into the header, right-aligned. Don't hand-roll horizontal scrollers; use this so shelves behave consistently across the platform.
