BannerStack is a self-dismissing list of status banners — success/error/warning/info rows, each with a status glyph and a trailing close `IconButton`. Success uses the `progress-complete` glyph and error uses `error-solid` (matching the rest of the system's status iconography); info/warning reuse the plain glyphs from `Banner`.

```jsx
<BannerStack
  banners={[
    { status: "success", message: "3 files uploaded successfully." },
    { status: "error", message: "onboarding-form.pdf exceeds the 10MB limit." },
  ]}
  onDismiss={(banner, index) => {}}
/>
```

Dismissal is tracked internally by index — clicking a banner's close button removes it from view immediately; `onDismiss` is a notification hook only, for syncing your own source-of-truth list (e.g. removing the entry so it doesn't reappear on next render with new data). Pass `gap` to change the space between stacked banners (default `spacing-100`). Renders `null` when every banner has been dismissed. Requires `IconButton` from the bundle.
