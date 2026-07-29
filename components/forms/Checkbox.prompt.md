Checkbox toggles a single independent boolean option, or one item in a multi-select group.

```jsx
<Checkbox label="Email me a daily summary" defaultChecked />
```

Use RadioButtonGroup instead when only one of several options can be picked.

Pass `indeterminate` to render a dash instead of a check — for a parent row in a tree/group whose children are only partially selected (ignored while `checked` is also true):

```jsx
<Checkbox label="EMEA" checked={false} indeterminate />
```
