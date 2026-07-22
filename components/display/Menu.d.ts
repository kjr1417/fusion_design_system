import React from "react";

interface MenuProps { items?: string[]; onSelect?: (item: string) => void; trigger?: string; triggerProps?: Record<string, unknown>; }
export function Menu(props: MenuProps): JSX.Element;
