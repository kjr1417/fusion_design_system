import type { ReactNode } from "react";
import type { ButtonBarAction } from "../actions/ButtonBar";

/** Bottom sheet that slides up from the base of the viewport. */
export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  /** CSS height of the sheet. Default "70vh". */
  height?: string;
  primaryAction?: ButtonBarAction;
  secondaryActions?: ButtonBarAction[];
  tertiaryActions?: ButtonBarAction[];
}
export function Drawer(props: DrawerProps): JSX.Element;
