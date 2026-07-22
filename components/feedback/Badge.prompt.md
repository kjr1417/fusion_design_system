Badge shows a count or status dot, usually pinned to the corner of an icon or avatar.

```jsx
<span style={{ position: "relative" }}>
  <BellIcon />
  <Badge value={3} topRight />
</span>
<Badge dot topRight />
```

Use dot for a lightweight "there's something new" indicator when a precise count isn't useful.
