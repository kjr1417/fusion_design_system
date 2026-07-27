export interface ExpandableTextProps {
  /** The full text content. Renders nothing when empty. */
  text?: string;
  /** Number of lines to clamp to before showing "View more". Default 1. */
  lines?: number;
  /** Style applied to the wrapper (e.g. margin-top for placement inside a pattern). */
  style?: React.CSSProperties;
  /** Style merged into the measured/rendered text (e.g. color, size overrides). */
  textStyle?: React.CSSProperties;
}

/**
 * Fusion ExpandableText — line-clamped text with an inline "View more" /
 * "View less" toggle that appears only when the text actually overflows
 * the given line count. Used inside PageHeader, SubHeader, and
 * SidePanelHeader for their description rows so expand/collapse behavior
 * stays identical everywhere it appears.
 */
export declare function ExpandableText(props: ExpandableTextProps): JSX.Element | null;
