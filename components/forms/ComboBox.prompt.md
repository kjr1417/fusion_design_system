`ComboBox` is Salt's search-ahead select. Default is single-select: typed text filters `options`, picking one fills the field with its label and closes the list. Set `multiselect` to keep the list open and render each pick as a removable chip inside the field instead of filling it with text.

```jsx
<FormField label="Owning team" necessity="required">
  <ComboBox options={[{ value: "risk", label: "Risk Analytics" }, { value: "markets", label: "Markets Tech" }]} placeholder="Search teams" />
</FormField>

<FormField label="Data domains" helperText="Select every domain this dataset touches.">
  <ComboBox multiselect options={domainOptions} defaultValue={["data", "ai"]} />
</FormField>
```

Use plain `Dropdown` instead when the option list is short (under ~8) and doesn't need search. Pass `size="small"` inside a two-column field row (e.g. paired with a small `Input`).

Multi-select chips fill the collapsed row as many as fit (measured against the field's width), then a "+n" badge covers the rest; clicking "+n" expands the field to show every pill (capped at 88px tall / ~3 rows, scrollable) and reveals a clear-all "×" next to the chevron. Each pill caps at 190px (leaving clearance for the trailing clear/chevron icons) and shows a native title-attribute tooltip only when its label is actually truncated — untruncated pills get no tooltip.

Option rows in the overlay: multiselect rows show a leading `Checkbox` (checked when that option is selected, non-interactive itself — the whole row handles the click) — single-select rows have no leading checkbox. In both modes, a selected row keeps the accent-weakest background fill but renders its label in `--salt-content-primary-foreground` (not accent-foreground) for legibility.
