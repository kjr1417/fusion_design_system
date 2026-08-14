import React from "react";

/**
 * Shared artifact row anatomy: eyebrow label, title, optional
 * description, an optional StaticList of metadata, and a single action
 * button pinned to the right (vertically centered). Used identically by
 * ArtifactsPanel's Library rows and ConversationArea's "artifact" block,
 * so both stay visually identical by construction.
 */
export function ArtifactCard({ eyebrow, title, description, items = [], actionLabel = "View", onAction, secondaryAction, style }) {
  const { Button, StaticList } = window.FusionDesignSystem_6db751;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--salt-spacing-200)", ...style }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        {eyebrow && <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--salt-content-secondary-foreground)", marginBottom: 2 }}>{eyebrow}</div>}
        <div style={{ fontSize: 14, fontWeight: "var(--salt-text-fontWeight-strong)", color: "var(--salt-content-primary-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>
        {description && <div style={{ fontSize: 13, color: "var(--salt-content-secondary-foreground)", marginTop: 2 }}>{description}</div>}
        {items.length > 0 && (
          <div style={{ marginTop: "var(--salt-spacing-100)", display: "flex", flexDirection: "column", gap: "var(--salt-spacing-75)" }}>
            {items.map((it, i) => <StaticList key={i} label={it.label} value={it.value} labelWidth="hug" />)}
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", flexShrink: 0 }}>
        {secondaryAction}
        <Button appearance="transparent" sentiment="accented" onClick={onAction}>{actionLabel}</Button>
      </div>
    </div>
  );
}
