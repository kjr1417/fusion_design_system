InlineButtons is the bare action-button group from ButtonBar — no container padding, background, border, status text, or error banner, and no collapse-on-collision. Use sparingly, embedded inside other patterns (card footers, row actions).

```jsx
<InlineButtons
  direction="right-to-left"
  primaryAction={{ label: "Save", onClick: save }}
  secondaryActions={[{ label: "Save as draft", onClick: saveDraft }]}
  tertiaryActions={[{ label: "Reset", onClick: reset }]}
/>
```

`direction="right-to-left"` (default) puts the primary action rightmost, matching ButtonBar. `direction="left-to-right"` puts it leftmost. Buttons are always ordered tertiary → secondary → primary reading in the primary's direction. Spacing between buttons is `spacing-100`.
