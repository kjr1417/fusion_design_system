export type AttachmentFileType = "csv" | "pdf" | "xls" | "zip" | "data" | "doc" | string;

/**
 * A fixed 112x112 attachment tile: two-line-clamped title, optional
 * two-line-clamped description, a bottom-left file-type Tag (icon +
 * label, category-15 fill), and a hover-revealed close button flush in
 * the top-right corner.
 */
export interface AttachmentTileProps {
  title: string;
  description?: string;
  /** Resolves the tag's icon + label. "pdf"/"csv"/"xls"/"xlsx"/"zip"/"data"/"dataset" map to their dedicated glyph; anything else (or "doc") falls back to the generic document icon with the extension as the label. Image extensions (png/jpg/jpeg/gif/webp/svg/bmp/heic) switch the tile into image mode even without `imageUrl`. */
  fileType?: AttachmentFileType;
  /** Thumbnail URL for an image attachment. When set (or fileType is an image extension), the tile shows an edge-to-edge, aspect-ratio-preserved thumbnail (object-fit: contain, centered) instead of title/description/the file-type tag. */
  imageUrl?: string;
  /** Shows a centered Salt Spinner in place of the normal content, for an in-progress upload (works for image and document attachments alike). The close button still works. */
  loading?: boolean;
  /** Shows the hover close button; called on click to clear the attachment. */
  onRemove?: () => void;
  style?: React.CSSProperties;
}
export function AttachmentTile(props: AttachmentTileProps): JSX.Element;
