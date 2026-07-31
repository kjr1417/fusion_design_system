import type { ReactNode } from "react";

export interface CanvasLayoutProps {
  globalNavProps?: Record<string, unknown>;
  /** Props spread onto the full-width AppHeader directly beneath the global nav. */
  appHeaderProps?: Record<string, unknown>;
  /** Left panel content. Omit entirely to not render a left panel. */
  leftPanel?: ReactNode;
  /** Shown in the left panel's own header once expanded. */
  leftPanelTitle?: string;
  leftPanelWidth?: number;
  leftPanelMinWidth?: number;
  leftPanelMaxWidth?: number;
  /** Controlled open state — pass with onLeftOpenChange to drive it externally. */
  leftOpen?: boolean;
  defaultLeftOpen?: boolean;
  onLeftOpenChange?: (open: boolean) => void;
  /** Right panel content. Omit entirely to not render a right panel. */
  rightPanel?: ReactNode;
  /** Shown in the right panel's own header once expanded. */
  rightPanelTitle?: string;
  rightPanelWidth?: number;
  rightPanelMinWidth?: number;
  rightPanelMaxWidth?: number;
  rightOpen?: boolean;
  defaultRightOpen?: boolean;
  onRightOpenChange?: (open: boolean) => void;
  /** Props spread onto the full-width ButtonBar above the footer. */
  buttonBarProps?: Record<string, unknown>;
  showFooter?: boolean;
  footerProps?: Record<string, unknown>;
  /** Floating bottom-left canvas toolbar handlers (zoom out/in, undo/redo, fit-to-canvas). */
  onZoomOut?: () => void;
  onZoomIn?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onFitToCanvas?: () => void;
  /** Central canvas content. */
  children?: ReactNode;
}
export function CanvasLayout(props: CanvasLayoutProps): JSX.Element;
