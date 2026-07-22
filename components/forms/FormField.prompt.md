FormField wraps one Input/Checkbox/Dropdown with a label and helper/error text.

```jsx
<FormField label="Account nickname" necessity="required" helperText="Visible only to you">
  <Input placeholder="e.g. Household checking" />
</FormField>
```

Pass necessity to auto-append "*" (required) or "(optional)" to the label.
