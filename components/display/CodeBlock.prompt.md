CodeBlock is a code panel: an optional title (or language fallback) over syntax-highlighted lines (a fixed "One Light" palette), with a Copy icon button pinned in its own column so horizontal code scroll never runs under it. Use inside a ConversationArea agent response (`"code"` block type) or standalone.

```jsx
<CodeBlock title="Triage helper" language="tsx" code={`function add(a, b) {\n  return a + b;\n}`} />
```

No `title`? The language becomes the header label:

```jsx
<CodeBlock language="Python" code={`def add(a, b):\n    return a + b`} />
```

A single line (no title, no line numbers, plain content-primary-foreground text — no syntax theme):

```jsx
<CodeBlock code={`npm install fusion-design-system`} />
```

For a diff, pass `diffLines` instead of `code` — each line gets a kind ("add" | "remove" | "context"), dual old/new line numbers, a status-tinted row background, and a +/- gutter mark:

```jsx
<CodeBlock title="add.ts" diffLines={[
  { kind: "context", text: "function add(a, b) {" },
  { kind: "remove", text: "  return a - b;" },
  { kind: "add", text: "  return a + b;" },
  { kind: "context", text: "}" },
]} />
```

The Copy button copies plain code verbatim; in diff mode it copies the resulting file (context + add lines, skipping removed ones). Styling is inline, using spacing/status tokens — the "One Light" code palette itself is fixed (not theme-aware) so highlighted code reads the same in light and dark mode.

Long content scrolls internally instead of growing the page: `size="small"` (400px, the default — widget/card contexts) or `size="large"` (700px — a full conversation area). Shorter content just hugs its own height.

```jsx
<CodeBlock size="large" title="triage.ts" language="tsx" code={longFileString} />
```
