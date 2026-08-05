import React from "react";

interface MenuProps { items?: string[]; onSelect?: (item: string) => void; trigger?: string; triggerProps?: Record<string, unknown>; /** Trigger button look. "transparent" for icon-only triggers (e.g. a kebab) so no border ever shows, incl. on hover. Default "bordered". */ triggerAppearance?: "bordered" | "transparent"; }
export function Menu(props: MenuProps): JSX.Element;
