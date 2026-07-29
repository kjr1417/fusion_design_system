`ComboBoxMetadataOverlay` is for choosing among data-heavy items that need side-by-side comparison, not just a label. Each `options[]` entry carries a `metadata` array — rendered as a single horizontal, label-left `StaticListGroup` row directly beneath the option's label — so users can compare owner, status, dates, etc. without leaving the list.

```jsx
<ComboBoxMetadataOverlay
  options={[
    { value: "ds1", label: "EMEA Settlements", metadata: [{ label: "Owner", value: "J. Chen" }, { label: "Rows", value: "4.2M" }, { label: "Updated", value: "2h ago" }] },
    { value: "ds2", label: "APAC Custody", metadata: [{ label: "Owner", value: "R. Patel" }, { label: "Rows", value: "1.8M" }, { label: "Updated", value: "1d ago" }] },
  ]}
  multiselect
  secondaryActions={[{ label: "Filters", onClick: openFilters }, { label: "Recent", onClick: showRecent }]}
/>
```

Same field chrome as `ComboBox` — single-select fills the field; multiselect shows removable chips that overflow into a "+n" badge, expandable to a 3-row scrollable view. The overlay always ends with a footer: up to two secondary buttons (`secondaryActions`, bordered/neutral) followed by a primary "Browse All" button (tear-out icon) that opens a `Drawer` sliding up from the bottom — the drawer body is empty until a destination view is designed, but the open/close mechanics are already wired.
