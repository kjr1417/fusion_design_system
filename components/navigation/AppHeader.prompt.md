Fusion's 44px nested-page header: back button, collapsing breadcrumbs, optional edit/version/tag/copy affordances on the left; an optional view toggle, secondary (bordered-only) actions, and a status badge on the right.

```jsx
<AppHeader
  breadcrumbItems={[{ label: "Catalog" }, { label: "Datasets" }, { label: "AI Research Adoption" }]}
  version="v2.4"
  versionHistory={["v2.3", "v2.2", "v2.1"]}
  tagLabel="Beta"
  copyValue="ds-88213"
  actions={[{ label: "Share" }]}
  statusType="success"
  statusLabel="Published"
/>
```

Variants: `showBackButton`/`showEditIcon`/`showVersionMenu`/`showTag`/`showCopyValue` toggle each affordance independently; `showViewToggle` adds a Visualizer/Code `ToggleButtonGroup`; breadcrumbs over 2 levels auto-collapse to first + "…" menu + last. `actions` render bordered/neutral only — never primary. Requires `Button`, `Divider`, `Tag`, `Menu`, `ToggleButtonGroup` from the bundle, plus `./AppHeader.css` for hover/menu theming not covered by `salt-components.css`.
