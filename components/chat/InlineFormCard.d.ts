import type { CSSProperties } from "react";
import type { ComboBoxMetadataOption } from "../forms/ComboBoxMetadataOverlay";
import type { FileUploadFile } from "../forms/FileUpload";

export interface InlineFormCardStep {
  /** Custom 14px/18 line-height bold title. */
  title: string;
  /** Clamped to a maximum of two lines, 14px/18. */
  description?: string;
  fieldLabel?: string;
  fieldPlaceholder?: string;
  fieldHelperText?: string;
  fieldNecessity?: "required" | "optional";
  /** Populates the ComboBoxMetadataOverlay's options (each row can carry a metadata line). */
  options?: ComboBoxMetadataOption[];
  /** Default 3. */
  maxSelections?: number;
  browseAllLabel?: string;
  uploadVariant?: "dropzone" | "button";
  uploadTitle?: string;
  uploadDescription?: string;
}

/**
 * Inline-form response card: title, two-line description, a
 * ComboBoxMetadataOverlay field (multi-select, max 3), a FileUpload
 * pattern, and right-aligned Skip (outlined) / Next (primary) buttons.
 * Pass 2+ `steps` for a multi-step chat form — InlineFormCard tracks the
 * active step and each step's selections/files itself.
 */
export interface InlineFormCardProps {
  steps: InlineFormCardStep[];
  skipLabel?: string;
  nextLabel?: string;
  /** Label for the primary button on the last step. Default "Finish". */
  finishLabel?: string;
  /** Shown between Skip and Next/Finish once past the first step. Default "Back". */
  backLabel?: string;
  onStepChange?: (index: number) => void;
  onSkip?: (index: number) => void;
  /** Fired when Next/Finish is pressed on the last step. */
  onComplete?: (result: { selections: Record<number, string[]>; files: Record<number, FileUploadFile[]> }) => void;
  style?: CSSProperties;
}
export function InlineFormCard(props: InlineFormCardProps): JSX.Element;
