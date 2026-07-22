Dialog interrupts the current flow for a focused decision or short task — confirmations, quick edits.

```jsx
<Dialog open={open} title="Publish agent?" onClose={() => setOpen(false)} actions={<>
  <Button appearance="bordered" onClick={() => setOpen(false)}>Cancel</Button>
  <Button appearance="solid" sentiment="accented">Publish</Button>
</>}>This will make the agent available in staging.</Dialog>
```
