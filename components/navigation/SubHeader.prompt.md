SubHeader is a compact header pattern — title, up to two bordered neutral action buttons, an optional tertiary transparent icon button, and a section description. Use it for a section within a page; use `PageHeader` instead for full page-level chrome (breadcrumbs, tagged actions, metadata, tabs). Unlike `PageHeader`, it applies no outer pattern padding — place it directly in the surrounding layout.

```jsx
<SubHeader
  title="Model coverage"
  actions={[{ label: "Refresh" }, { label: "Export" }]}
  tertiaryAction={{ label: "More actions" }}
  description="Tracks how research teams are adopting the platform's AI capabilities across the firm."
/>
```

Title and actions sit on one row: spacing-300 between the title and the first action button, spacing-100 between each subsequent action button or the trailing icon button. `actions` renders as `Button appearance="bordered" sentiment="neutral"` — only the first two entries show; a third action belongs in `tertiaryAction`, rendered as a transparent neutral kebab `IconButton` (its `label` becomes the aria-label). The optional description sits spacing-200 below, single-line and ellipsis-truncated; a "View more" link only appears when the text actually overflows, and clicking it lets the description wrap in place (clicking "View less" restores the single line). Requires `Button`, `IconButton`, `Text`/`H2` from the bundle, plus `./SubHeader.css` for the view-more hover state.
