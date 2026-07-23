/**
 * A short monospaced value (an id, key, or code) with a click-to-copy icon button.
 * Shows a check icon for 1.5s after copying. Requires ./CopyValue.css for the
 * copy button's transparent/grey hover state (not covered by salt-components.css).
 */
export interface CopyValueProps {
  /** The value shown and copied to the clipboard. */
  value?: string;
  onCopy?: (value: string) => void;
  style?: React.CSSProperties;
}

export declare function CopyValue(props: CopyValueProps): JSX.Element;
