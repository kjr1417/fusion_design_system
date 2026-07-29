import React from "react";

/** Renders `text` with every case-insensitive occurrence of `query` wrapped in <strong>. */
export function HighlightMatch({ text, query }) {
  if (!query) return <React.Fragment>{text}</React.Fragment>;
  const q = query.trim();
  if (!q) return <React.Fragment>{text}</React.Fragment>;
  const str = String(text);
  const lower = str.toLowerCase();
  const needle = q.toLowerCase();
  const parts = [];
  let i = 0;
  while (i < str.length) {
    const idx = lower.indexOf(needle, i);
    if (idx === -1) { parts.push(str.slice(i)); break; }
    if (idx > i) parts.push(str.slice(i, idx));
    parts.push(<span key={idx} style={{ fontWeight: "var(--salt-text-fontWeight-strong)", background: "var(--salt-color-blue-100)", borderRadius: 2 }}>{str.slice(idx, idx + needle.length)}</span>);
    i = idx + needle.length;
  }
  return <React.Fragment>{parts}</React.Fragment>;
}
