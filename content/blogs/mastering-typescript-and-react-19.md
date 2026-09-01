---
title: "Mastering TypeScript & React 19: Design Patterns"
date: "2026-02-05"
excerpt: "Learn strict type safety techniques, custom hooks patterns, and generic component design for enterprise TypeScript applications."
author: "Manjeet Kumar"
readTime: "7 min read"
tags: ["TypeScript", "React", "Architecture", "Design Patterns"]
category: "Frontend"
featured: true
---

# Mastering TypeScript & React 19: Design Patterns

TypeScript has become an industry standard for front-end software engineering. Combining strict type checking with React 19 allows engineering teams to catch bugs early, simplify refactoring, and provide clear API contracts across components.

## Advanced Type Inference in React

React 19 makes type inference much simpler when working with hooks and component props.

### 1. Discriminated Unions for Async UI State

Handling UI states (loading, error, success) cleanly can be achieved using discriminated unions in TypeScript:

```ts
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

function renderUI<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'loading':
      return <Spinner />
    case 'success':
      return <DataView data={state.data} />
    case 'error':
      return <ErrorMessage message={state.error.message} />
    default:
      return null
  }
}
```

---

## Building Generic and Reusable Components

Generic components enable high reusability while keeping total type safety intact.

### Flexible List Component

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
}

export function GenericList<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul className="divide-y divide-border">
      {items.map((item) => (
        <li key={keyExtractor(item)} className="py-2">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
```

---

## Best Practices Checklist

- **Avoid `any`**: Use `unknown` with type narrowing instead of `any`.
- **Use `as const`**: Freeze literal objects and arrays for exact string literal union inferencing.
- **Strict Null Checks**: Enable strict null checks in `tsconfig.json` to prevent null dereferencing crashes.

---

## Conclusion

By adopting strict type definitions and clean component patterns, you can create maintainable, self-documenting React codebases that scale effortlessly with team size and complexity.
