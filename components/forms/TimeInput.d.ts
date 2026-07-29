import type { CSSProperties } from "react";

export interface TimeInputProps {
  /** "12h" adds a meridiem (AM/PM) segment; "24h" omits it. Default "12h". */
  mode?: "12h" | "24h";
  /** Adds the seconds segment (ss). Off by default — reserved for technical use cases; most fields should omit it. */
  showSeconds?: boolean;
  /** Formatted time string: "hh:mm[:ss] AA" (12h) or "hh:mm[:ss]" (24h), e.g. "09:30 AM" or "14:05:30". Controlled if `value` is provided (pair with onChange); otherwise the field manages its own state, seeded from defaultValue. */
  value?: string;
  defaultValue?: string;
  onChange?: (e: { target: { value: string } }) => void;
  disabled?: boolean;
  /** Force the error state (red border/background); the field also flags itself once a segment is touched and left incomplete or out of range. */
  validationState?: "error" | "warning" | "success";
  style?: CSSProperties;
}
/**
 * Segmented time field: independently-typeable hh / mm / (optional ss) /
 * (12h only) aa units joined by fixed colons, spacing-50 gap around each
 * colon and a double-space gap before the meridiem segment. Typing two
 * digits in a unit auto-advances to the next; clicking or tabbing into a
 * unit highlights it (same highlight token as ComboBox's type-ahead match).
 * Digits are rejected in the meridiem segment and letters elsewhere; typing
 * "a"/"p" fills the meridiem segment immediately. Typing a digit into an
 * already-full segment starts a fresh value (overwrites, doesn't block).
 * ArrowUp/ArrowDown increment/decrement the focused hh/mm/ss segment
 * (wrapping at its valid range) or toggle AM/PM in the meridiem segment.
 * Valid ranges: hh 01–12
 * (12h) or 00–23 (24h), mm/ss 00–59; incomplete or out-of-range entries
 * shown with the error style once the field has been touched. Always
 * renders at the compact field size and never stretches to fill its
 * container — size the containing layout around it, not the reverse.
 */
export function TimeInput(props: TimeInputProps): JSX.Element;
