import React from "react";
import { fusionWaveSvg } from "./fusionWave.js";

// Empty state using the Fusion animated wave field as a calm backdrop behind the message.
export function EmptyState({ title = "Nothing here yet", description, action }) {
  return (
    <div style={{ position: "relative", borderRadius: "var(--salt-palette-corner)", overflow: "hidden", background: "var(--salt-editable-primary-background)" }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: "30%", opacity: 0.7 }} dangerouslySetInnerHTML={{ __html: fusionWaveSvg }} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "var(--salt-spacing-100)", padding: "var(--salt-spacing-400) var(--salt-spacing-300)", fontFamily: "var(--salt-text-fontFamily)" }}>
        <div style={{ fontSize: "var(--salt-text-h4-fontSize)", fontWeight: "var(--salt-text-fontWeight-strong)", color: "var(--salt-content-primary-foreground)" }}>{title}</div>
        {description && <div style={{ fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)", color: "var(--salt-content-secondary-foreground)", maxWidth: 320 }}>{description}</div>}
        {action && <div style={{ marginTop: "var(--salt-spacing-100)" }}>{action}</div>}
      </div>
    </div>
  );
}
