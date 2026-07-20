---
title: NEXTJS_NO_BEFORE_INTERACTIVE
product: vercel
url: /docs/conformance/rules/NEXTJS_NO_BEFORE_INTERACTIVE
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_NO_BEFORE_INTERACTIVE"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Requires review of usage of the beforeInteractive strategy in Script (next/script) elements.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_no_before_interactive.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "61d8f1eb34f0ae73dffdb082d9157ec5fedc91ce546c620fc0dbac6afe1c67bf"
---

# NEXTJS_NO_BEFORE_INTERACTIVE

> **🔒 Permissions Required**: Conformance

The default [loading strategy](https://nextjs.org/docs/basic-features/script#strategy)
for [`next/script`](https://nextjs.org/docs/basic-features/script) is optimised
for fast page loads.

Setting the strategy to [`beforeInteractive`](https://nextjs.org/docs/api-reference/next/script#beforeinteractive)
forces the script to load before any Next.js code and before hydration occurs,
which delays the page from becoming interactive.

For further reading, see:

- [Loading strategy in Next.js](https://nextjs.org/docs/basic-features/script#strategy)
- [`next/script` docs](https://nextjs.org/docs/api-reference/next/script#beforeinteractive)
- [Chrome blog on the Next.js Script component](https://developer.chrome.com/blog/script-component/#the-nextjs-script-component)

## Examples

This rule will catch the following code.

```ts {5}
import Script from 'next/script';

export default function MyPage() {
  return (
    <Script src="https://example.com/script.js" strategy="beforeInteractive" />
  );
}
```

## How to fix

This rule flags any usage of `beforeInteractive` for review. If approved, the
exception should be added to the allowlist.


---

[View full sitemap](/docs/sitemap)
