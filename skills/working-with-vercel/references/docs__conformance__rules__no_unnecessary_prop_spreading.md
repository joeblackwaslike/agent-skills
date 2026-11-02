---
title: NO_UNNECESSARY_PROP_SPREADING
product: vercel
url: /docs/conformance/rules/NO_UNNECESSARY_PROP_SPREADING
canonical_url: "https://vercel.com/docs/conformance/rules/NO_UNNECESSARY_PROP_SPREADING"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Disallows the usage of object spreading in a JSX component.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/no_unnecessary_prop_spreading.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "4bfbed70a70060ec205dfd3b1a81ee0e9578a41932006bf0cd41e52f6b427bf2"
---

# NO_UNNECESSARY_PROP_SPREADING

> Conformance is available on Enterprise plans

> **💡 Note:** This rule is available from version 1.6.0.

This rule detects the usage of the spread operator when spreading an object as a prop within a JSX component.

When spreading an object in the component, the data types of the object's properties are not validated, potentially causing unexpected runtime errors or unintended behavior.

## Examples

In the following example, the `Header` component contains an object with the spread operator being applied to it.

We don't know if the props that the `Header` component reads will accept all the values contained in the `foo` object.

```tsx filename="app/dashboard/page.tsx" {2}
function HomePage() {
  return <Header {...{ foo }}>Hello World</Header>;
}

export default HomePage;
```

## How to fix

You can remove the spread operator from the JSX component, and list all props explicitly.

```tsx filename="app/dashboard/page.tsx" {2}
function HomePage() {
  return (
    <Header bar={foo.bar} baz={foo.baz}>
      Hello World
    </Header>
  );
}

export default HomePage;
```

In the example above, [TypeScript](https://www.typescriptlang.org/) will be able to type-check all props.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
