import type { CSSProperties } from "react";

export type CodeDiffLineKind = "add" | "remove" | "context";
export interface CodeDiffLine {
  kind?: CodeDiffLineKind;
  text: string;
}

/**
 * A code panel: optional title (H4, with an optional leading api-glyph icon)
 * or a language-derived fallback label, over syntax-highlighted code lines
 * (a fixed "One Light" palette) with a Copy icon button in its own column.
 * Multi-line code shows line numbers; a single line hides the title and
 * line numbers, rendering in plain content-primary-foreground instead of
 * the syntax theme. Pass `diffLines` instead of `code` for a diff view —
 * dual old/new line numbers, a +/- gutter mark, and a status-success/error
 * tinted row background per line's kind.
 */
export interface CodeBlockProps {
  /** Plain code — ignored when `diffLines` is passed. A single line (no "\n") renders without a title, line numbers, or syntax highlighting. */
  code?: string;
  /** Renders a diff view instead of plain code. */
  diffLines?: CodeDiffLine[];
  /** Fallback header label when `title` isn't set, e.g. "tsx" → shown as "Tsx"; pass a display-ready value like "Python" directly for a clean label. */
  language?: string;
  /** Header title (H4) with a leading api-glyph icon; overrides the `language` fallback label. Hidden on single-line code. */
  title?: string;
  /** Multi-line code only (diff always shows dual numbers; single-line never shows numbers). Default true. */
  showLineNumbers?: boolean;
  /** Max height before the code region scrolls internally — "small" (400px, widget/card contexts) or "large" (700px, full conversation-area contexts). The block hugs shorter content and only applies the cap (and scroll) once content exceeds it. Default "small". */
  size?: "small" | "large";
  style?: CSSProperties;
}
export function CodeBlock(props: CodeBlockProps): JSX.Element;
