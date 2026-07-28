import React from "react";
import { Input } from "./Input.jsx";

export function NumberInput({ size = "medium", placeholder = "0", ...rest }) {
  return <Input type="number" size={size} placeholder={placeholder} style={{ textAlign: "left" }} {...rest} />;
}
