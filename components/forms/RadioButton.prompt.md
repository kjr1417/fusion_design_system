RadioButtonGroup picks exactly one option from a small, always-visible set — use Dropdown instead once options exceed ~6 or need to stay collapsed.

```jsx
<RadioButtonGroup name="tier" options={[{ label: "Standard", value: "std" }, { label: "Platinum", value: "plat" }]} defaultValue="std" />
```
