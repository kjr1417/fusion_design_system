import type { ReactNode } from "react";

export interface PromptInputAttachment {
  name: string;
  /** Falls back to `name` when absent — rendered as the AttachmentTile title. */
  title?: string;
  description?: string;
  fileType?: string;
  /** In-progress upload — shows a spinner tile. While any attachment has this set, the send button disables with an explanatory title. */
  loading?: boolean;
}
export interface PromptInputDropdown {
  options: { label: string; value: string }[];
  defaultValue?: string;
  onChange?: (e: any) => void;
  minWidth?: number;
}
export interface PromptInputQueuedMessage {
  id?: string;
  text: string;
}
export interface PromptInputBanner {
  status?: "error" | "warning" | "info";
  message: React.ReactNode;
  /** Omit to hide the close button (non-dismissible). */
  onDismiss?: () => void;
}

/**
 * The chat composer: an optional queued-messages accordion, an
 * AttachmentTileGroup staging row, an auto-height textarea, an attach
 * button, up to a couple of Dropdowns (e.g. model/version), and an
 * accented pill send button disabled until there's text.
 */
export interface PromptInputProps {
  value?: string;
  onChange?: (value: string) => void;
  /** Called on send-button click or Enter (without Shift) while there's text. */
  onSend?: () => void;
  onAttachDocuments?: () => void;
  /** Out of scope for this design system — hook up to your app's internal knowledge-base picker workflow. */
  onAttachKnowledgeBases?: () => void;
  placeholder?: string;
  attachments?: (PromptInputAttachment | string)[];
  onRemoveAttachment?: (attachment: PromptInputAttachment | string, index: number) => void;
  /** Inline model/version-style pickers shown left of the send button, rendered as Fusion Menu-based dropdown buttons (not native `<select>`s). */
  dropdowns?: PromptInputDropdown[];
  /** Disclaimer/helper text below the input, centered, italic. */
  helperText?: ReactNode;
  disabled?: boolean;
  /** Shown in the drop scrim's description ("N files max."). Default 5. */
  maxFiles?: number;
  /** Called with the dropped FileList when files are dropped on the composer. */
  onFilesDropped?: (files: FileList) => void;
  /** Controlled override to force-show the blue "Drop files here" scrim (for documentation). Omit to let real drag-and-drop drive it. */
  dragOver?: boolean;
  /** Non-empty shows a collapsed-by-default accordion drawer above the composer listing messages queued for submission once the current prompt finishes. */
  queuedMessages?: PromptInputQueuedMessage[];
  onRemoveQueuedMessage?: (id: string | undefined, index: number) => void;
  /** Called when a queued message row is clicked (outside the remove button) — typically used to load its text back into the composer for editing. */
  onQueuedMessageClick?: (id: string | undefined, index: number) => void;
  /** Replaces the textarea/control box with this node (typically a `<PromptInputPlanCard>`) — attachments/queue/helper text stay in place around it. */
  overlay?: ReactNode;
  /** Dismissible status banner shown above the queue/composer. */
  banner?: PromptInputBanner;
  /** While true, the send button becomes a "Stop" (pause icon) button wired to `onCancel`, for cancelling an in-flight response. */
  sending?: boolean;
  onCancel?: () => void;
  /** Shows a centered "Scroll to Latest" button above everything else — pair with your ConversationArea's own scroll-position tracking. */
  scrollToLatest?: boolean;
  onScrollToLatest?: () => void;
  /** Wraps everything except the Scroll-to-Latest button in a gradient-bordered container with an info banner on top (shown above even an error `banner`). */
  testMode?: boolean;
  testModeMessage?: React.ReactNode;
  /** Shown as a button labeled "Exit Test" inside the Test Mode banner when provided. */
  onExitTestMode?: () => void;
  /** "/" command catalog shown in the inline trigger menu — placeholder list; override with the real catalog. */
  slashCommands?: string[];
  /** "@" mention items shown in the inline trigger menu — placeholder list; contexts (people, agents, docs, …) are up to the implementing team. */
  mentionItems?: string[];
  style?: React.CSSProperties;
}
export function PromptInput(props: PromptInputProps): JSX.Element;
