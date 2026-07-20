---
title: REACT_STABLE_CONTEXT_PROVIDER_VALUE
product: vercel
url: /docs/conformance/rules/REACT_STABLE_CONTEXT_PROVIDER_VALUE
canonical_url: "https://vercel.com/docs/conformance/rules/REACT_STABLE_CONTEXT_PROVIDER_VALUE"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Prevent non-stable values from being used in React Context providers that could cause unnecessary re-renders.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/react_stable_context_provider_value.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "9a1a64d2b9558ec139e46738f2e787b578b65ec5a41d38c9936b47655745e88c"
---

# REACT_STABLE_CONTEXT_PROVIDER_VALUE

> **🔒 Permissions Required**: Conformance

When non-stable values (i.e. object identities) are used as the `value` prop for `Context.Provider`,
React will trigger cascading updates to all components that use this context value on each
render, causing needless re-renders (affecting application performance) or causing
unintended consequences that may negatively affect the user-experience.

## Examples

Examples of incorrect code for this rule:

```jsx
return <SomeContext.Provider value={{ foo: 'bar' }}>...</SomeContext.Provider>;
```

Examples of correct code for this rule:

```jsx
const foo = useMemo(() => ({ foo: 'bar' }), []);

return <SomeContext.Provider value={foo}>...</SomeContext.Provider>;
```

## How to fix

One way to fix this issue may be to wrap the value in a `useMemo()`. If the value is a function
then `useCallback()` can be used as well. See the above examples for a reference on how you might
fix this by wrapping with `useMemo`.


---

[View full sitemap](/docs/sitemap)
