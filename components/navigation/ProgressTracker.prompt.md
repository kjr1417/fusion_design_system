`ProgressTracker` is a vertical, custom Fusion wizard tracker for multi-step forms (e.g. the "Create Knowledge Base" side rail). It is NOT the horizontal `Stepper` — use `Stepper` for inline top-of-page progress, `ProgressTracker` for a side rail that follows a long scrolling form.

```jsx
<ProgressTracker
  title="Create Knowledge Base"
  steps={["Metadata", "Ownership", "Connect Data"]}
  activeStep={0}
  onStepClick={(i) => scrollToSection(i)}
/>
```

Steps before `activeStep` render complete (filled check dot); the active step gets a blue left accent bar + pale highlight; later steps render as dashed upcoming dots. Pass step objects `{ label, status }` to override the derived state. Set `collapsible={false}` to lock the group open.
