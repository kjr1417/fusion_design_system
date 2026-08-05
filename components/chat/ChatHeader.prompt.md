ChatHeader is the 44px title bar for the active conversation — pairs with ConversationArea and PromptInput inside ChatLayout's central panel.

```jsx
<ChatHeader
  title={title}
  onTitleChange={setTitle}
  view={view}
  onViewChange={setView}
  onOpenLibrary={() => setPreviewOpen(true)}
  onDownload={downloadChat}
/>
```
