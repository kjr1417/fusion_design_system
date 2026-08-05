ConversationArea is the message-list pattern for ChatLayout's `chatExperience` slot — pair it with ChatHeader above and PromptInput below. Load ConversationArea.css once per page for the typing-dot animation.

```jsx
<ConversationArea
  messages={[
    { role: "user", text: "Summarize the Q4 board deck." },
    { role: "status", text: "Reading 42 slides…", done: true },
    { role: "agent", name: "Builder_Agent_v2", time: "4:43pm", text: "Here's the summary…" },
    { role: "typing", name: "Builder_Agent_v2" },
  ]}
/>
```
