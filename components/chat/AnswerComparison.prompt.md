AnswerComparison shows two (or more) candidate agent responses side by side, each in a Card with a bottom action button ("Use this") — for letting the user pick between AI-generated alternatives in the conversation.

```jsx
<AnswerComparison
  options={[
    { label: "Option A — concise", text: "..." },
    { label: "Option B — detailed", blocks: [{ type: "body", text: "..." }] },
  ]}
  onSelect={(i) => console.log("picked", i)}
/>
```

Pass `blocks` (same schema as ConversationArea's `ResponseBlockSpec[]`) for structured responses plus a `renderBlocks` function to render them, or `text` for plain copy. ConversationArea's `"comparison"` block type wires `renderBlocks` to its own response renderer automatically. Cards stack vertically below ~560px combined width.
