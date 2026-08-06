import React, { useState } from "react";
import { AttachmentIcon } from "./attachmentIcons.jsx";

const TYPE_MAP = {
  csv: { icon: "csv", label: "CSV" },
  pdf: { icon: "document", label: "PDF" },
  xls: { icon: "xls", label: "XLS" },
  xlsx: { icon: "xls", label: "XLS" },
  zip: { icon: "folder-closed", label: "ZIP" },
  data: { icon: "dataset", label: "DATA" },
  dataset: { icon: "dataset", label: "DATA" },
  doc: { icon: "document", label: "DOC" },
};

function resolveType(fileType) {
  const key = String(fileType || "doc").toLowerCase();
  return TYPE_MAP[key] || { icon: "document", label: (key.slice(0, 4) || "doc").toUpperCase() };
}

const clampStyle = { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", wordBreak: "break-word", minHeight: 0 };
const IMAGE_TYPES = ["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "heic", "image"];

/**
 * Fusion AttachmentTile — a fixed 112x112 Salt card representing one
 * attached file (in the composer's staging row, or later in a sent
 * user prompt). Two-line-clamped title (body/strong, native `title`
 * tooltip on truncation) + 4px + optional two-line-clamped
 * description (label/default). A category-15-filled file-type Tag
 * (icon + short label) sits bottom-left. A hover-revealed close button
 * (actionable/foreground-active) sits flush in the top-right corner
 * with no inset — calls `onRemove` to clear the attachment.
 * Pass `imageUrl` for an image attachment: the tile shows an
 * edge-to-edge, aspect-ratio-preserved thumbnail (object-fit: contain,
 * centered on whichever axis doesn't fill) instead of title/description/
 * tag. Pass `loading` for an in-progress upload (image or document
 * attachment alike): shows only a centered Salt Spinner in place of
 * the normal content — no visible label — with the tile's native
 * `title` tooltip still carrying the filename on hover. The close
 * button still works, to cancel.
 * Requires FusionDesignSystem_6db751 (Card, Tag, Spinner).
 */
export function AttachmentTile({ title, description, fileType = "doc", imageUrl, loading = false, onRemove, style }) {
  const { Card, Tag, Spinner } = window.FusionDesignSystem_6db751;
  const [hovered, setHovered] = useState(false);
  const isImage = !!imageUrl || IMAGE_TYPES.includes(String(fileType || "").toLowerCase());
  const t = resolveType(fileType);
  const closeButton = onRemove && (
    <button
      aria-label="Remove attachment"
      title="Remove attachment"
      onClick={onRemove}
      style={{
        all: "unset", position: "absolute", top: 0, right: 0, width: 22, height: 22, boxSizing: "border-box",
        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        color: "var(--salt-actionable-foreground-active)",
        background: hovered ? "var(--salt-actionable-subtle-background-hover)" : "transparent",
        borderTopRightRadius: "var(--salt-palette-corner, 0)",
        opacity: hovered ? 1 : 0, pointerEvents: hovered ? "auto" : "none",
        transition: "opacity .1s",
      }}
    >
      <AttachmentIcon name="close" size={12} />
    </button>
  );

  if (loading) {
    return (
      <Card
        variant="primary"
        title={title}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative", width: 112, height: 112, flexShrink: 0, boxSizing: "border-box", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--salt-text-fontFamily)", ...style }}
      >
        <Spinner size={24} />
        {closeButton}
      </Card>
    );
  }

  if (isImage) {
    return (
      <Card
        variant="primary"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative", width: 112, height: 112, flexShrink: 0, boxSizing: "border-box", padding: 0, ...style }}
      >
        {imageUrl && <img src={imageUrl} alt={title || "Attached image"} style={{ display: "block", width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }} />}
        {closeButton}
      </Card>
    );
  }

  return (
    <Card
      variant="primary"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", width: 112, height: 112, flexShrink: 0, boxSizing: "border-box", padding: "8px", display: "flex", flexDirection: "column", fontFamily: "var(--salt-text-fontFamily)", ...style }}
    >
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div title={title} style={{ ...clampStyle, flexShrink: 0, fontSize: "var(--salt-text-fontSize)", fontWeight: "var(--salt-text-fontWeight-strong, 700)", lineHeight: "18px", color: "var(--salt-content-primary-foreground)" }}>{title}</div>
        {description && (
          <div title={description} style={{ ...clampStyle, marginTop: "4px", flexShrink: 1, fontFamily: "var(--salt-text-label-fontFamily)", fontSize: "var(--salt-text-label-fontSize)", lineHeight: "var(--salt-text-label-lineHeight, 16px)", color: "var(--salt-content-secondary-foreground)" }}>{description}</div>
        )}
      </div>
      <div style={{ flexShrink: 0, display: "flex" }}>
        <Tag color="file"><AttachmentIcon name={t.icon} size={12} />{t.label}</Tag>
      </div>
      {closeButton}
    </Card>
  );
}
