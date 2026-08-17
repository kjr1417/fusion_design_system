import React, { useState } from "react";

/**
 * Shared artifact row anatomy: eyebrow label, title, optional
 * description, an optional StaticList of metadata, and a single action
 * button pinned to the right (vertically centered). Used identically by
 * ArtifactsPanel's Library rows and ConversationArea's "artifact" block,
 * so both stay visually identical by construction.
 */
export function ArtifactCard({ eyebrow, title, description, items = [], actionLabel = "View", onAction, secondaryAction, onDownload, downloadLabel = "Download", downloaded, defaultDownloaded = false, bordered = false, style }) {
  const { Button, StaticListGroup } = window.FusionDesignSystem_6db751;
  const [internalDownloaded, setInternalDownloaded] = useState(defaultDownloaded);
  const isDownloaded = downloaded !== undefined ? downloaded : internalDownloaded;
  const handleDownload = () => {
    onDownload && onDownload();
    if (downloaded === undefined) setInternalDownloaded(true);
  };
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: "var(--salt-spacing-200)",
      ...(bordered ? {
        border: "1px solid var(--salt-separable-primary-borderColor)",
        borderRadius: "var(--salt-palette-corner)",
        boxShadow: "var(--salt-shadow-low)",
        background: "var(--salt-container-primary-background)",
        padding: "var(--salt-spacing-200)",
        boxSizing: "border-box",
        width: "100%",
      } : {}),
      ...style,
    }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        {eyebrow && <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--salt-content-secondary-foreground)", marginBottom: 2 }}>{eyebrow}</div>}
        <div style={{ fontSize: 14, fontWeight: "var(--salt-text-fontWeight-strong)", color: "var(--salt-content-primary-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>
        {description && <div style={{ fontSize: 13, color: "var(--salt-content-secondary-foreground)", marginTop: 2 }}>{description}</div>}
        {items.length > 0 && (
          <div style={{ marginTop: "var(--salt-spacing-100)" }}>
            <StaticListGroup items={items} orientation="horizontal" labelWidth="hug" />
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", alignContent: "center", alignSelf: "center", gap: "var(--salt-spacing-75)", flexShrink: 0, maxWidth: 168 }}>
        {secondaryAction}
        {onDownload && !isDownloaded && <Button appearance="bordered" sentiment="neutral" onClick={handleDownload} style={{ whiteSpace: "nowrap" }}>{downloadLabel}</Button>}
        {(!onDownload || isDownloaded) && <Button appearance={bordered ? "solid" : "transparent"} sentiment="accented" onClick={onAction} style={{ whiteSpace: "nowrap" }}>{actionLabel}</Button>}
      </div>
    </div>
  );
}
