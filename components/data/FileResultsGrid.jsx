import React from "react";

const DownloadGlyph = ({ size = 14 }) => (
  <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M5.5 0h1v7.114l2.682-2.682.707.707L6 9.03 2.11 5.14l.708-.707L5.5 7.114zM12 11v1H0v-1z" />
  </svg>
);
const DeleteGlyph = ({ size = 14 }) => (
  <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M5 4v6H4V4zm2 0v6H6V4z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M4 0a1 1 0 0 0-1 1v1H0v1h1v7a2 2 0 0 0 2 2h5.25A1.75 1.75 0 0 0 10 10.25V3h1V2H8V1a1 1 0 0 0-1-1zm5 3H2v7a1 1 0 0 0 1 1h5.25a.75.75 0 0 0 .75-.75zM7 2H4v-.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5z" />
  </svg>
);

function formatSize(size) {
  if (typeof size !== "number") return size;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Fusion FileResultsGrid — a full-width results table for uploaded/attached
 * files: File name (left) / Size (right, numeric) / Actions (right,
 * download + delete icon buttons). Left-aligned column headers regardless
 * of each column's data alignment; thin dividers only between header
 * cells, no cell borders in the body.
 * Requires FusionDesignSystem_6db751 (Table family, IconButton) plus
 * ./FileResultsGrid.css.
 */
export function FileResultsGrid({ files = [], onDownload, onDelete, style }) {
  const { Table, TableHead, TableBody, TableRow, TableCell, IconButton } = window.FusionDesignSystem_6db751;
  if (!files.length) return null;
  return (
    <div className="frg-grid" style={style}>
      <Table variant="secondary" zebra style={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell header scope="col">File name</TableCell>
            <TableCell header scope="col">Size</TableCell>
            <TableCell header scope="col">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{f.name}</TableCell>
              <TableCell align="right">{formatSize(f.size)}</TableCell>
              <TableCell align="right">
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--salt-spacing-50)" }}>
                  <IconButton appearance="transparent" sentiment="neutral" aria-label={`Download ${f.name}`} title={`Download ${f.name}`} onClick={() => onDownload?.(f)}>
                    <DownloadGlyph />
                  </IconButton>
                  <IconButton appearance="transparent" sentiment="neutral" aria-label={`Delete ${f.name}`} title={`Delete ${f.name}`} onClick={() => onDelete?.(f)}>
                    <DeleteGlyph />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
