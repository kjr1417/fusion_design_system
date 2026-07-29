Input is a single-line text field. Pair it with FormField for a label and helper/error text.

```jsx
<Input placeholder="Enter account name" startAdornment={<SearchIcon />} />
<Input validationState="error" defaultValue="12ab" />
```

Empty state shows placeholder text inviting entry — standard is "Enter {value}" (e.g. "Enter dataset name"), contextual to the field.

validationState tints the border/background to match Banner's status colors; startAdornment/endAdornment hold icons or IconButtons (e.g. a clear button).

```jsx
<Input characterLimit={40} defaultValue="Q3 risk review" endAdornment={<ClearButton />} />
```

`characterLimit` caps typing at that count and renders a live "12/40" counter after endAdornment (after the clear icon, if one is present). Hitting the limit simply stops the counter from incrementing — no error message.
