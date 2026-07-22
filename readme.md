# Fusion Design System

A design system for **Fusion**, JPMorgan's internal AI/data platform, built on top of [Salt DS](https://github.com/jpmorganchase/salt-ds) — JPMorgan's open-source enterprise design system. For prototyping, light mode and low density only (`salt-theme` / `salt-theme[data-mode="dark"]`). For web only, with a sampling of components covering the Fusion product suite.

## Sources

- **This project was ported from [kjr1417/fusion_design_system](https://github.com/kjr1417/fusion_design_system)** (branch `main`) — an existing Fusion-flavored Claude Design system project. Tokens, components, icons, guidelines and the wordmark logo here were copied directly from it. Explore that repo for the original authoring notes and any updates made since this port.
- **[jpmorganchase/salt-ds](https://github.com/jpmorganchase/salt-ds)** (branch `main`) — the underlying open-source system: component CSS (`packages/core/src`), theme tokens (`packages/theme/css/next`), icons (`packages/icons/src/components`), and the [content style guide](https://github.com/jpmorganchase/salt-ds/blob/main/content-style-guide.md). This is a curated Fusion flavor of Salt DS for rapid mocking — for production work or the full ~80-component set and all density/mode variants, go to salt-ds directly.

Explore both repos further if you have access — they're the ground truth this system approximates.

## Principles

To achieve a modern, AI-native, JPMorganChase-aligned Fusion expression, built on Salt.

- **A friendlier, more approachable, modern look.** Edges and corners are softened so the product feels less rigid and more conversational — the right tone for an AI experience that should feel calm and inviting, not mechanical.
- **Blue as our recognizable Fusion accent color.** Blue is how users instantly recognize the product, and it's used to draw the eye to the things that matter most — the actions we want people to take.
- **AI prompt as the centerpiece experience.** The box where users talk to the AI (`OmniInput`) is treated as the hero of the experience. It looks active and alive, signaling clearly: this is the main way you interact with the product.
- **Cleaner and less cluttered screens.** Light backgrounds and subtle separation instead of heavy lines and boxes. Spacious and modern, while still supporting information-dense screens when the business needs them.
- **A more contemporary product voice.** Typography is chosen to make the product feel modern and credible at a glance.
- **Built on Salt, our firm's foundation.** Everything sits on top of JPMorganChase's standard design system, so Fusion stays consistent with the rest of the firm while expressing its own AI-forward identity.

## Content fundamentals

Salt's own [content style guide](https://github.com/jpmorganchase/salt-ds/blob/main/content-style-guide.md) governs Fusion's copy:

- **American English, active voice, second person, present tense.** Speak to the user directly ("View all accounts", not "Users can view...").
- **Sentence case almost everywhere** — headings, buttons, labels, component names in running text (e.g. "the button"). Only use Pascal case + backticks (`` `Button` ``) when naming the component-as-code.
- **No exclamation points, no emoji, no slang.** The tone is precise, calm and utilitarian — this is financial software; confidence comes from clarity, not enthusiasm.
- **Props/values are literal and specific:** "Set `wrap={true}`" rather than "set the wrap prop to true."
- **Numbers and money are exact.** Use real formatting (`$12,480.55`, not "$12.4k") in finance contexts — precision reads as trustworthy.
- Keyboard keys wrapped in `<kbd>`, modifier keys before others, `+` to combine, `/` for alternatives.
- Example, from the Fusion home hero: "Discover the firm's data and AI capabilities" — calm, declarative, no exclamation.

## Visual foundations

- **Color:** Blue (`--salt-color-blue-500`, `--salt-palette-accent`) is the Fusion accent — primary buttons, links, focus rings, active nav/tab states, and the AI prompt. Neutral grays (`gray-100`–`900`) carry text and borders. Green/red are reserved strictly for positive/negative status — never decorative. A `dark.css` override scope (`.salt-theme[data-mode="dark"]`) exists but this system targets light mode only.
- **Type:** Public Sans stands in for Fusion's real display face ("Sons", proprietary, unavailable — see Fonts). Open Sans is Salt's body face; PT Mono is used for account numbers, codes and tabular figures. Headings are semibold, body is regular, action text (buttons) is semibold. No italics, no display serifs except the hero/marketing headline role (Source Serif 4).
- **Density:** Low density only (`salt-density-low`) — no medium/high/touch variants.
- **Spacing:** 8px base unit (`--salt-spacing-100: 16px` is 2 units); scale runs 4/8/12/16/24/32/40/48/64/80/96, independent of density. Internal card padding is typically 16–24px.
- **Corners:** Rounded, not sharp — radius scale 4/8/10/14/18/24px, plus a 999px "pill" for badges/pills/avatars. A softer 24px "soft" radius is used for hero surfaces (OmniInput, chat composer, suggestion cards).
- **Shadows:** Very low elevation. Cards sit nearly flat (`shadow-lowest`, 1px/3px blur, 10% opacity) at rest and step up only slightly on hover (`shadow-low`). No glows, no colored shadows.
- **Borders:** 1px hairlines in `gray-200` are the default separator — favor subtle separation over heavy lines and boxes.
- **Backgrounds:** Flat solid fills only. No photography, no illustration, no texture/grain, no blur/glass. The one exception is the animated "wave" flow-line field (`fusionWave.js`, see the Wave banner brand card) used behind hero/empty-state moments — thin accent-blue gradient strokes that drift on an SVG path animation. This is the system's single decorative motif; everywhere else is flat.
- **Animation:** Minimal and functional — short (150–200ms) ease-in-out fades/slides for menus, dialogs and overlays opening/closing. The wave field and OmniInput's animated typewriter placeholder are the only continuous/looping motion. Nothing bounces; no parallax or decorative motion elsewhere.
- **Hover / press states:** Hover darkens (solid buttons) or tints backward toward a "weakest" accent tone (bordered/transparent buttons and pills); press goes one step further (`active` tokens are always slightly stronger than `hover`). No scale/shrink on press.
- **Focus:** A visible 2px accent (blue) outline, offset 1px — always present, never suppressed.
- **Transparency/blur:** Not used, except the wave field's low-opacity gradient strokes and the overlay backdrop (`--salt-overlayable-backdrop`, 50% black) behind Dialog/Drawer.
- **Imagery color vibe:** No photography is used at all in this system — flat color and line-icon illustration only. If product photography is introduced, keep it cool/neutral-toned to match the blue-gray palette, not warm.
- **Data figures:** Right-aligned, tabular, colored green/red only for gain/loss — never for arbitrary emphasis.
- **Cards:** `saltCard` — 1px `gray-200` border, `shadow-lowest` at rest, radius `curve-150`/`corner`, 16–24px padding. `ContentCard` is the one unified card skeleton for the whole platform (media banner or icon tile → eyebrow → title → description → footer) — category sets color, one icon per asset, one action style. Don't invent a second card anatomy.

## Iconography

Icons are copied directly from `@salt-ds/icons` (`packages/icons/src/components/*.tsx` in salt-ds) — single-weight, geometric, monochrome glyphs on a `0 0 12 12` grid, fill-based paths rendered with `fill="currentColor"` so they inherit text color. Both an outline and a "Solid" variant exist for status glyphs (success/error/warning/info). ~548 glyphs total upstream; 49 most-used for data/AI platforms (navigation, charts, actions, status, data/UI, user/org) are included locally in `icons/*.svg`. Copy any additional glyph straight from `packages/icons/src/components/` following the same path data.

No emoji, no unicode-as-icon, no photographic icons. `ContentCard` icons in the UI kit (AI Studio, Data Mesh, etc.) are hand-drawn 24×24 stroke icons in the same spirit — outline, geometric, `currentColor` — for concepts the 12×12 fill set doesn't cover; prefer the real `icons/` set first.

## Fonts

- **Body:** Salt's **Open Sans**, used as-is (real, open-source webfont, included here).
- **Display/heading:** Fusion's real display face is called **"Sons"** (`--jpmc-typography-fontFamily-sons`), a proprietary JPMC typeface not published anywhere this project could access. **Public Sans** (Google Fonts, open-source, similar geometric-grotesque proportions) is substituted for all heading/display/hero roles. **Flagged substitution — if you get the real Sons webfont files, swap the `src` in `tokens/fonts.css` and repoint `--salt-typography-fontFamily-display`; no other token needs to change.**
- **Serif/hero:** Source Serif 4 stands in for the serif display face seen in Fusion portal hero headlines (e.g. "Discover the firm's data and AI capabilities"); the real typeface wasn't available. Also flagged.
- **Mono:** PT Mono, Salt's real choice, used as-is.

## Logo

`assets/logo.svg` — the Fusion wordmark, a single lockup, dark navy (`#101820`) on transparent. No icon mark exists separately from the wordmark. Invert to white via CSS filter on dark surfaces (see the Logo brand card). This is the only logo asset available — do not draw a new mark or icon lockup.

## Components

Location: `components/<group>/<Name>.jsx` + `.d.ts` + `.prompt.md`. 61 components across 7 groups, covering the major Salt DS families used across the Fusion surfaces:

- **Actions** — `Button`, `IconButton`, `Link`, `Pill`
- **Layout** — `FlexLayout`, `FlowLayout`, `StackLayout`, `GridLayout`, `SaltProviderNext`
- **Feedback** — `Badge`, `Banner`, `Spinner`, `ProgressBar`, `StatusIndicator`, `Toast`, `LoadingState`, `EmptyState`
- **Forms** — `Input`, `MultilineInput`, `Checkbox`, `FormField`, `RadioButton`, `Switch`, `Textarea`, `Dropdown`, `Slider`, `ToggleButtonGroup`, `SegmentedButtonGroup`, `OmniInput`
- **Display** — `Card`, `InteractableCard`, `ContentCard`, `Carousel`, `Panel`, `Text` (`H1`–`H4`), `Avatar`, `Divider`, `Tabs`, `Accordion`, `List`, `Tag`, `LinkCard`, `Table`/`TableHead`/`TableBody`/`TableRow`/`TableCell`, `Menu`
- **Navigation** — `Breadcrumbs`, `Stepper`, `NavigationItem`, `ProgressTracker`, `GlobalNav`, `AppHeader`
- **Overlays** — `Dialog`, `Drawer`, `Tooltip`

`Button`, `IconButton`, `Link`, `Pill`, `Card`, `Divider`, `Tabs`, `Switch`, `Checkbox`, `RadioButton`, `ToggleButtonGroup`, `Tag`, `Banner`, `StatusIndicator`, `Table`, `Menu` render using CSS classes copied **verbatim** from a real salt-ds CSS extraction (`salt-components.css`) — not approximated. The rest (`Input`, `Badge`, `Panel`, `FormField`, `Avatar`, `Accordion`, `List`, `LinkCard`, `Dropdown`, `Slider`, `Textarea`, `Spinner`, `ProgressBar`, `Breadcrumbs`, `Stepper`, `Dialog`, `Drawer`, `Tooltip`, `OmniInput`, `ContentCard`, `Carousel`) are hand-authored the same token-driven way, since no verbatim source was available for them. A few Salt families with no counterpart yet (ComboBox, Popover, DatePicker, FileDropZone, Tree, Toolbar) can be added on request.

### Intentional additions
`FlexLayout`, `FlowLayout`, `StackLayout`, `GridLayout`, `Text`/`H1`–`H4`, and `SaltProviderNext` mirror Salt DS's real layout, typography and theme-provider primitives. `IconButton` is a thin composition of `Button`. `ProgressTracker` is a vertical wizard rail for multi-step forms. `ContentCard` and `Carousel` are Fusion-specific: the unified card skeleton and paged shelf used to compose product tiles, catalog results, and feature promos across the platform. `OmniInput` is the platform's signature conversational entry point.

## UI kit

`ui_kits/fusion-platform/` — an interactive click-through recreation of the Fusion portal composed entirely from the components above:

- **Home** — global nav, hero `OmniInput`, capability tiles (`ContentCard` media variant), a `Carousel` of guides, and a recently-viewed rail.
- **Catalog** — breadcrumbs, category filter (`ToggleButtonGroup`) and sort (`Dropdown`), a grid of `ContentCard` results with `Tag` metadata, and a governed-datasets `Table`.

Click "Catalog" in the nav to move between screens. This is a cosmetic recreation for prototyping, not production code.

## Index

- `styles.css` — link this for tokens (colors, type, spacing, effects, fonts). `salt-components.css` must be linked **alongside** it on any page using the verbatim-CSS components (every specimen card does).
- `tokens/` — `colors.css`, `dark.css` (dark-mode overrides, unused by this light-only system), `typography.css`, `spacing.css`, `effects.css` (radius/shadow/motion), `fonts.css`, `base.css`, `salt-support.css`
- `assets/` — `logo.svg`
- `icons/` — 49 glyph `.svg` files, verbatim `@salt-ds/icons` path data
- `components/actions/`, `components/layout/`, `components/feedback/`, `components/forms/`, `components/display/`, `components/navigation/`, `components/overlays/` — see Components above; each directory also holds its `@dsCard`-tagged specimen HTML
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand groups in the Design System tab)
- `ui_kits/fusion-platform/` — the Home/Catalog click-through recreation
- `SKILL.md` — Claude Code-compatible skill definition for this design system
