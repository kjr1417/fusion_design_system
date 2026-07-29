import type { CSSProperties } from "react";
import type { InputProps } from "./Input.d.ts";

export interface DatePickerProps extends Omit<InputProps, "type" | "endAdornment"> {
  size?: "medium" | "small";
}
/** Text-entry date field with a calendar adornment. Empty state placeholder defaults to "dd mmm yyyy" (Salt's abbreviated format) to show the expected pattern. Populate with an already-formatted date string — "18 Mar 2026" (Salt default abbreviated) or "March 18, 2026" (US convention for global audiences) — and use the same format across every date field in a form. No calendar-grid overlay yet — request it if needed. */
export function DatePicker(props: DatePickerProps): JSX.Element;

export interface RangeDatePickerProps extends DatePickerProps {
  startPlaceholder?: string;
  endPlaceholder?: string;
  style?: CSSProperties;
}
/** Two DatePickers joined by an en dash — start/end of a single date range. */
export function RangeDatePicker(props: RangeDatePickerProps): JSX.Element;
