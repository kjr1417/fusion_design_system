import type { ReactNode } from "react";

/**
 * Full loading state built on the Fusion animated wave field (accent-gradient
 * flow lines) with a centered, softly pulsing label. Use for whole-panel or
 * page loads; use `Spinner` for small inline loads.
 */
export interface LoadingStateProps {
  label?: ReactNode;
  /** Height of the wave band in px. */
  height?: number;
}
