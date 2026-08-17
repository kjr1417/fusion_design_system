repo: kjr1417/fusion_design_system
branch: main

## Last sync
date: 2026-08-17T18:25:30Z
### Updated in this project
- Copied icons/expand-all.svg, icons/collapse-all.svg real paths into components/chat/ConversationArea.jsx (ExpandAllIcon, CollapseAllIcon)
- "View more"/"View less" buttons now use those as leading icons with default Button padding; the expandable block's summary shows a sparkle-icon "Overview" eyebrow matching the Test Mode AI summary styling

## Sync history
### 2026-08-17T18:18:00Z
- Copied icons/sparkle.svg's real path into components/chat/ConversationArea.jsx (SparkleIcon), used next to "AI-generated Summary" in the Test Mode accordion

### 2026-08-14T14:14:29Z
- Copied icons/thumbs-up.svg, thumbs-up_solid.svg, thumbs-down.svg, thumbs-down_solid.svg
- Inlined the real paths into components/chat/chatIcons.jsx (thumb-up, thumb-up-solid, thumb-down, thumb-down-solid)
- Wired Helpful/Not Helpful buttons in ConversationArea.jsx to the solid variants + accent color when selected

## Screen map
| Screen | Repo files |
|---|---|
| Conversation Area feedback icons | icons/thumbs-up.svg, icons/thumbs-up_solid.svg, icons/thumbs-down.svg, icons/thumbs-down_solid.svg |
| Test Mode accordion summary icon | icons/sparkle.svg |
| Expandable block Overview icon + View more/less buttons | icons/sparkle.svg, icons/expand-all.svg, icons/collapse-all.svg |
