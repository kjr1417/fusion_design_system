import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M12 6.5v-1H1.915l3.147-3.146-.708-.707L0 6l4.353 4.354.707-.707L1.914 6.5z" />
  </svg>
);
const CloseGlyph = () => (
  <svg className="saltIcon" viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true">
    <path d="m5.999 5.292 3.89-3.888.707.707L6.707 6l3.889 3.889-.707.708-3.89-3.89-3.889 3.89-.707-.708L5.292 6 1.403 2.111l.707-.708z" />
  </svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.564.293a1 1 0 0 0-1.415 0L6.735 1.707l3.536 3.536 1.414-1.415a1 1 0 0 0 0-1.414zm-.354 1.06a.5.5 0 0 0-.707 0l-.354.354 2.122 2.121.353-.353a.5.5 0 0 0 0-.707z" />
    <path d="m7.442 3.828.707.708L4.26 8.425a.5.5 0 1 1-.707-.707z" />
    <path d="m8.857 5.243.707.707-4.243 4.242L0 12l1.786-5.343 4.207-4.208.707.707-4.03 4.031-.796 2.387.53.53 2.387-.795z" />
  </svg>
);

const hiddenStyle = { position: "absolute", top: 0, left: 0, visibility: "hidden", height: 0, overflow: "hidden", pointerEvents: "none", whiteSpace: "nowrap" };
const GAP_100 = 16;
const MIN_TITLE_W = 48;

/**
 * Fusion SidePanelHeader — the header block for SidePanel: title row,
 * a 2-line-clamped description, and a metadata row matching PageHeader's.
 *
 * The title row collapses on width collision in this order: 1) drop the
 * secondary info text, 2) shrink action buttons to icon-only (edit glyph),
 * 3) drop action buttons entirely, 4) truncate the title itself — so the
 * truncated title and close button are always the last two things shown.
 * The metadata row never wraps; items that don't fit collapse into a
 * "+n" trigger that lists them on hover.
 *
 * Requires FusionDesignSystem_6db751 (H2, Text, Button, IconButton, Tag,
 * StatusBadge, CopyValue) plus ./SidePanelHeader.css.
 */
export function SidePanelHeader({
  title,
  secondaryInfo,
  onBack,
  actions = [],
  onClose,
  description,
  primaryTag,
  secondaryTag,
  status,
  copyValue,
  onCopy,
  dataLabels = [],
  style,
}) {
  const { H2, Text, Button, IconButton, Tag, StatusBadge, CopyValue } = window.FusionDesignSystem_6db751;
  const [expanded, setExpanded] = useState(false);
  const [displayText, setDisplayText] = useState(description);
  const [truncated, setTruncated] = useState(false);
  const measureRef = useRef(null);

  useEffect(() => {
    const el = measureRef.current;
    if (!el || !description) return;
    const measure = () => {
      const lineHeightPx = parseFloat(getComputedStyle(el).lineHeight) || 0;
      const maxHeight = lineHeightPx * 2 + 1;
      el.textContent = description;
      if (el.scrollHeight <= maxHeight) { setTruncated(false); setDisplayText(description); return; }
      const words = description.split(" ");
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
    const ro = new ResizeObserver(measure);
    ro.observe(el.parentElement);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [description]);

  const visibleActions = actions.slice(0, 2);
  const hasMeta = primaryTag || secondaryTag || status || copyValue || dataLabels.length > 0;

  const metaItems = [];
  if (primaryTag) metaItems.push({ key: "primaryTag", node: <Tag color="accent">{primaryTag}</Tag>, label: primaryTag });
  if (secondaryTag) metaItems.push({ key: "secondaryTag", node: <Tag color="positive">{secondaryTag}</Tag>, label: secondaryTag });
  if (status) metaItems.push({ key: "status", node: <StatusBadge status={status.label} />, label: status.label });
  if (copyValue) metaItems.push({ key: "copyValue", node: <CopyValue value={copyValue} onCopy={onCopy} />, label: copyValue });
  dataLabels.forEach((label, i) => metaItems.push({ key: `label-${i}`, node: <Text variant="label" color="secondary">{label}</Text>, label }));

  // --- title row collision handling ---
  const rowRef = useRef(null);
  const fixedMeasureRef = useRef(null);
  const secondaryMeasureRef = useRef(null);
  const actionsFullMeasureRef = useRef(null);
  const actionsIconMeasureRef = useRef(null);
  const titleMeasureRef = useRef(null);
  const [rowLayout, setRowLayout] = useState({ showSecondary: true, actionsMode: "full" });

  const recomputeRow = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const available = row.clientWidth;
    const fixedW = fixedMeasureRef.current ? fixedMeasureRef.current.offsetWidth : 0;
    const secondaryW = secondaryInfo && secondaryMeasureRef.current ? secondaryMeasureRef.current.offsetWidth + GAP_100 : 0;
    const actionsFullW = visibleActions.length && actionsFullMeasureRef.current ? actionsFullMeasureRef.current.offsetWidth + GAP_100 : 0;
    const actionsIconW = visibleActions.length && actionsIconMeasureRef.current ? actionsIconMeasureRef.current.offsetWidth + GAP_100 : 0;
    // require the title's FULL natural width until every other collapse step is exhausted,
    // so secondary info (and then actions) are dropped before the title itself ever shrinks.
    const titleFullW = titleMeasureRef.current ? titleMeasureRef.current.offsetWidth : MIN_TITLE_W;

    let showSecondary = true, actionsMode = "full";
    if (fixedW + secondaryW + actionsFullW + titleFullW > available) {
      showSecondary = false;
      if (fixedW + actionsFullW + titleFullW > available) {
        actionsMode = "icon";
        if (fixedW + actionsIconW + titleFullW > available) {
          actionsMode = "none";
        }
      }
    }
    setRowLayout((prev) => (prev.showSecondary === showSecondary && prev.actionsMode === actionsMode ? prev : { showSecondary, actionsMode }));
  }, [secondaryInfo, visibleActions.length]);

  useLayoutEffect(() => {
    recomputeRow();
    const row = rowRef.current;
    if (!row || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(recomputeRow);
    ro.observe(row);
    return () => ro.disconnect();
  }, [recomputeRow]);

  // --- metadata row overflow handling ---
  const metaRowRef = useRef(null);
  const metaItemMeasureRefs = useRef([]);
  const [metaVisibleCount, setMetaVisibleCount] = useState(metaItems.length);

  const recomputeMeta = useCallback(() => {
    const row = metaRowRef.current;
    if (!row || metaItems.length === 0) return;
    const available = row.clientWidth;
    const OVERFLOW_W = 44;
    let used = 0, count = 0;
    for (let i = 0; i < metaItems.length; i++) {
      const el = metaItemMeasureRefs.current[i];
      const w = el ? el.offsetWidth : 0;
      const gap = i > 0 ? GAP_100 : 0;
      const remaining = metaItems.length - (i + 1);
      const reserve = remaining > 0 ? OVERFLOW_W + GAP_100 : 0;
      if (used + gap + w + reserve <= available) { used += gap + w; count = i + 1; } else { break; }
    }
    setMetaVisibleCount((prev) => (prev === count ? prev : count));
  }, [metaItems.length]);

  useLayoutEffect(() => {
    recomputeMeta();
    const row = metaRowRef.current;
    if (!row || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(recomputeMeta);
    ro.observe(row);
    return () => ro.disconnect();
  }, [recomputeMeta]);


  const hiddenMetaCount = metaItems.length - metaVisibleCount;
  const metaOverflowTriggerRef = useRef(null);
  const [metaTooltipPlacement, setMetaTooltipPlacement] = useState(null);

  const openMetaTooltip = useCallback(() => {
    const el = metaOverflowTriggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const estH = metaItems.length * 28 + 16;
    setMetaTooltipPlacement(r.bottom + 8 + estH > window.innerHeight ? "top" : "bottom");
  }, [metaItems.length]);

  return (
    <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, fontFamily: "var(--salt-text-fontFamily)", ...style }}>
      <div ref={rowRef} style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
        {/* hidden measurement layer for title-row collision */}
        <div aria-hidden="true" ref={fixedMeasureRef} style={{ ...hiddenStyle, display: "flex", alignItems: "center" }}>
          {onBack && <IconButton appearance="transparent" sentiment="neutral" aria-label="Back"><ArrowLeftIcon /></IconButton>}
          <div style={{ width: MIN_TITLE_W }} />
          <IconButton appearance="transparent" sentiment="neutral" aria-label="Close"><CloseGlyph /></IconButton>
        </div>
        <div aria-hidden="true" ref={titleMeasureRef} style={{ ...hiddenStyle, fontFamily: "var(--salt-text-fontFamily)" }}><H2 style={{ margin: 0 }}>{title}</H2></div>
        {secondaryInfo && (
          <div aria-hidden="true" ref={secondaryMeasureRef} style={hiddenStyle}><Text>{secondaryInfo}</Text></div>
        )}
        {visibleActions.length > 0 && (
          <div aria-hidden="true" ref={actionsFullMeasureRef} style={{ ...hiddenStyle, display: "flex", gap: "var(--salt-spacing-100)" }}>
            {visibleActions.map((a, i) => <Button key={i} appearance="bordered" sentiment="neutral">{a.label}</Button>)}
          </div>
        )}
        {visibleActions.length > 0 && (
          <div aria-hidden="true" ref={actionsIconMeasureRef} style={{ ...hiddenStyle, display: "flex", gap: "var(--salt-spacing-100)" }}>
            {visibleActions.map((a, i) => <IconButton key={i} appearance="bordered" sentiment="neutral" aria-label={a.label}><EditIcon /></IconButton>)}
          </div>
        )}

        {onBack && (
          <IconButton appearance="transparent" sentiment="neutral" aria-label="Back" onClick={onBack} style={{ flexShrink: 0, marginRight: "var(--salt-spacing-100)" }}>
            <ArrowLeftIcon />
          </IconButton>
        )}
        <div style={{ display: "flex", alignItems: "baseline", gap: "var(--salt-spacing-100)", minWidth: 0, flex: "1 1 auto" }}>
          <H2 style={{ margin: 0, minWidth: 0, flex: rowLayout.showSecondary || rowLayout.actionsMode !== "none" ? "0 0 auto" : "0 1 auto", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</H2>
          {rowLayout.showSecondary && secondaryInfo && (
            <Text style={{ flexShrink: 0, whiteSpace: "nowrap", color: "var(--salt-content-secondary-foreground)" }}>{secondaryInfo}</Text>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0, marginLeft: "var(--salt-spacing-150)" }}>
          {rowLayout.actionsMode === "full" && visibleActions.map((action, i) => (
            <Button key={i} appearance="bordered" sentiment="neutral" onClick={action.onClick} style={{ flexShrink: 0, marginRight: "var(--salt-spacing-100)" }}>{action.label}</Button>
          ))}
          {rowLayout.actionsMode === "icon" && visibleActions.map((action, i) => (
            <IconButton key={i} appearance="bordered" sentiment="neutral" aria-label={action.label} onClick={action.onClick} style={{ flexShrink: 0, marginRight: "var(--salt-spacing-100)" }}><EditIcon /></IconButton>
          ))}
          <IconButton appearance="transparent" sentiment="neutral" aria-label="Close" onClick={onClose} style={{ flexShrink: 0 }}>
            <CloseGlyph />
          </IconButton>
        </div>
      </div>

      {description && (
        <div style={{ marginTop: "var(--salt-spacing-100)", position: "relative" }}>
          <p aria-hidden="true" ref={measureRef} style={{
            position: "absolute", top: 0, left: 0, right: 0, visibility: "hidden", pointerEvents: "none", margin: 0,
            fontFamily: "var(--salt-text-fontFamily)", fontWeight: "var(--salt-text-fontWeight)",
            fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)",
          }} />
          <p style={{
            margin: 0, textWrap: "pretty",
            display: !truncated || expanded ? "block" : "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: !truncated || expanded ? "unset" : 2, overflow: !truncated || expanded ? "visible" : "hidden",
            fontFamily: "var(--salt-text-fontFamily)", fontWeight: "var(--salt-text-fontWeight)",
            fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)",
            color: "var(--salt-content-secondary-foreground)",
          }}>
            {expanded ? description + " " : (truncated ? displayText + "\u2026 " : description)}
            {truncated && (
              <button type="button" className="sph-view-more sph-view-more-inline" onClick={() => setExpanded((v) => !v)}>{expanded ? "View less" : "View more"}</button>
            )}
          </p>
        </div>
      )}

      {hasMeta && (
        <div ref={metaRowRef} style={{ display: "flex", alignItems: "center", flexWrap: "nowrap", marginTop: "var(--salt-spacing-100)", position: "relative" }}>
          <div aria-hidden="true" style={{ ...hiddenStyle, display: "flex" }}>
            {metaItems.map((item, i) => (
              <div key={item.key} ref={(el) => { metaItemMeasureRefs.current[i] = el; }}>{item.node}</div>
            ))}
          </div>
          {metaItems.slice(0, metaVisibleCount).map((item, i) => (
            <div key={item.key} style={{ flexShrink: 0, whiteSpace: "nowrap", marginRight: i < metaVisibleCount - 1 || hiddenMetaCount > 0 ? "var(--salt-spacing-150)" : 0 }}>{item.node}</div>
          ))}
          {hiddenMetaCount > 0 && (
            <div style={{ position: "relative", flexShrink: 0 }}>
              <button
                ref={metaOverflowTriggerRef}
                type="button"
                className="sph-meta-overflow"
                aria-label={`${hiddenMetaCount} more`}
                onMouseEnter={openMetaTooltip}
                onMouseLeave={() => setMetaTooltipPlacement(null)}
                onFocus={openMetaTooltip}
                onBlur={() => setMetaTooltipPlacement(null)}
              >
                +{hiddenMetaCount}
              </button>
              {metaTooltipPlacement && (
                <div className="sph-meta-overflow-panel" style={{
                  position: "absolute", right: 0, zIndex: 100,
                  top: metaTooltipPlacement === "bottom" ? "calc(100% + var(--salt-spacing-100))" : "auto",
                  bottom: metaTooltipPlacement === "top" ? "calc(100% + var(--salt-spacing-100))" : "auto",
                }}>
                  {metaItems.slice(metaVisibleCount).map((item) => (
                    <div key={item.key} className="sph-meta-overflow-item">{item.node}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
