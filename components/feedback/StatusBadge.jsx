import React from "react";

const COLOR = {
  gray: "var(--salt-color-gray-500)",
  blue: "var(--salt-palette-info)",
  green: "var(--salt-palette-positive)",
  red: "var(--salt-palette-negative)",
  orange: "var(--salt-palette-warning)",
};

// verbatim path data from icons/*.svg (12x12 grid)
const GLYPHS = {
  "progress-todo": [{ d: "M11.6827 4.07119L10.7361 4.39361C10.6326 4.08951 10.4977 3.79029 10.3301 3.49999C10.1625 3.2097 9.9708 2.94332 9.75923 2.70157L10.5118 2.04301C10.766 2.33353 10.9958 2.65297 11.1961 2.99999C11.3965 3.34702 11.5583 3.70574 11.6827 4.07119ZM8.65409 0.618234L8.21261 1.51551C7.62338 1.22559 6.9813 1.05355 6.32606 1.01001L6.39236 0.012207C7.17803 0.0644141 7.94757 0.270611 8.65409 0.618234ZM4.07119 0.31726L4.39361 1.26385C4.08951 1.36744 3.79029 1.50226 3.49999 1.66987C3.2097 1.83747 2.94332 2.02919 2.70157 2.24076L2.04301 1.48823C2.33353 1.23399 2.65297 1.0042 2.99999 0.803842C3.34702 0.603486 3.70574 0.441736 4.07119 0.31726ZM0.618235 3.3459L1.51551 3.78738C1.22559 4.37661 1.05355 5.01869 1.01001 5.67393L0.012207 5.60763C0.0644141 4.82196 0.270611 4.05242 0.618235 3.3459ZM0.31726 7.9288C0.441736 8.29425 0.603486 8.65297 0.803842 8.99999C1.0042 9.34702 1.23399 9.66646 1.48823 9.95698L2.24076 9.29842C2.02919 9.05667 1.83747 8.79029 1.66987 8.49999C1.50226 8.2097 1.36744 7.91048 1.26386 7.60638L0.31726 7.9288ZM3.3459 11.3818L3.78738 10.4845C4.37661 10.7744 5.01869 10.9464 5.67393 10.99L5.60763 11.9878C4.82196 11.9356 4.05242 11.7294 3.3459 11.3818ZM7.9288 11.6827L7.60638 10.7361C7.91048 10.6326 8.2097 10.4977 8.49999 10.3301C8.79029 10.1625 9.05667 9.9708 9.29842 9.75923L9.95698 10.5118C9.66646 10.766 9.34702 10.9958 8.99999 11.1961C8.65297 11.3965 8.29425 11.5583 7.9288 11.6827ZM11.3818 8.65409L10.4845 8.21261C10.7744 7.62338 10.9464 6.9813 10.99 6.32606L11.9878 6.39236C11.9356 7.17803 11.7294 7.94757 11.3818 8.65409Z", fillRule: "evenodd" }],
  "progress-draft": [{ d: "M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z", fillRule: "evenodd" }],
  "step-active": [{ d: "M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" }],
  "clock-solid": [{ d: "M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM6 3V6H3V7H7V3H6Z", fillRule: "evenodd" }],
  "progress-complete": [{ d: "M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM3.20711 5.62132L2.5 6.32843L4.97487 8.8033L9.57107 4.20711L8.86396 3.5L4.97487 7.38909L3.20711 5.62132Z", fillRule: "evenodd" }],
  "success-circle": [{ d: "M9.75015 4.01586L4.95193 9.33177L2 6.5827L3.02731 5.48354L4.87544 7.20095L8.64666 2.9932L9.75015 4.01586Z" }, { d: "M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z", fillRule: "evenodd" }],
  "progress-onhold": [{ d: "M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM5.5 3H4V9H5.5V3ZM8 3H6.5V9H8V3Z", fillRule: "evenodd" }],
  "progress-rejected": [{ d: "M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM3 6.50001H9V5.50001H3V6.50001Z", fillRule: "evenodd" }],
  "progress-cancelled": [{ d: "M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z M5.999 5.469L8.917 2.553L9.447 3.083L6.53 6L9.447 8.917L8.917 9.448L5.999 6.53L3.083 9.448L2.553 8.917L5.469 6L2.553 3.083L3.083 2.553Z", fillRule: "evenodd" }],
  "progress-inprogress": [{ d: "M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM1 6C1 3.23858 3.23858 1 6 1V11C3.23858 11 1 8.76142 1 6Z", fillRule: "evenodd" }],
  "refresh": [{ d: "M4.707 10.831a5 5 0 1 1 5.625-7.33h-2.33v1h4v-4h-1v2.184A6 6 0 0 0 9.745 1.31a6 6 0 1 0 2.052 6.244l-.966-.26a5 5 0 0 1-6.124 3.536" }],
  "error-solid": [{ d: "M9 0H3L0 3v6l3 3h6l3-3V3zM7 2H5v5h2zm-1 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2", fillRule: "evenodd" }],
  "storage": [{ d: "M8 6H4V7H8V6Z" }, { d: "M0 1V4H1V12H11V4H12V1H0ZM11 2H1V3H11V2ZM10 5H2V11H10V5Z", fillRule: "evenodd" }],
  "progress-closed": [{ d: "M4 4H8V8H4V4Z" }, { d: "M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM3 9V3H9V9H3Z", fillRule: "evenodd" }],
  "undo": [{ d: "M7.29407 10.8311C9.9614 10.1164 11.5443 7.37472 10.8296 4.70739C10.1149 2.04006 7.37321 0.457151 4.70588 1.17186C4.01758 1.35629 3.40262 1.67508 2.88062 2.09207C2.60406 2.313 2.35338 2.56167 2.1317 2.8328C1.95979 3.04306 1.80536 3.26678 1.66986 3.50147L4 3.50146V4.50146H0L9.53674e-07 0.501464L1 0.501465L1 2.68471C1.11089 2.51742 1.2302 2.35556 1.35753 2.19983C1.62338 1.87467 1.92424 1.57616 2.25647 1.31077C2.88418 0.809327 3.62306 0.426724 4.44706 0.205934C7.64786 -0.651717 10.9379 1.24778 11.7955 4.44858C12.6532 7.64937 10.7537 10.9394 7.55289 11.797L7.29407 10.8311Z" }],
  "warning-solid": [{ d: "m6 0 6 12H0zM5 5h2v3H5zm2 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0", fillRule: "evenodd" }],
};

// label -> { icon, color } — icon is a GLYPHS key, or "sync" / "loader" (rendered specially)
const STATUS_MAP = {
  "Not Started": { icon: "progress-todo", color: "gray" },
  "Starting": { icon: "progress-todo", color: "gray" },
  "Step Todo": { icon: "progress-todo", color: "gray" },
  "Draft": { icon: "progress-draft", color: "blue" },
  "Plan": { icon: "progress-draft", color: "blue" },
  "Active": { icon: "step-active", color: "blue" },
  "New": { icon: "step-active", color: "blue" },
  "Pending": { icon: "clock-solid", color: "blue" },
  "Pending Approval": { icon: "clock-solid", color: "blue" },
  "Approved": { icon: "progress-complete", color: "green" },
  "Cleared for Production": { icon: "progress-complete", color: "green" },
  "Complete": { icon: "progress-complete", color: "green" },
  "Operate": { icon: "progress-complete", color: "green" },
  "Published": { icon: "progress-complete", color: "green" },
  "Submitted": { icon: "progress-complete", color: "green" },
  "Yes": { icon: "progress-complete", color: "green" },
  "Proposed": { icon: "success-circle", color: "green" },
  "Ready": { icon: "success-circle", color: "green" },
  "Ready for Linking": { icon: "success-circle", color: "green" },
  "Test Ready": { icon: "success-circle", color: "green" },
  "Paused": { icon: "progress-onhold", color: "gray" },
  "Withdrawn": { icon: "progress-onhold", color: "gray" },
  "Removing": { icon: "progress-rejected", color: "red" },
  "Required for KDE": { icon: "progress-rejected", color: "red" },
  "Terminating": { icon: "progress-rejected", color: "red" },
  "Decommissioned": { icon: "progress-cancelled", color: "red" },
  "Delete Initiated": { icon: "progress-cancelled", color: "red" },
  "Deprecated": { icon: "progress-cancelled", color: "red" },
  "Rejected": { icon: "progress-cancelled", color: "red" },
  "Request Rejected": { icon: "progress-cancelled", color: "red" },
  "Retired": { icon: "progress-cancelled", color: "red" },
  "Terminated": { icon: "progress-cancelled", color: "red" },
  "Test Loading": { icon: "loader", color: "blue" },
  "Running": { icon: "sync", color: "blue" },
  "Synchronized": { icon: "sync", color: "blue" },
  "Build": { icon: "progress-inprogress", color: "blue" },
  "Development": { icon: "progress-inprogress", color: "blue" },
  "In Progress": { icon: "progress-inprogress", color: "blue" },
  "Upgrading": { icon: "progress-inprogress", color: "blue" },
  "Rerun Test": { icon: "refresh", color: "gray" },
  "Failed": { icon: "error-solid", color: "red" },
  "Test Failed": { icon: "error-solid", color: "red" },
  "Archived": { icon: "storage", color: "gray" },
  "Expired": { icon: "progress-closed", color: "gray" },
  "Test Reverted": { icon: "undo", color: "gray" },
  "No": { icon: "warning-solid", color: "orange" },
  "Not Submitted": { icon: "warning-solid", color: "orange" },
  "Review Required": { icon: "warning-solid", color: "orange" },
  "Step Warning": { icon: "warning-solid", color: "orange" },
};

function SyncGlyph({ color }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth="1.15" strokeLinecap="round" style={{ flexShrink: 0 }} aria-hidden="true">
      <path d="M2.2 5.2A4 4 0 0 1 9.6 3.6" />
      <path d="M9.8 3.6l.4-2.1-2 .7" />
      <path d="M9.8 6.8A4 4 0 0 1 2.4 8.4" />
      <path d="M2.2 8.4l-.4 2.1 2-.7" />
    </svg>
  );
}

function LoaderGlyph({ color }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0, animation: "fusionStatusBadgeSpin 0.8s linear infinite" }} aria-hidden="true">
      <circle cx="6" cy="6" r="4.5" fill="none" stroke="var(--salt-color-gray-200)" strokeWidth="1.5" />
      <path d="M10.5 6a4.5 4.5 0 0 0-4.5-4.5" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <style>{"@keyframes fusionStatusBadgeSpin{to{transform:rotate(360deg)}}"}</style>
    </svg>
  );
}

/**
 * Fusion StatusBadge — a compact icon + label pair for record/workflow state.
 * `status` is matched verbatim against the built-in status vocabulary (see
 * StatusBadge.d.ts) to pick the icon and color; pass `label` to show
 * different text than the status key, or `icon`/`color` to override entirely
 * for a status not in the built-in map.
 */
export function StatusBadge({ status, label, icon, color, className = "", style, ...rest }) {
  const mapped = STATUS_MAP[status] || {};
  const iconKey = icon || mapped.icon || "progress-todo";
  const colorKey = color || mapped.color || "gray";
  const resolvedColor = COLOR[colorKey] || colorKey;
  const text = label != null ? label : status;

  let glyph;
  if (iconKey === "sync") glyph = <SyncGlyph color={resolvedColor} />;
  else if (iconKey === "loader") glyph = <LoaderGlyph color={resolvedColor} />;
  else {
    const paths = GLYPHS[iconKey] || GLYPHS["progress-todo"];
    glyph = (
      <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0, fill: resolvedColor }} aria-hidden="true">
        {paths.map((p, i) => <path key={i} fillRule={p.fillRule} clipRule={p.fillRule} d={p.d} />)}
      </svg>
    );
  }

  return (
    <span
      className={["fusionStatusBadge", className].filter(Boolean).join(" ")}
      style={{ display: "inline-flex", alignItems: "center", gap: "var(--salt-spacing-75)", ...style }}
      {...rest}
    >
      {glyph}
      <span
        style={{
          fontFamily: "var(--salt-text-fontFamily)",
          fontWeight: "var(--salt-text-fontWeight)",
          fontSize: "var(--salt-text-fontSize)",
          lineHeight: "var(--salt-text-lineHeight)",
          color: "var(--salt-content-primary-foreground)",
        }}
      >
        {text}
      </span>
    </span>
  );
}
