import React from "react";

const GLYPHS = {
  add: "M6.5 5.5H11v1H6.5V11h-1V6.5H1v-1h4.5V1h1z",
  search: "M8 9a5 5 0 1 1 1-1l3 3-1 1zm1-4a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  "micro-menu": "M5 11V9H7V11H5Z|M5 7L5 5H7L7 7H5Z|M5 1V3H7V1L5 1Z",
  download: "M5.5 0h1v7.114l2.682-2.682.707.707L6 9.03 2.11 5.14l.708-.707L5.5 7.114zM12 11v1H0v-1z",
  "folder-open": "M0 1H4.11803L6.11803 2H12V12H0V1ZM5.88197 3H11V4H4L1 9.52991V2H3.88197L5.88197 3ZM1.33825 11H11V5H4.58032L1.33825 11Z",
  share: "M10 4a2 2 0 1 0-1.956-1.581L3.508 4.687a2 2 0 1 0 0 2.626l4.536 2.268a2 2 0 1 0 .448-.894L3.956 6.419a2 2 0 0 0 0-.838l4.536-2.268C8.858 3.734 9.398 4 10 4m1 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0M3 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m8-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0",
  attach: "M3 2C3 0.89543 3.89543 0 5 0H8C9.10457 0 10 0.895431 10 2V9H9V2C9 1.44772 8.55228 1 8 1H5C4.44772 1 4 1.44772 4 2V10.25C4 10.6642 4.33579 11 4.75 11H6.25C6.66421 11 7 10.6642 7 10.25V3.5C7 3.22386 6.77614 3 6.5 3C6.22386 3 6 3.22386 6 3.5V9H5V3C5 2.44772 5.44772 2 6 2H7C7.55228 2 8 2.44772 8 3V10.5C8 11.3284 7.32843 12 6.5 12H4.5C3.67157 12 3 11.3284 3 10.5V2Z",
  "arrow-up": "M5.5 12h1V1.915l3.146 3.147.707-.708L6 0 1.646 4.353l.708.707L5.5 1.914z",
  close: "m5.999 5.292 3.89-3.888.707.707L6.707 6l3.889 3.889-.707.708-3.89-3.89-3.889 3.89-.707-.708L5.292 6 1.403 2.111l.707-.708z",
  "panel-close-left": "M12 12H0V0H12V12ZM1 11H3V1H1V11ZM4 11H11V1H4V11ZM8.53516 3.87891L6.91406 5.5H10V6.5H6.91406L8.53516 8.12109L7.82812 8.82812L5 6L7.82812 3.17188L8.53516 3.87891Z",
  "panel-open-left-solid": "M12 12H0V0H12V12ZM1 11H4.00391V1H1V11ZM6.46875 3.87891L8.08984 5.5H5.00391V6.5H8.08984L6.46875 8.12109L7.17578 8.82812L10.0039 6L7.17578 3.17188L6.46875 3.87891Z",
};

/**
 * Fusion ChatIcon — inline-SVG glyphs for the Chat pattern set (add,
 * search, micro-menu, download, folder-open, share, attach, arrow-up,
 * close, panel-close-left, panel-open-left-solid). Renders as real
 * `<path>` shapes filled with `currentColor` rather than a CSS
 * `mask-image` — masks backed by an external SVG URL don't reliably
 * clip in every rendering context, so every Chat component uses this
 * shared glyph set instead.
 */
export function ChatIcon({ name, size = 14 }) {
  const spec = GLYPHS[name];
  if (!spec) return <span style={{ width: size, height: size, flexShrink: 0, display: "inline-block" }} />;
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      {spec.split("|").map((d, i) => <path key={i} d={d} fillRule="evenodd" />)}
    </svg>
  );
}
