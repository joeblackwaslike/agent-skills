---
title: NEXTJS_REQUIRE_EXPLICIT_DYNAMIC
product: vercel
url: /docs/conformance/rules/NEXTJS_REQUIRE_EXPLICIT_DYNAMIC
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_REQUIRE_EXPLICIT_DYNAMIC"
last_updated: 2026-07-15
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: Requires explicitly setting the `dynamic` route segment option for Next.js pages and routes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_require_explicit_dynamic.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "e43ef064e3184654d0d6c404aada00ce0a1c9b1dc30183ec897d06c2a71647d9"
---

# NEXTJS_REQUIRE_EXPLICIT_DYNAMIC

> **🔒 Permissions Required**: Conformance

> **💡 Note:** This rule conflicts with the experimental Next.js feature [Partial
> Prerendering
> (PPR)](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model).
> If you enable PPR in your Next.js app, you should not enable this rule.

For convenience, Next.js defaults to automatically selecting the rendering mode
for pages and routes.

Whilst this works well, it also means that rendering modes can be changed
unintentionally (i.e. through an update to a component that a page depends on).
These changes can lead to unexpected behaviors, including performance issues.

To mitigate the chance that rendering modes change unexpectedly, you should
explicitly set the `dynamic` route segment option to the desired mode. Note
that the default value is `auto`, which will not satisfy this rule.

By default, this rule is disabled. To enable it, refer to
[customizing Conformance](/docs/conformance/customize).

For further reading, see:

- [Next.js File Conventions: Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic)

## Examples

This rule will catch any pages or routes that:

- Do not have the `dynamic` option set to a valid value.
- Have the `dynamic` option set to `'auto'` (which is the default value).

In the following example, the page component does not have the `dynamic` route
segment option set.

```tsx filename="app/page.tsx"
export default function Page() {
  // ...
}
```

The next example sets the `dynamic` route segment option, however it sets it to
`'auto'`, which is already the default behavior and will not satisfy this rule.

```tsx filename="app/dashboard/page.tsx" {1}
export const dynamic = 'auto';

export default function Page() {
  // ...
}
```

## How to fix

If you see this issue in your codebase, you can resolve it by explicitly
setting the `dynamic` route segment option for the page or route.

In this example, the `dynamic` route segment option is set to `error`, which
forces the page to static, and will throw an error if any components use
[dynamic functions](https://nextjs.org/docs/app/building-your-application/rendering/server-components#server-rendering-strategies#dynamic-functions)
or uncached data.

```tsx filename="app/page.tsx" {1}
export const dynamic = 'error';

export default function Page() {
  const text = 'Hello world';
  return <div>{text}</div>;
}
```


---

[View full sitemap](/docs/sitemap)
