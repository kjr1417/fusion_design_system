import type { HTMLAttributes } from "react";

export interface ButtonBarAction {
  label: string;
  onClick?: () => void;
  [key: string]: unknown;
}

/**
 * Full-width action toolbar (60px baseline height): optional status text on the left,
 * an optional error banner plus primary/secondary/tertiary buttons on the right.
 * Responds to container width — drops the status text first, then collapses
 * secondary/tertiary actions into an overflow menu, always keeping the
 * primary action and error banner visible.
 */
export interface ButtonBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Left-aligned helper text, e.g. "Last saved: 2:41pm". Hidden first on collision. */
  statusMessage?: string;
  /** Shown as an error Banner immediately left of the action buttons. Never collapses. */
  errorMessage?: string;
  /** The single rightmost, highest-emphasis action. Never collapses. */
  primaryAction: ButtonBarAction;
  /** Up to 2 secondary (bordered/neutral) actions. Collapse into the overflow menu first if space runs out. */
  secondaryActions?: ButtonBarAction[];
  /** Up to 2 tertiary (transparent/neutral) actions. Collapse into the overflow menu first if space runs out. */
  tertiaryActions?: ButtonBarAction[];
}

export function ButtonBar(props: ButtonBarProps): JSX.Element;
