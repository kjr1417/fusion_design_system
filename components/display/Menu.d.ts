import React from "react";

interface MenuProps { items?: string[]; onSelect?: (item: string) => void; trigger?: string; triggerProps?: Record<string, unknown>; /** Trigger button look. "transparent" for icon-only triggers (e.g. a kebab) so no border ever shows, incl. on hover. Default "bordered". */ triggerAppearance?: "bordered" | "transparent"; }
/** The panel opens downward by default; if there's under 160px below the trigger and more room above, it flips to open upward instead — so it's never cut off near the bottom of the viewport. */
export function Menu(props: MenuProps): JSX.Element;
