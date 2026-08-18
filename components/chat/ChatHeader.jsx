import React, { useState } from "react";
import { ChatIcon } from "./chatIcons.jsx";

const EditIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true">
    <path d="M9.564.293a1 1 0 0 0-1.415 0L6.735 1.707l3.536 3.536 1.414-1.415a1 1 0 0 0 0-1.414zm-.354 1.06a.5.5 0 0 0-.707 0l-.354.354 2.122 2.121.353-.353a.5.5 0 0 0 0-.707z" />
    <path d="m7.442 3.828.707.708L4.26 8.425a.5.5 0 1 1-.707-.707z" />
    <path d="m8.857 5.243.707.707-4.243 4.242L0 12l1.786-5.343 4.207-4.208.707.707-4.03 4.031-.796 2.387.53.53 2.387-.795z" />
  </svg>
);

/**
 * Fusion ChatHeader — 44px header for the active conversation. Left:
 * title with a hover-revealed edit icon button that opens a Dialog with a
 * single "Title" field to rename the chat. Right: a Chat/Code/Spec
 * ToggleButtonGroup, a "Library" icon button (opens the artifacts panel),
 * and a "Download chat" icon button. Every icon button carries a
 * descriptive title/aria-label. Pairs with ConversationArea and
 * PromptInput inside ChatLayout's central panel.
 * Requires FusionDesignSystem_6db751 (IconButton, ToggleButtonGroup,
 * Dialog, FormField, Input, Button).
 */
export function ChatHeader({
  title = "New conversation",
  onTitleChange,
  view = "Chat",
  viewOptions = [{ label: "Chat", value: "Chat" }, { label: "Code", value: "Code" }, { label: "Spec", value: "Spec" }],
  onViewChange,
  onOpenLibrary,
  libraryOpen = false,
  onDownload,
  style,
}) {
  const { IconButton, ToggleButtonGroup, Dialog, FormField, Input, Button } = window.FusionDesignSystem_6db751;
  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(title);

  const openEdit = () => { setDraft(title); setEditing(true); };
  const save = () => { onTitleChange && onTitleChange(draft.trim() || title); setEditing(false); };

  return (
    <div style={{ height: 44, flexShrink: 0, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--salt-spacing-200)", padding: "0 var(--salt-spacing-200)", borderBottom: "1px solid var(--salt-separable-secondary-borderColor)", background: "var(--salt-container-primary-background)", fontFamily: "var(--salt-text-fontFamily)", ...style }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", minWidth: 0 }}
      >
        <span style={{ fontSize: 15, fontWeight: "var(--salt-text-fontWeight-strong, 700)", color: "var(--salt-content-primary-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</span>
        <span style={{ opacity: hovered ? 1 : 0, transition: "opacity .1s", flexShrink: 0 }}>
          <IconButton appearance="transparent" sentiment="neutral" aria-label="Edit chat title" title="Edit chat title" onClick={openEdit}>
            <EditIcon />
          </IconButton>
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)", flexShrink: 0 }}>
        <ToggleButtonGroup options={viewOptions} defaultValue={view} onChange={onViewChange} style={{ marginBottom: 0 }} />
        <IconButton appearance="transparent" sentiment="neutral" aria-label="Library" title="Library" onClick={onOpenLibrary}>
          <ChatIcon name="folder-open" size={16} color={libraryOpen ? "var(--salt-palette-accent)" : undefined} />
        </IconButton>
        <IconButton appearance="transparent" sentiment="neutral" aria-label="Download chat" title="Download chat" onClick={onDownload}>
          <ChatIcon name="download" size={16} />
        </IconButton>
      </div>

      {editing && (
        <Dialog
          open={editing}
          title="Rename chat"
          onClose={() => setEditing(false)}
          actions={<>
            <Button appearance="bordered" sentiment="neutral" onClick={() => setEditing(false)}>Cancel</Button>
            <Button appearance="solid" sentiment="accented" onClick={save}>Save</Button>
          </>}
        >
          <FormField label="Title">
            <Input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") save(); }} autoFocus />
          </FormField>
        </Dialog>
      )}
    </div>
  );
}
