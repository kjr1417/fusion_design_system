ContentCard is the platform's **single card skeleton** — use it for every product tile, catalog result, feature promo, and registry entry so cards stay consistent as the platform scales. Don't hand-roll new card layouts; compose these slots.

Anatomy (all slots optional): `[media banner OR icon tile]` → `eyebrow` → `title` → `description` → divider → `footer`.

```jsx
// Feature promo — media banner
<ContentCard variant="media" accent="ai" icon={<RobotIcon />}
  title="AI Studio"
  description="Build, evaluate and deploy governed AI agents." />

// Product tile — icon tile + CTA
<ContentCard interactive accent="ai" icon={<SparkleIcon />} eyebrow="Model"
  title="Opus 4.8 now available"
  description="Approved for governed evaluation and deployment."
  cta={{ label: "Try Opus 4.8", href: "#" }} />

// Catalog result — inline icon + custom meta footer
<ContentCard interactive accent="ai" icon={<BrainIcon />} iconPlacement="inline"
  eyebrow="Model" title="bert-base-uncased" description="…"
  footer={<div className="metaRow"><ModelIcon /><strong>Google-Bert</strong></div>} />
```

The `category` prop sets the **color** (from the Domain categorical palette) and the eyebrow always renders in it. The **icon is per asset type** — pass `icon` explicitly so each asset reads distinctly (Model = brain, Skill = lightbulb, MCP Server = server, Glossary = book, Dataset = database, Use case = target, Eval = gauge, Agent = robot). The category's built-in glyph is only a fallback; don't let two different assets share one icon.

Actions use **one** pattern only: an ALL-CAPS transparent text link with a trailing arrow (via `cta`) — never a bordered button. Keep labels short and verb-only ("TRY", "OPEN", "VIEW"). Cards are built on `saltCard` / `saltInteractableCard`, so border, radius, shadow, hover, and focus are Salt's. Use the `footer` slot for richer rows (meta, stats) and place the same text-link action inside it; stop propagation on that link when the card itself is `interactive`.
