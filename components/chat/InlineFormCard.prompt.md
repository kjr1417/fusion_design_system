InlineFormCard is a chat-native inline form: title, two-line description, a multi-select ComboBoxMetadataOverlay field (max 3 selections), a FileUpload pattern, and right-aligned Skip / Back / Next(-or-Finish) buttons — outlined Skip and Back, primary Next/Finish. Pass 2+ `steps` for a multi-step form — it tracks the active step and advances itself; Back appears once you're past the first step.

```jsx
<InlineFormCard
  steps={[
    {
      title: "Connect data sources",
      description: "Choose up to three sources to ground this response in your team's data.",
      fieldLabel: "Data sources",
      fieldPlaceholder: "Search sources…",
      fieldHelperText: "You can change this later from the source list.",
      options: [
        { value: "crm", label: "CRM — Accounts", metadata: [{ label: "Type", value: "Database" }, { label: "Synced", value: "2h ago" }] },
        { value: "kb", label: "Knowledge Base", metadata: [{ label: "Type", value: "Docs" }, { label: "Synced", value: "1d ago" }] },
      ],
      uploadTitle: "Attach supporting files",
      uploadDescription: "Optional — add reference files for this step.",
    },
  ]}
  onComplete={({ selections, files }) => {}}
/>
```
