import type { ReactNode } from "react";

export interface ChatLayoutProps {
  globalNavProps?: Record<string, unknown>;
  /** Controlled open state for the chat-history rail — pass with onHistoryOpenChange to drive it externally. */
  historyOpen?: boolean;
  defaultHistoryOpen?: boolean;
  onHistoryOpenChange?: (open: boolean) => void;
  historyWidth?: number;
  /** Hovering the collapsed rail flies it out to historyWidth with a shadow, without persisting the expanded state (matches VerticalNavigation). Default true. */
  historyExpandOnHover?: boolean;
  /** Chat history content. Structural placeholder shown when omitted. */
  chatHistory?: ReactNode;
  /** Chat experience content — fully replaces the built-in welcome/conversation states when passed. */
  chatExperience?: ReactNode;
  /** Welcome-screen headline, Display2. Default "Welcome Message". */
  welcomeTitle?: ReactNode;
  /** Optional welcome-screen subtext, H2. */
  welcomeDescription?: ReactNode;
  /** Helper/disclaimer text below the welcome prompt input, styled like FormField's helper text. */
  promptHelperText?: ReactNode;
  /** Extra content (980–1280px, centered) below the welcome prompt input. */
  swappableContent?: ReactNode;
  /** Title shown in the conversation header once a prompt is sent. */
  chatTitle?: string;
  /** Controlled open state for the preview panel — pass with onPreviewOpenChange to drive it externally. Fully closable, unlike the history rail (which only collapses to a 44px icon rail). */
  previewOpen?: boolean;
  defaultPreviewOpen?: boolean;
  onPreviewOpenChange?: (open: boolean) => void;
  /** Minimum drag width of the preview panel, in px. Default 360. */
  previewMinWidth?: number;
  previewDefaultWidth?: number;
  previewMaxWidth?: number;
  previewHeader?: ReactNode;
  /** File/HTML preview content. Structural placeholder shown when omitted. */
  previewContent?: ReactNode;
  showFooter?: boolean;
  footerProps?: Record<string, unknown>;
}
export function ChatLayout(props: ChatLayoutProps): JSX.Element;
