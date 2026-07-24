StatusBadge is a 12x12 icon + label pair for record/workflow state. Pass `status` from the built-in vocabulary (Not Started, Draft, Active, Pending, Approved, Proposed, Paused, Removing, Decommissioned, Test Loading, Running, In Progress, Rerun Test, Failed, Archived, Expired, Test Reverted, No, ...) and the icon + color resolve automatically.

```jsx
<StatusBadge status="Approved" />
<StatusBadge status="In Progress" />
<StatusBadge status="Rejected" />
<StatusBadge status="Review Required" />
```

Icon and label sit in a spacing-75 gap; label uses the default body text color. Override `icon`/`color` for a status outside the built-in map.
