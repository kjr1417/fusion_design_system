import React from "react";
import { IconButton } from "../actions/IconButton.jsx";

/* Fusion Carousel — a horizontal, scroll-snapping track of items with paged
   prev/next controls. Built for card rows ("Get started", "Recommended for
   you", catalog shelves). Items never shrink below `minItemWidth` (default
   348px); when the row is wide enough they grow to share the space evenly, and
   when it isn't they overflow and scroll. */

const ChevronLeft = () => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>);
const ChevronRight = () => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>);

const carouselStyle = `
.fusionCarousel{font-family:var(--salt-text-fontFamily)}
.fusionCarousel-track{display:flex;flex-wrap:nowrap;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none;-ms-overflow-style:none}
.fusionCarousel-track::-webkit-scrollbar{display:none}
.fusionCarousel-track>*{scroll-snap-align:start}
`;

export function Carousel({
  children,
  title,
  subtitle,
  minItemWidth = 348,
  gap = "var(--salt-spacing-200)",
  controls = true,
  controlsPlacement = "bottom",
  className = "",
  style,
  ...rest
}) {
  const trackRef = React.useRef(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);

  const update = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  React.useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [update]);

  const page = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.85, minItemWidth), behavior: "smooth" });
  };

  const items = React.Children.toArray(children).map((child, i) => (
    <div key={i} style={{ flex: `1 0 ${typeof minItemWidth === "number" ? minItemWidth + "px" : minItemWidth}`, minWidth: 0 }}>{child}</div>
  ));

  const nav = controls && (
    <div style={{ display: "flex", gap: "var(--salt-spacing-100)", flexShrink: 0 }}>
      <IconButton appearance="bordered" sentiment="neutral" aria-label="Previous" onClick={() => page(-1)} disabled={atStart}><ChevronLeft /></IconButton>
      <IconButton appearance="bordered" sentiment="neutral" aria-label="Next" onClick={() => page(1)} disabled={atEnd}><ChevronRight /></IconButton>
    </div>
  );

  const header = (title || subtitle || (controls && controlsPlacement === "top")) && (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--salt-spacing-200)", marginBottom: "var(--salt-spacing-300)" }}>
      <div>
        {title && <h2 style={{ margin: 0, fontFamily: "var(--salt-text-h2-fontFamily, var(--salt-text-fontFamily))", fontSize: 28, lineHeight: 1.2, fontWeight: "var(--salt-text-fontWeight-strong)", color: "var(--salt-content-primary-foreground)" }}>{title}</h2>}
        {subtitle && <p style={{ margin: title ? "var(--salt-spacing-50) 0 0" : 0, fontSize: 16, color: "var(--salt-content-secondary-foreground)" }}>{subtitle}</p>}
      </div>
      {controlsPlacement === "top" && nav}
    </div>
  );

  return (
    <div className={["fusionCarousel", className].filter(Boolean).join(" ")} style={style} {...rest}>
      <style>{carouselStyle}</style>
      {header}
      <div ref={trackRef} className="fusionCarousel-track" style={{ gap }}>{items}</div>
      {controls && controlsPlacement === "bottom" && (
        <div style={{ marginTop: "var(--salt-spacing-200)" }}>{nav}</div>
      )}
    </div>
  );
}
