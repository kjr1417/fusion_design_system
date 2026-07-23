import React from "react";

export interface StaticListGroupItem {
  label: React.ReactNode;
  value: React.ReactNode;
}

export type StaticListGroupOrientation = "horizontal" | "vertical";

/**
 * Arranges StaticList items as: a single dot-separated row (orientation
 * "horizontal", columns 1), a stacked single column (orientation "vertical",
 * columns 1), or side-by-side columns (columns 2 or 3) split sequentially
 * from the flat items array, each pair of columns separated by spacing-600
 * either side of an optional vertical divider.
 *
 * Default row gap is spacing-fixed-100 when labelPosition is "left" and
 * spacing-250 when labelPosition is "top"; override with rowGap.
 */
export interface StaticListGroupProps {
  items: StaticListGroupItem[];
  /** Default "vertical". Ignored when columns > 1. */
  orientation?: StaticListGroupOrientation;
  /** Default 1. */
  columns?: 1 | 2 | 3;
  /** Show a vertical rule between columns. Default true. Only applies when columns > 1. */
  dividers?: boolean;
  /** Default "left". */
  labelPosition?: "left" | "top";
  /** Default "fluid". */
  labelWidth?: "hug" | "fluid" | "fixed";
  fixedWidth?: number;
  /** CSS length overriding the default gap between rows within a column. */
  rowGap?: string;
  style?: React.CSSProperties;
}

export declare function StaticListGroup(props: StaticListGroupProps): JSX.Element;
