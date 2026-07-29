RadioButtonGroup picks exactly one option from a small, always-visible set — use Dropdown instead once options exceed ~6 or need to stay collapsed.

```jsx
<RadioButtonGroup name="tier" options={[{ label: "Standard", value: "std" }, { label: "Platinum", value: "plat" }]} defaultValue="std" />
```

Conditional forms: pair with `onChange` to reveal/hide the specific field(s) tied to the selected option (progressive disclosure within a section) — lower-priority than ToggleButtonGroup, which should be reserved for switching a whole section/panel. Only render (and validate) the fields for the current selection; hidden fields are ignored by validation.
