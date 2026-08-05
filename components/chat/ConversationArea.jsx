import React, { useEffect, useRef } from "react";

const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.952 9.294 10 3.73 8.9 2.706 4.875 7.163 3.027 5.446 2 6.546z" />
  </svg>
);

/**
 * Fusion ConversationArea — the scrollable message list for a chat:
 * right-aligned user bubbles, plain left-aligned agent replies (name +
 * time meta line), status rows (spinner while pending, a check once
 * done), and a three-dot typing indicator. Autoscrolls to the latest
 * message. No header or composer of its own — pair with ChatHeader above
 * and PromptInput below inside ChatLayout's central panel.
 * Requires FusionDesignSystem_6db751 (Spinner) and ./ConversationArea.css
 * (typing-dot keyframes) loaded once per page.
 */
export function ConversationArea({ messages = [], emptyState, maxWidth = 700, style }) {
  const { Spinner } = window.FusionDesignSystem_6db751;
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "var(--salt-spacing-200)", fontFamily: "var(--salt-text-fontFamily)", ...style }}>
      <div style={{ maxWidth, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--salt-spacing-200)" }}>
        {messages.length === 0 && emptyState}
        {messages.map((m, i) => {
          if (m.role === "user") return (
            <div key={i} style={{ alignSelf: "flex-end", maxWidth: "82%", background: "var(--salt-palette-background-secondary)", borderRadius: "var(--salt-curve-200)", padding: "var(--salt-spacing-75) var(--salt-spacing-100)", fontSize: 14, lineHeight: 1.55 }}>{m.text}</div>
          );
          if (m.role === "agent") return (
            <div key={i} style={{ alignSelf: "stretch", fontSize: 14, lineHeight: 1.6 }}>
              <div style={{ fontSize: 12, color: "var(--salt-content-secondary-foreground)", marginBottom: "var(--salt-spacing-50)" }}>{m.name}{m.time ? ` · ${m.time}` : ""}</div>
              <div>{m.text}</div>
            </div>
          );
          if (m.role === "status") return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)", fontSize: 13, color: m.done ? "var(--salt-content-primary-foreground)" : "var(--salt-content-secondary-foreground)" }}>
              {!m.done && <Spinner size={14} />}
              {m.done && <span style={{ color: "var(--salt-color-green-600)", display: "inline-flex" }}><CheckIcon /></span>}
              <span>{m.text}</span>
            </div>
          );
          if (m.role === "typing") return (
            <div key={i} style={{ fontSize: 14 }}>
              <div style={{ fontSize: 12, color: "var(--salt-content-secondary-foreground)", marginBottom: "var(--salt-spacing-50)" }}>{m.name}</div>
              <div className="ca-typing"><span></span><span></span><span></span></div>
            </div>
          );
          return null;
        })}
      </div>
    </div>
  );
}
