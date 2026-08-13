ConversationArea is the message-list pattern for ChatLayout's `chatExperience` slot — pair it with ChatHeader above and PromptInput below. Load ConversationArea.css once per page for the typing-dot animation.

```jsx
<ConversationArea
  messages={[
    { role: "user", text: "Summarize the Q4 board deck.", timestamp: Date.now(), versionCount: 2, activeVersion: 2, attachments: [{ title: "q4-board-deck.pdf", fileType: "pdf" }] },
    { role: "status", text: "Reading 42 slides…", done: true },
    { role: "agent", name: "Builder_Agent_v2", time: "4:43pm", text: "Here's the summary…" },
    { role: "typing", name: "Builder_Agent_v2" },
  ]}
  onCopyMessage={(m) => navigator.clipboard.writeText(m.text)}
  onSubmitEdit={(m, newText) => console.log("submit edit", newText)}
  onChangeVersion={(m, v) => console.log("change version", v)}
/>
```
User messages hug their content and wrap at the available width, clamp past 5 lines with a "View more" toggle, and reveal a version-nav (left) / date / Copy / Edit (right) toolbar on hover (sitting in the gap below the bubble, not adding to it). Copy shows a brief checkmark/"Copied" confirmation. Edit swaps the bubble for a #DCF7F7 inline editor (a real Textarea, plus an "Editing" tag tinted #2A8285); Submit hands the new text back via `onSubmitEdit` — bump `versionCount`/`activeVersion` on that message to reflect the new version. `attachments` renders as an AttachmentTileGroup carousel above the bubble, except a single photo, which gets a large preview instead.
Give the host container real height (e.g. `height:100%` up to a `100vh` root) — ConversationArea only fills what its parent gives it; a fixed/short parent is what causes the "half height" clipping.
Agent messages can pass `blocks` instead of `text` for structured response typography — see `ResponseBlockSpec` in the `.d.ts` for the full block schema (headings, body, blockquote, ol, ul, disclaimer) and its inline markdown (`**bold**`, `*italic*`, `~~strike~~`, `` `code` ``, `[anchor](url)`, bare URLs).
