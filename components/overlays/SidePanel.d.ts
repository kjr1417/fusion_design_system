import type { ReactNode } from "react";
import type { SidePanelHeaderAction } from "./SidePanelHeader";

interface InlineAction {
  label: string;
  onClick?: (e: any) => void;
}

/**
 * Fusion SidePanel — slide-in panel for detail or a secondary task
 * alongside the current view, without fully replacing it. Its header is
 * a built-in SidePanelHeader (title/secondaryInfo/back/actions/close,
 * description, metadata row) — pass those props straight through. A
 * draggable splitter on its edge resizes it between 320px and 640px
 * (default 560px), with a hairline + grip handle that highlights accent-
 * colored and grows on hover/drag. spacing-200 padding on all sides; an
 * optional footer row of InlineButtons sits spacing-200 below the content.
 */
export interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  /** Panel title, rendered as an H2 by SidePanelHeader. */
  title: string;
  /** Short secondary label next to the title (e.g. an id or type). */
  secondaryInfo?: string;
  /** Shows a leading transparent back icon button when provided. */
  onBack?: (e: any) => void;
  /** Bordered, neutral action buttons in the header. Only the first two are rendered. */
  actions?: SidePanelHeaderAction[];
  /** Supporting description, clamped to 2 lines. */
  description?: string;
  primaryTag?: string;
  secondaryTag?: string;
  status?: { label: string };
  copyValue?: string;
  onCopy?: (value: string) => void;
  dataLabels?: string[];
  /** Solid accented footer button, right-most. */
  primaryAction?: InlineAction;
  /** Bordered neutral footer buttons, right-to-left before primaryAction. */
  secondaryActions?: InlineAction[];
  /** Transparent neutral footer buttons, leftmost of the footer row. */
  tertiaryActions?: InlineAction[];
  children?: ReactNode;
}

export declare function SidePanel(props: SidePanelProps): JSX.Element;
