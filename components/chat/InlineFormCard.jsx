import React, { useState } from "react";

/**
 * Fusion InlineFormCard — chat-native form card: bold title (14px/18),
 * a two-line-clamped description, a ComboBoxMetadataOverlay field
 * (multi-select, max 3 by default), and a FileUpload pattern, with
 * Skip (outlined) / Next (primary) right-aligned inline buttons.
 * Accepts multiple `steps`; tracks the active step plus each step's
 * selections/uploaded files internally, advancing on Skip or Next and
 * calling `onComplete` after the last step.
 * Requires FusionDesignSystem_6db751 (Card, FormField,
 * ComboBoxMetadataOverlay, FileUpload, InlineButtons).
 */
export function InlineFormCard({
  steps = [],
  skipLabel = "Skip",
  nextLabel = "Next",
  finishLabel = "Finish",
  backLabel = "Back",
  onStepChange,
  onSkip,
  onComplete,
  style,
}) {
  const { Card, FormField, ComboBoxMetadataOverlay, FileUpload, InlineButtons } = window.FusionDesignSystem_6db751;
  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [files, setFiles] = useState({});

  if (steps.length === 0) return null;
  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  const advance = () => {
    if (isLast) { onComplete && onComplete({ selections, files }); return; }
    const next = stepIndex + 1;
    setStepIndex(next);
    onStepChange && onStepChange(next);
  };
  const goBack = () => {
    const prev = stepIndex - 1;
    setStepIndex(prev);
    onStepChange && onStepChange(prev);
  };
  const handleSkip = () => { onSkip && onSkip(stepIndex); advance(); };

  const handleFiles = (picked) => {
    const rows = picked.map((f, i) => ({ id: `${stepIndex}-${Date.now()}-${i}`, name: f.name, size: f.size }));
    setFiles((prev) => ({ ...prev, [stepIndex]: [...(prev[stepIndex] || []), ...rows] }));
  };
  const handleDeleteFile = (file) => {
    setFiles((prev) => ({ ...prev, [stepIndex]: (prev[stepIndex] || []).filter((f) => f.id !== file.id) }));
  };

  return (
    <Card variant="secondary" style={{ maxWidth: 440, ...style }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-200)" }}>
        {steps.length > 1 && (
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--salt-content-secondary-foreground)" }}>
            Step {stepIndex + 1} of {steps.length}
          </div>
        )}
        <div>
          <div style={{ fontSize: 14, lineHeight: "18px", fontWeight: "var(--salt-text-fontWeight-strong)", color: "var(--salt-content-primary-foreground)" }}>{step.title}</div>
          {step.description && (
            <div style={{ fontSize: 14, lineHeight: "18px", color: "var(--salt-content-secondary-foreground)", marginTop: "var(--salt-spacing-50)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {step.description}
            </div>
          )}
        </div>
        <FormField label={step.fieldLabel || "Sources"} necessity={step.fieldNecessity} helperText={step.fieldHelperText}>
          <ComboBoxMetadataOverlay
            key={stepIndex}
            options={step.options || []}
            multiselect
            maxSelections={step.maxSelections ?? 3}
            placeholder={step.fieldPlaceholder || "Search…"}
            defaultValue={selections[stepIndex] || []}
            onChange={(v) => setSelections((prev) => ({ ...prev, [stepIndex]: v }))}
            browseAllLabel={step.browseAllLabel || "Browse All"}
          />
        </FormField>
        <FileUpload
          key={`fu-${stepIndex}`}
          variant={step.uploadVariant || "dropzone"}
          title={step.uploadTitle || "Attach supporting files"}
          description={step.uploadDescription}
          files={files[stepIndex] || []}
          onFilesSelected={handleFiles}
          onDelete={handleDeleteFile}
          style={{ marginBottom: 0 }}
        />
        <InlineButtons
          direction="right-to-left"
          primaryAction={{ label: isLast ? finishLabel : nextLabel, onClick: advance }}
          secondaryActions={stepIndex > 0 ? [{ label: skipLabel, onClick: handleSkip }, { label: backLabel, onClick: goBack }] : [{ label: skipLabel, onClick: handleSkip }]}
        />
      </div>
    </Card>
  );
}
