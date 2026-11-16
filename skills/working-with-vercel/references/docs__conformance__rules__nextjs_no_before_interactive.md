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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/nextjs_no_before_interactive.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "706c8f80d7343e44386e54aa626759cf6d6ff5cd9e27bf530f09ba34da4e2ada"
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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
