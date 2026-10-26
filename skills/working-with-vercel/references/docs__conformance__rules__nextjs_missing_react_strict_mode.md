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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c2650d7856859439d46ff483a2fffbda96545e6b0813c90528811a044798dfdb"
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
