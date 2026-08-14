ImagePreview is a thumbnail with a hover toolbar (Copy, Download, Expand). Use inside a ConversationArea agent response (`"image"` block type, which auto-groups sibling image blocks into a gallery) or standalone wherever an image needs quick copy/download/expand actions.

```jsx
<ImagePreview src="/chart.png" alt="Q3 revenue by desk" />
```

Copy writes the image to the clipboard as a PNG; Download saves it. Expand opens the full-size image in a Dialog (900px max width, 80vh max height) — no extra wiring needed, it owns its own open state.

For multiple images from one response, pass the full set plus each thumbnail's position — the expand dialog then gets a Back/Next + "n of N" footer:

```jsx
const images = [{ src: "/a.png", alt: "Chart A" }, { src: "/b.png", alt: "Chart B" }];
images.map((img, i) => <ImagePreview key={i} src={img.src} alt={img.alt} images={images} index={i} />);
```

Requires the Dialog component on the design-system namespace.
