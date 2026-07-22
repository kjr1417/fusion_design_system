Input is a single-line text field. Pair it with FormField for a label and helper/error text.

```jsx
<Input placeholder="Search accounts" startAdornment={<SearchIcon />} />
<Input validationState="error" defaultValue="12ab" />
```

validationState tints the border/background to match Banner's status colors; startAdornment/endAdornment hold icons or IconButtons (e.g. a clear button).
