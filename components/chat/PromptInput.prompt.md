PromptInput is the chat composer — pairs with ChatHeader and ConversationArea inside ChatLayout's central panel.

```jsx
<PromptInput
  value={draft}
  onChange={setDraft}
  onSend={sendMessage}
  attachments={files}
  onRemoveAttachment={(f, i) => removeFile(i)}
  dropdowns={[{ options: [{ label: "Claude", value: "claude" }, { label: "GPT-5", value: "gpt5" }], defaultValue: "claude" }]}
  helperText="AI-generated responses may be inaccurate. Verify important information."
/>
```
