import React, { useState } from "react";
import { H4 } from "./Text.jsx";
import { IconButton } from "../actions/IconButton.jsx";

const CopyIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M4 0h4.707L11 2.293V9H8v3H1V3h3zm1 1v7h5V4H7V1zm3 0v2h2v-.293L8.293 1zM2 4h2v5h3v2H2z" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.952 9.294 10 3.73 8.9 2.706 4.875 7.163 3.027 5.446 2 6.546z" />
  </svg>
);
const ApiIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true">
    <path d="M0 5.98916L3 3L3.70711 3.70455L1.41421 5.98916L3.70711 8.28496L3 8.98951L0 5.98916Z" />
    <path d="M12 6.01154L8.9993 9L8.29202 8.29561L10.5855 6.01154L8.29202 3.71628L8.9993 3.01189L12 6.01154Z" />
    <path d="M6.95047 3.01123L4.00187 8.54394L4.89672 8.98953L7.84532 3.45683L6.95047 3.01123Z" />
  </svg>
);

// Fixed "One Light" palette — this theme is intentionally not affected by app/dark-mode tokens.
const ONE_LIGHT = { bg: "#fafafa", plain: "#383a42", comment: "#a0a1a7", keyword: "#a626a4", string: "#50a14f", number: "#986801", function: "#4078f2" };
const KEYWORD_RE = /^\b(function|return|const|let|var|if|else|for|while|import|export|from|class|new|extends|async|await|try|catch|finally|switch|case|break|continue|this|super|static|public|private|protected|void|null|undefined|true|false|def|elif|None|True|False|interface|type|enum|implements|throw|typeof|instanceof|in|of|yield|delete)\b/;

function tokenizeLine(text) {
  const tokens = [];
  let rest = text;
  while (rest.length) {
    let m;
    if ((m = rest.match(/^(\/\/.*|#.*)/))) { tokens.push({ t: m[0], c: "comment" }); rest = rest.slice(m[0].length); continue; }
    if ((m = rest.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/))) { tokens.push({ t: m[0], c: "string" }); rest = rest.slice(m[0].length); continue; }
    if ((m = rest.match(/^\b\d+(\.\d+)?\b/))) { tokens.push({ t: m[0], c: "number" }); rest = rest.slice(m[0].length); continue; }
    if ((m = rest.match(KEYWORD_RE))) { tokens.push({ t: m[0], c: "keyword" }); rest = rest.slice(m[0].length); continue; }
    if ((m = rest.match(/^[A-Za-z_$][A-Za-z0-9_$]*/))) {
      const isCall = /^\s*\(/.test(rest.slice(m[0].length));
      tokens.push({ t: m[0], c: isCall ? "function" : "plain" });
      rest = rest.slice(m[0].length);
      continue;
    }
    tokens.push({ t: rest[0], c: "plain" });
    rest = rest.slice(1);
  }
  return tokens;
}

function HighlightedLine({ text }) {
  return tokenizeLine(text).map((tok, i) => (
    <span key={i} style={{ color: ONE_LIGHT[tok.c] || ONE_LIGHT.plain, fontStyle: tok.c === "comment" ? "italic" : "normal" }}>{tok.t}</span>
  ));
}

const CODE_FONT = { fontFamily: "var(--salt-text-code-fontFamily)", fontSize: 13, lineHeight: "20px" };

/**
 * A code panel: optional title (H4, with an optional leading api-glyph icon)
 * or a language-derived fallback label, over syntax-highlighted code lines
 * (a fixed "One Light" palette, independent of app theme) with a persistent
 * Copy icon button in its own column so the code's horizontal scroll never
 * runs under it. Multi-line code shows line numbers; a single line hides
 * the title and line numbers and renders in plain content-primary-foreground
 * (no syntax theme). Pass `diffLines` instead of `code` for a diff view —
 * dual old/new line numbers, a +/- gutter mark, and a tinted row background
 * (status success/error) per line's "add"/"remove"/"context" kind.
 */
export function CodeBlock({ code, diffLines, language, title, showLineNumbers = true, size = "small", style }) {
  const [copied, setCopied] = useState(false);
  const isDiff = !!diffLines;
  const plainLines = isDiff ? null : String(code || "").split("\n");
  const isSingleLine = !isDiff && plainLines.length <= 1;
  const copyText = isDiff ? diffLines.filter((l) => l.kind !== "remove").map((l) => l.text).join("\n") : (code || "");

  const handleCopy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(copyText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const headerLabel = !isSingleLine ? (title || (language ? language.charAt(0).toUpperCase() + language.slice(1) : null)) : null;

  let oldNum = 1, newNum = 1;
  const diffRows = isDiff ? diffLines.map((l) => {
    const kind = l.kind || "context";
    const leftNum = kind === "add" ? null : oldNum++;
    const rightNum = kind === "remove" ? null : newNum++;
    const showRight = kind !== "context" || rightNum !== leftNum;
    return { kind, text: l.text, left: leftNum ?? "", right: showRight ? rightNum ?? "" : "" };
  }) : null;
  const maxHeight = size === "large" ? "var(--salt-codeblock-maxHeight-large)" : "var(--salt-codeblock-maxHeight-small)";

  return (
    <div style={{ borderRadius: "var(--salt-curve-200)", border: "1px solid var(--salt-color-background-titanium)", boxSizing: "border-box", padding: "var(--salt-spacing-200)", display: "flex", gap: "var(--salt-spacing-100)", background: ONE_LIGHT.bg, ...style }}>
      <div style={{ flex: "1 1 auto", minWidth: 0 }}>
        {headerLabel && (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", marginBottom: "var(--salt-spacing-200)" }}>
            {title && <span style={{ display: "flex", flexShrink: 0, color: "var(--salt-content-secondary-foreground)" }}><ApiIcon /></span>}
            <H4 style={{ margin: 0 }}>{headerLabel}</H4>
          </div>
        )}
        {isSingleLine ? (
          <div style={{ overflowX: "auto", paddingTop: "var(--salt-spacing-75)", paddingBottom: "var(--salt-spacing-75)" }}>
            <code style={{ ...CODE_FONT, color: "var(--salt-content-primary-foreground)", whiteSpace: "pre" }}>{code}</code>
          </div>
        ) : isDiff ? (
          <div style={{ overflowX: "auto", overflowY: "auto", maxHeight, paddingTop: "var(--salt-spacing-75)", paddingBottom: "var(--salt-spacing-75)", borderRadius: "var(--salt-curve-100)" }}>
            {diffRows.map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "baseline", background: r.kind === "add" ? "var(--salt-status-success-background)" : r.kind === "remove" ? "var(--salt-status-error-background)" : "transparent", ...CODE_FONT, whiteSpace: "pre" }}>
                <span style={{ width: 22, textAlign: "right", color: ONE_LIGHT.comment, userSelect: "none", flexShrink: 0 }}>{r.left}</span>
                <span style={{ width: 22, textAlign: "right", color: ONE_LIGHT.comment, userSelect: "none", flexShrink: 0, marginLeft: "var(--salt-spacing-100)" }}>{r.right}</span>
                <span style={{ width: 12, textAlign: "center", fontWeight: 700, flexShrink: 0, marginLeft: "var(--salt-spacing-100)", color: r.kind === "add" ? "var(--salt-status-success-borderColor)" : r.kind === "remove" ? "var(--salt-status-error-borderColor)" : "transparent" }}>{r.kind === "add" ? "+" : r.kind === "remove" ? "-" : ""}</span>
                <span style={{ marginLeft: "var(--salt-spacing-200)", paddingRight: "var(--salt-spacing-150)" }}><HighlightedLine text={r.text} /></span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ overflowX: "auto", overflowY: "auto", maxHeight, paddingTop: "var(--salt-spacing-75)", paddingBottom: "var(--salt-spacing-75)", borderRadius: "var(--salt-curve-100)" }}>
            {plainLines.map((line, i) => (
              <div key={i} style={{ display: "flex", ...CODE_FONT, whiteSpace: "pre" }}>
                {showLineNumbers && <span style={{ width: 26, textAlign: "right", color: ONE_LIGHT.comment, userSelect: "none", flexShrink: 0, marginRight: "var(--salt-spacing-100)" }}>{i + 1}</span>}
                <span style={{ paddingRight: "var(--salt-spacing-150)" }}><HighlightedLine text={line} /></span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>
        <IconButton
          aria-label="Copy code"
          title={copied ? "Copied" : "Copy code"}
          appearance="transparent"
          sentiment={copied ? "positive" : "neutral"}
          onClick={handleCopy}
          style={{ width: 28, height: 28 }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </IconButton>
      </div>
    </div>
  );
}
