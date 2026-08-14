import type { CSSProperties } from "react";
import type { ResponseBlockSpec } from "./ConversationArea.d.ts";

export interface AnswerComparisonOption {
  /** Optional eyebrow label above the response, e.g. "Option A". */
  label?: string;
  text?: string;
  /** Structured response typography — same schema as ConversationArea's `blocks`. */
  blocks?: ResponseBlockSpec[];
}

/**
 * Two (or more) candidate agent responses side by side, each in a Card
 * with a bottom action button to select it. Stacks on narrow widths.
 */
export interface AnswerComparisonProps {
  options: AnswerComparisonOption[];
  /** Controlled selected index. Omit to let the component track it internally. */
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  /** Default "Use this". */
  actionLabel?: string;
  /** Renders an option's `blocks` (structured response typography). ConversationArea wires this to its own ResponseContent renderer. */
  renderBlocks?: (blocks: ResponseBlockSpec[]) => JSX.Element;
  style?: CSSProperties;
}
export function AnswerComparison(props: AnswerComparisonProps): JSX.Element;
