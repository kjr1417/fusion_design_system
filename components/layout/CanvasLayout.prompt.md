CanvasLayout is the Studio canvas shell — GlobalNav, a full-width AppHeader, optional left/right collapsible panels around a central canvas, a full-width ButtonBar, and the Footer.

```jsx
<CanvasLayout
  leftPanel={<Layers />}
  rightPanel={<Inspector />}
  defaultRightOpen={false}
  buttonBarProps={{ primaryAction: { label: "Publish" } }}
>
  {canvasContent}
</CanvasLayout>
```

Collapsing either panel doesn't slide a drawer over the canvas (that's `SidePanel`'s job) — the panel's width collapses to 0 and a floating round button (spacing-200 from the canvas's top and side edges) appears pinned to that corner to reopen it. Once expanded, that corner trigger is replaced by a standard `SidePanelHeader` (title via `leftPanelTitle`/`rightPanelTitle`, built-in close button) inside the panel — the same header pattern `SidePanel` itself uses. A draggable splitter sits on each open panel's canvas-facing edge, resizing it between `leftPanelMinWidth`–`leftPanelMaxWidth` (default 200–480, starting at `leftPanelWidth`) or `rightPanelMinWidth`–`rightPanelMaxWidth` (default 240–560, starting at `rightPanelWidth`). Omit `leftPanel`/`rightPanel` entirely for a layout with no panel on that side. Load AppHeader.css, Breadcrumbs.css, CopyValue.css, and SidePanelHeader.css alongside this component (same set StageLayout uses).

The canvas area also carries a floating bottom-left toolbar for panning an unbounded lineage/node system: zoom out/in (scales the canvas content 0.4–2x), undo/redo (walk a built-in history of every pan/zoom change, disabled at the ends), and fit-to-canvas (resets pan/zoom to center, then calls `onFitToCanvas` for any additional node-graph framing). `onZoomOut`/`onZoomIn`/`onUndo`/`onRedo` fire alongside the built-in behavior for consumers who need to react to it. The canvas itself is directly draggable — click and drag empty canvas space to pan; the dot grid and content translate together.
