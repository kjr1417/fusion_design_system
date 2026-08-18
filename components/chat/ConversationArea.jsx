import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { ChatIcon } from "./chatIcons.jsx";
import { AttachmentTileGroup } from "./AttachmentTileGroup.jsx";
import { FileResultsGrid } from "../data/FileResultsGrid.jsx";
import { CodeBlock } from "../display/CodeBlock.jsx";
import { ImagePreview } from "../display/ImagePreview.jsx";
import { ArtifactCard } from "./ArtifactCard.jsx";
import { InlineFormCard } from "./InlineFormCard.jsx";
import { AnswerComparison } from "./AnswerComparison.jsx";

const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.952 9.294 10 3.73 8.9 2.706 4.875 7.163 3.027 5.446 2 6.546z" />
  </svg>
);

const IMAGE_TYPES = ["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "heic", "image"];
const isImageAttachment = (a) => !!a.imageUrl || IMAGE_TYPES.includes(String(a.fileType || "").toLowerCase());

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatShortDate(ts) {
  const d = ts instanceof Date ? ts : new Date(ts);
  if (isNaN(d.getTime())) return "";
  return `${MONTHS[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}`;
}
function formatFullTimestamp(ts) {
  const d = ts instanceof Date ? ts : new Date(ts);
  if (isNaN(d.getTime())) return "";
  let h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const hh = String(h).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${MONTHS[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}, ${d.getFullYear()} ${hh}:${mm}:${ss} ${ampm}`;
}

const LINE_CLAMP_5 = { display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" };

// --- Response typography -------------------------------------------------
const HEADING_STYLE = {
  h1: { fontSize: 32, lineHeight: "42px" },
  h2: { fontSize: 24, lineHeight: "32px" },
  h3: { fontSize: 18, lineHeight: "24px" },
  h4: { fontSize: 14, lineHeight: "18px" },
};

function Bullet({ depth }) {
  const kind = depth % 4;
  if (kind === 0) return <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />;
  if (kind === 1) return <span style={{ width: 6, height: 6, borderRadius: "50%", border: "1.5px solid currentColor", boxSizing: "border-box", display: "inline-block" }} />;
  if (kind === 2) return <span style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "5px solid currentColor", display: "inline-block" }} />;
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" style={{ flexShrink: 0 }}>
      <polygon points="1,0 7,4 1,8" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// **bold**, *italic*, ~~strike~~, `code`, [text](url) links, and bare URLs.
function parseInline(text) {
  const { Link } = window.FusionDesignSystem_6db751;
  const re = /`([^`]+)`|\*\*([^*]+)\*\*|~~([^~]+)~~|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s)]+)/g;
  const out = [];
  let last = 0, match, key = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    if (match[1] !== undefined) out.push(<code key={key++} style={{ fontFamily: "var(--salt-typography-fontFamily-mono)", fontSize: "0.9em", background: "var(--salt-color-background-marble)", borderRadius: "var(--salt-curve-50, 4px)", padding: "1px var(--salt-spacing-50)" }}>{match[1]}</code>);
    else if (match[2] !== undefined) out.push(<strong key={key++} style={{ fontWeight: "var(--salt-text-fontWeight-strong)" }}>{match[2]}</strong>);
    else if (match[3] !== undefined) out.push(<s key={key++}>{match[3]}</s>);
    else if (match[4] !== undefined) out.push(<em key={key++}>{match[4]}</em>);
    else if (match[5] !== undefined) out.push(<Link key={key++} href={match[6]} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "var(--salt-spacing-25, 4px)" }}>{match[5]}<ChatIcon name="tear-out" size={10} /></Link>);
    else if (match[7] !== undefined) out.push(<Link key={key++} href={match[7]} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "var(--salt-spacing-25, 4px)" }}>{match[7]}<ChatIcon name="tear-out" size={10} /></Link>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function listIndent(depth) {
  if (depth <= 0) return 0;
  return depth === 1 ? 24 : 16;
}

function UnorderedList({ items, depth = 0 }) {
  return (
    <div style={{ paddingLeft: listIndent(depth), display: "flex", flexDirection: "column", gap: "var(--salt-spacing-50)" }}>
      {items.map((it, idx) => (
        <React.Fragment key={idx}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--salt-spacing-100)" }}>
            <span style={{ flexShrink: 0, width: 8, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Bullet depth={depth} /></span>
            <div style={{ flex: 1, minWidth: 0 }}><span>{parseInline(it.text)}</span></div>
          </div>
          {it.children && <UnorderedList items={it.children} depth={depth + 1} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function toAlpha(n) {
  let s = "";
  while (n > 0) { n--; s = String.fromCharCode(97 + (n % 26)) + s; n = Math.floor(n / 26); }
  return s;
}
function toRoman(n) {
  const vals = [[1000, "m"], [900, "cm"], [500, "d"], [400, "cd"], [100, "c"], [90, "xc"], [50, "l"], [40, "xl"], [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"]];
  let s = "", num = n;
  for (const [v, sym] of vals) { while (num >= v) { s += sym; num -= v; } }
  return s;
}
function ordinalLabel(depth, index) {
  const kind = depth % 3;
  const n = index + 1;
  if (kind === 0) return `${n}.`;
  if (kind === 1) return `${toAlpha(n)}.`;
  return `${toRoman(n)}.`;
}

function OrderedList({ items, depth = 0 }) {
  return (
    <div style={{ paddingLeft: listIndent(depth), display: "flex", flexDirection: "column", gap: "var(--salt-spacing-50)" }}>
      {items.map((it, idx) => (
        <React.Fragment key={idx}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--salt-spacing-100)" }}>
            <span style={{ flexShrink: 0, minWidth: 18, textAlign: "right" }}>{ordinalLabel(depth, idx)}</span>
            <div style={{ flex: 1, minWidth: 0 }}><span>{parseInline(it.text)}</span></div>
          </div>
          {it.children && <OrderedList items={it.children} depth={depth + 1} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function Blockquote({ text, children, depth = 0 }) {
  return (
    <blockquote style={{ margin: 0, borderLeft: "3px solid var(--salt-color-gray-300)", paddingLeft: "var(--salt-spacing-100)", color: "var(--salt-content-secondary-foreground)", fontStyle: depth > 0 ? "italic" : "normal" }}>
      <div>{parseInline(text)}</div>
      {children && <div style={{ marginTop: "var(--salt-spacing-100)" }}><Blockquote {...children} depth={depth + 1} /></div>}
    </blockquote>
  );
}

function ExpandableBlock({ block, onSelectComparisonOption }) {
  const { Button } = window.FusionDesignSystem_6db751;
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--salt-content-secondary-foreground)", marginBottom: "var(--salt-spacing-75)" }}>
        <SparkleIcon size={12} />{block.summaryLabel || "Overview"}
      </div>
      {block.summary && <ResponseContent blocks={block.summary} onSelectComparisonOption={onSelectComparisonOption} />}
      {expanded && block.details && <ResponseContent blocks={block.details} onSelectComparisonOption={onSelectComparisonOption} />}
      <Button appearance="transparent" sentiment="accented" onClick={() => setExpanded((v) => !v)}>
        {expanded ? <CollapseAllIcon size={12} /> : <ExpandAllIcon size={12} />}
        {expanded ? (block.collapseLabel || "View less") : (block.expandLabel || "View more")}
      </Button>
    </div>
  );
}

function InlineSourceTag({ source }) {
  const { Tag, Tooltip } = window.FusionDesignSystem_6db751;
  const [hovered, setHovered] = useState(false);
  const open = () => window.open(source.url, "_blank", "noopener,noreferrer");
  return (
    <Tooltip
      status="plain"
      content={<div><div style={{ fontWeight: "var(--salt-text-fontWeight-strong)" }}>{source.title}</div>{source.description && <div style={{ marginTop: "var(--salt-spacing-25, 4px)" }}>{source.description}</div>}</div>}
    >
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={open}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") open(); }}
        style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}
      >
        <Tag color="neutral"><span style={{ display: "inline-flex", alignItems: "center", gap: "var(--salt-spacing-25, 4px)" }}>{hovered && <ChatIcon name="tear-out" size={10} />}{source.platform}</span></Tag>
      </span>
    </Tooltip>
  );
}

function ResponseBlock({ block, onSelectComparisonOption, allImageBlocks }) {
  const isHeading = HEADING_STYLE[block.type];
  if (isHeading) {
    const Tag = block.type;
    return <Tag style={{ margin: 0, fontFamily: "var(--salt-text-h1-fontFamily, var(--salt-text-fontFamily))", fontWeight: "var(--salt-text-fontWeight-strong)", color: "var(--salt-content-primary-foreground)", ...isHeading }}>{parseInline(block.text)}</Tag>;
  }
  switch (block.type) {
    case "blockquote": return <Blockquote text={block.text} children={block.children} />;
    case "ol": return <OrderedList items={block.items} />;
    case "ul": return <UnorderedList items={block.items} />;
    case "disclaimer": return <div style={{ fontStyle: "italic", fontSize: "var(--salt-text-label-fontSize, 12px)", color: "var(--salt-content-secondary-foreground)" }}>{parseInline(block.text)}</div>;
    case "files": return <FileResultsGrid files={block.files} columns={block.columns} actions={false} />;
    case "status": {
      const { StatusMessage } = window.FusionDesignSystem_6db751;
      return <StatusMessage status={block.status || "info"} title={block.statusTitle}>{block.text}</StatusMessage>;
    }
    case "code": return <CodeBlock code={block.code} diffLines={block.diffLines} language={block.language} title={block.codeTitle} />;
    case "image": {
      const images = (allImageBlocks || []).map((b) => ({ src: b.imageSrc, alt: b.imageAlt }));
      const idx = (allImageBlocks || []).indexOf(block);
      return <ImagePreview src={block.imageSrc} alt={block.imageAlt} images={images} index={idx} />;
    }
    case "artifact": return <ArtifactCard bordered {...block.artifact} />;
    case "form": return <InlineFormCard {...block.form} />;
    case "comparison": return <AnswerComparison options={block.comparisonOptions} onSelect={(i) => onSelectComparisonOption && onSelectComparisonOption(block, i)} renderBlocks={(blocks) => <ResponseContent blocks={blocks} onSelectComparisonOption={onSelectComparisonOption} />} />;
    case "expandable": return <ExpandableBlock block={block} onSelectComparisonOption={onSelectComparisonOption} />;
    case "body": return <div style={{ fontSize: 14, lineHeight: "18px" }}>{parseInline(block.text)}{block.source && <> <InlineSourceTag source={block.source} /></>}</div>;
    default: return <div style={{ fontSize: 14, lineHeight: "18px" }}>{parseInline(block.text)}</div>;
  }
}

function ResponseContent({ blocks, onSelectComparisonOption }) {
  const allImageBlocks = blocks.filter((b) => b.type === "image");
  return (
    <div>
      {blocks.map((block, i) => {
        const isHeading = !!HEADING_STYLE[block.type];
        const margin = isHeading
          ? { marginTop: i === 0 ? 0 : "var(--salt-spacing-50)", marginBottom: "var(--salt-spacing-50)" }
          : { marginTop: 0, marginBottom: "var(--salt-spacing-100)" };
        return <div key={i} style={margin}><ResponseBlock block={block} onSelectComparisonOption={onSelectComparisonOption} allImageBlocks={allImageBlocks} /></div>;
      })}
    </div>
  );
}
// --------------------------------------------------------------------------

const TOOLBAR_HEIGHT = 28;
const TOOLBAR_GAP = 8;
const TOOLBAR_SAFE_HEIGHT = TOOLBAR_HEIGHT + TOOLBAR_GAP;
const EDIT_BOX_COLOR = "#DCF7F7";
const EDIT_TAG_COLOR = "#2A8285";

function UserMessage({ m, i, onCopy, onSubmitEdit, onChangeVersion }) {
  const { IconButton, Link, Button, Tag, Textarea } = window.FusionDesignSystem_6db751;
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(m.text || "");
  const [copied, setCopied] = useState(false);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el || editing) return;
    setCanExpand(el.scrollHeight - el.clientHeight > 2);
  }, [m.text, editing]);

  const attachments = m.attachments || [];
  const singleImage = attachments.length === 1 && isImageAttachment(attachments[0]);
  const versionCount = m.versionCount || 1;
  const activeVersion = m.activeVersion || 1;

  const openEdit = () => { setDraft(m.text || ""); setEditing(true); };
  const submitEdit = () => { setEditing(false); onSubmitEdit && onSubmitEdit(m, draft, i); };
  const cancelEdit = () => setEditing(false);
  const handleCopy = () => {
    onCopy && onCopy(m, i);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      style={{ paddingLeft: 140, paddingRight: "var(--salt-spacing-200)", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "flex-end", position: "relative", paddingBottom: TOOLBAR_SAFE_HEIGHT, marginBottom: -TOOLBAR_SAFE_HEIGHT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {attachments.length > 0 && !singleImage && (
        <AttachmentTileGroup items={attachments} style={{ width: "fit-content", maxWidth: "100%", marginBottom: "var(--salt-spacing-100)" }} />
      )}
      {singleImage && (
        <img
          src={attachments[0].imageUrl}
          alt={attachments[0].title || attachments[0].name || "Attached image"}
          style={{ display: "block", maxHeight: 320, maxWidth: "100%", width: "auto", height: "auto", borderRadius: "var(--salt-curve-200)", marginBottom: "var(--salt-spacing-100)", objectFit: "contain" }}
        />
      )}
      {editing ? (
        <div style={{ width: "100%", boxSizing: "border-box", background: EDIT_BOX_COLOR, borderRadius: "var(--salt-curve-200)", padding: "var(--salt-spacing-200)" }}>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            autoFocus
            style={{ width: "100%" }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--salt-spacing-150)", marginTop: "var(--salt-spacing-150)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", minWidth: 0 }}>
              <Tag color="neutral" style={{ "--tag-primary-background": EDIT_TAG_COLOR, "--tag-primary-foreground": "#fff", "--tag-primary-borderColor": EDIT_TAG_COLOR }}>Editing</Tag>
              <span style={{ fontStyle: "italic", fontSize: "var(--salt-text-label-fontSize, 12px)", color: "var(--salt-content-secondary-foreground)" }}>Editing this message will generate a new reply below. Previous versions stay available.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)", flexShrink: 0 }}>
              <Button appearance="bordered" sentiment="neutral" onClick={cancelEdit}>Cancel</Button>
              <Button appearance="solid" sentiment="accented" onClick={submitEdit}>Submit</Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {m.text && (
            <div style={{ maxWidth: "100%", width: "fit-content", boxSizing: "border-box", background: "var(--salt-palette-background-secondary)", borderRadius: "var(--salt-curve-200)", padding: "var(--salt-spacing-75) var(--salt-spacing-100)" }}>
              <div ref={textRef} style={{ fontSize: 14, lineHeight: 1.55, textAlign: "left", whiteSpace: "pre-wrap", wordBreak: "break-word", ...(expanded ? {} : LINE_CLAMP_5) }}>{m.text}</div>
              {canExpand && (
                <div style={{ marginTop: "var(--salt-spacing-50)", textAlign: "left" }}>
                  <Link href="#" variant="secondary" underline="never" onClick={(e) => { e.preventDefault(); setExpanded((v) => !v); }}>{expanded ? "View less" : "View more"}</Link>
                </div>
              )}
            </div>
          )}
          <div style={{ position: "absolute", bottom: 0, left: 140, right: "var(--salt-spacing-200)", height: TOOLBAR_HEIGHT, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", opacity: hovered ? 1 : 0, pointerEvents: hovered ? "auto" : "none", transition: "opacity .1s" }}>
            {versionCount > 1 ? (
              <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-50)" }}>
                <IconButton aria-label="Previous version" title="Previous version" appearance="transparent" sentiment="neutral" disabled={activeVersion <= 1} onClick={() => onChangeVersion && onChangeVersion(m, activeVersion - 1, i)}><ChatIcon name="chevron-left" size={12} /></IconButton>
                <span style={{ fontSize: 12, color: "var(--salt-content-secondary-foreground)", whiteSpace: "nowrap" }}>{activeVersion} / {versionCount}</span>
                <IconButton aria-label="Next version" title="Next version" appearance="transparent" sentiment="neutral" disabled={activeVersion >= versionCount} onClick={() => onChangeVersion && onChangeVersion(m, activeVersion + 1, i)}><ChatIcon name="chevron-right" size={12} /></IconButton>
              </div>
            ) : <span />}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)" }}>
              {m.timestamp && <span title={formatFullTimestamp(m.timestamp)} style={{ fontSize: 12, color: "var(--salt-content-secondary-foreground)", whiteSpace: "nowrap" }}>{formatShortDate(m.timestamp)}</span>}
              {onCopy && <IconButton aria-label="Copy message" title={copied ? "Copied" : "Copy message"} appearance="transparent" sentiment={copied ? "positive" : "neutral"} onClick={handleCopy}><ChatIcon name={copied ? "check" : "copy"} size={14} /></IconButton>}
              {onSubmitEdit && <IconButton aria-label="Edit message" title="Edit message" appearance="transparent" sentiment="neutral" onClick={openEdit}><ChatIcon name="edit" size={14} /></IconButton>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AgentMessage({ m, i, onCopy, onRetry, onFeedback, onDownload, onSelectComparisonOption }) {
  const { IconButton } = window.FusionDesignSystem_6db751;
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const feedback = m.feedback;

  const handleCopy = () => { onCopy && onCopy(m, i); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div
      style={{ paddingLeft: "var(--salt-spacing-200)", paddingRight: "var(--salt-spacing-200)", boxSizing: "border-box", fontSize: 14, lineHeight: 1.6, position: "relative", paddingBottom: TOOLBAR_SAFE_HEIGHT, marginBottom: -TOOLBAR_SAFE_HEIGHT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: 12, color: "var(--salt-content-secondary-foreground)", marginBottom: "var(--salt-spacing-50)" }}>{m.name}{m.time ? ` · ${m.time}` : ""}</div>
      {m.blocks ? <ResponseContent blocks={m.blocks} onSelectComparisonOption={onSelectComparisonOption} /> : <div>{m.text}</div>}
      <div style={{ position: "absolute", bottom: 0, left: "var(--salt-spacing-200)", right: "var(--salt-spacing-200)", height: TOOLBAR_HEIGHT, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "var(--salt-spacing-75)", opacity: hovered ? 1 : 0, pointerEvents: hovered ? "auto" : "none", transition: "opacity .1s" }}>
        {onRetry && <IconButton aria-label="Retry" title="Retry" appearance="transparent" sentiment="neutral" onClick={() => onRetry(m, i)}><ChatIcon name="refresh" size={14} /></IconButton>}
        {onFeedback && <IconButton aria-label="Helpful" title="Helpful" appearance="transparent" sentiment="neutral" onClick={() => onFeedback(m, "up", i)}><ChatIcon name={feedback === "up" ? "thumb-up-solid" : "thumb-up"} size={14} color={feedback === "up" ? "var(--salt-palette-accent)" : undefined} /></IconButton>}
        {onFeedback && <IconButton aria-label="Not helpful" title="Not helpful" appearance="transparent" sentiment="neutral" onClick={() => onFeedback(m, "down", i)}><ChatIcon name={feedback === "down" ? "thumb-down-solid" : "thumb-down"} size={14} color={feedback === "down" ? "var(--salt-palette-accent)" : undefined} /></IconButton>}
        {onCopy && <IconButton aria-label="Copy message" title={copied ? "Copied" : "Copy message"} appearance="transparent" sentiment={copied ? "positive" : "neutral"} onClick={handleCopy}><ChatIcon name={copied ? "check" : "copy"} size={14} /></IconButton>}
        {onDownload && <IconButton aria-label="Download" title="Download" appearance="transparent" sentiment="neutral" onClick={() => onDownload(m, i)}><ChatIcon name="download" size={14} /></IconButton>}
        {m.timestamp && <span title={formatFullTimestamp(m.timestamp)} style={{ fontSize: 12, color: "var(--salt-content-secondary-foreground)", whiteSpace: "nowrap" }}>{formatShortDate(m.timestamp)}</span>}
      </div>
    </div>
  );
}

function MessageRow({ m, i, onCopyMessage, onSubmitEdit, onChangeVersion, onSelectComparisonOption, onRetryMessage, onFeedback, onDownloadMessage, agentPad, Spinner }) {
  if (m.role === "user") return (
    <UserMessage
      i={i}
      m={m}
      onCopy={onCopyMessage}
      onSubmitEdit={onSubmitEdit}
      onChangeVersion={onChangeVersion}
    />
  );
  if (m.role === "agent") return (
    <AgentMessage m={m} i={i} onCopy={onCopyMessage} onRetry={onRetryMessage} onFeedback={onFeedback} onDownload={onDownloadMessage} onSelectComparisonOption={onSelectComparisonOption} />
  );
  if (m.role === "status") return (
    <div style={{ ...agentPad, boxSizing: "border-box", display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)", fontSize: 13, color: m.done ? "var(--salt-content-primary-foreground)" : "var(--salt-content-secondary-foreground)" }}>
      {!m.done && <Spinner size={14} />}
      {m.done && <span style={{ color: "var(--salt-color-green-600)", display: "inline-flex" }}><CheckIcon /></span>}
      <span>{m.text}</span>
    </div>
  );
  if (m.role === "typing") return (
    <div style={{ ...agentPad, boxSizing: "border-box", fontSize: 14 }}>
      <div style={{ fontSize: 12, color: "var(--salt-content-secondary-foreground)", marginBottom: "var(--salt-spacing-50)" }}>{m.name}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-100)" }}>
        <div className="ca-typing"><span></span><span></span><span></span></div>
        <TypingLabel label={m.label} labels={m.labels} intervalMs={m.labelIntervalMs} />
      </div>
    </div>
  );
  return null;
}

function TypingLabel({ label, labels, intervalMs = 2200 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!labels || labels.length < 2) return;
    const id = setInterval(() => setI((x) => (x + 1) % labels.length), intervalMs);
    return () => clearInterval(id);
  }, [labels, intervalMs]);
  const text = labels && labels.length ? labels[i] : label;
  if (!text) return null;
  return <span key={labels ? i : text} className="ca-typing-label" style={{ fontSize: 12, color: "var(--salt-content-secondary-foreground)" }}>{text}</span>;
}

const TEST_GRADIENT = "linear-gradient(135deg, var(--salt-color-blue-500), var(--salt-color-purple-500), var(--salt-color-teal-500))";
const SparkleIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 12 12" width={size} height={size} fill="var(--salt-palette-accent)" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M8.8182 1.81818L9.50002 0L10.1818 1.81818L12 2.50006L10.1818 3.18187L9.49998 5L8.81818 3.18176L7 2.49994L8.8182 1.81818Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M5.5 1L7 5L11 6.5L7 8L5.5 12L4 8L0 6.5L4 5L5.5 1ZM6.22327 5.77673L8.152 6.5L6.22327 7.22327L5.5 9.152L4.77673 7.22327L2.848 6.5L4.77673 5.77673L5.5 3.848L6.22327 5.77673Z" />
  </svg>
);
const ExpandAllIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M6 0L2 4L3 5L6 2L9 5L10 4L6 0Z" />
    <path d="M6 12L2 8L3 7L6 10L9 7L10 8L6 12Z" />
  </svg>
);
const CollapseAllIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 12 12" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M6 6.5L2 10.5L3 11.5L6 8.5L9 11.5L10 10.5L6 6.5Z" />
    <path d="M6 5.5L2 1.5L3 0.5L6 3.5L9 0.5L10 1.5L6 5.5Z" />
  </svg>
);

function TestModeGroup({ messages: groupMessages, startIndex, rowProps, viewportHeight }) {
  const { Accordion, Button } = window.FusionDesignSystem_6db751;
  const [openIndex, setOpenIndex] = React.useState(-1);
  const [showSummary, setShowSummary] = React.useState(true);
  const [boxHeight, setBoxHeight] = React.useState(null);
  const [released, setReleased] = React.useState(false);
  const rootRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const count = groupMessages.length;
  const isOpen = openIndex !== -1;
  const summary = groupMessages.find((m) => m.testSummary)?.testSummary || `${count} message${count === 1 ? "" : "s"} exchanged while testing this prompt.`;

  React.useEffect(() => {
    if (!isOpen) { setBoxHeight(null); setReleased(false); return; }
    let sp = rootRef.current && rootRef.current.parentElement;
    while (sp && sp !== document.body) {
      const cs = window.getComputedStyle(sp);
      if (cs.overflowY === "auto" || cs.overflowY === "scroll") break;
      sp = sp.parentElement;
    }
    if (!sp) return;
    const HEADER_H = 44;
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!rootRef.current) return;
        const next = rootRef.current.nextElementSibling;
        const containerTop = sp.getBoundingClientRect().top;
        const nextTop = next ? next.getBoundingClientRect().top : Infinity;
        const avail = nextTop - containerTop;
        if (avail <= HEADER_H) setReleased(true);
        else setBoxHeight(Math.min(viewportHeight || avail, avail));
      });
    };
    sp.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { sp.removeEventListener("scroll", onScroll); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isOpen, viewportHeight]);

  const toggleView = (e) => {
    e.stopPropagation();
    setShowSummary((s) => !s);
    setOpenIndex(0);
  };

  const collapsedFill = "linear-gradient(135deg, color-mix(in srgb, var(--salt-color-blue-500) 15%, transparent), color-mix(in srgb, var(--salt-color-purple-500) 15%, transparent), color-mix(in srgb, var(--salt-color-teal-500) 15%, transparent)), var(--salt-palette-background-secondary)";
  const effectiveMax = isOpen ? (boxHeight ?? viewportHeight ?? undefined) : undefined;
  return (
    <div ref={rootRef} style={{ paddingLeft: "var(--salt-spacing-200)", paddingRight: "var(--salt-spacing-200)", boxSizing: "border-box", position: (isOpen && !released) ? "sticky" : "static", top: 0, zIndex: 2, display: "flex", flexDirection: "column", minHeight: 0, maxHeight: effectiveMax }}>
      <div style={{ padding: 2, borderRadius: "calc(var(--salt-palette-corner-soft, 24px) + 2px)", background: TEST_GRADIENT, boxSizing: "border-box", display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
        <div style={{ background: isOpen ? "var(--salt-palette-background-secondary)" : collapsedFill, borderRadius: "var(--salt-palette-corner-soft, 24px)", overflow: "hidden", boxSizing: "border-box", padding: 4, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>
          <Accordion
            variant="inline"
            bordered={false}
            fillHeight
            style={{ flex: "1 1 auto", minHeight: 0 }}
            open={openIndex}
            onOpenChange={(v) => setOpenIndex(v)}
            items={[{
              title: `Test Mode — ${count} message${count === 1 ? "" : "s"}`,
              headerStyle: { paddingRight: 184 },
              contentStyle: { paddingLeft: 0, paddingRight: 0 },
              content: showSummary ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-75)", paddingLeft: "var(--salt-spacing-200)", paddingRight: "var(--salt-spacing-200)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--salt-spacing-75)", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--salt-content-secondary-foreground)" }}><SparkleIcon size={12} />AI-generated Summary</div>
                  <div style={{ fontSize: 14, lineHeight: "18px", color: "var(--salt-content-primary-foreground)" }}>{summary}</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-450)" }}>
                  {groupMessages.map((m, gi) => (
                    <MessageRow key={gi} m={m} i={startIndex + gi} {...rowProps} agentPad={{}} />
                  ))}
                </div>
              ),
            }]}
          />
          <div style={{ position: "absolute", top: 0, right: "var(--salt-spacing-150)", height: 44, display: "flex", alignItems: "center", zIndex: 1 }}>
            <Button appearance="transparent" sentiment="accented" onClick={toggleView} style={{ whiteSpace: "nowrap" }}>
              {showSummary ? "View Full Conversation" : "View AI-generated Summary"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function groupTestModeRuns(messages) {
  const groups = [];
  let i = 0;
  while (i < messages.length) {
    if (messages[i].testMode) {
      const start = i;
      const run = [];
      while (i < messages.length && messages[i].testMode) { run.push(messages[i]); i++; }
      groups.push({ type: "test", messages: run, startIndex: start });
    } else if (messages[i].role === "status") {
      const start = i;
      const run = [];
      while (i < messages.length && messages[i].role === "status" && !messages[i].testMode) { run.push(messages[i]); i++; }
      groups.push({ type: "status", messages: run, startIndex: start });
    } else {
      groups.push({ type: "single", message: messages[i], index: i });
      i++;
    }
  }
  return groups;
}

/**
 * Fusion ConversationArea — the scrollable message list for a chat:
 * right-aligned user bubbles (hug their content up to the available
 * width, then wrap; a 5-line clamp with a "View more"/"View less"
 * toggle for longer text; a hover-only toolbar — a version-count
 * nav (when edited), date, Copy, and Edit — sits in the gap below
 * the bubble without adding space; attachments render as an
 * AttachmentTileGroup carousel above the bubble, or, for a single
 * photo, a large aspect-ratio-preserved preview), plain left-aligned
 * agent replies (name + time meta line), status rows (spinner while
 * pending, a check once done), and a three-dot typing indicator.
 * Pass `m.blocks` on an agent message for structured response
 * typography instead of plain `m.text`: heading1-4 (32/42, 24/32,
 * 18/24, 14/18 — 8px/spacing-50 top+bottom), body (14/18, 16px/
 * spacing-100 bottom), blockquote (nestable, text 16px right of its
 * border at every depth), ol (1/a/i nesting; no indent on tier 1, 24px
 * on tier 2, +16px each deeper tier), ul (solid dot / outline dot /
 * solid caret / outline caret nesting, same indent rule), and
 * disclaimer, status (renders a StatusMessage — info/success/
 * warning/error — for inline status lines inside a response), and
 * code (renders a CodeBlock — plain code, or a diff view via
 * `diffLines`), image (renders an ImagePreview — hover Copy/Expand
 * toolbar, Expand opens a Dialog), artifact (renders a bordered
 * ArtifactCard — eyebrow, title, description, metadata StaticListGroup, and
 * right-aligned Download/View actions; same anatomy as ArtifactsPanel's
 * Library rows, minus the border), form (renders an InlineFormCard — a
 * chat-native, possibly multi-step, form with a ComboBoxMetadataOverlay
 * field, a FileUpload pattern, and Skip/Next actions), and comparison (renders an AnswerComparison — an
 * even split of one Card per option, each with a "Choose Option A"-style
 * button; collapses to Tabs on narrow widths; wire `onSelectComparisonOption`), and expandable (always
 * shows `summary` blocks — e.g. an AI overview — plus a "View more"/
 * "View less" ghost button revealing `details` blocks) — every block's inline text supports **bold**, *italic*,
 * ~~strike~~, `code` (marble/#F5F7F8 background, 8px/spacing-50 left+
 * right), [anchor](url) links, and bare https:// URLs (both link
 * kinds append a tear-out icon). A "files" block renders a
 * FileResultsGrid (bottom-bordered header+rows, no Actions column —
 * pass extra `columns` when the content calls for more than File
 * name/Size, scaled to what the chat width fits).
 * Autoscrolls to the latest message. No header or composer of its own
 * — pair with ChatHeader above and PromptInput below inside
 * ChatLayout's central panel.
 * Pass `onCopyMessage` to wire the hover toolbar's Copy button — it
 * swaps to a checkmark and "Copied" title for 1.5s after click.
 * Pass `onSubmitEdit` to enable the Edit button — clicking it swaps
 * the bubble for an inline editor (a #DCF7F7 box with a proper
 * Textarea, prefilled with the message text, and an "Editing" tag
 * tinted #2A8285); Submit calls `onSubmitEdit(message, newText,
 * index)` for the host to bump the version count and generate a new
 * reply, Cancel discards. Both buttons are omitted from the toolbar
 * unless their handler is passed.
 * Pass `m.versionCount`/`m.activeVersion` (1-based) on a message to
 * show a chevron/version-number nav at the left of the hover toolbar
 * (date, Copy, Edit sit at the right); `onChangeVersion(message,
 * newVersion, index)` fires on either arrow — swap in that version's
 * text/attachments/trailing responses.
 * Pass `label` on a "typing" message for static text after the three
 * dots, or `labels` (an array) to cycle through several — surfacing what's
 * actually happening (e.g. "Reading the mailbox export…", "Cross-
 * referencing desk leads…") instead of one static line; cycles every
 * `labelIntervalMs` (default 2200ms) with a small fade-in per line.
 * Consecutive status rows (a build-progress checklist, not separate
 * prompts) render tightly grouped with a small internal gap instead of
 * the normal inter-message spacing.
 * Pass `testMode: true` on a run of contiguous messages to group them
 * into a single collapsed "Test Mode — N messages" Accordion (gradient-
 * bordered, matching PromptInput's Test Mode styling) instead of
 * rendering them inline. On first expansion it shows an AI-generated
 * summary (from `testSummary` on any message in the run, or a generic
 * fallback) rather than the raw messages; a "View Full Conversation"
 * link — always visible in the header, collapsed or expanded — swaps to
 * the full message list and back ("View AI-generated Summary"),
 * expanding the accordion if it was collapsed.
 * Agent messages get their own hover-only, left-aligned action strip
 * (mirroring the user bubble's toolbar): Retry, Helpful/Not Helpful
 * (highlighted per `m.feedback`), Copy, Download, and a date stamp
 * (same short/full-tooltip format as user messages) — each button
 * omitted unless its handler (`onRetryMessage`, `onFeedback`,
 * `onCopyMessage`, `onDownloadMessage`) is passed.
 * Requires FusionDesignSystem_6db751 (Spinner, IconButton, Link,
 * StatusMessage, Accordion, and ../display/CodeBlock.jsx for "code" blocks,
 * ../display/ImagePreview.jsx (and its Dialog dependency) for "image" blocks,
 * ../chat/ArtifactCard.jsx for "artifact" blocks,
 * ../chat/InlineFormCard.jsx for "form" blocks,
 * ../chat/AnswerComparison.jsx for "comparison" blocks,
 * Button, Tag, Textarea, Table family), ./ConversationArea.css
 * (typing-dot keyframes), and ./FileResultsGrid.css (for "files"
 * blocks) loaded once per page.
 */
export { ResponseContent };
export function ConversationArea({ messages = [], emptyState, onCopyMessage, onSubmitEdit, onChangeVersion, onSelectComparisonOption, onRetryMessage, onFeedback, onDownloadMessage, onAtBottomChange, scrollToBottomSignal, style }) {
  const { Spinner } = window.FusionDesignSystem_6db751;
  const scrollRef = useRef(null);
  const atBottomRef = useRef(true);
  const [viewportHeight, setViewportHeight] = useState(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (el && atBottomRef.current) el.scrollTop = el.scrollHeight;
  }, [messages]);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
      if (atBottom !== atBottomRef.current) {
        atBottomRef.current = atBottom;
        onAtBottomChange && onAtBottomChange(atBottom);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [onAtBottomChange]);
  useEffect(() => {
    if (scrollToBottomSignal == null) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    atBottomRef.current = true;
    onAtBottomChange && onAtBottomChange(true);
  }, [scrollToBottomSignal]);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => setViewportHeight(entries[0].contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const agentPad = { paddingLeft: "var(--salt-spacing-200)", paddingRight: "var(--salt-spacing-200)" };
  const rowProps = { onCopyMessage, onSubmitEdit, onChangeVersion, onSelectComparisonOption, onRetryMessage, onFeedback, onDownloadMessage, Spinner };
  const groups = groupTestModeRuns(messages);

  return (
    <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingTop: "var(--salt-spacing-200)", paddingBottom: "var(--salt-spacing-200)", fontFamily: "var(--salt-text-fontFamily)", ...style }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "var(--salt-spacing-450)" }}>
        {messages.length === 0 && emptyState}
        {groups.map((g, gi) => {
          if (g.type === "test") return <TestModeGroup key={gi} messages={g.messages} startIndex={g.startIndex} rowProps={rowProps} viewportHeight={viewportHeight} />;
          if (g.type === "status") return (
            <div key={gi} style={{ display: "flex", flexDirection: "column", gap: "var(--salt-spacing-100)" }}>
              {g.messages.map((m, gj) => <MessageRow key={gj} m={m} i={g.startIndex + gj} {...rowProps} agentPad={agentPad} />)}
            </div>
          );
          return <MessageRow key={gi} m={g.message} i={g.index} {...rowProps} agentPad={agentPad} />;
        })}
      </div>
    </div>
  );
}
