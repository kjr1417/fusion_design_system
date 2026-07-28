import React from "react";
import { Input } from "./Input.jsx";

const ClockIcon = () => (<svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M6 3V6H3V7H7V3H6Z"></path><path fillRule="evenodd" clipRule="evenodd" d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"></path></svg>);

export function TimeInput({ size = "medium", placeholder = "--:-- AM", ...rest }) {
  return <Input type="text" size={size} placeholder={placeholder} endAdornment={<ClockIcon />} {...rest} />;
}
