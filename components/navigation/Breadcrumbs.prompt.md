Breadcrumbs show where the current page sits in a hierarchy — catalog drill-downs, nested settings. Paths over 2 levels collapse to first + a "…" dropdown of hidden levels + last (same collapsing behavior as AppHeader).

```jsx
<Breadcrumbs items={[{ label: "Catalog", href: "#" }, { label: "AI Research Adoption" }]} />
```

Requires `Menu` from the bundle, plus `./Breadcrumbs.css` for the ellipsis trigger's hover state.
