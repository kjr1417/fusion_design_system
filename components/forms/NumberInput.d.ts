import type { InputProps } from "./Input.d.ts";

export interface NumberInputProps extends Omit<InputProps, "type"> {
  size?: "medium" | "small";
}
/** Numeric text field (native number input, no stepper arrows drawn). */
export function NumberInput(props: NumberInputProps): JSX.Element;
