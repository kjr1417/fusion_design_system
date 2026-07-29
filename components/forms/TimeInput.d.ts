import type { InputProps } from "./Input.d.ts";

export interface TimeInputProps extends Omit<InputProps, "type" | "endAdornment"> {
  size?: "medium" | "small";
}
/** Text-entry time field with a clock adornment. Empty state placeholder defaults to "hh mm aa" (two-digit hour, two-digit minute, AM/PM) to show the expected pattern. */
export function TimeInput(props: TimeInputProps): JSX.Element;
