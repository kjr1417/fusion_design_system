Textarea is Input's multi-line counterpart — notes, descriptions, free-text prompts.

```jsx
<Textarea rows={4} placeholder="Enter agent instructions" />
<Textarea rows={4} characterLimit={280} placeholder="Enter caption" />
```

Empty state shows placeholder text inviting entry — standard is "Enter {value}", contextual to the field.

`characterLimit` caps typing at that count and renders a live "120/280" counter on its own line below the field, under the resize handle — no error message, the counter stopping is the only feedback.
