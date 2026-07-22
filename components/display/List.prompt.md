List renders a simple vertical collection — transactions, search results, activity feed rows.

```jsx
<List items={transactions} renderItem={(t) => <div>{t.merchant} — {t.amount}</div>} />
```
