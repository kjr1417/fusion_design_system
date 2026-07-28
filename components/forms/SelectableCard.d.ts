import type { CSSProperties, ReactNode } from "react";

/**
 * A bordered, clickable tile that acts as a radio (single-select, `multiple`
 * false — default) or checkbox (`multiple` true) instead of an inline
 * control. Group several in a GridLayout/FlexLayout for "pick a plan" /
 * "pick a data source" style choices; use `name` to associate single-select
 * cards in the same group.
 */
export interface SelectableCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  value?: string;
  name?: string;
  multiple?: boolean;
  selected?: boolean;
  defaultSelected?: boolean;
  disabled?: boolean;
  onChange?: (selected: boolean, value?: string) => void;
  style?: CSSProperties;
}
export function SelectableCard(props: SelectableCardProps): JSX.Element;
