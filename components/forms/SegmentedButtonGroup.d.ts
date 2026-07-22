import React from "react";
interface SegmentedOption { value: string; label: React.ReactNode; }
interface SegmentedButtonGroupProps {
  options?: (string | SegmentedOption)[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export function SegmentedButtonGroup(props: SegmentedButtonGroupProps): JSX.Element;
