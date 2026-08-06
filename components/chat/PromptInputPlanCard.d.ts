import type { ReactNode } from "react";

export interface PromptInputPlanCardAction {
  label: string;
  onClick?: () => void;
}

/**
 * An overlay card that stands in for the composer's input box: a
 * numbered plan ("summary") or a one-at-a-time clarifying-question
 * stepper ("requirements"). Right-aligned InlineButtons sit in the
 * card's top-right corner for either variant.
 */
export interface PromptInputPlanCardProps {
  variant?: "summary" | "requirements";
  title?: string;
  /** Plan step text, in order. Rendered as a numbered list ("summary" only). */
  steps?: string[];
  /** Clarifying questions, one shown at a time via the Stepper ("requirements" only). */
  questions?: string[];
  activeStep?: number;
  /** Draft answers, indexed to `questions`. */
  answers?: string[];
  onAnswerChange?: (step: number, value: string) => void;
  /** Optional "Add instructions" input at the bottom ("summary" only). Omit to hide it. */
  modification?: { value: string; onChange: (e: any) => void; placeholder?: string };
  /** Optional "Additional context" textarea at the bottom ("requirements" only). Omit to hide it. */
  additionalContext?: { value: string; onChange: (e: any) => void; placeholder?: string; style?: React.CSSProperties };
  primaryAction?: PromptInputPlanCardAction;
  secondaryActions?: PromptInputPlanCardAction[];
  tertiaryActions?: PromptInputPlanCardAction[];
  style?: React.CSSProperties;
}
export function PromptInputPlanCard(props: PromptInputPlanCardProps): JSX.Element;
