import type { ReactNode } from "react";

export interface PromptInputAttachment {
  name: string;
  /** Falls back to `name` when absent — rendered as the AttachmentTile title. */
  title?: string;
  description?: string;
  fileType?: string;
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
  onAttach?: () => void;
  placeholder?: string;
  attachments?: (PromptInputAttachment | string)[];
  onRemoveAttachment?: (attachment: PromptInputAttachment | string, index: number) => void;
  /** Inline Dropdowns shown left of the send button, e.g. model/version pickers. */
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
  /** Replaces the textarea/control box with this node (typically a `<PromptInputPlanCard>`) — attachments/queue/helper text stay in place around it. */
  overlay?: ReactNode;
  style?: React.CSSProperties;
}
export function PromptInput(props: PromptInputProps): JSX.Element;
