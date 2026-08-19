VerticalFilter is a persistent, always-expanded faceted-filter rail (unlike VerticalNavigation/ProgressTracker, it has no collapsed/icon-only state) — narrow a result set with checkbox/radio accordion groups. Results should refresh instantly as selections change.

```jsx
<VerticalFilter
  groups={[
    { id: "type", label: "Type", type: "checkbox", options: [{ label: "Dataset", value: "ds" }, { label: "Model", value: "mo" }] },
    { id: "status", label: "Status", type: "radio", options: [{ label: "Active", value: "active" }, { label: "Archived", value: "archived" }] },
  ]}
  values={{ type: ["ds"], status: "active" }}
  onChange={(groupId, value) => {}}
/>
```

Layout top to bottom: an optional `pageTabs` list (full-width, 36px-tall rows — icon + label + optional right-aligned `count`, e.g. total items in that category — for switching the panel's whole context; 16px gap below), an optional header row (`title`, default "Filters"; a transparent "Clear all (n)" text button counting categories with at least one selection, not total items selected; an icon button that expands/collapses every accordion at once, using ExpandAllIcon/CollapseAllIcon), an optional top `comboBox` field (its own label, no helper text), then the accordion groups — first one open by default (`defaultOpen`). 16px separates the title from the comboBox, 24px separates the last of (title/comboBox) from the first accordion. Title, "Clear all", and the expand/collapse icon button all sit in a 28px-tall row so they align.

Each group renders as one accordion section with a checkbox group (`type: "checkbox"`, multi-select) or radio group (`type: "radio"`, single-select). A blue count badge appears next to a group's chevron once it has a selection. Groups with more than 8 options gain a local search box (16px below it); search filters that group's list only and bolds matches. Whether searched or not, more-than-8-option groups page 5 at a time via a "View more" link (8px below the list); once every option is shown, "View more" becomes "View less", which snaps back to the first 5. Groups with 8 or fewer options show them all, no search box, no paging.

`values`/`onChange` are controlled at the group level so the host page can build a summary (e.g. removable filter tags above the results) from the same state. Requires FusionDesignSystem_6db751 (Accordion, Text, Button, IconButton, Input, Checkbox, RadioButton, HighlightMatch, ComboBox).
