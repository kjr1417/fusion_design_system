import type { CSSProperties, ReactNode } from "react";

export interface StageLayoutProps {
  /** "large" caps content at 980-1848px; "small" (covers X-Small/Small) caps it at 400-1280px. Below the minimum, content aligns left and scrolls horizontally rather than squeezing further. Default "large". */
  size?: "large" | "small";
  globalNavProps?: Record<string, unknown>;
  /** Props spread onto the AppHeader directly beneath the global nav (fixed in place through vertical scroll). Any rightPanel/overlayPanel trigger is folded into its `actions`, at the header's right edge just before the StatusBadge. */
  appHeaderProps?: Record<string, unknown>;
  /** Drop the ProgressTracker rail entirely — the size="large" sub-variant without it. Default true. */
  showProgressTracker?: boolean;
  /** Props spread onto the left ProgressTracker rail. Stays fixed (not part of the content's horizontal scroll); collapsing it (its own built-in toggle) reflows the content area automatically. */
  progressTrackerProps?: Record<string, unknown>;
  /** Props spread onto the full-width ButtonBar above the footer. */
  buttonBarProps?: Record<string, unknown>;
  /** Inline right panel content — pushes the content column when open. Omit to not offer this panel. */
  rightPanel?: ReactNode;
  rightPanelTitle?: string;
  /** Label for the button folded into AppHeader's actions. Default "AI Assist". */
  rightPanelTriggerLabel?: string;
  /** true (default): resizable via a drag splitter (rightPanelMinWidth-rightPanelMaxWidth, starting at rightPanelWidth). false: a fixed, non-resizable push panel at rightPanelWidth. */
  rightPanelResizable?: boolean;
  rightPanelWidth?: number;
  rightPanelMinWidth?: number;
  rightPanelMaxWidth?: number;
  /** Controlled open state — pass with onRightPanelOpenChange to drive it externally. */
  rightPanelOpen?: boolean;
  defaultRightPanelOpen?: boolean;
  onRightPanelOpenChange?: (open: boolean) => void;
  /** Fixed-width right-anchored overlay content, slides in above the ProgressTracker and content with a click-to-dismiss scrim (like SidePanel, but not resizable). Omit to not offer this overlay. */
  overlayPanel?: ReactNode;
  overlayTitle?: string;
  /** Label for the button folded into AppHeader's actions. Default "Overlay". */
  overlayTriggerLabel?: string;
  overlayWidth?: number;
  overlayOpen?: boolean;
  defaultOverlayOpen?: boolean;
  onOverlayOpenChange?: (open: boolean) => void;
  showFooter?: boolean;
  footerProps?: Record<string, unknown>;
  /** Extra style on the inner content wrapper (inside the spacing-300 padding). */
  contentStyle?: CSSProperties;
  children?: ReactNode;
}
export function StageLayout(props: StageLayoutProps): JSX.Element;
