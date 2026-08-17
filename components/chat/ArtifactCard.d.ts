import type { CSSProperties, ReactNode } from "react";
import type { StaticListProps } from "../data/StaticList.d.ts";

/**
 * Shared artifact row anatomy — eyebrow label, title, optional
 * description, an optional StaticList of metadata, and a single action
 * button pinned to the right. Used by both ArtifactsPanel's Library rows
 * and ConversationArea's "artifact" block so the two stay identical.
 */
export interface ArtifactCardMetadataItem {
  label: ReactNode;
  value: ReactNode;
}
export interface ArtifactCardProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items?: ArtifactCardMetadataItem[];
  actionLabel?: string;
  onAction?: () => void;
  /** Extra control rendered left of the other actions (e.g. a Download IconButton), for callers that want a custom control instead of `onDownload`. */
  secondaryAction?: ReactNode;
  /** Renders an outlined "Download" button (label via `downloadLabel`). Only one of Download/View shows at a time — Download until it's clicked (or `downloaded`/`defaultDownloaded` says otherwise), then View. */
  onDownload?: () => void;
  downloadLabel?: string;
  /** Controlled: true shows View, false shows Download. Omit to let the card manage this itself (starts from `defaultDownloaded`, flips to true when Download is clicked). */
  downloaded?: boolean;
  defaultDownloaded?: boolean;
  /** Adds a border + minor shadow, for a standalone card in the conversation flow (e.g. ConversationArea's "artifact" block). Library rows in ArtifactsPanel leave this off. */
  bordered?: boolean;
  style?: CSSProperties;
}
export function ArtifactCard(props: ArtifactCardProps): JSX.Element;
