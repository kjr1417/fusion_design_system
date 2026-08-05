export interface Artifact {
  id: string;
  title: string;
  description?: string;
}

/**
 * The "Library" pattern: a right-anchored SidePanel titled "Library"
 * listing artifacts as compact, divider-separated cards (title +
 * description). Each row has a "Download" icon button and a rightmost
 * "View" text button that swaps the panel to that artifact's detail
 * (with a back button to return). A "Download All" button sits left of
 * the header's close button.
 */
export interface ArtifactsPanelProps {
  open: boolean;
  onClose: () => void;
  artifacts?: Artifact[];
  onDownloadAll?: () => void;
  onDownload?: (artifact: Artifact) => void;
  /** Shown when `artifacts` is empty. */
  emptyStateText?: string;
}
export function ArtifactsPanel(props: ArtifactsPanelProps): JSX.Element;
