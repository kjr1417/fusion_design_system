import React from "react";

export function Table({ variant = "primary", zebra = false, divider = "primary", className = "", style, children, ...rest }) {
  const cls = ["saltTable", `saltTable-${variant}`, zebra ? "saltTable-zebra" : "", `saltTable-divider-${divider}`, className].filter(Boolean).join(" ");
  return (
    <div className="saltTable-container">
      <table className={cls} style={style} {...rest}>{children}</table>
    </div>
  );
}
export function TableHead({ variant = "primary", divider = "primary", sticky = false, children }) {
  return <thead className={["saltTable-thead", `saltTable-thead-${variant}`, `saltTable-thead-divider-${divider}`, sticky ? "saltTable-thead-sticky" : ""].filter(Boolean).join(" ")}>{children}</thead>;
}
export function TableBody({ children }) { return <tbody>{children}</tbody>; }
export function TableRow({ children }) { return <tr>{children}</tr>; }
export function TableCell({ align = "left", header = false, scope, children }) {
  const Tag = header ? "th" : "td";
  return <Tag scope={scope} className={`saltTable-${header ? "th" : "td"}-align-${align}`}>{children}</Tag>;
}
