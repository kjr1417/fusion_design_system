import type { InputHTMLAttributes } from "react";

/**
 * Checkbox works uncontrolled (`defaultChecked`) or controlled (`checked` +
 * `onChange`) — pass `checked` to drive it externally, as `CheckboxGroup` does.
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  disabled?: boolean;
}
export function Checkbox(props: CheckboxProps): JSX.Element;

export interface CheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}
/** Vertical or horizontal set of checkboxes sharing one change handler and value array. */
export interface CheckboxGroupProps {
  options: CheckboxGroupOption[];
  defaultValue?: string[];
  direction?: "vertical" | "horizontal";
  onChange?: (values: string[]) => void;
  style?: React.CSSProperties;
}
export function CheckboxGroup(props: CheckboxGroupProps): JSX.Element;
