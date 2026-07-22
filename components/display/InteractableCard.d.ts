import React from "react";
interface InteractableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "tertiary";
  accent?: "top" | "bottom" | "left" | "right";
  disabled?: boolean;
  selected?: boolean;
}
export function InteractableCard(props: InteractableCardProps): JSX.Element;
