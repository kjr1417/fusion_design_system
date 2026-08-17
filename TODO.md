# Fusion Design System — Conversation Area: Agent Response Components

**Status: all 18 items shipped.** New components: `CodeBlock`, `ImagePreview`, `ArtifactCard`, `AnswerComparison`. Extended `ConversationArea` with block types (`status`, `code`, `image`, `artifact`, `comparison`, `expandable`), a left-aligned agent action strip (Retry/Helpful/Not Helpful/Copy/Download/date), Test Mode message grouping, and a typing-indicator label. Extended `Dialog` (width/bodyStyle) and `ArtifactsPanel` (now built on the shared `ArtifactCard`). Accordion list patterns (simple/static+tags/nested/source) documented and demoed without needing new components. See `components/chat/conversation-area.card.html`, `accordion.card.html`, `response-cards.card.html`, `code-block.card.html`, `image-preview.card.html` for live demos.

Goal: extend `ConversationArea`'s agent-message vocabulary (the `ResponseBlockSpec` union in `components/chat/ConversationArea.d.ts`) plus a few standalone components, so agent responses can render code, media, structured lists, forms, comparisons, and their own action strip. Reuse existing primitives before building new ones — this system already has `Accordion`, `Card`/`InteractableCard`, `StaticList`, `Tag`, `Link`, `StatusMessage`, `InlineButtons`, `ButtonBar`, `ExpandableText`, `Spinner`. Check `components/overlays/` for an existing `Dialog` before building one for the expanded image.

## 1. Code block
- [ ] New `components/display/CodeBlock.jsx` (+`.d.ts`+`.prompt.md`): monospace surface, optional language label top-left, Copy icon button top-right (reuse `copy.svg` pattern from `CopyValue`), optional line numbers.
- [ ] Add `"code"` to `ResponseBlockSpec.type` (`code: string`, `language?: string`) in `ConversationArea.d.ts`; render via `CodeBlock` in `ConversationArea.jsx`.

## 2. Code block with diff view
- [ ] Extend `CodeBlock` with a `diff` mode: per-line `+`/`-`/context markers, green/red tinted line backgrounds (reuse status colors from `StatusBadge`/`Banner` semantics — don't invent new colors).
- [ ] Add `diffLines` shape to the `"code"` block spec (or a separate `"diff"` block type — decide during implementation based on how different the render path is).

## 3. Image preview with copy/expand tools
- [ ] New `components/display/ImagePreview.jsx`: thumbnail with hover-revealed toolbar (Copy, Expand icon buttons, `copy.svg`/`expand.svg`).
- [ ] Add `"image"` block type (`src`, `alt`) to `ResponseBlockSpec`.

## 4. Expanded image dialog
- [ ] Check `components/overlays/` for an existing Dialog/Modal; if present, wire `ImagePreview`'s Expand button to open the full-res image in it. If absent, build a minimal `ImageDialog` on top of whatever overlay primitive exists (don't fork a second modal implementation).

## 5. Accordion-based simple list
- [ ] Pattern only (likely no new component): `Accordion` item whose `content` is a plain `List`/`ul` block. Document in `Accordion.prompt.md` and add a demo to `display/cards.card.html` or a dedicated conversation-blocks card.

## 6. Accordion-based static list w/ descriptions + optional metadata tags
- [ ] Pattern: `Accordion` item content = list of rows, each a title + description (`StaticList` or plain stacked `Text`) + optional trailing `Tag`(s). Confirm `StaticList` supports a tag slot; if not, compose `StaticList` + `Tag` in a flex row rather than modifying `StaticList`.

## 7. Accordion nested (collapsed by default) for additional context
- [ ] Confirm nested `Accordion` (an `AccordionItem.content` containing another `<Accordion defaultOpen={-1}>`) renders indentation/border correctly — `Accordion.d.ts` doesn't call out nesting explicitly. Fix indentation math in `Accordion.jsx` if it doesn't compose cleanly.

## 8. Accordion source list (anchor links + descriptions + optional tags)
- [ ] Pattern: `Accordion` item content = rows of `Link` (anchor) + description text + optional `Tag`(s). New lightweight `SourceListRow` sub-pattern if repetition warrants a component; otherwise keep as documented composition.

## 9. Card containers for inline forms
- [ ] Pattern: `Card` (variant `secondary` or `tertiary`) wrapping `FormField`/`Input`/etc. Mostly a usage doc + demo in a conversation-blocks card — confirm `Card`'s padding/variant works for form density before writing it up.

## 10. Selectable cards (max 2 per row, max 1 row)
- [ ] Use `InteractableCard` (`selected` prop already exists) in a 2-col flex/grid row. Add a small `SelectableCardGroup` wrapper if the design needs single-select radio-like behavior (only one card selected at a time) — check if that logic exists anywhere already.
- [ ] Pair with left-aligned `InlineButtons` (`direction="left-to-right"`) beneath for submit/secondary actions (item 17 — same underlying component, no new build needed beyond a demo).

## 11. Artifact cards (eyebrow, title, description, static list, right-aligned action button) — identical to Artifacts panel card
- [ ] Extract the artifact row layout currently inline in `ArtifactsPanel.jsx` into a shared `ArtifactCard.jsx` (eyebrow label, title, optional description, `StaticList`, right-side action `Button`). Use it both in `ArtifactsPanel` and as a new `"artifact"` block type in `ConversationArea` so the two stay pixel-identical by construction (not by copy-paste).

## 12. Answer comparison cards
- [ ] New `components/chat/AnswerComparison.jsx`: two `Card`s side by side (equal width, responsive to stack on narrow), each rendering one candidate response; bottom action row per card ("Use this" style) via `InlineButtons`. Add `"comparison"` block type to `ResponseBlockSpec` (`options: [{ blocks/text, actionLabel }]`).

## 13. Test Mode accordion
- [ ] Wrap the span of messages sent while `testMode` (from `PromptInput`) was active in a single collapsed `Accordion` item in `ConversationArea` (header e.g. "Test Mode conversation — N messages"). Needs `ConversationMessage` to carry a `testMode?: boolean` flag (or explicit start/end markers) so `ConversationArea` can group contiguous test-mode messages into one accordion.

## 14. Three-dot loader with label
- [ ] `ConversationArea`'s `"typing"` role already renders animated dots (`ConversationArea.css`) — add a trailing label next to the dots (static string or dynamic, e.g. "Loading status content"). Add `label?: string` to the typing message shape in `ConversationArea.d.ts`.

## 15. Inline status messages (success/info/error/warning)
- [ ] Add a `"status"` block type to `ResponseBlockSpec` that renders `StatusMessage` directly (component already exists — just needs wiring into the block renderer, no new component).

## 16. Action button strip beneath agent responses
- [ ] New left-aligned hover toolbar for agent messages in `ConversationArea` (mirrors the existing user-message hover toolbar's date/tooltip format, but left-aligned): Retry (`refresh.svg`), Helpful (`like.svg`/thumbs-up — confirm a thumbs-down asset exists or needs adding), Not Helpful, Copy (`copy.svg`), Download (`download.svg`), date stamp. Wire via new `onRetry`/`onFeedback`/`onCopyMessage` (already exists)/`onDownloadMessage` props on `ConversationAreaProps`.
- [ ] Check `icons/` for a thumbs-down glyph — `like.svg`/`favorite.svg` exist for "helpful" but nothing obviously "not helpful"; may need a new icon or a flipped `like.svg`.

## 17. Left-aligned inline buttons
- [ ] No new component — `InlineButtons` already supports `direction="left-to-right"`. Just add a demo showing it under selectable cards (ties into item 10).

## 18. View more / View less ghost buttons for multi-response expand
- [ ] Pattern: reuse `ExpandableText`'s expand/collapse mechanics but generalize beyond text — likely a new `ExpandableSection` (ghost-button-triggered) wrapping arbitrary block content (an AI "overview" summary collapsed, full detail blocks revealed on "View more"). Add as a `"expandable"` block type wrapping nested `blocks`.

## Sequencing note
Do items 15 (status blocks) and 17 (inline buttons demo) first — pure wiring, no new components. Then 1–4 (code/image), then 5–8 (accordion patterns, mostly docs), then 9–11 (cards), then 12 (comparison), 13 (test mode), 16 (action strip), 18 (expandable) last since it touches the most existing block-rendering logic.

---

# Fusion Design System — Forms Card: Pending Work

## 1. ComboBox overlay selection styling
- [ ] Add a leading Checkbox in each option row for multiselect combo boxes (checked when that option is selected), using the existing Checkbox component.
- [ ] Selected option rows (both single- and multi-select): keep the existing accent-weakest background fill, but change the text color to black (`var(--salt-content-primary-foreground)`) instead of accent-foreground.
- [ ] Single-select rows: no leading checkbox, but same background-fill + black-text rule applies to the selected row.
- [ ] Edit `components/forms/ComboBox.jsx`'s option row rendering (the `role="option"` div) to implement the above; update `ComboBox.prompt.md` if it describes this behavior.
- [ ] Run `check_design_system` + `ready_for_verification` on `components/forms/form-fields.card.html` after the edit.

## 2. Spacing tokens for grouped controls
- [ ] CheckboxGroup / RadioButtonGroup: margin-top and margin-bottom = spacing-75 (in `components/forms/Checkbox.jsx` and `components/forms/RadioButton.jsx`).
- [ ] ToggleButtonGroup: margin-bottom = spacing-300 (locate the component — likely `components/forms/ToggleButtonGroup.jsx`).
- [ ] FileUpload: margin-bottom = spacing-300 (`components/forms/FileUpload.jsx`).
- [ ] StaticListGroup: margin-bottom = spacing-300 when used in a form context (locate — likely under `components/display/`).
- [ ] Run `check_design_system` + `ready_for_verification` on `form-fields.card.html` after edits.

## 3. Section Header component (new)
Build `components/forms/SectionHeader.jsx` (+ `.d.ts` + `.prompt.md`) with four demo variants:
- H3; Section 1
- H3; Section 1 w/ Banners
- H3; Section 2+
- H4; Title (Chat Use Only)

**Row layout (top to bottom):**
1. Error banner(s), if present
2. Info banner(s), if present
3. "* = Required field" label (body/strong) + a Salt `Switch` toggle for "Show optional fields" (Boolean)
4. Section title (H3/default, or H4/default for the "Chat Use Only" variant)
5. Description — use an ExpandableText component: truncates to a single line by default; "View more" expands to full wrapped text.

**Spacing:**
- Above row 3: spacing-150 normally; reduced to spacing-100 when any banners are present.
- Above row 4: spacing-200.
- Above row 5: spacing-100.
- Below row 5: spacing-300.
- Between multiple banners: spacing-200.
- Error banners always render above info banners.

**Typography/color:**
- Row 3 label: body/strong.
- Section title: h3/default (h4/default for the Chat-Use-Only variant).
- Description: body/default.
- All text: `var(--salt-content-primary-foreground)`.
- Switch: use the existing Salt `Switch` component directly (`components/forms/Switch.jsx`).

**Before building:** check whether Banner and ExpandableText components already exist in the project; only create new ones if they don't.

- [ ] Add all 4 demo variants to `components/forms/form-fields.card.html` (or a dedicated card).
- [ ] Run `check_design_system` + `ready_for_verification` after implementation.

## 4. Known non-issues (no action needed)
- The verifier previously flagged an apparent FormField label-wrap/overlap bug. Confirmed via live `getBoundingClientRect`/`offsetHeight` in the real DOM that the label renders correctly as a single line — the overlap only appears in the verifier's screenshot capture due to html-to-image substituting fallback fonts with different metrics than the real loaded fonts. Not a real bug; no fix needed unless it recurs with genuinely wrapped labels.
- Same artifact recurred in `artifacts-panel.card.html`: the verifier flagged "Library" rendering truncated ("Libr…") and "Download All" wrapping to two lines. Confirmed via live DOM query the title renders at full width (81px within a 295px-wide flex slot) and the button stays on one line (124px, `white-space: nowrap`). Not a real bug.
