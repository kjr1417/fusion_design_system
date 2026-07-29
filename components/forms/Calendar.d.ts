import type { CSSProperties } from "react";

export interface DateRange { start: Date | null; end: Date | null; }

export interface CalendarProps {
  /** "single" selects one date; "range" picks a start/end pair over two clicks. */
  mode?: "single" | "range";
  /** Selected date ("single") or {start, end} ("range"), or null/undefined for none. Controlled — pair with onSelect. */
  value?: Date | DateRange | null;
  /** Fires with the new Date ("single") or the updated {start, end} ("range") on every click. */
  onSelect?: (value: Date | DateRange) => void;
  /** Month the grid opens on. Defaults to value's month, else the current month. */
  defaultMonth?: Date;
  size?: "medium" | "small";
  style?: CSSProperties;
}
/**
 * Salt-style month-grid calendar. Renders standalone (not a popover itself —
 * DatePicker/RangeDatePicker wrap it in an anchored overlay). Range mode
 * shows a live hover preview of the span while only the start is picked.
 */
export function Calendar(props: CalendarProps): JSX.Element;
