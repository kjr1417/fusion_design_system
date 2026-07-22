# Menu

Salt DS click-triggered dropdown menu — verbatim CSS from `packages/core/src/menu/{MenuItem,MenuPanel,MenuGroup}.css`.

## Usage
```jsx
<Menu trigger="Actions" items={["Edit", "Delete"]} onSelect={(item) => console.log(item)} />
```

## Notes
Renders a bordered button trigger + floating `.saltMenuPanel` with `.saltMenuItem` rows on click; closes on outside click.
