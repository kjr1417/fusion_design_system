# VerticalNavigation

Left-side app navigation rail with two levels: icon-led Level 0 accordions and their indented Level 2 children — Level 0 and Level 2 labels stay aligned across every variant (icon-led or icon-less).

## Variants
- **Always open (default)** — `collapsible={false}`. Fixed 230px, no footer toggle.
- **Collapsible** — `collapsible`. Footer hamburger toggles between 45px (icons only) and 230px. Icon swaps `panel-close-left` (shown while expanded, click to collapse) / `panel-open-right` (shown while collapsed, click to expand).
- **Expand on hover** — `collapsible expandOnHover`. While collapsed, hovering the rail flies it out to 230px as an overlay with `--salt-shadow-low`, without changing the persisted collapsed state.
- **Header-triggered, no iconography** — `showIcons={false} showFooterToggle={false} collapsed={externalState} onCollapsedChange={setExternalState}`. Hides every glyph in the panel (Level 0 + Support) and its own footer toggle; expand/collapse is driven entirely by an external control (e.g. a hamburger button in an app header). Collapsed width is 0 (no icon rail to fall back to, since icons are hidden) rather than 45px.

## Structure
`items`: Level 0 entries (`id`, `label`, `icon` glyph name, optional `items`). Level 0 with children renders as an accordion whose direct children are Level 2 leaf items — there is no Level 1 tier. Icon glyph names: `home`, `chart-pie`, `database`, `settings`, `users`, `help`.

Footer (outside the scroll region): a Support link (`supportLabel`/`supportIcon`/`onSupportClick`) plus the collapse toggle when `collapsible`.

## Usage
```jsx
<VerticalNavigation
  items={[
    { id: "home", label: "Home", icon: "home" },
    { id: "analytics", label: "Analytics", icon: "chart-pie", items: [
      { id: "reports", label: "Reports" },
      { id: "dashboards", label: "Dashboards" },
    ] },
  ]}
  activeId="home"
  collapsible
  expandOnHover
  onNavigate={(item) => console.log(item.id)}
/>
```
