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
  "arrow-down": "M5.5 0h1V10.085l3.146-3.147.707.708L6 12 1.646 7.647l.708-.707L5.5 10.086z",
  pause: "M3 2h2v8H3z|M7 2h2v8H7z",
  close: "m5.999 5.292 3.89-3.888.707.707L6.707 6l3.889 3.889-.707.708-3.89-3.89-3.889 3.89-.707-.708L5.292 6 1.403 2.111l.707-.708z",
  "panel-close-left": "M12 12H0V0H12V12ZM1 11H3V1H1V11ZM4 11H11V1H4V11ZM8.53516 3.87891L6.91406 5.5H10V6.5H6.91406L8.53516 8.12109L7.82812 8.82812L5 6L7.82812 3.17188L8.53516 3.87891Z",
  "panel-open-left-solid": "M12 12H0V0H12V12ZM1 11H4.00391V1H1V11ZM6.46875 3.87891L8.08984 5.5H5.00391V6.5H8.08984L6.46875 8.12109L7.17578 8.82812L10.0039 6L7.17578 3.17188L6.46875 3.87891Z",
  copy: "M4 0h4.707L11 2.293V9H8v3H1V3h3zm1 1v7h5V4H7V1zm3 0v2h2v-.293L8.293 1zM2 4h2v5h3v2H2z",
  edit: "M9.564.293a1 1 0 0 0-1.415 0L6.735 1.707l3.536 3.536 1.414-1.415a1 1 0 0 0 0-1.414zm-.354 1.06a.5.5 0 0 0-.707 0l-.354.354 2.122 2.121.353-.353a.5.5 0 0 0 0-.707z|m7.442 3.828.707.708L4.26 8.425a.5.5 0 1 1-.707-.707z|m8.857 5.243.707.707-4.243 4.242L0 12l1.786-5.343 4.207-4.208.707.707-4.03 4.031-.796 2.387.53.53 2.387-.795z",
  check: "M4.952 9.294 10 3.73 8.9 2.706 4.875 7.163 3.027 5.446 2 6.546z",
  "chevron-left": "M3.407 5.618 3 6l.407.382L8.339 11 9 10.236 4.476 6 9 1.764 8.34 1z",
  "chevron-right": "M8.593 5.618 9 6l-.407.382L3.661 11 3 10.236 7.524 6 3 1.764 3.66 1z",
  "tear-out": "M0 12L12 12L12 6H11L11 11L1 11L1 1L6 1V5.24536e-07L1.04907e-06 0L0 12Z|M11.9962 4V9.53989e-08H7.99619V1H10.2891L5.99608 5.29289L6.70319 6L10.9962 1.70711V4H11.9962Z",
  refresh: "M4.707 10.831a5 5 0 1 1 5.625-7.33h-2.33v1h4v-4h-1v2.184A6 6 0 0 0 9.745 1.31a6 6 0 1 0 2.052 6.244l-.966-.26a5 5 0 0 1-6.124 3.536",
  "thumb-up": "M2 12V5H0V12H2Z|M5 3.23607L4 5.23607V11H9.38197L11 7.76393V5.5C11 5.22386 10.7761 5 10.5 5H6V1.5C6 1.22386 5.77614 1 5.5 1H5V3.23607ZM4 0H5.5C6.32843 0 7 0.671573 7 1.5V4H10.5C11.3284 4 12 4.67157 12 5.5V8L10 12H3V5L4 3V0Z",
  "thumb-up-solid": "M2 12V5H0V12H2Z|M4 0H5.5C6.32843 0 7 0.671573 7 1.5V4H10.5C11.3284 4 12 4.67157 12 5.5V8L10 12H3V5L4 3V0Z",
  "thumb-down": "M10 0V7H12V0H10Z|M7 8.76393L8 6.76393V1H2.61803L1 4.23607V6.5C1 6.77614 1.22386 7 1.5 7H6V10.5C6 10.7761 6.22386 11 6.5 11H7V8.76393ZM8 12H6.5C5.67157 12 5 11.3284 5 10.5V8H1.5C0.671573 8 0 7.32843 0 6.5V4L2 0H9V7L8 9V12Z",
  "thumb-down-solid": "M10 0V7H12V0H10Z|M8 12H6.5C5.67157 12 5 11.3284 5 10.5V8H1.5C0.671573 8 0 7.32843 0 6.5V4L2 0H9V7L8 9V12Z",
};

/**
 * Fusion ChatIcon — inline-SVG glyphs for the Chat pattern set (add,
 * search, micro-menu, download, folder-open, share, attach, arrow-up,
 * close, panel-close-left, panel-open-left-solid, copy, edit, check,
 * chevron-left, chevron-right — copy/edit/check/chevron paths match
 * the design system's own .svg icon assets verbatim). Renders as real
 * `<path>` shapes filled with `currentColor` rather than a CSS
 * `mask-image` — masks backed by an external SVG URL don't reliably
 * clip in every rendering context, so every Chat component uses this
 * shared glyph set instead.
 */
export function ChatIcon({ name, size = 14, color }) {
  const spec = GLYPHS[name];
  if (!spec) return <span style={{ width: size, height: size, flexShrink: 0, display: "inline-block" }} />;
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} fill={color || "currentColor"} aria-hidden="true" style={{ flexShrink: 0 }}>
      {spec.split("|").map((d, i) => <path key={i} d={d} fillRule="evenodd" />)}
    </svg>
  );
}
