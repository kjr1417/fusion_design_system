/**
 */
export interface ToggleButtonGroupProps {
  options: { label: string; value: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}
