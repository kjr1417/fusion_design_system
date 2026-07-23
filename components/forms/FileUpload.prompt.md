FileUpload has two variants sharing the same title/description header and results grid: `variant="dropzone"` (full drag-and-drop surface) and `variant="button"` (a single trigger button, e.g. for a compact panel). Both open the native file picker; the dropzone additionally accepts drag-and-drop with a hover highlight.

```jsx
<FileUpload
  variant="dropzone"
  title="Upload a document"
  templateLabel="Download Template (.xlsx)"
  templateHref="/templates/import.xlsx"
  description="Upload a spreadsheet of accounts to bulk-import. Files must match the provided template columns exactly."
  secondaryDescription="Accepts .xlsx, .csv up to 25MB"
  uploading={false}
  banners={[{ status: "success", message: "3 files uploaded successfully." }]}
  files={[{ id: 1, name: "accounts-q3.xlsx", size: 48200 }]}
  onFilesSelected={(files) => {}}
  onDownload={(file) => {}}
  onDelete={(file) => {}}
/>
```

Layout, top to bottom: row 1 is the H4 `title` with an optional trailing `templateLabel` link (omit `templateLabel` to drop the link entirely); row 2 is `description`, clamped to two lines with ellipsis overflow. `variant="dropzone"` renders a dashed-border surface (accent-tinted on drag-over) with, center-justified, the upload glyph, `dropLabel`, a bordered neutral `browseLabel` button, and `secondaryDescription`. `variant="button"` replaces the whole surface with one solid accented button (`buttonLabel`, leading upload glyph) — title, description, banners and grid stay identical. Below the surface, `banners` renders a `BannerStack` (dismissible success/error/warning/info rows); `files` renders a `FileResultsGrid` (File name / Size / Actions, download+delete icon buttons). Omit `banners`/`files` (empty arrays) to hide either block entirely.

While `uploading` is true, the action button (`browseLabel` or `buttonLabel`) swaps its label for a `Spinner` and disables interaction — use this for the moment files are actively being sent to the server. Requires `Button`, `Link`, `Spinner`, `Text`/`H4`, `BannerStack` and `FileResultsGrid` from the bundle, plus `./FileUpload.css` (and `BannerStack`/`FileResultsGrid`'s own stylesheets).
