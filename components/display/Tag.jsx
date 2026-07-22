import React from "react";

const CATEGORY = {
  accent: "saltTag-category-1",
  positive: "saltTag-category-2",
  negative: "saltTag-category-3",
  neutral: "saltTag-category-4",
};

export function Tag({ children, color = "neutral", variant = "primary", bordered = false }) {
  const cls = [
    "saltTag",
    `saltTag-${variant}`,
    bordered ? "saltTag-bordered" : "",
    CATEGORY[color] || CATEGORY.neutral,
  ].filter(Boolean).join(" ");
  return <span className={cls}>{children}</span>;
}
