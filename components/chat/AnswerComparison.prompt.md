AnswerComparison is the response card for two (or more) AI-generated answers awaiting a user pick: an even, full-width split of one Card per option, each with a right-aligned, bordered "Choose Option A" button. Below a measured width threshold it collapses into Tabs so only one option's card shows at a time. Picking an option replaces the whole card with that option's response plus an italic "Based on your selection of… Change answer" disclaimer — clicking "Change answer" reverts to the comparison so the user can pick differently (wire `onChangeSelection` to regenerate anything downstream that depended on the old pick).

```jsx
<AnswerComparison
  options={[
    { label: "Option A — concise", text: "..." },
    { label: "Option B — detailed", blocks: [{ type: "body", text: "..." }] },
  ]}
  onSelect={(i) => console.log("picked", i)}
/>
```

Pass `blocks` (same schema as ConversationArea's `ResponseBlockSpec[]`) for structured responses plus a `renderBlocks` function to render them, or `text` for plain copy. ConversationArea's `"comparison"` block type wires `renderBlocks` to its own response renderer automatically.
