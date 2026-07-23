FileResultsGrid is a full-width results table for uploaded/attached files, built on the `Table` family.

```jsx
<FileResultsGrid
  files={[{ id: 1, name: "accounts-q3.xlsx", size: 48200 }]}
  onDownload={(file) => {}}
  onDelete={(file) => {}}
/>
```

Three columns: File name (left-aligned text), Size (right-aligned, auto-formats a numeric byte count to KB/MB or passes a pre-formatted string through), and Actions (right-aligned transparent neutral `IconButton`s for download/delete, each with a `Download {name}`/`Delete {name}` title tooltip). Column **headers** are always left-aligned regardless of their column's data alignment, with a thin divider between header cells only — no borders on body cells. Renders `null` when `files` is empty. Requires the `Table` family and `IconButton` from the bundle, plus `./FileResultsGrid.css`.
