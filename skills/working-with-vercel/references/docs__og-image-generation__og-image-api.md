---
title: @vercel/og Reference
product: vercel
url: /docs/og-image-generation/og-image-api
canonical_url: "https://vercel.com/docs/og-image-generation/og-image-api"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/og-image-generation
related:
  []
summary: This reference provides information on how the @vercel/og package works on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/og-image-generation/og-image-api.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "39ca82a47bbf4032719cfa1cf4065fb835fdee612ccb32fdce4a7a37627a0272"
---

# @vercel/og Reference

The package exposes an `ImageResponse` constructor, with the following parameters:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [ImageResponse](https://nextjs.org/docs/app/api-reference/functions/image-response) — API Reference for the ImageResponse constructor.
- [Introducing OG Image Generation: Fast, dynamic social card images at the Edge](https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images)
- [Encrypting parameters](https://vercel.com/kb/guide/encrypting-parameters) — Learn how to encrypt parameters so that only certain values can be passed to generate your image.
- [opengraph-image and twitter-image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) — API Reference for the Open Graph Image and Twitter Image file conventions.
- [Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) — Learn how to add metadata to your pages and create dynamic OG images.
- [OG Image Generation Examples](https://vercel.com/docs/og-image-generation/examples) — Learn how to use the @vercel/og library with examples.
- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) — Vercel is the native Next.js platform, designed to enhance the Next.js experience.
- [Inspecting your Open Graph metadata](https://vercel.com/docs/deployments/og-preview) — Learn how to inspect and validate your Open Graph metadata through the Open Graph deployment tab.
- [Image Optimization with Vercel](https://vercel.com/docs/image-optimization) — Transform and optimize images to improve page load performance.
- [Get a repository image](https://vercel.com/docs/rest-api/vcr/get-a-repository-image) — GET /v1/vcr/repository/{idOrName}/images/{imageIdOrDigest} — Fetch an individual image from a repository, including its

Full cross-link map for this page: [/docs/og-image-generation/og-image-api.graph.md](/docs/og-image-generation/og-image-api.graph.md)
<!-- /docsgraph:related -->

```ts v0="build" filename="ImageResponse Interface" framework=all
import { ImageResponse } from '@vercel/og'

new ImageResponse(
  element: ReactElement,
  options: {
    width?: number = 1200
    height?: number = 630
    emoji?: 'twemoji' | 'blobmoji' | 'noto' | 'openmoji' = 'twemoji',
    fonts?: {
      name: string,
      data: ArrayBuffer,
      weight: number,
      style: 'normal' | 'italic'
    }[]
    debug?: boolean = false

    // Options that will be passed to the HTTP response
    status?: number = 200
    statusText?: string
    headers?: Record<string, string>
  },
)
```

### Main parameters

| Parameter | Type           | Default | Description                                       |
| --------- | -------------- | ------- | ------------------------------------------------- |
| `element` | `ReactElement` | —       | The React element to generate the image from.     |
| `options` | `object`       | —       | Options to customize the image and HTTP response. |

### Options parameters

| Parameter    | Type                                             | Default               | Description                            |
| ------------ | ------------------------------------------------ | --------------------- | -------------------------------------- |
| `width`      | `number`                                         | `1200`                | The width of the image.                |
| `height`     | `number`                                         | `630`                 | The height of the image.               |
| `emoji`      | `twemoji` `blobmoji` `noto` `openmoji` `twemoji` | The emoji set to use. |
| `debug`      | `boolean`                                        | `false`               | Debug mode flag.                       |
| `status`     | `number`                                         | `200`                 | The HTTP status code for the response. |
| `statusText` | `string`                                         | —                     | The HTTP status text for the response. |
| `headers`    | `Record<string, string>`                         | —                     | The HTTP headers for the response.     |

### Fonts parameters (within options)

| Parameter | Type              | Default | Description             |
| --------- | ----------------- | ------- | ----------------------- |
| `name`    | `string`          | —       | The name of the font.   |
| `data`    | `ArrayBuffer`     | —       | The font data.          |
| `weight`  | `number`          | —       | The weight of the font. |
| `style`   | `normal` `italic` | —       | The style of the font.  |

By default, the following headers will be included by `@vercel/og`:

```javascript filename="included-headers"

'content-type': 'image/png',
'cache-control': 'public, immutable, no-transform, max-age=31536000',

```

## Supported HTML and CSS features

Refer to [Satori's documentation](https://github.com/vercel/satori#documentation) for a list of supported HTML and CSS features.

By default, `@vercel/og` only has the Noto Sans font included. If you need to use other fonts, you can pass them in the `fonts` option. View the [custom font example](/kb/guide/using-custom-font) for more details.

## Acknowledgements

- [Twemoji](https://github.com/twitter/twemoji)
- [Google Fonts](https://fonts.google.com) and [Noto Sans](https://www.google.com/get/noto/)
- [Resvg](https://github.com/RazrFalcon/resvg) and [Resvg.js](https://github.com/yisibl/resvg-js)


---

[View full sitemap](/docs/sitemap)
