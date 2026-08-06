import type { ReactNode } from "react";

export interface PromptInputPlanCardAction {
  label: string;
  onClick?: () => void;
}

export interface PromptInputPlanCardQuestion {
  text: string;
  /** Optional detail text shown beneath the question, in secondary/label styling. */
  description?: string;
  /** Default "text" (free-text Input, no Additional context field). "single-select"/"multi-select" render RadioButton/Checkbox options and show the optional Additional context field. */
  type?: "text" | "single-select" | "multi-select";
  options?: { label: string; value: string }[];
}

/**
 * An overlay card that stands in for the composer's input box: a
 * numbered plan ("summary") or a one-at-a-time clarifying-question
 * stepper ("requirements", showing a "Question # of #" label instead
 * of a title). Right-aligned InlineButtons sit in the card's top-right
 * corner for either variant — for "requirements", include a "Close"
 * tertiary action so users can skip the questions and let the agent
 * proceed on its best guess.
 */
export interface PromptInputPlanCardProps {
  variant?: "summary" | "requirements";
  /** Title text ("summary" only — "requirements" always shows a "Question # of #" label instead). */
  title?: string;
  /** Plan step text, in order. Rendered as a numbered list ("summary" only). */
  steps?: string[];
  /** Clarifying questions, one shown at a time via the Stepper ("requirements" only). Plain strings are treated as free-text questions. */
  questions?: (string | PromptInputPlanCardQuestion)[];
  activeStep?: number;
  /** Draft answers, indexed to `questions` — a string for "text"/"single-select", a string[] for "multi-select". */
  answers?: (string | string[])[];
  onAnswerChange?: (step: number, value: string | string[]) => void;
  /** Optional "Add instructions" input at the bottom ("summary" only). Pressing Enter in it triggers `primaryAction`. Omit to hide it. */
  modification?: { value: string; onChange: (e: any) => void; placeholder?: string };
  /** Optional "Additional context" textarea at the bottom ("requirements" only, and only while the current question is a select type). Pressing Enter in it triggers `primaryAction`. Omit to hide it. */
  additionalContext?: { value: string; onChange: (e: any) => void; placeholder?: string; style?: React.CSSProperties };
  primaryAction?: PromptInputPlanCardAction;
  secondaryActions?: PromptInputPlanCardAction[];
  tertiaryActions?: PromptInputPlanCardAction[];
  style?: React.CSSProperties;
}
export function PromptInputPlanCard(props: PromptInputPlanCardProps): JSX.Element;
