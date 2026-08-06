import React from "react";

/**
 * Fusion PromptInputPlanCard — an overlay card that replaces the
 * composer's input box while the agent is working out how to respond.
 * `variant="summary"` shows a numbered list of the steps the agent will
 * take, plus an optional "modification" input at the bottom.
 * `variant="requirements"` shows a "Question # of #" label and one
 * clarifying question at a time (step it via the header's InlineButtons
 * — e.g. Back/Next), each with optional description text beneath it,
 * plus an optional "additional context" textarea at the bottom, shown
 * only for select-type questions. Questions can be free-text,
 * single-select (RadioButton), or multi-select (Checkbox). Clicking
 * "Close" (in `tertiaryActions`) lets the user skip the questions
 * entirely and have the agent proceed on its best guess. Enter in the
 * modification input or the additional-context textarea triggers
 * `primaryAction`.
 * Both variants show right-aligned InlineButtons in the card's
 * top-right corner.
 * Requires FusionDesignSystem_6db751 (Input, Textarea, FormField,
 * RadioButton, Checkbox, InlineButtons).
 */
export function PromptInputPlanCard({
  variant = "summary",
  title = variant === "requirements" ? undefined : "Here's my plan",
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
  const { Input, Textarea, FormField, InlineButtons, RadioButton, Checkbox } = window.FusionDesignSystem_6db751;
  const isRequirements = variant === "requirements";
  const currentQuestion = isRequirements ? (typeof questions[activeStep] === "string" ? { text: questions[activeStep], type: "text" } : questions[activeStep] || {}) : null;
  const submitOnEnter = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); primaryAction && primaryAction.onClick && primaryAction.onClick(); } };
  return (
    <div className="saltCard saltCard-primary" style={{ width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "var(--salt-spacing-150)", padding: "var(--salt-spacing-150)", borderRadius: "var(--salt-palette-corner-soft, 24px)", fontFamily: "var(--salt-text-fontFamily)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--salt-spacing-100)" }}>
        {isRequirements ? (
          <div style={{ fontFamily: "var(--salt-text-label-fontFamily)", fontSize: "var(--salt-text-label-fontSize)", lineHeight: "var(--salt-text-label-lineHeight)", color: "var(--salt-content-secondary-foreground)" }}>Question {activeStep + 1} of {questions.length}</div>
        ) : (
          <div style={{ fontSize: 16, fontWeight: "var(--salt-text-fontWeight-strong, 700)", color: "var(--salt-content-primary-foreground)" }}>{title}</div>
        )}
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
            <div style={{ fontSize: "var(--salt-text-fontSize)", fontWeight: "var(--salt-text-fontWeight-strong, 700)", color: "var(--salt-content-primary-foreground)", marginBottom: currentQuestion.description ? "var(--salt-spacing-50)" : "var(--salt-spacing-75)" }}>{currentQuestion.text}</div>
            {currentQuestion.description && (
              <div style={{ fontSize: "var(--salt-text-label-fontSize)", lineHeight: "var(--salt-text-label-lineHeight)", color: "var(--salt-content-secondary-foreground)", marginBottom: "var(--salt-spacing-75)" }}>{currentQuestion.description}</div>
            )}
            {currentQuestion.type === "single-select" && (
              <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-75)" }}>
                {(currentQuestion.options || []).map((opt) => (
                  <RadioButton key={opt.value} name={`plan-card-q${activeStep}`} value={opt.value} label={opt.label} checked={answers[activeStep] === opt.value} onChange={() => onAnswerChange && onAnswerChange(activeStep, opt.value)} />
                ))}
              </div>
            )}
            {currentQuestion.type === "multi-select" && (
              <div role="group" style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-75)" }}>
                {(currentQuestion.options || []).map((opt) => {
                  const selected = answers[activeStep] || [];
                  const checked = selected.includes(opt.value);
                  return (
                    <Checkbox key={opt.value} label={opt.label} checked={checked} onChange={() => onAnswerChange && onAnswerChange(activeStep, checked ? selected.filter((v) => v !== opt.value) : [...selected, opt.value])} />
                  );
                })}
              </div>
            )}
            {(!currentQuestion.type || currentQuestion.type === "text") && (
              <Input value={answers[activeStep] || ""} onChange={(e) => onAnswerChange && onAnswerChange(activeStep, e.target.value)} onKeyDown={submitOnEnter} placeholder="Your answer" style={{ width: "100%" }} />
            )}
          </div>
        </div>
      )}

      {!isRequirements && modification && (
        <FormField label="Add instructions" necessity="optional" style={{ marginBottom: 0 }}>
          <Input value={modification.value} onChange={modification.onChange} onKeyDown={submitOnEnter} placeholder={modification.placeholder || "Tell the agent what to change\u2026"} style={{ width: "100%" }} />
        </FormField>
      )}
      {isRequirements && additionalContext && (currentQuestion.type === "single-select" || currentQuestion.type === "multi-select") && (
        <FormField label="Additional context" necessity="optional" style={{ marginBottom: 0 }}>
          <Textarea value={additionalContext.value} onChange={additionalContext.onChange} onKeyDown={submitOnEnter} placeholder={additionalContext.placeholder || "Anything else the agent should know\u2026"} rows={2} style={additionalContext.style} />
        </FormField>
      )}
    </div>
  );
}
