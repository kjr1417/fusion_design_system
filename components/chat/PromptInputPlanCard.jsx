import React from "react";

/**
 * Fusion PromptInputPlanCard — an overlay card that replaces the
 * composer's input box while the agent is working out how to respond.
 * `variant="summary"` shows a numbered list of the steps the agent will
 * take, plus an optional "modification" input at the bottom.
 * `variant="requirements"` shows one clarifying question at a time
 * (step it via the header's InlineButtons — e.g. Back/Next) plus an
 * optional "additional context" textarea at the bottom. Both variants
 * show right-aligned InlineButtons in the card's top-right corner.
 * Requires FusionDesignSystem_6db751 (Input, Textarea, FormField,
 * InlineButtons).
 */
export function PromptInputPlanCard({
  variant = "summary",
  title = variant === "requirements" ? "A few quick questions" : "Here's my plan",
  steps = [],
  questions = [],
  activeStep = 0,
  answers = [],
  onAnswerChange,
  modification,
  additionalContext,
  primaryAction,
  secondaryActions = [],
  tertiaryActions = [],
  style,
}) {
  const { Input, Textarea, FormField, InlineButtons } = window.FusionDesignSystem_6db751;
  const isRequirements = variant === "requirements";
  return (
    <div className="saltCard saltCard-primary" style={{ width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "var(--salt-spacing-150)", padding: "var(--salt-spacing-150)", borderRadius: "var(--salt-palette-corner-soft, 24px)", fontFamily: "var(--salt-text-fontFamily)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--salt-spacing-100)" }}>
        <div style={{ fontSize: 16, fontWeight: "var(--salt-text-fontWeight-strong, 700)", color: "var(--salt-content-primary-foreground)" }}>{title}</div>
        {(primaryAction || secondaryActions.length > 0 || tertiaryActions.length > 0) && (
          <InlineButtons primaryAction={primaryAction} secondaryActions={secondaryActions} tertiaryActions={tertiaryActions} style={{ flexShrink: 0 }} />
        )}
      </div>

      {!isRequirements && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-100)" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "var(--salt-spacing-100)" }}>
              <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--salt-text-label-fontSize)", fontWeight: "var(--salt-text-fontWeight-strong)", background: "var(--salt-palette-accent)", color: "var(--salt-color-white)" }}>{i + 1}</span>
              <span style={{ fontSize: "var(--salt-text-fontSize)", lineHeight: "var(--salt-text-lineHeight)", color: "var(--salt-content-primary-foreground)", paddingTop: 1 }}>{s}</span>
            </div>
          ))}
        </div>
      )}

      {isRequirements && questions.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-150)" }}>
          <div>
            <div style={{ fontSize: "var(--salt-text-fontSize)", fontWeight: "var(--salt-text-fontWeight-strong, 700)", color: "var(--salt-content-primary-foreground)", marginBottom: "var(--salt-spacing-75)" }}>{questions[activeStep]}</div>
            <Input value={answers[activeStep] || ""} onChange={(e) => onAnswerChange && onAnswerChange(activeStep, e.target.value)} placeholder="Your answer" style={{ width: "100%" }} />
          </div>
        </div>
      )}

      {!isRequirements && modification && (
        <FormField label="Add instructions" necessity="optional" style={{ marginBottom: 0 }}>
          <Input value={modification.value} onChange={modification.onChange} placeholder={modification.placeholder || "Tell the agent what to change\u2026"} style={{ width: "100%" }} />
        </FormField>
      )}
      {isRequirements && additionalContext && (
        <FormField label="Additional context" necessity="optional" style={{ marginBottom: 0 }}>
          <Textarea value={additionalContext.value} onChange={additionalContext.onChange} placeholder={additionalContext.placeholder || "Anything else the agent should know\u2026"} rows={2} style={additionalContext.style} />
        </FormField>
      )}
    </div>
  );
}
