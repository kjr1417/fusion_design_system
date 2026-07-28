import React from "react";

/**
 * Fusion SectionHeader — the recurring header row that opens a form section:
 * optional error/info banners, a "* = Required field" note paired with a
 * "Show optional fields" Switch, the section title (H3, or H4 for the
 * compact "Chat Use Only" title variant), and an optional single-line
 * ExpandableText description.
 * Requires FusionDesignSystem_6db751 (Banner, Switch, H3, H4, ExpandableText).
 */
export function SectionHeader({
  titleVariant = "h3",
  title,
  description,
  showRequiredNote = true,
  showOptionalToggle = true,
  optionalToggleLabel = "Show optional fields",
  optionalToggleChecked,
  onOptionalToggleChange,
  errorBanners = [],
  infoBanners = [],
  style,
}) {
  const { Banner, Switch, H3, H4, ExpandableText } = window.FusionDesignSystem_6db751;
  const hasBanners = errorBanners.length > 0 || infoBanners.length > 0;
  const Title = titleVariant === "h4" ? H4 : H3;

  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }}>
      {hasBanners && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-100)" }}>
          {errorBanners.map((msg, i) => <Banner key={`e${i}`} status="error" variant="secondary">{msg}</Banner>)}
          {infoBanners.map((msg, i) => <Banner key={`i${i}`} status="info" variant="secondary">{msg}</Banner>)}
        </div>
      )}

      {(showRequiredNote || showOptionalToggle) && (
        <div style={{
          display: "flex", alignItems: "center", gap: "var(--salt-spacing-200)",
          marginTop: hasBanners ? "var(--salt-spacing-100)" : "var(--salt-spacing-150)",
        }}>
          {showRequiredNote && (
            <span style={{
              fontFamily: "var(--salt-text-fontFamily)", fontWeight: "var(--salt-text-label-fontWeight)",
              fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)",
              color: "var(--salt-content-primary-foreground)",
            }}>* = Required field</span>
          )}
          {showOptionalToggle && (
            <Switch label={optionalToggleLabel} checked={optionalToggleChecked} defaultChecked={optionalToggleChecked} onChange={onOptionalToggleChange} />
          )}
        </div>
      )}

      <Title style={{ margin: 0, marginTop: "var(--salt-spacing-200)", color: "var(--salt-content-primary-foreground)" }}>{title}</Title>

      {description && (
        <ExpandableText
          text={description}
          lines={1}
          style={{ marginTop: "var(--salt-spacing-100)", marginBottom: "var(--salt-spacing-300)" }}
          textStyle={{ color: "var(--salt-content-primary-foreground)" }}
        />
      )}
    </div>
  );
}
