import type { CSSProperties } from "react";
import type { InputProps } from "./Input.d.ts";

export interface DatePickerProps extends Omit<InputProps, "type" | "endAdornment"> {
  size?: "medium" | "small";
}
/** Text-entry date field (dd/mm/yyyy) with a calendar adornment. No calendar-grid overlay yet — request it if needed. */
export function DatePicker(props: DatePickerProps): JSX.Element;

export interface RangeDatePickerProps extends DatePickerProps {
  startPlaceholder?: string;
  endPlaceholder?: string;
  style?: CSSProperties;
}
/** Two DatePickers joined by an en dash — start/end of a single date range. */
export function RangeDatePicker(props: RangeDatePickerProps): JSX.Element;
