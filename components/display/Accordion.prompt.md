Accordion progressively discloses secondary content — FAQs, advanced settings, long detail sections.

```jsx
<Accordion items={[{ title: "Governance", content: "..." }, { title: "Use case assets", content: "..." }]} />
```

Common content patterns for `content` (compose from existing components — no new component needed):
- **Simple list** — a plain `<ul>`/`<ol>`.
- **Static list with descriptions + optional metadata tags** — a stack of title + description rows, each with optional trailing `Tag`(s).
- **Nested accordions, collapsed by default** — put another `<Accordion defaultOpen={-1} items={...} />` as the `content`; indentation and borders compose cleanly.
- **Source list** — a stack of `Link` (anchor) + description rows, each with optional trailing `Tag`(s).

See `accordion.card.html` for all four side by side.
