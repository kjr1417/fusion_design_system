import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChatIcon } from "./chatIcons.jsx";

const ToolbarChevron = () => (<svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M5.618 8.593 6 9l.382-.407L11 3.661 10.236 3 6 7.524 1.764 3 1 3.66z"></path></svg>);

function ToolbarDropdown({ options = [], defaultValue, onChange, minWidth }) {
  const { Menu } = window.FusionDesignSystem_6db751;
  const normalized = options.map((o) => (typeof o === "string" ? { label: o, value: o } : o));
  const [value, setValue] = useState(defaultValue !== undefined ? defaultValue : (normalized[0] && normalized[0].value));
  const selected = normalized.find((o) => o.value === value);
  return (
    <Menu
      trigger={<span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: "var(--salt-spacing-50)" }}><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selected ? selected.label : "Select…"}</span><ToolbarChevron /></span>}
      triggerAppearance="bordered"
      triggerProps={{ style: { height: 28, minWidth: minWidth || 100, justifyContent: "space-between", fontSize: "var(--salt-text-fontSize)", fontWeight: "var(--salt-text-fontWeight)" } }}
      items={normalized.map((o) => o.label)}
      onSelect={(label) => {
        const opt = normalized.find((o) => o.label === label);
        if (!opt) return;
        setValue(opt.value);
        onChange && onChange(opt.value);
      }}
    />
  );
}

// Placeholder command sets — implementing teams define the real "/" command
// catalog and "@" mention contexts (people, agents, docs, etc.).
const SLASH_COMMANDS = ["summarize", "explain", "translate", "rewrite", "brainstorm"];
const MENTION_ITEMS = ["teammate", "agent", "document", "channel"];

// Renders `value` as text/bold-token pieces for the styled backdrop —
// any "/word" or "@word" bounded by whitespace/start/end renders in a
// slightly stronger font, mirroring the real (invisible-text) textarea
// on top so the two stay pixel-aligned.
function tokenizePieces(text) {
  const pieces = [];
  const re = /(^|\s)([/@]\S+)/g;
  let lastIndex = 0;
  let m;
  while ((m = re.exec(text))) {
    const boundary = m[1];
    const token = m[2];
    const tokenStart = m.index + boundary.length;
    if (tokenStart > lastIndex) pieces.push({ text: text.slice(lastIndex, tokenStart) });
    pieces.push({ text: token, isToken: true });
    lastIndex = tokenStart + token.length;
  }
  if (lastIndex < text.length) pieces.push({ text: text.slice(lastIndex) });
  return pieces;
}

// Standard mirror-div technique for locating a textarea caret's pixel
// position (so the "/" and "@" popups can anchor right under the caret,
// anywhere in the message — not just at the start).
function getCaretCoords(textarea, position) {
  const div = document.createElement("div");
  const style = window.getComputedStyle(textarea);
  ["boxSizing", "width", "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"].forEach((p) => { div.style[p] = style[p]; });
  div.style.position = "absolute";
  div.style.visibility = "hidden";
  div.style.whiteSpace = "pre-wrap";
  div.style.wordWrap = "break-word";
  div.style.top = "0";
  div.style.left = "-9999px";
  document.body.appendChild(div);
  div.textContent = textarea.value.substring(0, position);
  const span = document.createElement("span");
  span.textContent = textarea.value.substring(position) || ".";
  div.appendChild(span);
  const coords = { top: span.offsetTop, left: span.offsetLeft, height: parseInt(style.lineHeight, 10) || 20 };
  document.body.removeChild(div);
  return coords;
}

// Finds an in-progress "/query" or "@query" run ending exactly at `caret`
// (must start at text-start or after whitespace, and contain no
// whitespace itself yet — once a space lands, it's no longer "active").
function findActiveTrigger(text, caret) {
  const m = /(?:^|\s)([/@])(\S*)$/.exec(text.slice(0, caret));
  if (!m) return null;
  const triggerChar = m[1];
  const query = m[2];
  const start = caret - query.length - 1;
  return { triggerChar, query, start };
}

function TriggerMenu({ items, onPick, style }) {
  if (!items.length) return null;
  return (
    <div className="saltMenuPanel" role="menu" style={{ position: "absolute", zIndex: 20, ...style }}>
      <div className="saltMenuPanel-container">
        {items.map((item) => (
          <div key={item} className="saltMenuItem" role="menuitem" tabIndex={0} onMouseDown={(e) => { e.preventDefault(); onPick(item); }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Fusion PromptInput — the chat composer: an optional "Scroll to
 * Latest" button, an optional Test Mode wrapper, an optional status
 * banner, an optional queued-messages accordion drawer, an optional
 * AttachmentTileGroup staging row, an auto-height textarea (grows from
 * 3 lines up to 7 before scrolling internally), and a control row (an
 * "Attach" add-icon menu with "Attach documents" — opens the browser
 * file picker, wired to `onFilesDropped` — and "Attach Knowledge
 * Bases", up to two Dropdowns for e.g. model/version, a Clear button
 * once there's text, and an accented pill send button). Optional
 * helper text below it, styled like FormField's helper text. Pairs
 * with ChatHeader and ConversationArea inside ChatLayout's central
 * panel.
 *
 * Typing "/" anywhere in the message opens an inline Fusion menu of
 * slash commands (placeholder catalog — implementing teams define the
 * real list); "@" opens the same mechanic for mentions (contexts TBD
 * by implementing teams). Users can click an item or keep typing their
 * own text. Either way, once finished — item picked, or Space pressed
 * — the "/word"/"@word" renders in a slightly stronger font, and a
 * single Backspace right after it deletes the whole token at once
 * rather than one character at a time.
 *
 * Send enables once there's text OR at least one attachment (not
 * necessarily both). The composer shows a dotted accent border while
 * focused. The send button disables (with an explanatory title) while
 * any attachment's `loading` is true. Pass `sending` to swap it for a
 * "Stop" (pause icon) button wired to `onCancel`, for cancelling an
 * in-flight response.
 *
 * Pass `banner` (`{ status: "error" | "warning" | "info", message,
 * onDismiss }`) to show a dismissible status banner above the queue/
 * composer. Pass `scrollToLatest` (with `onScrollToLatest`) to show a
 * centered "Scroll to Latest" button above everything else.
 *
 * Pass `testMode` to wrap everything except the Scroll-to-Latest
 * button in a 2px gradient-bordered container (visually distinct from
 * the normal composer) with a full-width info banner — tinted with
 * the same gradient at 25% opacity — flush across its top, above even
 * an error `banner`, since that error happened inside the test
 * session. Pair with `onExitTestMode` to show an "Exit Test" button
 * in it.
 *
 * Dragging files over the composer (or setting `dragOver` to force it
 * for documentation) shows a blue scrim reading "Drop files here" with
 * a max-files description; dropping, or choosing "Attach documents"
 * from the Attach menu, calls `onFilesDropped`.
 *
 * Pass `overlay` (typically a `<PromptInputPlanCard>`) to replace the
 * textarea/control box with an agent plan or clarifying-questions card
 * while attachments/queue/helper text stay in place around it.
 *
 * Requires FusionDesignSystem_6db751 (IconButton, Button, Menu,
 * AttachmentTileGroup, Accordion). Uses the verbatim `.saltMenuPanel`/
 * `.saltMenuItem` classes for the inline "/"/"@" trigger popup.
 */
export function PromptInput({
  value = "",
  onChange,
  onSend,
  onAttachDocuments,
  onAttachKnowledgeBases,
  placeholder = "Message...",
  attachments = [],
  onRemoveAttachment,
  dropdowns = [],
  helperText,
  disabled = false,
  maxFiles = 5,
  onFilesDropped,
  dragOver,
  queuedMessages = [],
  onRemoveQueuedMessage,
  onQueuedMessageClick,
  overlay,
  banner,
  sending = false,
  onCancel,
  scrollToLatest = false,
  onScrollToLatest,
  testMode = false,
  testModeMessage = "Test Mode — try prompts against your agent without affecting the live conversation.",
  onExitTestMode,
  slashCommands = SLASH_COMMANDS,
  mentionItems = MENTION_ITEMS,
  style,
}) {
  const { IconButton, Button, AttachmentTileGroup, Accordion, Menu } = window.FusionDesignSystem_6db751;
  const hasText = value.trim().length > 0;
  const anyUploading = attachments.some((a) => a && a.loading);
  const canSend = !disabled && !sending && (hasText || attachments.length > 0) && !anyUploading;
  const [dragCount, setDragCount] = useState(0);
  const [focused, setFocused] = useState(false);
  const isDragOver = dragOver !== undefined ? dragOver : dragCount > 0;
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const backdropRef = useRef(null);
  const [trigger, setTrigger] = useState(null);
  const [caretCoords, setCaretCoords] = useState(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [value]);

  const refreshTrigger = useCallback((text, caret) => {
    const active = findActiveTrigger(text, caret);
    setTrigger(active);
    if (active && textareaRef.current) {
      setCaretCoords(getCaretCoords(textareaRef.current, caret));
    }
  }, []);

  const dragHandlers = onFilesDropped || dragOver === undefined ? {
    onDragEnter: (e) => { e.preventDefault(); setDragCount((c) => c + 1); },
    onDragOver: (e) => { e.preventDefault(); },
    onDragLeave: (e) => { e.preventDefault(); setDragCount((c) => Math.max(0, c - 1)); },
    onDrop: (e) => { e.preventDefault(); setDragCount(0); onFilesDropped && onFilesDropped(e.dataTransfer.files); },
  } : {};

  const items = trigger ? (trigger.triggerChar === "/" ? slashCommands : mentionItems).filter((i) => i.toLowerCase().startsWith(trigger.query.toLowerCase())) : [];

  const pickItem = (item) => {
    if (!trigger || !textareaRef.current) return;
    const insertion = `${trigger.triggerChar}${item} `;
    const newValue = value.slice(0, trigger.start) + insertion + value.slice(trigger.start + trigger.query.length + 1);
    const newCaret = trigger.start + insertion.length;
    onChange && onChange(newValue);
    setTrigger(null);
    requestAnimationFrame(() => {
      if (!textareaRef.current) return;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(newCaret, newCaret);
    });
  };

  const handleKeyDown = (e) => {
    if (trigger && items.length && e.key === "Enter") { e.preventDefault(); pickItem(items[0]); return; }
    if (trigger && e.key === "Escape") { e.preventDefault(); setTrigger(null); return; }
    if (e.key === "Backspace" && textareaRef.current && textareaRef.current.selectionStart === textareaRef.current.selectionEnd) {
      const caret = textareaRef.current.selectionStart;
      const m = /(?:^|\s)([/@]\S+)$/.exec(value.slice(0, caret));
      if (m) {
        e.preventDefault();
        const tokenStart = caret - m[1].length;
        const newValue = value.slice(0, tokenStart) + value.slice(caret);
        onChange && onChange(newValue);
        requestAnimationFrame(() => {
          if (!textareaRef.current) return;
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(tokenStart, tokenStart);
        });
        return;
      }
    }
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (canSend) onSend && onSend(); }
  };

  const backdropPieces = tokenizePieces(value + (value.endsWith("\n") ? " " : ""));

  const content = (
    <>
      {banner && (
        <div className={`saltBanner saltBanner-${banner.status || "error"} saltBanner-secondary`} role="status" style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", marginBottom: 4 }}>
          <svg viewBox="0 0 12 12" width="16" height="16" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, color: `var(--salt-status-${banner.status || "error"}-foreground-decorative)` }}>
            <path fillRule="evenodd" clipRule="evenodd" d={banner.status === "warning" ? "m6 0 6 12H0zM5 5h2v3H5zm2 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" : banner.status === "info" ? "M0 0h12v12H0zm6 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2m1 3v5H5V5z" : "M9 0H3L0 3v6l3 3h6l3-3V3zM7 2H5v5h2zm-1 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2"} />
          </svg>
          <span className="saltBannerContent">{banner.message}</span>
          {banner.onDismiss && (
            <IconButton aria-label="Dismiss" appearance="transparent" sentiment="neutral" onClick={banner.onDismiss} style={{ flexShrink: 0 }}>
              <ChatIcon name="close" size={12} />
            </IconButton>
          )}
        </div>
      )}

      {queuedMessages.length > 0 && (
        <Accordion
          variant="boxed"
          chevronPosition="end"
          defaultOpen={-1}
          style={{ marginBottom: 4, border: "1px solid var(--salt-separable-primary-borderColor)", borderRadius: "var(--salt-palette-corner-soft, 24px)", overflow: "hidden" }}
          items={[{
            title: `Queued messages (${queuedMessages.length})`,
            content: (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-75)" }}>
                {queuedMessages.map((m, i) => (
                  <div
                    key={m.id || i}
                    onClick={onQueuedMessageClick ? () => onQueuedMessageClick(m.id, i) : undefined}
                    style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", cursor: onQueuedMessageClick ? "pointer" : "default", borderRadius: "var(--salt-palette-corner-weak)" }}
                  >
                    <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: "var(--salt-text-fontWeight-strong)", background: "var(--salt-color-gray-200)", color: "var(--salt-content-secondary-foreground)" }}>{i + 1}</span>
                    <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "var(--salt-text-fontSize)", color: "var(--salt-content-primary-foreground)" }}>{m.text}</span>
                    {onRemoveQueuedMessage && (
                      <IconButton aria-label="Remove queued message" appearance="transparent" sentiment="neutral" onClick={(e) => { e.stopPropagation(); onRemoveQueuedMessage(m.id, i); }} style={{ flexShrink: 0 }}>
                        <ChatIcon name="close" size={12} />
                      </IconButton>
                    )}
                  </div>
                ))}
              </div>
            ),
          }]}
        />
      )}

      <div
        {...dragHandlers}
        style={{ position: "relative", border: focused ? "1px dotted var(--salt-palette-accent)" : "1px solid var(--salt-separable-primary-borderColor)", borderRadius: "var(--salt-palette-corner-soft, 24px)", background: "var(--salt-container-primary-background)", boxShadow: "var(--salt-shadow-lowest)", display: "flex", flexDirection: "column", padding: "var(--salt-spacing-100)", boxSizing: "border-box" }}
      >
        {isDragOver && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 3, borderRadius: "var(--salt-palette-corner-soft, 24px)",
            background: "color-mix(in srgb, var(--salt-palette-accent) 12%, var(--salt-container-primary-background) 88%)",
            border: "2px solid var(--salt-palette-accent)", boxSizing: "border-box",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "var(--salt-spacing-25)", padding: "var(--salt-spacing-150)",
            pointerEvents: "none",
          }}>
            <div style={{ fontSize: "var(--salt-text-fontSize)", fontWeight: "var(--salt-text-fontWeight-strong, 700)", color: "var(--salt-palette-accent-strong)" }}>Drop files here</div>
            <div style={{ fontSize: "var(--salt-text-label-fontSize)", color: "var(--salt-content-secondary-foreground)" }}>File drop description goes here. {maxFiles} files max.</div>
          </div>
        )}

        {overlay ? overlay : (
          <>
            {attachments.length > 0 && (
              <div style={{ padding: "0 var(--salt-spacing-50)", marginBottom: "var(--salt-spacing-100)" }}>
                <AttachmentTileGroup items={attachments} onRemove={onRemoveAttachment} />
              </div>
            )}
            <div style={{ position: "relative" }}>
              <div
                ref={backdropRef}
                aria-hidden="true"
                style={{ position: "absolute", inset: 0, overflow: "hidden", whiteSpace: "pre-wrap", wordWrap: "break-word", fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)", lineHeight: "20px", padding: "var(--salt-spacing-50) var(--salt-spacing-50) 0", boxSizing: "border-box", pointerEvents: "none", color: "var(--salt-content-primary-foreground)" }}
              >
                {value ? backdropPieces.map((p, i) => (
                  <span key={i} style={p.isToken ? { fontWeight: "var(--salt-text-fontWeight-strong, 700)" } : undefined}>{p.text}</span>
                )) : null}
              </div>
              <textarea
                ref={textareaRef}
                value={value}
                disabled={disabled}
                onChange={(e) => {
                  onChange && onChange(e.target.value);
                  refreshTrigger(e.target.value, e.target.selectionStart);
                }}
                onKeyUp={(e) => {
                  if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) refreshTrigger(e.target.value, e.target.selectionStart);
                }}
                onClick={(e) => refreshTrigger(e.target.value, e.target.selectionStart)}
                onKeyDown={handleKeyDown}
                onScroll={(e) => { if (backdropRef.current) backdropRef.current.scrollTop = e.target.scrollTop; }}
                onFocus={() => setFocused(true)}
                onBlur={() => { setFocused(false); setTrigger(null); }}
                placeholder={placeholder}
                rows={3}
                style={{ position: "relative", resize: "none", border: "none", outline: "none", background: "transparent", color: "transparent", caretColor: "var(--salt-content-primary-foreground)", fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)", lineHeight: "20px", padding: "var(--salt-spacing-50) var(--salt-spacing-50) 0", boxSizing: "border-box", minHeight: "60px", maxHeight: "140px", overflowY: "auto", width: "100%", display: "block" }}
              />
              {trigger && items.length > 0 && caretCoords && (
                <TriggerMenu
                  items={items}
                  onPick={pickItem}
                  style={{ top: caretCoords.top + caretCoords.height + 2, left: Math.min(caretCoords.left, 240) }}
                />
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--salt-spacing-50) var(--salt-spacing-50) 0", pointerEvents: isDragOver ? "none" : "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)" }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => { if (e.target.files && e.target.files.length) onFilesDropped && onFilesDropped(e.target.files); e.target.value = ""; }}
                />
                <Menu
                  trigger={<ChatIcon name="add" size={16} />}
                  triggerAppearance="transparent"
                  triggerProps={{ "aria-label": "Attach", title: "Attach", style: { width: "var(--salt-size-base)", height: "var(--salt-size-base)", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" } }}
                  items={["Attach documents", "Attach Knowledge Bases"]}
                  onSelect={(item) => {
                    if (item === "Attach documents") { onAttachDocuments && onAttachDocuments(); fileInputRef.current && fileInputRef.current.click(); }
                    else if (item === "Attach Knowledge Bases") { onAttachKnowledgeBases && onAttachKnowledgeBases(); }
                  }}
                />
                {dropdowns.map((d, i) => (
                  <ToolbarDropdown key={i} options={d.options} defaultValue={d.defaultValue} onChange={d.onChange} minWidth={d.minWidth} />
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)" }}>
                {!sending && hasText && (
                  <IconButton aria-label="Clear message" appearance="transparent" sentiment="neutral" onClick={() => onChange && onChange("")}>
                    <ChatIcon name="close" size={12} />
                  </IconButton>
                )}
                {sending ? (
                  <IconButton aria-label="Stop" appearance="solid" sentiment="accented" onClick={onCancel} style={{ borderRadius: "var(--salt-palette-corner-pill, 999px)" }}>
                    <ChatIcon name="pause" size={16} />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="Send message"
                    appearance="solid"
                    sentiment="accented"
                    disabled={!canSend}
                    title={anyUploading ? "Please wait until all files finish uploading before sending your message." : undefined}
                    onClick={onSend}
                    style={{ borderRadius: "var(--salt-palette-corner-pill, 999px)" }}
                  >
                    <ChatIcon name="arrow-up" size={16} />
                  </IconButton>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {helperText && (
        <div style={{ marginTop: "var(--salt-spacing-100)", fontFamily: "var(--salt-text-label-fontFamily)", fontStyle: "italic", fontSize: "var(--salt-text-label-fontSize)", lineHeight: "var(--salt-text-label-lineHeight)", color: "var(--salt-content-secondary-foreground)", textAlign: "center" }}>{helperText}</div>
      )}
    </>
  );

  return (
    <div style={{ width: "100%", ...style }}>
      {scrollToLatest && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
          <Button appearance="bordered" sentiment="neutral" onClick={onScrollToLatest} style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-50)", borderRadius: "var(--salt-palette-corner-pill, 999px)" }}>
            <ChatIcon name="arrow-down" size={12} />
            Scroll to Latest
          </Button>
        </div>
      )}
      {testMode ? (
        <div style={{ width: "calc(100% + 12px)", margin: "0 -6px", padding: 2, borderRadius: "calc(var(--salt-palette-corner-soft, 24px) + 2px)", background: "linear-gradient(135deg, var(--salt-color-blue-500), var(--salt-color-purple-500), var(--salt-color-teal-500))", boxSizing: "border-box" }}>
          <div style={{ width: "100%", background: "var(--salt-palette-background-secondary)", borderRadius: "var(--salt-palette-corner-soft, 24px)", overflow: "hidden", boxSizing: "border-box" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", padding: "var(--salt-spacing-75) var(--salt-spacing-100)", background: "linear-gradient(135deg, color-mix(in srgb, var(--salt-color-blue-500) 25%, transparent), color-mix(in srgb, var(--salt-color-purple-500) 25%, transparent), color-mix(in srgb, var(--salt-color-teal-500) 25%, transparent))" }}>
              <svg viewBox="0 0 12 12" width="16" height="16" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, color: "var(--salt-status-info-foreground-decorative)" }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M0 0h12v12H0zm6 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2m1 3v5H5V5z" />
              </svg>
              <span style={{ flex: 1, fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)", color: "var(--salt-content-primary-foreground)" }}>{testModeMessage}</span>
              {onExitTestMode && (
                <Button appearance="bordered" sentiment="neutral" onClick={onExitTestMode} style={{ flexShrink: 0, height: 28 }}>Exit Test</Button>
              )}
            </div>
            <div style={{ padding: 4, boxSizing: "border-box" }}>
              {content}
            </div>
          </div>
        </div>
      ) : content}
    </div>
  );
}
