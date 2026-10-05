---
title: NO_INLINE_SVG
product: vercel
url: /docs/conformance/rules/NO_INLINE_SVG
canonical_url: "https://vercel.com/docs/conformance/rules/NO_INLINE_SVG"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: Prevent the use of `svg` tags inline.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/no_inline_svg.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "475c2a17ecec131e9b37375a4da53563793a2832ba77e83c69ae1852bee17d80"
---

# NO_INLINE_SVG

> **Availability**: Conformance is available on Enterprise plans

> **💡 Note:** This rule is available from version 1.3.0.

Preventing the use of `<svg></svg>` inline improves the health of your codebase at the page level.
Using inlined `svg` tags in excess can cause hydration issues, negatively impact the performance of both
the browser and the server rendering.

By default, this rule is disabled. To enable it, refer to
[customizing Conformance](/docs/conformance/customize).

## How to fix

If you hit this issue, you can resolve it by using SVGs as an [`<Image>`](https://nextjs.org/docs/pages/api-reference/components/image)
component. Don't forget to enable [`dangerouslyAllowSVG`](https://nextjs.org/docs/pages/api-reference/components/image#dangerouslyallowsvg)
in your application's `next.config.js` file, and use the `unoptimized` component prop.

```JSX filename=".app/page.js"
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/logo.svg"
      width={100}
      height={100}
      alt="Logo of ACME"
      unoptimized
    />
  )
}
```


---

[View full sitemap](/docs/sitemap)
