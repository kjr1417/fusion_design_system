ArtifactsPanel is the "Library" SidePanel — open it from ChatHeader's Library action.

```jsx
<ArtifactsPanel
  open={libraryOpen}
  onClose={() => setLibraryOpen(false)}
  onDownloadAll={downloadAll}
  onDownload={(a) => download(a)}
  artifacts={[
    { id: "1", title: "Q4 leadership summary", description: "Leadership-ready recap of the 60-day email triage." },
    { id: "2", title: "triage_by_theme.py", description: "Script clustering emails into themes." },
  ]}
/>
```
