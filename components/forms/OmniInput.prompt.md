OmniInput is the platform's primary conversational entry point — the hero prompt bar that starts most user flows (like a Claude/Gemini composer). Use it once, centered, on a home or landing surface. It has a glowing animated aura, a typewriter placeholder that cycles guidance prompts, an attach button, a mode selector, an accent send button, and optional suggestion chips.

```jsx
<OmniInput
  placeholders={[
    "Find datasets tagged with counterparty risk…",
    "Compare the top summarization models on latency and cost",
  ]}
  modes={["Search & Discover", "Build a workflow", "Analyze data"]}
  onSend={(text, mode) => run(text, mode)}
/>
```

Pass `suggestions={[]}` to hide the chip row. Send fires on click or Cmd/Ctrl+Enter.
