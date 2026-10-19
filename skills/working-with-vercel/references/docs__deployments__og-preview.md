---
title: Inspecting your Open Graph metadata
product: vercel
url: /docs/deployments/og-preview
canonical_url: "https://vercel.com/docs/deployments/og-preview"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/deployments
related:
  - /docs/deployment-protection
  - /docs/og-image-generation
summary: Learn how to inspect and validate your Open Graph metadata through the Open Graph deployment tab.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/og-preview.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "893b30d5af5bf3a3de84a79f8900315393f12ad998654f28ddfef1a4dfe79334"
---

# Inspecting your Open Graph metadata

You can use the **Open Graph** section in the sidebar on every deployment on Vercel to validate and view your [Open Graph (OG)](https://ogp.me/ "Open Graph (OG)") data across a range of social media sites before you share it out. Routes using [Deployment Protection](/docs/deployment-protection) can also be inspected.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OG Image Generation: The Complete Customization Guide](https://vercel.com/kb/guide/using-custom-font) — Learn how to use custom fonts in your Vercel OG image, plus emoji, external images, non-Latin text, dynamic titles, and
- [Inspect and validate Open Graph metadata for enhanced link sharing](https://vercel.com/changelog/open-graph-link-sharing-inspector)
- [Inspect Open Graph data with the Vercel Toolbar](https://vercel.com/changelog/inspect-open-graph-data-with-the-vercel-toolbar)
- [Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) — Learn how to add metadata to your pages and create dynamic OG images.
- [Are Vercel Preview Deployments indexed by search engines?](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines) — Vercel Preview Deployments aren't indexed by default. Learn how the noindex header works, how to confirm it, and the cus
- [How to debug 404 errors](https://vercel.com/kb/guide/how-to-debug-404-errors) — Learn the systematic steps to identify and resolve 404 issues.
- [Deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments) — Vercel MCP tools for deployments.
- [List deployments](https://vercel.com/docs/rest-api/deployments/list-deployments) — GET /v7/deployments — List deployments under the authenticated user or team. If a deployment hasn't finished uploading \\
- [Getting started with Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart) — Vercel Web Analytics provides you detailed insights into your website's visitors. This quickstart guide will help you ge
- [Get microfrontends config for a deployment](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-deployment) — GET /v1/microfrontends/{deploymentId}/config — Get the microfrontends config for a deployment.
- [Microfrontends Routing](https://vercel.com/docs/microfrontends/routing) — Configure which microfrontend handles each path and understand how Vercel selects deployments.

Full cross-link map for this page: [/docs/deployments/og-preview.graph.md](/docs/deployments/og-preview.graph.md)
<!-- /docsgraph:related -->

To view your data:

1. Choose your account or team from the team switcher
2. Select your project and open [**Deployments**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fdeployments\&title=Go+to+Deployments) in the sidebar
3. From the **Deployments** section in the sidebar, select the deployment you wish to view the metadata for
4. Select the Open Graph tab:

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/og-tab-light.png)

5. From here, you can view the metadata and a preview for [Twitter](/docs/deployments/og-preview#twitter-specific-metadata), Slack, Facebook, and LinkedIn for [specific pages](/docs/deployments/og-preview#filter-by-pathname) in your deployment

## Filter by pathname

You can use the **Path** dropdown to view the OG card for any page on that particular deployment.

## Metadata

These properties set by the [Open Graph protocol](https://ogp.me/#metadata).

| Property         | Value                                                                   | Description                                                                                  |
| ---------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `title`          | The title tag used to name the page. 70 characters max.                 | This is used by default if no other values are passed.                                       |
| `description`    | The meta.description tag used to describe the page. 200 characters max. | This is used by default if no other values are passed.                                       |
| `og:image`       | Absolute URL to image.                                                  | Use the [OG Image Generation](/docs/og-image-generation) documentation to create new images. |
| `og:title`       | A title for link previews.                                              | You can use this to override the meta title if you want the OG title to be different.        |
| `og:description` | A one to two sentence description for link previews.                    | You can use this to override the meta description if you want the OG title to be different.  |
| `og:url`         | A canonical URL for link previews.                                      | You should provide the absolute URL.                                                         |

```jsx filename="index.js"
<div>
  <head>
    <meta name="og:title" content="Vercel CDN" />
    <meta name="og:description" content="Vercel CDN" />
    <meta
      name="og:image"
      content={
        // Because OG images must have an absolute URL, we use the
        // `VERCEL_URL` environment variable to get the deployment's URL.
        // More info: https://vercel.com/docs/environment-variables
        `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''}/api/vercel`
      }
    />
    <meta
      name="og:url"
      content="https://vercel.com/docs/cdn"
    />
  </head>
  <h1>A page with Open Graph Image.</h1>
</div>
```

### Twitter-specific metadata

| Property              | `content` value                                                                               | Additional information                                |
| --------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `twitter:image`       | A URL to an image file or to a dynamically generated image. `og:image` is used as a fallback. | `JPG`,`PNG`, `WEBP` and `GIF`. `SVG` is not supported |
| `twitter:card`        | The type of card used for Twitter link previews                                               | `summary`, `summary_large_image`, `app`, or `player`  |
| `twitter:title`       | A string that shows for Twitter link previews. `og:title` is used as a fallback.              | 70 characters max                                     |
| `twitter:description` | A description for Twitter link previews. `og:description` is used as a fallback.              | 200 characters max                                    |

```html filename="index.js"
<div>
  <head>
    <meta name="twitter:title" content="Vercel CDN for Twitter" />
    <meta name="twitter:description" content="Vercel CDN for Twitter" />
    <meta
      name="twitter:image"
      content="https://og-examples.vercel.sh/api/static"
    />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <h1>A page with Open Graph Image.</h1>
</div>
```


---

[View full sitemap](/docs/sitemap)
