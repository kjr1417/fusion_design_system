import type { HTMLAttributes } from "react";

export type StatusBadgeStatus =
  | "Not Started" | "Starting" | "Step Todo"
  | "Draft" | "Plan"
  | "Active" | "New"
  | "Pending" | "Pending Approval"
  | "Approved" | "Cleared for Production" | "Complete" | "Operate" | "Published" | "Submitted" | "Yes"
  | "Proposed" | "Ready" | "Ready for Linking" | "Test Ready"
  | "Paused" | "Withdrawn"
  | "Removing" | "Required for KDE" | "Terminating"
  | "Decommissioned" | "Delete Initiated" | "Deprecated" | "Rejected" | "Request Rejected" | "Retired" | "Terminated"
  | "Test Loading"
  | "Running" | "Synchronized"
  | "Build" | "Development" | "In Progress" | "Upgrading"
  | "Rerun Test"
  | "Failed" | "Test Failed"
  | "Archived"
  | "Expired"
  | "Test Reverted"
  | "No" | "Not Submitted" | "Review Required" | "Step Warning";

/**
 * Compact icon + label pair for record/workflow state. `status` is matched
 * against a built-in vocabulary (see StatusBadgeStatus) to resolve the 12x12
 * icon and its color automatically. Icon and label sit in a spacing-75 gap;
 * the label uses the default body text style/color.
 */
export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Status key — resolves icon + color from the built-in vocabulary. */
  status?: StatusBadgeStatus | string;
  /** Text shown next to the icon. Defaults to `status`. */
  label?: string;
  /** Override the resolved icon glyph key (e.g. "progress-complete", "sync", "loader"). */
  icon?: string;
  /** Override the resolved color: "gray" | "blue" | "green" | "red" | "orange", or any CSS color. */
  color?: "gray" | "blue" | "green" | "red" | "orange" | string;
  className?: string;
}
