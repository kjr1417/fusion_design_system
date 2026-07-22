import type { ReactNode } from "react";

/**
 */
export interface DrawerProps {
  open: boolean;
  title: string;
  side?: "left" | "right";
  onClose: () => void;
  children?: ReactNode;
}
