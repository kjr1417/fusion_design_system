/**
 * Vertical wizard progress tracker — a custom Fusion component (no direct Salt
 * equivalent) built from Salt's Vertical Navigation anatomy: each step reuses
 * "Vertical Navigation Item - Level 0" (status icon + label/default text) and
 * optional sub-steps reuse "Navigation Item - Level 1/Child" (indented, H4/small
 * text, no icon). Shows an ordered set of steps down the side of a multi-step
 * form. Optionally grouped under a collapsible header.
 */
export interface ProgressTrackerChild {
  label: string;
  /** Same 5-state vocabulary as a step's status. Defaults to "todo". */
  status?: "todo" | "active" | "inprogress" | "complete" | "error";
  disabled?: boolean;
  /** Tooltip shown on the disabled row. Defaults to "You do not have permissions to access these fields." */
  disabledReason?: string;
  /** Optional label/default-styled description shown below the child's label. */
  description?: string;
}

export interface ProgressTrackerStep {
  label: string;
  /** Override the derived state (otherwise inferred from `activeStep`). */
  status?: "todo" | "active" | "inprogress" | "complete" | "error";
  /** Dims the step's icon and switches its label to the disabled foreground token. Ignored for "error" — error steps can't be disabled. */
  disabled?: boolean;
  /** Tooltip shown on the disabled row. Defaults to "You do not have permissions to access these fields." */
  disabledReason?: string;
  /** Optional secondary text rendered directly beneath the step's label, inside the always-visible header row (visible even while the accordion is collapsed) \u2014 not the collapsible body. */
  description?: string;
  /** Level 1/child sub-steps rendered indented beneath this step, each with its own status icon. A step with children gets its own chevron toggle (right-aligned) to expand/collapse them. */
  children?: (string | ProgressTrackerChild)[];
  /** Whether this step's children start expanded. Default true. */
  defaultExpanded?: boolean;
}

export interface ProgressTrackerProps {
  /** Header title above the tracker (e.g. "Progress Tracker Title"). Padding var(--salt-spacing-200), spacing-100 gap to the description. */
  headerTitle?: string;
  /** Header description shown beneath headerTitle. */
  headerDescription?: string;
  steps: (string | ProgressTrackerStep)[];
  /** Index of the current step; earlier steps render as complete, this one as active, later ones as todo — unless a step sets its own `status`. */
  activeStep?: number;
  /** Highlights one child row: `{ step, child }` indices. */
  activeChild?: { step: number; child: number };
  onStepClick?: (index: number) => void;
  onChildClick?: (stepIndex: number, childIndex: number) => void;
  /** Which page edge the tracker docks to. "left" (default, e.g. a form wizard rail with content to its right): collapses toward the left, divider on the right. "right" (a panel that opens from the right side of the screen): anchors to the right of its container, collapses toward the right, divider on the left. */
  dock?: "left" | "right";
  /** While rail-collapsed, hovering flies the panel out to full width as an absolutely-positioned overlay with `--salt-shadow-low` (same treatment as VerticalNavigation's expandOnHover), without changing the persisted collapsed state. Default false. */
  expandOnHover?: boolean;
  /** Shows the sticky bottom footer with the rail collapse/expand toggle (panel-close-left/panel-open-left_solid for dock="left", panel-close-right/panel-open-right_solid for dock="right" — same glyphs as VerticalNavigation). Default true. */
  showFooterToggle?: boolean;
  defaultRailCollapsed?: boolean;
  /** Controlled rail-collapsed state (45px icon-only rail) — pass with onRailCollapsedChange to drive it externally. */
  railCollapsed?: boolean;
  onRailCollapsedChange?: (collapsed: boolean) => void;
}
export function ProgressTracker(props: ProgressTrackerProps): JSX.Element;
