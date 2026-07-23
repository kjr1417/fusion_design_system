PageHeader is the full page-level header — title, actions, description and metadata at the top of a page. Use it for the top of a whole page or workspace; use the compact `AppHeader` instead for a nested sub-page's 44px bar.

```jsx
<PageHeader
  showBreadcrumbNav
  breadcrumbMenuItems={["Catalog", "Datasets", "AI Research Adoption"]}
  title="AI Research Adoption"
  primaryAction={{ label: "Publish" }}
  secondaryActions={[{ label: "Preview" }, { label: "Export" }, { label: "Share" }]}
  tertiaryAction={{ label: "Duplicate" }}
  overflowActions={["Archive", "Delete"]}
  description="Tracks how research teams are adopting the platform's AI capabilities across the firm."
  primaryTag="Dataset"
  secondaryTag="Governed"
  status={{ type: "success", label: "Published" }}
  copyValue="ds-88213"
  dataLabels={["Owner: J. Chen", "Updated 2h ago"]}
  tabs={["Overview", "Schema", "Lineage", "Access"]}
/>
```

All four lines are independently optional beyond the title: the breadcrumb nav, every action slot, description, every metadata item, and tabs. Actions sit directly after the title, in order: primary → secondary → tertiary → overflow (always rightmost). Only the first `secondaryActions` entry is shown as a button; any further entries collapse behind its chevron-down segment, opening a menu — never render every secondary action as its own visible button (that's what `tertiaryAction`, singular, is for). `overflowActions` collects anything that doesn't fit the visible action set behind a transparent kebab menu. The "View more" link only appears when the description text actually overflows its single line — no prop needed. Requires `Button`, `Menu`, `Tag`, `StatusIndicator`, `CopyValue`, `Tabs`, `Divider`, `Text`/`H1` from the bundle, plus `./PageHeader.css` for the segmented-control and view-more hover states.
