import type { ReactNode } from "react";

export interface BannerStackItem {
  status?: "info" | "success" | "warning" | "error";
  message?: ReactNode;
}

export interface BannerStackProps {
  banners?: BannerStackItem[];
  /** Fired when a banner's close button is clicked (it is also hidden internally). */
  onDismiss?: (banner: BannerStackItem, index: number) => void;
  /** Gap between banners. Default var(--salt-spacing-100). */
  gap?: string;
  style?: React.CSSProperties;
}

export function BannerStack(props: BannerStackProps): JSX.Element | null;
