SectionHeader opens a form section: optional status banners, a "* = Required field" note paired with a "Show optional fields" `Switch`, the section title, and an optional one-line expandable description.

```jsx
<SectionHeader
  title="Account details"
  description="Basic identifying information used across billing, support, and reporting."
/>

<SectionHeader
  title="Compliance review"
  errorBanners={["2 fields need attention before you can submit."]}
  infoBanners={["Changes here require a second approver."]}
/>

<SectionHeader titleVariant="h4" title="Preferences" showRequiredNote={false} />
```

Error banners always render above info banners, each in `Banner` `status="error"`/`"info"` `variant="secondary"`, spacing-100 apart. The required-note and the "Show optional fields" `Switch` sit side by side (spacing-200 gap, note first) in a row spacing-150 below the banners (spacing-100 when any banners are present); the title sits spacing-200 below the row; the description sits spacing-100 below the title with spacing-300 beneath it. Set `showRequiredNote`/`showOptionalToggle` to `false` to drop either half of that row — use `titleVariant="h4"` only for the compact chat-panel title case, `"h3"` (default) everywhere else.
