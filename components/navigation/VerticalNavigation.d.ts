import React from "react";

export interface VerticalNavLevel2Item {
  id: string;
  label: string;
  href?: string;
}
export interface VerticalNavLevel0Item {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  items?: VerticalNavLevel2Item[];
}
export interface VerticalNavigationProps {
  items?: VerticalNavLevel0Item[];
  /** Enables the footer hamburger toggle that switches between 45px and 230px. Default false = always open. */
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  /** When collapsed, hovering the rail flies it out to 230px with a shadow, without persisting the expanded state. */
  expandOnHover?: boolean;
  /** Hides all icons (Level 0 glyphs + Support glyph). Pair with an external trigger (e.g. a header hamburger) since there is no 45px icon rail to fall back to. */
  showIcons?: boolean;
  /** Set false when an external control (e.g. a header hamburger) owns expand/collapse — hides the built-in footer toggle button. */
  showFooterToggle?: boolean;
  /** Controlled collapsed state — pass with onCollapsedChange to drive the panel from an external trigger instead of collapsible's internal toggle. */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  defaultOpenIds?: string[];
  activeId?: string;
  onNavigate?: (item: VerticalNavLevel0Item | VerticalNavLevel2Item) => void;
  supportLabel?: string;
  supportIcon?: string;
  supportHref?: string;
  onSupportClick?: () => void;
  style?: React.CSSProperties;
}
export function VerticalNavigation(props: VerticalNavigationProps): JSX.Element;
