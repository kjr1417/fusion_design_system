import type { HTMLAttributes, ReactNode } from "react";

/**
 * Field label + control + persistent helper text, from Salt's FormField
 * anatomy. Label sits left-aligned above the control; required fields get
 * a trailing "*"; an optional `toggletip` renders a click-to-open info
 * glyph inline after the label for supplementary (non-essential) guidance.
 *
 * Helper text is always shown (never hidden) and always italic. Pass
 * `helperLinkText`/`helperLinkHref` to append an inline underlined accent
 * link at the end of the helper text.
 *
 * Pass `error` + `errorMessage` to swap the helper text for an error
 * message: it turns red and gets a leading error glyph; long messages wrap
 * with the icon pinned to the left and text never wrapping under it. The
 * message is announced to assistive tech (role="alert") and wired to the
 * field via aria-invalid/aria-describedby when the field is FormField's
 * single child. Pair with a control using `validationState="error"` (Input,
 * MultilineInput, ComboBox, Dropdown, DatePicker, NumberInput,
 * CurrencyInput, TimeInput) so the field itself shows the matching red
 * border/background and a red circle adornment. Never render a success
 * variant — valid fields simply return to default styling.
 */
export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  helperText?: ReactNode;
  helperLinkText?: string;
  helperLinkHref?: string;
  necessity?: "required" | "optional";
  toggletip?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode;
  children?: ReactNode;
}
