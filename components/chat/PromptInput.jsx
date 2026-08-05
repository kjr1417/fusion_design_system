import React from "react";
import { ChatIcon } from "./chatIcons.jsx";

/**
 * Fusion PromptInput — the chat composer: an optional attachment-chip row,
 * an auto-height textarea, and a control row (attach button, up to two
 * Dropdowns for e.g. model/version, and an accented pill send button that
 * disables until there's text). Optional helper text below it, styled
 * like FormField's helper text. Pairs with ChatHeader and
 * ConversationArea inside ChatLayout's central panel.
 * Requires FusionDesignSystem_6db751 (IconButton, Dropdown, Pill).
 */
export function PromptInput({
  value = "",
  onChange,
  onSend,
  onAttach,
  placeholder = "Message...",
  attachments = [],
  onRemoveAttachment,
  dropdowns = [],
  helperText,
  disabled = false,
  style,
}) {
  const { IconButton, Dropdown, Pill } = window.FusionDesignSystem_6db751;
  const canSend = !disabled && value.trim().length > 0;
  return (
    <div style={{ width: "100%", ...style }}>
      <div style={{ border: "1px solid var(--salt-separable-primary-borderColor)", borderRadius: "var(--salt-palette-corner-soft, 24px)", background: "var(--salt-container-primary-background)", boxShadow: "var(--salt-shadow-lowest)", display: "flex", flexDirection: "column", padding: "var(--salt-spacing-100)", boxSizing: "border-box" }}>
        {attachments.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--salt-spacing-75)", padding: "0 var(--salt-spacing-50)", marginBottom: "var(--salt-spacing-75)" }}>
            {attachments.map((a, i) => (
              <Pill key={i} onClose={onRemoveAttachment ? () => onRemoveAttachment(a, i) : undefined}>{a.name || a}</Pill>
            ))}
          </div>
        )}
        <textarea
          value={value}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (canSend) onSend && onSend(); } }}
          placeholder={placeholder}
          rows={2}
          style={{ resize: "none", border: "none", outline: "none", background: "transparent", fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)", color: "var(--salt-content-primary-foreground)", padding: "var(--salt-spacing-50) var(--salt-spacing-50) 0" }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--salt-spacing-50) var(--salt-spacing-50) 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)" }}>
            <IconButton aria-label="Add attachment" appearance="transparent" sentiment="neutral" onClick={onAttach}><ChatIcon name="attach" size={16} /></IconButton>
            {dropdowns.map((d, i) => (
              <Dropdown key={i} options={d.options} defaultValue={d.defaultValue} onChange={d.onChange} chevronPadding={20} style={{ minWidth: d.minWidth || 100, height: 28 }} />
            ))}
          </div>
          <IconButton aria-label="Send message" appearance="solid" sentiment="accented" disabled={!canSend} onClick={onSend} style={{ borderRadius: "var(--salt-palette-corner-pill, 999px)" }}>
            {<ChatIcon name="arrow-up" size={16} />}
          </IconButton>
        </div>
      </div>
      {helperText && (
        <div style={{ marginTop: "var(--salt-spacing-100)", fontFamily: "var(--salt-text-label-fontFamily)", fontStyle: "italic", fontSize: "var(--salt-text-label-fontSize)", lineHeight: "var(--salt-text-label-lineHeight)", color: "var(--salt-content-secondary-foreground)", textAlign: "center" }}>{helperText}</div>
      )}
    </div>
  );
}
