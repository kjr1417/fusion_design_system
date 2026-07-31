ChatLayout is the Studio chat shell — GlobalNav, a collapsible chat-history rail, a central chat experience, a resizable + fully-closable file/HTML preview panel, and the Footer.

```jsx
<ChatLayout welcomeDescription="Ask anything about your data." previewHeader="report.html" previewContent={<Preview />} />
```

The central panel's default (no `chatExperience` passed) is a welcome screen: Display2 `welcomeTitle` ("Welcome Message" by default), spacing-100 gap, optional H2 `welcomeDescription`, spacing-800 gap, then a prompt-input mock (attach button + model/version Dropdowns left, primary send button right) capped 400–700px wide. `promptHelperText` renders below it in FormField's helper-text style, then a spacing-950 gap leads into optional `swappableContent` (980–1280px). Everything is centered, with the welcome block starting 20% down the panel. Hitting Send swaps the panel to a built-in conversation view (header + scrollable messages with spacing-200 side padding + sticky prompt input, spacing-200 beneath). Pass `chatExperience` once real chat/conversation content is ready to fully take over both states.

The history rail matches VerticalNavigation's collapse pattern: it defaults collapsed to a 45px icon rail (blending into the layout's background, not the container surface), flies out to `historyWidth` on hover (`historyExpandOnHover`, default true) without persisting expanded state, and its footer holds the same toggle button/glyphs (`panel-open-left_solid` collapsed → `panel-close-left` expanded) — click to pin it open/closed. The preview panel remains a real drag-resizable splitter (`previewMinWidth`–`previewMaxWidth`, default 360–720px) and can close fully via its header's close button.
