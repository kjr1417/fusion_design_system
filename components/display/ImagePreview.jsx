import React, { useState, useEffect } from "react";

const CopyIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M4 0h4.707L11 2.293V9H8v3H1V3h3zm1 1v7h5V4H7V1zm3 0v2h2v-.293L8.293 1zM2 4h2v5h3v2H2z" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.952 9.294 10 3.73 8.9 2.706 4.875 7.163 3.027 5.446 2 6.546z" />
  </svg>
);
const ExpandIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M1 1h4v1.5H2.5V5H1V1zm10 0v4h-1.5V2.5H7V1h4zM1 11V7h1.5v2.5H5V11H1zm10 0H7V9.5h2.5V7H11v4z" />
  </svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M5.5 0h1v6.293l2.146-2.147.708.708L6 8.207 2.646 4.854l.708-.708L5.5 6.293V0zM1 10h10v1H1v-1z" />
  </svg>
);
const ChevronLeftIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M7.5 2 3 6l4.5 4 .8-.8L4.6 6l3.7-3.2z" /></svg>
);
const ChevronRightIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M4.5 2 9 6l-4.5 4-.8-.8L7.4 6 3.7 2.8z" /></svg>
);

const toolbarBtnStyle = { boxSizing: "border-box", border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", padding: 0, width: 28, height: 28, borderRadius: "var(--salt-curve-50)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" };

async function copyImage(src) {
  const res = await fetch(src);
  const blob = await res.blob();
  await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
}
function downloadImage(src, name) {
  const a = document.createElement("a");
  a.href = src;
  a.download = name || "image";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * A thumbnail image (max-height 320, max-width 100% of its container minus
 * a 108px reserve, preserving aspect ratio) with a hover-revealed toolbar
 * (Copy, Download, Expand). Copy writes the image to the clipboard as a
 * PNG; Download saves it; Expand opens it full-size in a Dialog (maxWidth
 * 900, maxHeight 80vh). Pass `images` (+ this thumbnail's `index` in it)
 * when several images belong to one response — the dialog then gets a
 * footer with a Back/Next/counter nav and left-aligned Copy/Download.
 * Requires ../overlays/Dialog.jsx.
 */
export function ImagePreview({ src, alt = "", images, index = 0, maxHeight = 320, style }) {
  const { Dialog, IconButton } = window.FusionDesignSystem_6db751;
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dialogIndex, setDialogIndex] = useState(index);

  const gallery = images && images.length > 1 ? images : null;
  const current = gallery ? gallery[dialogIndex] : { src, alt };

  useEffect(() => {
    if (!expanded || !gallery) return;
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") setDialogIndex((v) => Math.max(0, v - 1));
      else if (e.key === "ArrowRight") setDialogIndex((v) => Math.min(gallery.length - 1, v + 1));
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [expanded, gallery]);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try { await copyImage(src); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };
  const handleDownload = (e) => { e.stopPropagation(); downloadImage(src, alt); };
  const openExpand = (e) => { e.stopPropagation(); setDialogIndex(index); setExpanded(true); };

  const [dialogCopied, setDialogCopied] = useState(false);
  const dialogCopy = async () => {
    try { await copyImage(current.src); setDialogCopied(true); setTimeout(() => setDialogCopied(false), 1500); } catch {}
  };

  return (
    <>
      <div
        style={{ position: "relative", display: "inline-block", borderRadius: "var(--salt-curve-200)", overflow: "hidden", lineHeight: 0, maxWidth: "calc(100% - 108px)", ...style }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={src} alt={alt} style={{ display: "block", maxHeight, maxWidth: "100%", objectFit: "contain" }} />
        <div style={{ position: "absolute", top: "var(--salt-spacing-100)", right: "var(--salt-spacing-100)", display: "flex", gap: "var(--salt-spacing-100)", opacity: hovered ? 1 : 0, transition: "opacity .1s", pointerEvents: hovered ? "auto" : "none" }}>
          <button style={toolbarBtnStyle} aria-label="Copy image" title={copied ? "Copied" : "Copy image"} onClick={handleCopy}>{copied ? <CheckIcon /> : <CopyIcon />}</button>
          <button style={toolbarBtnStyle} aria-label="Download image" title="Download image" onClick={handleDownload}><DownloadIcon /></button>
          <button style={toolbarBtnStyle} aria-label="Expand image" title="Expand image" onClick={openExpand}><ExpandIcon /></button>
        </div>
      </div>
      <Dialog
        open={expanded}
        title={current.alt || "Image"}
        onClose={() => setExpanded(false)}
        width={900}
        maxHeight="80vh"
        bodyStyle={{ marginBottom: gallery ? "var(--salt-spacing-150)" : 0, display: "flex", justifyContent: "center" }}
        footer={gallery && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "var(--salt-spacing-150)", borderTop: "1px solid var(--salt-color-background-titanium)" }}>
            <div style={{ display: "flex", gap: "var(--salt-spacing-100)" }}>
              <IconButton aria-label="Copy image" title={dialogCopied ? "Copied" : "Copy image"} appearance="transparent" sentiment={dialogCopied ? "positive" : "neutral"} onClick={dialogCopy}>{dialogCopied ? <CheckIcon /> : <CopyIcon />}</IconButton>
              <IconButton aria-label="Download image" title="Download image" appearance="transparent" sentiment="neutral" onClick={() => downloadImage(current.src, current.alt)}><DownloadIcon /></IconButton>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-150)" }}>
              <span style={{ fontSize: "var(--salt-text-label-fontSize, 12px)", color: "var(--salt-content-secondary-foreground)" }}>{dialogIndex + 1} of {gallery.length}</span>
              <div style={{ display: "flex", gap: "var(--salt-spacing-100)" }}>
                <IconButton aria-label="Previous image" title="Back" appearance="bordered" sentiment="neutral" disabled={dialogIndex === 0} onClick={() => setDialogIndex((v) => Math.max(0, v - 1))}><ChevronLeftIcon /></IconButton>
                <IconButton aria-label="Next image" title="Next" appearance="bordered" sentiment="neutral" disabled={dialogIndex === gallery.length - 1} onClick={() => setDialogIndex((v) => Math.min(gallery.length - 1, v + 1))}><ChevronRightIcon /></IconButton>
              </div>
            </div>
          </div>
        )}
      >
        <img src={current.src} alt={current.alt} style={{ display: "block", maxWidth: "100%", maxHeight: "calc(80vh - 120px)", objectFit: "contain" }} />
      </Dialog>
    </>
  );
}
