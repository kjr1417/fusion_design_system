import React from "react";

function initials(name) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export function Avatar({ name, size = 32, src, style, ...rest }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "var(--salt-palette-corner-strongest)",
        background: "var(--salt-color-gray-700)",
        color: "var(--salt-color-white)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--salt-text-fontFamily)",
        fontWeight: "var(--salt-text-fontWeight-strong)",
        fontSize: size * 0.4,
        overflow: "hidden",
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    >
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials(name || "?")}
    </span>
  );
}
