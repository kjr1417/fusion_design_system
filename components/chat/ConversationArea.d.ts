import type { ReactNode } from "react";

export interface ConversationMessage {
  role: "user" | "agent" | "status" | "typing";
  text?: string;
  /** Agent/typing display name. */
  name?: string;
  /** Agent message timestamp, e.g. "4:43pm". */
  time?: string;
  /** Status rows only — shows a check instead of the pending spinner. */
  done?: boolean;
}

/**
 * The scrollable message list for a chat. Autoscrolls to the latest
 * message on update. No header or composer — pair with ChatHeader and
 * PromptInput.
 */
export interface ConversationAreaProps {
  messages?: ConversationMessage[];
  /** Shown centered when `messages` is empty. */
  emptyState?: ReactNode;
  /** Max width of the message column, px. Default 700. */
  maxWidth?: number;
  style?: React.CSSProperties;
}
export function ConversationArea(props: ConversationAreaProps): JSX.Element;
