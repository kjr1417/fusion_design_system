ArtifactCard is the shared row anatomy for an artifact: eyebrow label, title, optional description, an optional horizontal StaticListGroup of metadata, and Download/View actions in their own right-hand column (wraps within that column rather than pushing below the content). It's what ArtifactsPanel's Library rows render, and what ConversationArea's `"artifact"` block renders — reuse it anywhere else an artifact needs to look the same.

Pass `bordered` for a standalone card dropped into a conversation (border + minor shadow signal it's an interactive item, not plain text) — leave it off for rows inside a list like ArtifactsPanel.

Only one of Download/View shows at a time: with `onDownload` set, the card shows Download until it's clicked, then switches to View (pass `downloaded`/`onDownload` yourself to control this from outside).

```jsx
<ArtifactCard
  bordered
  eyebrow="Report"
  title="Advisory Desk Email Summary.pdf"
  description="Generated from the 60-day mailbox export"
  items={[{ label: "Size", value: "2.1 MB" }, { label: "Created", value: "Aug 13, 2026" }]}
  actionLabel="View"
  onAction={() => {}}
  onDownload={() => {}}
/>
```
