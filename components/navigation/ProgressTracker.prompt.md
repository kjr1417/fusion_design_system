`ProgressTracker` is a vertical, custom Fusion wizard tracker for multi-step forms (e.g. the "Create Knowledge Base" side rail). It is NOT the horizontal `Stepper` — use `Stepper` for inline top-of-page progress, `ProgressTracker` for a side rail that follows a long scrolling form.

Built from Salt's Vertical Navigation anatomy: each step IS a Fusion `Accordion` item (`variant="inline" chevronPosition="end"`) — status icon + label on the left, chevron on the right, hairline top border as the divider between steps. A step with no `children` renders as a plain non-collapsible header row (no chevron). Sub-steps ("Navigation Item - Level 1/Child") render indented inside the expanded content, H4/small text, each with its own status icon.

By default every parent step is expanded; the user can independently collapse or expand each one by clicking its chevron, same interaction as native Vertical Navigation accordions. Multiple parent groups can be open at once — expanding one does not collapse the others. Use a step's `defaultExpanded: false` to start it collapsed instead.

```jsx
<ProgressTracker
  headerTitle="Progress Tracker Title"
  headerDescription="A description clarifies a feature's purpose and function."
  steps={[
    { label: "Metadata", status: "complete", children: [{ label: "Data publisher", status: "complete" }] },
    { label: "Ownership", status: "active", defaultExpanded: false, children: [{ label: "Approvers", status: "todo" }] },
    { label: "Connect Data", status: "todo" },
    { label: "Validate", status: "error" },
  ]}
  onStepClick={(i) => scrollToSection(i)}
  onChildClick={(step, child) => scrollToSubSection(step, child)}
/>
```

Step `status` — five states, each with its own glyph and color: `todo` (gray dashed ring), `active` (blue solid dot — the current step), `inprogress` (blue half-filled ring), `complete` (green check), `error` (red solid diamond, e.g. a step with a validation failure). When `status` is omitted it's derived from `activeStep`: earlier indices render `complete`, the current index `active`, later ones `todo`.

Step labels use the `label/default` text style, colored `--salt-content-secondary-foreground` (or `--salt-content-secondary-foreground-disabled` when `disabled`). Set a step's `disabled` to dim its icon and gray its label — not available on `error` steps, which always render at full strength. A disabled step or child shows a native tooltip explaining why (`disabledReason`, defaulting to "You do not have permissions to access these fields.") in place of its label tooltip. A step or child's `description` renders one size below its label (`label/default` scale, default weight, `--salt-content-secondary-foreground`), left-aligned under the label and free to wrap — for a step this renders as an always-visible block directly beneath the header (visible even while the accordion is collapsed), separate from the header's own flex row so it never disturbs the icon/label/chevron vertical centering. Child labels use `H4/small` and follow the same enabled/disabled color rule; pass `activeChild={{ step, child }}` to highlight one, or set a child's own `status: "active"` — either shows the same 3×20px accent indicator bar. `defaultExpanded={false}` starts a step's children collapsed.

The tracker is always 260px wide (expanded) or 45px (rail-collapsed, icon-only — a non-hoverable `list.svg` glyph replaces the header, tooltipped with the header title, and dividers between icon rows match the accordion hairlines). `dock="left"` (default — a rail with page content to its right, e.g. a form wizard) anchors to the left, collapses toward the left, and puts its divider border on the right; `dock="right"` (a panel that opens from the right side of the screen) anchors to the right of its container (`margin-left: auto`), collapses toward the right, and puts its divider on the left. The sticky footer toggle mirrors the same way: `panel-close-left`/`panel-open-left_solid` for `dock="left"`, `panel-close-right`/`panel-open-right_solid` for `dock="right"` (identical glyphs to `VerticalNavigation`); its top border only appears when the step list is actually scrollable. `expandOnHover` flies the collapsed rail out to full width on hover — an absolutely-positioned overlay with `--salt-shadow-low` in place of the divider border, exactly like `VerticalNavigation`'s hover-expand — without changing the persisted collapsed state. The header block (`headerTitle`/`headerDescription`) is sticky at top too, so the step accordions scroll behind both. The component's own height is fluid — it always fills `height: 100%` of its container rather than sizing to content, so give the parent an explicit height (or a flex/grid cell with a bounded height) for the internal scroll region to work.
