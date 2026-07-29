`Drawer` is a bottom sheet: it slides up from the base of the viewport over a backdrop, with a drag-handle affordance, a title/close header, a scrollable body, and an optional `InlineButtons` footer. Use it for a secondary task launched from a denser control — e.g. a "Browse All" action inside a combo box's overlay — rather than `SidePanel` (which slides in from an edge for detail-on-the-side reading).

```jsx
const [open, setOpen] = React.useState(false);
<Drawer open={open} onClose={() => setOpen(false)} title="Browse All">
  {/* body content */}
</Drawer>
```

Leave `children` empty for a drawer whose destination view isn't built yet — the shell (backdrop, slide-up, header, close, Escape-to-close) is fully functional on its own.
