export interface ChatHeaderViewOption {
  label: string;
  value: string;
}

/**
 * 44px conversation header. Left: title with a hover-revealed edit icon
 * button that opens a rename Dialog. Right: a Chat/Code/Spec
 * ToggleButtonGroup, a Library icon button, and a Download chat icon
 * button.
 */
export interface ChatHeaderProps {
  /** Conversation title, truncated with ellipsis. */
  title?: string;
  /** Called with the new title when the rename dialog is saved. */
  onTitleChange?: (title: string) => void;
  /** Active ToggleButtonGroup value. Default "Chat". */
  view?: string;
  viewOptions?: ChatHeaderViewOption[];
  onViewChange?: (value: string) => void;
  /** Opens the Library/Artifacts panel. */
  onOpenLibrary?: () => void;
  /** Highlights the Library icon button with the accent fill when the panel is open. */
  libraryOpen?: boolean;
  onDownload?: () => void;
  style?: React.CSSProperties;
}
export function ChatHeader(props: ChatHeaderProps): JSX.Element;
