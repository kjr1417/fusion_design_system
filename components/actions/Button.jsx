import React from "react";

const APPEARANCE = { solid: "saltButton-solid", bordered: "saltButton-bordered", transparent: "saltButton-transparent" };
const SENTIMENT = { accented: "saltButton-accented", neutral: "saltButton-neutral", negative: "saltButton-negative", positive: "saltButton-positive", caution: "saltButton-caution" };

export function Button({
  appearance = "bordered",
  sentiment = "neutral",
  disabled = false,
  loading = false,
  children,
  className = "",
  style,
  ...rest
}) {
  const cls = [
    "saltButton",
    SENTIMENT[sentiment] || SENTIMENT.neutral,
    APPEARANCE[appearance] || APPEARANCE.bordered,
    loading ? "saltButton-loading" : "",
    disabled ? "saltButton-disabled" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <button className={cls} disabled={disabled} style={style} {...rest}>
      {children}
    </button>
  );
}
