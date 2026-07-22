import React from "react";

/* Fusion OmniInput — the platform's primary conversational entry point.
   A glowing multiline prompt field with an animated (typewriter) placeholder
   that cycles guidance prompts, an attach button, a mode selector, a send
   button, and optional suggestion chips below. Custom Fusion original. */

const AddIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const SendIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 20V5M6 11l6-6 6 6" />
  </svg>
);
const ChevronIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const DatasetIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" /><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
  </svg>
);
const ModelsIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
    <path d="M12 3v3M12 18v3M4.9 7l2.1 1.2M17 15.8 19.1 17M4.9 17l2.1-1.2M17 8.2 19.1 7" /><circle cx="12" cy="12" r="3.4" />
  </svg>
);
const AgentIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="5" y="8" width="14" height="10" rx="2.5" /><path d="M12 5v3M9 13h.01M15 13h.01" /><circle cx="12" cy="4" r="1" />
  </svg>
);

const KnowledgeIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5.5A1.5 1.5 0 0 1 4 18.5Z" /><path d="M4 17.5A1.5 1.5 0 0 1 5.5 16H19" />
  </svg>
);
const SkillIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9Z" />
  </svg>
);
const LibraryIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="4" y="4" width="5" height="16" rx="1" /><rect x="11" y="4" width="4" height="16" rx="1" /><path d="m17 6 3 1-3 13-2-.6Z" />
  </svg>
);

const defaultSuggestions = [
  { label: "Find a dataset", icon: DatasetIcon },
  { label: "Compare models", icon: ModelsIcon },
  { label: "Discover agents", icon: AgentIcon },
];

const styleTag = `
@keyframes fusionOmniSpin{to{transform:rotate(360deg)}}
@keyframes fusionOmniBreathe{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:.9;transform:scale(1.06)}}
@keyframes fusionOmniDrift{0%{transform:translate(-4%,-3%) scale(1)}33%{transform:translate(5%,3%) scale(1.1)}66%{transform:translate(-3%,4%) scale(1.05)}100%{transform:translate(-4%,-3%) scale(1)}}
@keyframes fusionOmniCaret{0%,55%{opacity:1}56%,100%{opacity:0}}
.fusionOmni *{box-sizing:border-box}
.fusionOmni-suggest:hover{background:var(--salt-actionable-subtle-background-hover)!important;border-color:var(--salt-color-gray-400)!important}
.fusionOmni-icon:hover{background:var(--salt-actionable-subtle-background-hover)!important}
.fusionOmni-send:hover{background:var(--salt-color-blue-600)!important}
.fusionOmni-mode:hover{background:var(--salt-actionable-subtle-background-hover)!important}
.fusionOmni-menu-item:hover{background:var(--salt-actionable-subtle-background-hover)!important}
.fusionOmni-attach-item:hover{background:var(--salt-actionable-subtle-background-hover)!important}
.fusionOmni textarea::placeholder{color:var(--salt-content-secondary-foreground)}
.fusionOmni-suggest:focus-visible,.fusionOmni-icon:focus-visible,.fusionOmni-mode:focus-visible,.fusionOmni-send:focus-visible{outline:var(--salt-focused-outlineWidth) var(--salt-focused-outlineStyle) var(--salt-focused-outlineColor);outline-offset:2px}
`;

export function OmniInput({
  placeholders = [
    'Help me build an "Advisory Desk Email Triage" workflow…',
    "Find datasets tagged with counterparty risk from the last quarter",
    "Compare the top three summarization models on latency and cost",
    "Draft a governance review for the new pricing agent",
  ],
  modes = ["Build with AI", "Manage your data", "Govern AI", "Chat"],
  attachOptions = [
    { label: "Attach knowledge", icon: KnowledgeIcon },
    { label: "Add a skill", icon: SkillIcon },
    { label: "Prompt library", icon: LibraryIcon },
  ],
  suggestions = defaultSuggestions,
  defaultValue = "",
  onSend,
  ...rest
}) {
  const [value, setValue] = React.useState(defaultValue);
  const [typed, setTyped] = React.useState("");
  const [pIndex, setPIndex] = React.useState(0);
  const [focused, setFocused] = React.useState(false);
  const [mode, setMode] = React.useState(modes[0]);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [attachOpen, setAttachOpen] = React.useState(false);
  const taRef = React.useRef(null);
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    if (!menuOpen && !attachOpen) return;
    const onDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) { setMenuOpen(false); setAttachOpen(false); } };
    const onKey = (e) => { if (e.key === "Escape") { setMenuOpen(false); setAttachOpen(false); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [menuOpen, attachOpen]);

  React.useEffect(() => {
    if (value) { setTyped(""); return; }
    const full = placeholders[pIndex % placeholders.length];
    let i = 0, deleting = false, timer;
    const tick = () => {
      if (!deleting) {
        i++; setTyped(full.slice(0, i));
        if (i >= full.length) { deleting = true; timer = setTimeout(tick, 2400); return; }
        timer = setTimeout(tick, 70);
      } else {
        i--; setTyped(full.slice(0, i));
        if (i <= 0) { setPIndex((p) => (p + 1) % placeholders.length); return; }
        timer = setTimeout(tick, 32);
      }
    };
    timer = setTimeout(tick, 450);
    return () => clearTimeout(timer);
  }, [pIndex, value, placeholders]);

  const send = () => { if (value.trim() && onSend) onSend(value, mode); };

  const fontStack = "var(--salt-text-fontFamily)";
  const showOverlay = !value;

  return (
    <div ref={rootRef} className="fusionOmni" style={{ fontFamily: fontStack, width: "100%", maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--salt-spacing-200)" }} {...rest}>
      <style>{styleTag}</style>

      <div style={{ position: "relative", width: "100%", borderRadius: 24 }}>
        {/* glow aura */}
        <div aria-hidden="true" style={{ position: "absolute", inset: -5, borderRadius: 27, overflow: "hidden", zIndex: 0, opacity: focused ? 1 : 0.85, transition: "opacity .5s ease", pointerEvents: "none", WebkitMaskImage: "radial-gradient(closest-side, transparent calc(100% - 14px), #000 calc(100% - 5px))", maskImage: "radial-gradient(closest-side, transparent calc(100% - 14px), #000 calc(100% - 5px))" }}>
          <div style={{ position: "absolute", inset: 0, animation: "fusionOmniSpin 14s linear infinite" }}>
            <div style={{ position: "absolute", top: "-40%", left: "-10%", width: "50%", height: "180%", borderRadius: "50%", background: "radial-gradient(circle, var(--salt-color-blue-400), transparent 65%)", filter: "blur(22px)", animation: "fusionOmniDrift 9s ease-in-out infinite" }} />
            <div style={{ position: "absolute", top: "-40%", left: "30%", width: "50%", height: "180%", borderRadius: "50%", background: "radial-gradient(circle, var(--salt-color-purple-500), transparent 65%)", filter: "blur(24px)", animation: "fusionOmniDrift 11s ease-in-out infinite reverse" }} />
            <div style={{ position: "absolute", top: "-40%", right: "-12%", width: "50%", height: "180%", borderRadius: "50%", background: "radial-gradient(circle, var(--salt-color-orange-400), transparent 65%)", filter: "blur(22px)", animation: "fusionOmniDrift 10s ease-in-out infinite" }} />
          </div>
        </div>

        {/* card */}
        <div style={{ position: "relative", zIndex: 1, background: "var(--salt-container-primary-background)", borderRadius: 22, border: "1px solid var(--salt-container-primary-borderColor)", boxShadow: "var(--salt-shadow-2, 0 2px 12px rgba(16,24,32,.08))", padding: "var(--salt-spacing-200)", display: "flex", flexDirection: "column", gap: "var(--salt-spacing-150)" }}>
          <div style={{ position: "relative", minHeight: 72 }}>
            {showOverlay && (
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, padding: "6px 4px", fontSize: 18, lineHeight: 1.45, color: "var(--salt-content-secondary-foreground)", pointerEvents: "none", whiteSpace: "pre-wrap" }}>
                {typed}<span style={{ display: "inline-block", width: 2, height: "1.05em", marginLeft: 1, background: "var(--salt-color-orange-500)", verticalAlign: "-2px", animation: "fusionOmniCaret 1s step-end infinite" }} />
              </div>
            )}
            <textarea
              ref={taRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); send(); } }}
              rows={3}
              style={{ width: "100%", resize: "none", border: "none", outline: "none", background: "transparent", padding: "6px 4px", fontFamily: fontStack, fontSize: 18, lineHeight: 1.45, color: "var(--salt-content-primary-foreground)" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)" }}>
            <div style={{ position: "relative" }}>
              <button aria-label="Add" aria-expanded={attachOpen} onClick={() => { setAttachOpen((o) => !o); setMenuOpen(false); }} className="fusionOmni-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 999, border: "1px solid var(--salt-color-gray-300)", background: attachOpen ? "var(--salt-actionable-subtle-background-hover)" : "var(--salt-container-primary-background)", color: "var(--salt-content-primary-foreground)", cursor: "pointer" }}>
                <AddIcon style={{ transform: attachOpen ? "rotate(45deg)" : "none", transition: "transform .2s" }} />
              </button>
              {attachOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, minWidth: 200, background: "var(--salt-container-primary-background)", border: "1px solid var(--salt-container-primary-borderColor)", borderRadius: "var(--salt-palette-corner-weak)", boxShadow: "var(--salt-shadow-3, 0 6px 20px rgba(16,24,32,.16))", padding: 4, zIndex: 3 }}>
                  {attachOptions.map(({ label, icon: Icon }) => (
                    <button key={label} onClick={() => setAttachOpen(false)} className="fusionOmni-attach-item" style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "8px 12px", borderRadius: "var(--salt-palette-corner-weak)", border: "none", background: "transparent", color: "var(--salt-content-primary-foreground)", fontFamily: fontStack, fontSize: 14, cursor: "pointer" }}>
                      {Icon && <Icon style={{ color: "var(--salt-content-secondary-foreground)", flexShrink: 0 }} />}{label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ position: "relative" }}>
              <button className="fusionOmni-mode" onClick={() => { setMenuOpen((o) => !o); setAttachOpen(false); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 14px", borderRadius: 999, border: "1px solid var(--salt-color-gray-300)", background: "var(--salt-container-primary-background)", color: "var(--salt-content-primary-foreground)", fontFamily: fontStack, fontSize: 14, fontWeight: "var(--salt-text-fontWeight-strong)", cursor: "pointer" }}>
                {mode}<ChevronIcon style={{ transform: menuOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
              </button>
              {menuOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, minWidth: 200, background: "var(--salt-container-primary-background)", border: "1px solid var(--salt-container-primary-borderColor)", borderRadius: "var(--salt-palette-corner-weak)", boxShadow: "var(--salt-shadow-3, 0 6px 20px rgba(16,24,32,.16))", padding: 4, zIndex: 3 }}>
                  {modes.map((m) => (
                    <button key={m} onClick={() => { setMode(m); setMenuOpen(false); }} className="fusionOmni-menu-item" style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", borderRadius: "var(--salt-palette-corner-weak)", border: "none", background: m === mode ? "var(--salt-actionable-subtle-background-hover)" : "transparent", color: "var(--salt-content-primary-foreground)", fontFamily: fontStack, fontSize: 14, cursor: "pointer" }}>{m}</button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ flex: 1 }} />

            <button aria-label="Send" className="fusionOmni-send" onClick={send} disabled={!value.trim()} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 999, border: "none", background: value.trim() ? "var(--salt-color-blue-500)" : "var(--salt-color-blue-300)", color: "var(--salt-color-white)", cursor: value.trim() ? "pointer" : "not-allowed", transition: "background .2s" }}>
              <SendIcon />
            </button>
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--salt-spacing-150)" }}>
          {suggestions.map(({ label, icon: Icon }) => (
            <button key={label} className="fusionOmni-suggest" onClick={() => { setValue(label); taRef.current && taRef.current.focus(); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 40, padding: "0 18px", borderRadius: 999, border: "1px solid var(--salt-color-gray-300)", background: "var(--salt-container-primary-background)", color: "var(--salt-content-primary-foreground)", fontFamily: fontStack, fontSize: 14, fontWeight: "var(--salt-text-fontWeight-strong)", cursor: "pointer", transition: "background .15s, border-color .15s" }}>
              {Icon && <Icon />}{label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
