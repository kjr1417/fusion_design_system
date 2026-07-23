import React from "react";

export type StaticListLabelPosition = "left" | "top";
export type StaticListLabelWidth = "hug" | "fluid" | "fixed";

/**
 * When used inside StaticListGroup with labelPosition "left" and labelWidth
 * "fluid", the group renders a shared grid so every row's label column
 * aligns to the widest label in the group (gridAlign is set internally).
 *
 * A single label/value pair. Label renders in
 * --salt-content-secondary-foreground at strong (semiBold) weight; the value
 * renders at the same weight as CopyValue's value (regular).
 *
 * labelWidth "hug" caps both label and value to a single line (ellipsis) with
 * spacing-100 between them. "fluid" and "fixed" allow up to two lines
 * (line-clamp) with spacing-300 between them. When labelPosition is "top",
 * neither label nor value is line-clamped.
 */
export interface StaticListProps {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Default "left". */
  labelPosition?: StaticListLabelPosition;
  /** Default "fluid". */
  labelWidth?: StaticListLabelWidth;
  /** Px width of the label column when labelWidth is "fixed". Default 140. */
  fixedWidth?: number;
  style?: React.CSSProperties;
}

export declare function StaticList(props: StaticListProps): JSX.Element;
