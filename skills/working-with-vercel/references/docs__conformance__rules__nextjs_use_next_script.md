---
title: NEXTJS_USE_NEXT_SCRIPT
product: vercel
url: /docs/conformance/rules/NEXTJS_USE_NEXT_SCRIPT
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_USE_NEXT_SCRIPT"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: Requires that next/script is used for all scripts.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_use_next_script.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "deb04e2672111a1e0302a17dfc93fad3787f2a28fddbd18307c780c8a4d830ac"
---

# NEXTJS_USE_NEXT_SCRIPT

> **🔒 Permissions Required**: Conformance

[`next/script`](https://nextjs.org/docs/pages/api-reference/components/script)
automatically optimizes scripts for improved performance through customizable
loading strategies. By default, `next/script` loads scripts so that they're
non-blocking, meaning that they load after the page has loaded.

Additionally, `next/script` has built in event handlers for common events such
as `onLoad` and `onError`.

By default, this rule is disabled. Enable it by
[customizing Conformance](/docs/conformance/customize).

For further reading, see:

- https://nextjs.org/docs/pages/building-your-application/optimizing/scripts
- https://nextjs.org/docs/pages/api-reference/components/script

## Examples

This rule will catch the following code.

```tsx {2}
function insertScript() {
  const script = document.createElement('script');
  script.src = process.env.SCRIPT_PATH;
  document.body.appendChild(script);
}
```

```tsx {3-5}
function App() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: "console.log('Hello world');" }}
    />
  );
}
```

## How to fix

Replace any `document.createElement('script')` calls and `<script>`
elements that are caught by this rule with [`next/script`](https://nextjs.org/docs/pages/api-reference/components/script).


---

[View full sitemap](/docs/sitemap)
