import React, { useState } from "react";

const ICONS = {
  info: (<path d="M6 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2m1 3v5H5V5z" />),
  warning: (<path d="M5 8V5h2v3zm2 1.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />),
  success: (<path fillRule="evenodd" clipRule="evenodd" d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM3.20711 5.62132L2.5 6.32843L4.97487 8.8033L9.57107 4.20711L8.86396 3.5L4.97487 7.38909L3.20711 5.62132Z" />),
  error: (<path fillRule="evenodd" clipRule="evenodd" d="M9 0H3L0 3v6l3 3h6l3-3V3zM7 2H5v5h2zm-1 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />),
};
const COLOR = {
  info: "var(--salt-palette-info)",
  warning: "var(--salt-status-warning-foreground-decorative)",
  success: "var(--salt-palette-positive)",
  error: "var(--salt-status-error-foreground-decorative)",
};
const CloseGlyph = () => (
  <svg viewBox="0 0 12 12" width={12} height={12} fill="currentColor" aria-hidden="true">
    <path d="m5.999 5.292 3.89-3.888.707.707L6.707 6l3.889 3.889-.707.708-3.89-3.89-3.889 3.89-.707-.708L5.292 6 1.403 2.111l.707-.708z" />
  </svg>
);
const BannerGlyph = ({ status = "info" }) => (
  <svg viewBox="0 0 12 12" width={16} height={16} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, color: COLOR[status] || COLOR.info }}>
    {ICONS[status] || ICONS.info}
  </svg>
);

/**
 * Fusion BannerStack — a vertical list of dismissible status banners.
 * Success uses the `progress-complete` glyph, error uses `error-solid`
 * (info/warning reuse Banner's own glyphs); every row gets a trailing
 * transparent close IconButton. Dismissal is tracked internally by index
 * and also reported via `onDismiss` so a parent can sync its own list.
 * Requires FusionDesignSystem_6db751 (IconButton). Uses the verbatim
 * `.saltBanner`/`.saltBannerContent` classes from salt-components.css.
 */
export function BannerStack({ banners = [], onDismiss, gap = "var(--salt-spacing-100)", style }) {
  const { IconButton } = window.FusionDesignSystem_6db751;
  const [dismissed, setDismissed] = useState(() => new Set());
  const dismiss = (i) => { setDismissed((s) => new Set(s).add(i)); onDismiss?.(banners[i], i); };
  const visible = banners.some((b, i) => !dismissed.has(i));
  if (!visible) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, ...style }}>
      {banners.map((b, i) => !dismissed.has(i) && (
        <div key={i} className={`saltBanner saltBanner-${b.status || "info"} saltBanner-secondary`} role="status" style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)" }}>
          <BannerGlyph status={b.status} />
          <span className="saltBannerContent">{b.message}</span>
          <IconButton appearance="transparent" sentiment="neutral" aria-label="Dismiss" onClick={() => dismiss(i)}>
            <CloseGlyph />
          </IconButton>
        </div>
      ))}
    </div>
  );
}
