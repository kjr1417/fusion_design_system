ToggleButtonGroup is a compact segmented control — view switches (List/Grid), short mutually-exclusive settings.

```jsx
<ToggleButtonGroup options={[{ label: "List", value: "list" }, { label: "Grid", value: "grid" }]} defaultValue="list" />
```

Conditional forms: use ToggleButtonGroup for the top of the usage hierarchy — high-priority, mutually-exclusive modes where the selection swaps a whole section/panel's worth of fields (not just one or two). For lower-priority, granular choices that reveal a handful of fields within a section, use SelectableCard or RadioButtonGroup instead.
