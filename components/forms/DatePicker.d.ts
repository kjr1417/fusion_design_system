import type { CSSProperties } from "react";
import type { InputProps } from "./Input.d.ts";

export interface DatePickerProps extends Omit<InputProps, "type" | "endAdornment"> {
  size?: "medium" | "small";
  /** Formatted date string, e.g. "18 Mar 2026" — matches the placeholder pattern. Controlled if provided (pair with onChange); otherwise the field manages its own text, seeded from defaultValue. */
  value?: string;
  defaultValue?: string;
}
/** Text-entry date field with a calendar adornment. Clicking the adornment opens a Salt calendar-grid popover (month view, prev/next nav, today ring); picking a day writes the formatted date into the field and closes the popover. Empty state placeholder defaults to "dd mmm yyyy" (Salt's abbreviated format). Populate/receive dates as "18 Mar 2026" (Salt default abbreviated) or "March 18, 2026" (US convention) — use the same format across every date field in a form. */
export function DatePicker(props: DatePickerProps): JSX.Element;

export interface DateRangeValue { start: string; end: string; }
export interface RangeDatePickerProps {
  size?: "medium" | "small";
  startPlaceholder?: string;
  endPlaceholder?: string;
  /** {start, end} formatted date strings. Controlled if provided (pair with onChange); otherwise the field manages its own state. */
  value?: DateRangeValue;
  defaultValue?: DateRangeValue;
  onChange?: (value: DateRangeValue) => void;
  style?: CSSProperties;
}
/** Two DatePickers joined by an en dash, sharing one Salt calendar popover in range-select mode — opened from either field's calendar icon. First click sets the range start, second sets the end (auto-ordered chronologically) and fills both fields, closing the popover; a live hover preview shows the span as you move toward the second click. */
export function RangeDatePicker(props: RangeDatePickerProps): JSX.Element;
