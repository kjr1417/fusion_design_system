import React, { useState, useRef, useCallback, useEffect } from "react";

const CloseIcon = () => (<svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true"><path d="M6 6.707 9.146 9.85l.707-.707L6.707 6l3.146-3.146-.707-.707L6 5.293 2.854 2.147l-.707.707L5.293 6l-3.146 3.146.707.707z"/></svg>);

const GLYPHS = {
  add: "M6.5 5.5H11v1H6.5V11h-1V6.5H1v-1h4.5V1h1z",
  "arrow-up": "M5.5 12h1V1.915l3.146 3.147.707-.708L6 0 1.646 4.353l.708.707L5.5 1.914z",
  "panel-open-left_solid": "M12 12H0V0H12V12ZM1 11H4.00391V1H1V11ZM6.46875 3.87891L8.08984 5.5H5.00391V6.5H8.08984L6.46875 8.12109L7.17578 8.82812L10.0039 6L7.17578 3.17188L6.46875 3.87891Z",
  "panel-close-left": "M12 12H0V0H12V12ZM1 11H3V1H1V11ZM4 11H11V1H4V11ZM8.53516 3.87891L6.91406 5.5H10V6.5H6.91406L8.53516 8.12109L7.82812 8.82812L5 6L7.82812 3.17188L8.53516 3.87891Z",
};

function Glyph({ name, size = 12 }) {
  const spec = GLYPHS[name];
  if (!spec) return <span style={{ width: size, height: size, flexShrink: 0, display: "inline-block" }} />;
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, display: "block" }}>
      <path d={spec} />
    </svg>
  );
}

function PromptInputMock({ value, onChange, onSend, placeholder = "Message..." }) {
  const { IconButton, Dropdown } = window.FusionDesignSystem_6db751;
  const canSend = value.trim().length > 0;
  return (
    <div style={{ width: "100%", border: "1px solid var(--salt-separable-primary-borderColor)", borderRadius: "var(--salt-palette-corner-soft, 24px)", background: "var(--salt-container-primary-background)", boxShadow: "var(--salt-shadow-lowest)", display: "flex", flexDirection: "column", padding: "var(--salt-spacing-100)", boxSizing: "border-box" }}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (canSend) onSend(); } }}
        placeholder={placeholder}
        rows={2}
        style={{ resize: "none", border: "none", outline: "none", background: "transparent", fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)", color: "var(--salt-content-primary-foreground)", padding: "var(--salt-spacing-50) var(--salt-spacing-50) 0" }}
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--salt-spacing-50) var(--salt-spacing-50) 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)" }}>
          <IconButton aria-label="Add attachment" appearance="transparent" sentiment="neutral"><Glyph name="add" size={16} /></IconButton>
          <Dropdown options={["GPT-5", "Claude", "Gemini"]} defaultValue="Claude" chevronPadding={20} style={{ minWidth: 110, height: 28 }} />
          <Dropdown options={["v1.0", "v1.1", "v2.0"]} defaultValue="v2.0" chevronPadding={20} style={{ minWidth: 84, height: 28 }} />
        </div>
        <IconButton aria-label="Send message" appearance="solid" sentiment="accented" disabled={!canSend} onClick={onSend} style={{ borderRadius: "var(--salt-palette-corner-pill, 999px)" }}>
          <Glyph name="arrow-up" size={16} />
        </IconButton>
      </div>
    </div>
  );
}

function DefaultWelcome({ welcomeTitle, welcomeDescription, promptHelperText, swappableContent, onStart }) {
  const [value, setValue] = useState("");
  const send = () => { if (value.trim()) onStart(value); };
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "auto", display: "flex", flexDirection: "column", pointerEvents: "none", zIndex: 2 }}>
      <div style={{ flexBasis: "20%", flexShrink: 0 }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 var(--salt-spacing-200)", pointerEvents: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 700, minWidth: 400, boxSizing: "border-box" }}>
          <div style={{ fontFamily: "var(--salt-text-display2-fontFamily)", fontWeight: "var(--salt-text-display2-fontWeight)", fontSize: "var(--salt-text-display2-fontSize)", lineHeight: "var(--salt-text-display2-lineHeight)", color: "var(--salt-content-primary-foreground)", textAlign: "center" }}>{welcomeTitle}</div>
          {welcomeDescription && (
            <div style={{ marginTop: "var(--salt-spacing-100)", fontFamily: "var(--salt-text-h2-fontFamily)", fontWeight: "var(--salt-text-h2-fontWeight)", fontSize: "var(--salt-text-h2-fontSize)", lineHeight: "var(--salt-text-h2-lineHeight)", color: "var(--salt-content-secondary-foreground)", textAlign: "center" }}>{welcomeDescription}</div>
          )}
          <div style={{ marginTop: "var(--salt-spacing-800)", width: "100%" }}>
            <PromptInputMock value={value} onChange={setValue} onSend={send} />
          </div>
          {promptHelperText && (
            <div style={{ marginTop: "var(--salt-spacing-100)", width: "100%", fontFamily: "var(--salt-text-label-fontFamily)", fontStyle: "italic", fontSize: "var(--salt-text-label-fontSize)", lineHeight: "var(--salt-text-label-lineHeight)", color: "var(--salt-content-secondary-foreground)", textAlign: "center" }}>{promptHelperText}</div>
          )}
        </div>
        {swappableContent && (
          <div style={{ marginTop: "var(--salt-spacing-950)", width: "100%", maxWidth: 1280, minWidth: 980, boxSizing: "border-box" }}>{swappableContent}</div>
        )}
      </div>
    </div>
  );
}

function DefaultConversation({ chatTitle, firstMessage }) {
  const [value, setValue] = useState("");
  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ height: 44, flexShrink: 0, display: "flex", alignItems: "center", padding: "0 var(--salt-spacing-200)", borderBottom: "1px solid var(--salt-separable-secondary-borderColor)", fontSize: 15, fontWeight: 700 }}>{chatTitle || "New conversation"}</div>
      <div style={{ flex: 1, minHeight: 0, overflow: "auto", padding: "var(--salt-spacing-200) var(--salt-spacing-200) 0" }}>
        {firstMessage && (
          <div style={{ maxWidth: 700, marginLeft: "auto", padding: "var(--salt-spacing-75) var(--salt-spacing-100)", borderRadius: "var(--salt-curve-200)", background: "var(--salt-palette-background-secondary)", fontSize: 14 }}>{firstMessage}</div>
        )}
      </div>
      <div style={{ padding: "0 var(--salt-spacing-200) var(--salt-spacing-200)", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 700, minWidth: 400 }}>
          <PromptInputMock value={value} onChange={setValue} onSend={() => setValue("")} />
        </div>
      </div>
    </div>
  );
}

/**
 * Fusion ChatLayout — Studio chat shell: full-width GlobalNav, a
 * collapsible chat-history rail on the left (matching VerticalNavigation's
 * pattern: collapses to a 45px icon rail, defaults collapsed, flies out on
 * hover, and its footer holds the same toggle button/glyphs — panel-open
 * when collapsed, panel-close when expanded), a central chat experience,
 * a resizable + fully-closable file/HTML preview split panel on the right,
 * and the Footer.
 *
 * The central panel defaults to a welcome screen — positioned as a full
 * screen-width overlay (centered on the whole viewport width, in line with
 * GlobalNav's centered search bar, unaffected by the history rail's
 * expanded/collapsed width) with Display2 `welcomeTitle`,
 * spacing-100 gap, optional H2 `welcomeDescription`, spacing-800 gap, a
 * prompt-input mock with an attach button + model/version Dropdowns on the
 * left and a primary send button on the right, its `promptHelperText`
 * below it matching FormField's helper-text style, then a spacing-950 gap
 * before optional `swappableContent`) — welcome/prompt-input capped
 * 400–700px, swappable content 980–1280px, all centered, welcome block
 * starting 20% down the panel. Sending a prompt swaps the panel to a
 * conversation view (header, scrollable message area with spacing-200
 * side padding, sticky prompt input with spacing-200 beneath). Pass
 * `chatExperience` to fully replace either state with real content.
 * Requires FusionDesignSystem_6db751 (GlobalNav, Footer, IconButton,
 * Dropdown).
 */
export function ChatLayout({
  globalNavProps = {},
  historyOpen,
  defaultHistoryOpen = false,
  historyExpandOnHover = true,
  onHistoryOpenChange,
  historyWidth = 260,
  chatHistory,
  chatExperience,
  welcomeTitle = "Welcome Message",
  welcomeDescription,
  promptHelperText,
  swappableContent,
  chatTitle,
  previewOpen,
  defaultPreviewOpen = true,
  onPreviewOpenChange,
  previewMinWidth = 360,
  previewDefaultWidth = 480,
  previewMaxWidth = 720,
  previewHeader,
  previewContent,
  showFooter = true,
  footerProps = {},
}) {
  const { GlobalNav, Footer } = window.FusionDesignSystem_6db751;
  const [conversationStarted, setConversationStarted] = useState(false);
  const [firstMessage, setFirstMessage] = useState("");
  const [historyState, setHistoryState] = useState(defaultHistoryOpen);
  const [historyHovered, setHistoryHovered] = useState(false);
  const historyIsOpen = historyOpen !== undefined ? historyOpen : historyState;
  const setHistory = (v) => { setHistoryState(v); onHistoryOpenChange && onHistoryOpenChange(v); };
  const historyFlyout = historyExpandOnHover && !historyIsOpen && historyHovered;
  const historyExpanded = historyIsOpen || historyFlyout;

  const [previewState, setPreviewState] = useState(defaultPreviewOpen);
  const previewIsOpen = previewOpen !== undefined ? previewOpen : previewState;
  const setPreview = (v) => { setPreviewState(v); onPreviewOpenChange && onPreviewOpenChange(v); };

  const [previewWidth, setPreviewWidth] = useState(previewDefaultWidth);
  const dragRef = useRef(null);
  const onResizerDown = useCallback((e) => {
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startWidth: previewWidth };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [previewWidth]);
  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current) return;
      const delta = dragRef.current.startX - e.clientX;
      setPreviewWidth(Math.min(previewMaxWidth, Math.max(previewMinWidth, dragRef.current.startWidth + delta)));
    };
    const onUp = () => {
      if (!dragRef.current) return;
      dragRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  }, [previewMinWidth, previewMaxWidth]);

  return (
    <div className="salt-theme salt-density-low" style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "var(--salt-palette-background-secondary)", fontFamily: "var(--salt-text-fontFamily)", color: "var(--salt-content-primary-foreground)" }}>
      <GlobalNav {...globalNavProps} style={{ flexShrink: 0, ...(globalNavProps.style || {}) }} />
      <div style={{ flex: 1, display: "flex", minHeight: 0, position: "relative" }}>
        <div style={{ width: historyIsOpen ? historyWidth : 45, flexShrink: 0, position: "relative", height: "100%" }}>
          <div
            onMouseEnter={() => setHistoryHovered(true)}
            onMouseLeave={() => setHistoryHovered(false)}
            style={{
              position: historyFlyout ? "absolute" : "relative", top: 0, left: 0, bottom: 0,
              width: historyExpanded ? historyWidth : 45, height: "100%",
              display: "flex", flexDirection: "column",
              background: "var(--salt-palette-background-secondary)",
              borderRight: historyFlyout ? "none" : "1px solid var(--salt-separable-secondary-borderColor)",
              boxShadow: historyFlyout ? "var(--salt-shadow-low)" : "none",
              zIndex: historyFlyout ? 50 : 1,
              boxSizing: "border-box",
            }}
          >
            <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
              {historyExpanded ? (chatHistory || (
                <div style={{ padding: "var(--salt-spacing-200)", fontSize: 13, color: "var(--salt-content-secondary-foreground)" }}>Chat history — to be built.</div>
              )) : null}
            </div>
            <div style={{ borderTop: "1px solid var(--salt-separable-secondary-borderColor)", padding: historyExpanded ? "var(--salt-spacing-100) var(--salt-spacing-100) 0" : "var(--salt-spacing-100) 0 0", flexShrink: 0 }}>
              <button
                onClick={() => setHistory(!historyIsOpen)}
                aria-label={historyIsOpen ? "Collapse chat history" : "Expand chat history"}
                title={historyIsOpen ? "Collapse" : "Expand"}
                style={{
                  all: "unset", display: "flex", alignItems: "center", minHeight: 32, boxSizing: "border-box",
                  justifyContent: historyExpanded ? "flex-end" : "center",
                  padding: historyExpanded ? "0 var(--salt-spacing-100)" : 0,
                  margin: historyExpanded ? 0 : "0 6px",
                  borderRadius: "var(--salt-palette-corner-weaker)",
                  cursor: "pointer", color: "var(--salt-content-primary-foreground)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--salt-color-gray-100)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <Glyph name={historyIsOpen ? "panel-close-left" : "panel-open-left_solid"} size={16} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>
          {chatExperience || (conversationStarted
            ? <DefaultConversation chatTitle={chatTitle} firstMessage={firstMessage} />
            : null
          )}
        </div>
        {!chatExperience && !conversationStarted && (
          <DefaultWelcome welcomeTitle={welcomeTitle} welcomeDescription={welcomeDescription} promptHelperText={promptHelperText} swappableContent={swappableContent} onStart={(msg) => { setFirstMessage(msg); setConversationStarted(true); }} />
        )}

        {previewIsOpen && (
          <>
            <div
              onPointerDown={onResizerDown}
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize preview panel"
              style={{ width: 6, flexShrink: 0, cursor: "col-resize", position: "relative", background: "transparent" }}
            >
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "var(--salt-separable-secondary-borderColor)" }} />
            </div>
            <div style={{ width: previewWidth, minWidth: previewMinWidth, maxWidth: previewMaxWidth, flexShrink: 0, display: "flex", flexDirection: "column", minHeight: 0, background: "var(--salt-container-primary-background)", borderLeft: "1px solid var(--salt-separable-secondary-borderColor)" }}>
              <div style={{ height: 44, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 var(--salt-spacing-200)", borderBottom: "1px solid var(--salt-separable-secondary-borderColor)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{previewHeader || "Preview"}</div>
                <button aria-label="Close preview" onClick={() => setPreview(false)} style={{ width: 28, height: 28, flexShrink: 0, border: "none", background: "transparent", borderRadius: "var(--salt-curve-50)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--salt-content-secondary-foreground)" }}><CloseIcon /></button>
              </div>
              <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
                {previewContent || (
                  <div style={{ padding: "var(--salt-spacing-200)", fontSize: 13, color: "var(--salt-content-secondary-foreground)" }}>File/HTML preview — min width {previewMinWidth}px, drag the left edge to resize.</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {showFooter && <Footer {...footerProps} />}
    </div>
  );
}
