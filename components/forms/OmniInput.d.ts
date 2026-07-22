import type { ReactNode, ComponentType } from "react";

export interface OmniSuggestion {
  label: string;
  /** Optional leading icon component (rendered at 16px). */
  icon?: ComponentType<any>;
}

/**
 * Fusion OmniInput — the platform's primary conversational entry point, the
 * way most user flows begin (like a Claude/Gemini prompt bar). A glowing
 * multiline prompt field with an animated typewriter placeholder that cycles
 * guidance prompts, an attach ("+") button, a mode selector, an accent send
 * button, and optional suggestion chips below the field.
 *
 * Use once, centered, as the hero of a landing/home surface. `onSend` fires
 * on send-click or Cmd/Ctrl+Enter with the current text and selected mode.
 */
export interface OmniInputProps {
  /** Prompts cycled through the animated placeholder (only while empty). */
  placeholders?: string[];
  /** Options for the mode selector dropdown; first is the default. */
  modes?: string[];
  /** Items in the "+" attach menu (each with an optional leading icon). */
  attachOptions?: OmniSuggestion[];
  /** Suggestion chips shown below the field. Pass [] to hide. */
  suggestions?: OmniSuggestion[];
  /** Initial field value. */
  defaultValue?: string;
  /** Called with (text, mode) on send. */
  onSend?: (text: string, mode: string) => void;
}
