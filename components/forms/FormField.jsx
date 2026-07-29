import React from "react";
import { Toggletip } from "./Toggletip.jsx";
import { Link } from "../actions/Link.jsx";

export function FormField({
  label,
  necessity,
  toggletip,
  helperText,
  helperLinkText,
  helperLinkHref = "#",
  error = false,
  errorMessage,
  children,
  style,
  ...rest
}) {
  const showError = !!(error && errorMessage);
  const autoId = React.useId();
  const isSingleElement = React.isValidElement(children) && React.Children.count(children) === 1;
  const fieldId = (isSingleElement && children.props.id) || `field-${autoId}`;
  const errorId = `${fieldId}-error`;
  const renderedChildren = isSingleElement
    ? React.cloneElement(children, {
        id: fieldId,
        "aria-invalid": showError ? true : children.props["aria-invalid"],
        "aria-describedby": showError ? [children.props["aria-describedby"], errorId].filter(Boolean).join(" ") : children.props["aria-describedby"],
      })
    : children;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-25)", marginBottom: "var(--salt-spacing-300)", ...style }} {...rest}>
      {label && (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)" }}>
          <label htmlFor={isSingleElement ? fieldId : undefined} style={{
            display: "block",
            flex: "0 1 auto",
            minWidth: 0,
            whiteSpace: "normal",
            overflowWrap: "break-word",
            fontFamily: "var(--salt-text-label-fontFamily)",
            fontWeight: "var(--salt-text-fontWeight-strong)",
            fontSize: "var(--salt-text-label-fontSize)",
            lineHeight: "var(--salt-text-label-lineHeight)",
            color: "var(--salt-content-primary-foreground)",
          }}>
            {label}
            {necessity === "required" && <span style={{ color: "inherit" }}>*</span>}
            {necessity === "optional" && <span style={{ color: "var(--salt-content-secondary-foreground)", fontWeight: "var(--salt-text-fontWeight)" }}> (optional)</span>}
          </label>
          {toggletip && <span style={{ flex: "none" }}><Toggletip content={toggletip} /></span>}
        </div>
      )}
      {renderedChildren}
      {showError ? (
        <span
          id={errorId}
          role="alert"
          style={{
            display: "flex", alignItems: "center", gap: "var(--salt-spacing-25)",
            fontFamily: "var(--salt-text-label-fontFamily)",
            fontStyle: "italic",
            fontSize: "var(--salt-text-label-fontSize)",
            lineHeight: "var(--salt-text-label-lineHeight)",
            color: "var(--salt-palette-negative)",
          }}
        >
          <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" style={{ flex: "none", fill: "var(--salt-palette-negative)" }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M9 0H3L0 3v6l3 3h6l3-3V3zM7 2H5v5h2zm-1 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2"></path>
          </svg>
          <span style={{ flex: 1 }}>{errorMessage}</span>
        </span>
      ) : helperText ? (
        <span style={{
          fontFamily: "var(--salt-text-label-fontFamily)",
          fontStyle: "italic",
          fontSize: "var(--salt-text-label-fontSize)",
          lineHeight: "var(--salt-text-label-lineHeight)",
          color: "var(--salt-content-secondary-foreground)",
        }}>
          {helperText}
          {helperLinkText && (
            <>
              {" "}
              <Link href={helperLinkHref} variant="accent" underline="default" style={{ fontFamily: "inherit", fontStyle: "italic", fontSize: "inherit", lineHeight: "inherit" }}>{helperLinkText}</Link>
            </>
          )}
        </span>
      ) : null}
    </div>
  );
}
