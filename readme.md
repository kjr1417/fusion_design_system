# Fusion Design System

A design system for **Fusion**, JPMorgan's internal AI/data platform, built on top of [Salt DS](https://github.com/jpmorganchase/salt-ds) — JPMorgan's open-source enterprise design system. For prototyping, light mode and low density only (`salt-theme salt-density-low`). For web only, with a sampling of 57 components covering the Fusion product suite. The Fusion wordmark is a single lockup in `assets/logo.svg`.

## Principles

To achieve a modern, AI-native, JPMorganChase-aligned Fusion expression, built on Salt.

- **A friendlier, more approachable, modern look.** Edges and corners are softened so the product feels less rigid and more conversational — the right tone for an AI experience that should feel calm and inviting, not mechanical.
- **Blue as our recognizable Fusion accent color.** Blue is how users instantly recognize the product, and it's used to draw the eye to the things that matter most — the actions we want people to take.
- **AI prompt as the centerpiece experience.** The box where users talk to the AI is treated as the hero of the experience. It looks active and alive, signaling clearly: this is the main way you interact with the product, not just another text field.
- **Cleaner and less cluttered screens.** We use light backgrounds and subtle separation instead of heavy lines and boxes. The result feels more spacious and modern, while still supporting information-dense screens when the business needs them.
- **A more contemporary product voice.** The fonts we use signal whether a product feels current or dated. Fusion's typography is chosen to make the product feel modern and credible at a glance.
- **Built on Salt, our firm's foundation.** Everything sits on top of JPMorganChase's standard design system, so Fusion stays consistent with the rest of the firm while expressing its own AI-forward identity.

## Sources

- **GitHub:** [jpmorganchase/salt-ds](https://github.com/jpmorganchase/salt-ds) (branch `main`) — component CSS (`packages/core/src`), theme tokens (`packages/theme/css/next`), icons (`packages/icons/src/components`), and the [content style guide](https://github.com/jpmorganchase/salt-ds/blob/main/content-style-guide.md). Explore this repo directly for the full component set, prop APIs, and the legacy (non-`next`) theme if you need it.

This is a curated Fusion flavor of Salt DS for rapid mocking. For production work, go to [salt-ds](https://github.com/jpmorganchase/salt-ds) — it has ~80 components and all density/mode variants.

## Content fundamentals

Salt's own [content style guide](https://github.com/jpmorganchase/salt-ds/blob/main/content-style-guide.md) governs Fusion's copy:

- **American English, active voice, second person, present tense.** Speak to the user directly ("View all accounts", not "Users can view...").
- **Sentence case almost everywhere** — headings, buttons, labels, component names in running text (e.g. "the button"). Only use Pascal case + backticks (`` `Button` ``) when naming the component-as-code.
- **No exclamation points, no emoji, no slang.** The tone is precise, calm, and utilitarian — this is financial software; confidence comes from clarity, not enthusiasm.
- **Props/values are literal and specific:** "Set `wrap={true}`" rather than "set the wrap prop to true."
- **Numbers and money are exact.** Use real formatting (`$12,480.55`, not "$12.4k") in finance contexts — precision reads as trustworthy.
- Keyboard keys wrapped in `<kbd>`, modifier keys before others, `+` to combine, `/` for alternatives.

## Visual foundations

- **Color:** Blue (`--salt-color-blue-500`) is the Fusion accent (`--salt-palette-accent`), used for primary buttons, links, focus rings, active nav/tab states, and the AI prompt. Neutral grays (`gray-100`–`900`) carry text and borders. Green/red are reserved strictly for positive/negative status — never decorative. Light mode only; backgrounds are `snow`→`marble`→`limestone`.
- **Type:** Public Sans stands in for Fusion's display face, called **"Sons"** (see Fonts note below); Open Sans is Salt's body face; PT Mono is used for account numbers, codes and tabular figures. Headings are semibold, body is regular, action text (buttons) is semibold. No italics, no display serifs except the hero/marketing headline role.
- **Density:** **Low density only** (`salt-density-low`) — no medium/high/touch variants.
- **Spacing:** 8px base unit (`--salt-spacing-100: 16px` is 2 units); the scale runs 4/8/12/16/24/32/40/48/64/80/96, independent of density. Consistent internal card padding is 16–24px.
- **Corners:** Rounded, not sharp — a consistent radius scale (4/8/10/14/18px, plus a 999px "pill" for badges/pills/avatars). Softened edges give the product a calmer, more conversational feel.
- **Shadows:** Very low elevation. Cards sit nearly flat (`shadow-lowest`, 1px/3px blur, 10% opacity) at rest and step up only slightly on hover (`shadow-low`). No glows, no colored shadows.
- **Borders:** 1px hairlines in `gray-200` are the default separator — but favor subtle separation over heavy lines and boxes to keep screens clean and spacious.
- **Backgrounds:** Flat solid fills only. No gradients, no photography, no illustration, no texture/grain, no blur/glass. This is a data-dense enterprise system — decoration is intentionally absent.
- **Animation:** Minimal and functional — Salt defines short (150–200ms) ease-in-out fades/slides for menus, dialogs and overlays opening/closing. Nothing bounces; nothing loops; no parallax or decorative motion.
- **Hover / press states:** Hover darkens (solid buttons) or tints backward toward a "weakest" accent tone (bordered/transparent buttons and pills); press goes one step further (`active` tokens are always slightly stronger than `hover`). No scale/shrink on press.
- **Focus:** A visible 2px accent (blue) outline, offset 1px — always present, never suppressed, per Salt's accessibility-first stance.
- **Data figures:** Right-aligned, tabular, colored green/red only for gain/loss — never for arbitrary emphasis.

## Iconography

Icons are copied directly from `@salt-ds/icons` (`packages/icons/src/components/*.tsx` in salt-ds) — single-weight, geometric, monochrome glyphs on a `0 0 12 12` grid, fill-based paths rendered with `fill="currentColor"` so they inherit text color. Both an outline and a "Solid" variant exist for status glyphs (success/error/warning/info). ~548 glyphs total; 49 most-used for data/AI platforms (navigation, charts, actions, status, data/UI, user/org) are included locally in `assets/icons/` as `.svg` files with verbatim salt-ds path data. Copy any additional glyph straight from `packages/icons/src/components/` following the same path data. No emoji, no unicode-as-icon, no photographic icons.

## Fonts

- **Body:** Salt's **Open Sans** is used as-is (a real, open-source webfont, included here).
- **Display/heading:** Fusion's real display face is called **"Sons"** (`--jpmc-typography-fontFamily-sons`), a proprietary JPMC typeface not published anywhere this project could access. **Public Sans** (Google Fonts, open-source, similar geometric-grotesque proportions) is substituted for all heading/display/hero roles. If you get access to the real Sons webfont files, swap the `src` in `tokens/fonts.css` and repoint `--salt-typography-fontFamily-display` — no other token needs to change.

## Components

Location: `components/<group>/<Name>.jsx` + `.d.ts` + `.prompt.md`. Covers every major Salt DS component family used across the Fusion surfaces:

- **Actions** — `Button`, `IconButton`, `Link`, `Pill`
- **Layout** — `FlexLayout`, `FlowLayout`, `StackLayout`, `GridLayout`, `SaltProviderNext`
- **Feedback** — `Badge`, `Banner`, `Spinner`, `ProgressBar`, `StatusIndicator`, `Toast`, `LoadingState`, `EmptyState`
- **Forms** — `Input`, `MultilineInput`, `Checkbox`, `FormField`, `RadioButton` / `RadioButtonGroup`, `Switch`, `Textarea`, `Dropdown`, `Slider`, `ToggleButtonGroup`, `SegmentedButtonGroup`, `OmniInput`
- **Display** — `Card`, `InteractableCard`, `ContentCard`, `Carousel`, `Panel`, `Text` (`H1`–`H4`), `Avatar`, `Divider`, `Tabs`, `Accordion`, `List`, `Tag`, `LinkCard`, `Table`, `Menu`
- **Navigation** — `Breadcrumbs`, `Stepper`, `NavigationItem`, `ProgressTracker`, `GlobalNav`
- **Overlays** — `Dialog`, `Drawer`, `Tooltip`

60 components across 7 groups. `Button`, `IconButton`, `Link`, `Pill`, `Card`, `Divider`, `Tabs`, `Switch`, `Checkbox`, `RadioButton`/`RadioButtonGroup`, `ToggleButtonGroup`, `Tag`, `Banner`, `StatusIndicator`, `Table`, `Menu` render using CSS classes copied **verbatim** from a real salt-ds CSS extraction (see Sources) — not approximated. The rest (`Input`, `Badge`, `Panel`, `FormField`, `Avatar`, `Accordion`, `List`, `LinkCard`, `Dropdown`, `Slider`, `Textarea`, `Spinner`, `ProgressBar`, `Breadcrumbs`, `Stepper`, `Dialog`, `Drawer`, `Tooltip`) are hand-authored the same token-driven way, since no verbatim source was available for them. A few Salt families with no counterpart yet (ComboBox, Popover, DatePicker, FileDropZone, Tree, Toolbar) can be added on request.

### Intentional additions
`FlexLayout`, `FlowLayout`, `StackLayout`, `GridLayout`, `Text`/`H1`–`H4`, and `SaltProviderNext` mirror Salt DS's real layout, typography and theme-provider primitives. `IconButton` is a thin composition of `Button`. `ProgressTracker` is a vertical wizard rail for multi-step forms.

## Index

- `styles.css` — link this for tokens (colors, type, spacing, effects, fonts)
- `tokens/` — `colors.css`, `dark.css` (dark-mode overrides), `typography.css`, `spacing.css`, `effects.css` (radius/shadow/motion), `fonts.css`, `base.css`, `salt-support.css` (supporting tokens for the ported CSS)
- `salt-components.css` — the component class CSS (`.saltButton`, `.saltCard`, …) with full `:hover`/`:active`/`:focus`/`:disabled` states. Link it **alongside** `styles.css` on any page using the components — every specimen card does (`styles.css` then `salt-components.css`). Without it components render unstyled.
- `assets/` — `logo.svg` (single lockup), `icons/*.svg` (49 glyphs)
- `components/actions/`, `components/layout/`, `components/feedback/`, `components/forms/`, `components/display/`, `components/navigation/`, `components/overlays/` — see Components above
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand groups in the Design System tab)
