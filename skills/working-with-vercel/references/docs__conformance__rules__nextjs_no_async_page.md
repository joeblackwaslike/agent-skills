---
title: NEXTJS_NO_ASYNC_PAGE
product: vercel
url: /docs/conformance/rules/NEXTJS_NO_ASYNC_PAGE
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_NO_ASYNC_PAGE"
last_updated: 2025-06-27
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: Ensures that the exported Next.js page component and its transitive dependencies are not asynchronous, as that blocks the rendering of the page.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_no_async_page.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "918e845df9c8889eaab134a3a27400216dedffff3ab7be9a7452f7b438c8b025"
---

# NEXTJS_NO_ASYNC_PAGE

> **🔒 Permissions Required**: Conformance

This rule examines all Next.js app router page files and their transitive dependencies to ensure
none are asynchronous or return new Promise instances. Even if the page component itself is not
asynchronous, importing an asynchronous component somewhere in the page's dependency tree can
silently cause the page to render dynamically. This can cause a blank page to be displayed to
the user while Next.js waits for long promises to resolve.

This rule will not error if it detects a sibling [loading.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
file beside the page.

By default, this rule is disabled. To enable it, refer to
[customizing Conformance](/docs/conformance/customize).

For further reading, you may find these resources helpful:

- [Loading UI and Streaming in Next.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming):
  This guide discusses strategies for loading UI components and streaming content in Next.js applications.
- [Next.js Loading File Conventions](https://nextjs.org/docs/app/api-reference/file-conventions/loading):
  This document provides an overview of file conventions related to loading in Next.js.
- [Next.js Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic):
  This document provides an overview of the `dynamic` export and how it can be used to force the dynamic behavior of a layout.

## Examples

This rule will catch the following code.

```tsx filename="app/page.tsx"
export default async function Page() {
  const data = await fetch();
  return <div>{data}</div>;
}
```

```jsx filename="app/page.jsx"
async function AuthButton() {
  const isAuthorized = await auth();
  return <div>{isAuthorized ? 'Authorized' : 'Unauthorized'}</div>;
}

export default function Page() {
  return <AuthButton />;
}
```

## How to fix

You can fix this error by wrapping your async component with a `<Suspense/>` boundary that has
a fallback UI to indicate to Next.js that it should use the fallback until the promise resolves.

Alternatively, you can manually force the dynamic behavior of the page by exporting a `dynamic` value.
This rule will only error if `dynamic` is not specified or is set to `auto`.
Read more [here](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic).

```tsx filename="app/page.tsx"
export const dynamic = 'force-static';

export default async function Page() {
  const data = await fetch();
  return <div>{data}</div>;
}
```


---

[View full sitemap](/docs/sitemap)
