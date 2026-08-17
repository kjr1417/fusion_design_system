import type { CSSProperties } from "react";
import type { ResponseBlockSpec } from "./ConversationArea.d.ts";

export interface AnswerComparisonOption {
  /** Optional eyebrow label, e.g. "Option A — concise". Also used as the Tabs label in the collapsed layout, and named in the post-selection disclaimer. Falls back to "Option A"/"Option B"/… by position. */
  label?: string;
  text?: string;
  /** Structured response typography — same schema as ConversationArea's `blocks`. */
  blocks?: ResponseBlockSpec[];
}

/**
 * The response card for two (or more) AI-generated answers awaiting a
 * user pick. Splits the conversation width evenly into one Card per
 * option (each with a right-aligned, bordered "Choose Option A" button)
 * when there's room; collapses into Tabs — one card at a time — below a
 * measured width threshold. Selecting an option permanently replaces the
 * comparison with that option's response plus an italic "Based on your
 * selection of…" disclaimer with a "Change answer" link that reverts back
 * to the comparison (so the user can pick differently and regenerate the
 * rest of the conversation from there).
 */
export interface AnswerComparisonProps {
  options: AnswerComparisonOption[];
  /** Controlled selected index. Omit to let the component track it internally. */
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  /** Fired when "Change answer" is clicked. Pair with a controlled `selectedIndex` to clear it yourself (e.g. to regenerate downstream conversation); with uncontrolled selection the component also reverts to the comparison view on its own. */
  onChangeSelection?: () => void;
  /** Shows the "Change answer" link once an option is picked. Default true. */
  allowChange?: boolean;
  /** Renders an option's `blocks` (structured response typography). ConversationArea wires this to its own ResponseContent renderer. */
  renderBlocks?: (blocks: ResponseBlockSpec[]) => JSX.Element;
  style?: CSSProperties;
}
export function AnswerComparison(props: AnswerComparisonProps): JSX.Element;
