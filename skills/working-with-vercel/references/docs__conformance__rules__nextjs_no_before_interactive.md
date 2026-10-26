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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "40f74deba9656daa7414045f2f25cb994b8a8cedbe4b42b416fe7d7ff107d08f"
---

# NEXTJS_NO_BEFORE_INTERACTIVE

> Conformance is available on Enterprise plans

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
