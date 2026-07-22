Button triggers a single action — form submits, dialogs, toolbar actions.

```jsx
<Button appearance="solid" sentiment="accented">Submit</Button>
<Button appearance="bordered" sentiment="neutral">Cancel</Button>
```

Variants: appearance (solid / bordered / transparent) × sentiment (accented / neutral / negative / positive / caution). Use solid+accented for the primary action per view, bordered+neutral for secondary, transparent for tertiary/toolbar actions.
