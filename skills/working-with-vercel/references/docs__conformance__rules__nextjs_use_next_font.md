---
title: NEXTJS_USE_NEXT_FONT
product: vercel
url: /docs/conformance/rules/NEXTJS_USE_NEXT_FONT
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_USE_NEXT_FONT"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: Requires using next/font to load local fonts and fonts from supported CDNs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_use_next_font.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "9b59220db1865fcdfa341b08b7ea60e31055c3185c53f0a94479e2faa4f0aceb"
---

# NEXTJS_USE_NEXT_FONT

> **🔒 Permissions Required**: Conformance

> **💡 Note:** This rule is available from version 1.1.0.

[`next/font`](https://nextjs.org/docs/pages/api-reference/components/font)
automatically optimizes fonts and removes external network requests for
improved privacy and performance.

By default, this rule is disabled. Enable it by
[customizing Conformance](/docs/conformance/customize).

This means you can optimally load web fonts with zero layout shift, thanks to
the underlying CSS size-adjust property used.

For further reading, see:

- https://nextjs.org/docs/basic-features/font-optimization
- https://nextjs.org/docs/pages/api-reference/components/font
- https://www.lydiahallie.io/blog/optimizing-webfonts-in-nextjs-13

## Examples

This rule will catch the following code.

```css {3-4}
@font-face {
  font-family: Foo;
  src:
    url(https://fonts.gstatic.com/s/roboto/v30/KFOiCnqEu92Fr1Mu51QrEz0dL-vwnYh2eg.woff2)
      format('woff2'),
    url(/custom-font.ttf) format('truetype');
  font-display: block;
  font-style: normal;
  font-weight: 400;
}
```

```ts {3-6}
function App() {
  return (
    <link
      href="https://fonts.googleapis.com/css2?family=Krona+One&display=optional"
      rel="stylesheet"
    />
  );
}
```

## How to fix

Replace any `@font-face` at-rules and `link` elements that are caught by this
rule with [`next/font`](https://nextjs.org/docs/api-reference/next/font).


---

[View full sitemap](/docs/sitemap)
