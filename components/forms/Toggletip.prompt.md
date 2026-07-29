`Toggletip` pairs with a `FormField` label to disclose supplementary, non-essential guidance on click (not hover — that's `Tooltip`). It renders a small info-glyph button; clicking opens a panel with optional `title` and `content`; clicking outside or pressing Escape closes it.

Use it for "nice to know" context (why a field exists, format examples, links to policy). Anything the user always needs to see — required format, error recovery — belongs in the field's persistent helper text instead, not a Toggletip.

```jsx
<FormField label="API key" necessity="required" toggletip="Generate a key from Settings → Developer access. Keys expire after 90 days.">
  <Input placeholder="Enter API key" />
</FormField>
```

`FormField` renders the `Toggletip` inline after the label text automatically when a `toggletip` prop is passed — you rarely mount `Toggletip` directly.
