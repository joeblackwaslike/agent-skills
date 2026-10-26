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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "15b05eeeb20f9c881f87bbd976c6152f84ee5f8f48ae919e960e647057322fc1"
---

# NEXTJS_USE_NEXT_SCRIPT

> Conformance is available on Enterprise plans

> **💡 Note:** This rule is available from version 1.1.0.

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
