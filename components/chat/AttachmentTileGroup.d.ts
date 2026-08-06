import type { AttachmentTileProps, AttachmentFileType } from "./AttachmentTile.d.ts";

export interface AttachmentGroupItem {
  id?: string;
  title?: string;
  /** Alias for `title`, for drop-in use with plain `{ name }` file objects. */
  name?: string;
  description?: string;
  fileType?: AttachmentFileType;
  imageUrl?: string;
  loading?: boolean;
}

/**
 * A horizontal, spacing-100-gapped row of AttachmentTiles. Overflow
 * scrolls; actionable/bold-background chevron IconButtons appear
 * vertically centered at the edges only while scrolling that way is
 * possible.
 */
export interface AttachmentTileGroupProps {
  items?: AttachmentGroupItem[];
  onRemove?: (item: AttachmentGroupItem, index: number) => void;
  /** Defensive cap on how many tiles render at once \u2014 users are limited to 5 attachments. Default 5. */
  maxItems?: number;
  style?: React.CSSProperties;
}
export function AttachmentTileGroup(props: AttachmentTileGroupProps): JSX.Element;
