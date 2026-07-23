A read-only label/value pair — an id, a status, a date, an owner — shown outside a table. The label uses `--salt-content-secondary-foreground` at strong weight; the value matches CopyValue's regular weight.

```jsx
<StaticList label="Owner" value="J. Chen" />
<StaticList label="Dataset description" value="Daily reconciliation feed for EMEA settlements" labelWidth="fixed" fixedWidth={140} />
<StaticList label="Owner" value="J. Chen" labelPosition="top" />
```

`labelPosition`: `"left"` (default, side-by-side) or `"top"` (stacked, no truncation). `labelWidth`: `"hug"` (label sizes to content, spacing-100 gap, both sides 1-line ellipsis), `"fluid"` (label unconstrained, spacing-300 gap, 2-line clamp), or `"fixed"` (label column pinned to `fixedWidth`px, spacing-300 gap, 2-line clamp). Use `StaticListGroup` to lay out several as a list, a dot-separated row, or multi-column groups.
