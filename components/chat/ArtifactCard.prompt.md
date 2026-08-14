ArtifactCard is the shared row anatomy for an artifact: eyebrow label, title, optional description, an optional StaticList of metadata, and one action button pinned right. It's what ArtifactsPanel's Library rows render, and what ConversationArea's `"artifact"` block renders — reuse it anywhere else an artifact needs to look the same.

```jsx
<ArtifactCard
  eyebrow="Report"
  title="Advisory Desk Email Summary.pdf"
  description="Generated from 60-day mailbox export"
  items={[{ label: "Size", value: "2.1 MB" }, { label: "Created", value: "Aug 13, 2026" }]}
  actionLabel="View"
  onAction={() => {}}
  secondaryAction={<IconButton aria-label="Download" onClick={() => {}}><DownloadIcon /></IconButton>}
/>
```
