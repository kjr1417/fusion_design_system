import React from "react";
import { fusionWaveSvg } from "./fusionWave.js";

// Full loading state using the Fusion animated wave field (accent-gradient flow lines).
export function LoadingState({ label = "Loading…", height = 140 }) {
  return (
    <div style={{ position: "relative", height, borderRadius: "var(--salt-palette-corner)", overflow: "hidden", background: "var(--salt-editable-primary-background)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{"@keyframes fusionLoadLabel{0%,100%{opacity:.6}50%{opacity:1}}"}</style>
      <div style={{ position: "absolute", inset: 0 }} dangerouslySetInnerHTML={{ __html: fusionWaveSvg }} />
      {label && (
        <span style={{ position: "relative", zIndex: 1, fontFamily: "var(--salt-text-fontFamily)", fontSize: "var(--salt-text-fontSize)", fontWeight: "var(--salt-text-fontWeight-strong)", color: "var(--salt-content-primary-foreground)", animation: "fusionLoadLabel 1.6s infinite ease-in-out" }}>{label}</span>
      )}
    </div>
  );
}
