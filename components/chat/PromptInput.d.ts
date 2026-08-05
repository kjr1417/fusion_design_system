import type { ReactNode } from "react";

export interface PromptInputAttachment {
  name: string;
}
export interface PromptInputDropdown {
  options: { label: string; value: string }[];
  defaultValue?: string;
  onChange?: (e: any) => void;
  minWidth?: number;
}

/**
 * The chat composer: attachment chips, an auto-height textarea, an attach
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
  style?: React.CSSProperties;
}
export function PromptInput(props: PromptInputProps): JSX.Element;
