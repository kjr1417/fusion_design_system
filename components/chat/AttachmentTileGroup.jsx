import React, { useState, useRef, useCallback, useLayoutEffect } from "react";
import { AttachmentIcon } from "./attachmentIcons.jsx";
import { AttachmentTile } from "./AttachmentTile.jsx";

const trackStyle = `.fusionAttachGroup-track{scrollbar-width:none;-ms-overflow-style:none}.fusionAttachGroup-track::-webkit-scrollbar{display:none}`;

/**
 * Fusion AttachmentTileGroup — a horizontal row of AttachmentTiles
 * (8px gap), used in the composer's staging area and (later)
 * inside sent user prompts. Users are limited to 5 attachments at a
 * time; `maxItems` defensively caps what's rendered. When the row
 * overflows, actionable/bold-background chevron IconButtons appear
 * vertically centered over the left/right edges — each only when
 * scrolling that direction is still possible.
 * Requires FusionDesignSystem_6db751 (Card, Tag, IconButton).
 */
export function AttachmentTileGroup({ items = [], onRemove, maxItems = 5, style }) {
  const { IconButton } = window.FusionDesignSystem_6db751;
  const shown = items.slice(0, maxItems);
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useLayoutEffect(() => {
    update();
    const el = trackRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update, shown.length]);

  const page = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (112 + 8) * 2, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative", width: "100%", ...style }}>
      <style>{trackStyle}</style>
      {!atStart && (
        <IconButton appearance="solid" sentiment="neutral" aria-label="Scroll left" title="Scroll left" onClick={() => page(-1)} style={{ position: "absolute", left: "4px", top: "50%", transform: "translateY(-50%)", zIndex: 2, boxShadow: "var(--salt-shadow-low)" }}>
          <AttachmentIcon name="chevron-left" size={14} />
        </IconButton>
      )}
      <div ref={trackRef} onScroll={update} className="fusionAttachGroup-track" style={{ display: "flex", gap: "8px", overflowX: "auto", scrollBehavior: "smooth" }}>
        {shown.map((a, i) => (
          <AttachmentTile key={a.id || i} title={a.title || a.name} description={a.description} fileType={a.fileType} imageUrl={a.imageUrl} loading={a.loading} onRemove={onRemove ? () => onRemove(a, i) : undefined} />
        ))}
      </div>
      {!atEnd && (
        <IconButton appearance="solid" sentiment="neutral" aria-label="Scroll right" title="Scroll right" onClick={() => page(1)} style={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)", zIndex: 2, boxShadow: "var(--salt-shadow-low)" }}>
          <AttachmentIcon name="chevron-right" size={14} />
        </IconButton>
      )}
    </div>
  );
}
