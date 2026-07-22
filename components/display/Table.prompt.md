# Table

Salt DS data table — verbatim CSS from `packages/core/src/table/Table.css`.

## Usage
```jsx
<Table variant="primary" zebra divider="primary">
  <TableHead><TableRow><TableCell header>Col</TableCell></TableRow></TableHead>
  <TableBody><TableRow><TableCell>Value</TableCell></TableRow></TableBody>
</Table>
```

## Props
- `variant`: primary | secondary | tertiary — background tone
- `zebra`: alternate row striping
- `divider`: primary | secondary | tertiary | none — row divider color
- `TableCell align`: left | right; `header` renders `<th>`
