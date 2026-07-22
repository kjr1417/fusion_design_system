import type { ReactNode } from "react";

/**
 * Empty state built on the Fusion animated wave field as a calm backdrop behind
 * a short message. Give it a `title`, an optional `description`, and an optional
 * `action` (usually a primary `Button`) to help the user fill the empty space.
 */
export interface EmptyStateProps {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}
