import type { ReactNode } from "react";

export interface ContentCardCta {
  label: string;
  href?: string;
  onClick?: (e: any) => void;
}

export type ContentCardAccent =
  | "data"
  | "ai"
  | "governance"
  | "technical"
  | "documentation"
  | { fill: string; bold: string; text: string }
  | string;

/**
 * Fusion ContentCard — the single, scalable card skeleton for the platform.
 * Product tiles, catalog results, feature promos, and registry entries all use
 * the same anatomy so cards stay consistent as the platform grows:
 *
 *   [ media banner OR icon tile ] → EYEBROW → Title → Description → footer
 *
 * Slots are optional; padding, type ramp, divider, and accent treatment are
 * fixed by the skeleton. Pass a domain key as `accent` to tint the eyebrow,
 * icon tile, media gradient, and CTA in one move.
 */
export interface ContentCardProps {
  /** "standard" = icon tile in the body; "media" = full-bleed top banner. */
  variant?: "standard" | "media";
  /** Banner content for variant="media" (image, illustration). Falls back to a large centered `icon`. */
  media?: ReactNode;
  /** Banner height in px (variant="media"). Default 200. */
  mediaHeight?: number;
  /** Icon glyph (rendered ~20px). Optional — defaults to the category's canonical icon. Shown as a tinted tile, inline chip, or enlarged in the banner. */
  icon?: ReactNode;
  /** "tile" = 44px rounded tile above the eyebrow; "inline" = small chip beside the eyebrow. Default "tile". */
  iconPlacement?: "tile" | "inline";
  /** Domain key, a {fill,bold,text} triplet, or a single color. Tints eyebrow / tile / banner / CTA. Alias of `category`. */
  accent?: ContentCardAccent;
  /** Category key (`data` · `ai` · `governance` · `technical` · `documentation`) — the source of truth for BOTH the categorical color AND the card's canonical icon. Preferred over `accent`. */
  category?: ContentCardAccent;
  /** Uppercase category label above the title. */
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Description line clamp. Default 2. */
  clamp?: number;
  /** Force the footer divider on/off. Defaults to on when a footer/cta exists. */
  divider?: boolean;
  /** Convenience footer: an accent link with a trailing arrow. Rendered ALL CAPS, verb-only recommended. */
  cta?: ContentCardCta;
  /** Arbitrary footer content (meta row, stats, action buttons). Overrides `cta`. */
  footer?: ReactNode;
  /** Make the whole card a button/link. Implied when href or onClick is set. */
  interactive?: boolean;
  href?: string;
  onClick?: (e: any) => void;
}
