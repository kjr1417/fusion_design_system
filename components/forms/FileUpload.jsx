import React, { useRef, useState } from "react";

const UploadGlyph = ({ size = 16 }) => (
  <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M5.5 9.03h1v-7.114l2.682 2.682.707-.707L6 0 2.11 3.89l.708.707L5.5 1.916zM12 11v1H0v-1z" />
  </svg>
);

/**
 * Fusion FileUpload — file-intake pattern with two variants: a drag-and-drop
 * zone (`variant="dropzone"`) or a single trigger button (`variant="button"`).
 * Title + optional template link, a two-line-clamped description, the
 * upload surface, a `BannerStack` for status feedback, and a
 * `FileResultsGrid` for uploaded-file rows.
 * Requires FusionDesignSystem_6db751 (Button, Link, Spinner, Text/H4,
 * BannerStack, FileResultsGrid) plus ./FileUpload.css.
 */
export function FileUpload({
  variant = "dropzone",
  title = "Upload a document",
  templateLabel,
  templateHref = "#",
  onTemplateClick,
  description,
  dropLabel = "Drop files here or",
  browseLabel = "BROWSE FILES",
  secondaryDescription,
  buttonLabel = "UPLOAD FILES",
  accept,
  multiple = true,
  uploading = false,
  banners = [],
  files = [],
  onFilesSelected,
  onDownload,
  onDelete,
  onBannerDismiss,
  style,
}) {
  const { Button, Link, Spinner, H4, BannerStack, FileResultsGrid } = window.FusionDesignSystem_6db751;
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const openPicker = () => { if (!uploading) inputRef.current?.click(); };
  const handleChange = (e) => {
    if (e.target.files?.length) onFilesSelected?.(Array.from(e.target.files));
    e.target.value = "";
  };
  const dragHandlers = variant === "dropzone" ? {
    onDragEnter: (e) => { e.preventDefault(); if (!uploading) setDragActive(true); },
    onDragOver: (e) => { e.preventDefault(); },
    onDragLeave: (e) => { e.preventDefault(); setDragActive(false); },
    onDrop: (e) => {
      e.preventDefault();
      setDragActive(false);
      if (uploading) return;
      if (e.dataTransfer.files?.length) onFilesSelected?.(Array.from(e.dataTransfer.files));
    },
  } : {};

  return (
    <div style={{ display: "flex", flexDirection: "column", fontFamily: "var(--salt-text-fontFamily)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-200)" }}>
        <H4 style={{ margin: 0 }}>{title}</H4>
        {templateLabel && <Link href={templateHref} onClick={onTemplateClick} variant="primary">{templateLabel}</Link>}
      </div>

      {description && <p className="fu-description" style={{ marginTop: "var(--salt-spacing-100)" }}>{description}</p>}

      {variant === "dropzone" ? (
        <div className={"fu-dropzone" + (dragActive ? " fu-dropzone-active" : "")} style={{ marginTop: "var(--salt-spacing-200)" }} {...dragHandlers}>
          <span className="fu-dropzone-icon"><UploadGlyph size={28} /></span>
          <span className="fu-dropzone-label">{dropLabel}</span>
          <Button appearance="bordered" sentiment="neutral" disabled={uploading} onClick={openPicker} style={{ whiteSpace: "nowrap" }}>
            {uploading ? <Spinner size={16} /> : browseLabel}
          </Button>
          {secondaryDescription && <span className="fu-secondary">{secondaryDescription}</span>}
          <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleChange} className="fu-hidden-input" tabIndex={-1} aria-hidden="true" />
        </div>
      ) : (
        <div style={{ marginTop: "var(--salt-spacing-200)" }}>
          <Button appearance="solid" sentiment="accented" disabled={uploading} onClick={openPicker} style={{ whiteSpace: "nowrap" }}>
            {uploading ? <Spinner size={16} /> : (<><UploadGlyph size={16} /><span style={{ whiteSpace: "nowrap" }}>{buttonLabel}</span></>)}
          </Button>
          <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleChange} className="fu-hidden-input" tabIndex={-1} aria-hidden="true" />
        </div>
      )}

      {banners.length > 0 && (
        <BannerStack banners={banners} onDismiss={onBannerDismiss} style={{ marginTop: "var(--salt-spacing-200)" }} />
      )}

      {files.length > 0 && (
        <FileResultsGrid files={files} onDownload={onDownload} onDelete={onDelete} style={{ marginTop: "var(--salt-spacing-200)" }} />
      )}
    </div>
  );
}
