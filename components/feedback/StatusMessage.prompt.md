StatusMessage is a compact, single-line status row — for inline system messages (e.g. under a form section or panel header), not a full-width page banner (use `Banner`) and not an auto-dismissing toast (use `Toast`).

```jsx
<StatusMessage title="Data refresh scheduled" href="/docs/refresh-policy">
  Your dataset will refresh nightly at 2:00 AM ET and may be briefly unavailable.
</StatusMessage>
```

- `title` is optional — omit it for a plain icon + body + link row.
- Body text is forced to one line; if it would overflow, it truncates with an ellipsis and a hover tooltip reveals the full text automatically (no prop needed).
- The trailing link is also optional — set `showLink={false}` to drop it. When shown, it always opens in a new tab (`target="_blank"`) and carries a tearaway icon — set `linkText` to change the label from the "Learn more" default, and `href`/`onLinkClick` to wire it up.
- `status` picks the solid icon and its color: `info` (default), `success`, `warning`, `error`.
