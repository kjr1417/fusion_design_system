export interface FileResultsGridFile {
  id: string | number;
  name: string;
  /** Bytes (auto-formatted) or a pre-formatted string. */
  size?: number | string;
  /** Extra fields read by matching `columns` entries. */
  [key: string]: any;
}
export interface FileResultsGridColumn {
  /** Reads `file[key]` for this column's cell value. */
  key: string;
  label: string;
  align?: "left" | "right";
}

export interface FileResultsGridProps {
  files?: FileResultsGridFile[];
  /** Extra columns beyond the built-in File name/Size — e.g. Type, Modified. Default none (2 columns, as before). Depth/count of columns should scale with available width — keep it to what fits the chat panel. */
  columns?: FileResultsGridColumn[];
  /** Set false to omit the Actions (download/delete) column — the response/chat context has no destructive file actions, so grids shown in a reply should pass `actions={false}`. Default true. */
  actions?: boolean;
  onDownload?: (file: FileResultsGridFile) => void;
  onDelete?: (file: FileResultsGridFile) => void;
  style?: React.CSSProperties;
}

export function FileResultsGrid(props: FileResultsGridProps): JSX.Element | null;
