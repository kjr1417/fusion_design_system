ButtonBar is a full-width, 60px-baseline action toolbar for the bottom of a form, panel, or page — status text on the left, actions on the right.

```jsx
<ButtonBar
  statusMessage="Last saved: 2:41pm"
  primaryAction={{ label: "Save", onClick: save }}
  secondaryActions={[{ label: "Save as draft", onClick: saveDraft }]}
  tertiaryActions={[{ label: "Reset", onClick: reset }]}
/>
```

One primary action (solid/accented), up to two secondary (bordered/neutral) and two tertiary (transparent/neutral) actions, ordered tertiary → secondary → primary left to right so the primary sits rightmost. Pass `errorMessage` to show an error Banner directly left of the buttons.

Collision behavior (measured against container width, right side always wins):
1. Full width — status text, error banner, and all buttons.
2. Tight — status text is dropped first to make room for the error banner and buttons.
3. Tightest — secondary and tertiary actions collapse into a single overflow icon button (a menu). The primary action and error banner are never dropped.
