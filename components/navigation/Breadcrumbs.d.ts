/**
 * Breadcrumbs show where the current page sits in a hierarchy — catalog drill-downs, nested settings.
 * Paths over 2 levels collapse to first + a "…" Menu of hidden levels + last, matching AppHeader.
 * Requires FusionDesignSystem_6db751.Menu loaded on the page, plus ./Breadcrumbs.css for the ellipsis hover state.
 */
export interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}
