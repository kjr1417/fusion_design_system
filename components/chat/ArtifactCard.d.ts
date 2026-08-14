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
  /** Extra control rendered left of the action button (e.g. a Download IconButton). */
  secondaryAction?: ReactNode;
  style?: CSSProperties;
}
export function ArtifactCard(props: ArtifactCardProps): JSX.Element;
