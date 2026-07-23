Lays out several `StaticList` label/value pairs as one group.

```jsx
<StaticListGroup orientation="horizontal" labelWidth="hug"
  items={[{ label: "Status", value: "Active" }, { label: "Region", value: "EMEA" }]} />

<StaticListGroup labelPosition="top" labelWidth="fluid"
  items={[{ label: "Owner", value: "J. Chen" }, { label: "Created", value: "Jan 4, 2026" }]} />

<StaticListGroup columns={3} labelWidth="fluid"
  items={[{label:"Owner",value:"J. Chen"},{label:"Created",value:"Jan 4"},{label:"Status",value:"Active"},
          {label:"Updated",value:"2h ago"},{label:"Region",value:"EMEA"},{label:"Tier",value:"Gold"}]} />
```

`orientation="horizontal"` renders one dot-separated row (columns forced to 1). `columns={2|3}` splits `items` sequentially into side-by-side columns with a spacing-600-padded divider (set `dividers={false}` to drop the rule and keep just the gap). Every other prop passes through to each `StaticList`.
