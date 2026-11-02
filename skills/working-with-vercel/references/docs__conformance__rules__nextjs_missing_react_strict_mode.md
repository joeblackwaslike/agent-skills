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
source: "https://vercel.com/docs/conformance/rules/nextjs_missing_react_strict_mode.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "42e1c9eaa11169cd23c0b7342b3985f769fe8fb5ca4d7573c6478b15f2056e25"
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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
