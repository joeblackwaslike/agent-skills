---
title: NEXTJS_MISSING_REACT_STRICT_MODE
product: vercel
url: /docs/conformance/rules/NEXTJS_MISSING_REACT_STRICT_MODE
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_MISSING_REACT_STRICT_MODE"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Applications using Next.js should enable React Strict Mode
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/nextjs_missing_react_strict_mode.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "0a2864f32a58bae4d5c498e9f6d808446a477492f0c7603cd605d577e76e8544"
---

# NEXTJS_MISSING_REACT_STRICT_MODE

> Conformance is available on Enterprise plans

We strongly suggest you enable Strict Mode in your Next.js application
to better prepare your application for the future of React. See the [Next.js doc on React Strict Mode](https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode)
for more information.

## How to fix

Add the following to your `next.config.js` file.

```json filename="next.config.js"
module.exports = {
  reactStrictMode: true,
}
```

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
