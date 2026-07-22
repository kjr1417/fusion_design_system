/**
 * Vertical wizard progress tracker — a custom Fusion component (no direct Salt
 * equivalent). Shows an ordered set of steps down the side of a multi-step form,
 * with completed / active / upcoming states. The active step gets a blue left
 * accent bar and a pale highlight; completed steps show a filled check dot;
 * upcoming steps show a dashed outline dot. Optionally grouped under a
 * collapsible header.
 */
export interface ProgressTrackerStep {
  label: string;
  /** Override the derived state (otherwise inferred from `activeStep`). */
  status?: "complete" | "active" | "upcoming";
}

export interface ProgressTrackerProps {
  /** Optional collapsible group header (e.g. "Create Knowledge Base"). */
  title?: string;
  steps: (string | ProgressTrackerStep)[];
  /** Index of the current step; earlier steps render as complete. */
  activeStep?: number;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onStepClick?: (index: number) => void;
}
