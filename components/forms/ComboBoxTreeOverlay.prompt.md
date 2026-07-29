`ComboBoxTreeOverlay` nests options into parent/child folders instead of a flat list — for choosing from hierarchical data (org structures, category trees, file paths).

```jsx
<ComboBoxTreeOverlay
  multiselect
  nodes={[
    { value: "americas", label: "Americas", children: [{ value: "us", label: "United States" }, { value: "ca", label: "Canada" }] },
    { value: "emea", label: "EMEA", children: [{ value: "uk", label: "United Kingdom" }, { value: "de", label: "Germany" }] },
  ]}
/>
```

Single-select rows show a chevron-right (collapsed) / chevron-down (expanded) on any node with children; clicking the chevron toggles expansion, clicking the rest of the row selects that node (folder or leaf) and closes the overlay. Multiselect adds a tri-state `Checkbox` between the chevron and label on every row, parents included, plus a "Select all" row pinned above the tree — checking a parent selects its entire subtree, and a parent shows indeterminate (dash) when only some of its descendants are checked.

Multiselect field pills collapse each top-level branch to one chip: the branch's own label plus a count in parentheses of everything selected beneath it, itself included only when the branch is fully (not partially/indeterminately) selected — e.g. "EMEA (3)". Removing a pill clears that entire branch. Same overflow-to-"+n" and expand-to-3-rows behavior as the plain `ComboBox` and `ComboBoxMetadataOverlay`.
