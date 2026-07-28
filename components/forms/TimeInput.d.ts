import type { InputProps } from "./Input.d.ts";

export interface TimeInputProps extends Omit<InputProps, "type" | "endAdornment"> {
  size?: "medium" | "small";
}
/** Text-entry time field with a clock adornment. */
export function TimeInput(props: TimeInputProps): JSX.Element;
