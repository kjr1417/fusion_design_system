CopyValue shows a short monospaced value (an id, resource key, or code) next to a copy icon button — used for account numbers, dataset ids, and API keys.

```jsx
<CopyValue value="ds-88213" onCopy={(v) => console.log("copied", v)} />
```

Clicking the icon writes to the clipboard and swaps to a check icon for 1.5s. Requires `./CopyValue.css` for the button's hover state.
