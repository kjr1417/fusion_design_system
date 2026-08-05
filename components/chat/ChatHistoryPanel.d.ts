export interface ChatHistoryItem {
  id: string;
  title: string;
  active?: boolean;
  /** Shows an 8x8 accent-background draft dot spacing-100 after the title; always visible \u2014 the title truncates first if space runs out. */
  draft?: boolean;
  onClick?: () => void;
  /** Overflow menu items for the hover-revealed kebab (micro-menu.svg), opened via the design system's Menu. Defaults to Rename/Share/Delete. */
  menuItems?: string[];
  onMenuSelect?: (item: string) => void;
  /** Forces the hover look (background + visible kebab) \u2014 for documenting the hover state, e.g. in a states matrix. */
  hovered?: boolean;
}
export interface ChatHistoryGroup {
  /** Group label, e.g. "Today", "Previous 7 days". */
  label: string;
  items: ChatHistoryItem[];
}

/**
 * A left-anchored, fixed-width chat-list rail: 300px expanded, 45px
 * collapsed \u2014 never resizable. New chat (primary button) + optional
 * search + grouped, date-labeled chat rows, and a footer collapse/expand
 * toggle ported from VerticalNavigation. Collapsed, hovering the Search
 * icon button or the footer flies the rail out to 300px; hovering New
 * Chat does not (it only fires `onNewChat` on click).
 */
export interface ChatHistoryPanelProps {
  /** Controlled collapsed state \u2014 pass with onCollapsedChange to drive it externally. */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Hovering the Search icon button or the footer flies the collapsed rail out to 300px. Default true. */
  expandOnHover?: boolean;
  onNewChat?: () => void;
  /** Hides the New chat button/icon entirely \u2014 true only while a brand-new, still-empty chat (zero sent prompts) is open; an unsent draft in a chat that already has history does not hide it. Default false. */
  hideNewChat?: boolean;
  /** Shows the search field/icon. Default true. */
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  /** Chats grouped under date-style labels, in display order. */
  groups?: ChatHistoryGroup[];
  /** Shown when every group is empty. */
  emptyStateText?: string;
  style?: React.CSSProperties;
}
export function ChatHistoryPanel(props: ChatHistoryPanelProps): JSX.Element;
