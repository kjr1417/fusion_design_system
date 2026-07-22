import React from "react";

/* Fusion ContentCard — the single, scalable card skeleton for the platform.
   Built on Salt's own card container (.saltCard / .saltInteractableCard), so
   border, radius, shadow, hover, and focus all come from Salt verbatim.

   Every product tile, catalog result, feature promo, and registry entry uses
   the same anatomy so cards stay consistent as the platform grows:

     [ media banner  OR  icon tile ]
     EYEBROW (category, categorical color)
     Title
     Description (line-clamped)
     ───────────────  (divider, when a footer is present)
     footer slot  (cta link · meta row · action buttons)

   The `category` (aka `accent`) prop is the source of truth for BOTH the
   categorical color AND the icon — pass a category key and the card colors its
   eyebrow / tile / banner / CTA and shows that category's canonical icon. */

const ICONS = {
  data: (s) => (<svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></svg>),
  ai: (s) => (<svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z" /><path d="M18 15l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6Z" /></svg>),
  governance: (s) => (<svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 5 6v6c0 4 3 7 7 8 4-1 7-4 7-8V6Z" /><path d="m9 12 2 2 4-4" /></svg>),
  technical: (s) => (<svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 4.5a4 4 0 0 0-5.3 4.8L4 15.5 8.5 20l6.2-6.2a4 4 0 0 0 4.8-5.3l-2.7 2.7-2.5-.5-.5-2.5Z" /></svg>),
  documentation: (s) => (<svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h9l4 4v14H6Z" /><path d="M15 3v4h4M9 12h6M9 16h6" /></svg>),
};

const CATEGORIES = {
  data: { fill: "var(--domain-data-fill)", bold: "var(--domain-data-bold)", text: "var(--domain-data-text)" },
  ai: { fill: "var(--domain-ai-fill)", bold: "var(--domain-ai-bold)", text: "var(--domain-ai-text)" },
  governance: { fill: "var(--domain-governance-fill)", bold: "var(--domain-governance-bold)", text: "var(--domain-governance-text)" },
  technical: { fill: "var(--domain-technical-fill)", bold: "var(--domain-technical-bold)", text: "var(--domain-technical-text)" },
  documentation: { fill: "var(--domain-documentation-fill)", bold: "var(--domain-documentation-bold)", text: "var(--domain-documentation-text)" },
};

function resolveCategory(key) {
  if (!key) return { fill: "var(--salt-color-gray-100)", bold: "var(--salt-color-gray-700)", text: "var(--salt-content-secondary-foreground)", cta: "var(--salt-content-primary-foreground)", iconFn: null };
  if (typeof key === "object") return { cta: key.text, iconFn: null, ...key };
  const c = CATEGORIES[key];
  if (c) return { ...c, cta: c.text, iconFn: ICONS[key] };
  return { fill: key, bold: key, text: key, cta: key, iconFn: null };
}

const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ccStyle = `
.fusionContentCard{display:flex;flex-direction:column;height:100%;font-family:var(--salt-text-fontFamily);text-decoration:none;color:inherit;--saltCard-padding:0}
.fusionContentCard *{box-sizing:border-box}
.fusionContentCard-cta{display:inline-flex;align-items:center;gap:6px;font-weight:var(--salt-text-fontWeight-strong);font-size:13px;text-decoration:none;background:none;border:none;padding:0;cursor:pointer;font-family:inherit}
.fusionContentCard-cta svg{transition:transform var(--salt-duration-instant) ease}
.saltInteractableCard:hover .fusionContentCard-cta svg,.fusionContentCard-cta:hover svg{transform:translateX(3px)}
`;

export function ContentCard({
  variant = "standard",
  media,
  mediaHeight = 190,
  icon,
  iconPlacement = "tile",
  accent,
  category,
  eyebrow,
  title,
  description,
  clamp = 2,
  divider,
  cta,
  footer,
  interactive,
  href,
  onClick,
  className = "",
  style,
  ...rest
}) {
  const a = resolveCategory(category || accent);
  const clickable = interactive || !!href || !!onClick;
  const hasFooter = !!footer || !!cta;
  const showDivider = divider !== undefined ? divider : hasFooter;
  const pad = "var(--salt-spacing-300)";
  const glyph = (size) => (icon !== undefined ? icon : (a.iconFn ? a.iconFn(size) : null));

  const iconTile = glyph(22) && (
    <div style={{ display: "grid", placeItems: "center", width: 44, height: 44, flexShrink: 0, borderRadius: "var(--salt-palette-corner-weak)", background: a.fill, color: a.bold }}>{glyph(22)}</div>
  );
  const eyebrowEl = eyebrow && (
    <span style={{ fontSize: 12, fontWeight: "var(--salt-text-fontWeight-strong)", letterSpacing: ".07em", textTransform: "uppercase", color: a.text }}>{eyebrow}</span>
  );
  const ctaEl = cta && (
    <a href={cta.href || undefined} onClick={cta.onClick} className="fusionContentCard-cta" style={{ color: a.cta, textTransform: "uppercase", letterSpacing: ".06em" }}>
      {cta.label}<ArrowRight />
    </a>
  );

  const baseCls = clickable ? "saltInteractableCard saltInteractableCard-primary" : "saltCard saltCard-primary";
  const Tag = href ? "a" : "div";
  const interactiveProps = clickable
    ? (href ? { href } : { role: "button", tabIndex: 0, onClick, onKeyDown: (e) => { if ((e.key === "Enter" || e.key === " ") && onClick) { e.preventDefault(); onClick(e); } } })
    : {};

  return (
    <Tag className={["fusionContentCard", baseCls, className].filter(Boolean).join(" ")} style={style} {...interactiveProps} {...rest}>
      <style>{ccStyle}</style>

      {variant === "media" && (
        <div style={{ height: mediaHeight, flexShrink: 0, display: "grid", placeItems: "center", background: `linear-gradient(160deg, ${a.fill}, color-mix(in srgb, ${a.fill} 35%, var(--salt-container-primary-background)))`, color: a.bold, overflow: "hidden" }}>
          {media || (glyph(44) && <div style={{ display: "inline-flex" }}>{glyph(44)}</div>)}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-100)", padding: pad, flex: 1 }}>
        {variant !== "media" && iconPlacement === "tile" && iconTile && (
          <div style={{ marginBottom: "var(--salt-spacing-100)" }}>{iconTile}</div>
        )}

        {variant !== "media" && iconPlacement === "inline" && (glyph(18) || eyebrow) ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {glyph(18) && <span style={{ display: "inline-flex", color: a.bold }}>{glyph(18)}</span>}
            {eyebrowEl}
          </div>
        ) : eyebrowEl}

        {title && (
          <h3 style={{ margin: 0, fontFamily: "var(--salt-text-h4-fontFamily, var(--salt-text-fontFamily))", fontSize: 18, lineHeight: 1.25, fontWeight: "var(--salt-text-fontWeight-strong)", color: "var(--salt-content-primary-foreground)" }}>{title}</h3>
        )}

        {description && (
          <p style={{ margin: 0, fontSize: "var(--salt-text-fontSize)", lineHeight: 1.5, color: "var(--salt-content-secondary-foreground)", display: "-webkit-box", WebkitLineClamp: clamp, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{description}</p>
        )}

        {hasFooter && (
          <div style={{ marginTop: "auto", paddingTop: "var(--salt-spacing-200)" }}>
            {showDivider && <div style={{ height: 1, background: "var(--salt-separable-secondary-borderColor, var(--salt-color-gray-200))", margin: "0 0 var(--salt-spacing-200)" }} />}
            {footer || ctaEl}
          </div>
        )}
      </div>
    </Tag>
  );
}
