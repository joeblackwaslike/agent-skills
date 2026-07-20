---
title: NEXTJS_SAFE_SVG_IMAGES
product: vercel
url: /docs/conformance/rules/NEXTJS_SAFE_SVG_IMAGES
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_SAFE_SVG_IMAGES"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Prevent dangerouslyAllowSVG without Content Security Policy in Next.js applications.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_safe_svg_images.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "1a16b7afbca77d856880e2883cfd77caf45c09bcc5786fd595e6be5b88310d83"
---

# NEXTJS_SAFE_SVG_IMAGES

> **🔒 Permissions Required**: Conformance

SVG can do many of the same things that HTML/JS/CSS can, meaning that it can be dangerous to execute SVG
as this can lead to vulnerabilities without proper [Content Security Policy](https://nextjs.org/docs/advanced-features/security-headers) (CSP) headers.

## How to fix

If you need to serve SVG images with the default Image Optimization API, you
can set `dangerouslyAllowSVG` inside your `next.config.js`:

```js filename="next.config.js"
module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
```

In addition, it is strongly recommended to also set `contentDispositionType` to
force the browser to download the image, as well as `contentSecurityPolicy` to
prevent scripts embedded in the image from executing.


---

[View full sitemap](/docs/sitemap)
