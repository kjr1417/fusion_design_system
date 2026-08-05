import React, { useState } from "react";
import { ChatIcon } from "./chatIcons.jsx";

/**
 * Fusion ArtifactsPanel — the "Library" pattern: a right-anchored
 * SidePanel (320–640px, spacing-200 padding, resizable) titled "Library",
 * with a "Download All" secondary button left of its close button.
 * Content is a list of compact artifact cards (title + description, no
 * icon), each divided from the next by a bottom border, with a
 * rightmost "View" text button and a "Download" icon button. Selecting
 * "View" swaps the same panel to that artifact's detail, adding a back
 * button (via SidePanel's onBack) to return to the list. Open it from
 * ChatHeader's Library action.
 * Requires FusionDesignSystem_6db751 (SidePanel, Button, IconButton).
 */
export function ArtifactsPanel({
  open,
  onClose,
  artifacts = [],
  onDownloadAll,
  onDownload,
  emptyStateText = "Artifacts you create in this conversation will appear here.",
}) {
  const { SidePanel, Button, IconButton } = window.FusionDesignSystem_6db751;
  const [selected, setSelected] = useState(null);

  const closePanel = () => { setSelected(null); onClose && onClose(); };

  return (
    <SidePanel
      open={open}
      onClose={closePanel}
      title={selected ? selected.title : "Library"}
      onBack={selected ? () => setSelected(null) : undefined}
      backLabel="Return to Library"
      closeLabel="Close Library"
      actions={selected
        ? [{ label: "Download", icon: <ChatIcon name="download" size={14} />, onClick: () => onDownload && onDownload(selected) }]
        : [{ label: "Download All", onClick: onDownloadAll }]}
    >
      {selected ? (
        <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--salt-content-primary-foreground)" }}>
          <div style={{ fontSize: 13, color: "var(--salt-content-secondary-foreground)", marginBottom: "var(--salt-spacing-200)" }}>{selected.description}</div>
          <div style={{ padding: "var(--salt-spacing-300)", textAlign: "center", border: "1px dashed var(--salt-separable-secondary-borderColor)", borderRadius: "var(--salt-palette-corner-weaker)", color: "var(--salt-content-secondary-foreground)", fontSize: 13 }}>Artifact preview — {selected.title}</div>
        </div>
      ) : (
        <div>
          {artifacts.length === 0 && (
            <div style={{ padding: "var(--salt-spacing-300) 0", fontSize: 13, color: "var(--salt-content-secondary-foreground)", textAlign: "center" }}>{emptyStateText}</div>
          )}
          {artifacts.map((a, i) => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-200)", padding: "var(--salt-spacing-150) 0", borderBottom: i < artifacts.length - 1 ? "1px solid var(--salt-separable-secondary-borderColor)" : "none" }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--salt-content-primary-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</div>
                <div style={{ fontSize: 13, color: "var(--salt-content-secondary-foreground)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.description}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", flexShrink: 0 }}>
                <IconButton appearance="transparent" sentiment="neutral" aria-label={`Download ${a.title}`} title="Download" onClick={() => onDownload && onDownload(a)}>
                  {<ChatIcon name="download" size={16} />}
                </IconButton>
                <Button appearance="transparent" sentiment="accented" onClick={() => setSelected(a)}>View</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SidePanel>
  );
}
