import type { ReactNode } from "react";
import type { AttachmentGroupItem } from "./AttachmentTileGroup.d.ts";

export interface ResponseListItem {
  text: string;
  children?: ResponseListItem[];
}
export interface ResponseBlockSpec {
  /** h1-h4 use fixed 32/42, 24/32, 18/24, 14/18 px sizes with 8px top+bottom (--salt-spacing-50); every other type uses 16px bottom (--salt-spacing-100) only. Inline text (`text`) supports **bold**, *italic*, ~~strike~~, `code`, [anchor](url), and bare https:// URLs. */
  type: "h1" | "h2" | "h3" | "h4" | "body" | "blockquote" | "ol" | "ul" | "disclaimer" | "files" | "status" | "code" | "image" | "artifact" | "comparison" | "expandable";
  /** h1-h4, body, blockquote, disclaimer. */
  text?: string;
  /** status only — info/success/warning/error, rendered via StatusMessage. `text` becomes its body line. */
  status?: "info" | "success" | "warning" | "error";
  /** status only — optional bold title above the body line. */
  statusTitle?: string;
  /** code only — plain code (ignored when `diffLines` is set). Rendered via CodeBlock. */
  code?: string;
  /** code only — renders a diff view instead of plain code; see CodeBlock's CodeDiffLine. */
  diffLines?: import("../display/CodeBlock.d.ts").CodeDiffLine[];
  /** code only — language label shown top-left of the code panel. */
  language?: string;
  /** code only — header title (with a leading icon), overriding the `language` fallback label. Hidden on single-line code. */
  codeTitle?: string;
  /** image only — rendered via ImagePreview (Copy/Download/Expand toolbar on hover). Sibling "image" blocks in the same response are automatically grouped into one gallery, with Back/Next nav in the expand dialog. */
  imageSrc?: string;
  /** image only — alt text / Expand dialog title. */
  imageAlt?: string;
  /** artifact only — rendered via ArtifactCard. */
  artifact?: import("./ArtifactCard.d.ts").ArtifactCardProps;
  /** comparison only — two (or more) candidate responses rendered via AnswerComparison. */
  comparisonOptions?: import("./AnswerComparison.d.ts").AnswerComparisonOption[];
  /** expandable only — always-shown summary blocks (e.g. an AI overview). */
  summary?: ResponseBlockSpec[];
  /** expandable only — additional blocks revealed by the "View more" ghost button. */
  details?: ResponseBlockSpec[];
  /** expandable only — default "View more". */
  expandLabel?: string;
  /** expandable only — default "View less". */
  collapseLabel?: string;
  /** body only — attributes this paragraph to a source: an inline Tag (the platform name) appended after the text. Hover reveals a tear-out icon + tooltip (source title + description); click opens `url` in a new tab. */
  source?: { platform: string; title: string; description?: string; url: string };
  /** blockquote only — a single nested quote one level deeper. */
  children?: { text: string; children?: ResponseBlockSpec["children"] };
  /** ol/ul only. ol numbers 1 → a → i by depth; ul cycles solid dot → outline dot → solid caret → outline caret by depth. */
  items?: ResponseListItem[];
  /** files only — rendered as a FileResultsGrid (no Actions column, bottom-bordered header+rows). */
  files?: import("../data/FileResultsGrid.d.ts").FileResultsGridFile[];
  /** files only — extra columns beyond File name/Size, when the content has more to show. */
  columns?: import("../data/FileResultsGrid.d.ts").FileResultsGridColumn[];
}

export interface ConversationMessage {
  role: "user" | "agent" | "status" | "typing";
  text?: string;
  /** Agent messages only — structured response typography, rendered instead of `text` when present. */
  blocks?: ResponseBlockSpec[];
  /** Agent/typing display name. */
  name?: string;
  /** Agent message timestamp, e.g. "4:43pm". */
  time?: string;
  /** Status rows only — shows a check instead of the pending spinner. */
  done?: boolean;
  /** Typing rows only — label shown after the three dots, e.g. "Loading status content". Static or updated over time by the host for a dynamic status. */
  label?: string;
  /** User messages only — renders as an AttachmentTileGroup carousel above the bubble, or, when it's a single photo, a large aspect-ratio-preserved preview (max-height 320px, max-width 100% of the bubble column). */
  attachments?: AttachmentGroupItem[];
  /** User messages only — a Date, ISO string, or epoch ms. Shown (Mmm DD) in the hover toolbar, with the full Mmm DD, YYYY HH:MM:SS AM/PM timestamp as its tooltip. */
  timestamp?: Date | string | number;
  /** User messages only — total edited versions of this message. Shows a chevron/version-number nav in the hover toolbar when > 1. */
  versionCount?: number;
  /** User messages only — 1-based index of the currently shown version. */
  activeVersion?: number;
  /** Any role — marks this message as having occurred during a Test Mode session. Contiguous testMode messages are grouped into a single collapsed "Test Mode — N messages" Accordion. */
  testMode?: boolean;
  /** Agent messages only — current feedback state, "up"/"down"/undefined. Drives the Helpful/Not Helpful button highlight in the left-aligned action strip. */
  feedback?: "up" | "down";
  /** Agent messages only — current feedback state, "up"/"down"/undefined. Drives the Helpful/Not Helpful button highlight in the left-aligned action strip. */
  feedback?: "up" | "down";
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
  /** Wires the hover toolbar's Copy button on user messages. Omitted from the toolbar when not passed. */
  onCopyMessage?: (message: ConversationMessage, index: number) => void;
  /** Enables the Edit button on user messages (omitted when not passed). Clicking it opens an inline editor in place of the bubble; Submit calls this with the edited text, Cancel discards. */
  onSubmitEdit?: (message: ConversationMessage, newText: string, index: number) => void;
  /** Fires when either version-nav chevron is clicked. Only shown when a message's `versionCount` > 1. */
  onChangeVersion?: (message: ConversationMessage, newVersion: number, index: number) => void;
  /** Fires when the user picks an option in a "comparison" block. Receives the block and the picked index. */
  onSelectComparisonOption?: (block: ResponseBlockSpec, index: number) => void;
  /** Agent messages only — enables the Retry button in the left-aligned action strip beneath the response (omitted when not passed). */
  onRetryMessage?: (message: ConversationMessage, index: number) => void;
  /** Agent messages only — enables the Helpful/Not Helpful buttons; fires with "up"/"down". */
  onFeedback?: (message: ConversationMessage, sentiment: "up" | "down", index: number) => void;
  /** Agent messages only — enables the Download button in the action strip. */
  onDownloadMessage?: (message: ConversationMessage, index: number) => void;
  style?: React.CSSProperties;
}
export function ConversationArea(props: ConversationAreaProps): JSX.Element;
