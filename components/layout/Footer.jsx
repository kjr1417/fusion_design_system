import React from "react";

/**
 * Fusion Footer — 29px-tall global utility bar: legal/policy links on the
 * left, copyright on the right. Placeholder link set — update per product.
 */
export function Footer({
  links = ["Terms of Use", "Disclosure", "Security", "Privacy Policy", "Mobile", "Cookies Policy"],
  onLinkClick,
  copyrightText = `\u00A9 ${new Date().getFullYear()} Fusion. All rights reserved.`,
  style,
}) {
  return (
    <footer
      className="fusionFooter"
      style={{
        height: 29, boxSizing: "border-box", flexShrink: 0, display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: "var(--salt-spacing-200)",
        padding: "0 var(--salt-spacing-200)", background: "var(--salt-container-primary-background)",
        borderTop: "1px solid var(--salt-separable-secondary-borderColor)",
        fontFamily: "var(--salt-text-fontFamily)", fontSize: 11, color: "var(--salt-content-secondary-foreground)",
        ...style,
      }}
    >
      <nav aria-label="Legal" style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-200)", overflow: "hidden", whiteSpace: "nowrap" }}>
        {links.map((l, i) => (
          <a
            key={i}
            href="#"
            className="fusionFooter-link"
            onClick={(e) => { e.preventDefault(); onLinkClick && onLinkClick(l); }}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {l}
          </a>
        ))}
      </nav>
      <span style={{ flexShrink: 0, whiteSpace: "nowrap" }}>{copyrightText}</span>
      <style>{`.fusionFooter-link:hover{text-decoration:underline;color:var(--salt-content-primary-foreground)}`}</style>
    </footer>
  );
}
