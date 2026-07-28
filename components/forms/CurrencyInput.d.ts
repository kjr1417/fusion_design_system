import type { InputProps } from "./Input.d.ts";

export interface CurrencyInputProps extends Omit<InputProps, "type" | "startAdornment"> {
  size?: "medium" | "small";
  currencySymbol?: string;
}
/** Amount field with a currency-symbol start adornment (defaults to "$"). */
export function CurrencyInput(props: CurrencyInputProps): JSX.Element;
