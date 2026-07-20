---
title: NEXTJS_USE_NEXT_IMAGE
product: vercel
url: /docs/conformance/rules/NEXTJS_USE_NEXT_IMAGE
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_USE_NEXT_IMAGE"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: Requires that next/image is used for all images.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_use_next_image.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "caa4e7e18943888009fe3a1b17de90cd1d69e69261dbbecb3212230b16d09149"
---

# NEXTJS_USE_NEXT_IMAGE

> **🔒 Permissions Required**: Conformance

The Next.js Image component ([`next/image`](https://nextjs.org/docs/pages/api-reference/components/image))
extends the HTML `<img>` element with features for automatic image optimization.

It optimizes image sizes for different devices using modern image formats,
improves visual stability by preventing layout shifts during image loading,
and speeds up page loads with lazy loading and optional blur-up placeholders.

Additionally, it provides the flexibility of on-demand image resizing, even for
images hosted on remote servers. This may incur costs from your managed hosting
provider (see [below](#important-note-on-costs) for more information)

By default, this rule is disabled. Enable it by
[customizing Conformance](/docs/conformance/customize).

For further reading, see:

- https://nextjs.org/docs/app/building-your-application/optimizing/images
- https://nextjs.org/docs/pages/api-reference/components/image

## Important note on costs

Using image optimization may incur costs from your managed hosting
provider. You can opt out of image optimization by setting the optional
[`unoptimized` prop](https://nextjs.org/docs/pages/api-reference/components/image#unoptimized).

Please check with your hosting provider for details.

- [Vercel pricing](https://vercel.com/pricing)
- [Cloudinary pricing](https://cloudinary.com/pricing)
- [imgix pricing](https://imgix.com/pricing)

## Important note on self-hosting

If self-hosting, you'll need to install the optional package
[`sharp`](https://www.npmjs.com/package/sharp), which Next.js will use to
optimize images. Optimized images will require more available storage on your
server.

## Examples

This rule will catch the following code.

```tsx {2}
function App() {
  return <img src="/media/image.png" alt="Example" />;
}
```

The following code will not be caught by this rule.

```tsx
function App() {
  return (
    <picture>
      <source srcSet="/hero.avif" type="image/avif" />
      <source srcSet="/hero.webp" type="image/webp" />
      <img src="/hero.jpg" alt="Landscape picture" width={800} height={500} />
    </picture>
  );
}
```

## How to fix

Replace any `<img>` elements that are caught by this rule with
[`next/image`](https://nextjs.org/docs/pages/api-reference/components/image).

Again, please check with your managed hosting provider for image optimization
costs.


---

[View full sitemap](/docs/sitemap)
