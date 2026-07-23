import type { HTMLAttributes } from "react";
import type { ButtonBarAction } from "./ButtonBar";

/**
 * A bare row of action buttons — the same primary/secondary/tertiary button
 * group used inside ButtonBar, without its container padding, background,
 * border, status text, or error banner, and without collapse-on-collision
 * behavior. Use for small, sparing action groups embedded in other patterns
 * (a card footer, a row action cluster, etc).
 */
export interface InlineButtonsProps extends HTMLAttributes<HTMLDivElement> {
  /** "right-to-left" (default) places the primary action rightmost, matching ButtonBar. "left-to-right" places it leftmost. */
  direction?: "left-to-right" | "right-to-left";
  /** The single highest-emphasis action. */
  primaryAction: ButtonBarAction;
  /** Up to 2 secondary (bordered/neutral) actions. */
  secondaryActions?: ButtonBarAction[];
  /** Up to 2 tertiary (transparent/neutral) actions. */
  tertiaryActions?: ButtonBarAction[];
}

export function InlineButtons(props: InlineButtonsProps): JSX.Element;
