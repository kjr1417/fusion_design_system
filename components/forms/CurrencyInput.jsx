import React from "react";
import { Input } from "./Input.jsx";

export function CurrencyInput({ size = "medium", currencySymbol = "$", placeholder = "0.00", ...rest }) {
  return (
    <Input
      type="text"
      inputMode="decimal"
      size={size}
      placeholder={placeholder}
      startAdornment={<span style={{ fontFamily: "var(--salt-text-fontFamily)" }}>{currencySymbol}</span>}
      {...rest}
    />
  );
}
