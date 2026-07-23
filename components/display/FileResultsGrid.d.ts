export interface FileResultsGridFile {
  id: string | number;
  name: string;
  /** Bytes (auto-formatted) or a pre-formatted string. */
  size?: number | string;
}

export interface FileResultsGridProps {
  files?: FileResultsGridFile[];
  onDownload?: (file: FileResultsGridFile) => void;
  onDelete?: (file: FileResultsGridFile) => void;
  style?: React.CSSProperties;
}

export function FileResultsGrid(props: FileResultsGridProps): JSX.Element | null;
