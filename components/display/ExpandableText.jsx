import React, { useState, useRef, useEffect } from "react";

/**
 * Fusion ExpandableText — a line-clamped text block with an inline
 * "View more" / "View less" toggle that appears only when the text
 * actually overflows the given number of lines. Shared expand/collapse
 * behavior used by PageHeader, SubHeader, and SidePanelHeader description
 * rows — update it once and every pattern that embeds it updates too.
 * Requires ./ExpandableText.css.
 */
export function ExpandableText({ text, lines = 1, style, textStyle }) {
  const [expanded, setExpanded] = useState(false);
  const [displayText, setDisplayText] = useState(text);
  const [truncated, setTruncated] = useState(false);
  const measureRef = useRef(null);

  useEffect(() => {
    const el = measureRef.current;
    if (!el || !text) return;
    const measure = () => {
      const lineHeightPx = parseFloat(getComputedStyle(el).lineHeight) || 0;
      const maxHeight = lineHeightPx * lines + 1;
      el.textContent = text;
      if (el.scrollHeight <= maxHeight) { setTruncated(false); setDisplayText(text); return; }
      const words = text.split(" ");
      let lo = 0, hi = words.length, best = 0;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        el.textContent = words.slice(0, mid).join(" ") + "\u2026 View more";
        if (el.scrollHeight <= maxHeight) { best = mid; lo = mid + 1; } else { hi = mid - 1; }
      }
      setTruncated(true);
      setDisplayText(words.slice(0, best).join(" "));
    };
    measure();
    const parent = el.parentElement;
    const ro = new ResizeObserver(measure);
    if (parent) ro.observe(parent);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [text, lines]);

  if (!text) return null;

  const sharedTextStyle = {
    fontFamily: "var(--salt-text-fontFamily)", fontWeight: "var(--salt-text-fontWeight)",
    fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)",
    ...textStyle,
  };

  return (
    <div style={{ position: "relative", minWidth: 0, ...style }}>
      <p aria-hidden="true" ref={measureRef} style={{
        position: "absolute", top: 0, left: 0, right: 0, visibility: "hidden", pointerEvents: "none", margin: 0,
        ...sharedTextStyle,
      }} />
      <p style={{
        margin: 0, textWrap: "pretty",
        display: !truncated || expanded ? "block" : "-webkit-box", WebkitBoxOrient: "vertical",
        WebkitLineClamp: !truncated || expanded ? "unset" : lines, overflow: !truncated || expanded ? "visible" : "hidden",
        color: "var(--salt-content-secondary-foreground)",
        ...sharedTextStyle,
      }}>
        {expanded ? text + " " : (truncated ? displayText + "\u2026 " : text)}
        {truncated && (
          <button type="button" className="et-view-more" onClick={() => setExpanded((v) => !v)}>{expanded ? "View less" : "View more"}</button>
        )}
      </p>
    </div>
  );
}
