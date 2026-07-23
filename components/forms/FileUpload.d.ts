import type { ReactNode } from "react";

export interface FileUploadBanner {
  status?: "info" | "success" | "warning" | "error";
  message?: ReactNode;
}

export interface FileUploadFile {
  id: string | number;
  name: string;
  /** Bytes (auto-formatted) or a pre-formatted string. */
  size?: number | string;
}

export interface FileUploadProps {
  /** "dropzone" shows a full drag-and-drop surface; "button" shows just a trigger button. */
  variant?: "dropzone" | "button";
  /** H4 title, row 1. */
  title?: string;
  /** Optional link text next to the title, e.g. "Download Template (.xlsx)". Omit to hide the link. */
  templateLabel?: string;
  templateHref?: string;
  onTemplateClick?: (e: React.MouseEvent) => void;
  /** Row 2 — clamped to a maximum of two lines. */
  description?: string;
  /** Dropzone only: label above the browse button. */
  dropLabel?: string;
  /** Dropzone only: the browse button's label. */
  browseLabel?: string;
  /** Dropzone only: small secondary text under the browse button (e.g. accepted formats). */
  secondaryDescription?: string;
  /** Button variant only: the trigger button's label. */
  buttonLabel?: string;
  accept?: string;
  multiple?: boolean;
  /** While true, the action button's label is replaced by a Spinner and the button is disabled. */
  uploading?: boolean;
  /** Success/error/warning/info banners rendered beneath the upload surface. */
  banners?: FileUploadBanner[];
  /** Rows for the results data grid; omit or pass [] to hide the grid. */
  files?: FileUploadFile[];
  onFilesSelected?: (files: File[]) => void;
  onDownload?: (file: FileUploadFile) => void;
  onDelete?: (file: FileUploadFile) => void;
  /** Fired when a banner's close button is clicked (banner is also hidden locally). */
  onBannerDismiss?: (banner: FileUploadBanner, index: number) => void;
  style?: React.CSSProperties;
}

export function FileUpload(props: FileUploadProps): JSX.Element;
