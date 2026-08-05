ChatHistoryPanel is a self-contained, fixed-width (300px/45px) left rail — it owns its own collapse/flyout state, unlike ChatLayout's generic `chatHistory` slot.

```jsx
<ChatHistoryPanel
  onNewChat={startNewChat}
  searchValue={query}
  onSearchChange={setQuery}
  groups={[
    { label: "Today", items: [
      { id: "1", title: "Q4 board deck summary", active: true, onClick: () => open("1") },
      { id: "2", title: "Draft an email to the desk lead", draft: true, onClick: () => open("2") },
    ] },
  ]}
/>
```
