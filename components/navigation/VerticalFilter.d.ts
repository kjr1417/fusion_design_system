import type { ReactNode } from "react";

export interface VerticalFilterOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface VerticalFilterGroup {
  id: string;
  label: string;
  /** "checkbox" (multi-select) or "radio" (single-select). */
  type: "checkbox" | "radio";
  options: VerticalFilterOption[];
  /** Placeholder for the group's local search box (only shown once options.length > 8). Default "Search". */
  searchPlaceholder?: string;
}

export interface VerticalFilterComboBoxProps {
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  multiselect?: boolean;
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  [key: string]: unknown;
}

export interface VerticalFilterProps {
  /** Header title. Default "Filters". */
  title?: string;
  /** Set false to omit the header row (title + Clear all + expand/collapse-all) entirely. Default true. */
  showHeader?: boolean;
  clearAllLabel?: string;
  /** Optional field rendered below the header with its own top label (no helper text) — e.g. a category jump-to. Omit to skip it. */
  comboBox?: VerticalFilterComboBoxProps;
  /** Optional vertical page-tab list rendered above everything else (own section, own icon + label per row) — e.g. switching the whole panel's context between content types. 16px gap below. Omit to skip it. */
  pageTabs?: { id: string; label: string; icon: ReactNode; count?: number | string }[];
  selectedPageTab?: string;
  onPageTabChange?: (id: string) => void;
  /** The accordion groups, top to bottom. */
  groups: VerticalFilterGroup[];
  /** Controlled selections keyed by group id — a string[] for "checkbox" groups, a string (or undefined) for "radio" groups. */
  values?: Record<string, string[] | string | undefined>;
  /** Fired when a selection changes in any group, with that group's new value. */
  onChange?: (groupId: string, value: string[] | string | null) => void;
  /** Fired by the header's "Clear all" button. Omit to let VerticalFilter clear every group itself via onChange. */
  onClearAll?: () => void;
  /** Accordion index (or indices) open by default. Default [0] — first group open. */
  defaultOpen?: number[];
  style?: React.CSSProperties;
}

/**
 * Persistent (always-visible, non-collapsible) faceted filter rail. See
 * VerticalFilter.prompt.md for the full behavior spec (search, paging,
 * badges).
 */
export function VerticalFilter(props: VerticalFilterProps): JSX.Element;
